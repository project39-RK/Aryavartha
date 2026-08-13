// ===================================================================
// Aryavarta — Main Game Controller (Story + Battle)
// Routes between the Story Screen and the Battle Screen.
// Wires StoryEngine events to DOM panels, and BattleEngine to the
// Mandala UI.
// ===================================================================

import { Atma } from "./engine/Atma.js";
import { BattleEngine } from "./engine/BattleEngine.js";
import { StoryEngine } from "./engine/StoryEngine.js";
import { OverworldEngine } from "./engine/OverworldEngine.js";
import { EncounterEngine } from "./engine/EncounterEngine.js";
import { PlayerState, ITEMS, CRAFT_RECIPES } from "./engine/PlayerState.js";
import { ATMA_SPECIES, STARTER_IDS, WILD_IDS } from "./data/atmas.js";
import { ASTRAS, getAstra } from "./data/astras.js";
import { TYPE_COLORS } from "./data/types.js";
import { VYUHAS, vyuhaList } from "./engine/VyuhaGrid.js";
import { MAPS } from "./data/maps.js";
import { CHARACTERS } from "./data/characters.js";

// ─── DOM helpers ─────────────────────────────────────────────────────

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);
const show = (el) => { if (typeof el === "string") el = $(el); el && (el.style.display = ""); };
const hide = (el) => { if (typeof el === "string") el = $(el); el && (el.style.display = "none"); };

// ─── Screen management ───────────────────────────────────────────────

function showScreen(id) {
  $$(".screen").forEach((s) => hide(s));
  show($(`#${id}`));
}

// ─── Global state ────────────────────────────────────────────────────

let story = null;
let battle = null;
let overworld = null;
let encounter = null;          // active EncounterEngine instance
let playerStarterId = null;
let battleOverFlag = false;
let inStoryMode = true;        // false = free-battle mode (play again)
let isWildBattle = false;      // true when battle was triggered by overworld encounter
let currentWildEncounter = null;  // { wildAtma, speciesId, level, zoneId }
let currentBattleSpec = null;  // the story beat that launched current battle
let playerProgressLevel = 5;   // increases as story progresses
let _owNpcDialogue = null;     // active NPC dialogue state { lines, index }

// Boss Atma inline species registry — injected when story battles start
const INLINE_SPECIES = {
  ASHVAMEDH_BOSS: {
    id: "ASHVAMEDH_BOSS", name: "Ashvamedh", glyph: "🐎", type: "Prithvi",
    inspiration: "Prince Bharata's earth-crystal war-horse. The Test of Discipline.",
    base: { hp: 90, atk: 55, def: 70, spAtk: 40, spDef: 65, speed: 45 },
    astras: ["prahar", "shilaPaat", "vajraMushti", "sanjeevani"],
  },
  KAUSHIKA_BOSS: {
    id: "KAUSHIKA_BOSS", name: "Kaushika-Pakshi", glyph: "🦉", type: "Akash",
    inspiration: "Sage Vishwamitra's ancient ether-owl. The Test of Compassion.",
    base: { hp: 100, atk: 50, def: 55, spAtk: 80, spDef: 70, speed: 60 },
    astras: ["mayaJaal", "nidraMantra", "prahar", "brahmastra"],
  },
};

// ─── Boot ─────────────────────────────────────────────────────────────

window.addEventListener("DOMContentLoaded", () => {
  showScreen("screen-intro");
  setupTabButtons();
  setupBtnReturnStory();
  setupPlayAgainBtn();
});

// ─── Title screen → Story ─────────────────────────────────────────────

$$("#btn-start").forEach((btn) =>
  btn.addEventListener("click", () => startStoryMode())
);

function startStoryMode() {
  inStoryMode = true;
  playerStarterId = null;
  playerProgressLevel = 3;

  story = new StoryEngine({ onEvent: handleStoryEvent });
  showScreen("screen-story");
  story.start();
}

// ─── Story event handler ──────────────────────────────────────────────

function handleStoryEvent(evt) {
  switch (evt.type) {
    case "beat":         renderBeat(evt.beat); break;
    case "starterSelect": openStoryStarterSelection(); break;
    case "battle":       prepareBattle(evt.battleSpec); break;
    case "karmaUpdate":  updateKarmaDisplay(evt.karma, evt.choice); break;
    case "chapterEnd":   /* handled silently — next beat auto-fires */ break;
    case "storyEnd":     /* story engine itself emits the ending beat */ break;
  }
}

// ─── Beat Renderer ────────────────────────────────────────────────────

function hideAllPanels() {
  $$(".story-panel").forEach((p) => hide(p));
  hide("#btn-continue");
}

function renderBeat(beat) {
  hideAllPanels();

  // Update topbar
  updateTopbar(beat);

  switch (beat.type) {
    case "title":          renderTitle(beat); break;
    case "narration":      renderNarration(beat); break;
    case "dialogue":       renderDialogue(beat); break;
    case "choice":         renderChoice(beat); break;
    case "tutorial":       renderTutorial(beat); break;
    case "item":           renderItem(beat); break;
    case "seal":           renderSeal(beat); break;
    case "starterSelection": openStoryStarterSelection(); break;
    case "continue":       renderEnding(beat); break;
  }
}

// ─── Top bar update ───────────────────────────────────────────────────

function updateTopbar(beat) {
  if (!story) return;
  const ch = story._currentChapter();
  if (ch) {
    const chNum = story.chapterIndex + 1;
    const romanNums = ["I","II","III","IV","V","VI","VII","VIII","IX","X"];
    $("#story-chapter-label").textContent = `Chapter ${romanNums[story.chapterIndex] || chNum}`;
    $("#story-location").textContent = ch.location || "";
    $("#story-time").textContent = ch.timeOfDay || "";
    // Apply bg class
    const stage = $("#story-stage");
    stage.className = "story-stage " + (ch.bg || "");
  }
}

// ─── Panel A — Title ──────────────────────────────────────────────────

function renderTitle(beat) {
  $("#title-heading").textContent = beat.heading || "";
  $("#title-sub").textContent = beat.subheading || "";
  $("#title-location").textContent = beat.location || "";
  $("#title-time").textContent = beat.time || "";
  show("#panel-title");
  show("#btn-continue");
}

// ─── Panel B — Narration ──────────────────────────────────────────────

function renderNarration(beat) {
  const container = $("#narration-text");
  container.innerHTML = "";
  (beat.lines || []).forEach((line) => {
    const p = document.createElement("p");
    p.textContent = line;
    container.appendChild(p);
  });
  show("#panel-narration");
  show("#btn-continue");
}

// ─── Panel C — Dialogue ──────────────────────────────────────────────

function renderDialogue(beat) {
  const speaker = beat.speaker;
  if (speaker) {
    $("#dlg-glyph").textContent = speaker.glyph || "💬";
    $("#dlg-glyph").style.borderColor = speaker.color || "var(--border-gld)";
    $("#dlg-glyph").style.boxShadow = `0 0 16px ${speaker.color || "#c8973a"}44`;
    $("#dlg-name").textContent = speaker.name || "???";
    $("#dlg-name").style.color = speaker.color || "var(--gold-light)";
    $("#dlg-title").textContent = speaker.title || "";
  } else {
    // Player dialogue
    $("#dlg-glyph").textContent = "⚔";
    $("#dlg-glyph").style.borderColor = "var(--border-gld)";
    $("#dlg-glyph").style.boxShadow = "";
    $("#dlg-name").textContent = "The Seeker";
    $("#dlg-name").style.color = "var(--text)";
    $("#dlg-title").textContent = "You";
  }

  const linesEl = $("#dlg-lines");
  linesEl.innerHTML = "";
  (beat.lines || []).forEach((line, i) => {
    const p = document.createElement("p");
    p.textContent = line;
    p.style.animationDelay = `${i * 0.1}s`;
    linesEl.appendChild(p);
  });

  show("#panel-dialogue");
  show("#btn-continue");
}

