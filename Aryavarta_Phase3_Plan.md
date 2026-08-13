# 🏹 Aryavarta — Phase 3 Implementation Plan
## The Overworld Update

> **Status:** 🚧 In Progress  
> **Builds on:** Phase 1 (Battle Engine) ✅ · Phase 2 (Story Engine) ✅  
> **GDD Milestone:** Month 3 — *"Expand Atma-Kosha (+20 more species), overworld movement, wild encounter system"*

---

## Current State (Phases 1 & 2 ✅)

| Feature | Status |
|---|---|
| 3v3 Battle Engine + Vyuha formations | ✅ Done |
| 13 Astras (moves) with type chart | ✅ Done |
| 10-Chapter story with karma/dialogue/seals | ✅ Done |
| Mandala battle UI | ✅ Done |
| 9 Atma species (3 starters + 6 wild + 2 boss-only) | ✅ Done |
| Runs in-browser via `npx serve` | ✅ Done |

---

## Phase 3 Goal

Turn the game from a *visual novel with battles* into something that **feels like Pokémon** — walking around a tile map, hitting tall grass, encountering wild Atmas, binding (capturing) them, and building a team. This completes the **core loop**:

> **Explore → Encounter → Battle → Bind → Explore**

---

## Implementation Steps

### Step 1: Expand the Data Layer (+14 Atma species, +8 Astras)

**New Atma Species** (from the GDD bestiary — those not yet implemented):

| Species | Type | Glyph | Zone | Role |
|---|---|---|---|---|
| Uluka-Vith | Vayu | 🦉 | Forest (night) | Owl spirit, preys on lone travelers |
| Baka-Nadi | Jala | 🦩 | Riverbank | Crane-headed river spirit |
| Hari-Vana | Prithvi | 🦌 | Forest | Deer spirit — grace and speed |
| Mahi-Vrish | Prithvi | 🐂 | Plains | Bull spirit — strength and labor |
| Varaha-Krodh | Prithvi | 🐗 | Forest | Boar spirit — high physical momentum |
| Bhallu-Mukh | Prithvi | 🐻 | Cave | Heavy-hitting bear spirit |
| Vanar-Vaidya | Jala | 🐵 | Mountain | Healer-class monkey |
| Yaksha-Gupta | Akash | ✨ | Deep Forest | Nature spirit guarding treasures |
| Gana-Rudra | Prithvi | 🗿 | Temple Ruins | Mischievous guardian with defensive buffs |
| Kinnara-Gayak | Akash | 🎵 | Mountain | Musical half-bird/half-human |
| Makara-Dal | Jala | 🐟 | River/Coast | Croc-hybrid sea creature |
| Bhuta-Daan | Akash | 👻 | Ruins (night) | Ethereal spirit near ancient temples |
| Naga-Kanya | Jala | 🐉 | Cave/Water | Serpent-woman, poison and binding |
| Yali-Kanth | Prithvi | 🦁 | Mountain | Part-lion/part-elephant hybrid |

**New Astras** (8 moves to support new species):

| Astra | Type | Category | Purpose |
|---|---|---|---|
| Paksha-Vaat | Vayu | Special | Owl/bird wing-blast |
| Dhvani-Tantra | Akash | Special | Sound-wave attack |
| Bhumi-Bandha | Prithvi | Status | Earth-binding trap |
| Trishula-Veg | Prithvi | Physical | Heavy trident strike |
| Chandra-Kiran | Akash | Status | Moonlight heal-over-time |
| Jala-Chakra | Jala | Physical | Water wheel spin attack |
| Agni-Kavach | Agni | Status | Fire shield (defense buff) |
| Vayu-Raksha | Vayu | Status | Wind barrier (defense buff) |

**Files modified:** `src/data/atmas.js`, `src/data/astras.js`

---

### Step 2: Create `PlayerState.js` (Persistent Player State)

A singleton that tracks all persistent game state:

```js
PlayerState = {
  party:         [],   // active team (up to 6 Atma instances)
  collection:    [],   // all bound Atmas
  inventory:     {},   // { sanjeevaniExtract: 3, somaRasa: 1, ... }
  position:      { mapId: "ayodhyaOutskirts", tileX: 5, tileY: 8 },
  karma:         { dharma: 0, shakti: 0, jnana: 0, karuna: 0 },
  seals:         [],
  starterId:     null,
}
```

- Saves/loads to `localStorage` (JSON)
- Exposes `bindAtma(atma)`, `addItem(id, qty)`, `useItem(id)`, `updatePosition(mapId, x, y)`

**New file:** `src/engine/PlayerState.js`

---

### Step 3: Build `OverworldEngine.js` (Canvas Tile Map + Movement)

Canvas-based tile renderer with:

- **Tile size:** 32×32px
- **Tile types:** Ground, Path, Tall Grass, Water, Wall/Tree, NPC spot, Portal/Gate
- **Controls:** Arrow keys + WASD (one tile per step)
- **Camera:** Follows player with viewport clamping
- **Collision:** Blocked tiles (water, wall) prevent movement
- **Encounter zones:** Tall grass tiles trigger encounter roll on each step
- **NPC interaction:** Press Space/Enter near NPC to trigger dialogue
- **Rendering:** Colored tiles + emoji overlay (no sprite assets needed yet)
- **Visual feedback:** Step animation (slight bounce), grass rustle effect on encounter trigger

