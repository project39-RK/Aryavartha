// ===================================================================
// Aryavarta — PlayerState (Singleton)
// Persistent player state across Story, Overworld, and Battle screens.
// Saves to / loads from localStorage so progress survives page refresh.
//
// Holds:
//   party       — active team (up to 6 Atma instances)
//   collection  — ALL bound/captured Atmas ever obtained
//   inventory   — consumable items with quantities
//   position    — current map tile position
//   karma       — four karma axes (dharma, shakti, jnana, karuna)
//   seals       — earned Dharma Seals
//   starterId   — chosen starter species ID
//   steps       — total steps taken in the overworld
// ===================================================================

import { ATMA_SPECIES } from "../data/atmas.js";
import { Atma } from "./Atma.js";

const SAVE_KEY = "aryavarta_v1_save";
const MAX_PARTY = 6;

// ── Default item catalogue ─────────────────────────────────────────

export const ITEMS = {
  sanjeevaniExtract: {
    id: "sanjeevaniExtract", name: "Sanjeevani Extract",
    glyph: "🌿", desc: "Restores 40 HP to one Atma.",
    effect: "heal", value: 40,
  },
  somaRasa: {
    id: "somaRasa", name: "Soma-Rasa",
    glyph: "🪔", desc: "Restores 30 Tapas to one Atma.",
    effect: "tapas", value: 30,
  },
  tulsiLeaf: {
    id: "tulsiLeaf", name: "Tulsi Leaf",
    glyph: "🪴", desc: "Cures Poison (Visha) or Curse status.",
    effect: "cure_visha",
  },
  sanjeevaniMax: {
    id: "sanjeevaniMax", name: "Sanjeevani Max",
    glyph: "🌺", desc: "Fully restores HP and clears all debuffs.",
    effect: "full_heal",
  },
  bindingMantra: {
    id: "bindingMantra", name: "Binding Mantra Scroll",
    glyph: "📜", desc: "Adds +20% to the next Binding attempt on a wild Atma.",
    effect: "bind_boost", value: 0.2,
  },
};

export const CRAFT_RECIPES = {
  sanjeevaniMax: {
    id: "sanjeevaniMax",
    name: "Sanjeevani Max",
    desc: "Forge a full-heal tonic using a Tulsi Leaf and two extracts.",
    requires: {
      sanjeevaniExtract: 2,
      tulsiLeaf: 1,
    },
  },
  bindingMantra: {
    id: "bindingMantra",
    name: "Binding Mantra Scroll",
    desc: "Blend Soma-Rasa and Tulsi Leaf into a binding aid.",
    requires: {
      somaRasa: 1,
      tulsiLeaf: 1,
    },
  },
};

// ── PlayerState module ─────────────────────────────────────────────

class _PlayerState {
  constructor() {
    this._listeners = [];
    this._reset();
  }

  // ── Initialization ──────────────────────────────────────────────

  _reset() {
    this.party      = [];          // Atma instances (max 6)
    this.collection = [];          // { speciesId, level, nickname } records
    this.inventory  = {};          // { itemId: quantity }
    this.position   = { mapId: "ayodhyaOutskirts", tileX: 5, tileY: 9 };
    this.karma      = { dharma: 0, shakti: 0, jnana: 0, karuna: 0 };
    this.seals      = [];
    this.starterId  = null;
    this.steps      = 0;
    this.bindBoostNext = 0;        // extra bind rate from items
    this.craftRecipes = CRAFT_RECIPES;
  }

  /** Returns true if a valid save exists in localStorage. */
  hasSave() {
    return !!localStorage.getItem(SAVE_KEY);
  }

