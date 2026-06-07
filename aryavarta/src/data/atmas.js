// ===================================================================
// Aryavarta — Atma-Kosha (the creature "Pokédex")
// Each species defines base stats and a learnable Astra list.
// stats: hp, atk (physical), def, spAtk (special/astra), spDef, speed
// ===================================================================

import { TYPES } from "./types.js";

export const ATMA_SPECIES = {
  // ---------------- The Three Starters (Trimurti Choice) ----------------
  vaanJyoti: {
    id: "vaanJyoti", name: "Vaan-Jyoti", type: TYPES.AGNI,
    glyph: "🐒", inspiration: "Hanuman-line (Fire). Fast physical attacker.",
    base: { hp: 45, atk: 60, def: 40, spAtk: 50, spDef: 40, speed: 65 },
    astras: ["prahar", "swarnaSpark", "vayuVeg", "agneyastra"],
  },
  gajaPushpa: {
    id: "gajaPushpa", name: "Gaja-Pushpa", type: TYPES.PRITHVI,
    glyph: "🐘", inspiration: "Airavata-line (Earth). Defensive tank/healer.",
    base: { hp: 65, atk: 50, def: 60, spAtk: 45, spDef: 55, speed: 35 },
    astras: ["prahar", "shilaPaat", "sanjeevani", "vajraMushti"],
  },
  makarShishu: {
    id: "makarShishu", name: "Makar-Shishu", type: TYPES.JALA,
    glyph: "🐊", inspiration: "River-line (Water). Special Astra attacker.",
    base: { hp: 50, atk: 45, def: 45, spAtk: 65, spDef: 50, speed: 50 },
    astras: ["prahar", "jalaDhara", "nagaPasha", "varunastra"],
  },

  // ---------------- Common Wild Atmas (Tataka Forest) ----------------
  mushikaRatna: {
    id: "mushikaRatna", name: "Mushika-Ratna", type: TYPES.PRITHVI,
    glyph: "🐀", inspiration: "Ganesha's mount. Nimble item-finder.",
    base: { hp: 35, atk: 40, def: 30, spAtk: 30, spDef: 30, speed: 55 },
    astras: ["prahar", "shilaPaat"],
  },
  mayurPankh: {
    id: "mayurPankh", name: "Mayur-Pankh", type: TYPES.AKASH,
    glyph: "🦚", inspiration: "Peacock. Illusionist that lowers accuracy.",
    base: { hp: 40, atk: 35, def: 35, spAtk: 50, spDef: 45, speed: 50 },
    astras: ["prahar", "mayaJaal", "swarnaSpark"],
  },
  shyenaVeg: {
    id: "shyenaVeg", name: "Shyena-Veg", type: TYPES.VAYU,
    glyph: "🦅", inspiration: "Falcon scout. High-speed flyer.",
    base: { hp: 38, atk: 55, def: 32, spAtk: 35, spDef: 32, speed: 70 },
    astras: ["prahar", "vayuVeg", "vajraMushti"],
  },
  sarpDhara: {
    id: "sarpDhara", name: "Sarp-Dhara", type: TYPES.JALA,
    glyph: "🐍", inspiration: "Water serpent. Poison & binding.",
    base: { hp: 42, atk: 45, def: 38, spAtk: 48, spDef: 40, speed: 48 },
    astras: ["prahar", "jalaDhara", "nagaPasha"],
  },
  vrikshaAnsh: {
    id: "vrikshaAnsh", name: "Vriksha-Ansh", type: TYPES.PRITHVI,
    glyph: "🌳", inspiration: "Tree spirit. Sturdy anchor.",
    base: { hp: 55, atk: 48, def: 55, spAtk: 35, spDef: 45, speed: 25 },
    astras: ["prahar", "shilaPaat", "nidraMantra"],
  },
  kapiShaka: {
    id: "kapiShaka", name: "Kapi-Shaka", type: TYPES.VAYU,
    glyph: "🙊", inspiration: "Vanara warrior. Agile climber.",
    base: { hp: 44, atk: 52, def: 40, spAtk: 38, spDef: 38, speed: 60 },
    astras: ["prahar", "vayuVeg", "vajraMushti"],
  },
};

export const STARTER_IDS = ["vaanJyoti", "gajaPushpa", "makarShishu"];
export const WILD_IDS = [
  "mushikaRatna", "mayurPankh", "shyenaVeg",
  "sarpDhara", "vrikshaAnsh", "kapiShaka",
];

export function getSpecies(id) {
  return ATMA_SPECIES[id];
}
