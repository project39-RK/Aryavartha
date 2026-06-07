// ===================================================================
// Aryavarta — BattleEngine
// Handles a full battle between two sides (player vs enemy).
// Each side has a team of up to 3 Atmas + an active Vyuha formation.
//
// Events emitted (via onEvent callback):
//   { type: "log", msg }
//   { type: "damage", side, atmaIndex, hp, maxHp, amount }
//   { type: "heal",   side, atmaIndex, hp, maxHp, amount }
//   { type: "tapas",  side, atmaIndex, tapas, maxTapas }
//   { type: "status", side, atmaIndex, status }
//   { type: "switch", side, prev, next }
//   { type: "faint",  side, atmaIndex }
//   { type: "effectivenessMsg", msg }
//   { type: "battleEnd", winner }  // "player" | "enemy"
// ===================================================================

import { getAstra } from "../data/astras.js";
import { typeEffectiveness, effectivenessLabel } from "../data/types.js";
import { getVyuha, SWITCH_TAPAS_COST } from "./VyuhaGrid.js";
import { STATUS } from "../data/astras.js";

const TAPAS_REGEN_PER_TURN = 12;

export class BattleEngine {
  constructor({ playerTeam, enemyTeam, playerVyuhaId = "garuda",
    enemyVyuhaId = "chakra", onEvent }) {
    this.player = {
      team: playerTeam,
      active: 0,
      vyuha: getVyuha(playerVyuhaId),
    };
    this.enemy = {
      team: enemyTeam,
      active: 0,
      vyuha: getVyuha(enemyVyuhaId),
    };
    this.onEvent = onEvent || (() => { });
    this.turn = 0;
    this.over = false;
    this.winner = null;
  }

  // ─── Public entry-points ────────────────────────────────────────────

  /** Execute a full turn: player uses astraId OR switches (null = switch). */
  playerTurn(astraId, switchToIndex = null) {
    if (this.over) return;
    this.turn++;
    this._emit("log", `— Turn ${this.turn} —`);

    const playerAction = switchToIndex !== null
      ? { type: "switch", index: switchToIndex }
      : { type: "astra", astraId };

    const enemyAction = this._enemyAI();
    this._resolveActions(playerAction, enemyAction);

    if (!this.over) {
      this._endOfTurnEffects();
    }
    this._checkVictory();
  }

  playerChangeVyuha(vyuhaId) {
    if (this.over) return;
    const atma = this._getActive("player");
    if (atma.tapas < SWITCH_TAPAS_COST) {
      this._emit("log", `Not enough Tapas to change formation! (need ${SWITCH_TAPAS_COST})`);
      return;
    }
    atma.spendTapas(SWITCH_TAPAS_COST);
    this.player.vyuha = getVyuha(vyuhaId);
    this._emitTapas("player");
    this._emit("log", `⚔ Formation changed to ${this.player.vyuha.name}!`);
  }

  // ─── Private helpers ────────────────────────────────────────────────

  _getActive(side) {
    const s = this[side];
    return s.team[s.active];
  }

  _emit(type, data = {}) {
    if (typeof data === "string") {
      this.onEvent({ type, msg: data });
    } else {
      this.onEvent({ type, ...data });
    }
  }

  _emitAtmaState(side) {
    const s = this[side];
    const a = s.team[s.active];
    this._emit("damage", { side, atmaIndex: s.active, hp: a.hp, maxHp: a.maxHp, amount: 0 });
    this._emitTapas(side);
  }

  _emitTapas(side) {
    const s = this[side];
    const a = s.team[s.active];
    this._emit("tapas", { side, atmaIndex: s.active, tapas: a.tapas, maxTapas: a.maxTapas });
  }

  // ─── Action resolution ──────────────────────────────────────────────

