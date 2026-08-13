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

### 🏆 Recommendation for This Machine & Developer Profile (UPDATED — Godot 4.4 Production Decision)

> **Commit to Godot 4.4 from Day 1. This is the production engine for Aryavarta.**
>
> The priority has shifted from "prove the design works" (done — the JS prototype accomplished that) to **"make something that looks, sounds, and feels like a real game."** Godot 4.4 is the fastest path from "design prototype" to a polished, shippable indie game because:
>
> - **~200 MB install** vs Unity's 12 GB — gets you to "game running on screen" in minutes, not hours.
> - **GDScript** (Python-like syntax) is faster to iterate on than C#, and the entire game logic from the JS prototype translates directly — the same data structures, the same event patterns.
> - **Node/Scene architecture** maps perfectly to Aryavarta's systems: each Atma is a scene, each battle formation is a Node2D, the Mandala UI is a Control tree — everything is modular and visual in the editor.
> - **LDtk has first-class Godot integration** (the `LDtk Importer` plugin imports levels directly as scenes). This is the best 2D tilemap workflow available for indie devs.
> - **AnimationPlayer + AnimatedSprite2D** give real sprite animation (walk cycles, battle animations) out of the box with zero code.
> - **AudioStreamPlayer** with AudioBus allows the dynamic music system (overworld → battle → Dharma-based layering) described in the GDD.
> - **100% free, no royalties, no runtime fee controversy.** Ship on Steam keeping 100% of engine revenue.
> - **Exports to:** Windows, Linux, macOS, Android, HTML5 (browser) — all from one project, all for free.
>
> **Unity remains an option if the game succeeds and needs Switch/PlayStation/Xbox console ports** (which require Unity or Unreal). But for reaching a shippable vertical slice quickly, **Godot 4.4 is the correct choice.**
>
> Your RTX 5090 + 64 GB RAM means you can run **Godot + Krita + Blender + REAPER simultaneously** with zero slowdown — the lightweight Godot editor leaves most of your RAM free for art and audio tools.

### 🎯 Platform Strategy: Desktop-First, Mobile-Ready

| Phase | Platform | Engine Path | Notes |
|---|---|---|---|
| **Phase 1 (NOW)** | **Windows Desktop (Steam)** | Godot → Windows export | Primary target. Best "feel" for an atmospheric RPG. Build Steam wishlists here. |
| **Phase 2** | macOS + Linux (Steam) | Godot → macOS/Linux export | Free, one checkbox each. macOS requires code-signing (~$99/yr Apple Dev account). |
| **Phase 3** | **Android** | Godot → Android export | Buildable from your PC (Google Play Games already installed for testing). |
| **Phase 4** | **Browser (itch.io demo)** | Godot → HTML5 export | Free demo to build community before Steam launch. |
| **Phase 5** | **iOS / iPad** | Requires Mac + Xcode | ⚠️ Defer until post-launch. See Section 12. |

**Design rule — touch-friendly from day one:** design the Mandala UI and HUD for large tap targets and no hover-only interactions. Retrofitting touch into a mouse-only UI is expensive; designing for both from day one is nearly free.

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
| **GDScript** | Godot 4.4 ✅ **PRIMARY** | All game logic — battle engine, Vyuha grid, Karma system, overworld, UI, save files |
| **GLSL (Godot shaders)** | Godot 4.4 | Elemental shaders, screen effects (Eclipse of Maya — gold/purple color schemes) |
| **C#** | Unity (future/optional) | If the game later needs console ports or Unity-specific plugins |
| **Ruby (RGSS3)** | RPG Maker XP (retired) | No longer on the path — RPG Maker is not being used |

### What Needs to Be Installed

| Tool | Why | Install |
|---|---|---|
| **Godot 4.4** | Production game engine — everything runs here | https://godotengine.org/download/windows/ |
| **Python 3.12** | Asset pipeline scripts, data entry automation (Atma-Kosha CSV → JSON → Godot Resources), AI tools | https://www.python.org/downloads/ |
| **.NET SDK 8.0** | Only needed if C# scripting in Unity is used in the future | https://dotnet.microsoft.com/en-us/download/dotnet/8.0 |

### VS Code Extensions to Install Right Now

