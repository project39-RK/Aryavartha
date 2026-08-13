// ===================================================================
// Aryavarta — Map Data (Phase 3)
// Two playable overworld zones:
//   1. ayodhyaOutskirts — Tutorial area, low-level encounters
//   2. tatakaForestEdge — Dense forest, more species, boss NPC
//
// Tile legend:
//   0 = Ground (open, no encounter, walkable)
//   1 = Path   (smooth stone path, walkable, no encounter)
//   2 = Tall Grass (walkable — triggers encounter roll)
//   3 = Water  (BLOCKED)
//   4 = Tree/Wall (BLOCKED)
//   5 = NPC    (walkable, face-bump triggers dialogue)
//   6 = Portal / Gate (walkable, triggers map change)
//   7 = Rock/Building (BLOCKED)
//   8 = Shrine (walkable, triggers lore text)
// ===================================================================

// ── Tile constants ─────────────────────────────────────────────────
export const T = {
  GROUND:     0,
  PATH:       1,
  GRASS:      2,
  WATER:      3,
  TREE:       4,
  NPC:        5,
  PORTAL:     6,
  ROCK:       7,
  SHRINE:     8,
};

/** Human-readable tile properties */
export const TILE_PROPS = {
  0: { label: "Ground",    walkable: true,  encounter: false, color: "#5a7a3a", emoji: "" },
  1: { label: "Path",      walkable: true,  encounter: false, color: "#b8956a", emoji: "" },
  2: { label: "Tall Grass",walkable: true,  encounter: true,  color: "#2d6b2a", emoji: "🌿" },
  3: { label: "Water",     walkable: false, encounter: false, color: "#1a4a7a", emoji: "🌊" },
  4: { label: "Tree",      walkable: false, encounter: false, color: "#1a3a18", emoji: "🌲" },
  5: { label: "NPC",       walkable: true,  encounter: false, color: "#8b6b35", emoji: "👤" },
  6: { label: "Portal",    walkable: true,  encounter: false, color: "#5a3a8a", emoji: "✦" },
  7: { label: "Rock",      walkable: false, encounter: false, color: "#5a4a3a", emoji: "🪨" },
  8: { label: "Shrine",    walkable: true,  encounter: false, color: "#8a6a2a", emoji: "🪔" },
};

// Shorthand for the tile grid arrays
const G = T.GROUND, P = T.PATH, X = T.GRASS, W = T.WATER,
      R = T.TREE,   N = T.NPC,  O = T.PORTAL, K = T.ROCK, S = T.SHRINE;

// ══════════════════════════════════════════════════════════════════
//  MAP 1 — AYODHYA OUTSKIRTS
//  20 columns × 18 rows. Player starts at (9, 13).
//  North: city gate area (portals to story screen)
//  South: exit portal to Tataka Forest Edge
// ══════════════════════════════════════════════════════════════════
const AYODHYA_TILES = [
//  0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19
  [ R, R, R, R, R, R, R, R, R, O, O, R, R, R, R, R, R, R, R, R ], // row 0   ← city gate / north portal
  [ R, K, K, K, K, K, K, K, R, P, P, R, K, K, K, K, K, K, K, R ], // row 1
  [ R, K, K, K, K, K, K, K, R, P, P, R, K, K, K, K, K, K, K, R ], // row 2
  [ R, R, R, R, R, R, R, R, R, P, P, R, R, R, R, R, R, R, R, R ], // row 3
  [ R, R, R, R, R, P, P, R, R, P, P, R, R, P, P, R, R, R, R, R ], // row 4
  [ G, G, X, X, R, P, P, R, R, P, P, R, R, P, P, R, X, X, G, G ], // row 5
  [ G, G, X, X, R, P, P, R, R, P, P, R, R, P, P, R, X, X, G, G ], // row 6
  [ G, G, G, G, R, P, P, R, R, P, P, R, R, P, P, R, G, G, G, G ], // row 7
  [ G, N, G, G, R, P, P, P, P, P, P, P, P, P, P, R, G, G, N, G ], // row 8   ← NPCs at (1,8) and (18,8)
  [ G, G, G, G, R, P, P, P, P, P, P, P, P, P, P, R, G, G, G, G ], // row 9
  [ G, G, X, X, X, P, P, X, X, G, G, X, X, P, P, X, X, X, G, G ], // row 10
  [ G, G, X, X, X, P, P, X, X, G, G, X, X, P, P, X, X, X, G, G ], // row 11
  [ G, G, G, G, G, P, P, G, G, W, W, G, G, P, P, G, G, G, G, G ], // row 12  ← small pond
  [ G, G, G, G, G, P, P, G, G, W, W, G, G, P, P, G, G, G, G, G ], // row 13  ← player start tile (9,13) adjusted to (5,13)
  [ G, G, X, X, G, P, P, G, G, G, G, G, G, P, P, G, G, X, X, G ], // row 14
  [ G, G, X, X, G, P, P, S, G, G, G, G, S, P, P, G, G, X, X, G ], // row 15  ← shrines
  [ G, G, G, G, G, P, P, G, G, G, G, G, G, P, P, G, G, G, G, G ], // row 16
  [ O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O ], // row 17  ← south exit portal to Tataka
];

