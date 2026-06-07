# 🏹 Aryavarta: Legend of the Dharma-Vaan
## Deep Toolchain Research Report
### For: Windows 11 (MSI Laptop) — Intel Core Ultra 9 285HX · 64 GB RAM · NVIDIA RTX 5090 Laptop GPU

---

## 📦 Current Machine Snapshot

| Component | Detail | Status |
|---|---|---|
| **OS** | Windows 10/11 Home (64-bit) | ✅ Supported by all engines |
| **CPU** | Intel Core Ultra 9 285HX (24-core hybrid) | ✅ Exceptional — handles Unity, Godot, compilers with ease |
| **RAM** | 64 GB | ✅ More than enough for any game engine + asset pipeline |
| **GPU** | NVIDIA GeForce RTX 5090 Laptop GPU | ✅ Top-tier — DLSS 4, ray-tracing, GPU-accelerated AI tools all available |
| **Storage** | On C:\\ (check free space — recommend 200 GB free for full pipeline) | ⚠️ Monitor disk space |
| **Internet** | Available (Docker pulling works) | ✅ |

### Already Installed — Keep & Leverage

| Tool | Version | Role in Aryavarta |
|---|---|---|
| **VS Code** | 1.122.1 | Primary code editor for all engines (Unity C#, Godot GDScript, Ruby for RPG Maker) |
| **Git** | 2.54.0 | Version control for all game source, GDD, and assets |
| **Node.js** | 24.16.0 | Build scripts, asset pipelines, any web-based tooling or backend (leaderboards, PvP server) |
| **npm** | 11.13.0 | Package manager for JS tooling |
| **Docker Desktop** | 4.75.0 | Containerized backend for PvP / Ashram servers |
| **WSL 2** | 2.7.3.0 | Linux toolchain access; useful for Godot export, Python scripts, audio tools |
| **.NET Runtime 6.0** | 6.0.23 | Required by Unity editor internals |
| **NVIDIA Drivers** | 573.22 | Needed for GPU-accelerated bake, Blender rendering, DLSS |
| **Visual C++ Redist 2022** | 14.44.x | Required by Unity, Godot, and Unreal runtimes |
| **Google Play Games beta** | 25.1 | Direct Android playtesting without a physical device |
| **Microsoft 365** | 16.0 | Documentation, spreadsheets for Atma-Kosha balancing |

---

## 🎮 1. Game Engine — Primary Decision

The GDD explicitly recommends **Unity** (C#) or **Godot** (GDScript). Here is a full breakdown for *Aryavarta* specifically.

---

### Option A: Unity 6 LTS (Recommended for this Project)

**Why it wins for Aryavarta:**
- The **3×3 Vyuha Grid system** maps exactly to Unity's built-in `Tilemap` + `Grid` component with custom cell logic.
- The **Mandala UI** (circular battle interface) is easily achievable with Unity's UI Toolkit or the legacy Canvas system using `RotateAround` and radial layouts.
- **Particle Systems + Shader Graph** — the GDD explicitly calls for "Elemental Shaders" (Gold for Dharma, Purple for Maya). Unity's Shader Graph (URP) allows visual, node-based shader creation with no HLSL knowledge required.
- **2D Sprites (Madhubani style)** — Unity 2D has excellent sprite slice, 9-slice, and animation tools.
- **C# scripting** — typed, fast, excellent debugging in VS Code with the C# Dev Kit extension.
- The **Global Singleton pattern** (for Dharma/Karma meters) is native to C# and Unity's `DontDestroyOnLoad`.
- **Asset Store** has turn-based RPG frameworks, grid combat systems, and dialogue tools that map 1:1 with this GDD's requirements.
- **Cross-platform export**: PC (Steam), Android (via Google Play Games already installed), iOS, Console — all from one project.
- **Your RTX 5090** enables GPU lightmap baking, GPU skinning, and DLSS 4 integration (future-proofing for a 3D sequel).

**What to Install:**
| Tool | Where | Notes |
|---|---|---|
| **Unity Hub** | https://unity.com/download | The launcher/version manager |
| **Unity 6000.0 LTS** (via Hub) | Via Unity Hub | Select "2D (URP)" template |
| **C# Dev Kit** (VS Code extension) | VS Code Extensions | Enables IntelliSense, debugging |
| **.NET SDK 8.0** | https://dotnet.microsoft.com/download | Required for C# in VS Code and Unity Rider/VS integration |

**Storage Required:** ~8–12 GB for editor + Android/PC build modules.

---

### Option B: Godot 4.4 (Best Free Alternative)

**Why it's excellent for Aryavarta:**
- **GDScript** is Python-like — extremely readable and fast to prototype with.
- **Node-based architecture** is perfect for the **Mandala Interface** (each quadrant is a Node2D with its own script).
- `TileMap` node handles the overworld map and dungeon layouts natively.
- The **Dharma meter as a global** is trivially implemented with Godot's `AutoLoad` (Singleton) feature.
- **Lighter weight** — runs beautifully on this machine and can be opened alongside Krita, Aseprite, and Audacity simultaneously.
- **100% free**, no royalties (unlike Unity's old runtime fee controversy).
- Export to PC, Android, Web (HTML5) out of the box.

**What to Install:**
| Tool | Where | Notes |
|---|---|---|
| **Godot 4.4** | https://godotengine.org/download/windows/ | Download the "Standard" .exe (no installer needed) |
| **Godot GDScript extension** for VS Code | VS Code Marketplace | Syntax highlighting + debugger |

**Storage Required:** ~200 MB (remarkably small).

---

### Option C: RPG Maker XP + Pokémon Essentials (Fastest Prototype)

**Best for:** Having a playable battle system in weeks, not months.

The GDD's 4-month roadmap directly aligns with this approach for Month 1 prototyping. However, the **3×3 Vyuha Grid** and **Mandala UI** will require heavy **Ruby (RGSS)** scripting — RPG Maker XP's engine is Ruby-based.

**What to Install:**
| Tool | Where | Notes |
|---|---|---|
| **RPG Maker XP** | Steam ($25) or https://www.rpgmakerweb.com | Requires purchase |
| **Pokémon Essentials v21.1** | https://github.com/Maruno17/pokemon-essentials | Free, open-source kit on top of RMXP |
| **Ruby 2.x** interpreter | https://rubyinstaller.org | For running/editing RGSS scripts outside RMXP |

**Limitation:** Customizing beyond standard Pokémon mechanics (Vyuha grid, Karma alignment, Mantra binding) demands deep Ruby scripting. The community is large but the engine is old (2005).

---

### 🏆 Recommendation for This Machine & Developer Profile (UPDATED — Desktop-First Strategy)

> **Commit to Unity 6 LTS from Day 1. Do NOT plan an engine migration.**
>
> Earlier drafts suggested "prototype in Godot, then migrate to Unity." **That advice has been retired.** Mid-project engine migrations are one of the most common reasons indie games die. Since the goal is **desktop-first now, with a clean path to mobile later**, Unity is the correct single choice because:
> - Its mobile export + monetization SDK ecosystem (IAP, ads, analytics) is first-class — you get the mobile door for *free* without changing engines.
> - Cross-platform input (keyboard/mouse + controller now, touch later) is built in.
> - Steam, GOG, Epic, Android, and iOS all export from one project.
>
> Your RTX 5090 + 64 GB RAM means Unity's heavier editor is completely comfortable. **Godot is now only a personal learning sandbox — not the production path.**

### 🎯 Platform Strategy: Desktop-First, Mobile-Ready

| Phase | Platform | When | Notes |
|---|---|---|---|
| **Phase 1 (NOW)** | **Windows Desktop (Steam)** | Primary target | Best "feel" for an atmospheric, story-driven RPG. Build wishlists here. |
| **Phase 2** | macOS + Linux (Steam) | Near-free with Unity | One checkbox each at export time. |
| **Phase 3** | **Android** | Post-launch | Buildable directly from this PC (you already have Google Play Games installed for testing). |
| **Phase 4** | **iOS / iPad** | Later | ⚠️ **Requires a Mac** — see Section 11. |

**Design rule to keep mobile cheap later:** even though you're building for desktop, **design the Mandala UI and HUD touch-friendly from the start** (large tap targets, no hover-only interactions, scalable anchors). Retrofitting touch into a mouse-only UI is expensive; designing for both from day one is nearly free.

---

## 🎨 2. Art & Asset Creation Tools

The GDD specifies: **Madhubani-style sprites**, **Pattachitra UI borders**, **Cell-shaded art**, **Amar Chitra Katha cutscenes**.

### 2D Sprite & Pixel Art

| Tool | Role | Cost | Install |
|---|---|---|---|
| **Aseprite** | Industry-standard pixel/sprite editor. Perfect for Madhubani-style 2D Atma sprites with bold outlines and flat fills. Animation timeline built-in. | $20 (Steam) | https://store.steampowered.com/app/431730/Aseprite/ |
| **Krita** | Professional digital painting. Best for Pattachitra-style UI borders, concept art, and the hand-painted look of cutscenes. GPU-accelerated on your RTX 5090. Free. | **Free** | https://krita.org/en/download/ |
| **GIMP** | Free Photoshop alternative. Good for texture atlases and batch processing sprites. | **Free** | https://www.gimp.org/downloads/ |
| **Inkscape** | Vector art for UI elements (the Mandala interface, Sanskrit border designs). Scalable without quality loss. | **Free** | https://inkscape.org/release/ |

### 3D (For Cutscenes or a Future 3D Sequel)

| Tool | Role | Cost | Install |
|---|---|---|---|
| **Blender 4.x** | 3D modeling, rigging, animation, AND rendering. The cell-shading look for Atma models is achievable with Blender's Freestyle renderer or Geometry Nodes. Also used for promotional renders. | **Free** | https://www.blender.org/download/ |

**Note on RTX 5090:** Blender's **Cycles** renderer with OptiX (NVIDIA GPU rendering) will be **extremely fast** on your machine. Renders that take 30 minutes on a mid-range PC will complete in 2–3 minutes.

### Tilemap & World Building

| Tool | Role | Cost | Install |
|---|---|---|---|
| **Tiled Map Editor** | The gold standard for 2D tilemap creation — exports `.tmx` files that Unity and Godot can both import with plugins. Ideal for Ayodhya, Panchavati, Kishkindha, and Lanka maps. | **Free** | https://www.mapeditor.org/ |
| **LDtk** (Level Designer Toolkit) | Modern alternative to Tiled, built specifically for indie 2D games. Has a first-class Godot integration. | **Free** | https://ldtk.io/ |

### Font & Typography (Sanskrit / Devanagari)

| Tool | Role | Cost |
|---|---|---|
| **Google Fonts** (Noto Sans Devanagari, Tiro Devanagari) | For Sanskrit text overlays (the Astra names, mantra scrolls on screen). Free and open-license. | **Free** — download at fonts.google.com |
| **FontForge** | If you want to create a custom stylized Devanagari font for UI headers. | **Free** — fontforge.org |

---

## 🎵 3. Audio & Music Tools

The GDD's audio direction is the most culturally specific requirement: **Sitar, Bansuri (flute), Tabla, Sarangi, Veena, Shanka (Conch), Duggi drums** — a full classical Indian orchestra with dynamic layering.

### Digital Audio Workstation (DAW)

| Tool | Role | Cost | Install |
|---|---|---|---|
| **REAPER** | Lightweight, professional DAW. Supports VST/VSTi plugins for Indian classical instruments. Extremely low CPU overhead. 60-day free trial, then $60 (discounted license). | $60 | https://www.reaper.fm/download.php |
| **LMMS** | Fully free DAW, great for chiptune/electronic layers (battle music). Less capable for orchestral workflows but zero cost. | **Free** | https://lmms.io/download.php |
| **Audacity** | Free audio editor for recording, trimming, and exporting `.ogg`/`.wav` files for the game engine. Not a full DAW. | **Free** | https://www.audacityteam.org/download/ |

### Indian Classical Instrument Plugins (VST/VSTi)

These run inside the DAW and provide high-quality sampled instruments:

| Plugin | Instruments | Cost | Where |
|---|---|---|---|
| **Spitfire LABS** | Free orchestral instruments, includes some world instruments (strings, pads) | **Free** | https://labs.spitfireaudio.com/ |
| **Ample Sound Sitar** | High-quality sitar samples, playable via MIDI keyboard | ~$89 | https://www.amplesound.net |
| **Taalmala Digi** (by Parrikar) | Tabla and Indian percussion samples | Varies | Search on archive.org or indiesound forums |
| **Kontakt Player** (Native Instruments) | Free player for thousands of sample libraries; many free Indian instrument packs available | **Free Player** | https://www.native-instruments.com/en/products/komplete/samplers/kontakt-7-player/ |
| **Ethno World 6** | Comprehensive world instruments library (Sitar, Bansuri, Sarangi, Veena, Tabla) | ~$200 | https://www.bestservice.com/ethno_world_6_complete.html |

### Sound Effects

| Tool | Role | Cost |
|---|---|---|
| **Freesound.org** | Free community-sourced SFX — search for "conch shell", "temple bell", "Sanskrit chant" | **Free** |
| **BFXR / SFXR** | Retro 8-bit sound effect generator (for UI clicks, menu sounds in a pixel-art style) | **Free** — bfxr.net |
| **Sonniss GDC Audio Bundle** | Annual free high-quality SFX bundle released at GDC, includes nature, whooshes, impacts | **Free** (yearly release) |

---

## 💻 4. Programming Tools & Languages

### Primary Languages

| Language | Engine | Role |
|---|---|---|
| **C#** | Unity | Main game logic — battle engine, Vyuha grid, Karma system, AI, save files |
| **GDScript** | Godot | Primary scripting language (Python syntax); all game logic |
| **Ruby (RGSS3)** | RPG Maker XP | If using RPG Maker — battle modifications, custom UI |
| **GLSL / Shader Graph** | Unity/Godot | Elemental shaders, screen effects (Eclipse of Maya overlay, Maya vs Dharma color scheme) |

### What Needs to Be Installed

| Tool | Why | Install |
|---|---|---|
| **.NET SDK 8.0** | Required for C# compilation in VS Code + Unity | https://dotnet.microsoft.com/en-us/download/dotnet/8.0 |
| **Python 3.12** | Asset pipeline scripts, data entry automation (Atma-Kosha CSV → JSON), AI-assisted tools (DALL-E API, ChatGPT API for NPC dialogue generation) | https://www.python.org/downloads/ |
| **Ruby 3.x** (via RubyInstaller) | Only needed if RPG Maker XP route is chosen | https://rubyinstaller.org/downloads/ |

### VS Code Extensions to Install Right Now

Open VS Code and install these from the Extensions panel (`Ctrl+Shift+X`):

| Extension | Publisher | Purpose |
|---|---|---|
| **C# Dev Kit** | Microsoft | Full C# IntelliSense, debugger, and test runner |
| **Godot Tools** | geequlim | GDScript language support, debugger |
| **Unity** | Unity Technologies | Unity project integration |
| **GLSL Lint** | cadenas | Shader file validation |
| **Shader languages support** | slevesque | GLSL/HLSL syntax highlighting |
| **Excel Viewer** | GrapeCity | View Atma-Kosha balance sheets inside VS Code |
| **Markdown All in One** | Yu Zhang | For maintaining and rendering the GDD |
| **GitLens** | GitKraken | Advanced git history and blame for tracking design changes |
| **REST Client** | Huachao Mao | Test PvP backend API endpoints |

---

## 🗄️ 5. Database & Backend (PvP / Ashram System)

The GDD describes a **PvP system with ranked matches, an Ashram Defense (asynchronous PvP), and a Karmic Ladder**. This requires a real backend.

**Your existing stack (Node.js + Docker) is perfect for this:**

| Component | Recommended Tool | Why |
|---|---|---|
| **Runtime** | Node.js 24.16.0 ✅ (already installed) | Fast async I/O for real-time match events |
| **Framework** | **Express.js** or **Fastify** | REST API for matchmaking, Ashram uploads |
| **Real-time PvP** | **Socket.io** | WebSocket-based real-time battle sync (for Dharma-Yuddha ranked matches) |
| **Database** | **PostgreSQL** (via Docker) | Stores player profiles, Karma scores, Ashram layouts |
| **ORM** | **Prisma** (you already use it in ChitSeva!) | Type-safe database access |
| **Cache** | **Redis** (via Docker) | Fast matchmaking queues, session data |
| **Auth** | **JWT tokens** | Player login for PvP |
| **Containerization** | **Docker Compose** ✅ (already installed) | Run postgres + redis + api-server locally |

**You already have the full backend stack from ChitSeva.** The `/backend` folder in this workspace uses Node.js + Prisma — that exact same architecture can power Aryavarta's PvP server.

---

## 🗂️ 6. Project Management & Asset Pipeline

| Tool | Purpose | Cost |
|---|---|---|
| **Git + GitHub/GitLab** ✅ | Version control for code AND binary assets (LFS for sprites, audio) | Free |
| **Git LFS** | Large File Storage — necessary for storing `.png` sprites, `.ogg` audio, and `.blend` files in git without bloating the repo | Free — git-lfs.com |
| **Notion / Obsidian** | Organize the GDD, Atma-Kosha tables, quest scripts. Obsidian is offline Markdown-based (matches your GDD format). | Free |
| **Trello / GitHub Projects** | Sprint tracking — aligns with the 4-month roadmap in the GDD | Free |
| **draw.io / Excalidraw** | Flowcharts for battle state machines, Karma decision trees, Vyuha formation logic | Free |

---

## 🔧 7. Specialized Game Dev Tools

### Turn-Based Battle Frameworks (Unity Asset Store)

These are paid assets that save months of work on the combat engine:

| Asset | Price | What it Gives You |
|---|---|---|
| **Turn-Based Strategy Kit** (by Indie Marc) | ~$40 | Full turn-based grid system — adapt for 3×3 Vyuha battle |
| **Dialogue System for Unity** (by Pixel Crushers) | ~$65 | Branching dialogue with variable tracking — perfect for Dharma choice system |
| **Feel** (by More Mountains) | Free–$90 | Juice/feedback effects (screen shake, flash) for Astra impacts |
| **DOTween Pro** | ~$15 | Animation tweening for Mandala UI, Atma evolution sequences |

### Localization (Sanskrit & Hindi)

| Tool | Notes |
|---|---|
| **Unity Localization Package** | Official Unity package for multi-language support — handle Sanskrit transliterations |
| **CSV/JSON locale files** | Store Sanskrit Astra names, mantra text, location names in structured locale files |

### AI-Assisted Tools (Your RTX 5090 Makes Local AI Viable)

| Tool | Purpose | Notes |
|---|---|---|
| **Stable Diffusion** (ComfyUI) | Generate concept art in Madhubani / Pattachitra style as reference for your artists | Runs **very fast** locally on RTX 5090 — no API costs |
| **Ollama + LLaMA 3** | Local LLM for generating NPC dialogue, quest text, and Atma lore snippets | Runs entirely on your machine; 64GB RAM handles large models |
| **Whisper (OpenAI)** | Speech-to-text for voice acting scratch tracks — record temp dialogue locally | Free, runs locally via Python |
| **Suno AI / Udio** | AI-generated music drafts in specific Indian classical styles for rapid audio prototyping | Web-based, free tier |

---

## 📋 8. Full Install Checklist

Copy this list and work through it top to bottom:

### 🔴 CRITICAL (Install First — Unblocks Everything)

- [ ] **Unity Hub** → https://unity.com/download  
  Then inside Hub: Install **Unity 6000.0 LTS** with modules: `WebGL`, `Android Build Support`, `Windows Build Support`
- [ ] **.NET SDK 8.0** → https://dotnet.microsoft.com/en-us/download/dotnet/8.0
- [ ] **Python 3.12** → https://www.python.org/downloads/ *(check "Add to PATH" during install)*

### 🟡 HIGH PRIORITY (Art & Audio Pipeline)

- [ ] **Krita** → https://krita.org/en/download/
- [ ] **Aseprite** → https://store.steampowered.com/app/431730/ *(Steam — $20)*
- [ ] **Blender 4.x** → https://www.blender.org/download/
- [ ] **Tiled Map Editor** → https://www.mapeditor.org/
- [ ] **REAPER** → https://www.reaper.fm/download.php (reaper is paid)
- [ ] **Audacity** → https://www.audacityteam.org/download/
- [ ] **Native Instruments Kontakt Player** → https://www.native-instruments.com *(free player)* (not installed yet)
- [ ] **Spitfire LABS** → https://labs.spitfireaudio.com/

### 🟢 RECOMMENDED (Enhances Workflow)

- [ ] **Godot 4.4** → https://godotengine.org/download/windows/ *(for rapid prototyping)*
- [ ] **Inkscape** → https://inkscape.org/release/
- [ ] **Git LFS** → https://git-lfs.com *(run `git lfs install` after)*
- [ ] **LDtk** → https://ldtk.io/
- [ ] **Obsidian** → https://obsidian.md/download *(for GDD management)*
- [ ] **Noto Sans Devanagari font** → https://fonts.google.com/noto/specimen/Noto+Sans+Devanagari

### 🔵 VS Code Extensions (Install via `Ctrl+Shift+X`)

- [ ] C# Dev Kit (Microsoft)
- [ ] Godot Tools (geequlim)
- [ ] Unity (Unity Technologies)
- [ ] GitLens (GitKraken)
- [ ] GLSL Lint
- [ ] Markdown All in One

---

## 🏗️ 9. Recommended Project Architecture

```
aryavarta/
├── game/                        # Unity or Godot project
│   ├── Assets/
│   │   ├── Atmas/               # Sprite sheets, animations per Atma
│   │   ├── Audio/               # .ogg files (battle, overworld, boss)
│   │   ├── Maps/                # Tiled .tmx exports → Unity tilemaps
│   │   ├── Scripts/
│   │   │   ├── Battle/          # VyuhaGrid.cs, AstraSystem.cs, TapasManager.cs
│   │   │   ├── World/           # DharmaManager.cs (Singleton), KarmaSystem.cs
│   │   │   ├── UI/              # MandalaInterface.cs, AtmaKoshaUI.cs
│   │   │   └── Data/            # AtmaDatabase.cs, AstraDatabase.cs (ScriptableObjects)
│   │   ├── Shaders/             # DharmaGold.shadergraph, MayaPurple.shadergraph
│   │   └── Scenes/              # Ayodhya.unity, Panchavati.unity, Lanka.unity
│   └── ProjectSettings/
│
├── art/                         # Source files (Krita .kra, Aseprite .ase, Blender .blend)
├── audio/                       # REAPER project files, stems
├── backend/                     # Node.js PvP server (reuse ChitSeva backend pattern)
│   ├── src/
│   │   ├── pvp/                 # matchmaking, Ashram defense, Karma ladder
│   │   └── player/              # player profiles, Dharma meter persistence
│   └── prisma/                  # Schema for players, matches, Ashrams
├── tools/                       # Python scripts: atma_csv_to_json.py, balance_sim.py
├── docs/                        # GDD, Atma-Kosha spreadsheets
└── .github/workflows/           # CI/CD: auto-build Unity project on push
```

---

## ⚡ 10. Hardware Advantage Summary

Your machine is **significantly overpowered** for a 2D indie game — this is a massive advantage:

| Capability | How It Helps Aryavarta |
|---|---|
| **RTX 5090 Laptop GPU** | Near-instant Blender renders for concept art & trailers; local Stable Diffusion for Madhubani-style reference art; GPU-accelerated Unity/Godot builds |
| **64 GB RAM** | Run Unity Editor + Krita + Blender + REAPER simultaneously with zero slowdown; run large local AI models (LLaMA 3 70B) for NPC dialogue generation |
| **Core Ultra 9 285HX (24 cores)** | Parallel asset compilation; Unity's Burst Compiler and Jobs system will be fully utilized; fast script compilation |
| **Docker Desktop** | Full backend stack (postgres, redis, api-server) runs locally — test multiplayer without any cloud costs |
| **WSL 2** | Run Linux-only audio tools, Python environments, and Godot export templates in a real Linux layer |
| **Google Play Games (installed)** | Test the Android build of Aryavarta on your PC without a physical Android device |

---

## 🗺️ Mapping GDD Requirements to Tools

| GDD Feature | Tool(s) |
|---|---|
| 3×3 Vyuha Grid Combat | Unity `Tilemap` + `Grid` + custom `VyuhaManager.cs` *or* Godot `TileMap` node |
| Tapas Energy System | C# ScriptableObject per Atma; Godot Resource class |
| Dharma/Karma Meter | C# Singleton `DharmaManager` with JSON save; Godot AutoLoad |
| Astra Visual Effects | Unity Shader Graph (URP) + VFX Graph *or* Godot's `GPUParticles2D` |
| Mandala Battle UI | Unity UI Toolkit radial layout *or* Godot `Control` nodes with rotation |
| Madhubani Sprite Art | **Aseprite** (pixel sprites) + **Krita** (concept painting) |
| Pattachitra UI Borders | **Inkscape** (vector) → exported PNG → imported into engine |
| Indian Classical Music | **REAPER** DAW + **Kontakt** instrument libraries |
| Dynamic Music (Dharma-based) | Unity `AudioMixer` snapshots *or* Godot `AudioBus` switching |
| Sanskrit Text Overlays | **Noto Sans Devanagari** font + Unity/Godot Localization system |
| Overworld Tilemap | **Tiled** *or* **LDtk** → import to engine |
| PvP Backend | Node.js + Socket.io + PostgreSQL + Docker (reuse ChitSeva pattern) |
| Asynchronous Ashram Defense | Node.js REST API + PostgreSQL (store ghost AI behavior as JSON) |
| Karma Leaderboard | PostgreSQL + Redis (caching) + REST API |
| Sadhana Evolution Branching | ScriptableObject tree in Unity *or* Godot Resource graph |
| Save System | Unity: `PlayerPrefs` + JSON file; Godot: `FileAccess` + JSON |
| Concept Art Generation | Local Stable Diffusion (ComfyUI) on RTX 5090 |
| NPC Dialogue Drafts | Local Ollama + LLaMA 3 (64GB RAM supports 70B model) |

---

## 💰 Estimated Tool Budget

| Category | Tools | Cost |
|---|---|---|
| Game Engine | Unity (Personal/Plus) | **Free** (until $200K revenue) |
| Sprite Editor | Aseprite | **$20** |
| DAW | REAPER | **$60** |
| RPG Maker XP (optional prototype) | Steam | **$25** |
| Indian Instrument VST (budget) | Spitfire LABS + Kontakt Player | **Free** |
| Indian Instrument VST (full) | Ethno World 6 | **~$200** (optional) |
| Unity Asset Store (combat kit + dialogue) | Various | **~$120–200** |
| **Everything else** | Godot, Krita, Blender, Python, Tiled, LDtk, Inkscape, Audacity, Git LFS, VS Code extensions | **FREE** |
| **Minimum viable budget** | | **~$80–105** |
| **Recommended full budget** | | **~$300–400** |

---

## ✅ Immediate Next Steps (Day 1 Actions) — Desktop-First

1. **Install Unity Hub** and Unity 6000.0 LTS. At minimum add the **Windows Build Support** module now; add **Android Build Support** too (it's free and keeps the mobile door open).
2. **Install .NET SDK 8.0** (unblocks C# tooling in VS Code).
3. **Install Python 3.12** (unblocks AI tools and pipeline scripts).
4. **Install Krita** (start sketching Atma designs — costs nothing).
5. **Open VS Code → install C# Dev Kit, GitLens, and Unity extensions**.
6. **Run `git lfs install`** to prepare the repo for binary assets.
7. **Create the repo structure** outlined in Section 9 above.
8. Begin with GDD Month 1 goal: *"Build the Battle Engine — 3v3 turn-based logic"* — built **resolution-independent and input-agnostic** (see Section 11) so it scales from a 1080p monitor to a phone later.

> Note: Godot is no longer on the critical path (see the updated Engine Recommendation). Install it only if you want a personal scripting sandbox.

---

## 💼 11. Monetization & Business Model (Desktop-First)

> **You said: "ideally both mobile + desktop, but focus on desktop for now — it'll have the right feel."** That is exactly the correct instinct. Below is the honest strategic picture so the tech stack is built around a real business model, not just features.

### The Reality Check First

The Aryavarta GDD describes a **premium-scale, single-player narrative RPG** (8 sage gauntlets, a 10-phase final boss, crafting, customization, post-game) **plus** a full competitive PvP suite. As written, this is a **multi-year project** — it does **not** "monetize quickly." Premium RPGs earn revenue **once, at launch, after the work is done.** Plan accordingly.

### Recommended Model: **Premium (Paid) on Steam**

For a story-driven, atmospheric, culturally-rich RPG, **a one-time paid purchase on Steam (~$15–20) is the right fit.** It matches player expectations for this genre (compare: *Cassette Beasts*, *Coromon*, *Temtem*), preserves artistic integrity (no ads/gacha cheapening the spiritual theme), and is the simplest to build.

| Model | Verdict for Aryavarta |
|---|---|
| **Premium / Paid (Steam)** ✅ | **Chosen.** Best feel, matches genre, simplest tech. |
| Free-to-Play + Gacha | ❌ Not now. Would require redesigning Atma-collection into a "summon" grind + live-ops team. Keep as a *possible* mobile-only variant later. |
| Ads | ❌ Never for desktop premium. Would undermine the tone. |

### The "Quickest Realistic Cash" Path (without abandoning quality)

Since a full launch is years away, generate momentum & early validation in this order:

1. **Free "Vertical Slice" Demo** (Ayodhya hub + Starter selection + first Test of Dharma). Costs nothing to release.
2. **Steam "Coming Soon" page + wishlists** — wishlists are the #1 currency of indie success; collect them from day one.
3. **Steam Next Fest** participation (free demo festival → huge visibility spike).
4. **Optional Kickstarter / crowdfunding** once the demo proves the art + combat feel. *This* is the realistic "early money."
5. **Early Access** launch (partial game, paid) if you want revenue before the full content is done.

### Monetization SDKs — Build the Hooks, Even if Premium

Even a premium desktop game benefits from these (and they're *mandatory* if you ever ship F2P mobile). Architect for them now so it's not a rewrite later:

| Need | Desktop (now) | Mobile (later) |
|---|---|---|
| **Store / Purchase** | Steamworks SDK (`com.rlabrecque.steamworks.net` Unity wrapper) | Unity IAP → Google Play Billing / Apple StoreKit |
| **Achievements / Cloud Save** | Steamworks (Steam Cloud) | Unity Cloud Save / Firebase |
| **Analytics** | **GameAnalytics** (free, indie-friendly) or Firebase Analytics | same |
| **Crash Reporting** | Unity Cloud Diagnostics / Sentry | Firebase Crashlytics |
| **Live Config (drop rates, events)** | Firebase Remote Config (optional) | Firebase Remote Config |
| **Ads (only if F2P mobile)** | — | Unity LevelPlay (ironSource) or AppLovin MAX |

### Store / Account Costs (the recurring fees the earlier draft omitted)

| Platform | Cost | When |
|---|---|---|
| **Steam Direct** | **$100 one-time per app** (recoupable) | Before publishing on Steam |
| **Google Play** | **$25 one-time** | When you ship Android |
| **Apple Developer** | **$99 / year** | Only if/when you ship iOS |
| **Cloud backend hosting** (PvP/leaderboards) | **~$10–50 / month** | Once multiplayer goes live |

---

## 🌐 12. Cross-Platform Build & Distribution

### ⚠️ The Hidden Blocker: iOS Needs a Mac

Your RTX 5090 Windows laptop can build **Windows, Linux, and Android** with zero extra hardware. But **iPhone/iPad builds require a Mac with Xcode to compile and submit to the App Store.** Options when you reach Phase 4:

| Option | Cost | Notes |
|---|---|---|
| **Buy a Mac mini (M-series)** | ~$600 one-time | Cheapest long-term; full local iOS pipeline |
| **Cloud Mac** (MacStadium, Codemagic) | ~$30–100/mo | Pay only while actively building iOS |
| **Unity Cloud Build** | Subscription | Builds iOS in the cloud, no local Mac |

**Recommendation:** Ignore iOS entirely for now. Ship Windows → Android → (iOS only if the game succeeds and justifies the Mac).

### Design-Once, Ship-Everywhere Engineering Rules

Build these in from the first line of code so the mobile port is cheap, not a rewrite:

- **Resolution independence:** Use Unity's **Canvas Scaler** set to "Scale With Screen Size"; anchor UI to edges, never to fixed pixel coordinates. Test at 1920×1080, 2560×1440, *and* a 20:9 phone aspect.
- **Input abstraction:** Use Unity's **new Input System** with an Action map so "Confirm" = mouse-click / gamepad-A / screen-tap interchangeably. Never hard-code `Input.GetMouseButton`.
- **Touch-friendly UI from day one:** the **Mandala radial menu is actually perfect for touch** — large quadrant tap targets, no tiny buttons, no hover-only tooltips.
- **Performance budget:** target mid-range mobile GPUs even on desktop (keep draw calls/overdraw sane). A game that runs on a phone runs *beautifully* on your RTX 5090; the reverse is not true.
- **Save system:** abstract saves behind an interface so desktop = local JSON file + Steam Cloud, mobile = Unity Cloud Save, without touching game logic.

### Recommended Distribution Roadmap

| Step | Platform | Channel |
|---|---|---|
| 1 | Windows demo | Steam "Coming Soon" + itch.io |
| 2 | Windows full / Early Access | Steam |
| 3 | macOS + Linux | Steam (same build pipeline) |
| 4 | Android | Google Play (+ Google Play Games PC, already installed) |
| 5 | iOS | App Store (requires Mac — Phase 4 only) |

---

## ✂️ 13. Reality Check — Recommended MVP Scope Cut

The full GDD is a *vision document*, not a v1.0 spec. Building all of it before shipping = never shipping. **Cut to this MVP / Vertical Slice first:**

| Include in MVP | Defer to Post-Launch |
|---|---|
| 3 Starters + ~10–15 common Atmas | Full 150+ bestiary, Legendaries (Divyas) |
| Ayodhya hub + 1 region (Tataka Forest) | All 5 regions, Lanka, Setu bridge quest |
| **1 Test of Dharma** (Prince Bharata) | All 8 Sage gauntlets |
| Core loop: explore → bind → battle → evolve | Crafting (Rasayana), customization (Vastra) |
| Mandala battle UI + Vyuha 3×3 grid | Astral Clash minigame, post-game Patala |
| Single-player only | **All PvP** (Dharma-Yuddha, Ashram, Sabha) — *huge* scope, defer entirely |

> **PvP is the single biggest scope trap in this GDD.** Real-time netcode, matchmaking, anti-cheat, and balance are each multi-month efforts. Ship a polished *single-player* desktop game first; add the async "Ashram Defense" (easiest multiplayer) only after launch.

---

## 💰 14. Updated Realistic Budget (Desktop Premium Launch)

The earlier "$80–400" figure was tooling-only. Here is the **true cost to ship a desktop premium game**:

| Category | Item | Cost |
|---|---|---|
| **Tools (one-time)** | Aseprite $20 + REAPER $60 + Unity assets ~$150 | **~$230** |
| **Store fee (one-time)** | Steam Direct | **$100** |
| **Audio (optional)** | Ethno World 6 instruments | **~$200** |
| **Backend (only if leaderboards/PvP)** | Cloud hosting | **~$10–50 / mo** |
| **Marketing (optional but wise)** | Trailer, key art, Next Fest is free | **$0–500** |
| **Engine royalty** | Unity Personal | **Free** under $200K rev |
| **Realistic desktop-launch total** | | **~$330 (lean) – $1,000 (comfortable)** |
| **Add later for mobile** | Google Play $25 + (Apple $99/yr + Mac/cloud-Mac for iOS) | **+$25 → +$700** |

---

*Report generated: May 31, 2026 · Updated for Desktop-First / Mobile-Ready strategy*
*Machine: MSI Core Ultra 9 285HX · RTX 5090 · 64 GB RAM · Windows 11*