Open VS Code and install these from the Extensions panel (`Ctrl+Shift+X`):

| Extension | Publisher | Purpose | Priority |
|---|---|---|---|
| **Godot Tools** | geequlim | GDScript IntelliSense, debugger, scene tree view | 🔴 Critical |
| **GitLens** | GitKraken | Git history, blame, asset change tracking | 🔴 Critical |
| **Markdown All in One** | Yu Zhang | Render and edit the GDD live in VS Code | 🔴 Critical |
| **GLSL Lint** | cadenas | Godot shader file (`.gdshader`) validation | 🟡 High |
| **REST Client** | Huachao Mao | Test PvP backend API endpoints | 🟡 High |
| **Excel Viewer** | GrapeCity | View Atma-Kosha balance sheets inside VS Code | 🟢 Recommended |
| **C# Dev Kit** | Microsoft | Only needed if/when Unity is used | 🔵 Optional |

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

### Godot Plugins & Add-ons (Free — Godot Asset Library)

These are free plugins from the Godot Asset Library (`AssetLib` tab inside the editor) that save significant time:

| Plugin | Purpose | Cost |
|---|---|---|
| **Dialogic 2** | Visual novel-style dialogue system with branching, variables, and portraits. Perfect for the Dharma karma choice system and NPC dialogues. | **Free** |
| **LDtk Importer** | Imports LDtk level files as Godot scenes. First-class integration — the correct workflow for Aryavarta's tilemap world. | **Free** |
| **Godot Rollback Netcode** | Rollback-based multiplayer framework — needed for eventual PvP. Start with this foundation rather than building from scratch. | **Free** |
| **Phantom Camera** | Advanced camera system for smooth overworld camera, cinematic cutscenes, and battle zoom-ins. | **Free** |
| **GodotTweens / Anima** | Animation tweening for the Mandala UI, Atma evolution sequences, and screen transitions. | **Free** |
| **Gut (Godot Unit Tests)** | Unit testing framework for GDScript — test battle formula, damage calculations, type effectiveness. | **Free** |

### "Juice" / Game Feel (Built-in to Godot 4)

Unlike Unity, Godot 4 has these *built-in* — no paid plugin needed:
- **ShakeableCamera2D** via `Camera2D.offset` tweening → screen shake on Astra impact
- **CanvasModulate** → full-screen color flash (eclipse, battle start)
- **AnimationPlayer** → any UI element can be animated without code
- **AudioBus + AudioEffectChorus/Reverb** → dynamic music layering for Dharma meter

### Localization (Sanskrit & Hindi)

| Tool | Notes |
|---|---|
| **Godot Localization** (built-in) | `TranslationServer` + `.csv` or `.po` files handle Sanskrit transliterations. Zero extra plugin needed. |
| **Noto Sans Devanagari** (font) | Import as `.ttf` into `res://fonts/` — works natively with Godot's Label nodes |
| **CSV locale files** | Store Sanskrit Astra names, mantra text, location names; auto-loaded via Godot's built-in localization system |

### AI-Assisted Tools (Your RTX 5090 Makes Local AI Viable)

| Tool | Purpose | Notes |
|---|---|---|
| **Stable Diffusion** (ComfyUI) | Generate concept art in Madhubani / Pattachitra style as reference for your artists | Runs **very fast** locally on RTX 5090 — no API costs |
| **Ollama + LLaMA 3** | Local LLM for generating NPC dialogue, quest text, and Atma lore snippets | Runs entirely on your machine; 64GB RAM handles large models |
| **Whisper (OpenAI)** | Speech-to-text for voice acting scratch tracks — record temp dialogue locally | Free, runs locally via Python |
| **Suno AI / Udio** | AI-generated music drafts in specific Indian classical styles for rapid audio prototyping | Web-based, free tier |

---

## 📋 8. Full Install Checklist (UPDATED — Godot Pipeline)

Copy this list and work through it top to bottom:

### 🔴 CRITICAL (Install First — Unblocks Everything)

