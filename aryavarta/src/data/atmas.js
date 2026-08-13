// ===================================================================
// Aryavarta — Atma-Kosha (the creature "Pokédex")
// Each species defines base stats and a learnable Astra list.
// stats: hp, atk (physical), def, spAtk (special/astra), spDef, speed
// Phase 3 update: +14 new species (23 total wild/common species)
// ===================================================================

import { TYPES } from "./types.js";

export const ATMA_SPECIES = {

  // ────────────── The Three Starters (Trimurti Choice) ────────────

  vaanJyoti: {
    id: "vaanJyoti", name: "Vaan-Jyoti", type: TYPES.AGNI,
    glyph: "🐒", inspiration: "Hanuman-line (Fire). Fast physical attacker.",
    rarity: "starter",
    base: { hp: 45, atk: 60, def: 40, spAtk: 50, spDef: 40, speed: 65 },
    astras: ["prahar", "swarnaSpark", "vayuVeg", "agneyastra"],
    evolution: {
      nextId: "vaanJyotiAscended",
      name: "Vaan-Jyoti Ascended",
      glyph: "🔥",
      level: 8,
      bhakti: 75,
      levelBoost: 1,
      bonus: { hp: 14, atk: 12, def: 4, spAtk: 8, spDef: 6, speed: 12 },
    },
  },
  vaanJyotiAscended: {
    id: "vaanJyotiAscended", name: "Vaan-Jyoti Ascended", type: TYPES.AGNI,
    glyph: "🔥", inspiration: "The first Sadhana path of the Vaan-Jyoti line.",
    rarity: "rare",
    base: { hp: 60, atk: 78, def: 44, spAtk: 58, spDef: 48, speed: 78 },
    astras: ["prahar", "swarnaSpark", "vayuVeg", "agneyastra"],
  },
  gajaPushpa: {
    id: "gajaPushpa", name: "Gaja-Pushpa", type: TYPES.PRITHVI,
    glyph: "🐘", inspiration: "Airavata-line (Earth). Defensive tank/healer.",
    rarity: "starter",
    base: { hp: 65, atk: 50, def: 60, spAtk: 45, spDef: 55, speed: 35 },
    astras: ["prahar", "shilaPaat", "sanjeevani", "vajraMushti"],
    evolution: {
      nextId: "gajaPushpaAscended",
      name: "Gaja-Pushpa Ascended",
      glyph: "🛡️",
      level: 8,
      bhakti: 75,
      levelBoost: 1,
      bonus: { hp: 16, atk: 8, def: 12, spAtk: 6, spDef: 10, speed: 4 },
    },
  },
  gajaPushpaAscended: {
    id: "gajaPushpaAscended", name: "Gaja-Pushpa Ascended", type: TYPES.PRITHVI,
    glyph: "🛡️", inspiration: "The earthward Sadhana path of the Gaja-Pushpa line.",
    rarity: "rare",
    base: { hp: 82, atk: 58, def: 74, spAtk: 52, spDef: 66, speed: 40 },
    astras: ["prahar", "shilaPaat", "sanjeevani", "vajraMushti"],
  },
  makarShishu: {
    id: "makarShishu", name: "Makar-Shishu", type: TYPES.JALA,
    glyph: "🐊", inspiration: "River-line (Water). Special Astra attacker.",
    rarity: "starter",
    base: { hp: 50, atk: 45, def: 45, spAtk: 65, spDef: 50, speed: 50 },
    astras: ["prahar", "jalaDhara", "nagaPasha", "varunastra"],
    evolution: {
      nextId: "makarShishuAscended",
      name: "Makar-Shishu Ascended",
      glyph: "🌊",
      level: 8,
      bhakti: 75,
      levelBoost: 1,
      bonus: { hp: 12, atk: 6, def: 6, spAtk: 14, spDef: 10, speed: 8 },
    },
  },
  makarShishuAscended: {
    id: "makarShishuAscended", name: "Makar-Shishu Ascended", type: TYPES.JALA,
    glyph: "🌊", inspiration: "The riverbound Sadhana path of the Makar-Shishu line.",
    rarity: "rare",
    base: { hp: 64, atk: 54, def: 52, spAtk: 82, spDef: 62, speed: 60 },
    astras: ["prahar", "jalaDhara", "nagaPasha", "varunastra"],
  },

  // ────────────── Common Wild Atmas — Tataka Forest ────────────────

  mushikaRatna: {
    id: "mushikaRatna", name: "Mushika-Ratna", type: TYPES.PRITHVI,
    glyph: "🐀", inspiration: "Ganesha's mount. Nimble item-finder.",
    rarity: "common",
    zones: ["ayodhyaOutskirts", "tatakaForestEdge"],
    base: { hp: 35, atk: 40, def: 30, spAtk: 30, spDef: 30, speed: 55 },
    astras: ["prahar", "shilaPaat"],
  },
  mayurPankh: {
    id: "mayurPankh", name: "Mayur-Pankh", type: TYPES.AKASH,
    glyph: "🦚", inspiration: "Peacock. Illusionist that lowers accuracy.",
    rarity: "common",
    zones: ["tatakaForestEdge"],
    base: { hp: 40, atk: 35, def: 35, spAtk: 50, spDef: 45, speed: 50 },
    astras: ["prahar", "mayaJaal", "swarnaSpark", "dhvaniTantra"],
  },
  shyenaVeg: {
    id: "shyenaVeg", name: "Shyena-Veg", type: TYPES.VAYU,
    glyph: "🦅", inspiration: "Falcon scout. High-speed flyer.",
    rarity: "common",
    zones: ["ayodhyaOutskirts", "tatakaForestEdge"],
    base: { hp: 38, atk: 55, def: 32, spAtk: 35, spDef: 32, speed: 70 },
    astras: ["prahar", "vayuVeg", "pakshaVaat", "vajraMushti"],
  },
  sarpDhara: {
    id: "sarpDhara", name: "Sarp-Dhara", type: TYPES.JALA,
    glyph: "🐍", inspiration: "Water serpent. Poison & binding.",
    rarity: "common",
    zones: ["tatakaForestEdge"],
    base: { hp: 42, atk: 45, def: 38, spAtk: 48, spDef: 40, speed: 48 },
    astras: ["prahar", "jalaDhara", "nagaPasha", "bhumiBandha"],
  },
  vrikshaAnsh: {
    id: "vrikshaAnsh", name: "Vriksha-Ansh", type: TYPES.PRITHVI,
    glyph: "🌳", inspiration: "Tree spirit. Sturdy anchor.",
    rarity: "common",
    zones: ["tatakaForestEdge"],
    base: { hp: 55, atk: 48, def: 55, spAtk: 35, spDef: 45, speed: 25 },
    astras: ["prahar", "shilaPaat", "nidraMantra", "bhumiBandha"],
  },
  kapiShaka: {
    id: "kapiShaka", name: "Kapi-Shaka", type: TYPES.VAYU,
    glyph: "🙊", inspiration: "Vanara warrior. Agile climber.",
    rarity: "common",
    zones: ["tatakaForestEdge"],
    base: { hp: 44, atk: 52, def: 40, spAtk: 38, spDef: 38, speed: 60 },
    astras: ["prahar", "vayuVeg", "vajraMushti", "vayuRaksha"],
  },

  // ────────────── NEW Phase 3 Species ────────────────────────────

  // Birds — Vayu / Akash flyers
  ulukaVith: {
    id: "ulukaVith", name: "Uluka-Vith", type: TYPES.VAYU,
    glyph: "🦉", inspiration: "Owl spirit — silent hunter, preys on lone forest travelers.",
    rarity: "uncommon",
    zones: ["tatakaForestEdge"],
    base: { hp: 42, atk: 50, def: 38, spAtk: 55, spDef: 42, speed: 58 },
    astras: ["prahar", "pakshaVaat", "nidraMantra", "mayaJaal"],
  },
  bakaNadi: {
    id: "bakaNadi", name: "Baka-Nadi", type: TYPES.JALA,
    glyph: "🦩", inspiration: "Crane-headed river spirit, favored by water deities.",
    rarity: "uncommon",
    zones: ["tatakaForestEdge"],
    base: { hp: 48, atk: 40, def: 45, spAtk: 58, spDef: 50, speed: 42 },
    astras: ["prahar", "jalaDhara", "jalaChakra", "sanjeevani"],
  },

  // Beasts — Prithvi ground creatures
  hariVana: {
    id: "hariVana", name: "Hari-Vana", type: TYPES.PRITHVI,
    glyph: "🦌", inspiration: "Deer spirit — embodies grace and speed.",
    rarity: "common",
    zones: ["ayodhyaOutskirts", "tatakaForestEdge"],
    base: { hp: 38, atk: 42, def: 32, spAtk: 30, spDef: 38, speed: 68 },
    astras: ["prahar", "vayuVeg", "shilaPaat"],
  },
  mahiVrish: {
    id: "mahiVrish", name: "Mahi-Vrish", type: TYPES.PRITHVI,
    glyph: "🐂", inspiration: "Bull spirit — strength and relentless labor.",
    rarity: "common",
    zones: ["ayodhyaOutskirts"],
    base: { hp: 58, atk: 62, def: 50, spAtk: 28, spDef: 42, speed: 32 },
    astras: ["prahar", "shilaPaat", "trishulaVeg", "agniKavach"],
  },
  varahaKrodh: {
    id: "varahaKrodh", name: "Varaha-Krodh", type: TYPES.PRITHVI,
    glyph: "🐗", inspiration: "Boar spirit — fearsome momentum charge.",
    rarity: "uncommon",
    zones: ["tatakaForestEdge"],
    base: { hp: 52, atk: 65, def: 44, spAtk: 24, spDef: 36, speed: 44 },
    astras: ["prahar", "vajraMushti", "trishulaVeg", "bhumiBandha"],
  },
  bhalluMukh: {
    id: "bhalluMukh", name: "Bhallu-Mukh", type: TYPES.PRITHVI,
    glyph: "🐻", inspiration: "Heavy-hitting bear spirit found in dark caves.",
    rarity: "uncommon",
    zones: ["tatakaForestEdge"],
    base: { hp: 62, atk: 68, def: 55, spAtk: 28, spDef: 45, speed: 28 },
    astras: ["prahar", "shilaPaat", "trishulaVeg", "vajraMushti"],
  },

  // Vanaras — monkey-folk healers/support
  vanarVaidya: {
    id: "vanarVaidya", name: "Vanar-Vaidya", type: TYPES.JALA,
    glyph: "🐵", inspiration: "Healer-class monkey using ancient herbal knowledge.",
    rarity: "uncommon",
    zones: ["tatakaForestEdge"],
    base: { hp: 50, atk: 38, def: 44, spAtk: 55, spDef: 52, speed: 46 },
    astras: ["prahar", "jalaDhara", "sanjeevani", "chandraKiran"],
  },

  // Mythic — nature spirits and divine creatures
  yakshaGupta: {
    id: "yakshaGupta", name: "Yaksha-Gupta", type: TYPES.AKASH,
    glyph: "✨", inspiration: "Ancient nature spirit guarding hidden forest treasures.",
    rarity: "rare",
    zones: ["tatakaForestEdge"],
    base: { hp: 46, atk: 42, def: 50, spAtk: 62, spDef: 58, speed: 42 },
    astras: ["prahar", "mayaJaal", "dhvaniTantra", "chandraKiran"],
  },
  ganaRudra: {
    id: "ganaRudra", name: "Gana-Rudra", type: TYPES.PRITHVI,
    glyph: "🗿", inspiration: "Mischievous guardian spirit with strong defensive buffs.",
    rarity: "uncommon",
    zones: ["tatakaForestEdge"],
    base: { hp: 58, atk: 44, def: 65, spAtk: 38, spDef: 55, speed: 30 },
    astras: ["prahar", "shilaPaat", "agniKavach", "bhumiBandha"],
  },
  kinnaraGayak: {
    id: "kinnaraGayak", name: "Kinnara-Gayak", type: TYPES.AKASH,
    glyph: "🎵", inspiration: "Musical half-bird/half-human — uses sound attacks.",
    rarity: "rare",
    zones: ["tatakaForestEdge"],
    base: { hp: 44, atk: 38, def: 40, spAtk: 68, spDef: 52, speed: 52 },
    astras: ["prahar", "dhvaniTantra", "nidraMantra", "chandraKiran"],
  },
  makaraDal: {
    id: "makaraDal", name: "Makara-Dal", type: TYPES.JALA,
    glyph: "🐟", inspiration: "Croc-fish hybrid — ancient guardian of thresholds.",
    rarity: "uncommon",
    zones: ["tatakaForestEdge"],
    base: { hp: 54, atk: 52, def: 50, spAtk: 46, spDef: 44, speed: 36 },
    astras: ["prahar", "jalaChakra", "varunastra", "nagaPasha"],
  },
  bhutaDaan: {
    id: "bhutaDaan", name: "Bhuta-Daan", type: TYPES.AKASH,
    glyph: "👻", inspiration: "Ethereal spirit found near ancient temple ruins.",
    rarity: "rare",
    zones: ["tatakaForestEdge"],
    base: { hp: 40, atk: 36, def: 30, spAtk: 72, spDef: 60, speed: 62 },
    astras: ["prahar", "mayaJaal", "dhvaniTantra", "nidraMantra"],
  },
  nagaKanya: {
    id: "nagaKanya", name: "Naga-Kanya", type: TYPES.JALA,
    glyph: "🐉", inspiration: "Serpent-woman spirit — focuses on poison and binding.",
    rarity: "rare",
    zones: ["tatakaForestEdge"],
    base: { hp: 48, atk: 50, def: 45, spAtk: 60, spDef: 55, speed: 50 },
    astras: ["prahar", "nagaPasha", "bhumiBandha", "varunastra"],
  },
  yaliKanth: {
    id: "yaliKanth", name: "Yali-Kanth", type: TYPES.PRITHVI,
    glyph: "🦁", inspiration: "Part-lion, part-elephant — fierce speed and endurance.",
    rarity: "rare",
    zones: ["tatakaForestEdge"],
    base: { hp: 56, atk: 66, def: 52, spAtk: 36, spDef: 46, speed: 56 },
    astras: ["prahar", "vajraMushti", "trishulaVeg", "vayuVeg"],
  },
};

