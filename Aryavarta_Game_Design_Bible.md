# How Hard Is It to Make a Game Like Pokémon?

Making a game like Pokémon is **moderately to highly difficult**, depending entirely on your experience level, the scope of your project, and the tools you choose. While a 2D Pokémon-like game is achievable for beginners using specialized tools, building a high-quality, polished, or 3D monster-catching game is a massive, multi-year undertaking for a single developer.

## 1. Difficulty by Approach

- **Easy/Beginner:** Using RPG Maker XP with the Pokémon Essentials kit. This provides a pre-built base with the battle system, Pokédex, and inventory, allowing you to focus on mapping and story without coding.
- **Moderate/Intermediate:** Using game engines like Unity (C#) or Godot (GDScript). You will need to build the monster database, turn-based battle logic, and capture mechanics from scratch.
- **Hard/Advanced:** Creating 3D monster models, animations, and open-world mechanics similar to modern Pokémon titles (e.g., Legends: Arceus), which requires a professional team.

## 2. Primary Challenges

- **Sheer Scale:** A Pokémon game involves hundreds of interdependent elements: creatures, moves, types, items, trainers, and maps.
- **Battle System Complexity:** Implementing turn-based mechanics with hundreds of unique moves, abilities, status effects, and damage calculations is highly complex.
- **Asset Creation:** You need maps (tile sets), character sprites, battle animations, monster designs (Fakémon), and music. Even if using pre-made tools, creating unique assets is time-consuming.
- **Balancing:** Ensuring fair gameplay across different types and levels is challenging.

## 3. Estimated Timeline

- **Prototyping (Simple):** A few weeks to a month to make a simple, functional battle and map.
- **Full Solo Project (2D):** It can take 1–3 years of consistent effort to finish a complete game, with many developers working on-and-off during that time.

## 4. Tips for Success

- **Start Small (Minimum Viable Product):** Instead of trying to create 150 monsters, start with 10–20 and one small town/gym. Focus on making walking, battling, and catching work flawlessly before expanding.
- **Use Existing Tools:** Utilize RPG Maker with Pokémon Essentials, which has a helpful community.
- **Focus on Loop:** Prioritize the core loop: explore, encounter, battle, catch.

While it is a "fun mountain to climb," expect to spend hundreds of hours on it.

---

# 🏹 Aryavarta: Legend of the Dharma-Vaan

## Game Design Document

> **⚠️ LIVE IMPLEMENTATION NOTE — Last updated: June 2026**
>
> The prototype **v0.1** browser build (`aryavarta/`) is now complete and playable.  
> Sections marked **✅ Implemented** reflect working code; **📋 Designed** means the design exists but code is not yet written; **🔜 Backlog** means future work.  
> Run the prototype: `cd aryavarta && npx serve . --listen 3000`

To design a Pokémon-style game based on the Ramayana, you must balance capturing the epic's spiritual depth with the strategic, collection-based gameplay of a monster-tamer. This involves adapting mythical beings like Vanaras (monkey warriors), Rakshasas (demons), and Yakshas (nature spirits) into collectible units.

---

## 1. Core Concept

A turn-based RPG where players take on the role of a young seeker in ancient India, collecting and training **Atmas** (spirits of mythical beings) to restore Dharma across the land.

---

## 2. Game Mechanics

- **Collection:** Players "bind" mythical beings (Vanaras, Rakshasas, Divine Birds) using spiritual mantras instead of Pokéballs.
- **Battle System:** 3v3 turn-based tactical combat.
- **Astra System:** Instead of standard moves, characters use **Astras** (divine weapons/incantations like the Brahmastra) that require "Tapas" (energy) to charge.
- **Elemental Types:** Agni (Fire), Vayu (Air), Jala (Water), Prithvi (Earth), and Akash (Ether/Void).
- **Boon & Curse:** A unique mechanic where certain actions in battle can trigger divine boons (stat buffs) or ancestral curses (status effects).

---

## 3. The "Pokédex" — Atma-Kosha

| Atma Name | Type | Inspiration | Role |
|---|---|---|---|
| Vayutra | Vayu (Air) | Hanuman | High-speed physical attacker with flight |
| Tamrakant | Agni (Fire) | Kumbhakarna | Tank/Juggernaut with high defense and power |
| Suvarna-Mriga | Akash (Ether) | Maricha (Golden Deer) | Illusionist; uses dodge and confuse moves |
| Garuda-Ansh | Vayu/Jala | Jatayu | Guardian flyer with high protection stats |
| Vanar-Shakti | Prithvi/Vayu | Sugriva/Angada | Versatile fighters with high teamwork bonuses |

---

## 4. World Map — The Region of Bharatvarsha

The map is inspired by the actual geographic route of the Ramayana:

- **Ayodhya (Starting City):** Royal grand city with the main training academy.
- **Panchavati (Forest Biome):** Dense jungle area filled with Rakshasa-type Atmas.
- **Kishkindha (Mountain Biome):** High-altitude caves where Vanara-type Atmas are found.
- **Lanka (Final Zone):** A golden fortress surrounded by water, home to the most powerful dark-type Atmas.

---

## 5. Development Strategy

- **Engine:** Use RPG Maker XP with Pokémon Essentials for a 2D approach, or Unity for a 3D tactical grid game.
- **Asset Creation:** Focus on Cell-shaded art to mimic traditional Indian paintings (like Raja Ravi Varma style or Pattachitra).
- **Progression:** Instead of Gym Leaders, defeat Rishis (Sages) in "Tests of Virtue" to earn new Mantras/Astras.

---

# Deep Dive: Mechanics & Lore

## 1. The "Astra" Combat System

In this game, moves aren't just "attacks"; they are divine weapons invoked by specific mantras.

### Charging Tapas

Instead of traditional PP, Atmas build **Tapas** (Spiritual Heat) each turn. High-tier Astras require a "Mantra Chant" (1-turn charge) to execute.

### Astra Tiers

- **Agneyastra (Fire):** Releases torrents of flame; effective against Prithvi (Earth) types but weak against Jala (Water).
- **Varunastra (Water):** Can summon floods or torrential rain, changing the battlefield to a "Wet" state.
- **Nagapasha (Binding):** A specialized move that binds an opponent, preventing swapping (standard in Pokémon, but here themed as snake-nooses).
- **Brahmastra (Ultimate):** A "once-per-battle" nuclear-tier move that requires maximum Tapas and can only be used by Atmas with high Sattva (purity).

---

## 2. Character Classes — The Seekers

Unlike a standard "Trainer," players choose a path that grants unique passive bonuses to their Atmas:

- **Brahmin (The Sage):** High proficiency in summoning Astras; reduces Tapas cost.
- **Kshatriya (The Warrior):** Boosts Physical Atk/Def of Vanara and Rakshasa Atmas.
- **Vanatita (The Renunciate):** Can use "Miracle" items more effectively and has higher capture rates.

---

## 3. Creature Spotlight — The "Atmas"

The roster is divided into tribes with distinct biological and spiritual traits:

- **Vanaras (Beast-Men):** High mobility and teamwork. Moves like *Vajra-Mushti* (Diamond Fist) deal heavy physical damage.
- **Rakshasas (Demons):** High HP and "Maya" (Illusion) abilities. They thrive in "Night" or "Dark" field conditions.
- **Nagas (Serpent-Folk):** Focus on poison and status effects.
- **Garudas (Bird-Folk):** Masters of the Vayu (Air) element and sworn enemies of Nagas.

---

## 4. Visual & Art Direction

To stand out, the game should avoid generic anime styles and embrace traditional Indian art forms:

- **UI/Menus:** Inspired by Pattachitra (scroll paintings) with intricate borders.
- **Atma Sprites:** Madhubani style for 2D sprites, using bold outlines and geometric patterns.
- **Cutscenes:** Amar Chitra Katha comic-book aesthetic to evoke nostalgia.

---

## 5. Progression — The Tests of Dharma

Instead of just beating "Gym Leaders," players must face Legendary Sages (like Vishwamitra or Agastya).

**Dharma Meter:** Actions like "mercy" in battle or helping villagers increase your Dharma. High Dharma unlocks access to Deity-tier Atmas (like a Garuda-Ansh), while low Dharma might attract powerful Rakshasas to challenge you.

---

# The Story: "The Shadow of the Ten-Headed"

The game begins in Ayodhya, where a mysterious "Eclipse of Maya" is turning the world's Atmas violent. As a student of the Royal Academy, you are sent by Sage Vashistha to follow the southern path, purify the corrupted spirits, and discover why the ancient seals of the Rakshasas are breaking.

---

## Test 1: The Test of Discipline (The Ayodhya Outskirts)

- **The Mentor/Leader:** Prince Bharata (acting as a temporary guardian of the city gates).
- **The Environment:** A golden courtyard filled with training dummies and lotus ponds.
- **Theme:** Mastery over the self (Basic Mechanics).
- **Leader's Signature Atma:** Ashvamedh (A noble horse Atma of the Prithvi/Earth type).
- **Reward:** The *Maryada Mantra* (Increases the Defense of your Atmas) and the ability to use the Astra: "Shakti-Prahar" outside of battle to break small boulders.

---

## Test 2: The Test of Compassion (The Forest of Tataka)

- **The Mentor/Leader:** Sage Vishwamitra.
- **The Environment:** A dense, dark forest where the trees seem to move.
- **Theme:** Seeing through illusions (Status Effects and Types).
- **The Conflict:** Before fighting the Sage, you must protect a group of peaceful Yakshas from a swarm of corrupted Vrikshas (Tree spirits).
- **Leader's Signature Atma:** Kaushika-Pakshi (A mystical Owl Atma of the Akash/Ether type).
- **Reward:** The *Daya Badge* and the Astra: "Jyoti-Baan" (A light arrow that cures "Blind" status and lights up dark caves).

---

## Test 3: The Test of Strength & Wisdom (The Banks of Sarayu)

- **The Mentor/Leader:** Guha (King of the Nishadas).
- **The Environment:** A riverbank with moving rafts and water-based puzzles.
- **Theme:** Using the environment (Weather and Field effects).
- **The Challenge:** Guha tests if you are worthy of crossing the river. He uses the "Rain" field effect to boost his Atmas.
- **Leader's Signature Atma:** Naga-Raj (A powerful serpent of the Jala/Water type).
- **Reward:** The *Nishada Oar* (Allows you to "Surf" across water bodies) and the Astra: "Varun-Astra" (Powerful water attack).

---

## Key Mechanic: The "Yoga" Evolution

Instead of evolving by level alone, your Atmas evolve through **Sadhana** (Meditation).

**Example:** A small Vanara (Monkey) doesn't just turn into a bigger monkey:
- If you train it with **"Bhakti" (Devotion)**, it becomes a *Vayu-Putra* (Air/Physical specialist).
- If you train it with **"Jnana" (Knowledge)**, it becomes a *Vanar-Vaidya* (Healer/Support specialist).

---

# The Rival: Indrajit (The Shadow Seeker)

Named after Ravana's son (the conqueror of Indra), your rival is a brilliant but arrogant student from a rival academy in the south.

- **Philosophy:** He believes Dharma is a shackle for the weak. To him, Atmas are tools of conquest, and the goal of a Seeker is to attain "Siddhi" (absolute power) at any cost.
- **Aesthetic:** Dark silks, a serpent-themed crown, and a glowing "Maya" gauntlet that allows him to force-evolve Atmas prematurely.
- **The "Starter" Dynamic:** He always chooses the Atma that has a type advantage over yours, but he infuses it with Asuric Energy, making it look slightly more jagged and aggressive.

---

## The "Maya" Evolution (The Dark Mechanic)

While you evolve Atmas through Sadhana (Meditation/Purity), Indrajit uses **Maya** (Illusion/Force).

- **The Cost:** His Atmas have much higher base stats early on but have a chance to "confuse" themselves or disobey orders in long battles because their spirits are unstable.
- **Visual Cue:** When his Atmas use an Astra, the energy is purple/black (Shadow) instead of golden/white (Divine).

---

## Act 2: The Expansion (Kishkindha to Lanka)

### A. The Viman System (Flying/Fast Travel)

Instead of a "Charizard" or "Fly" HM, you unlock the **Pushpaka Vimana** (a flower-decked airship) or summon **Sampati** (the giant vulture) to soar between the mountain peaks of Rishyamukha.

### B. The "Setu" Building Quest

In a massive open-world segment, you must collect specific Prithvi-type Atmas (like the heavy-lifting Vanaras Nala and Nila) to build a bridge across the southern ocean. This acts as a "community quest" where your captured Atmas' stats contribute to the bridge's completion.

---

## Unique Items — The "Amrit" Pouch

Instead of Potions and Revives, you use items based on Ayurvedic herbs:

- **Sanjeevani Herb:** The "Max Revive." Brings a fainted Atma back to full health and clears all debuffs.
- **Soma-Rasa:** Restores Tapas (PP) for using Astras.
- **Tulsi Leaf:** Cures "Curse" and "Poison" status effects.

---

## The "Bhakti" Bond (Friendship Mechanic)

In Pokémon, friendship is a hidden stat. In Aryavarta, it is the **Bhakti Meter**.

**The Ultimate Move:** If your Bhakti is maxed, your Atma can perform a **"Yugal-Astra"** (Dual Strike) with you.

**Example:** If you have a Vayutra (Hanuman-inspired), the screen fades to a cinematic where the player recites a mantra, and the Atma grows to mountain-size for one devastating blow.

---

## Final Act Teaser: The Ten Faces of Ravana

The final "Elite Four" isn't a group of people, but the **Ten Aspects of the Ego**. You must fight through the Golden City of Lanka, facing ten bosses, each representing a sin (Lust, Anger, Greed, etc.), before reaching the final confrontation with the Shadow King himself.

---

# The Three Starters — The Trimurti Choice

At the start of the game, Sage Vashistha offers you one of three elemental companions:

### Vaan-Jyoti (Fire Type)
A small, golden-furred monkey with a tail that glows like a torch.
- **Evolution:** Vaan-Jyoti → Pavak-Kapi (The Burning Scout) → Bajrang-Bali (The Invincible Meteor)
- **Playstyle:** High Speed and Physical Attack.

### Gaja-Pushpa (Earth/Nature Type)
A tiny, moss-covered elephant with flowers blooming from its tusks.
- **Evolution:** Gaja-Pushpa → Airavat-Ansh (The Cloud-Walker) → Dignaga (The Earth-Shaker)
- **Playstyle:** High HP and Defense; a "tank" that heals the team.

### Makar-Shishu (Water Type)
A baby creature with the head of a crocodile and the shimmering tail of a fish.
- **Evolution:** Makar-Shishu → Varun-Vahan (The Tidal Hunter) → Gangeshwar (The River Sovereign)
- **Playstyle:** Balanced stats with high Special Attack (Astras).

---

## The "Wild" Atmas (Common Encounters)

- **Mushika (The Route 1 Rodent):** A nimble, purple-grey mouse that can sense hidden items. (Based on Ganesha's mount).
- **Mayur-Pankh (The Early Bird):** A vibrant blue bird whose feathers can cast minor illusions to lower opponent accuracy. (Based on the Peacock).
- **Sarp-Dhara (The Cave Dweller):** A small snake that hides in the tall grass near Ayodhya. It evolves into a multi-headed Naga if given a "Gem of Patala."

---

## The Legendary "Divyas" (The Box Art Legendaries)

These are the ultra-rare spirits that represent the balance of the universe:

- **Jatayu-Rudra (The Sun-Winged):** A massive, ancient vulture with wings made of solar fire. Encountered on the peak of the Vindhya mountains.
- **Shesh-Ananta (The Time-Keeper):** A celestial serpent that holds the world together. Encountered in the "Ocean of Milk" during the post-game.

---

## Technical Implementation: The "Astra" Skill Tree

Unlike Pokémon, where moves are learned linearly, you use Skill Trees called **Vidyas**:

- **Dhanur-Vidya (Archery):** Focuses on long-range, high-accuracy light attacks.
- **Gada-Vidya (Mace):** Focuses on heavy, shield-breaking physical moves.
- **Maya-Vidya (Illusion):** Focuses on status effects like "Nidra" (Sleep) or "Moha" (Confusion).

---

## The "Panchavati" Safari Zone

Instead of a simple park, this is a **shifting forest**. Depending on the time of day, the forest changes its layout. At night, powerful Rakshasa-type Atmas emerge, and the player must use a **Dharma-Lamp** to stay safe.

---

# Combat UI: "The Mandala Interface"

Instead of a square menu, the battle UI is a **Mandala (Circle)** centered around your character's hand.

- **The Center (Prana):** Shows your current Tapas (Energy) meter.
- **North Quadrant (Astras):** Opens the sub-menu for your offensive moves (e.g., Agneyastra, Vayu-Veg).
- **East Quadrant (Mantras):** Buffs and Debuffs. Using a Mantra doesn't always deal damage but can "seal" an opponent's move.
- **South Quadrant (Atma-Yoga):** The "Switch" button to swap your spirits.
- **West Quadrant (Upaya):** The "Item" bag (using Sanjeevani, Amrit, etc.).

**Visual Flourish:** When you select a powerful move, Sanskrit verses subtly scroll across the screen, and the UI glows golden.

---

# The Final Boss: Ravana, the Master of Ten Egos

The fight with Ravana isn't a standard 1v1. It is a **10-Phase Gauntlet** representing his ten heads. You don't just deplete his HP; you must "Silence" each ego.

### Mechanic: The Shifting Heads

Every 3 turns, Ravana rotates his primary head. Each head changes his Type and Passive Ability:

- **Head of Anger (Fire/Physical):** Massive damage, but loses defense.
- **Head of Pride (Ether/Void):** Rebounds 20% of the damage you deal back to you.
- **Head of Greed (Earth):** Steals your held items or buffs.

**The "Chandrahas" Blade:** Ravana's ultimate move. It ignores all your defense buffs unless you have the "Dharma Shield" active (earned through side-quests in Act 3).

---

# The Post-Game: "The Quest for the Rishi-Vatika"

Once the main story ends, the game transforms into a "Legendary Hunter" style experience:

- **The Seven Sages (Saptarishi):** You can travel to hidden Himalayan shrines to challenge the Seven Sages. Defeating them allows you to "Ascend" your Atmas to their Divya Forms (Mega-Evolutions).
- **The Patala Realm:** A late-game dungeon located in the underworld, filled with high-level Naga and Vasuki-type spirits.

---

## Development Roadmap Summary

| Month | Milestone | Status |
|---|---|---|
| Month 1 | Build the "Battle Engine" (3v3 turn-based logic) + Vyuha Formation system | ✅ **Done** |
| Month 2 | Story Engine (10 chapters), 8 NPC Characters, Karma system, Starter selection | ✅ **Done** |
| Month 3 | Expand Atma-Kosha (+20 more species), overworld movement, wild encounter system | 📋 Next |
| Month 4 | Tapas Charging (slow charge for high-tier Astras), Sadhana/branching evolution | 📋 Planned |
| Month 5 | Crafting system (Rasayana Lab), full Item system (Sanjeevani, Soma-Rasa), Binding mechanic | 📋 Planned |
| Month 6+ | PvP via Node.js + WebSockets, Ashram Defense async system, Vyuha grid 3×3 positioning | 🔜 Backlog |

---

## The "Dharma" Decision — Final Touch

At the end of the game, your Dharma Meter determines your ending:

- **High Dharma:** You become a Raj-Rishi (Sage King) and protect the land.
- **Neutral Dharma:** You continue your journey as a wandering seeker.
- **Low Dharma:** You are tempted by the throne of Lanka, hinting at a "Shadow Mode" for New Game+.

---

# PvP System — Multiplayer

## 1. The "Vyuha" Formation System (Pre-Battle Tactics)

In standard Pokémon, you just send out one monster. In Aryavarta, PvP is 3v3 or 6v6, but **positioning matters**. You must choose a Vyuha (Formation) before the match starts.

| Vyuha (Formation) | Shape | Strategic Bonus | Best Used With |
|---|---|---|---|
| Chakra-Vyuha (The Wheel) | Circular | Increases Defense of the central Atma; attackers take recoil damage | Tanky Atmas like Tamrakant (Kumbhakarna-type) |
| Garuda-Vyuha (The Eagle) | Triangle | Massive Speed boost for the lead Atma; weak against flank attacks | Glass cannons like Vayutra (Hanuman-type) |
| Suchi-Vyuha (The Needle) | Linear | Pierces through enemy defenses (ignores shields); lowers your own Defense | High-attack Atmas to break "Stall" teams |
| Padma-Vyuha (The Lotus) | Flower | Regenerates health for reserve Atmas; weak to Fire (Agni) | Stall/Heal teams |

**Tactical Twist:** You can change formation mid-battle by spending a turn, but it costs significant Tapas (Energy).

---

## 2. "Mantra-Yuddha" (The Pick & Ban Phase)

Instead of just blindly picking a team, ranked matches start with a **"Sankalpa" (Vow) Phase**.

- **The Ban:** Each player banishes one Element (e.g., "I forbid the use of Agni Astras").
- **The Boon:** Each player picks one generic Boon (e.g., "All Prithvi moves have priority").

This forces players to build flexible teams rather than relying on one "Overpowered" strategy.

---

## 3. Combat Modes

### A. The "Dharma-Yuddha" (Ranked/Competitive)

- **Format:** 3v3 Doubles (2 Atmas on field at once).
- **Rule:** "Righteous Conduct." Certain "dirty" moves (like putting 3 opponents to sleep) are forbidden. If you break the rule, your Atma gets the "Adharma" Debuff (Stats lowered by 50%).
- **Victory Condition:** Defeat all opponent Atmas OR convince them to surrender (via a "Persuasion" mechanic unique to Brahmin class players).

### B. The "Maya-Yuddha" (Unranked/Chaos)

- **Format:** 6v6 Singles.
- **Rule:** Anything goes. You can use items, OP Astras, and even "Cheat" mechanics like Indrajit's Illusion (hide your Atma's true HP bar).
- **Victory Condition:** Last one standing.

---

## 4. Asynchronous PvP: "The Ashram Defense"

Real-time multiplayer is hard to code for an indie dev. A great alternative is the **Ashram System**.

- **Build Your Ashram:** You design a small map (your "Gym") with traps, wild Atmas, and puzzles.
- **Upload Your Ghost:** You upload your team's AI behavior (e.g., "Aggressive," "Healer-First").
- **Invade:** Other players try to raid your Ashram to steal "Amrit Nectar" (Ranked Points). If your AI defense wins, you get rewards while offline.

---

## 5. Rewards: "The Karmic Ladder"

Winning doesn't just give XP; it gives **Karma Points**.

- **Sattvic Tier (Top Rank):** Rewards you with "Divine" skins (golden armor for your Atmas).
- **Rajasic Tier (Mid Rank):** Rewards you with rare evolution stones.
- **Tamasic Tier (Low Rank):** Rewards you with "Shadow" items (powerful but risky consumables).

This PvP system reinforces the lore: Are you fighting for Dharma (Honor/Rank) or Maya (Chaos/Loot)?

---

# Expanded PvP Architecture

## 1. The "Sankalpa" Phase (Pre-Battle Mind Games)

Before a single move is made, players enter the Sankalpa (Vow) phase. This mimics the ancient tradition where warriors would set the rules of engagement.

- **Banning Mantras:** Each player can "Silence" one specific element or status effect for the duration of the match (e.g., "No Nidra (Sleep) status allowed").
- **The Boon of the Devas:** Each player selects one "Divine Favor" that applies to their whole team:
  - *Surya's Radiance:* Fire moves deal 10% more damage but accuracy is slightly lowered.
  - *Chandra's Calm:* Status effects on your team wear off 1 turn faster.
  - *Vayu's Swiftness:* Increases the priority of "Switching" Atmas.

---

## 2. Dynamic Vyuha (Formations)

Unlike Pokémon's static positioning, your Atmas occupy a **3x3 Grid**.

- **Front Line:** Takes more damage but deals 1.2x Physical damage.
- **Back Line:** Takes 0.5x Physical damage but can only use "Ranged" or "Astra" attacks.
- **The Commander (Center):** If the Atma in the center of the grid uses a "Roar" or "Inspire" move, the whole team gets a stat boost.

---

## 3. The "Astral Clash" (The Tie-Breaker)

If two Atmas use a "Signature Astra" (like Brahmastra vs Pashupatastra) on the same turn, the game enters an **Astral Clash**.

- **The Mechanic:** A brief, high-intensity mini-game (button mash or rhythm-based) where players must "chant" the mantra perfectly.
- **The Result:** The winner's move executes with double power, and the loser's move is cancelled entirely, leaving them "Stunned."

---

## 4. Competitive Tiers: The "Guna" Ranking

Players don't just have "Points"; they have a **Karmic Profile** based on how they play.

- **Sattva (Purity) Tier:** Players who win using balanced teams and "Honorable" moves (no spamming, no stalling). They unlock Celestial Skins.
- **Rajas (Passion) Tier:** Aggressive players who favor high-damage, risky strategies. They unlock Weapon Glows.
- **Tamas (Ignorance) Tier:** Players who use "Dark" strategies (poison, confusion, and stalling). They unlock Shadow Auras.

---

## 5. The "Sabha" (The Spectator Mode)

PvP isn't just for the two players.

- **The Celestial Audience:** Other players can watch top-tier matches live.
- **Flower Showers:** Spectators can spend small amounts of in-game currency to "Throw Flowers" (minor HP heal) or "Blow Conches" (minor Speed boost) to players they support, though this is disabled in "Hardcore Ranked" mode.

---

# 🎬 Opening Scene Scripts

## Scene 1: The Golden City's Twilight

**Location:** The Great Balcony of the Vashistha Academy, overlooking Ayodhya.  
**Time:** Dusk (The sky is a deep orange, but a strange purple shadow is creeping across the sun).

**\[EXT. BALCONY — CONTINUOUS\]**

> **NARRATOR (V.O.)**  
> *(Voice is deep, ancient, like a Sage)*  
> "Dharma is the thread that holds the three worlds together. But even the strongest thread can be frayed by the winds of Maya..."

*(The camera pans across the Sarayu River. We see white marble palaces and golden domes. Suddenly, the water turns a murky violet. Birds — Garuda-Ansh — fly away in a panicked formation.)*

> **NARRATOR (V.O.)**  
> "In the heart of Ayodhya, a new Seeker awakens. Not to a world of peace, but to a world forgetting its own name."

**\[INT. TRAINING HALL — DAY\]**

*(We see the PLAYER CHARACTER. They are mid-meditation. Opposite them stands SAGE VASHISTHA, his white beard glowing with a faint silver light.)*

> **SAGE VASHISTHA**  
> "Open your eyes, child. The Tapas within you is restless. Can you feel it?"

**\[DIALOGUE CHOICE\]**

1. "I feel a great weight in the air, Master." *(+1 Jnana/Knowledge)*
2. "My Atma is ready for battle!" *(+1 Shakti/Power)*
3. "The river... it looks wrong." *(+1 Dharma/Observation)*

> **SAGE VASHISTHA**  
> *(Nodding gravely)*  
> "The Shadow of the Ten-Headed has touched our sun. The Atmas of the forest are no longer responding to the old songs. They are becoming Asuric — twisted by a power that feeds on ego."

*(Vashistha gestures to a stone pedestal. Three small, glowing orbs appear.)*

> **SAGE VASHISTHA**  
> "You cannot walk the path to the South alone. Choose a companion whose soul resonates with your own. This is your first Sankalpa (Vow)."

### The Starter Selection Interface

The screen transitions to a beautiful, hand-painted Madhubani-style close-up of the three starters.

- **Vaan-Jyoti:** The monkey hops onto a wooden training dummy, its tail igniting into a bright flame. It chortles and beats its chest.
- **Gaja-Pushpa:** The elephant trumpets softly, and a patch of grass and yellow marigolds instantly grows around its feet.
- **Makar-Shishu:** The crocodile-fish hybrid snaps playfully at a floating bubble of water it has summoned between its paws.

**\[AFTER SELECTION\]**

*(The chosen Atma leaps onto the Player's shoulder. Suddenly, an alarm bell rings from the city gates. Dark, shadowy smoke begins to rise from the marketplace.)*

> **SAGE VASHISTHA**  
> "It has begun. The Tataka-Shadows have breached the outskirts. Go! Use your first Astra. Show the city that the light of Dharma has not yet flickered out!"

**\[GAMEPLAY START: First Tutorial Battle vs. Shadow-Mushika (Level 2)\]**

---

## Scene 2: The Breach at the Sarayu Gate

**Location:** The Southern Marketplace of Ayodhya.  
**Condition:** The "Eclipse of Maya" is active. The sky is a bruised purple. Citizens are fleeing as stalls are overturned.

**\[EXT. MARKETPLACE — CONTINUOUS\]**

*(The player arrives at the market. Instead of the usual bustling trade, there is chaos. A group of Mushika (Mouse Atmas) are glowing with a jagged, purple aura. Their eyes are red. They are tearing through bags of grain with unnatural strength.)*

> **CITIZEN**  
> "Help! They've gone mad! My own Mushika won't listen to my commands!"

**\[TUTORIAL OVERLAY: The Corrupted State\]**

> "Atmas under the influence of Maya cannot be captured — they must first be Purified through battle."

**\[BATTLE START: Player & Starter vs. 2x Corrupted Mushika\]**

- **Battle Dialogue (Starter):** Your starter lets out a defiant cry.
- **Action:** You select your first Astra (e.g., Vaan-Jyoti uses *Swarna-Spark*).
- **Visual:** When the move hits, the purple smoke around the Mushika dissipates, replaced by a soft golden glow.

**\[POST-BATTLE\]**

*(The Mushika shrink back to their normal size, looking confused and tired. They bow their heads to the Player and scurry back to their owner.)*

> **CITIZEN**  
> "You... you broke the fever! Thank the Devas. Please, Seeker, take this Sanjeevani Extract. You'll need it for what's coming."

---

## Scene 3: The Shadow on the Bridge

**Location:** The Great Stone Bridge leading out of the city.  
**Atmosphere:** Tense. The wind is picking up, carrying the smell of ozone and burnt incense.

*(As the player nears the bridge, a tall, shadowy figure is leaning against the stone railing. This is INDRAJIT, your Rival. He doesn't look panicked; he looks bored. On his shoulder sits a Shyena (Falcon Atma) that looks far more evolved than your starter.)*

> **INDRAJIT**  
> "So, Vashistha finally sent his 'favorite' out into the mud. Tell me, Seeker — did he tell you that you could save the world with hymns and flowers?"

*(Indrajit stands up. His Falcon Atma screeches, and purple sparks fly from its talons.)*

> **INDRAJIT**  
> "Look at the sky. The old order is fading. Why settle for a 'bond' with an Atma when you can have command? My Maya-Binding makes them stronger than your 'friendship' ever will."

**\[DIALOGUE CHOICE\]**

1. "Strength without Dharma is just a slow suicide, Indrajit." *(+1 Dharma)*
2. "If it's a test of power you want, let's have it." *(+1 Shakti)*
3. "What have you done to that bird? It's suffering." *(+1 Karuna/Compassion)*

> **INDRAJIT**  
> *(Smirking)*  
> "Suffering? It's ascending. But don't worry, I won't crush you yet. I have a date with a certain Sage in the Forest of Tataka. If you survive the woods, maybe I'll show you what real Siddhi looks like."

*(Indrajit leaps onto the back of his Falcon. It grows instantly to a massive size — Maya-Evolution — and blasts away in a gust of dark wind, nearly knocking the player over.)*

---

## Scene 4: The Threshold

**Location:** The Edge of the Forest of Tataka.  
**Visual:** The golden stone of Ayodhya ends abruptly. Ahead lies a wall of gnarled, black-barked trees. The sunlight doesn't seem to penetrate the canopy.

> **NARRATOR (V.O.)**  
> "And so, the gates of home close behind you. Ahead lies the Vanatita — the wild places where the gods and demons still walk the earth."

*(The player takes one last look at the spires of Ayodhya. Their starter Atma nudges their hand, sensing the fear.)*

**\[SYSTEM PROMPT\]**

> You have entered the Tataka Wilds. New Atmas are available in the tall grass. Your journey toward the South has truly begun.

---

## Scene 5: The Hermit and the Hunt

**Location:** Deep within the Forest of Tataka.  
**Atmosphere:** The trees are thick and gnarled, their roots glowing with faint bioluminescence. The air is filled with the chirping of hidden insects and the distant rustle of leaves.

**\[EXT. FOREST CLEARING — NIGHT\]**

*(The player walks into a small clearing. In the center sits an old man, cross-legged on a deer skin mat. This is RISHI AGNI-VESHA, a hermit known for his mastery of fire and formations. He is surrounded by small, floating flames.)*

> **RISHI AGNI-VESHA**  
> *(Without opening his eyes)*  
> "Your footsteps are heavy, young Seeker. You walk like a conqueror, not a guest. The forest does not yield to force; it yields to Rhythm."

*(Suddenly, the bushes rustle violently. A wild Vriksha-Bhoot (Tree Spirit Atma, Grass/Ghost Type) bursts out. It looks aggressive, its wooden limbs thrashing.)*

> **RISHI AGNI-VESHA**  
> "Ah, a restless spirit. Perfect. Show me, child of Ayodhya. Can you calm the storm, or will you just add to the noise?"

**\[TUTORIAL BATTLE START: Player vs. Wild Vriksha-Bhoot\]**

### Phase 1: The Capture Tutorial (The "Mantra" Mechanic)

**\[SYSTEM PROMPT\]**

> Wild Atmas cannot be caught with nets or balls. You must lower their "Tamas" (Aggression) and bind them with a Mantra.

- **Action:** The player attacks to lower the Vriksha-Bhoot's HP (reducing its Tamas).
- **Mechanic:** Once HP is low, the "Catch" command becomes available. Instead of "Throw Ball," it is "Chant Binding Mantra."
- **Visual:** The player's character clasps their hands. Sanskrit letters (Om, Hrim, Klim) float from their lips and encircle the wild Atma.
- **Success:** The Atma glows white, bows, and dissolves into a Spirit Gem that floats into the player's hand.

**\[BATTLE END\]**

*(The Rishi opens his eyes. He smiles faintly.)*

> **RISHI AGNI-VESHA**  
> "Not bad. You have the voice of a Kshatriya (Warrior). But a voice alone cannot win a war. You need a Mind."

### Phase 2: The Vyuha Tutorial (The "Tactics" Mechanic)

*(The Rishi stands up. He waves his hand, and the floating flames arrange themselves into a triangle, then a circle, then a line.)*

> **RISHI AGNI-VESHA**  
> "Ravana's forces do not fight alone. They fight as a Body. If you charge in blindly, you will be crushed. You must learn the Vyuha (The Divine Formation)."

**\[INTERACTIVE GUI: The Vyuha Grid\]**

The screen shows a 3x3 grid. The Rishi places three stones on it.

- **"The Needle (Suchi-Vyuha):"** He places all three stones in a vertical line.
  - *Effect:* "Focuses all power on a single point. Good for breaking shields, but leaves your flanks open."
- **"The Wheel (Chakra-Vyuha):"** He places them in a circle.
  - *Effect:* "Protects the center. Good for defense, but you cannot move quickly."

> **RISHI AGNI-VESHA**  
> "Take this, Seeker. The Scroll of the First Vyuha. Use it wisely. When the Ten-Headed One looks at you, do not let him see a scattered mob. Let him see a Fortress."

**\[ITEM RECEIVED: Scroll of Suchi-Vyuha (Unlocks "Needle Formation" in menu)\]**

**\[EXIT SCENE\]**

*(The Rishi fades away into smoke, leaving only the smell of burnt sandalwood. The path ahead opens up, leading deeper into the woods where the first real dungeon awaits.)*

---

# The First "Test of Dharma" — Detailed Design

## The Puzzle: The Trial of the Flow

Before reaching Prince Bharata, you must navigate a series of **floating river platforms**. You must use your Atma's Weight to tilt the platforms. For example, placing a heavy Gaja-Pushpa (Elephant) on one side raises the other to reach a higher ledge.

## The Boss: Prince Bharata

- **Philosophy:** "Victory is hollow without a steady heart."
- **Vyuha:** He uses the Chakra-Vyuha (Circular Formation), making his lead Atma extremely hard to damage.
- **Signature Atma:** Ashvamedh (Level 12, Earth/Physical). A white stallion with golden armor.
- **The Strategy:** To win, you must use a "Breaking" Astra or switch to a Vyuha that focuses damage on his center-point.
- **The Reward:** The *Dharma-Shakti Seal*. This allows you to command Atmas up to Level 20 and grants you the Astra: "Vajra-Mushti" (Diamond Fist), which can break cracked walls in the overworld.

---

# The Crafting System — The Rasayana Lab

In Aryavarta, you don't just "buy" potions; you brew **Rasayanas** using ingredients found in the wild.

### Gathering

You find items like Tulsi Leaves, Sandalwood Bark, and Ganga Clay in the tall grass or near riverbanks.

### The Mortar & Pestle (Crafting Menu)

- **Sanjeevani Paste:** 3x Tulsi + 1x Sarayu Water → Restores 50% HP.
- **Soma Tonic:** 2x Lotus Nectar → Restores 20 Tapas/Energy.
- **Agni-Kajal:** 1x Charcoal + 1x Firefly Wing → Grants a temporary Fire-type buff for 3 turns.

**Quality Levels:** If you craft during an "Auspicious Hour" (in-game clock mechanic), you might create a "Divine" version of the item with double the potency.

---

# Music & Audio — The Sound of the Gods

The audio uses a **Dynamic Music System** that changes based on your Dharma Meter.

- **Overworld (Ayodhya):** Classical Sitar and Bansuri (flute) with a slow, regal Taal (rhythm). It feels safe and grand.
- **The Forest (Tataka):** Eerie, low-frequency Sarangi (string instrument) and deep Duggi drum beats. The music "whispers" when you are near a hidden Atma.
- **Battle Theme:**
  - *Intro:* A loud blast of a Shanka (Conch shell) to signal the start of the duel.
  - *Core:* Aggressive Tabla rhythms and a fast-paced Veena melody.
  - *The Turnaround:* If your Atma's HP is low but your Bhakti (Friendship) is high, a Vocal Chant (Sanskrit slokas) joins the music, giving you a heroic second wind.

---

# The Overworld Map — The Path of the Exile

The map is designed as a linear journey south, but each region is a "Semi-Open World" hub.

- **Region 1: The Kingdom of Kosala (Ayodhya):** Golden fields, peaceful rivers, and the Royal Academy. This is the tutorial zone.
- **Region 2: The Dandakaranya (The Great Wilderness):** A massive, dense jungle hub. It features verticality with tree-top villages and deep limestone caves. This is where you find most Vanara and Rakshasa Atmas.
- **Region 3: The Kishkindha Mountains:** Snowy peaks and ancient stone fortresses. Home to the Eagle-type and Monkey-King Atmas.
- **Region 4: The Southern Shore:** Tropical beaches and the vast ocean. Here, you must complete the "Setu" (Bridge) questline to unlock the final area.
- **Final Region: The Golden Isle of Lanka:** A high-tech/magical fortress city where the environment is hostile and every encounter is a high-level battle.

---

# The "Legendary" Hunt — Divya-Atma Encounters

In Aryavarta, Legendaries aren't just in caves; they are part of the world's history. You don't just find them — you must **earn their respect**.

### The Jatayu Event (The Sky Sovereign)

- **Where:** The Peak of Janasthana.
- **How:** You don't fight him initially. You must protect his "Sun-Egg" from a wave of 100 Shadow-Rakshasas. If you succeed, he offers his spirit as a Vahan (Mount) and a battle partner.

### The Hanuman Manifestation

- **Where:** The hidden cave of Rishyamukha.
- **How:** This is a Riddle Battle. Hanuman tests your Bhakti (Devotion). You must survive 10 turns without attacking him, using only defensive Vyuha and healing Mantras to prove you aren't seeking power for selfish reasons.

### The Naga-King Vasuki

- **Where:** The Churning Depths of the Southern Ocean.
- **How:** A massive "Raid Boss" style encounter where you must use three Atmas simultaneously to pull him from the depths before you can attempt to Bind him.

---

# The Karma System — The Deeds of the Seeker

Side quests in Aryavarta aren't just for gold; they define your **Karmic Alignment** (Sattva, Rajas, Tamas).

### Example Quest: The Hungry Hermit

An old man asks for your only Sanjeevani herb.

- **Choice A (Sattva):** Give it to him. *Reward:* High Dharma points and a "Blessing" that increases your Atma's crit rate for 24 hours.
- **Choice B (Rajas):** Offer to fight a nearby monster to find more herbs for him. *Reward:* High XP and a new weapon for your character.
- **Choice C (Tamas):** Ignore him or trick him with a fake herb. *Reward:* You keep your item and gain "Shadow Currency" used to buy illegal dark-Astras in Lanka.

### The World Reaction

- If your Dharma is **High**, townspeople lower their prices and legendary birds might follow you in the overworld.
- If your Dharma is **Low**, the guards of Ayodhya will challenge you on sight, and you unlock "Dark Evolutions" for your Atmas that are physically stronger but harder to control.

---

# Character Customization — The Vastra & Alankar System

In Aryavarta, your outfit isn't just cosmetic; it reflects your Varna (Class) and your Sadhana (Progress). You can visit "Weavers" in cities to change your look.

### 1. The Base Attire (Vastra)

- **The Dhoti/Veshti:** The traditional wrap. You can choose different drape styles (e.g., Kachcha style for high-mobility Kshatriyas).
- **The Angavastram (Stole):** A shoulder cloth that glows when your Tapas (Energy) is full.

### 2. Ornaments (Alankar)

- **Kundala (Earrings):** Grant passive resistance to status effects (e.g., Copper earrings resist Poison).
- **Keyura (Armlets):** Increase the strength of physical Astras.
- **Tilak (Forehead Mark):** This is your "Badge of Honor." Different Tilak designs represent the gods you have pleased (e.g., a "U" shape for Vishnu-type Atma boosts).

### 3. Hair & Grooming

Styles range from the Shikha (traditional tuft) to elaborate royal buns adorned with lotus flowers.

### 4. Material Tiers

- **Cotton (Kapas):** Standard durability.
- **Silk (Resham):** High magic (Astra) resistance.
- **Divine Thread:** Woven from the feathers of a Garuda; grants a boost to flight-based moves.

---

# 🎬 Promotional Trailer Script — The World Reveal

*90-second "Announce Trailer"*

- **0:00–0:10:** Black screen. The sound of a Shanka (Conch) blowing, deep and resonant. A faint Sanskrit chant begins.
- **0:10–0:25:** Visuals of Ayodhya at sunrise. The gold of the domes glints in the water. We see the Player Character releasing their starter, Vaan-Jyoti, who does a playful backflip.
- **0:25–0:40:** The music speeds up. Tabla drums kick in. Sudden cut to a Shadow-Rakshasa roaring in the dark forest.
- **0:40–1:00:** Action Montage:
  - The Player shouts: *"Indra-Gopal, use Vajra-Mushti!"*
  - The 3x3 Vyuha Grid flashes on screen as Atmas shift positions.
  - A massive Naga rises from the sea, and we see three players in Co-op chanting a binding mantra together.
- **1:00–1:15:** The "Rival" Indrajit appears on a cliffside. He snaps his fingers, and his Atma undergoes Maya-Evolution, growing wings of dark fire. He looks down and sneers: *"Dharma is a myth. Power is the only truth."*
- **1:15–1:25:** The music reaches a crescendo. We see a split-second shot of Hanuman growing to the size of a mountain.
- **1:25–1:30:** The screen fades to a parchment-style logo:

> **ARYAVARTA: LEGEND OF THE DHARMA-VAAN**  
> *"Forge Your Vow. Restore the Light."*

- **1:30:** A final stinger. A small, cute Mushika (Mouse) sneezes a tiny spark of fire and looks confused.

---

# Technical FAQ

## 1. Which Game Engine should I use?

- **Unity (C#):** Best for 2D or 3D cross-platform (Mobile/PC). It has a massive library of plugins for turn-based combat and grid systems.
- **Godot (GDScript):** Excellent for 2D. It's lightweight and handles "Node-based" UI (like our Mandala Menu) very intuitively.
- **RPG Maker XP + Pokémon Essentials:** The fastest way to build a prototype. However, customizing the 3x3 Vyuha system and Karma mechanics will require heavy "Ruby" scripting.

## 2. How do I program the "Vyuha" (3x3 Grid) system?

You should treat the battlefield as an Array or Matrix `[3][3]`. Each Atma has a `grid_position` property. **Buff Logic:** When a move is executed, the game checks neighboring cells. If `Atma[1,1]` is in a Chakra-Vyuha, apply a `defense_multiplier` to all adjacent cells.

## 3. How do I handle the "Karma" and "Dharma" meters?

Use a Global Variable or a Singleton script. Every dialogue choice or battle action (like "Mercy") adds or subtracts from a `player_karma` float value. Store this in a Save File using JSON or XML so the world state remembers your alignment when you reload.

## 4. What about the "Astra" visual effects?

Since Astras are divine, use Particle Systems and Shader Graphs. Instead of animating every attack by hand, create "Elemental Shaders" (Gold for Dharma, Purple for Maya) that can be applied to any basic projectile to change its "alignment" look.

---

# Complete Atma-Kosha — Full Bestiary (20 Common Atmas)

| Tribe | Atma Name | Type | Inspiration & Role |
|---|---|---|---|
| Birds | Mayur-Pankh | Akash | Peacock-inspired; uses illusions to lower accuracy |
| Birds | Uluka-Vith | Vayu | Owl spirit that preys on lone forest travelers |
| Birds | Baka-Nadi | Jala | Crane-headed spirit favored by river deities |
| Birds | Shyena-Veg | Vayu | High-speed falcon scouts used for aerial recon |
| Beasts | Mushika-Ratna | Prithvi | Nimble mouse that finds hidden items |
| Beasts | Hari-Vana | Prithvi | Deer spirit that embodies grace and speed |
| Beasts | Mahi-Vrish | Prithvi | Bull spirit representing strength and labor |
| Beasts | Varaha-Krodh | Prithvi | Boar spirit with high physical momentum |
| Beasts | Sarp-Dhara | Jala/Naga | Small water serpent found in river tall grass |
| Beasts | Bhallu-Mukh | Prithvi | Heavy-hitting bear spirit found in dark caves |
| Vanaras | Kapi-Shaka | Vayu | Basic monkey warrior with high climbing mobility |
| Vanaras | Vanar-Vaidya | Jala | Healer-class monkey that uses herbal knowledge |
| Mythic | Yaksha-Gupta | Akash | Nature spirit that guards hidden forest treasures |
| Mythic | Gana-Rudra | Prithvi | Mischievous guardian spirit with defensive buffs |
| Mythic | Kinnara-Gayak | Akash | Musical half-bird/half-human; uses sound attacks |
| Mythic | Makara-Dal | Jala | Croc-hybrid sea creature; guardian of thresholds |
| Mythic | Bhuta-Daan | Ghost | Ethereal spirit found near ancient temple ruins |
| Mythic | Naga-Kanya | Jala | Serpent-woman focusing on poison and binding |
| Mythic | Yali-Kanth | Prithvi | Part-lion, part-elephant; high ferocity and speed |
| Mythic | Vriksha-Ansh | Grass | Tree spirit that anchors enemy grid positions |

---

# The 8 Tests of Dharma — Mid-Game Progression

| Order | Rishi (Sage) | Virtue (The Test) | Tactical Focus | Reward (Divine Seal) |
|---|---|---|---|---|
| 1 | Vashistha | Discipline | Basics & Turn Priority | Seal of the Sun (Strength) |
| 2 | Vishwamitra | Willpower | Breaking Illusions (Maya) | Seal of the Bow (Focus) |
| 3 | Agastya | Humility | Managing Tapas (Energy) | Seal of the Mountain (Bulk) |
| 4 | Atri | Compassion | Status Effects & Healing | Seal of the Moon (Grace) |
| 5 | Bharadwaja | Knowledge | Element Weaknesses | Seal of the Script (Wisdom) |
| 6 | Gautama | Patience | Counter-attacks & Waiting | Seal of the River (Flow) |
| 7 | Jamadagni | Justice | High-Risk/High-Reward | Seal of the Axe (Precision) |
| 8 | Valmiki | Truth | The Final Vyuha Mastery | Seal of the Poet (Legend) |

### The Final Test: Valmiki

Unlike the others, Rishi Valmiki doesn't fight you with raw power. He challenges you in the Forest of Hermitages.

- **The Trial:** You must fight a "Shadow Mirror" of your own team.
- **The Lesson:** You can only win by predicting your own habits. If you favor aggressive Rajasic moves, the Shadow will counter you. You must prove you have achieved Samatva (Equanimity).
- **The Reward:** Upon victory, Valmiki grants you the ability to use the **"Brahmastra"** move, the ultimate attack that can break the final shield of Lanka.

---

# How to Pitch Your Game

## 1. The Essential Pitch Deck (30 Slides Max)

Your deck should cover these core elements:

- **Logline:** A one-sentence "Elevator Pitch" (e.g., "Pokémon meets ancient Indian mythology in a tactical grid-based RPG").
- **Unique Selling Points (USPs):** Highlight the Vyuha Grid System and the Dharma Alignment as things players can't get elsewhere.
- **The Team:** Demonstrate your professional pedigree or previous shipped titles.
- **The Market:** Identify your target audience and list "Comparable Titles" (e.g., Temtem, Cassette Beasts) and their success data.
- **The Budget & Timeline:** Be precise about how much money you need and how you will use it (e.g., "10 people for 30 months = $3M").

## 2. Deliverables: The "Vertical Slice"

A pitch deck alone is rarely enough. You need:

- **A Playable Demo:** A 10–15 minute "Vertical Slice" that showcases polished core mechanics, art style, and music.
- **A Sizzle Trailer:** A high-intensity video (2–5 minutes) showing the best parts of the gameplay.
- **Social Proof:** Mention any wishlists (on Steam), social media buzz, or community engagement you've already built.

## 3. The Pitching Strategy

- **Research Your Publisher:** Do not send a generic deck. Tailor it to their portfolio (e.g., don't pitch a family-friendly creature-collector to a publisher known for edgy horror).
- **Short & Punchy Emails:** Use under-2MB GIFs in the email body to catch their eye immediately.
- **Networking:** Use industry events like GDC or DICE for face-to-face meetings.

---

# 📜 Master Design Bible Summary

**Title:** Aryavarta: Legend of the Dharma-Vaan  
**Genre:** Creature-Collector / Turn-Based RPG  
**Platform:** PC / Mobile / Console  
**Core Loop:** Explore → Bind Atmas → Master Astras → Restore Dharma

### I. World & Lore
- **Setting:** A mythical Bharatvarsha during the "Eclipse of Maya."
- **Conflict:** The Shadow of the Ten-Headed (Ravana) is corrupting the world's spirits.
- **The Protagonist:** A Seeker who must pass the 8 Tests of the Rishis to reach Lanka.

### II. Combat Mechanics
- **System:** 3v3 Grid-Based "Vyuha" Combat.
- **Resource:** Tapas (Spiritual Heat) used to manifest Astras (Divine Weapons).
- **Evolution:** Sadhana (Meditation) leads to branching evolution paths based on your playstyle (Devotion vs. Knowledge).

### III. The Atma-Kosha (Starters)
- **Vaan-Jyoti (Fire):** Fast Physical attacker.
- **Gaja-Pushpa (Earth):** Defensive Tank/Healer.
- **Makar-Shishu (Water):** Special Astra attacker.

### IV. Multiplayer (PvP)
- **Ranked:** The "Dharma-Yuddha" with Ban/Pick phases for elements.
- **Custom:** "Maya-Yuddha" with no rules and illusion-based tactics.
- **Social:** Ashram Building — design your own "Gym" for others to challenge.
- **Karmic Ladder:** Rewards players based on their playstyle (Sattvic, Rajasic, Tamasic).

### V. Sound & Art
- **Art:** Cell-shaded Madhubani and Pattachitra styles.
- **Music:** Dynamic Sitar/Tabla fusion that intensifies during "Astral Clashes."

### VI. Opening Script Summary
The game opens with the "Eclipse of Maya" corrupting Ayodhya. The player chooses a starter from Sage Vashistha, defeats corrupted Mushikas in the market, and has a first confrontation with the rival, Indrajit, at the Sarayu Bridge.

### VII. Development Roadmap
- **Phase 1 ✅:** Battle Engine & Vyuha Formation system — *complete, playable in-browser.*
- **Phase 2 ✅:** Story Engine (10 chapters), 8 NPCs, Karma axes, Starter selection — *complete, playable in-browser.*
- **Phase 3 📋:** Expand Atma-Kosha (+20 more species), overworld movement, wild encounter system.
- **Phase 4 📋:** Sadhana/branching evolution, Rasayana Lab crafting, full item system.
- **Phase 5 🔜:** PvP (Node.js + WebSockets), Ashram Defense, 3×3 grid positioning.

---

# ✅ Implementation Log — What Has Been Built

> This section documents the actual code written so far (v0.1 prototype).
> Run with: `cd aryavarta && npx serve . --listen 3000`

---

## Tech Stack (Implemented)

| Layer | Technology |
|---|---|
| Game Logic | Vanilla JavaScript — ES Modules (no framework, no bundler) |
| Rendering | DOM + CSS (battle.css — full custom UI) |
| Dev Server | `npx serve` — zero-install local HTTP server |
| Future Engine | Unity 6 LTS (C#) — per toolchain research |
| Future Backend | Node.js + Socket.io + PostgreSQL (PvP / Ashrams) |

---

## Project File Structure

```
aryavarta/
├── index.html                  ← Three-screen entry point (Intro · Story · Battle)
├── package.json                ← npm scripts: dev / start (npx serve)
├── styles/
│   └── battle.css              ← Complete UI stylesheet (Mandala, story panels, team rows)
└── src/
    ├── main.js                 ← Master game controller — wires Story + Battle screens
    ├── data/
    │   ├── types.js            ← Type chart: 5 elements + effectiveness matrix
    │   ├── astras.js           ← Astra (move) database: 13 moves + 4 status effects
    │   ├── atmas.js            ← Atma species database: 9 species (3 starters + 6 wild)
    │   ├── characters.js       ← NPC database: 8 named characters
    │   └── story.js            ← Master story script: 10 chapters, ~80 beats
    └── engine/
        ├── Atma.js             ← Live Atma instance (stats, HP, Tapas, status, Bhakti)
        ├── VyuhaGrid.js        ← Formation system: 4 Vyuhas with combat modifiers
        ├── BattleEngine.js     ← Core turn engine (resolve, damage formula, AI, events)
        └── StoryEngine.js      ← Chapter/beat walker with Karma tracking
```

---

## Data Layer

### Type System (`types.js`)
Five elemental types with a full asymmetric effectiveness chart:

| Type | Strong Against | Weak Against |
|---|---|---|
| Agni (Fire) | Prithvi, Vayu | Jala |
| Prithvi (Earth) | Vayu | Agni, Jala |
| Vayu (Air) | Jala | Prithvi, Agni |
| Jala (Water) | Agni, Prithvi | Vayu |
| Akash (Ether) | — (neutral, 1× all) | — |

Each type has a hex colour constant (`TYPE_COLORS`) used throughout the UI to colour-code Atma slots, Astra buttons, and active-combatant panels.

---

### Astra Database (`astras.js`) — 13 Moves Implemented

| Astra | Type | Category | Power | Tapas Cost | Special Effect |
|---|---|---|---|---|---|
| Prahar (Strike) | Prithvi | Physical | 40 | 0 | Free fallback move |
| Swarna-Spark | Agni | Special | 45 | 10 | — |
| Agneyastra | Agni | Special | 80 | 30 | 20% chance Agnidah (Burn) |
| Jala-Dhara | Jala | Special | 45 | 10 | — |
| Varunastra | Jala | Special | 85 | 30 | — |
| Vayu-Veg | Vayu | Physical | 50 | 10 | Priority +1 (always strikes first) |
| Vajra-Mushti | Vayu | Physical | 80 | 25 | — |
| Shila-Paat | Prithvi | Physical | 55 | 12 | — |
| Maya-Jaal | Akash | Status | — | 15 | 100% Moha (Confusion) |
| Nidra-Mantra | Akash | Status | — | 18 | 75% Nidra (Sleep) |
| Naga-Pasha | Jala | Status | — | 15 | 100% Visha (Poison) |
| Sanjeevani-Mantra | Prithvi | Status | — | 20 | Heals 50% of max HP |
| Brahmastra | Akash | Special | 140 | 60 | **Once per battle only** |

**Status Effects implemented:**
- `Nidra` (Sleep): skips turns; 33%/turn chance to wake, forced wake after 3 turns
- `Moha` (Confusion): 33% chance to hurt self for 6% max HP per turn
- `Visha` (Poison): 8% max HP chip damage at end of each turn
- `Agnidah` (Burn): 8% max HP chip damage + 50% penalty to physical attack

---

### Atma Species Database (`atmas.js`) — 9 Species

**The Three Starters (Trimurti Choice):**

| Species | Type | Glyph | Inspiration | Role |
|---|---|---|---|---|
| Vaan-Jyoti | Agni (Fire) | 🐒 | Hanuman-line | High Speed & Physical Attack |
| Gaja-Pushpa | Prithvi (Earth) | 🐘 | Airavata-line | Defensive Tank / Healer |
| Makar-Shishu | Jala (Water) | 🐊 | River-line | Special Astra attacker |

**Six Common Wild Atmas:**

| Species | Type | Glyph | Inspiration | Notable Astra |
|---|---|---|---|---|
| Mushika-Ratna | Prithvi | 🐀 | Ganesha's mount | Shila-Paat |
| Mayur-Pankh | Akash | 🦚 | Peacock illusionist | Maya-Jaal |
| Shyena-Veg | Vayu | 🦅 | Falcon scout | Vayu-Veg (priority) |
| Sarp-Dhara | Jala | 🐍 | Water serpent | Naga-Pasha (Poison) |
| Vriksha-Ansh | Prithvi | 🌳 | Tree spirit | Nidra-Mantra (Sleep) |
| Kapi-Shaka | Vayu | 🙊 | Vanara warrior | Vajra-Mushti |

**Boss-only species (registered at runtime in `main.js`):**
- `ASHVAMEDH_BOSS` — Prince Bharata's earth-crystal war-horse (Level 12)
- `KAUSHIKA_BOSS` — Sage Vishwamitra's ether-owl (Level 16, carries Brahmastra)

Stats scale linearly with level using the formula:
```js
hp  = floor(base.hp  + (base.hp  * level / 40) + level + 8)
stat = floor(base.stat + (base.stat * level / 50) + level)
```

---

## Engine Layer

### `Atma.js` — The Live Instance
Each battle Atma instance tracks:
- `hp` / `maxHp` — current & maximum HP
- `tapas` (0–100) — starts at 40, regenerates 12/turn
- `status` — `null | Nidra | Moha | Visha | Agnidah`
- `statusTurns` — turn counter for Sleep wake-up logic
- `bhakti` (0–100) — Friendship meter (tracked, Yugal-Astra unlock pending)
- `usedBrahmastra` — once-per-battle flag
- `canAfford(astra)` — checks Tapas + once-per-battle gate

---

### `VyuhaGrid.js` — The Four Formations

| Vyuha | Shape | defMult | atkMult | speedMult | Special |
|---|---|---|---|---|---|
| Chakra (Wheel) | Circular | ×1.30 | ×0.95 | ×1.00 | Attackers take 12% recoil |
| Garuda (Eagle) | Triangle | ×0.85 | ×1.00 | ×1.40 | — |
| Suchi (Needle) | Linear | ×0.80 | ×1.25 | ×1.00 | — |
| Padma (Lotus) | Flower | ×1.10 | ×0.95 | ×0.95 | Reserve Atmas regen 6% HP/turn |

- Default formation: **Garuda**
- Changing formation mid-battle costs **20 Tapas** and uses the player's turn

---

### `BattleEngine.js` — The Core Turn Engine

**Architecture:** Event-emitter pattern. Every state change fires a typed event to the UI.

**Turn resolution order:**
1. Switches always go first (priority 10)
2. Astras with `priority: 1` (`Vayu-Veg`) go before normal Astras
3. Tie-broken by Atma speed × Vyuha speed multiplier

**Damage formula (adapted from the GF formula):**
```
base   = ((2×level / 5 + 2) × power × (atk / def)) / 50 + 2
damage = base × typeEffectiveness × random(0.85–1.0) × burnPenalty × vyuhaMods
```

**Events emitted:** `log` · `damage` · `heal` · `tapas` · `status` · `switch` · `faint` · `effectivenessMsg` · `battleEnd`

**End-of-turn flow:**
1. Tapas regeneration (+12) for both sides
2. Padma-Vyuha reserve regen (6% HP to benched Atmas)
3. Poison/Burn chip damage (8% max HP)
4. Auto-switch if active Atma fainted — picks next living reserve

**Enemy AI:** Scores every affordable Astra by `power × typeEffective + priority×20`. Picks highest. 10% random chance to switch if reserves available.

---

### `StoryEngine.js` — The Narrative Walker

Walks `STORY_CHAPTERS` beat-by-beat. Supported beat types:

| Beat Type | Behaviour |
|---|---|
| `title` | Chapter title card with location & time |
| `narration` | Multi-paragraph atmospheric text |
| `dialogue` | Named speaker + lines (enriched with character data) |
| `choice` | Branching prompt — applies karma delta, resumes on pick |
| `tutorial` | Game mechanic overlay panel |
| `starterSelection` | Triggers the Trimurti starter-pick UI |
| `battle` | Hands control to BattleEngine; story resumes after resolution |
| `item` | "Item received" card added to Amrit Pouch |
| `seal` | "Dharma Seal earned" card + adds chip to seals sidebar |
| `continue` | Story-ending beat with "Begin Again" button |

**Karma tracking** — four axes accumulate from choice beats:
- `dharma` — observation, honour, restraint
- `shakti` — courage, direct action
- `jnana` — knowledge, perception
- `karuna` — compassion, empathy

---

## Story Content — 10 Chapters Implemented

| Chapter | Title | Key Event |
|---|---|---|
| I | Awakening | Training hall opening; Eclipse of Maya revealed; Vashistha intro |
| II | The Trimurti Choice | Starter selection from Pedestal of First Bonds |
| III | The Breach at the Sarayu Gate | First battle: 2× Corrupted Mushika-Ratna (Lv 3); Sanjeevani Extract received |
| IV | The Shadow on the Bridge | First Indrajit encounter; Maya-Binding revealed; rival departs south |
| V | The Threshold | Entering the Tataka Wilds; wild encounter tutorial |
| VI | The Hermit and the Hunt | Rishi Agni-Vesha; Binding Mantra tutorial (Vriksha-Bhoot capture); Vyuha tutorial |
| VII | Whispers in the Deep | Yaksha Vanarasi at the Crossroads; Ravana Sutra lore reveal |
| VIII | The Test of Discipline | **Boss 1:** Prince Bharata + Ashvamedh (Chakra-Vyuha, Lv 12); Dharma-Shakti Seal earned |
| IX | The Forest of Illusions | Panchavati Mayur-Pankh gauntlet; Vishwamitra intro; Yaksha protection battle |
| X | The Test of Compassion | **Boss 2:** Vishwamitra + Kaushika-Pakshi (Lv 16, Brahmastra); Daya Badge earned; cliffhanger to Kishkindha |

---

## Named Characters Implemented (`characters.js`)

| ID | Name | Title | Alignment | Role |
|---|---|---|---|---|
| `vashistha` | Sage Vashistha | Royal Preceptor of Ayodhya | Sattva | Mentor; story catalyst |
| `indrajit` | Indrajit | The Shadow Seeker | Tamas | Rival; Maya-Binding antagonist |
| `bharata` | Prince Bharata | Guardian of the Golden Gate | Sattva | Boss 1 (Test of Discipline) |
| `agniVesha` | Rishi Agni-Vesha | Hermit of the Burning Grid | Rajas | Forest mentor; Vyuha teacher |
| `vishwamitra` | Sage Vishwamitra | Witness of Willpower | Sattva | Boss 2 (Test of Compassion) |
| `yakshaGuide` | Vanarasi | Yaksha of the Tataka Crossroads | Neutral | Lore-giving nature spirit |
| `citizen` | Merchant Dhanpal | Citizen of Ayodhya | Neutral | Tutorial NPC (marketplace breach) |
| `agastya` | Sage Agastya | He Who Swallowed the Ocean | Sattva | Future boss (Test of Humility) teaser |

---

## UI / Frontend (`index.html` + `main.js`)

### Three Screens
1. **`#screen-intro`** — Title screen with opening narration; "Begin Your Journey →" entry point
2. **`#screen-story`** — Story screen with 10 named panels (title, narration, dialogue, choice, tutorial, item, seal, battle-announce, ending, starter-selection), live karma HUD in topbar, seals sidebar
3. **`#screen-battle`** — Battle screen with Mandala Interface

### The Mandala Interface (Battle Screen)
The battle UI (`#screen-battle`) is structured as:
- **Field area:** Enemy combatant panel + enemy team row + player team row + player combatant panel
  - Each active combatant shows glyph, name, type badge, level, HP bar (colour-coded: green→orange→red), Tapas bar, current Vyuha name, status text
  - Team row slots show HP/Tapas mini-bars and faint state
- **Battle Chronicle log:** Auto-scrolling event feed
- **Mandala Panel** — three tabs:
  - 🔥 **Astras tab:** Astra buttons with type colour dot, power, Tapas cost, once-per-battle badge, category
  - 🔄 **Switch tab:** Reserve Atma buttons (rebuilds after each switch)
  - ⚔ **Vyuha tab:** All 4 formation buttons with active highlight (costs 20⚡)
- **Result bar:** Victory/defeat text + "Return to Story →" or "Play Again →" buttons

### Story Panels
| Panel ID | Beat Type | Content |
|---|---|---|
| `#panel-title` | `title` | Chapter heading, subheading, location, time |
| `#panel-narration` | `narration` | Multi-paragraph scroll area |
| `#panel-dialogue` | `dialogue` | Speaker glyph + name (colour-coded per character) + dialogue lines |
| `#panel-choice` | `choice` | Prompt text + choice buttons with karma axis label/colour |
| `#panel-tutorial` | `tutorial` | Icon + heading + bullet-list |
| `#panel-item` | `item` | Item glyph + name + description + "Added to Amrit Pouch" badge |
| `#panel-seal` | `seal` | Seal glyph ring + name + description + "Dharma Seal Earned" badge |
| `#panel-battle-announce` | `battle` | Battle intro text + "Enter Battle →" button |
| `#panel-ending` | `continue` | Closing text + "Begin Again →" |
| `#panel-starter-story` | `starterSelection` | Three starter cards with base stats and colour-coded "Choose" button |

---

*This blueprint is a living document — design above, implementation below.*  
*Forge Your Vow. Restore the Light.* 🏹
