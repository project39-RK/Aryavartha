// ===================================================================
// Aryavarta — OverworldEngine (Phase 3)
// Canvas-based tile map renderer with player movement.
//
// Usage:
//   const ow = new OverworldEngine({
//     canvas,           // <canvas> element
//     mapId,            // starting map ID
//     playerX, playerY, // starting tile position
//     onEncounter,      // fn({ speciesId, level, tileType })
//     onPortal,         // fn(portalDef)
//     onNpcTalk,        // fn(npcDef)
//     onShrine,         // fn(shrineDef)
//     onStep,           // fn(x, y, tileType) — called on every move
//   });
//   ow.start();
//   ow.stop();
// ===================================================================

import {
  MAPS, TILE_PROPS, T,
  getTile, isWalkable, findPortal, findNpc, findShrine
} from "../data/maps.js";
import { PlayerState } from "./PlayerState.js";

const TILE_SIZE = 40;            // px per tile
const PLAYER_EMOJI = "🧘";       // player character glyph
const CAMERA_PADDING = 3;        // tiles of buffer around player before camera scrolls

// Key constants
const KEYS = {
  ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right",
  w: "up", s: "down", a: "left", d: "right",
  W: "up", S: "down", A: "left", D: "right",
};

// Facing directions → tile delta
const DIR_DELTA = {
  up:    { dx:  0, dy: -1 },
  down:  { dx:  0, dy:  1 },
  left:  { dx: -1, dy:  0 },
  right: { dx:  1, dy:  0 },
};

// ── Grass animation frames ─────────────────────────────────────────
const GRASS_EMOJIS = ["🌿", "🍃", "🌱"];

export class OverworldEngine {
  constructor({ canvas, mapId, playerX, playerY,
                onEncounter, onPortal, onNpcTalk, onShrine, onStep }) {

    this.canvas   = canvas;
    this.ctx      = canvas.getContext("2d");

    // Callbacks
    this.onEncounter = onEncounter || (() => {});
    this.onPortal    = onPortal    || (() => {});
    this.onNpcTalk   = onNpcTalk   || (() => {});
    this.onShrine    = onShrine    || (() => {});
    this.onStep      = onStep      || (() => {});

    // Map state
    this.mapId  = null;
    this.map    = null;

    // Player state
    this.px = 0;   // tile X
    this.py = 0;   // tile Y
    this.facing = "down";

    // Camera (top-left tile visible)
    this.camX = 0;
    this.camY = 0;

    // Input
    this._keysDown   = new Set();
    this._keyHandler = null;
    this._keyUpHandler = null;

    // Movement
    this._moving     = false;       // whether a move animation is in progress
    this._moveQueue  = [];          // queued direction from held key
    this._stepTimer  = 0;
    this._stepDelay  = 160;         // ms between steps when key held

    // Grass animation
    this._grassFrame = 0;
    this._grassTimer = 0;

    // Active dialogue/event lock
    this.locked = false;

    // RAF handle
    this._rafId    = null;
    this._lastTime = 0;

    // Grass flash overlay (encounter trigger visual)
    this._flashAlpha = 0;
    this._flashing   = false;

    // Resize handler
    this._resizeHandler = () => this._resizeCanvas();

    // Load the initial map
    this.loadMap(mapId, playerX, playerY);
  }

  // ── Public API ──────────────────────────────────────────────────

  /** Start the engine — begins rendering and listening for input. */
  start() {
    this._bindKeys();
    window.addEventListener("resize", this._resizeHandler);
    this._resizeCanvas();
    this._lastTime = performance.now();
    this._loop(this._lastTime);
  }

  /** Stop the engine — removes event listeners and cancels animation. */
  stop() {
    if (this._rafId) cancelAnimationFrame(this._rafId);
    this._unbindKeys();
    window.removeEventListener("resize", this._resizeHandler);
  }

  /** Change to a new map at given starting tile. */
  loadMap(mapId, startX, startY) {
    this.mapId = mapId;
    this.map   = MAPS[mapId];
    if (!this.map) { console.error(`Unknown map: ${mapId}`); return; }

    this.px = startX ?? this.map.playerStart.x;
    this.py = startY ?? this.map.playerStart.y;
    this.facing = "down";
    this._clampCamera();
    PlayerState.updatePosition(mapId, this.px, this.py);
  }