// ─── Panel D — Choice ────────────────────────────────────────────────

function renderChoice(beat) {
  $("#choice-prompt").textContent = beat.prompt || "";

  const container = $("#choice-buttons");
  container.innerHTML = "";

  (beat.choices || []).forEach((choice, i) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";

    const labelEl = document.createElement("span");
    labelEl.className = "choice-label";
    labelEl.textContent = choice.label || "";
    labelEl.style.color = choice.labelColor || "var(--gold)";
    labelEl.style.borderColor = choice.labelColor || "var(--border-gld)";

    const textEl = document.createElement("span");
    textEl.textContent = choice.text || "";

    btn.style.borderLeftColor = choice.labelColor || "var(--border-gld)";
    btn.appendChild(labelEl);
    btn.appendChild(textEl);

    btn.addEventListener("click", () => {
      story.makeChoice(i);
    });
    container.appendChild(btn);
  });

  show("#panel-choice");
  // No continue button while choice is pending
}

// ─── Panel E — Tutorial ──────────────────────────────────────────────

function renderTutorial(beat) {
  $("#tut-icon").textContent = beat.icon || "📖";
  $("#tut-heading").textContent = beat.heading || "Game Mechanic";

  const list = $("#tut-list");
  list.innerHTML = "";
  (beat.lines || []).forEach((line) => {
    const li = document.createElement("li");
    li.textContent = line;
    list.appendChild(li);
  });

  show("#panel-tutorial");
  show("#btn-continue");
}

// ─── Panel F — Item ──────────────────────────────────────────────────

const STORY_ITEM_ID_MAP = {
  "Sanjeevani Extract": "sanjeevaniExtract",
  "Soma-Rasa": "somaRasa",
  "Tulsi Leaf": "tulsiLeaf",
  "Binding Mantra Scroll": "bindingMantra",
};

function renderItem(beat) {
  const itemId = STORY_ITEM_ID_MAP[beat.itemName || ""];
  if (itemId) {
    PlayerState.addItem(itemId, 1);
  }

  $("#item-glyph").textContent = beat.itemGlyph || "📦";
  $("#item-name").textContent = beat.itemName || "";
  $("#item-desc").textContent = beat.itemDesc || "";
  show("#panel-item");
  show("#btn-continue");
}

// ─── Panel G — Seal ──────────────────────────────────────────────────

function renderSeal(beat) {
  $("#seal-glyph").textContent = beat.sealGlyph || "☸";
  $("#seal-name").textContent = beat.sealName || "";
  $("#seal-desc").textContent = beat.sealDesc || "";
  PlayerState.addSeal(beat.sealName || "Unknown Seal", beat.sealGlyph || "☸", beat.sealDesc || "");
  show("#panel-seal");
  show("#btn-continue");
  addSealToSidebar(beat);
}

function addSealToSidebar(beat) {
  const list = $("#seals-list");
  const chip = document.createElement("div");
  chip.className = "seal-chip";
  chip.textContent = beat.sealGlyph || "☸";
  chip.title = beat.sealName || "";
  list.appendChild(chip);
}

// ─── Panel I — Ending ────────────────────────────────────────────────

function renderEnding(beat) {
  $("#ending-text").textContent = beat.text || "";
  $("#ending-subtext").textContent = beat.subtext || "";
  show("#panel-ending");
  show("#btn-story-again");
  hide("#btn-continue");
}

const storyAgainBtn = $("#btn-story-again");
if (storyAgainBtn) {
  storyAgainBtn.addEventListener("click", () => {
    startStoryMode();
  });
}

// ─── Panel J — Starter selection inside story ─────────────────────────

function openStoryStarterSelection() {
  hideAllPanels();
  buildStoryStarterCards();
  show("#panel-starter-story");
  // no continue button until starter chosen
}

function buildStoryStarterCards() {
  const grid = $("#starter-grid-story");
  if (!grid) return;
  grid.innerHTML = "";

  STARTER_IDS.forEach((id) => {
    const species = ATMA_SPECIES[id];
    const color = TYPE_COLORS[species.type];
    const card = document.createElement("div");
    card.className = "starter-card";
    card.style.borderColor = color;
    card.style.maxWidth = "185px";
    card.innerHTML = `
      <div class="starter-glyph" style="background:${color}22; border-color:${color}">${species.glyph}</div>
      <h3 style="color:${color}">${species.name}</h3>
      <div class="type-badge" style="background:${color}">${species.type}</div>
      <p class="starter-desc">${species.inspiration}</p>
      <div class="stat-mini">
        <span>⚔ ${species.base.atk}</span>
        <span>🛡 ${species.base.def}</span>
        <span>💧 ${species.base.hp}</span>
        <span>⚡ ${species.base.speed}</span>
      </div>
      <button class="btn-choose" data-id="${id}" style="background:${color}">Choose</button>
    `;
    grid.appendChild(card);
  });

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-choose");
    if (btn) confirmStoryStarter(btn.dataset.id);
  });
}

function confirmStoryStarter(id) {
  playerStarterId = id;
  const species = ATMA_SPECIES[id];
  const color = TYPE_COLORS[species.type];

  const msg = $("#starter-story-chosen-msg");
  if (msg) {
    msg.innerHTML = `
      Sage Vashistha smiles as <span style="color:${color}"><b>${species.glyph} ${species.name}</b></span>
      leaps onto your shoulder.<br>
      <em>"This is your first Sankalpa (Vow)."</em><br><br>
      A distant alarm bell rings from the city gates…
    `;
    msg.style.textAlign = "center";
    msg.style.fontStyle = "italic";
    msg.style.color = "var(--text-dim)";
    msg.style.marginTop = "1rem";
    msg.style.display = "block";
  }

  // Hide choose buttons
  $$(".btn-choose").forEach((b) => (b.disabled = true));

  setTimeout(() => {
    story.setStarter(id);
  }, 1600);
}

// ─── Karma display ────────────────────────────────────────────────────

function updateKarmaDisplay(karma, choice) {
  const axes = { dharma: "#k-dharma", shakti: "#k-shakti", jnana: "#k-jnana", karuna: "#k-karuna" };
  const pillIds = { dharma: ".dharma-pill", shakti: ".shakti-pill", jnana: ".jnana-pill", karuna: ".karuna-pill" };

  Object.entries(axes).forEach(([axis, elId]) => {
    const el = $(elId);
    if (el) el.textContent = karma[axis] || 0;
  });

  // Bump animation on changed axis
  if (choice && choice.karma) {
    const pillEl = $(pillIds[choice.karma.axis]);
    if (pillEl) {
      pillEl.classList.add("bump");
      setTimeout(() => pillEl.classList.remove("bump"), 400);
    }
  }
}

// ─── Continue button ─────────────────────────────────────────────────

const continueBtn = $("#btn-continue");
if (continueBtn) {
  continueBtn.addEventListener("click", () => {
    if (story) story.advance();
  });
}

// ─── Battle preparation ───────────────────────────────────────────────

