// ===================================================================
// Aryavarta — Astra Database (the "moves")
// Astras are divine weapons invoked by mantras. They cost TAPAS
// (spiritual heat) instead of PP. category: physical | special | status
// Phase 3 update: +8 new Astras (21 total)
// ===================================================================

import { TYPES } from "./types.js";

// status effects an Astra can inflict
export const STATUS = {
  NIDRA:    "Nidra",    // Sleep    — skip turns
  MOHA:     "Moha",     // Confusion — chance to hurt self
  VISHA:    "Visha",    // Poison   — chip damage each turn
  AGNIDAH:  "Agnidah",  // Burn     — chip damage + lowers physical attack
  BANDHA:   "Bandha",   // Bound    — cannot switch out (new)
  SHEETALA: "Sheetala", // Chill    — speed halved for 3 turns (new)
};

// buff effects (Phase 3)
export const BUFF = {
  KAVACH:     "Kavach",     // Defense raised 1 stage
  VAYU_GUARD: "VayuGuard",  // Speed raised 1 stage
};

// ────────────────────────────────────────────────────────────────────
// Phase 3 Astras — used by the 20 expanded Atma species
// ────────────────────────────────────────────────────────────────────
export const PHASE3_ASTRAS = {
  pakshaVaat: {
    id: "pakshaVaat", name: "Paksha-Vaat", type: "Vayu", category: "Physical",
    power: 55, tapas: 12, accuracy: 95,
    desc: "A powerful wing-gust that buffets the enemy with pure Vayu force.",
  },
  jalaChakra: {
    id: "jalaChakra", name: "Jala-Chakra", type: "Jala", category: "Special",
    power: 50, tapas: 12, accuracy: 100,
    desc: "A spinning water wheel that drenches the foe and slows physical moves.",
  },
  dhvaniTantra: {
    id: "dhvaniTantra", name: "Dhvani-Tantra", type: "Akash", category: "Special",
    power: 45, tapas: 14, accuracy: 90,
    desc: "Sonic resonance that disorients the target — 30% chance of Moha (Confusion).",
    effect: { chance: 0.30, status: "Moha" },
  },
  chandraKiran: {
    id: "chandraKiran", name: "Chandra-Kiran", type: "Akash", category: "Special",
    power: 50, tapas: 15, accuracy: 100,
    desc: "A beam of cool moonlight that heals 15% of caster's max HP after dealing damage.",
  },
  bhumiBandha: {
    id: "bhumiBandha", name: "Bhumi-Bandha", type: "Prithvi", category: "Status",
    power: 0, tapas: 16, accuracy: 85,
    desc: "Earth roots shoot up and bind the enemy — guarantees Visha (Poison) next turn.",
    effect: { chance: 1.0, status: "Visha" },
  },
  trishulaVeg: {
    id: "trishulaVeg", name: "Trishula-Veg", type: "Vayu", category: "Physical",
    power: 65, tapas: 18, accuracy: 90, priority: 0,
    desc: "A three-pronged strike that can hit multiple turns if the target is confused.",
  },
  agniKavach: {
    id: "agniKavach", name: "Agni-Kavach", type: "Agni", category: "Status",
    power: 0, tapas: 20, accuracy: 100,
    desc: "Wraps the caster in a shield of flame — raises Defense and burns melee attackers.",
  },
  vayuRaksha: {
    id: "vayuRaksha", name: "Vayu-Raksha", type: "Vayu", category: "Status",
    power: 0, tapas: 14, accuracy: 100,
    desc: "A wind barrier — raises the caster's Speed by one stage and grants first-strike priority for the next Astra.",
  },
  shulaPrahar: {
    id: "shulaPrahar", name: "Shula-Prahar", type: "Prithvi", category: "Physical",
    power: 45, tapas: 10, accuracy: 100,
    desc: "A standard horn or spike strike — reliable Prithvi damage with no side effects.",
  },
  vishaPhana: {
    id: "vishaPhana", name: "Visha-Phana", type: "Jala", category: "Status",
    power: 0, tapas: 14, accuracy: 90,
    desc: "Naga venom sprayed from fangs — 100% chance to inflict Visha (Poison).",
    effect: { chance: 1.0, status: "Visha" },
  },
  jangalaChhaya: {
    id: "jangalaChhaya", name: "Jangala-Chhaya", type: "Prithvi", category: "Status",
    power: 0, tapas: 12, accuracy: 100,
    desc: "Hides in forest shadow — raises Evasion and lowers enemy Accuracy by one stage.",
  },
  krodhaGhaat: {
    id: "krodhaGhaat", name: "Krodha-Ghaat", type: "Prithvi", category: "Physical",
    power: 70, tapas: 20, accuracy: 85,
    desc: "A maddened charge — high damage but user takes 10% recoil from the impact.",
  },
};

