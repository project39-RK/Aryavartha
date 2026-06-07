// ===================================================================
// Aryavarta — Vyuha (Formation) System
// Before/within battle, the active Atma fights under a chosen Vyuha
// that grants team-wide combat modifiers. Switching costs Tapas.
// (MVP models the strategic bonuses as flat multipliers/flags.)
// ===================================================================

export const VYUHAS = {
  chakra: {
    id: "chakra", name: "Chakra-Vyuha (The Wheel)", shape: "Circular",
    desc: "Increases Defense of the lead Atma; attackers take recoil.",
    mods: { defMult: 1.3, atkMult: 0.95, speedMult: 1.0, recoil: 0.12 },
  },
  garuda: {
    id: "garuda", name: "Garuda-Vyuha (The Eagle)", shape: "Triangle",
    desc: "Massive Speed boost for the lead; defense suffers.",
    mods: { defMult: 0.85, atkMult: 1.0, speedMult: 1.4, recoil: 0 },
  },
  suchi: {
    id: "suchi", name: "Suchi-Vyuha (The Needle)", shape: "Linear",
    desc: "Pierces defenses (1.25x attack); lowers your own Defense.",
    mods: { defMult: 0.8, atkMult: 1.25, speedMult: 1.0, recoil: 0 },
  },
  padma: {
    id: "padma", name: "Padma-Vyuha (The Lotus)", shape: "Flower",
    desc: "Regenerates reserve Atmas each turn; balanced offense.",
    mods: { defMult: 1.1, atkMult: 0.95, speedMult: 0.95, recoil: 0, reserveRegen: 0.06 },
  },
};

export const DEFAULT_VYUHA = "garuda";
export const SWITCH_TAPAS_COST = 20;

export function getVyuha(id) {
  return VYUHAS[id] ?? VYUHAS[DEFAULT_VYUHA];
}

export function vyuhaList() {
  return Object.values(VYUHAS);
}
