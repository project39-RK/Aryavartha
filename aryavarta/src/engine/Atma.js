// ===================================================================
// Aryavarta — Atma instance
// A live creature built from a species at a given level. Tracks current
// HP, Tapas, status condition, and Bhakti (friendship) bond.
// ===================================================================

import { getSpecies } from "../data/atmas.js";

export class Atma {
  constructor(speciesId, level = 5) {
    const species = getSpecies(speciesId);
    if (!species) throw new Error(`Unknown Atma species: ${speciesId}`);

    this.species = species;
    this.id = speciesId;
    this.name = species.name;
    this.type = species.type;
    this.glyph = species.glyph;
    this.level = level;
    this.astras = [...species.astras];

    // Derived stats (simple linear level scaling).
    this.stats = Atma._computeStats(species.base, level);

    this.maxHp = this.stats.hp;
    this.hp = this.maxHp;
    this.maxTapas = 100;
    this.tapas = 40; // start partially charged

    this.status = null;     // Nidra | Moha | Visha | Agnidah | null
    this.statusTurns = 0;
    this.bhakti = 0;        // friendship meter (0..100)
    this.usedBrahmastra = false;
    this.xp   = 0;          // experience points toward next level
    this.evolutionStage = 0;
    this._base = species.base; // saved for stat recalculation on level-up
  }

  static _computeStats(base, level) {
    const scale = (b) => Math.floor(b + (b * level) / 50 + level);
    return {
      hp: Math.floor(base.hp + (base.hp * level) / 40 + level + 8),
      atk: scale(base.atk),
      def: scale(base.def),
      spAtk: scale(base.spAtk),
      spDef: scale(base.spDef),
      speed: scale(base.speed),
    };
  }

  get isFainted() {
    return this.hp <= 0;
  }

  get hpPct() {
    return Math.max(0, this.hp / this.maxHp);
  }

  get tapasPct() {
    return Math.max(0, this.tapas / this.maxTapas);
  }

  takeDamage(amount) {
    const dmg = Math.max(0, Math.round(amount));
    this.hp = Math.max(0, this.hp - dmg);
    return dmg;
  }

  heal(amount) {
    const before = this.hp;
    this.hp = Math.min(this.maxHp, this.hp + Math.round(amount));
    return this.hp - before;
  }

  spendTapas(amount) {
    this.tapas = Math.max(0, this.tapas - amount);
  }

  regenTapas(amount = 12) {
    this.tapas = Math.min(this.maxTapas, this.tapas + amount);
  }

  // ─── XP / Levelling (Phase 3) ────────────────────────────────────
  addXp(amount) {
    if (!Number.isFinite(amount) || amount <= 0) return false;
    this.xp += amount;
    const needed = this._xpToNext();
    if (this.xp >= needed) {
      this.xp -= needed;
      this.level = Math.min(this.level + 1, 100);
      const b = this._base;
      const lv = this.level;
      this.maxHp  = Math.floor(b.hp  + (b.hp  * lv / 40) + lv + 8);
      this.stats.atk   = Math.floor(b.atk  + (b.atk  * lv / 50) + lv);
      this.stats.def   = Math.floor(b.def  + (b.def  * lv / 50) + lv);
      this.stats.spAtk = Math.floor(b.spAtk + (b.spAtk * lv / 50) + lv);
      this.stats.spDef = Math.floor(b.spDef + (b.spDef * lv / 50) + lv);
      this.stats.speed = Math.floor(b.speed + (b.speed * lv / 50) + lv);
      // Small heal-on-level
      this.hp = Math.min(this.hp + Math.floor(this.maxHp * 0.1), this.maxHp);
      return true; // caller can display level-up message
    }
    return false;
  }

  /** Returns true if the Atma can perform its Sadhana branch evolution. */
  canEvolve() {
    const evo = this.species?.evolution;
    if (!evo || this.evolutionStage >= 1) return false;
    return this.level >= evo.level && this.bhakti >= evo.bhakti;
  }

  /** Perform the Atma's branch evolution once conditions are met. */
  evolve() {
    const evo = this.species?.evolution;
    if (!evo || !this.canEvolve()) return false;

    const nextSpecies = getSpecies(evo.nextId);
    if (!nextSpecies) return false;

    this.species = nextSpecies;
    this.id = nextSpecies.id;
    this.name = evo.name || nextSpecies.name;
    this.type = nextSpecies.type;
    this.glyph = evo.glyph || nextSpecies.glyph;
    this.astras = [...nextSpecies.astras];
    this._base = nextSpecies.base;
    this.evolutionStage = 1;

    this.level = Math.min(this.level + (evo.levelBoost || 1), 100);
    this.stats = Atma._computeStats(this._base, this.level);

    const bonus = evo.bonus || {};
    this.stats.hp = Math.floor(this.stats.hp + (bonus.hp || 0));
    this.stats.atk = Math.floor(this.stats.atk + (bonus.atk || 0));
    this.stats.def = Math.floor(this.stats.def + (bonus.def || 0));
    this.stats.spAtk = Math.floor(this.stats.spAtk + (bonus.spAtk || 0));
    this.stats.spDef = Math.floor(this.stats.spDef + (bonus.spDef || 0));
    this.stats.speed = Math.floor(this.stats.speed + (bonus.speed || 0));

    this.maxHp = Math.floor(this.stats.hp);
    this.hp = Math.min(this.maxHp, this.hp + Math.max(8, Math.floor(this.maxHp * 0.15)));
    this.maxTapas = Math.min(120, this.maxTapas + 10);
    this.tapas = Math.min(this.maxTapas, this.tapas + 20);
    this.bhakti = Math.max(0, this.bhakti - 10);

    return true;
  }

  _xpToNext() {
    return Math.floor(Math.pow(this.level, 3) * 0.4 + 40);
  }

  canAfford(astra) {
    if (astra.oncePerBattle && this.usedBrahmastra) return false;
    return this.tapas >= astra.tapas;
  }

  reset() {
    this.hp = this.maxHp;
    this.tapas = 40;
    this.status = null;
    this.statusTurns = 0;
    this.usedBrahmastra = false;
  }
}