  /** Externally lock movement (e.g. during dialogue). */
  lock()   { this.locked = true; }
  unlock() { this.locked = false; }

  /** Flash the screen white (encounter transition). */
  triggerFlash(callback) {
    this._flashAlpha = 1.0;
    this._flashing   = true;
    this._flashCallback = callback;
  }

  /** Get the pixel-center of the current player tile (for external use). */
  get playerScreenPos() {
    const sx = (this.px - this.camX) * TILE_SIZE + TILE_SIZE / 2;
    const sy = (this.py - this.camY) * TILE_SIZE + TILE_SIZE / 2;
    return { sx, sy };
  }

  // ── Rendering ──────────────────────────────────────────────────

  _resizeCanvas() {
    if (!this.canvas.parentElement) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width  = Math.min(rect.width  || 640, 800);
    this.canvas.height = Math.min(rect.height || 480, 600);
    this._clampCamera();
  }

  _loop(now) {
    const dt = now - this._lastTime;
    this._lastTime = now;
    this._update(dt);
    this._draw();
    this._rafId = requestAnimationFrame((t) => this._loop(t));
  }

  _update(dt) {
    // Grass animation
    this._grassTimer += dt;
    if (this._grassTimer > 500) {
      this._grassFrame = (this._grassFrame + 1) % GRASS_EMOJIS.length;
      this._grassTimer = 0;
    }

    // Flash fade
    if (this._flashing) {
      this._flashAlpha -= dt / 300;
      if (this._flashAlpha <= 0) {
        this._flashAlpha = 0;
        this._flashing   = false;
        if (this._flashCallback) { this._flashCallback(); this._flashCallback = null; }
      }
      return; // no movement during flash
    }

    if (this.locked) return;

    // Step timer (held key repeat)
    this._stepTimer += dt;
    if (this._stepTimer < this._stepDelay) return;

    // Check for a held direction
    let dir = null;
    for (const [key, d] of Object.entries(KEYS)) {
      if (this._keysDown.has(key)) { dir = d; break; }
    }
    if (!dir) {
      this._stepTimer = 0;
      return;
    }

    this._stepTimer = 0;
    this._tryMove(dir);
  }

  _tryMove(dir) {
    this.facing = dir;
    const { dx, dy } = DIR_DELTA[dir];
    const nx = this.px + dx;
    const ny = this.py + dy;

    // Check NPC on adjacent tile first (bump to talk)
    const adjNpc = findNpc(this.map, nx, ny);
    if (adjNpc) {
      this.lock();
      this.onNpcTalk(adjNpc);
      return;
    }

    // Collision check
    if (!isWalkable(this.map, nx, ny)) return;

    // Move
    this.px = nx;
    this.py = ny;
    this._clampCamera();
    PlayerState.updatePosition(this.mapId, this.px, this.py);
    PlayerState.incrementSteps();

    const tileType = getTile(this.map, nx, ny);

    // Portal check
    const portal = findPortal(this.map, nx, ny);
    if (portal) {
      this.lock();
      this.onPortal(portal);
      return;
    }

    // Shrine check
    const shrine = findShrine(this.map, nx, ny);
    if (shrine) {
      this.lock();
      this.onShrine(shrine);
      return;
    }

    // Step callback
    this.onStep(nx, ny, tileType);
  }

  // ── Camera ─────────────────────────────────────────────────────

  _clampCamera() {
    if (!this.map) return;
    const visW = Math.ceil((this.canvas.width  || 640) / TILE_SIZE);
    const visH = Math.ceil((this.canvas.height || 480) / TILE_SIZE);

    // Center camera on player with padding
    let cx = this.px - Math.floor(visW / 2);
    let cy = this.py - Math.floor(visH / 2);

    cx = Math.max(0, Math.min(cx, this.map.cols - visW));
    cy = Math.max(0, Math.min(cy, this.map.rows - visH));

    this.camX = cx;
    this.camY = cy;
  }

  // ── Drawing ────────────────────────────────────────────────────

