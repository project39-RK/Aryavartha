// ===================================================================
// Aryavarta — Main Game Controller (Story + Battle)
// Routes between the Story Screen and the Battle Screen.
// Wires StoryEngine events to DOM panels, and BattleEngine to the
// Mandala UI.
// ===================================================================

import { Atma } from "./engine/Atma.js";
import { BattleEngine } from "./engine/BattleEngine.js";
import { StoryEngine } from "./engine/StoryEngine.js";
import { ATMA_SPECIES, STARTER_IDS, WILD_IDS } from "./data/atmas.js";
import { ASTRAS, getAstra } from "./data/astras.js";
import { TYPE_COLORS } from "./data/types.js";
import { VYUHAS, vyuhaList } from "./engine/VyuhaGrid.js";

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
let playerStarterId = null;
let battleOverFlag = false;
let inStoryMode = true;        // false = free-battle mode (play again)
let currentBattleSpec = null;  // the story beat that launched current battle
let playerProgressLevel = 5;   // increases as story progresses

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

function renderItem(beat) {
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

// ─── Battle end ───────────────────────────────────────────────────────

function endBattle(winner) {
  battleOverFlag = true;
  const resultEl = $("#battle-result");
  if (!resultEl) return;

  const spec = currentBattleSpec;

  if (winner === "player") {
    resultEl.textContent = spec?.winText || "🌟 Victory! The shadow is purified. Dharma shines.";
    resultEl.style.color = "#ffd700";
  } else if (winner === "enemy") {
    resultEl.textContent = spec?.loseText || "💫 Defeated. But the seeker's path is never truly closed.";
    resultEl.style.color = "#cc77ff";
  } else {
    resultEl.textContent = "⚖ A draw — both forces spent. The Dharma scales remain balanced.";
    resultEl.style.color = "#9ad0ec";
  }
  resultEl.style.display = "block";

  if (inStoryMode) {
    show("#btn-return-story");
  } else {
    show("#btn-play-again");
  }
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