**New file:** `src/engine/OverworldEngine.js`

---

### Step 4: Create `maps.js` (Map Data for 2 Zones)

Two playable zones, stored as 2D tile arrays:

**Zone 1 — Ayodhya Outskirts** (`ayodhyaOutskirts`)
- Wide paths, a few patches of tall grass (low encounter rate ~10%)
- Gentle introduction — low level Atmas (Lv 2–5)
- NPCs: Merchant Dhanpal, a Guard captain
- Portal to: Tataka Forest Edge

**Zone 2 — Tataka Forest Edge** (`tatakaForestEdge`)
- Dense forest, abundant tall grass (encounter rate ~18%)
- Higher variety of Atmas (Lv 4–10)
- Rishi Agni-Vesha's clearing (fixed NPC encounter)
- Visual: darker palette, bioluminescent accents

Each zone defines:
```js
zone = {
  id, name, music, bg,
  tiles: [[...]], // 2D array of tile IDs
  encounterTable: { grass: [{ speciesId, minLv, maxLv, weight }] },
  npcs: [{ id, tileX, tileY, characterId, dialogue }],
  portals: [{ tileX, tileY, targetMapId, targetX, targetY }],
  playerStart: { x, y }
}
```

**New file:** `src/data/maps.js`

---

### Step 5: Build `EncounterEngine.js` (Wild Encounters + Binding)

```
Walking on Tall Grass tile
  → roll Math.random() < zone.encounterRate (0.15 default)
  → select species from zone's encounter table (weighted random)
  → select level (minLv–maxLv range)
  → trigger encounter transition
  → hand control to BattleEngine in "wild mode"
```

**Wild mode battle changes:**
- Enemy team = single wild Atma (no Vyuha)
- When wild Atma HP ≤ 30% AND active player Atma is not fainted → "🔮 Bind" button appears
- **Bind mechanic:**
  - `successRate = (1 - hpPct) * 0.6 + bhaktiBonus * 0.2 + baseRate`
  - `baseRate = 0.3` (30% floor)
  - On success: mantra animation → Atma added to PlayerState
  - On failure: "The spirit resists your mantra… (X% chance next try)" — battle continues
- Binding ends the battle (like catching in Pokémon)
- Defeated wild Atmas give XP/Bhakti points

**New file:** `src/engine/EncounterEngine.js`

---

### Step 6: Wire Everything Together (`main.js` + `index.html`)

New screen flow:

```
[Title Screen]
     ↓ Begin Journey
[Story Mode] ← Chapter 1-10
     ↓ Chapter 10 ends
[Overworld Screen] ← NEW ✦
     ↓ Enter tall grass
[Encounter Transition]
     ↓
[Battle Screen] (wild mode)
     ↓ Win/Bind/Flee
[Overworld Screen] (back to same tile)
```

**HTML additions:**
- `#screen-overworld` — Canvas element + HUD overlay
- HUD: party health bars, map name badge, step counter, encounter flash

**main.js additions:**
- `switchToOverworld()` — enter overworld mode
- `onOverworldEncounter(species, level)` — trigger battle
- `onBattleEndWild(result)` — return to overworld
- Bind button + binding animation in Mandala panel
- Party management panel (view all bound Atmas)

---

### Step 7: CSS + Polish (`battle.css`)

- Overworld canvas container + HUD styles
- Encounter flash animation (white → black → battle screen)
- Bind button styles (purple/gold gradient, pulsing when active)
- Party management panel styles
- "Wild [Atma] appeared!" popup animation
- Bind success/failure flash effects

---

## Files Created / Modified Summary

| Action | File | Description |
|---|---|---|
| ✦ **New** | `src/data/maps.js` | Map tile data — 2 zones |
| ✦ **New** | `src/engine/OverworldEngine.js` | Canvas renderer + player movement |
| ✦ **New** | `src/engine/EncounterEngine.js` | Encounter tables + binding mechanic |
| ✦ **New** | `src/engine/PlayerState.js` | Persistent player state (party, inventory) |
| ✏ **Modified** | `src/data/atmas.js` | +14 new species (23 total) |
| ✏ **Modified** | `src/data/astras.js` | +8 new Astras (21 total) |
| ✏ **Modified** | `src/main.js` | Overworld screen, encounter wiring, bind UI |
| ✏ **Modified** | `index.html` | New `#screen-overworld` section |
| ✏ **Modified** | `styles/battle.css` | Overworld canvas, HUD, encounter animations |
| ✏ **Modified** | `src/engine/BattleEngine.js` | Wild battle mode + binding action |

---

## What Phase 3 Delivers

After Phase 3, the player experience is:

1. ✅ Play the 10-chapter story (existing)
2. ✅ Battle with 3v3 Vyuha tactics (existing)
3. 🆕 **Walk around** a tile-based overworld map
4. 🆕 **Encounter wild Atmas** in tall grass (23 species)
5. 🆕 **Bind (capture) wild Atmas** using the Mantra mechanic
6. 🆕 **Build a party** of up to 6 Atmas from 23 total species
7. 🆕 **Explore two zones**: Ayodhya Outskirts + Tataka Forest Edge

---

## Phase 4 (Planned Next)
> **"Tapas Charging, Sadhana/branching evolution, Rasayana Lab crafting, full item system, Binding mechanic"**

---

*Document last updated: Phase 3 implementation — July 2026*  
*Forge Your Vow. Restore the Light.* 🏹