// ══════════════════════════════════════════════════════════════════
//  MAP 2 — TATAKA FOREST EDGE
//  20 columns × 20 rows. Player enters at (9, 0) from Ayodhya.
//  Deep forest, lots of tall grass, Rishi's clearing.
//  South-most row leads to a locked "deeper Tataka" area (future).
// ══════════════════════════════════════════════════════════════════
const TATAKA_TILES = [
//  0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19
  [ O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O ], // row 0   ← north portal (back to Ayodhya)
  [ R, R, R, R, R, R, R, R, R, P, P, R, R, R, R, R, R, R, R, R ], // row 1
  [ R, X, X, R, R, X, X, X, R, P, P, R, X, X, X, R, R, X, X, R ], // row 2
  [ R, X, X, R, R, X, X, X, R, P, P, R, X, X, X, R, R, X, X, R ], // row 3
  [ R, R, R, R, R, X, X, X, R, P, P, R, X, X, X, R, R, R, R, R ], // row 4
  [ R, X, X, X, R, X, X, X, P, P, P, P, X, X, X, R, X, X, X, R ], // row 5
  [ R, X, X, X, R, R, R, R, R, P, P, R, R, R, R, R, X, X, X, R ], // row 6
  [ R, X, X, X, R, X, X, X, R, P, P, R, X, X, X, R, X, X, X, R ], // row 7
  [ R, R, R, R, R, X, X, X, R, P, P, R, X, X, X, R, R, R, R, R ], // row 8
  [ R, X, X, X, X, X, X, X, X, P, P, X, X, X, X, X, X, X, X, R ], // row 9   ← wide grass section
  [ R, X, X, X, X, X, X, X, X, P, P, X, X, X, X, X, X, X, X, R ], // row 10
  [ R, R, R, R, R, R, R, R, R, P, P, R, R, R, R, R, R, R, R, R ], // row 11
  [ R, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, R ], // row 12  ← Rishi's clearing begins
  [ R, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, R ], // row 13
  [ R, G, G, G, G, G, G, G, S, G, G, S, G, G, G, G, G, G, G, R ], // row 14  ← shrines & Rishi NPC at (9,14)
  [ R, G, G, G, G, G, G, G, G, N, G, G, G, G, G, G, G, G, G, R ], // row 15  ← NPC (Rishi Agni-Vesha) at (9,15)
  [ R, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, R ], // row 16
  [ R, R, R, R, R, R, R, R, R, P, P, R, R, R, R, R, R, R, R, R ], // row 17
  [ R, X, X, X, X, X, X, X, X, P, P, X, X, X, X, X, X, X, X, R ], // row 18  ← danger zone grass
  [ K, K, K, K, K, K, K, K, K, O, O, K, K, K, K, K, K, K, K, K ], // row 19  ← south portal (future deeper zone)
];

