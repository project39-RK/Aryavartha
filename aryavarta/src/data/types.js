// ===================================================================
// Aryavarta — Elemental Type System
// Agni (Fire), Vayu (Air), Jala (Water), Prithvi (Earth), Akash (Ether)
//
// Type cycle (per GDD: "Agneyastra effective vs Prithvi, weak vs Jala"):
//   Agni    > Prithvi
//   Prithvi > Vayu
//   Vayu    > Jala
//   Jala    > Agni
//   Akash   = balanced void (neutral both ways, high innate stats)
// ===================================================================

export const TYPES = {
  AGNI: "Agni",       // Fire
  VAYU: "Vayu",       // Air
  JALA: "Jala",       // Water
  PRITHVI: "Prithvi", // Earth
  AKASH: "Akash",     // Ether / Void
};

export const TYPE_COLORS = {
  Agni: "#ff6b35",
  Vayu: "#9ad0ec",
  Jala: "#2e86de",
  Prithvi: "#8d6e3c",
  Akash: "#9b59b6",
};

// effectiveness[attacker][defender] = multiplier
const E = {
  Agni:    { Prithvi: 2.0, Jala: 0.5, Vayu: 2.0, Agni: 1.0, Akash: 1.0 },
  Prithvi: { Vayu: 2.0, Agni: 0.5, Jala: 0.5, Prithvi: 1.0, Akash: 1.0 },
  Vayu:    { Jala: 2.0, Prithvi: 0.5, Agni: 0.5, Vayu: 1.0, Akash: 1.0 },
  Jala:    { Agni: 2.0, Vayu: 0.5, Prithvi: 2.0, Jala: 1.0, Akash: 1.0 },
  Akash:   { Agni: 1.0, Vayu: 1.0, Jala: 1.0, Prithvi: 1.0, Akash: 1.0 },
};

/**
 * Returns the damage multiplier of an attacking type vs a defending type.
 */
export function typeEffectiveness(attackType, defendType) {
  if (!attackType || !defendType) return 1.0;
  return (E[attackType] && E[attackType][defendType]) ?? 1.0;
}

/**
 * Human-readable label for the effectiveness multiplier.
 */
export function effectivenessLabel(mult) {
  if (mult >= 2) return "It strikes true — the elements favor you!";
  if (mult <= 0.5) return "The elements resist...";
  return "";
}
