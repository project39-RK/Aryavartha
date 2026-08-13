// ===================================================================
// Aryavarta — EncounterEngine (Phase 3)
// Handles:
//   1. Random encounter rolls when walking on Tall Grass tiles
//   2. Weighted species selection from the zone's encounter table
//   3. Level calculation for wild Atmas
//   4. Binding (capture) mechanic — success/failure with rate calc
//
// The OverworldEngine calls onStep() → EncounterEngine.checkStep()
// If an encounter triggers, it prepares the wild Atma and returns
// the encounter spec to main.js, which hands it to BattleEngine.
// ===================================================================

import { ATMA_SPECIES } from "../data/atmas.js";
import { MAPS, T, hasEncounter } from "../data/maps.js";
import { Atma } from "./Atma.js";
import { PlayerState } from "./PlayerState.js";

// ── Constants ─────────────────────────────────────────────────────

/** Minimum steps between encounters (prevents instant back-to-back) */
const ENCOUNTER_COOLDOWN = 3;

/** Chance multiplier for Rare species on the 3rd+ consecutive grass tile */
const RARE_LUCK_BONUS = 1.4;

// ── EncounterEngine ────────────────────────────────────────────────

export class EncounterEngine {
  constructor() {
    this._stepsSinceEncounter = 0; // cooldown counter
    this._consecutiveGrass    = 0; // consecutive grass steps (increases rare odds)
    this._lastGrassTile       = false;
  }

  // ── Step check ─────────────────────────────────────────────────

  /**
   * Called on every overworld step. Returns an encounter spec or null.
   * @param {string}  mapId    — current map ID
   * @param {number}  tileX
   * @param {number}  tileY
   * @param {number}  tileType — tile constant from T
   * @returns {{ wildAtma: Atma, speciesId, level, zone } | null}
   */
  checkStep(mapId, tileX, tileY, tileType) {
    const isGrass = tileType === T.GRASS;

    if (!isGrass) {
      this._consecutiveGrass = 0;
      this._lastGrassTile    = false;
      this._stepsSinceEncounter++;
      return null;
    }

    // Consecutive grass tracking (boosts rare chance)
    this._consecutiveGrass++;
    this._lastGrassTile = true;

    // Cooldown guard
    if (this._stepsSinceEncounter < ENCOUNTER_COOLDOWN) {
      this._stepsSinceEncounter++;
      return null;
    }

    const zone = MAPS[mapId];
    if (!zone) return null;

    const rate = zone.encounterRate || 0.15;
    if (Math.random() > rate) {
      this._stepsSinceEncounter++;
      return null;
    }

    // Pick a species from the table
    const table = zone.encounterTable?.[T.GRASS];
    if (!table || table.length === 0) return null;

    const species = this._weightedPick(table, this._consecutiveGrass >= 4);
    if (!species) return null;

    // Pick level within range
    const level = this._randInt(species.minLv, species.maxLv);

    // Create the wild Atma instance
    const wildAtma = new Atma(species.speciesId, level);

    // Reset cooldown
    this._stepsSinceEncounter = 0;

    return {
      wildAtma,
      speciesId: species.speciesId,
      level,
      zoneId: mapId,
    };
  }

  // ── Weighted random species pick ───────────────────────────────

  /**
   * Pick a species from the encounter table using weighted random.
   * @param {Array}   table      — encounter table entries
   * @param {boolean} luckBonus  — apply rare bonus multiplier
   */
  _weightedPick(table, luckBonus = false) {
    const modified = table.map((entry) => {
      const species = ATMA_SPECIES[entry.speciesId];
      let w = entry.weight;
      if (luckBonus && species?.rarity === "rare") w *= RARE_LUCK_BONUS;
      return { ...entry, _w: w };
    });

    const total = modified.reduce((s, e) => s + e._w, 0);
    let roll    = Math.random() * total;

    for (const entry of modified) {
      roll -= entry._w;
      if (roll <= 0) return entry;
    }
    return modified[modified.length - 1];
  }

  // ── Binding (capture) attempt ──────────────────────────────────

  /**
   * Attempt to bind a wild Atma. Returns a result object.
   *
   * @param {Atma}   wildAtma  — the target wild Atma
   * @param {Atma}   userAtma  — the player's current lead Atma
   * @returns {{
   *   success:   boolean,
   *   rate:      number,      // displayed success % (0–95)
   *   message:   string,
   *   destined?: "party"|"collection"  // only on success
   * }}
   */
  attemptBind(wildAtma, userAtma) {
    const rate = PlayerState.calcBindRate(wildAtma);

    // Fainted Atmas cannot be bound
    if (wildAtma.isFainted) {
      return {
        success: false,
        rate: 0,
        message: "The spirit has already faded. It cannot be bound when fainted.",
      };
    }

    // Must be below 30% HP for the bind button to be visible — enforce here too
    if (wildAtma.hpPct > 0.60) {
      return {
        success: false,
        rate: Math.round(rate * 100),
        message: `The spirit is still too fierce. Weaken it further before chanting. (${Math.round(rate * 100)}% chance)`,
      };
    }

    const roll    = Math.random();
    const success = roll <= rate;

    if (success) {
      // Actually bind — commit to PlayerState
      const destination = PlayerState.bindAtma(wildAtma);
      const specName     = ATMA_SPECIES[wildAtma.id]?.name || wildAtma.id;
      const dest         = destination === "party" ? "joined your party" : "was sent to your collection";
      return {
        success: true,
        rate: Math.round(rate * 100),
        message: `✦ The Binding Mantra resonates! ${specName} ${dest}.`,
        destination,
      };
    } else {
      return {
        success: false,
        rate: Math.round(rate * 100),
        message: `The spirit resists your mantra… (${Math.round(rate * 100)}% chance — try again or weaken further)`,
      };
    }
  }