  _resolveActions(playerAction, enemyAction) {
    const pAtma = this._getActive("player");
    const eAtma = this._getActive("enemy");

    // Determine order: switches go first; then by priority flag, then speed.
    const pSpeed = (pAtma.stats.speed * this.player.vyuha.mods.speedMult) | 0;
    const eSpeed = (eAtma.stats.speed * this.enemy.vyuha.mods.speedMult) | 0;

    const pPriority = playerAction.type === "switch" ? 10
      : (getAstra(playerAction.astraId)?.priority || 0);
    const ePriority = enemyAction.type === "switch" ? 10
      : (getAstra(enemyAction.astraId)?.priority || 0);

    let playerFirst;
    if (pPriority !== ePriority) {
      playerFirst = pPriority > ePriority;
    } else {
      playerFirst = pSpeed >= eSpeed;
    }

    const first = playerFirst ? ["player", playerAction] : ["enemy", enemyAction];
    const second = playerFirst ? ["enemy", enemyAction] : ["player", playerAction];

    this._doAction(...first);
    if (this.over) return;
    // Re-fetch active in case a switch occurred.
    if (!this._getActive(second[0]).isFainted) {
      this._doAction(...second);
    }
  }

  _doAction(side, action) {
    if (this.over) return;
    const oppSide = side === "player" ? "enemy" : "player";

    if (action.type === "switch") {
      this._doSwitch(side, action.index);
    } else {
      const atma = this._getActive(side);
      if (atma.isFainted) return;
      if (!this._resolveStatusBlock(side)) return; // blocked by Nidra/Moha
      this._doAstra(side, oppSide, action.astraId);
    }
  }

  _doSwitch(side, newIndex) {
    const s = this[side];
    const newAtma = s.team[newIndex];
    if (!newAtma || newAtma.isFainted) {
      this._emit("log", `Cannot switch — that Atma is unavailable.`);
      return;
    }
    if (newIndex === s.active) {
      this._emit("log", `${newAtma.name} is already in battle!`);
      return;
    }
    const prev = s.active;
    s.active = newIndex;
    this._emit("switch", { side, prev, next: newIndex });
    this._emit("log", `${side === "player" ? "◈ You recall" : "◆ Enemy recalls"} ${s.team[prev].name} — ${newAtma.name} enters!`);
  }

  _doAstra(side, oppSide, astraId) {
    const attacker = this._getActive(side);
    const defender = this._getActive(oppSide);
    const astra = getAstra(astraId);

    if (!astra) { this._emit("log", "Unknown Astra!"); return; }

    // Once-per-battle check.
    if (astra.oncePerBattle && attacker.usedBrahmastra) {
      this._emit("log", `${attacker.name}'s ${astra.name} has already been invoked — once per battle!`);
      return;
    }
    // Tapas check.
    if (!attacker.canAfford(astra)) {
      this._emit("log", `${attacker.name} lacks Tapas for ${astra.name}! Uses Prahar instead.`);
      astraId = "prahar";
      return this._doAstra(side, oppSide, astraId);
    }

    this._emit("log", `${attacker.glyph} ${attacker.name} invokes ${astra.name}!`);
    attacker.spendTapas(astra.tapas);
    if (astra.oncePerBattle) attacker.usedBrahmastra = true;
    this._emitTapas(side);

    // Accuracy check.
    if (Math.random() * 100 > astra.accuracy) {
      this._emit("log", `The Astra misses — the foe evades!`);
      return;
    }

    // Healing move.
    if (astra.heal) {
      const healAmt = Math.round(attacker.maxHp * astra.heal);
      const actual = attacker.heal(healAmt);
      this._emit("heal", { side, atmaIndex: this[side].active, hp: attacker.hp, maxHp: attacker.maxHp, amount: actual });
      this._emit("log", `${attacker.name} restores ${actual} HP!`);
      return;
    }

    // Status-only move.
    if (astra.category === "status" && !astra.power) {
      if (defender.status) {
        this._emit("log", `${defender.name} is already afflicted!`);
        return;
      }
      if (Math.random() < (astra.statusChance ?? 1.0)) {
        defender.status = astra.status;
        defender.statusTurns = 0;
        this._emit("status", { side: oppSide, atmaIndex: this[oppSide].active, status: astra.status });
        this._emit("log", `${defender.name} is afflicted with ${astra.status}!`);
      }
      return;
    }

    // Damage move.
    if (astra.power > 0) {
      const damage = this._calcDamage(attacker, defender, astra, side, oppSide);
      const actual = defender.takeDamage(damage);
      this._emit("damage", { side: oppSide, atmaIndex: this[oppSide].active, hp: defender.hp, maxHp: defender.maxHp, amount: actual });

      // Type effectiveness flavour.
      const mult = typeEffectiveness(astra.type, defender.type);
      const label = effectivenessLabel(mult);
      if (label) this._emit("effectivenessMsg", label);

      this._emit("log", `${defender.glyph} ${defender.name} takes ${actual} damage!`);

      // Recoil (Chakra-Vyuha).
      if (this[oppSide].vyuha.mods.recoil) {
        const recoilDmg = Math.round(actual * this[oppSide].vyuha.mods.recoil);
        const recoilActual = attacker.takeDamage(recoilDmg);
        this._emit("damage", { side, atmaIndex: this[side].active, hp: attacker.hp, maxHp: attacker.maxHp, amount: recoilActual });
        this._emit("log", `${attacker.name} takes ${recoilActual} recoil from the Chakra formation!`);
      }

      // Side-effect status (e.g. Agneyastra burn chance).
      if (astra.statusChance && astra.status && !defender.status) {
        if (Math.random() < astra.statusChance) {
          defender.status = astra.status;
          this._emit("status", { side: oppSide, atmaIndex: this[oppSide].active, status: astra.status });
          this._emit("log", `${defender.name} is afflicted with ${astra.status}!`);
        }
      }

      // Faint check.
      if (defender.isFainted) {
        this._emit("faint", { side: oppSide, atmaIndex: this[oppSide].active });
        this._emit("log", `💀 ${defender.name} has fainted!`);
        this._autoSwitch(oppSide);
      }
      if (attacker.isFainted) {
        this._emit("faint", { side, atmaIndex: this[side].active });
        this._emit("log", `💀 ${attacker.name} has fainted!`);
        this._autoSwitch(side);
      }
    }
  }

