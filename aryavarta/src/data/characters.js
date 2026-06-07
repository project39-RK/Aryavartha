// ===================================================================
// Aryavarta — NPC & Character Data
// Every named character in the story: their glyph, title, dialogue
// personality, and which Karma axis they represent.
// ===================================================================

export const CHARACTERS = {

  // ─── The Mentor ──────────────────────────────────────────────────
  vashistha: {
    id: "vashistha",
    name: "Sage Vashistha",
    title: "Royal Preceptor of Ayodhya",
    glyph: "🧙",
    color: "#f0d080",
    desc: "The ancient royal Sage whose beard glows with silver Tapas. " +
          "He speaks slowly, each word carrying the weight of a thousand years. " +
          "He sees the Eclipse coming and trusts only you to walk the southern path.",
    alignment: "sattva",
  },

  // ─── The Rival ───────────────────────────────────────────────────
  indrajit: {
    id: "indrajit",
    name: "Indrajit",
    title: "The Shadow Seeker",
    glyph: "🐍",
    color: "#cc44ff",
    desc: "Named after Ravana's greatest son — the Conqueror of Indra. " +
          "Brilliant, arrogant, and utterly convinced that Dharma is a cage " +
          "built by the weak to restrain the strong. His Atmas crackle with " +
          "stolen, force-fed power. The Maya-Binding makes them fearsome but unstable.",
    alignment: "tamas",
  },

  // ─── Prince Bharata ──────────────────────────────────────────────
  bharata: {
    id: "bharata",
    name: "Prince Bharata",
    title: "Guardian of the Golden Gate",
    glyph: "🤴",
    color: "#ffa040",
    desc: "The second prince of Ayodhya, standing watch in his elder brother's absence. " +
          "He does not fight out of pride but out of discipline — testing each " +
          "Seeker to ensure they carry the steadiness of spirit the road demands. " +
          "His Ashvamedh, a war-horse of crystallized earth-Tapas, can shake " +
          "mountains with a single stamping hoof.",
    alignment: "sattva",
  },

  // ─── Rishi Agni-Vesha ────────────────────────────────────────────
  agniVesha: {
    id: "agniVesha",
    name: "Rishi Agni-Vesha",
    title: "Hermit of the Burning Grid",
    glyph: "🔥",
    color: "#ff7733",
    desc: "A forest hermit who has mastered both fire and formation. He " +
          "communicates through cryptic tests rather than clear lectures, " +
          "believing that a lesson earned through struggle is the only lesson " +
          "that lasts. The floating flames that orbit him respond to the " +
          "emotional state of whoever stands near.",
    alignment: "rajas",
  },

  // ─── Sage Vishwamitra ────────────────────────────────────────────
  vishwamitra: {
    id: "vishwamitra",
    name: "Sage Vishwamitra",
    title: "Witness of Willpower",
    glyph: "🦉",
    color: "#9ad0ec",
    desc: "Once a warrior-king who forged his power through sheer determination, " +
          "Vishwamitra knows both the allure of ego and the peace of surrender. " +
          "His Test of Compassion is the most deceptive — it seems simple until " +
          "the forest itself becomes the battleground. His Kaushika-Pakshi, " +
          "an ancient owl of pure Ether, can see the truest intentions in any heart.",
    alignment: "sattva",
  },

  // ─── Yaksha Guide ────────────────────────────────────────────────
  yakshaGuide: {
    id: "yakshaGuide",
    name: "Vanarasi",
    title: "Yaksha of the Tataka Crossroads",
    glyph: "🌿",
    color: "#66cc66",
    desc: "A nature spirit bound to the ancient Tataka crossroads. " +
          "Neither good nor evil, Vanarasi simply IS — a living record " +
          "of every creature that has walked through this forest. " +
          "She speaks in riddles drawn from the forest's memory and " +
          "will only help those whose Dharma-reading feels 'balanced'.",
    alignment: "neutral",
  },

  // ─── Citizen of Ayodhya ──────────────────────────────────────────
  citizen: {
    id: "citizen",
    name: "Merchant Dhanpal",
    title: "Citizen of Ayodhya",
    glyph: "🧑",
    color: "#c8973a",
    desc: "A middle-aged grain merchant whose life savings are in those bags " +
          "the Mushikas are tearing through. Terrified but hopeful.",
    alignment: "neutral",
  },

  // ─── Rishi Agastya (teaser) ──────────────────────────────────────
  agastya: {
    id: "agastya",
    name: "Sage Agastya",
    title: "He Who Swallowed the Ocean",
    glyph: "🌊",
    color: "#2e86de",
    desc: "A legendary sage whose Tapas was so immense he once drank an entire " +
          "ocean in a single gulp. Encountered later, he serves as the Rishi of " +
          "Humility — testing whether the player can manage Tapas wisely rather " +
          "than burning all their spiritual heat in a single reckless Astra.",
    alignment: "sattva",
  },

  // ─── Player ──────────────────────────────────────────────────────
  player: {
    id: "player",
    name: "The Seeker",
    title: "Student of Vashistha Academy",
    glyph: "⚔",
    color: "#e8dfc8",
    desc: "YOU. A young student of the Royal Academy in Ayodhya, chosen by " +
          "Sage Vashistha to walk the southern path and restore the world's " +
          "corrupted Atmas to Dharma.",
    alignment: "player",
  },

};

export function getCharacter(id) {
  return CHARACTERS[id];
}
