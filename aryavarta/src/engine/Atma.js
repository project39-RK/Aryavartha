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