  _calcDamage(attacker, defender, astra, side, oppSide) {
    const aMods = this[side].vyuha.mods;
    const dMods = this[oppSide].vyuha.mods;

    const atk = astra.category === "physical"
      ? (attacker.stats.atk * aMods.atkMult)
      : (attacker.stats.spAtk * aMods.atkMult);
    const def = astra.category === "physical"
      ? (defender.stats.def * dMods.defMult)
      : (defender.stats.spDef * dMods.defMult);

    // Lower atk if Burned (physical only).
    const burnPenalty = (attacker.status === STATUS.AGNIDAH && astra.category === "physical") ? 0.5 : 1;

    // Core Pokémon-style formula adapted.
    const base = (((2 * attacker.level) / 5 + 2) * astra.power * (atk / def)) / 50 + 2;
    const typeMult = typeEffectiveness(astra.type, defender.type);
    const rand = 0.85 + Math.random() * 0.15; // 85–100% variance

    return Math.max(1, Math.round(base * typeMult * rand * burnPenalty));
  }

  // ─── Status block check ─────────────────────────────────────────────

  /** Returns true if the Atma CAN act. */
  _resolveStatusBlock(side) {
    const atma = this._getActive(side);
    if (!atma.status) return true;

    if (atma.status === STATUS.NIDRA) {
      atma.statusTurns++;
      if (atma.statusTurns >= 3 || Math.random() < 0.33) {
        atma.status = null;
        this._emit("log", `${atma.name} wakes from its slumber!`);
        return true;
      }
      this._emit("log", `${atma.name} is fast asleep — cannot act!`);
      return false;
    }
    if (atma.status === STATUS.MOHA) {
      if (Math.random() < 0.33) {
        // Hurt itself.
        const self = Math.round(atma.maxHp * 0.06);
        atma.takeDamage(self);
        this._emit("damage", { side, atmaIndex: this[side].active, hp: atma.hp, maxHp: atma.maxHp, amount: self });
        this._emit("log", `${atma.name} is confused and hurts itself!`);
        if (atma.isFainted) {
          this._emit("faint", { side, atmaIndex: this[side].active });
          this._autoSwitch(side);
        }
        return false;
      }
    }
    return true;
  }