  /** Save current state to localStorage. */
  save() {
    const serialized = {
      party: this.party.map((a) => ({
        speciesId: a.id,
        level: a.level,
        hp: a.hp,
        tapas: a.tapas,
        bhakti: a.bhakti,
        status: a.status,
        xp: a.xp,
        usedBrahmastra: a.usedBrahmastra,
      })),
      collection: this.collection,
      inventory: this.inventory,
      position: this.position,
      karma: this.karma,
      seals: this.seals,
      starterId: this.starterId,
      steps: this.steps,
      bindBoostNext: this.bindBoostNext,
    };
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(serialized)); } catch (_) {}
  }

  /** Load state from localStorage. */
  load() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return false;
      const data = JSON.parse(raw);

      this.collection    = data.collection   || [];
      this.inventory     = data.inventory    || {};
      this.position      = data.position     || { mapId: "ayodhyaOutskirts", tileX: 5, tileY: 9 };
      this.karma         = data.karma        || { dharma: 0, shakti: 0, jnana: 0, karuna: 0 };
      this.seals         = data.seals        || [];
      this.starterId     = data.starterId    || null;
      this.steps         = data.steps        || 0;
      this.bindBoostNext = data.bindBoostNext || 0;

      // Re-inflate Atma instances from serialized party
      this.party = [];
      for (const saved of (data.party || [])) {
        if (!ATMA_SPECIES[saved.speciesId]) continue;
        const atma = new Atma(saved.speciesId, saved.level);
        atma.hp     = Math.min(saved.hp, atma.maxHp);
        atma.tapas  = Math.min(saved.tapas, atma.maxTapas);
        atma.bhakti = saved.bhakti || 0;
        atma.status = saved.status || null;
        atma.xp     = Number.isFinite(saved.xp) ? saved.xp : 0;
        atma.usedBrahmastra = !!saved.usedBrahmastra;
        this.party.push(atma);
      }
      return true;
    } catch (_) { return false; }
  }

  /** Wipe save data and reset to defaults. */
  clear() {
    localStorage.removeItem(SAVE_KEY);
    this._reset();
    this._notify("reset");
  }

  // ── Party management ────────────────────────────────────────────

  /** True if the party has room for one more. */
  canAddToParty() { return this.party.length < MAX_PARTY; }

  /**
   * Add a freshly-bound Atma to the party or collection.
   * Returns "party" or "collection" depending on where it went.
   */
  bindAtma(atmaInstance) {
    // Add to collection record
    this.collection.push({
      speciesId: atmaInstance.id,
      level: atmaInstance.level,
      nickname: null,
    });

    // If party has room, add directly; otherwise stash in collection only
    if (this.canAddToParty()) {
      this.party.push(atmaInstance);
      this.save();
      this._notify("partyChanged");
      return "party";
    }
    this.save();
    this._notify("collectionChanged");
    return "collection";
  }

  /** Set the active party from a given array (for party management screen). */
  setParty(atmaArray) {
    this.party = atmaArray.slice(0, MAX_PARTY);
    this.save();
    this._notify("partyChanged");
  }

  /** Remove an Atma from the active party and keep it in the collection log. */
  removeFromParty(index) {
    if (index < 0 || index >= this.party.length) return false;
    const removed = this.party.splice(index, 1)[0];
    if (!removed) return false;

    this.collection.push({
      speciesId: removed.id,
      level: removed.level,
      nickname: null,
    });
    this.save();
    this._notify("partyChanged");
    return true;
  }

  /** Add an already-bound Atma back to the active party from the collection log. */
  addToPartyFromCollection(recordIndex) {
    if (!this.canAddToParty()) return false;
    const record = this.collection[recordIndex];
    if (!record) return false;

    const atma = new Atma(record.speciesId, record.level);
    atma.bhakti = record.bhakti || 0;
    this.party.push(atma);
    this.save();
    this._notify("partyChanged");
    return true;
  }

  /** Heal the entire party to full HP and clear statuses. */
  healPartyFull() {
    this.party.forEach((a) => a.reset());
    this.save();
    this._notify("partyChanged");
  }

  /**
   * Set the starter Atma at the start of the game.
   * Gives the player 3 starter-level Atmas and 3 basic items.
   */
  initWithStarter(starterId) {
    this.starterId = starterId;
    const start = new Atma(starterId, 5);
    this.party = [start];
    this.inventory = {
      sanjeevaniExtract: 3,
      somaRasa: 2,
      tulsiLeaf: 1,
    };
    this.save();
    this._notify("partyChanged");
  }

  // ── Inventory ────────────────────────────────────────────────────

  addItem(itemId, qty = 1) {
    this.inventory[itemId] = (this.inventory[itemId] || 0) + qty;
    this.save();
    this._notify("inventoryChanged");
  }

  /** Use an item on an Atma instance. Returns true if used successfully. */
  useItem(itemId, targetAtma) {
    const qty = this.inventory[itemId] || 0;
    if (qty <= 0) return false;
    const item = ITEMS[itemId];
    if (!item) return false;

    let used = false;
    switch (item.effect) {
      case "heal":
        if (targetAtma.hp < targetAtma.maxHp) {
          targetAtma.heal(item.value);
          used = true;
        }
        break;
      case "tapas":
        if (targetAtma.tapas < targetAtma.maxTapas) {
          targetAtma.regenTapas(item.value);
          used = true;
        }
        break;
      case "full_heal":
        targetAtma.reset();
        used = true;
        break;
      case "cure_visha":
        if (targetAtma.status === "Visha" || targetAtma.status === "Curse") {
          targetAtma.status = null;
          used = true;
        }
        break;
      case "bind_boost":
        this.bindBoostNext += item.value;
        used = true;
        break;
    }

    if (used) {
      this.inventory[itemId]--;
      if (this.inventory[itemId] <= 0) delete this.inventory[itemId];
      this.save();
      this._notify("inventoryChanged");
    }
    return used;
  }

  getItemCount(itemId) { return this.inventory[itemId] || 0; }

  canCraft(recipeId) {
    const recipe = CRAFT_RECIPES[recipeId];
    if (!recipe) return false;
    return Object.entries(recipe.requires).every(([itemId, qty]) => (this.inventory[itemId] || 0) >= qty);
  }

  craftItem(recipeId) {
    const recipe = CRAFT_RECIPES[recipeId];
    if (!recipe || !this.canCraft(recipeId)) return false;

    Object.entries(recipe.requires).forEach(([itemId, qty]) => {
      this.inventory[itemId] -= qty;
      if (this.inventory[itemId] <= 0) delete this.inventory[itemId];
    });

    this.addItem(recipe.id, 1);
    return true;
  }

  // ── Position ──────────────────────────────────────────────────────

  updatePosition(mapId, tileX, tileY) {
    this.position = { mapId, tileX, tileY };
    // Do NOT save every step — too expensive. Caller does save() when needed.
  }

  incrementSteps() {
    this.steps++;
    if (this.steps % 20 === 0) this.save(); // Auto-save every 20 steps
  }

  // ── Karma ─────────────────────────────────────────────────────────

  applyKarma(axis, val) {
    this.karma[axis] = (this.karma[axis] || 0) + val;
    this.save();
    this._notify("karmaChanged");
  }

  syncKarmaFromStory(karmaObj) {
    Object.assign(this.karma, karmaObj);
    this.save();
    this._notify("karmaChanged");
  }

  // ── Seals ─────────────────────────────────────────────────────────

  addSeal(name, glyph, desc) {
    const already = this.seals.some((seal) => seal.name === name);
    if (!already) this.seals.push({ name, glyph, desc });
    this.save();
    this._notify("sealsChanged");
  }

  getKarmaBonus() {
    const sealBonus = this.seals.length * 0.01;
    const dharmaBonus = (this.karma.dharma || 0) * 0.01;
    const jnanaBonus = (this.karma.jnana || 0) * 0.01;
    const karunaBonus = (this.karma.karuna || 0) * 0.005;
    return Math.min(0.25, sealBonus + dharmaBonus + jnanaBonus + karunaBonus);
  }

  // ── Bind rate ─────────────────────────────────────────────────────

  /**
   * Calculate the success rate for binding (capturing) a wild Atma.
   * @param {Atma} wildAtma - the target atma
   * @returns {number} probability 0–1
   */
  calcBindRate(wildAtma) {
    const hpPct = wildAtma.hpPct;             // 0 = fainted, 1 = full
    const activeBhakti = this.party[0]?.bhakti || 0;
    const bhaktiBonus  = (activeBhakti / 100) * 0.15;
    const karmaBonus   = this.getKarmaBonus();
    const baseRate     = 0.30;
    const hpBonus      = (1 - hpPct) * 0.55; // lower HP = higher catch rate

    const total = Math.min(0.95, baseRate + hpBonus + bhaktiBonus + karmaBonus + this.bindBoostNext);
    this.bindBoostNext = 0; // consume the boost
    return total;
  }

  // ── Event listeners ───────────────────────────────────────────────

  on(fn) { this._listeners.push(fn); }
  off(fn) { this._listeners = this._listeners.filter((l) => l !== fn); }
  _notify(event) { this._listeners.forEach((fn) => fn(event)); }

  // ── Debug helpers ─────────────────────────────────────────────────

  get partySize()      { return this.party.length; }
  get collectedCount() { return this.collection.length; }
  get isPartyFull()    { return this.party.length >= MAX_PARTY; }

  /** Returns the lead (active) party Atma. */
  get lead()           { return this.party[0] || null; }

  /** Returns true if ALL party Atmas are fainted. */
  get isBlackedOut()   { return this.party.length > 0 && this.party.every((a) => a.isFainted); }
}

// Export a singleton instance
export const PlayerState = new _PlayerState();