function prepareBattle(battleSpec) {
  currentBattleSpec = battleSpec;

  // Update player level based on battle context
  const levelMap = {
    ch3_corrupted_mushika:    3,
    ch6_vriksha_bhoot:        5,
    ch8_bharata_boss:        10,
    ch9_panchavati_gauntlet: 12,
    ch9_yaksha_protection:   13,
    ch10_vishwamitra_boss:   15,
  };
  if (battleSpec.battleId && levelMap[battleSpec.battleId]) {
    playerProgressLevel = levelMap[battleSpec.battleId];
  }

  // Show the battle announcement panel
  hideAllPanels();
  $("#battle-announce-text").textContent = battleSpec.intro || "A battle begins!";
  show("#panel-battle-announce");

  const enterBtn = $("#btn-enter-battle");
  if (enterBtn) {
    // Remove old listener by cloning
    const newBtn = enterBtn.cloneNode(true);
    enterBtn.parentNode.replaceChild(newBtn, enterBtn);
    newBtn.addEventListener("click", () => launchStoryBattle(battleSpec));
  }
}

function launchStoryBattle(spec) {
  if (!playerStarterId) playerStarterId = "vaanJyoti";

  const pLevel = playerProgressLevel;

  // Build player team
  const shuffled = [...WILD_IDS].sort(() => Math.random() - 0.5);
  const playerTeam = [
    new Atma(playerStarterId, pLevel),
    new Atma(shuffled[0], Math.max(2, pLevel - 2)),
    new Atma(shuffled[1], Math.max(2, pLevel - 2)),
  ];

  // Build enemy team from spec
  const enemyTeam = buildEnemyTeam(spec.enemyTeamSpec || []);
  if (enemyTeam.length === 0) {
    // fallback
    enemyTeam.push(new Atma("mushikaRatna", pLevel));
  }

  const enemyVyuhaId = spec.enemyVyuha || "garuda";

  battle = new BattleEngine({
    playerTeam,
    enemyTeam,
    playerVyuhaId: "garuda",
    enemyVyuhaId,
    onEvent: handleBattleEvent,
  });

  battleOverFlag = false;
  buildBattleUI(playerTeam, enemyTeam);
  showScreen("screen-battle");
  refreshBattleUI();

  // Show story context banner
  const banner = $("#battle-context-banner");
  const bannerText = $("#battle-context-text");
  if (banner && bannerText && spec.intro) {
    bannerText.textContent = spec.intro;
    show(banner);
  }

  logMessage(`⚔ ${spec.intro || "The battle begins!"}`);
  if (spec.enemyVyuha) logMessage(`Enemy formation: ${battle.enemy.vyuha.name}`);
}

function buildEnemyTeam(specs) {
  return specs.map((s) => {
    // Check inline species registry first
    if (INLINE_SPECIES[s.speciesId]) {
      const species = { ...INLINE_SPECIES[s.speciesId] };
      // Temporarily register so Atma constructor can find it
      ATMA_SPECIES[s.speciesId] = species;
    }
    const id = ATMA_SPECIES[s.speciesId] ? s.speciesId : "mushikaRatna";
    return new Atma(id, s.level || 5);
  });
}

// ─── Battle event handler ─────────────────────────────────────────────

function handleBattleEvent(evt) {
  switch (evt.type) {
    case "log":              logMessage(evt.msg); break;
    case "damage":           updateHpBar(evt.side, evt.atmaIndex, evt.hp, evt.maxHp); break;
    case "heal":             updateHpBar(evt.side, evt.atmaIndex, evt.hp, evt.maxHp); break;
    case "tapas":            updateTapasBar(evt.side, evt.atmaIndex, evt.tapas, evt.maxTapas); break;
    case "status":           updateStatusBadge(evt.side, evt.atmaIndex, evt.status); break;
    case "faint":            markFainted(evt.side, evt.atmaIndex); break;
    case "switch":           refreshActivePanel(evt.side); break;
    case "effectivenessMsg": flashEffectiveness(evt.msg); break;
    case "battleEnd":        endBattle(evt.winner); break;
  }
}

// ─── Build battle UI ──────────────────────────────────────────────────

function buildBattleUI(playerTeam, enemyTeam) {
  buildTeamRow("team-row-enemy", enemyTeam, "enemy");
  buildTeamRow("team-row-player", playerTeam, "player");
  buildAstraButtons(playerTeam[0]);
  buildSwitchButtons(playerTeam);
  buildVyuhaButtons();
}

function buildTeamRow(rowId, team, side) {
  const row = $(`#${rowId}`);
  if (!row) return;
  row.innerHTML = "";
  team.forEach((atma, i) => {
    const color = TYPE_COLORS[atma.type];
    const slot = document.createElement("div");
    slot.className = "team-slot";
    slot.id = `slot-${side}-${i}`;
    slot.innerHTML = `
      <div class="slot-glyph" style="border-color:${color}">${atma.glyph}</div>
      <div class="slot-info">
        <div class="slot-name" style="color:${color}">${atma.name}</div>
        <div class="slot-level">Lv${atma.level}</div>
      </div>
      <div class="hp-bar-wrap">
        <div class="hp-bar" id="hp-bar-${side}-${i}" style="background:${color}; width:100%"></div>
      </div>
      <div class="tapas-bar-wrap">
        <div class="tapas-bar" id="tapas-bar-${side}-${i}" style="width:40%"></div>
      </div>
      <div class="slot-status" id="status-badge-${side}-${i}"></div>
    `;
    row.appendChild(slot);
  });
  markActive(side);
}

function buildAstraButtons(atma) {
  const container = $("#astra-buttons");
  if (!container) return;
  container.innerHTML = "";
  atma.astras.forEach((astraId) => {
    const astra = getAstra(astraId);
    if (!astra) return;
    const typeColor = TYPE_COLORS[astra.type] || "#888";
    const btn = document.createElement("button");
    btn.className = "astra-btn";
    btn.dataset.astraId = astraId;
    btn.style.borderColor = typeColor;
    const cost = astra.tapas > 0 ? `<span class="tapas-cost">${astra.tapas}⚡</span>` : `<span class="tapas-cost free">Free</span>`;
    const pw = astra.power > 0 ? `<span class="astra-power">PWR ${astra.power}</span>` : "";
    const once = astra.oncePerBattle ? `<span class="astra-once">✦ Once</span>` : "";
    btn.innerHTML = `
      <span class="astra-type-dot" style="background:${typeColor}"></span>
      <span class="astra-name">${astra.name}</span>
      ${pw}${cost}${once}
      <span class="astra-cat">${astra.category}</span>
    `;
    btn.title = astra.desc;
    container.appendChild(btn);
  });

  container.addEventListener("click", (e) => {
    if (battleOverFlag) return;
    const btn = e.target.closest(".astra-btn");
    if (btn) {
      battle.playerTurn(btn.dataset.astraId);
      refreshBattleUI();
      rebuildAstraButtonsAfterSwitch();
    }
  });
}

function buildSwitchButtons(team) {
  const container = $("#switch-buttons");
  if (!container) return;
  container.innerHTML = "";
  team.forEach((atma, i) => {
    if (i === battle.player.active) return;
    const color = TYPE_COLORS[atma.type];
    const btn = document.createElement("button");
    btn.className = "switch-btn";
    btn.dataset.index = i;
    btn.style.borderColor = color;
    btn.innerHTML = `${atma.glyph} <span style="color:${color}">${atma.name}</span> <small>Lv${atma.level}</small>`;
    container.appendChild(btn);
  });

  container.addEventListener("click", (e) => {
    if (battleOverFlag) return;
    const btn = e.target.closest(".switch-btn");
    if (btn) {
      battle.playerTurn(null, parseInt(btn.dataset.index));
      refreshBattleUI();
      rebuildSwitchButtons();
      rebuildAstraButtonsAfterSwitch();
    }
  });
}

