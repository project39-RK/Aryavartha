# 🏹 Aryavarta: Legend of the Dharma-Vaan

> *"Forge Your Vow. Restore the Light."*

A Pokémon-style creature-collector / turn-based RPG rooted in Indian mythology and the Ramayana.
This repository contains the **Prototype Battle Engine (v0.1)** — a fully playable browser demo
built as the Month 1 milestone of the development roadmap.

---

## 🚀 Quick Start

```bash
cd aryavarta
npx serve . --listen 3000
```

Then open **http://localhost:3000** in your browser.

No build step, no dependencies to install. Uses ES Modules (runs natively in modern browsers via a local HTTP server — needed because `file://` doesn't support ES module imports).

---

## 🎮 What's Implemented (v0.1)

| Feature | Status |
|---|---|
| **Type system** (Agni/Vayu/Jala/Prithvi/Akash) with effectiveness chart | ✅ |
| **9 Astras** (moves) with Tapas costs, categories, status effects | ✅ |
| **9 Atma species** (3 starters + 6 common wild Atmas) | ✅ |
| **Atma instances** with level-scaled stats, HP, Tapas, status tracking | ✅ |
| **Battle Engine** — full turn resolution, damage formula, speed order | ✅ |
| **Status effects** — Nidra (Sleep), Moha (Confusion), Visha (Poison), Agnidah (Burn) | ✅ |
| **Tapas regeneration** each turn; end-of-turn chip damage for status | ✅ |
| **Vyuha (Formation) system** — Chakra/Garuda/Suchi/Padma with combat modifiers | ✅ |
| **Enemy AI** — type-aware move selection + occasional switching | ✅ |
| **Team management** — 3v3 with manual and auto-switching on faint | ✅ |
| **Mandala Interface** — tabbed battle UI (Astras · Switch · Vyuha) | ✅ |
| **Starter selection** screen with Madhubani-inspired aesthetic | ✅ |
| **Responsive design** (desktop + mobile) | ✅ |

---

## 🗂 Project Structure

```
aryavarta/
├── index.html                     # Entry point
├── package.json                   # npm scripts (dev server)
├── styles/
│   └── battle.css                 # Full UI stylesheet
└── src/
    ├── main.js                    # Game controller (screens + UI wiring)
    ├── data/
    │   ├── types.js               # Type chart (5 elements + effectiveness)
    │   ├── astras.js              # Move database (13 Astras + status effects)
    │   └── atmas.js               # Creature database (9 species)
    └── engine/
        ├── Atma.js                # Live creature instance (stats, HP, Tapas)
        ├── VyuhaGrid.js           # Formation system (4 Vyuhas + modifiers)
        └── BattleEngine.js        # Core turn engine (resolve, damage, AI, events)
```

---

## ⚔️ How to Play

1. **Read the opening narration** on the title screen — the Eclipse of Maya has begun.
2. **Choose your starter Atma** from the Trimurti Choice (Fire / Earth / Water).
3. **Battle begins** automatically against Indrajit's rival team (always the type-advantage starter + 2 wild Atmas).

### In Battle

| Action | How |
|---|---|
| **Use an Astra** | Click any move button in the 🔥 Astras tab |
| **Switch Atma** | Click the 🔄 Switch tab → pick a reserve |
| **Change Formation** | Click the ⚔ Vyuha tab → pick a Vyuha (costs 20 ⚡ Tapas) |

### Key Mechanics

- **Tapas (⚡)** — your energy resource, regenerates 12/turn. More powerful Astras cost more.
- **Type effectiveness** — check the color dot on each Astra button; 2× super-effective deals double damage.
- **Status effects** — Nidra (sleep) skips turns; Moha (confuse) may hurt self; Visha/Agnidah deal chip damage each turn.
- **Vyuha bonuses** — Garuda gives +40% Speed; Chakra gives +30% Defense but enemies deal recoil back; Suchi pierces for +25% Attack at the expense of Defense; Padma heals reserves each turn.
- **Brahmastra** — the ultimate one-per-battle nuke; only unlocked if your Atma has 60 Tapas and enough Sattva (just enough Tapas in this prototype).

---

## 🗺 Development Roadmap

| Month | Milestone | Status |
|---|---|---|
| **Month 1** | Battle Engine: 3v3 turn-based logic + Vyuha grid | ✅ Done |
| **Month 2** | Atma design (+20 common species), overworld movement, wild encounters | 📋 Next |
| **Month 3** | Tapas Charging (slow charge for high-tier Astras), Sadhana evolution | 📋 Planned |
| **Month 4** | Ayodhya hub map + Test 1: Prince Bharata | 📋 Planned |
| **Month 5+** | Karma/Dharma system, items (Sanjeevani, Soma-Rasa), Binding mechanic | 📋 Planned |
| **Later** | PvP via Node.js + Ashram Defense async system | 🔜 Backlog |

---

## 🎨 Art Direction (Future Assets)

- **Sprites:** Madhubani-style bold outlines → use Aseprite for pixel art
- **UI borders:** Pattachitra scroll-painting patterns → use Inkscape (SVG)
- **Music:** Dynamic Sitar/Tabla fusion → REAPER + Ethno World 6 / Kontakt
- **Cutscenes:** Amar Chitra Katha comic-panel aesthetic

---

## 🔧 Tech Stack

| Layer | Technology |
|---|---|
| Game Logic | Vanilla ES Modules (JavaScript, no framework) |
| Rendering | DOM / CSS (battle-ready to port to Unity later) |
| Dev Server | `npx serve` (zero install) |
| Future Engine | Unity 6 LTS (C#) — per toolchain research |
| Future Backend | Node.js + Socket.io + PostgreSQL (PvP / Ashrams) |

---

*Phase 1 complete. The battle engine lives. Forge your Vow.* 🏹