- [ ] **Godot 4.4 Standard** → https://godotengine.org/download/windows/ *(~200 MB, no installer — just unzip and run)*
- [ ] **Python 3.12** → https://www.python.org/downloads/ *(check "Add to PATH" during install)*
- [ ] **Git LFS** → https://git-lfs.com *(run `git lfs install` after — needed for sprites and audio in git)*
- [ ] **VS Code → Godot Tools extension** (geequlim) — connects Godot editor to VS Code debugger

### 🟡 HIGH PRIORITY (Art Pipeline — Draw the Game)

- [ ] **Krita** → https://krita.org/en/download/ *(Madhubani concept art, Pattachitra UI borders — already installed?)*
- [ ] **Aseprite** → https://store.steampowered.com/app/431730/ *(Steam — $20 — pixel sprite animation)*
- [ ] **LDtk (Level Designer Toolkit)** → https://ldtk.io/ *(design Ayodhya, Tataka Forest tilemaps visually)*
- [ ] **Inkscape** → https://inkscape.org/release/ *(Mandala UI vector art, Sanskrit border frames)*
- [ ] **Noto Sans Devanagari font** → https://fonts.google.com/noto/specimen/Noto+Sans+Devanagari

### 🟡 HIGH PRIORITY (Audio Pipeline — Sound the Game)

- [ ] **Audacity** → https://www.audacityteam.org/download/ *(trim/export .ogg audio for Godot — free)*
- [ ] **REAPER** → https://www.reaper.fm/download.php *($60 — professional DAW for composing battle themes)*
- [ ] **Native Instruments Kontakt Player** → https://www.native-instruments.com *(free player for instrument libraries)*
- [ ] **Spitfire LABS** → https://labs.spitfireaudio.com/ *(free orchestral pads/strings — a good starting point)*

### 🟢 RECOMMENDED (Enhances Workflow)

- [ ] **Blender 4.x** → https://www.blender.org/download/ *(3D renders for promotional art, animated cutscenes)*
- [ ] **Obsidian** → https://obsidian.md/download *(offline GDD management — already have Markdown files)*
- [ ] **VS Code → GitLens** (GitKraken) — advanced git history
- [ ] **VS Code → Markdown All in One** (Yu Zhang) — render GDD inside editor

### 🔵 FUTURE / OPTIONAL

- [ ] **Unity Hub + Unity 6 LTS** → only if console ports are needed post-launch
- [ ] **.NET SDK 8.0** → only needed with Unity
- [ ] **VS Code → C# Dev Kit** → only needed with Unity

---

## 🏗️ 9. Recommended Project Architecture (Godot 4.4)