function buildVyuhaButtons() {
  const container = $("#vyuha-buttons");
  if (!container) return;
  container.innerHTML = "";
  vyuhaList().forEach((vyuha) => {
    const btn = document.createElement("button");
    btn.className = "vyuha-btn";
    btn.dataset.vyuhaId = vyuha.id;
    btn.title = vyuha.desc;
    btn.innerHTML = `<b>${vyuha.name}</b><br><small>${vyuha.desc}</small>`;
    container.appendChild(btn);
  });

  container.addEventListener("click", (e) => {
    if (battleOverFlag) return;
    const btn = e.target.closest(".vyuha-btn");
    if (btn) {
      battle.playerChangeVyuha(btn.dataset.vyuhaId);
      refreshBattleUI();
      highlightActiveVyuha();
    }
  });
}

// ─── UI refresh helpers ───────────────────────────────────────────────

function refreshBattleUI() {
  ["player", "enemy"].forEach((side) => {
    const s = battle[side];
    s.team.forEach((atma, i) => {
      updateHpBar(side, i, atma.hp, atma.maxHp);
      updateTapasBar(side, i, atma.tapas, atma.maxTapas);
      updateStatusBadge(side, i, atma.status);
      if (atma.isFainted) markFainted(side, i);
    });
    markActive(side);
  });
  updateActivePanel("player");
  updateActivePanel("enemy");
  highlightActiveVyuha();
}

function refreshActivePanel(side) {
  markActive(side);
  updateActivePanel(side);
}

function updateActivePanel(side) {
  const s = battle[side];
  const atma = s.team[s.active];
  const baseId = `active-${side}`;
  const color = TYPE_COLORS[atma.type];
  const el = (id) => $(`#${id}`);

  if (el(`${baseId}-glyph`)) el(`${baseId}-glyph`).textContent = atma.glyph;
  if (el(`${baseId}-name`)) { el(`${baseId}-name`).textContent = atma.name; el(`${baseId}-name`).style.color = color; }
  if (el(`${baseId}-type`)) { el(`${baseId}-type`).textContent = atma.type; el(`${baseId}-type`).style.background = color; }
  if (el(`${baseId}-level`)) el(`${baseId}-level`).textContent = `Lv ${atma.level}`;
  if (el(`${baseId}-hp`)) el(`${baseId}-hp`).textContent = `${atma.hp} / ${atma.maxHp}`;
  if (el(`${baseId}-tapas`)) el(`${baseId}-tapas`).textContent = `${atma.tapas} / ${atma.maxTapas} ⚡`;
  if (el(`${baseId}-status`)) {
    el(`${baseId}-status`).textContent = atma.status || "";
    el(`${baseId}-status`).className = `active-status-display ${atma.status ? "has-status" : ""}`;
  }

  const vyuhaEl = $(`#active-${side}-vyuha`);
  if (vyuhaEl) vyuhaEl.textContent = s.vyuha.name;

  const hpFill = $(`#hp-main-fill-${side}`);
  if (hpFill) {
    const pct = atma.maxHp > 0 ? Math.max(0, (atma.hp / atma.maxHp) * 100) : 0;
    hpFill.style.width = `${pct}%`;
    hpFill.style.background = pct > 50 ? "#4caf50" : pct > 20 ? "#ff9800" : "#f44336";
  }
  const tapasFill = $(`#tapas-main-fill-${side}`);
  if (tapasFill) {
    const tPct = atma.maxTapas > 0 ? (atma.tapas / atma.maxTapas) * 100 : 0;
    tapasFill.style.width = `${tPct}%`;
  }
}

function updateHpBar(side, index, hp, maxHp) {
  const bar = $(`#hp-bar-${side}-${index}`);
  if (!bar) return;
  const pct = maxHp > 0 ? Math.max(0, (hp / maxHp) * 100) : 0;
  bar.style.width = `${pct}%`;
  bar.style.background = pct > 50 ? "#4caf50" : pct > 20 ? "#ff9800" : "#f44336";
  updateActivePanel(side);
}

function updateTapasBar(side, index, tapas, maxTapas) {
  const bar = $(`#tapas-bar-${side}-${index}`);
  if (!bar) return;
  bar.style.width = maxTapas > 0 ? `${(tapas / maxTapas) * 100}%` : "0%";
  updateActivePanel(side);
}

function updateStatusBadge(side, index, status) {
  const el = $(`#status-badge-${side}-${index}`);
  if (!el) return;
  el.textContent = status || "";
  el.className = `slot-status ${status ? `status-${status.toLowerCase()}` : ""}`;
  updateActivePanel(side);
}

function markFainted(side, index) {
  const slot = $(`#slot-${side}-${index}`);
  if (slot) slot.classList.add("fainted");
  updateActivePanel(side);
}

function markActive(side) {
  const s = battle[side];
  $$(`[id^="slot-${side}-"]`).forEach((el) => el.classList.remove("is-active"));
  const activeSlot = $(`#slot-${side}-${s.active}`);
  if (activeSlot) activeSlot.classList.add("is-active");
}

function rebuildSwitchButtons() {
  buildSwitchButtons(battle.player.team);
}

function rebuildAstraButtonsAfterSwitch() {
  buildAstraButtons(battle.player.team[battle.player.active]);
}

function highlightActiveVyuha() {
  $$(".vyuha-btn").forEach((btn) => {
    btn.classList.toggle("active-vyuha", btn.dataset.vyuhaId === battle.player.vyuha.id);
  });
}

function flashEffectiveness(msg) {
  const el = $("#effectiveness-msg");
  if (!el) return;
  el.textContent = msg;
  el.style.opacity = "1";
  el.style.transform = "scale(1.15)";
  setTimeout(() => {
    el.style.opacity = "0";
    el.style.transform = "scale(1)";
  }, 2000);
}

// ─── Battle log ───────────────────────────────────────────────────────

function logMessage(msg) {
  const log = $("#battle-log");
  if (!log) return;
  const line = document.createElement("p");
  line.textContent = msg;
  log.appendChild(line);
  log.scrollTop = log.scrollHeight;
}

// ─── Battle end — handles both story battles and wild encounters ───────
// (Full implementation in Phase 3 section below)
function endBattle(winner) {
  battleOverFlag = true;
  _dispatchBattleEnd(winner);
}

// ─── Return to story after battle ────────────────────────────────────

function setupBtnReturnStory() {
  const btn = $("#btn-return-story");
  if (!btn) return;
  btn.addEventListener("click", () => {
    // Reset battle result UI
    const resultEl = $("#battle-result");
    if (resultEl) { resultEl.style.display = "none"; resultEl.textContent = ""; }
    hide("#btn-return-story");
    hide("#battle-context-banner");

    showScreen("screen-story");
    if (story) story.battleResolved(battle?.winner || "player");
  });
}

// ─── Play Again (free battle mode) ───────────────────────────────────

function setupPlayAgainBtn() {
  const btn = $("#btn-play-again");
  if (!btn) return;
  btn.addEventListener("click", () => {
    inStoryMode = false;
    battleOverFlag = false;
    battle = null;
    playerStarterId = playerStarterId || "vaanJyoti";

    const resultEl = $("#battle-result");
    if (resultEl) { resultEl.style.display = "none"; resultEl.textContent = ""; }
    hide("#btn-play-again");

    // Free battle with current starter at max story level
    launchFreeBattle();
  });
}