const TATAKA_DEEPER_TILES = [
//  0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19
  [ O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O ], // row 0   ← north portal (back to Tataka Edge)
  [ R, R, R, R, R, R, R, R, R, P, P, R, R, R, R, R, R, R, R, R ], // row 1
  [ R, X, X, R, R, X, X, X, R, P, P, R, X, X, X, R, R, X, X, R ], // row 2
  [ R, X, X, R, R, X, X, X, R, P, P, R, X, X, X, R, R, X, X, R ], // row 3
  [ R, R, R, R, R, X, X, X, R, P, P, R, X, X, X, R, R, R, R, R ], // row 4
  [ R, X, X, X, R, X, X, X, R, P, P, R, X, X, X, R, X, X, X, R ], // row 5
  [ R, X, X, X, R, X, X, X, R, P, P, R, X, X, X, R, X, X, X, R ], // row 6
  [ R, R, R, R, R, X, X, X, R, P, P, R, X, X, X, R, R, R, R, R ], // row 7
  [ R, X, X, X, X, X, X, X, X, P, P, X, X, X, X, X, X, X, X, R ], // row 8
  [ R, X, X, X, X, X, X, X, X, P, P, X, X, X, X, X, X, X, X, R ], // row 9
  [ R, R, R, R, R, R, R, R, R, P, P, R, R, R, R, R, R, R, R, R ], // row 10
  [ R, X, X, X, X, X, X, X, X, P, P, X, X, X, X, X, X, X, X, R ], // row 11
  [ R, X, X, X, X, X, X, X, G, G, G, G, X, X, X, X, X, X, X, R ], // row 12
  [ R, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, R ], // row 13
  [ R, G, G, G, G, G, G, G, S, G, G, S, G, G, G, G, G, G, G, R ], // row 14
  [ R, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, R ], // row 15
  [ R, R, R, R, R, R, R, R, R, P, P, R, R, R, R, R, R, R, R, R ], // row 16
  [ R, X, X, X, X, X, X, X, X, P, P, X, X, X, X, X, X, X, X, R ], // row 17
  [ R, X, X, X, X, X, X, X, X, P, P, X, X, X, X, X, X, X, X, R ], // row 18
  [ K, K, K, K, K, K, K, K, K, O, O, K, K, K, K, K, K, K, K, K ], // row 19  ← sealed southern gate
];

// ══════════════════════════════════════════════════════════════════
//  ZONE DEFINITIONS
// ══════════════════════════════════════════════════════════════════