// ── Exported ID groups ─────────────────────────────────────────────

export const STARTER_IDS = ["vaanJyoti", "gajaPushpa", "makarShishu"];

/** All non-starter, non-boss species usable in wild encounters */
export const WILD_IDS = [
  // original six
  "mushikaRatna", "mayurPankh", "shyenaVeg",
  "sarpDhara", "vrikshaAnsh", "kapiShaka",
  // Phase 3 additions
  "ulukaVith", "bakaNadi", "hariVana", "mahiVrish",
  "varahaKrodh", "bhalluMukh", "vanarVaidya",
  "yakshaGupta", "ganaRudra", "kinnaraGayak",
  "makaraDal", "bhutaDaan", "nagaKanya", "yaliKanth",
];

/** Common species (frequent encounters) */
export const COMMON_IDS = WILD_IDS.filter(
  (id) => ATMA_SPECIES[id]?.rarity === "common"
);

/** Uncommon species */
export const UNCOMMON_IDS = WILD_IDS.filter(
  (id) => ATMA_SPECIES[id]?.rarity === "uncommon"
);

/** Rare species */
export const RARE_IDS = WILD_IDS.filter(
  (id) => ATMA_SPECIES[id]?.rarity === "rare"
);

export function getSpecies(id) {
  return ATMA_SPECIES[id];
}

/** Returns all species that appear in a given zone */
export function getSpeciesForZone(zoneId) {
  return WILD_IDS.filter((id) => {
    const s = ATMA_SPECIES[id];
    return s?.zones && s.zones.includes(zoneId);
  });
}