function launchFreeBattle() {
  const pLevel = playerProgressLevel || 10;
  const shuffled = [...WILD_IDS].sort(() => Math.random() - 0.5);
  const playerTeam = [
    new Atma(playerStarterId, pLevel),
    new Atma(shuffled[0], pLevel - 1),
    new Atma(shuffled[1], pLevel - 1),
  ];

  const starterAdvantage = { vaanJyoti: "makarShishu", gajaPushpa: "vaanJyoti", makarShishu: "gajaPushpa" };
  const enemyStarter = starterAdvantage[playerStarterId] || STARTER_IDS[0];
  const enemyShuffled = WILD_IDS.filter((id) => id !== shuffled[0] && id !== shuffled[1])
    .sort(() => Math.random() - 0.5);
  const enemyTeam = [
    new Atma(enemyStarter, pLevel + 1),
    new Atma(enemyShuffled[0] || "mushikaRatna", pLevel),
    new Atma(enemyShuffled[1] || "kapiShaka", pLevel - 1),
  ];

  battle = new BattleEngine({
    playerTeam,
    enemyTeam,
    playerVyuhaId: "garuda",
    enemyVyuhaId: "chakra",
    onEvent: handleBattleEvent,
  });

  battleOverFlag = false;
  buildBattleUI(playerTeam, enemyTeam);
  refreshBattleUI();
  hide("#battle-context-banner");
  logMessage("🏟 Free Battle! Indrajit's Atmas stand ready…");
  logMessage(`Your formation: ${battle.player.vyuha.name}`);
}

// ─── Tab navigation ───────────────────────────────────────────────────

function setupTabButtons() {
  $$(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.tab;
      $$(".tab-btn").forEach((b) => b.classList.remove("active-tab"));
      $$(".tab-panel").forEach((p) => p.classList.remove("active-panel"));
      btn.classList.add("active-tab");
      $(`#tab-${tab}`) && $(`#tab-${tab}`).classList.add("active-panel");
    });
  });
}

// ══════════════════════════════════════════════════════════════════════
// ─── PHASE 3: OVERWORLD, ENCOUNTERS & BINDING ─────────────────────────
// ══════════════════════════════════════════════════════════════════════

// ─── Route to overworld from story ending ─────────────────────────────

window.addEventListener("DOMContentLoaded", () => {
  const enterOverworldBtn = $("#btn-enter-overworld");
  if (enterOverworldBtn) {
    enterOverworldBtn.addEventListener("click", () => {
      if (!playerStarterId) playerStarterId = "vaanJyoti";
      PlayerState.initWithStarter(playerStarterId);
      if (story) PlayerState.syncKarmaFromStory(story.karma || {});
      switchToOverworld("ayodhyaOutskirts");
    });
  }
});

// ─── Switch to the overworld screen ───────────────────────────────────

function switchToOverworld(mapId, startX, startY) {
  encounter = encounter || new EncounterEngine();

  const canvas = $("#overworld-canvas");
  if (!canvas) return;

  // Stop old overworld if running
  if (overworld) { overworld.stop(); overworld = null; }

  const pos = PlayerState.position;
  const targetX = startX ?? (pos.mapId === mapId ? pos.tileX : undefined);
  const targetY = startY ?? (pos.mapId === mapId ? pos.tileY : undefined);

  overworld = new OverworldEngine({
    canvas,
    mapId,
    playerX: targetX,
    playerY: targetY,
    onEncounter: (enc) => handleOverworldEncounter(enc),
    onPortal:    (portal) => handleOverworldPortal(portal),
    onNpcTalk:   (npc)    => handleOverworldNpc(npc),
    onShrine:    (shrine) => handleOverworldShrine(shrine),
    onStep:      (x, y, tileType) => handleOverworldStep(x, y, tileType, mapId),
  });

  showScreen("screen-overworld");
  overworld.start();
  refreshOwHud();

  // Setup D-pad for mobile
  $$(".dpad-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const dir = btn.dataset.dir;
      if (dir && overworld) overworld.handleDpadPress(dir);
    });
  });
}

// ─── Overworld HUD update ─────────────────────────────────────────────

function refreshOwHud() {
  const mapDef = MAPS[PlayerState.position.mapId] || MAPS["ayodhyaOutskirts"];
  const mapNameEl = $("#ow-map-name");
  const mapSubEl  = $("#ow-map-sub");
  if (mapNameEl) mapNameEl.textContent = mapDef.name;
  if (mapSubEl)  mapSubEl.textContent  = mapDef.subtitle || "";
  const stepsEl = $("#ow-steps");
  if (stepsEl) stepsEl.textContent = PlayerState.steps;
}

// ─── Step handler — runs encounter check ──────────────────────────────

function handleOverworldStep(x, y, tileType, mapId) {
  // Update step counter display
  const stepsEl = $("#ow-steps");
  if (stepsEl) stepsEl.textContent = PlayerState.steps;

  if (!encounter) return;
  const result = encounter.checkStep(mapId, x, y, tileType);
  if (result) {
    overworld.lock();
    triggerWildEncounter(result);
  }
}

// ─── Encounter trigger & transition ───────────────────────────────────

function triggerWildEncounter(enc) {
  currentWildEncounter = enc;
  const species = ATMA_SPECIES[enc.speciesId];

  // Show encounter flash overlay
  const flashEl = $("#ow-encounter-flash");
  const glyphEl = $("#ow-encounter-glyph");
  const nameEl  = $("#ow-encounter-name");
  if (flashEl) {
    if (glyphEl) glyphEl.textContent = species?.glyph || "❓";
    if (nameEl)  nameEl.textContent  = species?.name  || enc.speciesId;
    flashEl.classList.add("encounter-active");

    setTimeout(() => {
      flashEl.classList.remove("encounter-active");
      launchWildBattle(enc);
    }, 1400);
  } else {
    launchWildBattle(enc);
  }
}

// ─── Launch a wild Atma battle ─────────────────────────────────────────

function launchWildBattle(enc) {
  if (!playerStarterId) playerStarterId = "vaanJyoti";
  isWildBattle = true;

  // Player team: lead = whatever starter, rest from party
  const party = PlayerState.party.length > 0
    ? PlayerState.party
    : [new Atma(playerStarterId, playerProgressLevel || 5)];

  const playerTeam = party.slice(0, 3);
  const enemyTeam  = [enc.wildAtma]; // solo wild Atma

  const wildSpecies = ATMA_SPECIES[enc.speciesId];

  battle = new BattleEngine({
    playerTeam,
    enemyTeam,
    playerVyuhaId: "garuda",
    enemyVyuhaId:  "garuda",
    wildMode:      true,
    onEvent: (evt) => {
      handleBattleEvent(evt);
      // Refresh bind UI on damage events
      if (evt.type === "damage" && evt.side === "enemy") {
        refreshBindTab(enc.wildAtma);
      }
    },
  });

  battleOverFlag = false;
  buildBattleUI(playerTeam, enemyTeam);

  // Show bind tab for wild battles
  const bindTabBtn = $("#tab-btn-bind");
  if (bindTabBtn) bindTabBtn.style.display = "";

  showScreen("screen-battle");
  refreshBattleUI();
  refreshBindTab(enc.wildAtma);

  // Context banner
  const banner = $("#battle-context-banner");
  const bannerText = $("#battle-context-text");
  if (banner && bannerText) {
    bannerText.textContent = `A wild ${wildSpecies?.name || enc.speciesId} (Lv ${enc.level}) appeared!`;
    show(banner);
  }

  logMessage(`🌿 A wild ${wildSpecies?.name || enc.speciesId} (Lv ${enc.level}) appeared!`);
  logMessage(`Type: ${wildSpecies?.type || "—"} · Weaken it below 60% HP to attempt Binding.`);

  // Add "Return to Overworld" button dynamically
  const resultBar = $(".result-bar");
  if (resultBar && !$("#btn-return-overworld")) {
    const owBtn = document.createElement("button");
    owBtn.id = "btn-return-overworld";
    owBtn.className = "btn-primary";
    owBtn.textContent = "Return to Overworld →";
    owBtn.style.display = "none";
    owBtn.addEventListener("click", () => returnToOverworld());
    resultBar.appendChild(owBtn);
  }
}