// ────────────────────────────────────────────────────────────────────
// Core Astras — Phases 1 & 2
// ────────────────────────────────────────────────────────────────────
export const ASTRAS = {
  // ── Basic / universal ──────────────────────────────────────────
  prahar: {
    id: "prahar", name: "Prahar (Strike)", type: TYPES.PRITHVI,
    category: "physical", power: 40, tapas: 0, accuracy: 100,
    desc: "A plain physical strike. Costs no Tapas.",
  },

  // ── Agni (Fire) ────────────────────────────────────────────────
  swarnaSpark: {
    id: "swarnaSpark", name: "Swarna-Spark", type: TYPES.AGNI,
    category: "special", power: 45, tapas: 10, accuracy: 100,
    desc: "A burst of golden sparks.",
  },
  agneyastra: {
    id: "agneyastra", name: "Agneyastra", type: TYPES.AGNI,
    category: "special", power: 80, tapas: 30, accuracy: 95,
    statusChance: 0.2, status: STATUS.AGNIDAH,
    desc: "Torrents of flame that may inflict Burn.",
  },
  // NEW — Phase 3
  agniKavach: {
    id: "agniKavach", name: "Agni-Kavach", type: TYPES.AGNI,
    category: "status", power: 0, tapas: 20, accuracy: 100,
    selfBuff: BUFF.KAVACH,
    desc: "Wraps the user in a fire shield, raising Defense by one stage.",
  },

  // ── Jala (Water) ───────────────────────────────────────────────
  jalaDhara: {
    id: "jalaDhara", name: "Jala-Dhara", type: TYPES.JALA,
    category: "special", power: 45, tapas: 10, accuracy: 100,
    desc: "A focused stream of water.",
  },
  varunastra: {
    id: "varunastra", name: "Varunastra", type: TYPES.JALA,
    category: "special", power: 85, tapas: 30, accuracy: 95,
    desc: "Summons a torrential flood.",
  },
  // NEW — Phase 3
  jalaChakra: {
    id: "jalaChakra", name: "Jala-Chakra", type: TYPES.JALA,
    category: "physical", power: 65, tapas: 18, accuracy: 100,
    desc: "A spinning water-wheel that churns through enemy defenses.",
  },

  // ── Vayu (Air) ─────────────────────────────────────────────────
  vayuVeg: {
    id: "vayuVeg", name: "Vayu-Veg", type: TYPES.VAYU,
    category: "physical", power: 50, tapas: 10, accuracy: 100, priority: 1,
    desc: "A swift gust that always strikes first.",
  },
  vajraMushti: {
    id: "vajraMushti", name: "Vajra-Mushti", type: TYPES.VAYU,
    category: "physical", power: 80, tapas: 25, accuracy: 100,
    desc: "The Diamond Fist — heavy physical blow.",
  },
  // NEW — Phase 3
  pakshaVaat: {
    id: "pakshaVaat", name: "Paksha-Vaat", type: TYPES.VAYU,
    category: "special", power: 60, tapas: 18, accuracy: 95,
    statusChance: 0.25, status: STATUS.SHEETALA,
    desc: "A razor wind from spread wings — may chill the foe, halving their speed.",
  },
  // NEW — Phase 3
  vayuRaksha: {
    id: "vayuRaksha", name: "Vayu-Raksha", type: TYPES.VAYU,
    category: "status", power: 0, tapas: 16, accuracy: 100,
    selfBuff: BUFF.VAYU_GUARD,
    desc: "Rides a rising wind current, boosting Speed by one stage.",
  },

  // ── Prithvi (Earth) ────────────────────────────────────────────
  shilaPaat: {
    id: "shilaPaat", name: "Shila-Paat", type: TYPES.PRITHVI,
    category: "physical", power: 55, tapas: 12, accuracy: 95,
    desc: "Hurls a heavy boulder.",
  },
  // NEW — Phase 3
  trishulaVeg: {
    id: "trishulaVeg", name: "Trishula-Veg", type: TYPES.PRITHVI,
    category: "physical", power: 90, tapas: 35, accuracy: 90,
    desc: "A three-pronged trident strike of earth-crystal. Devastating but costly.",
  },
  // NEW — Phase 3
  bhumiBandha: {
    id: "bhumiBandha", name: "Bhumi-Bandha", type: TYPES.PRITHVI,
    category: "status", power: 0, tapas: 18, accuracy: 90,
    status: STATUS.BANDHA, statusChance: 1.0,
    desc: "Roots of earth erupt and BIND the foe — they cannot switch out.",
  },

  // ── Akash (Ether) ──────────────────────────────────────────────
  mayaJaal: {
    id: "mayaJaal", name: "Maya-Jaal", type: TYPES.AKASH,
    category: "status", power: 0, tapas: 15, accuracy: 100,
    status: STATUS.MOHA, statusChance: 1.0,
    desc: "A web of illusion that Confuses the foe.",
  },
  nidraMantra: {
    id: "nidraMantra", name: "Nidra-Mantra", type: TYPES.AKASH,
    category: "status", power: 0, tapas: 18, accuracy: 75,
    status: STATUS.NIDRA, statusChance: 1.0,
    desc: "A lulling chant that puts the foe to Sleep.",
  },
  // NEW — Phase 3
  dhvaniTantra: {
    id: "dhvaniTantra", name: "Dhvani-Tantra", type: TYPES.AKASH,
    category: "special", power: 70, tapas: 22, accuracy: 95,
    statusChance: 0.3, status: STATUS.MOHA,
    desc: "A sacred sound-wave that resonates through the spirit — may cause Confusion.",
  },
  // NEW — Phase 3
  chandraKiran: {
    id: "chandraKiran", name: "Chandra-Kiran", type: TYPES.AKASH,
    category: "status", power: 0, tapas: 24, accuracy: 100,
    healOverTime: 0.15,    // 15% max HP regained per turn for 3 turns
    healTurns: 3,
    desc: "Moonlight bathes the user — restores 15% HP per turn for 3 turns.",
  },

  // ── Naga / poison ──────────────────────────────────────────────
  nagaPasha: {
    id: "nagaPasha", name: "Naga-Pasha", type: TYPES.JALA,
    category: "status", power: 0, tapas: 15, accuracy: 90,
    status: STATUS.VISHA, statusChance: 1.0,
    desc: "Venomous serpent-nooses that Poison the foe.",
  },

  // ── Support / healing ──────────────────────────────────────────
  sanjeevani: {
    id: "sanjeevani", name: "Sanjeevani-Mantra", type: TYPES.PRITHVI,
    category: "status", power: 0, tapas: 20, accuracy: 100,
    heal: 0.5,
    desc: "Channels healing herbs to restore 50% HP.",
  },

  // ── Ultimate ───────────────────────────────────────────────────
  brahmastra: {
    id: "brahmastra", name: "Brahmastra", type: TYPES.AKASH,
    category: "special", power: 140, tapas: 60, accuracy: 100, oncePerBattle: true,
    desc: "The ultimate divine weapon. Once per battle. Requires immense Tapas.",
  },
};

// Merge Phase 3 into the main lookup
Object.assign(ASTRAS, PHASE3_ASTRAS);

export function getAstra(id) {
  return ASTRAS[id] || null;
}