export const MAPS = {

  ayodhyaOutskirts: {
    id: "ayodhyaOutskirts",
    name: "Ayodhya Outskirts",
    subtitle: "The Gates of the Golden City",
    bg: "bg-ayodhya",
    encounterRate: 0.10,   // 10% per grass step
    tiles: AYODHYA_TILES,
    cols: 20,
    rows: 18,
    playerStart: { x: 9, y: 13 },

    // Encounter tables — weighted random (higher weight = more common)
    encounterTable: {
      [T.GRASS]: [
        { speciesId: "mushikaRatna", minLv: 2, maxLv: 4, weight: 30 },
        { speciesId: "hariVana",     minLv: 2, maxLv: 5, weight: 25 },
        { speciesId: "shyenaVeg",    minLv: 3, maxLv: 5, weight: 20 },
        { speciesId: "mahiVrish",    minLv: 3, maxLv: 5, weight: 15 },
        { speciesId: "mayurPankh",   minLv: 3, maxLv: 5, weight: 10 },
      ],
    },

    // NPC definitions — { tileX, tileY, characterId, dialogueLines[] }
    npcs: [
      {
        id: "dhanpal_outskirts",
        tileX: 1, tileY: 8,
        characterId: "citizen",
        dialogueLines: [
          "Seeker! Be cautious out there — the tall grass on both sides of the road has been acting strange since the Eclipse began.",
          "My Mushika led me here yesterday but wouldn't go past that second grass patch. They sense things we don't.",
          "If you find any Sanjeevani herb in the wild, I'll trade you some Soma-Rasa for it. The herb patches are east of the main path.",
        ],
      },
      {
        id: "guard_outskirts",
        tileX: 18, tileY: 8,
        characterId: "bharata",
        dialogueLines: [
          "Seeker. The southern road is passable for now, but do not stray too far from the stone path.",
          "The forest begins in earnest past the old shrine markers. Once you are inside the Tataka — that is a different world entirely.",
          "Prince Bharata's courtyard lies beyond. The Tests of Virtue begin there. Be ready.",
        ],
      },
    ],

    // Portals — { tileX, tileY, targetMapId, targetX, targetY, label }
    portals: [
      // Row 0 — North portal (back to Ayodhya / story screen)
      { tileX: 9,  tileY: 0,  targetMapId: "STORY", targetX: 0, targetY: 0,
        label: "Return to Ayodhya", storyReturn: true },
      { tileX: 10, tileY: 0,  targetMapId: "STORY", targetX: 0, targetY: 0,
        label: "Return to Ayodhya", storyReturn: true },
      // Row 17 — South exit to Tataka Forest
      ...Array.from({ length: 20 }, (_, x) => ({
        tileX: x, tileY: 17, targetMapId: "tatakaForestEdge",
        targetX: x, targetY: 1, label: "Enter Tataka Wilds",
      })),
    ],

    // Shrine lore text
    shrines: [
      { tileX: 7, tileY: 15, text: "\"The road south is a mirror. What you carry into the forest, the forest gives back.\" — Old proverb of the Nishada people." },
      { tileX: 12, tileY: 15, text: "A carved lotus marks where an ancient Seeker rested and tamed their first wild Atma. The moss says: hundreds of years ago. The smile on the carving says: it was worth it." },
    ],
  },

  tatakaForestEdge: {
    id: "tatakaForestEdge",
    name: "Tataka Forest — Edge",
    subtitle: "Where the City Ends and Memory Begins",
    bg: "bg-forest-dark",
    encounterRate: 0.18,   // 18% per grass step — denser forest
    tiles: TATAKA_TILES,
    cols: 20,
    rows: 20,
    playerStart: { x: 9, y: 1 },

    encounterTable: {
      [T.GRASS]: [
        // Common
        { speciesId: "mushikaRatna",  minLv: 3, maxLv: 6,  weight: 20 },
        { speciesId: "kapiShaka",     minLv: 4, maxLv: 7,  weight: 18 },
        { speciesId: "sarpDhara",     minLv: 4, maxLv: 7,  weight: 15 },
        { speciesId: "vrikshaAnsh",   minLv: 4, maxLv: 7,  weight: 15 },
        { speciesId: "shyenaVeg",     minLv: 4, maxLv: 7,  weight: 12 },
        // Uncommon
        { speciesId: "ulukaVith",     minLv: 5, maxLv: 8,  weight: 8  },
        { speciesId: "bakaNadi",      minLv: 5, maxLv: 8,  weight: 6  },
        { speciesId: "varahaKrodh",   minLv: 5, maxLv: 8,  weight: 5  },
        { speciesId: "bhalluMukh",    minLv: 6, maxLv: 9,  weight: 5  },
        { speciesId: "vanarVaidya",   minLv: 5, maxLv: 8,  weight: 5  },
        { speciesId: "ganaRudra",     minLv: 6, maxLv: 9,  weight: 4  },
        { speciesId: "makaraDal",     minLv: 5, maxLv: 8,  weight: 4  },
        // Rare
        { speciesId: "mayurPankh",    minLv: 6, maxLv: 9,  weight: 3  },
        { speciesId: "yakshaGupta",   minLv: 7, maxLv: 10, weight: 3  },
        { speciesId: "bhutaDaan",     minLv: 7, maxLv: 10, weight: 2  },
        { speciesId: "nagaKanya",     minLv: 7, maxLv: 10, weight: 2  },
        { speciesId: "kinnaraGayak",  minLv: 8, maxLv: 11, weight: 2  },
        { speciesId: "yaliKanth",     minLv: 8, maxLv: 11, weight: 1  },
      ],
    },

    npcs: [
      {
        id: "agniVesha_clearing",
        tileX: 9, tileY: 15,
        characterId: "agniVesha",
        dialogueLines: [
          "You again. Good — it means the forest didn't swallow you whole.",
          "The deeper section to the south is still too dangerous. Even I do not walk there at night.",
          "What you need is practice. Use the tall grass. Let the wild Atmas teach you what no scroll can.",
          "And remember: the Binding Mantra only works when BOTH spirits are calm. You must weaken them first — not crush them.",
        ],
      },
    ],

    portals: [
      // Row 0 — North portal back to Ayodhya Outskirts
      ...Array.from({ length: 20 }, (_, x) => ({
        tileX: x, tileY: 0, targetMapId: "ayodhyaOutskirts",
        targetX: x, targetY: 16, label: "Return to Ayodhya Outskirts",
      })),
      // Row 19 — South portal, now sealed behind story-earned Dharma seals
      { tileX: 9, tileY: 19, targetMapId: "tatakaDeeper",
        targetX: 9, targetY: 1, label: "Enter Deeper Tataka", requiredSeals: 2 },
      { tileX: 10, tileY: 19, targetMapId: "tatakaDeeper",
        targetX: 10, targetY: 1, label: "Enter Deeper Tataka", requiredSeals: 2 },
    ],

    shrines: [
      { tileX: 8,  tileY: 14, text: "\"Tapas is not fire alone. It is the patience of the river carving the rock, one year at a time.\" — Agni-Vesha" },
      { tileX: 11, tileY: 14, text: "Seven golden seeds are buried at the roots of this cairn. Each one was left by a Seeker who passed the Test of the Tataka. Each said the same thing: 'It was harder than I expected. I was more ready than I feared.'" },
    ],
  },

  tatakaDeeper: {
    id: "tatakaDeeper",
    name: "Tataka Forest — Deeper",
    subtitle: "The old southern gate gives way to a darker memory",
    bg: "bg-forest-dark",
    encounterRate: 0.26,
    tiles: TATAKA_DEEPER_TILES,
    cols: 20,
    rows: 20,
    playerStart: { x: 9, y: 1 },

    encounterTable: {
      [T.GRASS]: [
        { speciesId: "mushikaRatna",  minLv: 5, maxLv: 8,  weight: 14 },
        { speciesId: "kapiShaka",     minLv: 5, maxLv: 9,  weight: 12 },
        { speciesId: "sarpDhara",     minLv: 6, maxLv: 9,  weight: 12 },
        { speciesId: "vrikshaAnsh",   minLv: 6, maxLv: 10, weight: 10 },
        { speciesId: "ulukaVith",     minLv: 6, maxLv: 10, weight: 8 },
        { speciesId: "bakaNadi",      minLv: 6, maxLv: 10, weight: 8 },
        { speciesId: "varahaKrodh",   minLv: 7, maxLv: 11, weight: 6 },
        { speciesId: "bhalluMukh",    minLv: 7, maxLv: 11, weight: 6 },
        { speciesId: "shyenaVeg",     minLv: 7, maxLv: 11, weight: 5 },
        { speciesId: "yakshaGupta",   minLv: 8, maxLv: 12, weight: 4 },
        { speciesId: "bhutaDaan",     minLv: 8, maxLv: 12, weight: 3 },
      ],
    },

    npcs: [],
    portals: [
      ...Array.from({ length: 20 }, (_, x) => ({
        tileX: x, tileY: 0, targetMapId: "tatakaForestEdge",
        targetX: x, targetY: 18, label: "Return to Tataka Edge",
      })),
    ],

    shrines: [
      { tileX: 8, tileY: 14, text: "The deeper path answers only to one who has carried enough moral weight to walk it without turning back." },
      { tileX: 11, tileY: 14, text: "An old seal-cairn stands here. The stone remembers every vow you kept and every vow you broke." },
    ],
  },
};

export function getMap(id) { return MAPS[id]; }

/** Get the tile type at (x, y) in a map. Returns TREE (blocked) if out of bounds. */
export function getTile(map, x, y) {
  if (y < 0 || y >= map.rows || x < 0 || x >= map.cols) return T.TREE;
  return map.tiles[y][x];
}

/** Is the tile at (x,y) walkable? */
export function isWalkable(map, x, y) {
  const tile = getTile(map, x, y);
  return TILE_PROPS[tile]?.walkable ?? false;
}

/** Does the tile at (x,y) generate encounters? */
export function hasEncounter(map, x, y) {
  const tile = getTile(map, x, y);
  return TILE_PROPS[tile]?.encounter ?? false;
}

/** Find a portal at (x,y), or null. */
export function findPortal(map, x, y) {
  return map.portals.find((p) => p.tileX === x && p.tileY === y) || null;
}

/** Find an NPC at (x,y) or adjacent to (x,y) in the facing direction. */
export function findNpc(map, x, y) {
  return map.npcs.find((n) => n.tileX === x && n.tileY === y) || null;
}

/** Find a shrine at (x,y), or null. */
export function findShrine(map, x, y) {
  return (map.shrines || []).find((s) => s.tileX === x && s.tileY === y) || null;
}