// ─── Bind tab UI ──────────────────────────────────────────────────────

function refreshBindTab(wildAtma) {
  const bindArea  = $("#bind-area");
  if (!bindArea || !wildAtma || !encounter) return;

  const canBind = encounter.canAttemptBind(wildAtma);
  const rateStr = encounter.bindRateDisplay(wildAtma);
  const scrollCount = PlayerState.getItemCount("bindingMantra");

  if (wildAtma.isFainted) {
    bindArea.innerHTML = `<p style="color:var(--text-dim); font-size:0.85rem;">The Atma has fainted — it cannot be bound.</p>`;
    return;
  }

  if (!canBind) {
    const hpPct = Math.round(wildAtma.hpPct * 100);
    bindArea.innerHTML = `
      <div class="bind-status">
        <p style="color:var(--text-dim); font-size:0.82rem;">⚠ HP is at ${hpPct}%. Reduce to 60% or lower to chant the Binding Mantra.</p>
        <div class="bind-rate-bar-wrap">
          <div class="bind-rate-bar" style="width:${hpPct}%; background:#764cc0"></div>
        </div>
      </div>`;
    return;
  }

  bindArea.innerHTML = `
    <div class="bind-ready">
      <div class="bind-mantra-label">🔮 Binding Mantra Available</div>
      <div class="bind-rate-display">Success chance: <strong>${rateStr}</strong></div>
      <p style="color:var(--text-dim); font-size:0.75rem; margin:0.3rem 0 0.6rem;">
        Lower HP increases the chance. Your Atma's Bhakti also helps.
      </p>
      <div style="display:flex; gap:0.5rem; flex-wrap:wrap; margin-bottom:0.5rem; align-items:center;">
        <button class="btn-bind-attempt" id="btn-do-bind">🔮 Chant Binding Mantra</button>
        <button class="btn-small" id="btn-use-bind-scroll" ${scrollCount <= 0 ? "disabled" : ""}>📜 Use Scroll (${scrollCount})</button>
      </div>
    </div>`;

  const bindBtn = $("#btn-do-bind");
  if (bindBtn) {
    bindBtn.addEventListener("click", () => {
      if (battleOverFlag) return;
      attemptBinding(wildAtma);
    });
  }

  const bindScrollBtn = $("#btn-use-bind-scroll");
  if (bindScrollBtn) {
    bindScrollBtn.addEventListener("click", () => {
      if (battleOverFlag) return;
      if (PlayerState.useItem("bindingMantra", wildAtma)) {
        logMessage("📜 You invoke a Binding Mantra Scroll. The next chant gains a stronger resonance.");
        refreshBindTab(wildAtma);
      }
    });
  }
}

// ─── Binding attempt ──────────────────────────────────────────────────

function attemptBinding(wildAtma) {
  if (!encounter || battleOverFlag) return;

  const userAtma = battle.player.team[battle.player.active];
  const result   = encounter.attemptBind(wildAtma, userAtma);

  logMessage(`🔮 Binding Mantra: ${result.message}`);

  if (result.success) {
    battleOverFlag = true;
    const rewardMsgs = encounter.awardWildRewards(wildAtma, PlayerState.party, true, currentWildEncounter?.zoneId);
    rewardMsgs.forEach((m) => logMessage(m));

    PlayerState.save();

    // Show result
    const resultEl = $("#battle-result");
    if (resultEl) {
      resultEl.textContent = `✦ ${wildAtma.name} has been bound to your Dharma! ${
        result.destination === "party" ? "Added to party." : "Sent to collection."
      }`;
      resultEl.style.color = "#c8973a";
      resultEl.style.display = "block";
    }

    // Ripple on bind tab
    const bindArea = $("#bind-area");
    if (bindArea) {
      bindArea.innerHTML = `<div class="bind-success-msg">
        ✦ ${wildAtma.glyph} <strong>${wildAtma.name}</strong> bound!<br>
        <span style="color:var(--text-dim); font-size:0.8rem">${result.destination === "party" ? "Added to your party." : "Sent to your collection."}</span>
      </div>`;
    }

    hide("#tab-btn-bind");
    show("#btn-return-overworld");
  } else {
    refreshBindTab(wildAtma);
    logMessage("The spirit resists. Continue the battle.");
  }
}

// ─── Wild battle end ──────────────────────────────────────────────────

// ─── endBattle dispatcher (wild + story) ─────────────────────────────
function _dispatchBattleEnd(winner) {
  battleOverFlag = true;
  const resultEl = $("#battle-result");
  if (!resultEl) return;

  if (isWildBattle) {
    if (winner === "player") {
      // Defeated the wild Atma (not bound)
      const wildAtma = currentWildEncounter?.wildAtma;
      if (wildAtma && encounter) {
        const msgs = encounter.awardWildRewards(wildAtma, PlayerState.party, false, currentWildEncounter?.zoneId);
        msgs.forEach((m) => logMessage(m));
        PlayerState.save();
      }
      resultEl.textContent = "⚔ The wild Atma was defeated. It fled into the forest.";
      resultEl.style.color = "#ffd700";
    } else {
      // Lost to wild Atma — blackout
      resultEl.textContent = "💫 Defeated... You wake up at the last shrine you visited.";
      resultEl.style.color = "#cc77ff";
      PlayerState.healPartyFull();
    }
    resultEl.style.display = "block";
    hide("#tab-btn-bind");
    show("#btn-return-overworld");
  } else {
    const spec = currentBattleSpec;
    if (winner === "player") {
      resultEl.textContent = spec?.winText || "🌟 Victory! The shadow is purified. Dharma shines.";
      resultEl.style.color = "#ffd700";
    } else if (winner === "enemy") {
      resultEl.textContent = spec?.loseText || "💫 Defeated. But the seeker's path is never truly closed.";
      resultEl.style.color = "#cc77ff";
    } else {
      resultEl.textContent = "⚖ A draw.";
      resultEl.style.color = "#9ad0ec";
    }
    resultEl.style.display = "block";
    if (inStoryMode) show("#btn-return-story");
    else             show("#btn-play-again");
  }
}

function returnToOverworld() {
  // Clean up wild battle state
  isWildBattle = false;
  currentWildEncounter = null;
  battleOverFlag = false;
  battle = null;

  const resultEl = $("#battle-result");
  if (resultEl) { resultEl.style.display = "none"; resultEl.textContent = ""; }
  hide("#btn-return-overworld");
  hide("#battle-context-banner");
  hide("#tab-btn-bind");

  const bindArea = $("#bind-area");
  if (bindArea) bindArea.innerHTML = `<p style="color:var(--text-dim); font-size:0.8rem; font-style:italic;">Weaken the wild Atma below 60% HP to attempt binding.</p>`;

  // Return to overworld at same position
  if (overworld) {
    showScreen("screen-overworld");
    overworld.unlock();
    refreshOwHud();
  } else {
    switchToOverworld(PlayerState.position.mapId, PlayerState.position.tileX, PlayerState.position.tileY);
  }
}

