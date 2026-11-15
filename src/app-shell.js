/**
 * 2.5D Anime / Barbie Princess Castle Dressing Room — App Shell
 * Integrates:
 *   - window.DOLL_RIG, window.MAKEUP_DATA, window.applyDollMakeup (src/doll-makeup.js)
 *   - window.WARDROBE_HAIR_HATS (src/wardrobe-hair.js)
 *   - window.WARDROBE_TOPS (src/wardrobe-tops.js)
 *   - window.WARDROBE_BOTTOMS (src/wardrobe-bottoms.js)
 *   - window.WARDROBE_SHOES (src/wardrobe-shoes.js)
 *   - window.SOUND_FX, window.NAIL_SALON, window.STAGE_SHOW (src/nails-stage.js)
 *
 * Exports: window.APP_SHELL_CSS, window.APP_SHELL
 */
(function (global) {
  'use strict';

  var STORAGE_KEY = 'cong_chua_25d_state_v1';

  var APP_SHELL_CSS = `
    *, *::before, *::after {
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
    }

    :root {
      --app-height: 100vh;
    }

    :root, html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      min-height: 100vh;
      min-height: -webkit-fill-available;
      min-height: var(--app-height, 100vh);
      height: var(--app-height, 100vh);
      overflow: hidden;
      overscroll-behavior: none;
      background-color: #ebd6ff;
      background-image: linear-gradient(170deg, #ffe8f6 0%, #f8d8ff 48%, #d9e9ff 100%);
      background-attachment: fixed;
      font-family: 'SF Pro Rounded', 'Nunito', 'Quicksand', 'Hiragino Maru Gothic ProN', 'Segoe UI', system-ui, -apple-system, sans-serif;
      color: #5c1946;
      user-select: none;
      -webkit-user-select: none;
      -webkit-touch-callout: none;
    }

    #app {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100vw;
      height: var(--app-height, 100vh);
      min-height: var(--app-height, 100vh);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      padding: max(8px, env(safe-area-inset-top)) max(12px, env(safe-area-inset-right)) max(10px, env(safe-area-inset-bottom)) max(12px, env(safe-area-inset-left));
      gap: 8px;
    }

    /* ==================== DREAMY 2.5D PRINCESS CASTLE BACKDROP ==================== */
    .castle-backdrop {
      position: fixed;
      inset: -40px;
      z-index: 0;
      pointer-events: none;
      overflow: hidden;
      background:
        radial-gradient(circle at 50% 18%, rgba(255, 255, 255, 0.85) 0%, rgba(255, 224, 244, 0.45) 38%, transparent 72%),
        radial-gradient(circle at 15% 82%, rgba(255, 182, 226, 0.55) 0%, transparent 50%),
        radial-gradient(circle at 86% 78%, rgba(196, 181, 253, 0.52) 0%, transparent 50%),
        linear-gradient(170deg, #ffe8f6 0%, #f8d8ff 48%, #d9e9ff 100%);
    }

    .castle-silhouette-svg {
      position: absolute;
      bottom: -2%;
      left: 50%;
      transform: translateX(-50%);
      width: min(1200px, 118vw);
      height: auto;
      opacity: 0.42;
      filter: drop-shadow(0 -8px 24px rgba(255, 140, 205, 0.35));
    }

    .ambient-orb {
      position: absolute;
      border-radius: 999px;
      background: radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.92), rgba(255, 194, 232, 0.35) 60%, transparent 75%);
      animation: ambientFloat var(--dur, 7s) ease-in-out infinite alternate;
      opacity: 0.65;
    }

    @keyframes ambientFloat {
      0% { transform: translateY(0px) scale(0.96); }
      100% { transform: translateY(-18px) scale(1.06); }
    }

    /* ==================== TOP QUICK-ACTION PILL BAR ==================== */
    .top-action-bar {
      position: relative;
      z-index: 30;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      flex: 0 0 auto;
      min-height: 46px;
    }

    .brand-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      border-radius: 999px;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 229, 245, 0.9) 100%);
      border: 2.5px solid #ffffff;
      box-shadow: 0 4px 0 #f598ca, 0 8px 18px rgba(220, 75, 155, 0.2);
      font-size: clamp(14px, 2vw, 18px);
      font-weight: 800;
      color: #b51d73;
      letter-spacing: 0.01em;
    }

    .quick-pills {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      justify-content: flex-end;
    }

    .pill-btn {
      appearance: none;
      border: 2.5px solid #ffffff;
      border-radius: 999px;
      padding: 7px 14px;
      min-height: 42px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-family: inherit;
      font-size: clamp(13px, 1.6vw, 15px);
      font-weight: 800;
      color: #7c1854;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      background: linear-gradient(180deg, #ffffff 0%, #ffe3f3 58%, #ffc5e5 100%);
      box-shadow: 0 4px 0 #ea81ba, 0 8px 16px rgba(210, 68, 145, 0.22);
      transition: transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.18s ease;
    }

    .pill-btn:hover {
      transform: translateY(-2px) scale(1.03);
    }

    .pill-btn:active {
      transform: translateY(2px) scale(0.96);
      box-shadow: 0 2px 0 #ea81ba, 0 4px 8px rgba(210, 68, 145, 0.18);
    }

    .pill-btn.pill-magic {
      background: linear-gradient(180deg, #fffdf0 0%, #ffe8a3 55%, #ffc75f 100%);
      color: #78350f;
      box-shadow: 0 4px 0 #d98218, 0 8px 16px rgba(217, 130, 24, 0.24);
    }

    .pill-btn.pill-photo {
      background: linear-gradient(180deg, #f3fbff 0%, #c8ecff 55%, #8fd8ff 100%);
      color: #0c4a6e;
      box-shadow: 0 4px 0 #3898d4, 0 8px 16px rgba(56, 152, 212, 0.24);
    }

    .pill-btn.is-muted {
      background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
      color: #475569;
      box-shadow: 0 4px 0 #94a3b8;
    }

    /* ==================== MAIN 3-COLUMN DRESSING ROOM GRID ==================== */
    .dressing-room-grid {
      position: relative;
      z-index: 10;
      flex: 1 1 auto;
      min-height: 0;
      display: grid;
      grid-template-columns: minmax(136px, 196px) minmax(240px, 1fr) minmax(210px, 295px);
      align-items: stretch;
      gap: clamp(8px, 1.4vw, 18px);
    }

    /* ==================== LEFT PANEL: 3 TACTILE 2.5D ACTION BUTTONS ==================== */
    .left-panel {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: clamp(12px, 2.2vh, 22px);
      padding: 4px 2px;
      z-index: 25;
    }

    .action-btn-25d {
      appearance: none;
      width: 100%;
      border: 3.5px solid rgba(255, 255, 255, 0.96);
      border-radius: 28px;
      padding: clamp(12px, 1.8vh, 18px) 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      font-family: inherit;
      color: #ffffff;
      text-shadow: 0 2px 4px rgba(108, 12, 68, 0.35);
      transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease, filter 0.2s ease;
    }

    .action-btn-25d::before {
      content: '';
      position: absolute;
      top: 4px;
      left: 10%;
      right: 10%;
      height: 42%;
      border-radius: 999px;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.68) 0%, rgba(255, 255, 255, 0.08) 100%);
      pointer-events: none;
    }

    .action-btn-25d:hover {
      transform: translateY(-3px) scale(1.04);
    }

    .action-btn-25d:active {
      transform: translateY(4px) scale(0.95);
    }

    .action-btn-makeup {
      background: linear-gradient(180deg, #ff9fd2 0%, #ff58aa 52%, #e02482 100%);
      box-shadow: 0 8px 0 #ab115e, 0 14px 26px rgba(224, 36, 130, 0.36);
    }

    .action-btn-makeup.active {
      transform: scale(1.05);
      box-shadow: 0 8px 0 #ab115e, 0 0 0 5px rgba(255, 255, 255, 0.92), 0 0 28px rgba(255, 77, 166, 0.72);
    }

    .action-btn-nails {
      background: linear-gradient(180deg, #d7b4ff 0%, #a864ff 52%, #7c3aed 100%);
      box-shadow: 0 8px 0 #5b21b6, 0 14px 26px rgba(124, 58, 237, 0.34);
    }

    .action-btn-show {
      background: linear-gradient(180deg, #ffe07d 0%, #ff8d4d 54%, #f43f7d 100%);
      box-shadow: 0 8px 0 #be185d, 0 14px 26px rgba(244, 63, 125, 0.38);
    }

    .action-btn-icon {
      font-size: clamp(30px, 4.2vw, 44px);
      line-height: 1;
      filter: drop-shadow(0 3px 4px rgba(0, 0, 0, 0.18));
      position: relative;
      z-index: 1;
    }

    .action-btn-label {
      font-size: clamp(14px, 1.8vw, 19px);
      font-weight: 900;
      line-height: 1.15;
      text-align: center;
      position: relative;
      z-index: 1;
    }

    /* ==================== CENTER STAGE: CRYSTAL MIRROR & PRINCESS ==================== */
    .center-stage {
      position: relative;
      min-height: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2px;
    }

    .mirror-frame {
      position: relative;
      width: 100%;
      height: 100%;
      max-width: 540px;
      border-radius: 44% 44% 34px 34px / 22% 22% 34px 34px;
      padding: 10px;
      background: linear-gradient(145deg, #ffffff 0%, #ffd3ec 28%, #f4c6ff 55%, #ffffff 80%, #ffd8ee 100%);
      box-shadow:
        0 14px 38px rgba(190, 62, 136, 0.25),
        inset 0 3px 8px rgba(255, 255, 255, 0.95),
        inset 0 -6px 14px rgba(217, 102, 173, 0.28);
      display: flex;
      flex-direction: column;
    }

    .mirror-crown-ornament {
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 6;
      font-size: 28px;
      filter: drop-shadow(0 3px 6px rgba(186, 62, 132, 0.35));
      pointer-events: none;
    }

    .mirror-viewport {
      position: relative;
      flex: 1 1 auto;
      min-height: 0;
      width: 100%;
      border-radius: 42% 42% 26px 26px / 20% 20% 26px 26px;
      overflow: hidden;
      background:
        radial-gradient(ellipse at 50% 28%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 232, 246, 0.85) 45%, rgba(235, 214, 255, 0.82) 100%);
      border: 3px solid rgba(255, 255, 255, 0.9);
      box-shadow: inset 0 0 32px rgba(255, 168, 220, 0.38);
      display: flex;
      align-items: center;
      justify-content: center;
      touch-action: pan-y;
      container-type: size;
    }

    .princess-aspect-stage {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    @supports (width: 1cqw) {
      .princess-aspect-stage {
        width: min(100cqw, calc(100cqh * 600 / 950));
        height: min(100cqh, calc(100cqw * 950 / 600));
      }
    }

    .mirror-glint {
      position: absolute;
      inset: 0;
      background: linear-gradient(122deg, rgba(255, 255, 255, 0.42) 0%, rgba(255, 255, 255, 0.08) 26%, transparent 45%);
      pointer-events: none;
      z-index: 4;
    }

    .crystal-pedestal {
      position: absolute;
      bottom: 3%;
      left: 50%;
      transform: translateX(-50%);
      width: 72%;
      height: 7.4%;
      min-height: 36px;
      z-index: 1;
      pointer-events: none;
    }

    .pedestal-glow {
      position: absolute;
      inset: -12px -18px;
      border-radius: 50%;
      background: radial-gradient(ellipse at center, rgba(255, 117, 195, 0.55) 0%, rgba(192, 132, 252, 0.3) 45%, transparent 72%);
      animation: pedestalPulse 3s ease-in-out infinite alternate;
    }

    .pedestal-top {
      position: absolute;
      inset: 4px 10px 14px 10px;
      border-radius: 50%;
      background: linear-gradient(180deg, #ffffff 0%, #ffd1ec 48%, #f49fd3 100%);
      border: 2.5px solid #ffffff;
      box-shadow: 0 6px 0 #dc74b6, 0 12px 24px rgba(190, 48, 128, 0.35);
    }

    .pedestal-rim {
      position: absolute;
      bottom: 4px;
      left: 24px;
      right: 24px;
      height: 16px;
      border-radius: 0 0 50% 50%;
      background: linear-gradient(90deg, #c084fc, #ff7eb9, #fde047, #7dd3fc, #ff7eb9);
      opacity: 0.72;
    }

    @keyframes pedestalPulse {
      0% { transform: scale(0.95); opacity: 0.7; }
      100% { transform: scale(1.06); opacity: 1; }
    }

    .princess-zoom-layer {
      position: relative;
      z-index: 2;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      transform-origin: center center;
      transform: scale(1) translateY(0);
      transition: transform 0.55s cubic-bezier(0.34, 1.45, 0.64, 1);
      will-change: transform;
    }

    .princess-zoom-layer.makeup-zoom {
      transform: scale(1.85) translateY(20%);
    }

    .princess-breath {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4px 2px 4px 2px;
      animation: princessBreath 3.5s ease-in-out infinite;
    }

    .princess-zoom-layer.makeup-zoom .princess-breath {
      animation-play-state: paused;
    }

    @keyframes princessBreath {
      0%, 100% { transform: translateY(0px) scale(1); }
      50% { transform: translateY(-4px) scale(1.007); }
    }

    #princess-svg {
      width: 100%;
      height: 100%;
      max-height: 100%;
      max-width: 100%;
      filter: drop-shadow(0 12px 20px rgba(155, 36, 108, 0.18));
      overflow: visible;
    }

    .doll-fx-layer {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 7;
      overflow: hidden;
    }

    .fx-sparkle {
      position: absolute;
      font-size: 20px;
      line-height: 1;
      pointer-events: none;
      animation: fxSparkleBurst 0.78s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }

    @keyframes fxSparkleBurst {
      0% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(0.3) rotate(0deg);
      }
      55% {
        opacity: 1;
        transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(1.25) rotate(110deg);
      }
      100% {
        opacity: 0;
        transform: translate(calc(-50% + var(--tx) * 1.35), calc(-50% + var(--ty) * 1.35 - 12px)) scale(0.45) rotate(190deg);
      }
    }

    .camera-flash {
      position: absolute;
      inset: 0;
      background: #ffffff;
      opacity: 0;
      pointer-events: none;
      z-index: 9;
    }

    .camera-flash.flash {
      animation: cameraFlashAnim 0.45s ease-out;
    }

    @keyframes cameraFlashAnim {
      0% { opacity: 0.92; }
      100% { opacity: 0; }
    }

    .swipe-zone-toast {
      position: absolute;
      bottom: 64px;
      left: 50%;
      transform: translateX(-50%) translateY(10px);
      z-index: 8;
      padding: 6px 14px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.92);
      border: 2px solid #ff99d0;
      box-shadow: 0 6px 16px rgba(190, 48, 128, 0.25);
      font-size: 14px;
      font-weight: 800;
      color: #a81566;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.22s ease, transform 0.22s ease;
    }

    .swipe-zone-toast.show {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }

    .center-swipe-hint {
      position: absolute;
      bottom: 6px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 5;
      font-size: 12px;
      font-weight: 800;
      color: #9e296c;
      background: rgba(255, 255, 255, 0.78);
      padding: 3px 12px;
      border-radius: 999px;
      border: 1.5px solid rgba(255, 255, 255, 0.95);
      pointer-events: none;
      white-space: nowrap;
    }

    /* ==================== FLOATING MAKEUP TRAY (WHEN HEART CLICKED) ==================== */
    .makeup-tray {
      position: fixed;
      left: 50%;
      bottom: max(12px, env(safe-area-inset-bottom));
      transform: translateX(-50%) translateY(28px) scale(0.95);
      width: min(560px, calc(100vw - 24px));
      max-height: 45dvh;
      max-height: 45vh;
      z-index: 80;
      border-radius: 28px;
      padding: 12px 14px 14px;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.96) 0%, rgba(255, 232, 246, 0.95) 100%);
      border: 3.5px solid #ffffff;
      box-shadow: 0 10px 0 #f28fc4, 0 20px 44px rgba(176, 30, 108, 0.35);
      backdrop-filter: blur(12px);
      display: flex;
      flex-direction: column;
      gap: 10px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.28s ease, transform 0.34s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    @supports (max-height: 45dvh) {
      .makeup-tray {
        max-height: 45dvh;
      }
    }

    .makeup-tray.open {
      opacity: 1;
      pointer-events: auto;
      transform: translateX(-50%) translateY(0) scale(1);
    }

    .makeup-tray-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    .makeup-tabs {
      display: flex;
      align-items: center;
      gap: 6px;
      flex: 1 1 auto;
      overflow-x: auto;
      padding: 2px;
      scrollbar-width: none;
    }

    .makeup-tabs::-webkit-scrollbar {
      display: none;
    }

    .makeup-tab-btn {
      appearance: none;
      flex: 1 1 0;
      min-width: 84px;
      border: 2.5px solid #ffffff;
      border-radius: 18px;
      padding: 7px 8px;
      background: linear-gradient(180deg, #fff5fb 0%, #ffd9ee 100%);
      box-shadow: 0 3px 0 #ed98c6;
      font-family: inherit;
      font-size: clamp(12px, 1.4vw, 14px);
      font-weight: 800;
      color: #8f1d5c;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      cursor: pointer;
      transition: transform 0.16s ease, background 0.16s ease;
    }

    .makeup-tab-btn.active {
      background: linear-gradient(180deg, #ff7ec3 0%, #f43b98 100%);
      color: #ffffff;
      box-shadow: 0 3px 0 #b31263;
      transform: translateY(-2px);
    }

    .makeup-tab-icon {
      font-size: 20px;
      line-height: 1;
    }

    .makeup-done-btn {
      appearance: none;
      flex: 0 0 auto;
      border: 3px solid #ffffff;
      border-radius: 20px;
      padding: 10px 18px;
      background: linear-gradient(180deg, #6ef2b8 0%, #10b981 100%);
      box-shadow: 0 4px 0 #047857, 0 8px 16px rgba(16, 185, 129, 0.3);
      font-family: inherit;
      font-size: 16px;
      font-weight: 900;
      color: #ffffff;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
      cursor: pointer;
      transition: transform 0.16s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .makeup-done-btn:hover {
      transform: scale(1.05);
    }

    .makeup-done-btn:active {
      transform: scale(0.95);
    }

    .makeup-swatches-grid {
      display: grid;
      grid-template-columns: repeat(6, minmax(0, 1fr));
      gap: 8px;
      overflow-y: auto;
      padding: 4px 2px 2px;
    }

    .makeup-swatch {
      appearance: none;
      border: 2.5px solid #ffffff;
      border-radius: 18px;
      padding: 6px 4px;
      background: rgba(255, 255, 255, 0.76);
      box-shadow: 0 3px 8px rgba(180, 60, 130, 0.14);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      cursor: pointer;
      transition: transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.18s ease;
    }

    .makeup-swatch:hover {
      transform: translateY(-2px) scale(1.05);
    }

    .makeup-swatch.selected {
      background: #ffffff;
      border-color: #ff3b9a;
      box-shadow: 0 0 0 3px rgba(255, 59, 154, 0.32), 0 6px 14px rgba(255, 59, 154, 0.28);
      transform: scale(1.06);
    }

    .swatch-orb {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      border: 2.5px solid #ffffff;
      box-shadow: inset 0 -4px 8px rgba(0, 0, 0, 0.16), 0 3px 8px rgba(0, 0, 0, 0.14);
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .swatch-orb::after {
      content: '';
      position: absolute;
      top: 4px;
      left: 7px;
      width: 14px;
      height: 7px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.68);
      transform: rotate(-20deg);
      pointer-events: none;
    }

    .swatch-name {
      font-size: 11px;
      font-weight: 800;
      color: #6b1d4c;
      text-align: center;
      line-height: 1.15;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* ==================== RIGHT PANEL: 4 SWIPEABLE WARDROBE DRAWERS ==================== */
    .right-panel {
      display: grid;
      grid-template-rows: repeat(4, minmax(0, 1fr));
      gap: clamp(6px, 1vh, 10px);
      min-height: 0;
      z-index: 25;
    }

    .wardrobe-card {
      position: relative;
      min-height: 0;
      border-radius: 20px;
      border: 2.5px solid rgba(255, 255, 255, 0.96);
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.94) 0%, rgba(255, 232, 246, 0.9) 100%);
      box-shadow: 0 5px 0 #eb9bc8, 0 10px 20px rgba(190, 56, 132, 0.2);
      padding: 6px 9px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      transition: transform 0.18s ease, box-shadow 0.18s ease;
    }

    .wardrobe-card.is-swiping {
      box-shadow: 0 5px 0 #ff69b4, 0 0 0 3px rgba(255, 105, 180, 0.35), 0 14px 28px rgba(255, 77, 166, 0.28);
    }

    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
      flex: 0 0 auto;
    }

    .card-title {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: clamp(12px, 1.35vw, 14.5px);
      font-weight: 900;
      color: #8f1659;
    }

    .card-counter {
      font-size: 12px;
      font-weight: 900;
      color: #ffffff;
      background: linear-gradient(180deg, #ff7bc0 0%, #ea3a95 100%);
      padding: 1.5px 8px;
      border-radius: 999px;
      border: 1.5px solid #ffffff;
      box-shadow: 0 2px 5px rgba(234, 58, 149, 0.3);
    }

    .card-swipe-stage {
      position: relative;
      flex: 1 1 auto;
      min-height: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 4px;
      touch-action: pan-y;
      cursor: grab;
    }

    .card-swipe-stage:active {
      cursor: grabbing;
    }

    .card-arrow {
      appearance: none;
      flex: 0 0 auto;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      border: 2.5px solid #ffffff;
      background: linear-gradient(180deg, #ffffff 0%, #ffd5ec 100%);
      box-shadow: 0 3px 0 #e686bc, 0 6px 12px rgba(190, 56, 132, 0.2);
      color: #b51870;
      font-family: inherit;
      font-size: 17px;
      font-weight: 900;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 4;
      transition: transform 0.16s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .card-arrow:hover {
      transform: scale(1.1);
    }

    .card-arrow:active {
      transform: translateY(2px) scale(0.92);
    }

    .card-preview-window {
      position: relative;
      flex: 1 1 auto;
      height: 100%;
      min-height: 0;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 16px;
      background: radial-gradient(circle at center, rgba(255, 255, 255, 0.92) 0%, rgba(255, 228, 245, 0.45) 75%);
      border: 1.5px dashed rgba(244, 114, 182, 0.35);
    }

    .card-preview-track {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 3px;
      will-change: transform, opacity;
      transition: transform 0.26s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease;
    }

    .card-preview-track.dragging {
      transition: none;
    }

    .wardrobe-thumb-svg {
      width: 100%;
      height: 100%;
      max-width: 100%;
      max-height: 100%;
      filter: drop-shadow(0 4px 8px rgba(168, 42, 112, 0.16));
      pointer-events: none;
    }

    .card-footer {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding-top: 1px;
    }

    .card-item-name {
      font-size: clamp(11px, 1.2vw, 13px);
      font-weight: 800;
      color: #691b49;
      text-align: center;
      line-height: 1.2;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }

    /* ==================== RESPONSIVE TABLET & MOBILE TUNING ==================== */
    @media (max-width: 900px) {
      .dressing-room-grid {
        grid-template-columns: minmax(108px, 142px) minmax(180px, 1fr) minmax(170px, 224px);
        gap: 8px;
      }

      .action-btn-25d {
        border-radius: 22px;
        padding: 10px 6px;
      }

      .right-panel {
        gap: 6px;
      }

      .wardrobe-card {
        border-radius: 18px;
        padding: 5px 8px;
      }

      .card-title {
        font-size: 12px;
      }

      .card-counter {
        font-size: 11px;
        padding: 1px 7px;
      }

      .card-arrow {
        width: 30px;
        height: 30px;
        font-size: 15px;
      }

      .card-item-name {
        font-size: 11px;
      }

      .makeup-swatches-grid {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }
    }

    @media (max-width: 600px) {
      #app {
        padding: 6px;
        gap: 6px;
      }

      .brand-badge {
        padding: 5px 10px;
        font-size: 13px;
      }

      .pill-btn {
        padding: 5px 10px;
        min-height: 36px;
        font-size: 12px;
      }

      .dressing-room-grid {
        grid-template-columns: 82px 1fr 126px;
        gap: 6px;
      }

      .action-btn-25d {
        border-radius: 18px;
        padding: 8px 4px;
        border-width: 2.5px;
      }

      .action-btn-icon {
        font-size: 26px;
      }

      .action-btn-label {
        font-size: 12px;
      }

      .right-panel {
        gap: 5px;
      }

      .wardrobe-card {
        border-radius: 15px;
        padding: 4px 5px;
        border-width: 2px;
        box-shadow: 0 4px 0 #eb9bc8, 0 6px 12px rgba(190, 56, 132, 0.18);
      }

      .card-title {
        font-size: 10.5px;
        gap: 3px;
      }

      .card-counter {
        font-size: 10px;
        padding: 1px 5px;
      }

      .card-arrow {
        width: 24px;
        height: 24px;
        font-size: 13px;
        border-width: 2px;
      }

      .card-preview-window {
        border-radius: 12px;
      }

      .card-preview-track {
        padding: 2px;
      }

      .card-footer {
        padding-top: 0;
      }

      .card-item-name {
        font-size: 10px;
      }

      .center-swipe-hint {
        font-size: 10.5px;
        padding: 2px 8px;
      }

      .makeup-tray {
        width: calc(100vw - 12px);
        padding: 10px;
      }

      .makeup-swatches-grid {
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 6px;
      }

      .swatch-orb {
        width: 34px;
        height: 34px;
      }
    }
  `;

  function ensureAppShellStyles() {
    if (typeof document === 'undefined' || !document.head) return;
    if (document.getElementById('app-shell-styles')) return;
    var style = document.createElement('style');
    style.id = 'app-shell-styles';
    style.textContent = APP_SHELL_CSS;
    document.head.appendChild(style);
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /**
   * Rewrites every SVG id="..." and url(#...)/href="#..." inside a fragment
   * so wardrobe thumbnail cards NEVER collide with #princess-svg IDs.
   */
  function scopeSvgIds(svgMarkup, prefix) {
    if (!svgMarkup) return '';
    var idSet = {};
    var idRegex = /\bid\s*=\s*(["'])([^"']+)\1/g;
    var m;
    while ((m = idRegex.exec(svgMarkup)) !== null) {
      idSet[m[2]] = prefix + m[2];
    }

    var out = svgMarkup.replace(/\bid\s*=\s*(["'])([^"']+)\1/g, function (_all, q, oldId) {
      return 'id=' + q + (idSet[oldId] || prefix + oldId) + q;
    });

    out = out.replace(/url\(\s*#([^)\s"']+)\s*\)/g, function (all, refId) {
      return idSet[refId] ? 'url(#' + idSet[refId] + ')' : all;
    });

    out = out.replace(/\b(xlink:href|href)\s*=\s*(["'])#([^"']+)\2/g, function (all, attr, q, refId) {
      return idSet[refId] ? attr + '=' + q + '#' + idSet[refId] + q : all;
    });

    return out;
  }

  /**
   * Generates a 192x192 & 512x512 Princess Crown PNG icon via Canvas and
   * updates <link rel="apple-touch-icon"> and inline Data-URI <link rel="manifest">.
   */
  function renderCrownIconPng(size) {
    if (typeof document === 'undefined') return '';
    try {
      var canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      var ctx = canvas.getContext('2d');
      if (!ctx) return '';

      var r = size * 0.22;
      ctx.beginPath();
      ctx.moveTo(r, 0);
      ctx.lineTo(size - r, 0);
      ctx.quadraticCurveTo(size, 0, size, r);
      ctx.lineTo(size, size - r);
      ctx.quadraticCurveTo(size, size, size - r, size);
      ctx.lineTo(r, size);
      ctx.quadraticCurveTo(0, size, 0, size - r);
      ctx.lineTo(0, r);
      ctx.quadraticCurveTo(0, 0, r, 0);
      ctx.closePath();
      ctx.clip();

      // Dreamy Barbie pink-lavender gradient background
      var bg = ctx.createLinearGradient(0, 0, size, size);
      bg.addColorStop(0, '#ff9ed4');
      bg.addColorStop(0.52, '#ff4da6');
      bg.addColorStop(1, '#a855f7');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, size, size);

      // Soft top radial glow
      var glow = ctx.createRadialGradient(size * 0.45, size * 0.3, size * 0.05, size * 0.5, size * 0.5, size * 0.65);
      glow.addColorStop(0, 'rgba(255,255,255,0.48)');
      glow.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, size, size);

      // Decorative 4-point stars
      function drawStar(cx, cy, sr, col) {
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.moveTo(cx, cy - sr);
        ctx.quadraticCurveTo(cx, cy, cx + sr, cy);
        ctx.quadraticCurveTo(cx, cy, cx, cy + sr);
        ctx.quadraticCurveTo(cx, cy, cx - sr, cy);
        ctx.quadraticCurveTo(cx, cy, cx, cy - sr);
        ctx.fill();
      }
      drawStar(size * 0.2, size * 0.22, size * 0.06, '#ffffff');
      drawStar(size * 0.82, size * 0.24, size * 0.05, '#fef08a');
      drawStar(size * 0.18, size * 0.78, size * 0.04, '#ffe4f2');
      drawStar(size * 0.84, size * 0.76, size * 0.055, '#ffffff');

      // 2.5D Golden Princess Crown
      var gold = ctx.createLinearGradient(size * 0.2, size * 0.3, size * 0.8, size * 0.75);
      gold.addColorStop(0, '#fff9c4');
      gold.addColorStop(0.45, '#fde047');
      gold.addColorStop(1, '#d97706');

      ctx.save();
      ctx.shadowColor = 'rgba(130, 12, 82, 0.38)';
      ctx.shadowBlur = size * 0.06;
      ctx.shadowOffsetY = size * 0.03;

      ctx.beginPath();
      ctx.moveTo(size * 0.22, size * 0.68);
      ctx.lineTo(size * 0.17, size * 0.36);
      ctx.lineTo(size * 0.35, size * 0.50);
      ctx.lineTo(size * 0.50, size * 0.26);
      ctx.lineTo(size * 0.65, size * 0.50);
      ctx.lineTo(size * 0.83, size * 0.36);
      ctx.lineTo(size * 0.78, size * 0.68);
      ctx.closePath();
      ctx.fillStyle = gold;
      ctx.fill();
      ctx.lineWidth = size * 0.02;
      ctx.strokeStyle = '#ffffff';
      ctx.lineJoin = 'round';
      ctx.stroke();

      // Crown Base Band
      ctx.beginPath();
      ctx.roundRect
        ? ctx.roundRect(size * 0.21, size * 0.65, size * 0.58, size * 0.11, size * 0.04)
        : ctx.rect(size * 0.21, size * 0.65, size * 0.58, size * 0.11);
      ctx.fillStyle = gold;
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // Top Pearls
      var pearls = [
        [0.17, 0.35, 0.045],
        [0.50, 0.24, 0.058],
        [0.83, 0.35, 0.045]
      ];
      for (var i = 0; i < pearls.length; i++) {
        ctx.beginPath();
        ctx.arc(size * pearls[i][0], size * pearls[i][1], size * pearls[i][2], 0, Math.PI * 2);
        ctx.fillStyle = '#fff9fc';
        ctx.fill();
        ctx.lineWidth = size * 0.012;
        ctx.strokeStyle = '#fb7185';
        ctx.stroke();
      }

      // Center Pink Heart/Diamond Gem
      ctx.beginPath();
      ctx.moveTo(size * 0.50, size * 0.44);
      ctx.lineTo(size * 0.57, size * 0.53);
      ctx.lineTo(size * 0.50, size * 0.62);
      ctx.lineTo(size * 0.43, size * 0.53);
      ctx.closePath();
      ctx.fillStyle = '#ff2e93';
      ctx.fill();
      ctx.lineWidth = size * 0.015;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      return canvas.toDataURL('image/png');
    } catch (e) {
      return '';
    }
  }

  function setupPwaAssets() {
    if (typeof document === 'undefined' || !document.head) return;
    var icon192 = renderCrownIconPng(192);
    var icon512 = renderCrownIconPng(512);
    if (!icon192) return;

    var appleLink = document.getElementById('apple-touch-icon') || document.querySelector('link[rel="apple-touch-icon"]');
    if (!appleLink) {
      appleLink = document.createElement('link');
      appleLink.id = 'apple-touch-icon';
      appleLink.rel = 'apple-touch-icon';
      document.head.appendChild(appleLink);
    }
    appleLink.setAttribute('sizes', '192x192');
    appleLink.href = icon192;

    var favLink = document.getElementById('app-favicon') || document.querySelector('link[rel="icon"]');
    if (!favLink) {
      favLink = document.createElement('link');
      favLink.id = 'app-favicon';
      favLink.rel = 'icon';
      favLink.type = 'image/png';
      document.head.appendChild(favLink);
    }
    favLink.href = icon192;

    var manifestLink = document.getElementById('app-manifest') || document.querySelector('link[rel="manifest"]');
    if (!manifestLink) {
      manifestLink = document.createElement('link');
      manifestLink.id = 'app-manifest';
      manifestLink.rel = 'manifest';
      document.head.appendChild(manifestLink);
    }

    var isFileProto = Boolean(global.location && global.location.protocol === 'file:');
    var currentHref = manifestLink.getAttribute('href') || '';
    if (isFileProto || !currentHref || currentHref.indexOf('data:') === 0) {
      var manifestObj = {
        name: 'Công Chúa 2.5D - Thời Trang & Trang Điểm',
        short_name: 'Công Chúa 2.5D',
        description: 'Game Thời Trang, Trang Điểm, Làm Móng & Biểu Diễn Công Chúa 2.5D',
        start_url: '.',
        display: 'standalone',
        orientation: 'any',
        background_color: '#ebd6ff',
        theme_color: '#ffe8f6',
        icons: [
          { src: icon192, sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
          { src: icon512 || icon192, sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
        ]
      };
      manifestLink.href = 'data:application/manifest+json;charset=utf-8,' + encodeURIComponent(JSON.stringify(manifestObj));
    }
  }

  function syncViewportHeight() {
    if (typeof document === 'undefined' || !document.documentElement) return;
    var winW = global.innerWidth || document.documentElement.clientWidth || 0;
    var winH = global.innerHeight || document.documentElement.clientHeight || 0;
    if (!winH) return;

    var isStandalone = Boolean(
      (global.navigator && global.navigator.standalone === true) ||
      (global.matchMedia && (
        global.matchMedia('(display-mode: standalone)').matches ||
        global.matchMedia('(display-mode: fullscreen)').matches
      ))
    );

    var targetH = winH;
    var sw = global.screen ? global.screen.width : 0;
    var sh = global.screen ? global.screen.height : 0;
    if (isStandalone && sw && sh) {
      var isLandscape = winW >= winH;
      var expectedScreenH = isLandscape ? Math.min(sw, sh) : Math.max(sw, sh);
      var expectedScreenW = isLandscape ? Math.max(sw, sh) : Math.min(sw, sh);
      var diff = expectedScreenH - winH;
      if (diff > 0 && diff <= 44 && Math.abs(winW - expectedScreenW) <= 16) {
        targetH = expectedScreenH;
      }
    }

    document.documentElement.style.setProperty('--app-height', targetH + 'px');
  }

  function buildCastleBackdropSvg() {
    return (
      '<svg class="castle-silhouette-svg" viewBox="0 0 1200 420" aria-hidden="true">' +
        '<defs>' +
          '<linearGradient id="bg-castle-grad" x1="0%" y1="0%" x2="0%" y2="100%">' +
            '<stop offset="0%" stop-color="#f5a8da"/>' +
            '<stop offset="100%" stop-color="#d8b4fe"/>' +
          '</linearGradient>' +
        '</defs>' +
        '<path d="M0,360 Q140,305 260,340 Q360,290 480,330 Q600,295 720,335 Q860,290 980,338 Q1100,305 1200,348 L1200,420 L0,420 Z" fill="#ffffff" opacity="0.65"/>' +
        '<g fill="url(#bg-castle-grad)">' +
          '<rect x="170" y="210" width="76" height="170" rx="6"/>' +
          '<polygon points="162,212 208,118 254,212"/>' +
          '<rect x="245" y="255" width="125" height="125"/>' +
          '<rect x="370" y="160" width="90" height="220" rx="8"/>' +
          '<polygon points="362,162 415,58 468,162"/>' +
          '<rect x="460" y="215" width="280" height="165"/>' +
          '<rect x="556" y="108" width="88" height="272" rx="8"/>' +
          '<polygon points="546,110 600,14 654,110"/>' +
          '<rect x="740" y="160" width="90" height="220" rx="8"/>' +
          '<polygon points="732,162 785,58 838,162"/>' +
          '<rect x="830" y="255" width="125" height="125"/>' +
          '<rect x="954" y="210" width="76" height="170" rx="6"/>' +
          '<polygon points="946,212 992,118 1038,212"/>' +
        '</g>' +
        '<path d="M565,380 L565,305 Q600,268 635,305 L635,380 Z" fill="#ffe4f5" opacity="0.78"/>' +
        '<circle cx="600" cy="200" r="14" fill="#fff9c4" opacity="0.8"/>' +
        '<circle cx="415" cy="215" r="10" fill="#fff9c4" opacity="0.75"/>' +
        '<circle cx="785" cy="215" r="10" fill="#fff9c4" opacity="0.75"/>' +
      '</svg>'
    );
  }

  function createDefaultState() {
    return {
      hairIdx: 0,
      topIdx: 0,
      bottomIdx: 0,
      shoeIdx: 0,
      makeupOpen: false,
      makeupTab: 'lipstick',
      makeup: {
        lipstick: 0,
        eyeshadow: 0,
        eyeColor: 0,
        blush: 0
      },
      nails: [0, 1, 2, 3, 4].map(function () {
        return { color: '#ff4da6', colorId: 'barbie-pink', pattern: 'glossy', charm: 'none' };
      }),
      muted: false
    };
  }

  function wrapIdx(idx, len) {
    if (!len) return 0;
    return ((idx % len) + len) % len;
  }

  function loadSavedState(hairsLen, topsLen, botsLen, shoesLen, makeupData) {
    var base = createDefaultState();
    try {
      var raw = global.localStorage && global.localStorage.getItem(STORAGE_KEY);
      if (!raw) return base;
      var parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return base;
      if (typeof parsed.hairIdx === 'number') base.hairIdx = wrapIdx(parsed.hairIdx, hairsLen);
      if (typeof parsed.topIdx === 'number') base.topIdx = wrapIdx(parsed.topIdx, topsLen);
      if (typeof parsed.bottomIdx === 'number') base.bottomIdx = wrapIdx(parsed.bottomIdx, botsLen);
      if (typeof parsed.shoeIdx === 'number' && !isNaN(parsed.shoeIdx)) base.shoeIdx = wrapIdx(parsed.shoeIdx, shoesLen);
      var md = makeupData || {};
      if (parsed.makeup && typeof parsed.makeup === 'object') {
        base.makeup.lipstick = wrapIdx(Number(parsed.makeup.lipstick) || 0, (md.lipsticks || []).length || 12);
        base.makeup.eyeshadow = wrapIdx(Number(parsed.makeup.eyeshadow) || 0, (md.eyeshadows || []).length || 12);
        base.makeup.eyeColor = wrapIdx(Number(parsed.makeup.eyeColor) || 0, (md.eyeColors || []).length || 12);
        base.makeup.blush = wrapIdx(Number(parsed.makeup.blush) || 0, (md.blushes || []).length || 12);
      }
      if (Array.isArray(parsed.nails) && parsed.nails.length === 5) {
        base.nails = parsed.nails.map(function (n) {
          return {
            color: (n && n.color) || '#ff4da6',
            colorId: (n && n.colorId) || 'barbie-pink',
            pattern: (n && n.pattern) || 'glossy',
            charm: (n && n.charm) || 'none'
          };
        });
      }
      base.muted = Boolean(parsed.muted);
    } catch (e) {}
    return base;
  }

  function persistState(state) {
    try {
      if (!global.localStorage) return;
      global.localStorage.setItem(STORAGE_KEY, JSON.stringify({
        hairIdx: state.hairIdx,
        topIdx: state.topIdx,
        bottomIdx: state.bottomIdx,
        shoeIdx: state.shoeIdx,
        makeup: state.makeup,
        nails: state.nails,
        muted: state.muted
      }));
    } catch (e) {}
  }

  function initApp() {
    ensureAppShellStyles();
    syncViewportHeight();
    setupPwaAssets();

    if (typeof global.addEventListener === 'function') {
      global.addEventListener('resize', syncViewportHeight, { passive: true });
      global.addEventListener('orientationchange', function () {
        syncViewportHeight();
        setTimeout(syncViewportHeight, 120);
        setTimeout(syncViewportHeight, 350);
      }, { passive: true });
      global.addEventListener('pageshow', syncViewportHeight, { passive: true });
    }
    if (typeof document !== 'undefined' && typeof document.addEventListener === 'function') {
      document.addEventListener('visibilitychange', function () {
        if (!document.hidden) syncViewportHeight();
      });
    }
    setTimeout(syncViewportHeight, 120);

    var rootEl = document.getElementById('app');
    if (!rootEl) {
      rootEl = document.createElement('div');
      rootEl.id = 'app';
      document.body.appendChild(rootEl);
    }

    var DOLL_RIG = global.DOLL_RIG || { defsSvg: '', legsSvg: '', torsoSvg: '', armsSvg: '', headSvg: '' };
    var MAKEUP_DATA = global.MAKEUP_DATA || { lipsticks: [], eyeshadows: [], eyeColors: [], blushes: [] };
    var HAIRS = global.WARDROBE_HAIR_HATS || [];
    var TOPS = global.WARDROBE_TOPS || [];
    var BOTTOMS = global.WARDROBE_BOTTOMS || [];
    var SHOES = global.WARDROBE_SHOES || [];
    var SOUND_FX = global.SOUND_FX || {
      isMuted: false,
      setMuted: function () {},
      toggleMute: function () { return false; },
      onMuteChange: function () {},
      playPop: function () {},
      playChime: function () {},
      playSparkle: function () {},
      playCamera: function () {}
    };

    var state = loadSavedState(HAIRS.length, TOPS.length, BOTTOMS.length, SHOES.length, MAKEUP_DATA);
    if (typeof SOUND_FX.setMuted === 'function') {
      SOUND_FX.setMuted(state.muted);
    }

    // Inject #layer-front-hair-hat inside #rig-head so front bangs & crown move seamlessly with head tilts on stage
    var headSvgWithHairLayer = String(DOLL_RIG.headSvg || '').replace(
      /<\/g>\s*$/,
      '<g id="layer-front-hair-hat"></g></g>'
    );

    // Ambient floating orbs
    var orbsHtml = '';
    var orbSpecs = [
      ['10%', '14%', 34, '6.5s'], ['22%', '74%', 26, '8.2s'],
      ['78%', '18%', 30, '7.4s'], ['88%', '68%', 38, '9.1s'],
      ['48%', '10%', 22, '6.0s'], ['62%', '84%', 28, '7.8s']
    ];
    for (var oi = 0; oi < orbSpecs.length; oi++) {
      var o = orbSpecs[oi];
      orbsHtml += '<span class="ambient-orb" style="left:' + o[0] + ';top:' + o[1] + ';width:' + o[2] + 'px;height:' + o[2] + 'px;--dur:' + o[3] + ';"></span>';
    }

    rootEl.innerHTML =
      '<div class="castle-backdrop">' +
        orbsHtml +
        buildCastleBackdropSvg() +
      '</div>' +

      '<header class="top-action-bar">' +
        '<div class="brand-badge"><span>👑</span><span>Công Chúa 2.5D</span></div>' +
        '<div class="quick-pills">' +
          '<button type="button" id="btn-mute" class="pill-btn' + (state.muted ? ' is-muted' : '') + '" aria-label="Bật hoặc tắt âm thanh">' +
            (state.muted ? '🔇 Tắt Tiếng' : '🔊 Âm Thanh') +
          '</button>' +
          '<button type="button" id="btn-random" class="pill-btn pill-magic">🪄 Ngẫu Nhiên</button>' +
          '<button type="button" id="btn-snapshot" class="pill-btn pill-photo">📸 Chụp Ảnh</button>' +
        '</div>' +
      '</header>' +

      '<main class="dressing-room-grid">' +
        // LEFT SIDE: EXACT 3 BUTTONS TOP -> BOTTOM (Heart Makeup, Hand Nails, Stage Show)
        '<aside id="left-controls" class="left-panel" aria-label="Chức năng chính">' +
          '<button type="button" id="btn-makeup" class="action-btn-25d action-btn-makeup" data-action="makeup" aria-pressed="false">' +
            '<span class="action-btn-icon">❤️</span>' +
            '<span class="action-btn-label">Trang Điểm</span>' +
          '</button>' +
          '<button type="button" id="btn-nails" class="action-btn-25d action-btn-nails" data-action="nails">' +
            '<span class="action-btn-icon">🖐️</span>' +
            '<span class="action-btn-label">Làm Móng</span>' +
          '</button>' +
          '<button type="button" id="btn-show" class="action-btn-25d action-btn-show" data-action="show">' +
            '<span class="action-btn-icon">🌟</span>' +
            '<span class="action-btn-label">Lên Biểu Diễn</span>' +
          '</button>' +
        '</aside>' +

        // CENTER: 2.5D PRINCESS ON CRYSTAL PEDESTAL INSIDE MIRROR FRAME
        '<section id="center-stage" class="center-stage" aria-label="Công Chúa">' +
          '<div class="mirror-frame">' +
            '<div class="mirror-crown-ornament" aria-hidden="true">👑</div>' +
            '<div id="mirror-viewport" class="mirror-viewport">' +
              '<div class="mirror-glint" aria-hidden="true"></div>' +
              '<div class="princess-aspect-stage">' +
                '<div class="crystal-pedestal" aria-hidden="true">' +
                  '<div class="pedestal-glow"></div>' +
                  '<div class="pedestal-top"></div>' +
                  '<div class="pedestal-rim"></div>' +
                '</div>' +
                '<div id="princess-zoom-layer" class="princess-zoom-layer">' +
                  '<div class="princess-breath">' +
                    '<svg id="princess-svg" viewBox="0 0 600 950" xmlns="http://www.w3.org/2000/svg">' +
                      '<defs id="princess-defs"></defs>' +
                      '<g id="layer-back-train"></g>' +
                      '<g id="layer-back-hair"></g>' +
                      (DOLL_RIG.legsSvg || '') +
                      (DOLL_RIG.torsoSvg || '') +
                      '<g id="layer-bottoms"></g>' +
                      '<g id="layer-shoes"><g id="layer-shoe-left"></g><g id="layer-shoe-right"></g></g>' +
                      (DOLL_RIG.armsSvg || '') +
                      '<g id="layer-tops"></g>' +
                      headSvgWithHairLayer +
                    '</svg>' +
                  '</div>' +
                '</div>' +
              '</div>' +
              '<div id="doll-fx-layer" class="doll-fx-layer"></div>' +
              '<div id="camera-flash" class="camera-flash"></div>' +
              '<div id="swipe-zone-toast" class="swipe-zone-toast"></div>' +
              '<div class="center-swipe-hint">👈 Vuốt trái / phải lên Công Chúa để đổi đồ 👉</div>' +
            '</div>' +
          '</div>' +
        '</section>' +

        // RIGHT SIDE: 4 WARDROBE DRAWERS TOP -> BOTTOM (Hair/Hat, Tops, Bottoms, Shoes)
        '<aside id="right-wardrobe" class="right-panel" aria-label="Tủ đồ công chúa">' +
          buildDrawerMarkup('hair', '👑', 'Mũ / Tóc') +
          buildDrawerMarkup('top', '👚', 'Áo') +
          buildDrawerMarkup('bottom', '👗', 'Quần / Váy') +
          buildDrawerMarkup('shoe', '👠', 'Giày') +
        '</aside>' +
      '</main>' +

      // FLOATING MAKEUP TRAY (OPENS WHEN HEART BUTTON CLICKED)
      '<section id="makeup-tray" class="makeup-tray" aria-label="Khay trang điểm" aria-hidden="true">' +
        '<div class="makeup-tray-header">' +
          '<div class="makeup-tabs" role="tablist">' +
            '<button type="button" class="makeup-tab-btn active" data-tab="lipstick" role="tab"><span class="makeup-tab-icon">💄</span><span>Son Môi</span></button>' +
            '<button type="button" class="makeup-tab-btn" data-tab="eyeshadow" role="tab"><span class="makeup-tab-icon">✨</span><span>Phấn Mắt</span></button>' +
            '<button type="button" class="makeup-tab-btn" data-tab="eyeColor" role="tab"><span class="makeup-tab-icon">👁️</span><span>Màu Mắt</span></button>' +
            '<button type="button" class="makeup-tab-btn" data-tab="blush" role="tab"><span class="makeup-tab-icon">🌸</span><span>Má Hồng</span></button>' +
          '</div>' +
          '<button type="button" id="btn-makeup-done" class="makeup-done-btn">✅ Xong</button>' +
        '</div>' +
        '<div id="makeup-swatches-grid" class="makeup-swatches-grid"></div>' +
      '</section>';

    function buildDrawerMarkup(category, icon, title) {
      return (
        '<div id="drawer-' + category + '" class="wardrobe-card" data-category="' + category + '">' +
          '<div class="card-header">' +
            '<span class="card-title"><span>' + icon + '</span><span>' + title + '</span></span>' +
            '<span class="card-counter" data-role="counter">1 / 12</span>' +
          '</div>' +
          '<div class="card-swipe-stage" data-swipe-category="' + category + '">' +
            '<button type="button" class="card-arrow card-arrow-prev" data-dir="-1" aria-label="' + title + ' trước">&lt;</button>' +
            '<div class="card-preview-window">' +
              '<div class="card-preview-track" data-role="track"></div>' +
            '</div>' +
            '<button type="button" class="card-arrow card-arrow-next" data-dir="1" aria-label="' + title + ' tiếp theo">&gt;</button>' +
          '</div>' +
          '<div class="card-footer">' +
            '<span class="card-item-name" data-role="name"></span>' +
          '</div>' +
        '</div>'
      );
    }

    var princessSvg = document.getElementById('princess-svg');
    var princessDefs = document.getElementById('princess-defs');
    var layerBackTrain = document.getElementById('layer-back-train');
    var layerBackHair = document.getElementById('layer-back-hair');
    var layerBottoms = document.getElementById('layer-bottoms');
    var layerShoeLeft = document.getElementById('layer-shoe-left');
    var layerShoeRight = document.getElementById('layer-shoe-right');
    var layerTops = document.getElementById('layer-tops');
    var layerFrontHairHat = document.getElementById('layer-front-hair-hat');
    var zoomLayer = document.getElementById('princess-zoom-layer');
    var mirrorViewport = document.getElementById('mirror-viewport');
    var fxLayer = document.getElementById('doll-fx-layer');
    var flashEl = document.getElementById('camera-flash');
    var toastEl = document.getElementById('swipe-zone-toast');

    var btnMakeup = document.getElementById('btn-makeup');
    var btnNails = document.getElementById('btn-nails');
    var btnShow = document.getElementById('btn-show');
    var btnMute = document.getElementById('btn-mute');
    var btnRandom = document.getElementById('btn-random');
    var btnSnapshot = document.getElementById('btn-snapshot');
    var makeupTray = document.getElementById('makeup-tray');
    var btnMakeupDone = document.getElementById('btn-makeup-done');
    var makeupSwatchesGrid = document.getElementById('makeup-swatches-grid');

    var toastTimer = null;
    function showToast(text) {
      if (!toastEl) return;
      toastEl.textContent = text;
      toastEl.classList.add('show');
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(function () {
        toastEl.classList.remove('show');
      }, 1500);
    }

    function spawnSparkles(xPct, yPct, count) {
      if (!fxLayer) return;
      var emojis = ['✨', '💖', '⭐', '🌸', '💎'];
      var n = count || 9;
      for (var i = 0; i < n; i++) {
        var el = document.createElement('span');
        el.className = 'fx-sparkle';
        el.textContent = emojis[i % emojis.length];
        var angle = (Math.PI * 2 * i) / n + (Math.random() - 0.5) * 0.4;
        var dist = 28 + Math.random() * 58;
        el.style.left = xPct + '%';
        el.style.top = yPct + '%';
        el.style.setProperty('--tx', Math.round(Math.cos(angle) * dist) + 'px');
        el.style.setProperty('--ty', Math.round(Math.sin(angle) * dist - 14) + 'px');
        fxLayer.appendChild(el);
        (function (node) {
          setTimeout(function () {
            if (node.parentNode) node.parentNode.removeChild(node);
          }, 800);
        })(el);
      }
    }

    function applyMakeupAndNails() {
      if (typeof global.applyDollMakeup === 'function') {
        global.applyDollMakeup(state, princessSvg);
      }
      // Ensure rainbow-glitter nail colorId uses the doll rainbow gradient on main SVG
      if (princessSvg && Array.isArray(state.nails)) {
        var hasRainbow = !!princessSvg.querySelector('#doll-nail-rainbow');
        if (hasRainbow) {
          var nailEls = princessSvg.querySelectorAll('.doll-nail');
          for (var i = 0; i < nailEls.length; i++) {
            var idx = parseInt(nailEls[i].getAttribute('data-finger'), 10);
            var nd = state.nails[idx];
            if (nd && nd.colorId === 'rainbow-glitter') {
              nailEls[i].setAttribute('fill', 'url(#doll-nail-rainbow)');
            }
          }
        }
      }
    }

    function renderPrincessOutfit() {
      var hair = HAIRS[state.hairIdx] || { defs: '', backSvg: '', frontSvg: '' };
      var top = TOPS[state.topIdx] || { defs: '', backSvg: '', svg: '' };
      var bottom = BOTTOMS[state.bottomIdx] || { defs: '', backSvg: '', svg: '' };
      var shoe = SHOES[state.shoeIdx] || { defs: '', leftSvg: '', rightSvg: '', svg: '' };

      if (princessDefs) {
        princessDefs.innerHTML =
          (DOLL_RIG.defsSvg || '') +
          (hair.defs || '') +
          (top.defs || '') +
          (bottom.defs || '') +
          (shoe.defs || '');
      }
      if (layerBackTrain) {
        layerBackTrain.innerHTML = (bottom.backSvg || '') + (top.backSvg || '');
      }
      if (layerBackHair) {
        layerBackHair.innerHTML = hair.backSvg || '';
      }
      if (layerBottoms) {
        layerBottoms.innerHTML = bottom.svg || '';
      }
      var defaultShoeLeft = princessSvg ? princessSvg.querySelector('#doll-shoe-left') : null;
      var defaultShoeRight = princessSvg ? princessSvg.querySelector('#doll-shoe-right') : null;
      if (SHOES.length > 0) {
        if (defaultShoeLeft) {
          defaultShoeLeft.setAttribute('display', 'none');
          if (defaultShoeLeft.style) defaultShoeLeft.style.display = 'none';
        }
        if (defaultShoeRight) {
          defaultShoeRight.setAttribute('display', 'none');
          if (defaultShoeRight.style) defaultShoeRight.style.display = 'none';
        }
        if (layerShoeLeft) {
          layerShoeLeft.innerHTML = shoe.leftSvg || shoe.svg || '';
        }
        if (layerShoeRight) {
          layerShoeRight.innerHTML = shoe.rightSvg || '';
        }
      } else {
        if (defaultShoeLeft) {
          if (typeof defaultShoeLeft.removeAttribute === 'function') defaultShoeLeft.removeAttribute('display');
          if (defaultShoeLeft.style) defaultShoeLeft.style.display = '';
        }
        if (defaultShoeRight) {
          if (typeof defaultShoeRight.removeAttribute === 'function') defaultShoeRight.removeAttribute('display');
          if (defaultShoeRight.style) defaultShoeRight.style.display = '';
        }
        if (layerShoeLeft) layerShoeLeft.innerHTML = '';
        if (layerShoeRight) layerShoeRight.innerHTML = '';
      }
      if (layerTops) {
        layerTops.innerHTML = top.svg || '';
      }
      if (layerFrontHairHat) {
        layerFrontHairHat.innerHTML = hair.frontSvg || '';
      }

      applyMakeupAndNails();
    }

    function getCategoryData(category) {
      if (category === 'hair') {
        return { list: HAIRS, key: 'hairIdx', sparkleY: 24, defaultBox: '155 45 290 250' };
      }
      if (category === 'top') {
        return { list: TOPS, key: 'topIdx', sparkleY: 42, defaultBox: '180 295 240 200' };
      }
      if (category === 'shoe') {
        return { list: SHOES, key: 'shoeIdx', sparkleY: 88, defaultBox: '225 775 150 120' };
      }
      return { list: BOTTOMS, key: 'bottomIdx', sparkleY: 66, defaultBox: '100 410 400 455' };
    }

    function renderDrawerCard(category, slideDir) {
      var card = document.getElementById('drawer-' + category);
      if (!card) return;
      var info = getCategoryData(category);
      var list = info.list;
      var idx = wrapIdx(state[info.key], list.length);
      var item = list[idx];
      if (!item) return;

      var counterEl = card.querySelector('[data-role="counter"]');
      var nameEl = card.querySelector('[data-role="name"]');
      var trackEl = card.querySelector('[data-role="track"]');

      if (counterEl) counterEl.textContent = (idx + 1) + ' / ' + list.length;
      if (nameEl) nameEl.textContent = (item.icon ? item.icon + ' ' : '') + item.name;
      if (trackEl) {
        var rawBody;
        if (category === 'hair') {
          rawBody = (item.backSvg || '') + (item.frontSvg || '');
        } else if (category === 'shoe') {
          rawBody = item.svg || ((item.leftSvg || '') + (item.rightSvg || ''));
        } else {
          rawBody = (item.backSvg || '') + (item.svg || '');
        }
        var combined = '<defs>' + (item.defs || '') + '</defs>' + rawBody;
        var scoped = scopeSvgIds(combined, 'thumb-' + category + '-');
        var vb = item.previewBox || info.defaultBox;

        trackEl.classList.add('dragging');
        if (slideDir) {
          trackEl.style.transform = 'translateX(' + (slideDir > 0 ? '48px' : '-48px') + ') scale(0.92)';
          trackEl.style.opacity = '0.25';
        }
        trackEl.innerHTML =
          '<svg class="wardrobe-thumb-svg" viewBox="' + escapeHtml(vb) + '" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
            scoped +
          '</svg>';

        if (slideDir) {
          // Force reflow for crisp slide-in animation
          void trackEl.offsetWidth;
          trackEl.classList.remove('dragging');
          trackEl.style.transform = 'translateX(0) scale(1)';
          trackEl.style.opacity = '1';
        } else {
          trackEl.classList.remove('dragging');
          trackEl.style.transform = 'translateX(0)';
          trackEl.style.opacity = '1';
        }
      }
    }

    function cycleCategory(category, delta, fromCenter) {
      var info = getCategoryData(category);
      if (!info.list.length) return;
      state[info.key] = wrapIdx(state[info.key] + delta, info.list.length);
      var item = info.list[state[info.key]];
      renderPrincessOutfit();
      renderDrawerCard(category, delta);
      persistState(state);
      SOUND_FX.playChime();
      spawnSparkles(50, info.sparkleY, 10);
      if (fromCenter && item) {
        showToast((item.icon ? item.icon + ' ' : '') + item.name);
      }
    }

    // ==================== UNIFIED POINTER + TOUCH SWIPE ENGINE ====================
    function attachSwipeHandler(el, opts) {
      if (!el) return;
      var session = {
        active: false,
        source: null,
        pointerId: null,
        startX: 0,
        startY: 0,
        dx: 0,
        dy: 0,
        locked: null,
        context: null
      };

      function begin(source, clientX, clientY, target, pointerId) {
        if (opts.ignoreTarget && opts.ignoreTarget(target)) return;
        if (opts.canStart && !opts.canStart()) return;
        session.active = true;
        session.source = source;
        session.pointerId = pointerId;
        session.startX = clientX;
        session.startY = clientY;
        session.dx = 0;
        session.dy = 0;
        session.locked = null;
        session.context = opts.getContext ? opts.getContext(clientX, clientY) : null;
        if (opts.onStart) opts.onStart(session);
      }

      function move(source, clientX, clientY, eventObj) {
        if (!session.active || session.source !== source) return;
        session.dx = clientX - session.startX;
        session.dy = clientY - session.startY;
        if (!session.locked && (Math.abs(session.dx) > 6 || Math.abs(session.dy) > 6)) {
          session.locked = Math.abs(session.dx) >= Math.abs(session.dy) * 0.85 ? 'x' : 'y';
        }
        if (session.locked === 'x') {
          if (eventObj && eventObj.cancelable && typeof eventObj.preventDefault === 'function') {
            eventObj.preventDefault();
          }
          if (opts.onMove) opts.onMove(session);
        }
      }

      function end(source, clientX, cancelled) {
        if (!session.active || session.source !== source) return;
        if (!cancelled && typeof clientX === 'number') {
          session.dx = clientX - session.startX;
        }
        var didSwipe = !cancelled && Math.abs(session.dx) >= 30 && session.locked !== 'y';
        if (opts.onEnd) opts.onEnd(session, didSwipe);
        session.active = false;
        session.source = null;
        session.pointerId = null;
        session.locked = null;
      }

      el.addEventListener('pointerdown', function (e) {
        if (e.button !== undefined && e.button !== 0 && e.pointerType === 'mouse') return;
        begin('pointer', e.clientX, e.clientY, e.target, e.pointerId);
        if (session.active && typeof el.setPointerCapture === 'function') {
          try { el.setPointerCapture(e.pointerId); } catch (err) {}
        }
      });

      el.addEventListener('pointermove', function (e) {
        if (session.pointerId !== null && e.pointerId !== session.pointerId) return;
        move('pointer', e.clientX, e.clientY, e);
      });

      el.addEventListener('pointerup', function (e) {
        end('pointer', e.clientX, false);
      });

      el.addEventListener('pointercancel', function (e) {
        end('pointer', e.clientX, true);
      });

      // Touch fallback for synthetic TouchEvent tests or legacy touch browsers
      el.addEventListener('touchstart', function (e) {
        if (session.active) return;
        var t = (e.touches && e.touches[0]) || (e.changedTouches && e.changedTouches[0]);
        if (!t) return;
        begin('touch', t.clientX, t.clientY, e.target, null);
      }, { passive: true });

      el.addEventListener('touchmove', function (e) {
        if (!session.active || session.source !== 'touch') return;
        var t = (e.touches && e.touches[0]) || (e.changedTouches && e.changedTouches[0]);
        if (!t) return;
        move('touch', t.clientX, t.clientY, e);
      }, { passive: false });

      el.addEventListener('touchend', function (e) {
        if (!session.active || session.source !== 'touch') return;
        var t = (e.changedTouches && e.changedTouches[0]) || (e.touches && e.touches[0]);
        end('touch', t ? t.clientX : undefined, false);
      });

      el.addEventListener('touchcancel', function () {
        if (!session.active || session.source !== 'touch') return;
        end('touch', undefined, true);
      });
    }

    // Wire up the 4 Right Wardrobe Drawers (Arrow taps + Swipe)
    ['hair', 'top', 'bottom', 'shoe'].forEach(function (category) {
      var card = document.getElementById('drawer-' + category);
      if (!card) return;
      var stage = card.querySelector('.card-swipe-stage');
      var track = card.querySelector('[data-role="track"]');

      card.querySelectorAll('.card-arrow').forEach(function (arrowBtn) {
        arrowBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          var dir = parseInt(arrowBtn.getAttribute('data-dir'), 10) || 1;
          cycleCategory(category, dir, false);
        });
      });

      attachSwipeHandler(stage, {
        ignoreTarget: function (target) {
          return target && target.closest && !!target.closest('.card-arrow');
        },
        onStart: function () {
          card.classList.add('is-swiping');
        },
        onMove: function (s) {
          if (!track) return;
          track.classList.add('dragging');
          var clamped = Math.max(-90, Math.min(90, s.dx * 0.72));
          track.style.transform = 'translateX(' + clamped.toFixed(1) + 'px) rotate(' + (clamped * 0.05).toFixed(2) + 'deg)';
          track.style.opacity = String(Math.max(0.45, 1 - Math.abs(clamped) / 170));
        },
        onEnd: function (s, didSwipe) {
          card.classList.remove('is-swiping');
          if (didSwipe) {
            var dir = s.dx < 0 ? 1 : -1;
            cycleCategory(category, dir, false);
          } else if (track) {
            track.classList.remove('dragging');
            track.style.transform = 'translateX(0)';
            track.style.opacity = '1';
          }
        }
      });
    });

    // Wire up direct Head / Torso / Skirt / Shoe swipe zones on Center Princess Mirror
    attachSwipeHandler(mirrorViewport, {
      canStart: function () {
        return !state.makeupOpen;
      },
      getContext: function (_x, clientY) {
        var refEl = princessSvg || mirrorViewport;
        var rect = refEl.getBoundingClientRect();
        var relY = rect.height > 0 ? ((clientY - rect.top) / rect.height) * 950 : 400;
        if (relY < 325) return 'hair';
        if (relY < 475) return 'top';
        if (relY < 760) return 'bottom';
        return 'shoe';
      },
      onMove: function (s) {
        if (!princessSvg) return;
        var shift = Math.max(-28, Math.min(28, s.dx * 0.25));
        princessSvg.style.transition = 'none';
        princessSvg.style.transform = 'translateX(' + shift.toFixed(1) + 'px)';
      },
      onEnd: function (s, didSwipe) {
        if (princessSvg) {
          princessSvg.style.transition = 'transform 0.24s cubic-bezier(0.34, 1.56, 0.64, 1)';
          princessSvg.style.transform = '';
        }
        if (didSwipe && s.context) {
          var dir = s.dx < 0 ? 1 : -1;
          cycleCategory(s.context, dir, true);
        }
      }
    });

    // ==================== MAKEUP MODE & FLOATING TRAY ====================
    function buildStickerPreviewSvg(stickerSvg) {
      if (!stickerSvg) {
        return '<span style="font-size:18px;line-height:1;">🌸</span>';
      }
      var isRightCheek = stickerSvg.indexOf('355') !== -1;
      var vb = isRightCheek ? '342 231 26 26' : '232 231 26 26';
      return '<svg viewBox="' + vb + '" width="26" height="26" style="position:relative;z-index:2;">' + stickerSvg + '</svg>';
    }

    function renderMakeupSwatches() {
      if (!makeupSwatchesGrid) return;
      var tab = state.makeupTab || 'lipstick';
      var html = '';

      if (tab === 'lipstick') {
        html = (MAKEUP_DATA.lipsticks || []).map(function (item, idx) {
          var sel = state.makeup.lipstick === idx;
          return (
            '<button type="button" class="makeup-swatch' + (sel ? ' selected' : '') + '" data-tab="lipstick" data-idx="' + idx + '">' +
              '<span class="swatch-orb" style="background:radial-gradient(circle at 35% 30%, ' + (item.highlight || '#ffd6ec') + ' 0%, ' + item.color + ' 72%);"></span>' +
              '<span class="swatch-name">' + escapeHtml(item.name) + '</span>' +
            '</button>'
          );
        }).join('');
      } else if (tab === 'eyeshadow') {
        html = (MAKEUP_DATA.eyeshadows || []).map(function (item, idx) {
          var sel = state.makeup.eyeshadow === idx;
          return (
            '<button type="button" class="makeup-swatch' + (sel ? ' selected' : '') + '" data-tab="eyeshadow" data-idx="' + idx + '">' +
              '<span class="swatch-orb" style="background:radial-gradient(circle at 40% 35%, ' + (item.shimmerColor || '#ffffff') + ' 0%, ' + item.color + ' 75%);"></span>' +
              '<span class="swatch-name">' + escapeHtml(item.name) + '</span>' +
            '</button>'
          );
        }).join('');
      } else if (tab === 'eyeColor') {
        html = (MAKEUP_DATA.eyeColors || []).map(function (item, idx) {
          var sel = state.makeup.eyeColor === idx;
          return (
            '<button type="button" class="makeup-swatch' + (sel ? ' selected' : '') + '" data-tab="eyeColor" data-idx="' + idx + '">' +
              '<span class="swatch-orb" style="background:linear-gradient(180deg, ' + item.topColor + ' 0%, ' + item.midColor + ' 55%, ' + item.botColor + ' 100%);">' +
                '<span style="width:14px;height:16px;border-radius:50%;background:#180c2e;display:block;position:relative;">' +
                  '<span style="width:5px;height:5px;border-radius:50%;background:#fff;position:absolute;top:2px;left:2px;"></span>' +
                '</span>' +
              '</span>' +
              '<span class="swatch-name">' + escapeHtml(item.name) + '</span>' +
            '</button>'
          );
        }).join('');
      } else {
        html = (MAKEUP_DATA.blushes || []).map(function (item, idx) {
          var sel = state.makeup.blush === idx;
          return (
            '<button type="button" class="makeup-swatch' + (sel ? ' selected' : '') + '" data-tab="blush" data-idx="' + idx + '">' +
              '<span class="swatch-orb" style="background:radial-gradient(circle, rgba(255,255,255,0.88) 0%, ' + item.blushColor + ' 88%);">' +
                buildStickerPreviewSvg(item.stickerSvg) +
              '</span>' +
              '<span class="swatch-name">' + escapeHtml(item.stickerName && item.stickerSvg ? item.stickerName : item.name) + '</span>' +
            '</button>'
          );
        }).join('');
      }

      makeupSwatchesGrid.innerHTML = html;
    }

    function openMakeup() {
      state.makeupOpen = true;
      if (zoomLayer) zoomLayer.classList.add('makeup-zoom');
      if (makeupTray) {
        makeupTray.classList.add('open');
        makeupTray.setAttribute('aria-hidden', 'false');
      }
      if (btnMakeup) {
        btnMakeup.classList.add('active');
        btnMakeup.setAttribute('aria-pressed', 'true');
      }
      renderMakeupSwatches();
      SOUND_FX.playPop();
    }

    function closeMakeup() {
      state.makeupOpen = false;
      if (zoomLayer) zoomLayer.classList.remove('makeup-zoom');
      if (makeupTray) {
        makeupTray.classList.remove('open');
        makeupTray.setAttribute('aria-hidden', 'true');
      }
      if (btnMakeup) {
        btnMakeup.classList.remove('active');
        btnMakeup.setAttribute('aria-pressed', 'false');
      }
    }

    if (btnMakeup) {
      btnMakeup.addEventListener('click', function () {
        if (state.makeupOpen) {
          closeMakeup();
          SOUND_FX.playPop();
        } else {
          openMakeup();
        }
      });
    }

    if (btnMakeupDone) {
      btnMakeupDone.addEventListener('click', function () {
        closeMakeup();
        SOUND_FX.playChime();
      });
    }

    if (makeupTray) {
      makeupTray.querySelectorAll('.makeup-tab-btn').forEach(function (tabBtn) {
        tabBtn.addEventListener('click', function () {
          var nextTab = tabBtn.getAttribute('data-tab');
          if (!nextTab) return;
          state.makeupTab = nextTab;
          makeupTray.querySelectorAll('.makeup-tab-btn').forEach(function (b) {
            b.classList.toggle('active', b === tabBtn);
          });
          renderMakeupSwatches();
          SOUND_FX.playPop();
        });
      });

      if (makeupSwatchesGrid) {
        makeupSwatchesGrid.addEventListener('click', function (e) {
          var btn = e.target && e.target.closest && e.target.closest('.makeup-swatch');
          if (!btn) return;
          var tab = btn.getAttribute('data-tab');
          var idx = parseInt(btn.getAttribute('data-idx'), 10);
          if (!tab || isNaN(idx)) return;
          state.makeup[tab] = idx;
          applyMakeupAndNails();
          persistState(state);
          renderMakeupSwatches();
          SOUND_FX.playSparkle();
          spawnSparkles(38, 38, 5);
          spawnSparkles(62, 38, 5);
        });
      }
    }

    // ==================== LEFT BUTTON 2: NAIL SALON ====================
    if (global.NAIL_SALON && typeof global.NAIL_SALON.init === 'function') {
      global.NAIL_SALON.init(null, function () { return state; }, function () {
        applyMakeupAndNails();
        persistState(state);
      });
    }

    if (btnNails) {
      btnNails.addEventListener('click', function () {
        if (state.makeupOpen) closeMakeup();
        if (global.NAIL_SALON && typeof global.NAIL_SALON.open === 'function') {
          global.NAIL_SALON.open(
            function () { return state; },
            function () {
              applyMakeupAndNails();
              persistState(state);
            },
            function () {
              applyMakeupAndNails();
              persistState(state);
            }
          );
        }
      });
    }

    // ==================== LEFT BUTTON 3: STAGE SHOW (CATWALK & DANCE) ====================
    if (btnShow) {
      btnShow.addEventListener('click', function () {
        if (state.makeupOpen) closeMakeup();
        SOUND_FX.playPop();
        if (global.STAGE_SHOW && typeof global.STAGE_SHOW.start === 'function') {
          global.STAGE_SHOW.start(princessSvg, function () { return state; });
        }
      });
    }

    // ==================== TOP QUICK PILLS: MUTE, MAGIC RANDOM, PHOTO SNAPSHOT ====================
    function syncMuteUi(isMuted) {
      state.muted = Boolean(isMuted);
      if (btnMute) {
        btnMute.classList.toggle('is-muted', state.muted);
        btnMute.textContent = state.muted ? '🔇 Tắt Tiếng' : '🔊 Âm Thanh';
      }
      persistState(state);
    }

    if (typeof SOUND_FX.onMuteChange === 'function') {
      SOUND_FX.onMuteChange(syncMuteUi);
    }

    if (btnMute) {
      btnMute.addEventListener('click', function () {
        if (typeof SOUND_FX.toggleMute === 'function') {
          var m = SOUND_FX.toggleMute();
          syncMuteUi(m);
          if (!m) SOUND_FX.playPop();
        }
      });
    }

    function pickDifferentRandom(current, len) {
      if (len <= 1) return 0;
      var next = Math.floor(Math.random() * len);
      if (next === current) next = (current + 1) % len;
      return next;
    }

    if (btnRandom) {
      btnRandom.addEventListener('click', function () {
        state.hairIdx = pickDifferentRandom(state.hairIdx, HAIRS.length);
        state.topIdx = pickDifferentRandom(state.topIdx, TOPS.length);
        state.bottomIdx = pickDifferentRandom(state.bottomIdx, BOTTOMS.length);
        state.shoeIdx = pickDifferentRandom(state.shoeIdx, SHOES.length);
        renderPrincessOutfit();
        renderDrawerCard('hair', 1);
        renderDrawerCard('top', 1);
        renderDrawerCard('bottom', 1);
        renderDrawerCard('shoe', 1);
        persistState(state);
        SOUND_FX.playChime();
        spawnSparkles(50, 26, 7);
        spawnSparkles(50, 48, 7);
        spawnSparkles(50, 70, 7);
        spawnSparkles(50, 88, 7);
        showToast('🪄 Biến Hình Phép Thuật!');
      });
    }

    function takePrincessSnapshot() {
      if (!princessSvg) return;
      SOUND_FX.playCamera();
      if (flashEl) {
        flashEl.classList.remove('flash');
        void flashEl.offsetWidth;
        flashEl.classList.add('flash');
      }

      try {
        var W = 1200;
        var H = 1900;
        var clone = princessSvg.cloneNode(true);
        clone.removeAttribute('id');
        clone.classList.add('blink-paused');

        var eyelids = clone.querySelector('#doll-eyelids');
        if (eyelids) {
          eyelids.setAttribute('display', 'none');
          eyelids.setAttribute('opacity', '0');
          eyelids.style.animation = 'none';
          eyelids.style.transform = 'scaleY(0)';
        }

        // Compose standalone portrait SVG card with pastel background so PNG looks framed & rich
        var portraitSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        portraitSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        portraitSvg.setAttribute('viewBox', '0 0 600 950');
        portraitSvg.setAttribute('width', String(W));
        portraitSvg.setAttribute('height', String(H));

        var bgDefs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        bgDefs.innerHTML =
          '<linearGradient id="snap-bg" x1="0%" y1="0%" x2="100%" y2="100%">' +
            '<stop offset="0%" stop-color="#ffe6f5"/>' +
            '<stop offset="50%" stop-color="#f6ddff"/>' +
            '<stop offset="100%" stop-color="#dff0ff"/>' +
          '</linearGradient>';
        portraitSvg.appendChild(bgDefs);

        var bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        bgRect.setAttribute('width', '600');
        bgRect.setAttribute('height', '950');
        bgRect.setAttribute('fill', 'url(#snap-bg)');
        portraitSvg.appendChild(bgRect);

        var frameRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        frameRect.setAttribute('x', '16');
        frameRect.setAttribute('y', '16');
        frameRect.setAttribute('width', '568');
        frameRect.setAttribute('height', '918');
        frameRect.setAttribute('rx', '34');
        frameRect.setAttribute('fill', 'none');
        frameRect.setAttribute('stroke', '#ffffff');
        frameRect.setAttribute('stroke-width', '8');
        portraitSvg.appendChild(frameRect);

        // Move cloned princess children into portraitSvg
        while (clone.firstChild) {
          portraitSvg.appendChild(clone.firstChild);
        }

        var serializer = new XMLSerializer();
        var svgStr = serializer.serializeToString(portraitSvg);
        var svgDataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgStr);

        var img = new Image();
        img.onload = function () {
          try {
            var canvas = document.createElement('canvas');
            canvas.width = W;
            canvas.height = H;
            var ctx = canvas.getContext('2d');
            if (!ctx) throw new Error('no-2d');
            ctx.drawImage(img, 0, 0, W, H);
            var pngUrl = canvas.toDataURL('image/png');
            var a = document.createElement('a');
            a.href = pngUrl;
            a.download = 'cong-chua-25d.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            showToast('📸 Đã lưu ảnh Công Chúa!');
          } catch (err) {
            showToast('📸 Đã chụp ảnh Công Chúa ✨');
          }
        };
        img.onerror = function () {
          showToast('📸 Đã chụp ảnh Công Chúa ✨');
        };
        img.src = svgDataUrl;
      } catch (e) {
        showToast('📸 Đã chụp ảnh Công Chúa ✨');
      }
    }

    if (btnSnapshot) {
      btnSnapshot.addEventListener('click', takePrincessSnapshot);
    }

    // Keyboard Escape closes Makeup Tray cleanly
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && state.makeupOpen) {
        closeMakeup();
      }
    });

    // Initial render
    renderPrincessOutfit();
    renderDrawerCard('hair', 0);
    renderDrawerCard('top', 0);
    renderDrawerCard('bottom', 0);
    renderDrawerCard('shoe', 0);
    renderMakeupSwatches();

    global.APP_SHELL = {
      getState: function () { return state; },
      cycleCategory: cycleCategory,
      openMakeup: openMakeup,
      closeMakeup: closeMakeup,
      takeSnapshot: takePrincessSnapshot
    };
  }

  global.APP_SHELL_CSS = APP_SHELL_CSS;
  global.scopeSvgIds = scopeSvgIds;
  global.initPrincessApp = initApp;

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initApp);
    } else {
      initApp();
    }
  }
})(typeof window !== 'undefined' ? window : globalThis);