  // ─── End-of-turn effects ─────────────────────────────────────────────

  _endOfTurnEffects() {
    ["player", "enemy"].forEach((side) => {
      const s = this[side];
      const atma = s.team[s.active];
      if (atma.isFainted) return;

      // Tapas regeneration.
      atma.regenTapas(TAPAS_REGEN_PER_TURN);
      this._emitTapas(side);

      // Padma Vyuha reserve regen.
      if (s.vyuha.mods.reserveRegen) {
        s.team.forEach((a, i) => {
          if (!a.isFainted && i !== s.active) {
            const regen = Math.round(a.maxHp * s.vyuha.mods.reserveRegen);
            a.heal(regen);
          }
        });
      }

      // Poison / Burn chip damage.
      if (atma.status === STATUS.VISHA || atma.status === STATUS.AGNIDAH) {
        const chip = Math.round(atma.maxHp * 0.08);
        atma.takeDamage(chip);
        this._emit("damage", { side, atmaIndex: s.active, hp: atma.hp, maxHp: atma.maxHp, amount: chip });
        this._emit("log", `${atma.name} takes ${chip} damage from ${atma.status}!`);
        if (atma.isFainted) {
          this._emit("faint", { side, atmaIndex: s.active });
          this._autoSwitch(side);
        }
      }
    });
  }

  // ─── Auto-switch after faint ─────────────────────────────────────────

  _autoSwitch(side) {
    const s = this[side];
    const nextIndex = s.team.findIndex((a, i) => i !== s.active && !a.isFainted);
    if (nextIndex === -1) return; // no one left — victory check will catch this
    const prev = s.active;
    s.active = nextIndex;
    this._emit("switch", { side, prev, next: nextIndex });
    this._emit("log", `${this._getActive(side).glyph} ${this._getActive(side).name} is called to battle!`);
  }

  // ─── Enemy AI ─────────────────────────────────────────────────────────

  _enemyAI() {
    const enemy = this._getActive("enemy");
    const player = this._getActive("player");

    // Very basic: pick the highest-power affordable Astra that's still good.
    let bestAstra = null;
    let bestScore = -Infinity;

    for (const astraId of enemy.astras) {
      const astra = getAstra(astraId);
      if (!enemy.canAfford(astra)) continue;
      if (astra.category === "status") {
        if (player.status) continue; // don't wasted a status move if foe already afflicted
      }
      const typeMult = astra.power > 0 ? typeEffectiveness(astra.type, player.type) : 1;
      const score = (astra.power || 30) * typeMult + (astra.priority || 0) * 20;
      if (score > bestScore) { bestScore = score; bestAstra = astraId; }
    }

    // Fallback to prahar.
    if (!bestAstra) bestAstra = "prahar";

    // Occasionally switch (10% chance, if a reserve is available).
    const reserves = this.enemy.team.filter((a, i) => i !== this.enemy.active && !a.isFainted);
    if (reserves.length > 0 && Math.random() < 0.10) {
      const randIdx = this.enemy.team.indexOf(reserves[Math.floor(Math.random() * reserves.length)]);
      return { type: "switch", index: randIdx };
    }

    return { type: "astra", astraId: bestAstra };
  }

  // ─── Victory check ───────────────────────────────────────────────────

  _checkVictory() {
    const playerAlive = this.player.team.some((a) => !a.isFainted);
    const enemyAlive = this.enemy.team.some((a) => !a.isFainted);

    if (!playerAlive && !enemyAlive) {
      this._endBattle("draw");
    } else if (!enemyAlive) {
      this._endBattle("player");
    } else if (!playerAlive) {
      this._endBattle("enemy");
    }
  }

  _endBattle(winner) {
    this.over = true;
    this.winner = winner;
    if (winner === "draw") {
      this._emit("log", "⚖ The battle ends in a draw — both sides exhausted.");
    } else if (winner === "player") {
      this._emit("log", "🌟 Victory! Dharma prevails — the enemy spirits are purified.");
    } else {
      this._emit("log", "💫 You have fallen... but the path of Dharma is not yet closed.");
    }
    this._emit("battleEnd", { winner });
  }
}