```
aryavarta-godot/                 # ← The REAL game (Godot 4.4 project)
├── project.godot                # Godot project settings file
├── scenes/
│   ├── world/
│   │   ├── Ayodhya.tscn         # Overworld region scenes (LDtk import)
│   │   ├── Tataka.tscn
│   │   ├── Kishkindha.tscn
│   │   └── Lanka.tscn
│   ├── battle/
│   │   ├── BattleScene.tscn     # Main battle screen
│   │   ├── MandalaUI.tscn       # The circular battle interface
│   │   └── AtmaSprite.tscn      # Reusable animated Atma prefab
│   ├── ui/
│   │   ├── MainMenu.tscn
│   │   ├── AtmaKosha.tscn       # The Pokédex equivalent
│   │   ├── AmritPouch.tscn      # Item bag
│   │   └── KarmaHUD.tscn        # Dharma meter overlay
│   └── cutscenes/               # Dialogic 2 dialogue scenes
│       ├── ch01_awakening.dtl
│       └── ch02_trimurti.dtl
├── scripts/
│   ├── autoload/                # Godot AutoLoad (Singletons)
│   │   ├── DharmaManager.gd     # Global Karma/Dharma state
│   │   ├── PlayerState.gd       # Party, steps, save/load
│   │   └── AudioManager.gd      # Dynamic music system
│   ├── battle/
│   │   ├── BattleEngine.gd      # Port from JS: damage formula, turn order, AI
│   │   ├── VyuhaGrid.gd         # 4 formations with combat multipliers
│   │   ├── AtmaInstance.gd      # Live stats (HP, Tapas, status, Bhakti)
│   │   └── AstraSystem.gd       # Move execution, type effectiveness
│   ├── world/
│   │   ├── PlayerController.gd  # WASD movement, animation state machine
│   │   ├── EncounterTrigger.gd  # Tall-grass step counter
│   │   └── NPC.gd               # NPC interaction base class
│   └── data/
│       ├── AtmaDatabase.gd      # Autoload: all 29 species as Resources
│       ├── AstraDatabase.gd     # Autoload: all 25 moves as Resources
│       └── TypeChart.gd         # 5×5 effectiveness matrix
├── sprites/
│   ├── atmas/                   # .png sprite sheets (Aseprite exports)
│   ├── player/                  # Player walk/run/battle sprites
│   ├── tiles/                   # Tileset PNGs (Ayodhya, Forest, Mountain)
│   └── ui/                      # Mandala UI, borders, icons
├── audio/
│   ├── music/                   # .ogg — overworld, battle, boss themes
│   └── sfx/                     # .wav — Astra hits, UI clicks, conch
├── shaders/
│   ├── DharmaGold.gdshader      # Golden glow for Divine moves
│   └── MayaPurple.gdshader      # Purple distortion for Shadow/Maya moves
├── fonts/
│   └── NotoSansDevanagari.ttf   # Sanskrit text rendering
├── data/
│   └── localization/            # en.csv, hi.csv (Sanskrit/Hindi strings)
│
├── aryavarta/                   # ← JS Logic Prototype (Phases 1–3, reference only)
│   └── (existing browser prototype)
│
├── art/                         # Source files (Krita .kra, Aseprite .ase, Blender .blend)
├── audio-src/                   # REAPER project files, stems, raw recordings
├── backend/                     # Node.js PvP server (reuse ChitSeva pattern)
│   ├── src/pvp/                 # matchmaking, Ashram defense, Karma ladder
│   └── prisma/                  # Player profiles, matches, Ashram layouts
├── tools/                       # Python: atma_csv_to_json.py, balance_sim.py
├── docs/                        # GDD, Atma-Kosha spreadsheets
└── .github/workflows/           # CI/CD: Godot headless export on push
```

---

## ⚡ 10. Hardware Advantage Summary

Your machine is **significantly overpowered** for a 2D indie game — this is a massive advantage:

| Capability | How It Helps Aryavarta |
|---|---|
| **RTX 5090 Laptop GPU** | Near-instant Blender renders for concept art & trailers; local Stable Diffusion for Madhubani-style reference art; Godot GPU particle/shader preview runs at maximum fidelity |
| **64 GB RAM** | Run Godot Editor + Krita + Blender + REAPER simultaneously with zero slowdown — Godot uses only ~300 MB, leaving the rest for art and AI tools; run LLaMA 3 70B locally for NPC dialogue |
| **Core Ultra 9 285HX (24 cores)** | Godot's parallel import pipeline compiles all sprites/audio on startup in seconds; Python balance scripts run near-instantly |
| **Docker Desktop** | Full backend stack (postgres, redis, api-server) runs locally — test PvP/Ashram system without any cloud costs |
| **WSL 2** | Run Linux-only audio tools, Python environments, and Godot headless export templates in a real Linux layer |
| **Google Play Games (installed)** | Test the Android export of Aryavarta on your PC without a physical Android device — Godot Android export is one-click |

---

## 🗺️ Mapping GDD Requirements to Tools (Godot-First)