// ─── Portal handler ──────────────────────────────────────────────────

function handleOverworldPortal(portal) {
  if (portal.storyReturn) {
    // Return to story screen
    if (overworld) { overworld.stop(); overworld = null; }
    showScreen("screen-story");
    return;
  }

  const requiredSealCount = Number(portal.requiredSeals || 0);
  if (requiredSealCount > 0 && PlayerState.seals.length < requiredSealCount) {
    const textEl = $("#ow-locked-text");
    if (textEl) {
      textEl.innerHTML = `This path is sealed by old Dharma marks.<br>
        <em>Earn ${requiredSealCount} seal${requiredSealCount === 1 ? "" : "s"} from the story route to open the southern gate.</em>`;
    }
    show("#ow-locked-overlay");
    const closeBtn = $("#ow-locked-close");
    if (closeBtn) {
      const newBtn = closeBtn.cloneNode(true);
      closeBtn.parentNode.replaceChild(newBtn, closeBtn);
      newBtn.addEventListener("click", () => {
        hide("#ow-locked-overlay");
        if (overworld) overworld.unlock();
      });
    }
    return;
  }

  if (portal.targetMapId === "LOCKED") {
    show("#ow-locked-overlay");
    const closeBtn = $("#ow-locked-close");
    if (closeBtn) {
      const newBtn = closeBtn.cloneNode(true);
      closeBtn.parentNode.replaceChild(newBtn, closeBtn);
      newBtn.addEventListener("click", () => {
        hide("#ow-locked-overlay");
        if (overworld) overworld.unlock();
      });
    }
    return;
  }
  if (portal.targetMapId === "STORY") {
    if (overworld) { overworld.stop(); overworld = null; }
    showScreen("screen-story");
    return;
  }
  // Map transition
  if (overworld) {
    overworld.loadMap(portal.targetMapId, portal.targetX, portal.targetY);
    if (encounter) encounter.resetCooldown();
    overworld.unlock();
    refreshOwHud();
  }
}

// ─── NPC handler ──────────────────────────────────────────────────────

function handleOverworldNpc(npcDef) {
  const character = CHARACTERS[npcDef.characterId] || { name: npcDef.id, glyph: "👤", color: "#c8973a" };
  const lines = npcDef.dialogueLines || ["…"];
  _owNpcDialogue = { lines, index: 0, character };

  const overlay = $("#ow-dialogue-overlay");
  const glyphEl = $("#ow-dlg-glyph");
  const nameEl  = $("#ow-dlg-name");
  const textEl  = $("#ow-dlg-text");
  const progEl  = $("#ow-dlg-progress");

  if (glyphEl) { glyphEl.textContent = character.glyph || "👤"; glyphEl.style.color = character.color; }
  if (nameEl)  { nameEl.textContent = character.name; nameEl.style.color = character.color; }
  if (textEl)  textEl.textContent = lines[0];
  if (progEl)  progEl.textContent = `1 / ${lines.length}`;

  show(overlay);

  // Wire next button (clone to clear previous listeners)
  const nextBtn = $("#ow-dlg-next");
  if (nextBtn) {
    const newBtn = nextBtn.cloneNode(true);
    nextBtn.parentNode.replaceChild(newBtn, nextBtn);
    newBtn.addEventListener("click", advanceNpcDialogue);
  }
}

function advanceNpcDialogue() {
  if (!_owNpcDialogue) return;
  _owNpcDialogue.index++;
  if (_owNpcDialogue.index >= _owNpcDialogue.lines.length) {
    hide("#ow-dialogue-overlay");
    _owNpcDialogue = null;
    if (overworld) overworld.unlock();
    return;
  }
  const textEl = $("#ow-dlg-text");
  const progEl = $("#ow-dlg-progress");
  if (textEl) textEl.textContent = _owNpcDialogue.lines[_owNpcDialogue.index];
  if (progEl) progEl.textContent = `${_owNpcDialogue.index + 1} / ${_owNpcDialogue.lines.length}`;
}

// ─── Shrine handler ───────────────────────────────────────────────────

function handleOverworldShrine(shrineDef) {
  const overlay = $("#ow-shrine-overlay");
  const textEl  = $("#ow-shrine-text");
  const box     = overlay?.querySelector(".ow-shrine-box");

  if (!overlay || !textEl || !box) return;

  textEl.textContent = shrineDef.text || "A sacred inscription…";

  let actionsWrap = box.querySelector(".ow-shrine-actions");
  if (!actionsWrap) {
    actionsWrap = document.createElement("div");
    actionsWrap.className = "ow-shrine-actions";
    box.appendChild(actionsWrap);
  }

  const restBtn = actionsWrap.querySelector("#ow-shrine-rest") || document.createElement("button");
  restBtn.id = "ow-shrine-rest";
  restBtn.className = "btn-continue";
  restBtn.textContent = "Rest & Recover";
  if (!restBtn.parentNode) actionsWrap.appendChild(restBtn);

  const closeBtn = $("#ow-shrine-close");
  if (closeBtn) {
    const newBtn = closeBtn.cloneNode(true);
    closeBtn.parentNode.replaceChild(newBtn, closeBtn);
    newBtn.addEventListener("click", () => {
      hide("#ow-shrine-overlay");
      if (overworld) overworld.unlock();
    });
  }

  restBtn.onclick = () => {
    const healed = [];
    PlayerState.party.forEach((atma) => {
      const before = atma.hp;
      atma.heal(atma.maxHp);
      atma.regenTapas(35);
      if (atma.status) {
        atma.status = null;
        atma.statusTurns = 0;
      }
      if (before < atma.maxHp || atma.tapas < atma.maxTapas) healed.push(atma.name);
    });

    if (healed.length > 0) {
      PlayerState.addItem("sanjeevaniExtract", 1);
      PlayerState.save();
      logMessage(`🪔 The shrine answers. ${healed.join(", ")} are restored and renewed.`);
    } else {
      PlayerState.save();
      logMessage("🪔 The shrine hums softly, but your party is already at its fullest strength.");
    }

    buildPartyPanel();
    hide("#ow-shrine-overlay");
    if (overworld) overworld.unlock();
  };

  show(overlay);
}

// ─── "Back to Story" button from overworld ────────────────────────────

window.addEventListener("DOMContentLoaded", () => {
  const backBtn = $("#btn-ow-back-story");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      if (overworld) { overworld.stop(); overworld = null; }
      showScreen("screen-story");
    });
  }

  // Party panel
  const openPartyBtn  = $("#btn-open-party");
  const closePartyBtn = $("#btn-close-party");
  if (openPartyBtn)  openPartyBtn.addEventListener("click",  () => { buildPartyPanel(); show("#ow-party-panel"); });
  if (closePartyBtn) closePartyBtn.addEventListener("click", () => hide("#ow-party-panel"));
});

// ─── Party panel ──────────────────────────────────────────────────────