  /**
   * Returns whether the Bind button should be shown for a wild Atma.
   * Shows when HP ≤ 60% (allows early attempts) and Atma is not fainted.
   */
  canAttemptBind(wildAtma) {
    return !wildAtma.isFainted && wildAtma.hpPct <= 0.60;
  }

  /**
   * Returns the estimated bind rate as a display string ("~42%").
   */
  bindRateDisplay(wildAtma) {
    const rate = PlayerState.calcBindRate(wildAtma);
    return `~${Math.round(rate * 100)}%`;
  }

  // ── XP & Bhakti rewards (wild battles) ──────────────────────────

  /**
   * Award XP, Bhakti, and a small loot drop to the player's active party
   * for defeating/binding a wild Atma. Returns an array of log messages.
   * @param {Atma}    wildAtma    — the wild Atma that was defeated/bound
   * @param {Atma[]}  playerParty — player's current party
   * @param {boolean} wasBound    — true if the Atma was bound (not defeated)
   * @param {string}  zoneId       — active overworld zone id, if known
   */
  awardWildRewards(wildAtma, playerParty, wasBound = false, zoneId = null) {
    const messages = [];
    const baseXP   = wildAtma.level * 8;
    const xpEarned = wasBound ? Math.floor(baseXP * 0.7) : baseXP;
    const bhaktiGain = wasBound ? 8 : 3;

    // Award to the entire party (reduced for benched)
    playerParty.forEach((atma, i) => {
      if (atma.isFainted) return;
      const share = i === 0 ? 1.0 : 0.5; // lead gets full XP
      const xp    = Math.round(xpEarned * share);

      const leveledUp = atma.addXp(xp);
      atma.bhakti = Math.min(100, atma.bhakti + (i === 0 ? bhaktiGain : 2));

      if (leveledUp) {
        messages.push(`✦ ${atma.name} grew to Level ${atma.level}!`);
      } else if (xp > 0) {
        messages.push(`✦ ${atma.name} gained ${xp} XP.`);
      }
    });

    const loot = this._lootFromEncounter(wildAtma, wasBound, zoneId);
    if (loot) {
      PlayerState.addItem(loot.id, loot.qty);
      const itemName = loot.label || loot.id;
      messages.push(`🧺 Forest reward: +${loot.qty} ${itemName}.`);
    }

    if (!wasBound && (PlayerState.karma.karuna || 0) >= 3) {
      PlayerState.addItem("tulsiLeaf", 1);
      messages.push("🕊 Karuna blessing: +1 Tulsi Leaf.");
    }

    if (wasBound && (PlayerState.karma.dharma || 0) >= 3) {
      PlayerState.addItem("bindingMantra", 1);
      messages.push("🛡 Dharma seal blessing: +1 Binding Mantra Scroll.");
    }

    return messages;
  }

  /**
   * Returns a small resource reward based on the wild encounter's rarity.
   * Bound Atmas give a more valuable reward than a plain win.
   * Deeper Tataka encounters also scale up to better recovery materials.
   */
  _lootFromEncounter(wildAtma, wasBound = false, zoneId = null) {
    const rarity = ATMA_SPECIES[wildAtma.id]?.rarity;

    if (zoneId === "tatakaDeeper") {
      if (wasBound) {
        return { id: "bindingMantra", qty: 2, label: "Binding Mantra Scrolls" };
      }
      if (rarity === "rare") {
        return { id: "sanjeevaniMax", qty: 1, label: "Sanjeevani Max" };
      }
      return { id: "tulsiLeaf", qty: 1, label: "Tulsi Leaf" };
    }

    if (wasBound) {
      return { id: "bindingMantra", qty: 1, label: "Binding Mantra Scroll" };
    }
    if (rarity === "rare") {
      return { id: "tulsiLeaf", qty: 1, label: "Tulsi Leaf" };
    }
    if (rarity === "uncommon") {
      return { id: "somaRasa", qty: 1, label: "Soma-Rasa" };
    }
    return { id: "sanjeevaniExtract", qty: 1, label: "Sanjeevani Extract" };
  }

  // ── Utility ────────────────────────────────────────────────────

  _randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /** Reset cooldown (e.g. when entering a new zone). */
  resetCooldown() {
    this._stepsSinceEncounter = ENCOUNTER_COOLDOWN;
    this._consecutiveGrass    = 0;
  }
}
