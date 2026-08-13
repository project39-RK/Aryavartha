// ===================================================================
// Aryavarta — StoryEngine
// Walks through STORY_CHAPTERS beat-by-beat.
// Emits events the UI layer (main.js) can react to.
//
// Events (via onEvent callback):
//   { type: "beat", beat }          — render this beat's content
//   { type: "battle", battleSpec }  — hand control to BattleEngine
//   { type: "karmaUpdate", karma }  — karma axes changed
//   { type: "starterSelect" }       — show the starter selection UI
//   { type: "chapterEnd", id }      — a chapter finished
//   { type: "storyEnd" }            — all chapters done
// ===================================================================

import { STORY_CHAPTERS } from "../data/story.js";
import { getCharacter } from "../data/characters.js";

export class StoryEngine {
  constructor({ onEvent }) {
    this.onEvent = onEvent || (() => {});
    this.chapters = STORY_CHAPTERS;

    // Progress state
    this.chapterIndex = 0;
    this.beatIndex = 0;

    // Karma axes: dharma, shakti, jnana, karuna
    this.karma = { dharma: 0, shakti: 0, jnana: 0, karuna: 0 };

    // Items collected & seals earned (cosmetic for now)
    this.items = [];
    this.seals = [];

    // Which starter was chosen (set externally)
    this.starterId = null;

    // Whether we are paused waiting for player input
    this.waitingForInput = false;

    // Whether we are inside a battle
    this.inBattle = false;
  }

  // ─── Public API ───────────────────────────────────────────────────────────

  /** Kick off the story from the beginning. */
  start() {
    this.chapterIndex = 0;
    this.beatIndex = 0;
    this._presentBeat();
  }

  /** Resume after the player clicks "Continue" or finishes any input. */
  advance() {
    if (this.waitingForInput || this.inBattle) return;
    this.beatIndex++;
    this._presentBeat();
  }

  /** Called by the UI when the player makes a karma choice. */
  makeChoice(choiceIndex) {
    if (!this.waitingForInput) return;
    const beat = this._currentBeat();
    if (!beat || beat.type !== "choice") return;

    const choice = beat.choices[choiceIndex];
    if (!choice) return;

    // Apply karma
    if (choice.karma) {
      const { axis, val } = choice.karma;
      this.karma[axis] = (this.karma[axis] || 0) + val;
      this._emit("karmaUpdate", { karma: { ...this.karma }, choice });
    }

    this.waitingForInput = false;
    this.advance();
  }

  /** Called by the UI when the player picks a starter. */
  setStarter(starterId) {
    this.starterId = starterId;
    this.waitingForInput = false;
    this.advance();
  }

  /** Called by the UI when a story battle finishes. */
  battleResolved(winner) {
    this.inBattle = false;
    // After any result (win or lose), continue story
    this.advance();
  }

  // ─── Navigation ──────────────────────────────────────────────────────────

  _currentChapter() {
    return this.chapters[this.chapterIndex] || null;
  }

  _currentBeat() {
    const ch = this._currentChapter();
    if (!ch) return null;
    return ch.beats[this.beatIndex] || null;
  }

  _presentBeat() {
    const beat = this._currentBeat();

    // End of chapter
    if (!beat) {
      this._emit("chapterEnd", { id: this._currentChapter()?.id });
      this.chapterIndex++;
      this.beatIndex = 0;

      if (this.chapterIndex >= this.chapters.length) {
        this._emit("storyEnd", {});
        return;
      }
      // Auto-start next chapter
      this._presentBeat();
      return;
    }

    // Enrich beat with character data if applicable
    const enriched = this._enrichBeat(beat);

    switch (beat.type) {
      case "title":
      case "narration":
      case "dialogue":
      case "tutorial":
      case "continue":
        this._emit("beat", { beat: enriched });
        // "continue" and endings don't auto-advance
        if (beat.type !== "continue") {
          // waitingForInput = false; UI must call advance()
        }
        break;

      case "item":
        this._collectItem(enriched);
        this._emit("beat", { beat: enriched });
        break;

      case "seal":
        this._earnSeal(enriched);
        this._emit("beat", { beat: enriched });
        break;

      case "choice":
        this._emit("beat", { beat: enriched });
        this.waitingForInput = true;
        break;

      case "starterSelection":
        this._emit("beat", { beat: enriched });
        this._emit("starterSelect", {});
        this.waitingForInput = true;
        break;

      case "battle":
        this._emit("beat", { beat: enriched });
        this.inBattle = true;
        this._emit("battle", { battleSpec: enriched });
        break;

      default:
        // Unknown beat type — just skip it
        this.advance();
    }
  }

  _enrichBeat(beat) {
    const enriched = { ...beat };

    if (beat.speakerId) {
      const char = getCharacter(beat.speakerId);
      if (char) enriched.speaker = char;
    }

    return enriched;
  }

  // ─── Item / Seal collection ───────────────────────────────────────────────

  _collectItem(beat) {
    this.items.push({ name: beat.itemName, desc: beat.itemDesc, glyph: beat.itemGlyph });
  }

  _earnSeal(beat) {
    this.seals.push({ name: beat.sealName, desc: beat.sealDesc, glyph: beat.sealGlyph });
  }

  // ─── Emit helper ─────────────────────────────────────────────────────────

  _emit(type, data = {}) {
    this.onEvent({ type, ...data });
  }
}