function buildPartyPanel() {
  const list = $("#ow-party-list");
  const countEl = $("#ow-collection-count");
  const stepsEl = $("#ow-steps-party");

  if (countEl) countEl.textContent = PlayerState.collectedCount;
  if (stepsEl) stepsEl.textContent = PlayerState.steps;

  if (!list) return;
  list.innerHTML = "";

  const partySection = document.createElement("div");
  partySection.className = "ow-party-section";
  partySection.innerHTML = `<div class="party-section-title">Active Party</div>`;
  list.appendChild(partySection);

  if (PlayerState.party.length === 0) {
    const empty = document.createElement("p");
    empty.className = "party-empty";
    empty.textContent = "Your party is empty. Bind wild Atmas to form your team.";
    partySection.appendChild(empty);
  }

  PlayerState.party.forEach((atma, i) => {
    const color = TYPE_COLORS[atma.type] || "#888";
    const hpPct = Math.round(atma.hpPct * 100);
    const card = document.createElement("div");
    card.className = "party-card";
    card.style.borderColor = color;
    card.innerHTML = `
      <span class="party-card-glyph" style="background:${color}22">${atma.glyph}</span>
      <div class="party-card-info">
        <div class="party-card-name" style="color:${color}">${atma.name}</div>
        <div class="party-card-meta">Lv ${atma.level} · ${atma.type}</div>
        <div class="party-card-hp">
          <span>HP ${atma.hp}/${atma.maxHp}</span>
          <div class="hp-bar-wrap" style="width:80px; display:inline-block; margin-left:0.4rem">
            <div class="hp-bar" style="width:${hpPct}%; background:${hpPct > 50 ? "#4caf50" : hpPct > 20 ? "#ff9800" : "#f44336"}"></div>
          </div>
        </div>
        ${atma.status ? `<div style="color:#ff7733; font-size:0.72rem">Status: ${atma.status}</div>` : ""}
        <div style="color:var(--tapas-clr); font-size:0.72rem">Bhakti ❤ ${Math.round(atma.bhakti)}/100</div>
      </div>
    `;

    const actionRow = document.createElement("div");
    actionRow.className = "party-action-row";

    const removeBtn = document.createElement("button");
    removeBtn.className = "btn-small";
    removeBtn.textContent = "Remove from Party";
    removeBtn.addEventListener("click", () => {
      PlayerState.removeFromParty(i);
      buildPartyPanel();
    });

    const healBtn = document.createElement("button");
    healBtn.className = "btn-small";
    healBtn.textContent = `Heal ${PlayerState.getItemCount("sanjeevaniExtract")}`;
    healBtn.disabled = PlayerState.getItemCount("sanjeevaniExtract") <= 0;
    healBtn.addEventListener("click", () => {
      if (PlayerState.useItem("sanjeevaniExtract", atma)) {
        buildPartyPanel();
      }
    });

    const tapasBtn = document.createElement("button");
    tapasBtn.className = "btn-small";
    tapasBtn.textContent = `Tapas ${PlayerState.getItemCount("somaRasa")}`;
    tapasBtn.disabled = PlayerState.getItemCount("somaRasa") <= 0;
    tapasBtn.addEventListener("click", () => {
      if (PlayerState.useItem("somaRasa", atma)) {
        buildPartyPanel();
      }
    });

    const evolveBtn = document.createElement("button");
    evolveBtn.className = "btn-small";
    evolveBtn.textContent = atma.canEvolve() ? "Sadhana" : (atma.evolutionStage ? "Ascended" : "Sadhana");
    evolveBtn.disabled = !atma.canEvolve();
    evolveBtn.addEventListener("click", () => {
      if (atma.evolve()) {
        PlayerState.save();
        logMessage(`🕉 ${atma.name} completes Sadhana and awakens to a new form.`);
        buildPartyPanel();
      }
    });

    actionRow.appendChild(removeBtn);
    actionRow.appendChild(healBtn);
    actionRow.appendChild(tapasBtn);
    actionRow.appendChild(evolveBtn);
    card.appendChild(actionRow);
    partySection.appendChild(card);
  });

  const karmicSection = document.createElement("div");
  karmicSection.className = "ow-party-section";
  karmicSection.innerHTML = `
    <div class="party-section-title">Dharma Ledger</div>
    <div class="party-card-info">
      <div style="color:#d6c78b; font-size:0.72rem">Dharma ${PlayerState.karma.dharma || 0} · Shakti ${PlayerState.karma.shakti || 0} · Jnana ${PlayerState.karma.jnana || 0} · Karuna ${PlayerState.karma.karuna || 0}</div>
      <div style="color:#9ad0ec; font-size:0.72rem">Seals: ${PlayerState.seals.length} · Bind bonus: +${Math.round(PlayerState.getKarmaBonus() * 100)}%</div>
    </div>
  `;
  list.appendChild(karmicSection);

  const collectionSection = document.createElement("div");
  collectionSection.className = "ow-party-section";
  collectionSection.innerHTML = `<div class="party-section-title">Spirit Collection</div>`;
  list.appendChild(collectionSection);

  if (PlayerState.collection.length === 0) {
    const empty = document.createElement("p");
    empty.className = "party-empty";
    empty.textContent = "No bound Atmas in your collection yet.";
    collectionSection.appendChild(empty);
  } else {
    PlayerState.collection.forEach((record, idx) => {
      const species = ATMA_SPECIES[record.speciesId];
      if (!species) return;

      const color = TYPE_COLORS[species.type] || "#888";
      const collectionCard = document.createElement("div");
      collectionCard.className = "party-card party-card-collection";
      collectionCard.style.borderColor = color;
      collectionCard.innerHTML = `
        <span class="party-card-glyph" style="background:${color}22">${species.glyph}</span>
        <div class="party-card-info">
          <div class="party-card-name" style="color:${color}">${species.name}</div>
          <div class="party-card-meta">Lv ${record.level || 1} · ${species.type}</div>
          <div style="color:var(--text-dim); font-size:0.72rem">Bound record stored in your collection.</div>
        </div>
      `;

      const addBtn = document.createElement("button");
      addBtn.className = "btn-small";
      addBtn.textContent = PlayerState.party.length >= 6 ? "Party Full" : "Add to Party";
      addBtn.disabled = PlayerState.party.length >= 6;
      addBtn.addEventListener("click", () => {
        if (PlayerState.addToPartyFromCollection(idx)) {
          buildPartyPanel();
        }
      });
      collectionCard.appendChild(addBtn);
      collectionSection.appendChild(collectionCard);
    });
  }

  const labSection = document.createElement("div");
  labSection.className = "ow-party-section";
  labSection.innerHTML = `<div class="party-section-title">Rasayana Lab</div>`;
  list.appendChild(labSection);

  Object.entries(CRAFT_RECIPES).forEach(([recipeId, recipe]) => {
    const card = document.createElement("div");
    card.className = "party-card";
    card.innerHTML = `
      <div class="party-card-info">
        <div class="party-card-name">${recipe.name}</div>
        <div class="party-card-meta">${recipe.desc}</div>
        <div style="color:#d6c78b; font-size:0.72rem">Needs: ${Object.entries(recipe.requires).map(([itemId, qty]) => `${qty} ${itemId}`).join(" · ")}</div>
      </div>
    `;

    const craftBtn = document.createElement("button");
    craftBtn.className = "btn-small";
    craftBtn.textContent = "Craft";
    craftBtn.disabled = !PlayerState.canCraft(recipeId);
    craftBtn.addEventListener("click", () => {
      if (PlayerState.craftItem(recipeId)) {
        buildPartyPanel();
        logMessage(`🧪 You crafted ${recipe.name}.`);
      }
    });
    card.appendChild(craftBtn);
    labSection.appendChild(card);
  });
}