  _draw() {
    if (!this.map) return;
    const ctx = this.ctx;
    const W = this.canvas.width;
    const H = this.canvas.height;

    ctx.clearRect(0, 0, W, H);

    // ── Draw tiles ──
    const visW = Math.ceil(W / TILE_SIZE) + 1;
    const visH = Math.ceil(H / TILE_SIZE) + 1;

    ctx.font = `${Math.floor(TILE_SIZE * 0.65)}px serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (let row = 0; row <= visH; row++) {
      for (let col = 0; col <= visW; col++) {
        const tx = this.camX + col;
        const ty = this.camY + row;
        if (tx < 0 || ty < 0 || tx >= this.map.cols || ty >= this.map.rows) continue;

        const tileId = this.map.tiles[ty][tx];
        const props  = TILE_PROPS[tileId];
        const sx     = col * TILE_SIZE;
        const sy     = row * TILE_SIZE;

        // Tile background
        ctx.fillStyle = props.color;
        ctx.fillRect(sx, sy, TILE_SIZE, TILE_SIZE);

        // Tile border (subtle grid lines)
        ctx.strokeStyle = "rgba(0,0,0,0.12)";
        ctx.lineWidth = 0.5;
        ctx.strokeRect(sx, sy, TILE_SIZE, TILE_SIZE);

        // Tile emoji decoration
        if (props.emoji) {
          const emoji = tileId === T.GRASS
            ? GRASS_EMOJIS[this._grassFrame]
            : props.emoji;
          ctx.fillText(emoji, sx + TILE_SIZE / 2, sy + TILE_SIZE / 2);
        }

        // Portal glow
        if (tileId === T.PORTAL) {
          const pulse = 0.4 + 0.3 * Math.sin(Date.now() / 400);
          ctx.fillStyle = `rgba(140, 80, 220, ${pulse})`;
          ctx.fillRect(sx, sy, TILE_SIZE, TILE_SIZE);
          ctx.fillStyle = "#fff";
          ctx.font = `${Math.floor(TILE_SIZE * 0.45)}px serif`;
          ctx.fillText("✦", sx + TILE_SIZE / 2, sy + TILE_SIZE / 2);
          ctx.font = `${Math.floor(TILE_SIZE * 0.65)}px serif`;
        }
      }
    }

    // ── Draw NPCs ──
    ctx.font = `${Math.floor(TILE_SIZE * 0.7)}px serif`;
    for (const npc of this.map.npcs) {
      const sx = (npc.tileX - this.camX) * TILE_SIZE;
      const sy = (npc.tileY - this.camY) * TILE_SIZE;
      if (sx < -TILE_SIZE || sy < -TILE_SIZE || sx > W || sy > H) continue;

      // NPC background circle
      ctx.fillStyle = "rgba(139, 107, 53, 0.6)";
      ctx.beginPath();
      ctx.arc(sx + TILE_SIZE / 2, sy + TILE_SIZE / 2, TILE_SIZE * 0.4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillText("👤", sx + TILE_SIZE / 2, sy + TILE_SIZE / 2);
    }

    // ── Draw shrines ──
    ctx.font = `${Math.floor(TILE_SIZE * 0.6)}px serif`;
    for (const shrine of (this.map.shrines || [])) {
      const sx = (shrine.tileX - this.camX) * TILE_SIZE;
      const sy = (shrine.tileY - this.camY) * TILE_SIZE;
      if (sx < -TILE_SIZE || sy < -TILE_SIZE || sx > W || sy > H) continue;
      ctx.fillText("🪔", sx + TILE_SIZE / 2, sy + TILE_SIZE / 2);
    }

    // ── Draw player ──
    const plSx = (this.px - this.camX) * TILE_SIZE;
    const plSy = (this.py - this.camY) * TILE_SIZE;

    // Player shadow
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.beginPath();
    ctx.ellipse(
      plSx + TILE_SIZE / 2, plSy + TILE_SIZE * 0.85,
      TILE_SIZE * 0.28, TILE_SIZE * 0.12, 0, 0, Math.PI * 2
    );
    ctx.fill();

    // Player sprite (emoji)
    ctx.font = `${Math.floor(TILE_SIZE * 0.75)}px serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(PLAYER_EMOJI, plSx + TILE_SIZE / 2, plSy + TILE_SIZE / 2);

    // Player indicator dot
    ctx.fillStyle = "#ffd700";
    ctx.beginPath();
    ctx.arc(plSx + TILE_SIZE / 2, plSy + TILE_SIZE * 0.12, 3, 0, Math.PI * 2);
    ctx.fill();

    // ── Flash overlay ──
    if (this._flashAlpha > 0) {
      ctx.fillStyle = `rgba(255, 255, 255, ${this._flashAlpha})`;
      ctx.fillRect(0, 0, W, H);
    }

    // ── Mini-map ──
    this._drawMinimap(ctx, W, H);
  }

