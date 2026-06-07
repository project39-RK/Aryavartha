// ===================================================================
// Aryavarta — Astra Database (the "moves")
// Astras are divine weapons invoked by mantras. They cost TAPAS
// (spiritual heat) instead of PP. category: physical | special | status
// ===================================================================

import { TYPES } from "./types.js";

// status effects an Astra can inflict
export const STATUS = {
  NIDRA: "Nidra",     // Sleep — skip turns
  MOHA: "Moha",       // Confusion — chance to hurt self
  VISHA: "Visha",     // Poison — chip damage each turn
  AGNIDAH: "Agnidah", // Burn — chip damage + lowers physical attack
};

export const ASTRAS = {
  // --- Basic / universal ---
  prahar: {
    id: "prahar", name: "Prahar (Strike)", type: TYPES.PRITHVI,
    category: "physical", power: 40, tapas: 0, accuracy: 100,
    desc: "A plain physical strike. Costs no Tapas.",
  },

  // --- Agni (Fire) ---
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

  // --- Jala (Water) ---
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

  // --- Vayu (Air) ---
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

  // --- Prithvi (Earth) ---
  shilaPaat: {
    id: "shilaPaat", name: "Shila-Paat", type: TYPES.PRITHVI,
    category: "physical", power: 55, tapas: 12, accuracy: 95,
    desc: "Hurls a heavy boulder.",
  },

  // --- Akash (Ether) ---
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

  // --- Naga / poison ---
  nagaPasha: {
    id: "nagaPasha", name: "Naga-Pasha", type: TYPES.JALA,
    category: "status", power: 0, tapas: 15, accuracy: 90,
    status: STATUS.VISHA, statusChance: 1.0,
    desc: "Venomous serpent-nooses that Poison the foe.",
  },

  // --- Support / healing ---
  sanjeevani: {
    id: "sanjeevani", name: "Sanjeevani-Mantra", type: TYPES.PRITHVI,
    category: "status", power: 0, tapas: 20, accuracy: 100,
    heal: 0.5,
    desc: "Channels healing herbs to restore 50% HP.",
  },

  // --- Ultimate ---
  brahmastra: {
    id: "brahmastra", name: "Brahmastra", type: TYPES.AKASH,
    category: "special", power: 140, tapas: 60, accuracy: 100, oncePerBattle: true,
    desc: "The ultimate divine weapon. Once per battle. Requires immense Tapas.",
  },
};

export function getAstra(id) {
  return ASTRAS[id];
}