| GDD Feature | Tool(s) |
|---|---|
| 3×3 Vyuha Grid Combat | Godot `TileMap` + per-cell metadata + `VyuhaGrid.gd` |
| Tapas Energy System | Godot `Resource` class per Atma species; `AtmaInstance.gd` for live state |
| Dharma/Karma Meter | Godot **AutoLoad** `DharmaManager.gd` — global singleton with `FileAccess` JSON save |
| Astra Visual Effects | Godot **GPUParticles2D** + `.gdshader` (DharmaGold / MayaPurple) |
| Mandala Battle UI | Godot **Control** nodes with radial positioning + **AnimationPlayer** for transitions |
| Animated Atma Sprites | **Aseprite** → export `.png` spritesheets → Godot **AnimatedSprite2D** |
| Concept Art / UI Painting | **Krita** for Madhubani style, **Inkscape** for vector Mandala borders |
| Pattachitra UI Borders | **Inkscape** (vector) → exported PNG → Godot `NinePatchRect` for scalable borders |
| Indian Classical Music | **REAPER** DAW + **Kontakt** instrument libraries → export `.ogg` for Godot |
| Dynamic Music (Dharma-based) | Godot **AudioBus** with `AudioEffectChorus`/`Reverb` + `AudioStreamPlayer` crossfade |
| Sanskrit Text Overlays | **Noto Sans Devanagari** `.ttf` font imported into `res://fonts/` + Godot `Label` |
| Overworld Tilemap | **LDtk** level editor → **LDtk Importer plugin** imports directly as Godot scenes |
| NPC Dialogue / Story Branches | **Dialogic 2** Godot plugin — visual timeline, portraits, karma variables |
| PvP Backend | Node.js + Socket.io + PostgreSQL + Docker (reuse ChitSeva pattern) |
| Asynchronous Ashram Defense | Node.js REST API + PostgreSQL (store ghost AI behavior as JSON) |
| Karma Leaderboard | PostgreSQL + Redis (caching) + REST API |
| Sadhana Evolution Branching | Godot **Resource** tree — each evolution path is a Resource with stat deltas |
| Save System | Godot `FileAccess` + JSON → `PlayerState.gd` AutoLoad persists party, Dharma, position |
| Concept Art Generation | Local Stable Diffusion (ComfyUI) on RTX 5090 — Madhubani style LoRA training |
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

## ✅ Immediate Next Steps — Godot Production Start

1. **Download Godot 4.4 Standard** (~200 MB zip, no installer) → https://godotengine.org/download/windows/  
   Unzip to `C:\DevTools\Godot\` and pin `Godot_v4.4_stable_win64.exe` to taskbar.

2. **Create the Godot project:**  
   Open Godot Hub → New Project → Name: `aryavarta-godot` → Path: `C:\Users\ragha\Aryavarta\aryavarta-godot\` → Renderer: **Forward+ (2D)** → Create.

3. **Install VS Code → Godot Tools extension** (geequlim) and configure the Godot editor path so VS Code debugger connects to the engine.

4. **Run `git lfs install`** and add LFS tracking for sprites/audio:  
   ```
   git lfs track "*.png" "*.ogg" "*.wav" "*.blend" "*.ase"
   git add .gitattributes
   ```

5. **Install Godot Asset Library plugins** (inside Godot editor → AssetLib tab):  
   - `Dialogic 2` — dialogue system  
   - `LDtk Importer` — level/tilemap import  
   - `Phantom Camera` — smooth overworld camera  

6. **Install Python 3.12** → https://www.python.org/downloads/ (check "Add to PATH")  
   Then: `pip install Pillow` (sprite batch processing) and `pip install gdtoolkit` (GDScript linter).

7. **First task in Godot:** Get a character sprite moving on a tilemap.  
   - Import one 16×16 tileset PNG (create a placeholder in Krita first)  
   - Create `PlayerController.gd` with 4-direction movement  
   - This confirms the engine is working before writing any game logic

---

##  11. Monetization & Business Model (Desktop-First)

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
| **Tools (one-time)** | Aseprite $20 + REAPER $60 | **~$80** |
| **Store fee (one-time)** | Steam Direct | **$100** |
| **Audio (optional)** | Ethno World 6 instruments | **~$200** |
| **Backend (only if PvP)** | Cloud hosting (DigitalOcean/Render) | **~$10–50 / mo** |
| **Marketing (optional but wise)** | Trailer, key art, Next Fest demo is free | **$0–500** |
| **Engine royalty** | Godot — **zero royalties, ever** | **FREE** |
| **Realistic desktop-launch total** | Lean (Godot saves the $150+ Unity assets cost) | **~$180 (lean) – $700 (comfortable)** |
| **Add later for mobile** | Google Play $25 + (Apple $99/yr + Mac/cloud-Mac for iOS) | **+$25 → +$700** |

---

*Report generated: May 31, 2026 · Updated: July 23, 2026 — Engine decision changed to Godot 4.4 (production), project architecture updated to Godot `res://` convention, all Unity-only references reclassified as future/optional.*  
*Machine: MSI Core Ultra 9 285HX · RTX 5090 · 64 GB RAM · Windows 11*