  _drawMinimap(ctx, W, H) {
    if (!this.map) return;
    const MM_TILE = 3;
    const mmW = this.map.cols * MM_TILE;
    const mmH = this.map.rows * MM_TILE;
    const mmX = W - mmW - 10;
    const mmY = 10;

    // Background
    ctx.fillStyle = "rgba(0,0,0,0.55)";
    ctx.fillRect(mmX - 3, mmY - 3, mmW + 6, mmH + 6);

    // Tiles
    for (let row = 0; row < this.map.rows; row++) {
      for (let col = 0; col < this.map.cols; col++) {
        const tid   = this.map.tiles[row][col];
        const props = TILE_PROPS[tid];
        ctx.fillStyle = props.color;
        ctx.fillRect(mmX + col * MM_TILE, mmY + row * MM_TILE, MM_TILE, MM_TILE);
      }
    }

    // Player dot on minimap
    ctx.fillStyle = "#ffd700";
    ctx.fillRect(
      mmX + this.px * MM_TILE - 1,
      mmY + this.py * MM_TILE - 1,
      MM_TILE + 2, MM_TILE + 2
    );

    // Viewport rect
    const visW = Math.ceil(W / TILE_SIZE);
    const visH = Math.ceil(H / TILE_SIZE);
    ctx.strokeStyle = "rgba(255,255,255,0.5)";
    ctx.lineWidth = 1;
    ctx.strokeRect(
      mmX + this.camX * MM_TILE,
      mmY + this.camY * MM_TILE,
      visW * MM_TILE, visH * MM_TILE
    );
  }

  // ── Input ──────────────────────────────────────────────────────

  _bindKeys() {
    this._keyHandler = (e) => {
      if (KEYS[e.key]) {
        e.preventDefault();
        this._keysDown.add(e.key);
        // Immediate step on first press
        if (this._stepTimer === 0 || this._stepTimer >= this._stepDelay) {
          this._stepTimer = this._stepDelay;
        }
      }
      // Space/Enter = interact with NPC in facing tile
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        if (!this.locked) this._interact();
      }
    };
    this._keyUpHandler = (e) => {
      this._keysDown.delete(e.key);
      if ([...this._keysDown].every((k) => !KEYS[k])) {
        this._stepTimer = 0;
      }
    };
    window.addEventListener("keydown", this._keyHandler);
    window.addEventListener("keyup",   this._keyUpHandler);
  }

  _unbindKeys() {
    if (this._keyHandler)   window.removeEventListener("keydown", this._keyHandler);
    if (this._keyUpHandler) window.removeEventListener("keyup",   this._keyUpHandler);
    this._keysDown.clear();
  }

  /** Try to interact with whatever is in the facing direction. */
  _interact() {
    const { dx, dy } = DIR_DELTA[this.facing] || DIR_DELTA.down;
    const tx = this.px + dx;
    const ty = this.py + dy;

    const npc    = findNpc(this.map, tx, ty);
    const shrine = findShrine(this.map, tx, ty);
    const portal = findPortal(this.map, this.px, this.py);

    if (npc)    { this.lock(); this.onNpcTalk(npc);   return; }
    if (shrine) { this.lock(); this.onShrine(shrine); return; }
    if (portal) { this.lock(); this.onPortal(portal); return; }
  }

  // ── Touch / mobile d-pad support ──────────────────────────────

  handleDpadPress(dir) {
    if (!this.locked) this._tryMove(dir);
  }
}
