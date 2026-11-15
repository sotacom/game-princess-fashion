/**
 * 2.5D Anime Barbie Princess Doll SVG Rig & Makeup Dataset
 * Coordinate space: SVG viewBox="0 0 600 950"
 * Exports: window.DOLL_RIG, window.MAKEUP_DATA, window.applyDollMakeup, window.DOLL_RIG_CSS
 */
(function (global) {
  'use strict';

  const DOLL_RIG_CSS = `
    .doll-eyelids {
      transform-origin: 300px 203px;
      transform: scaleY(0);
      animation: dollAutoBlink 4.8s ease-in-out infinite;
    }
    #princess-svg.blink-paused .doll-eyelids {
      animation: none !important;
      transform: scaleY(0) !important;
    }
    @keyframes dollAutoBlink {
      0%, 91%, 100% { transform: scaleY(0); }
      94.5% { transform: scaleY(1); }
      97% { transform: scaleY(0); }
    }
  `;

  function ensureRigStyles() {
    if (typeof document === 'undefined' || !document.head) return;
    if (document.getElementById('doll-rig-styles')) return;
    const style = document.createElement('style');
    style.id = 'doll-rig-styles';
    style.textContent = DOLL_RIG_CSS;
    document.head.appendChild(style);
  }

  // ==================== SVG DEFS (NO <defs> WRAPPER) ====================
  const defsSvg = `
    <!-- 2.5D Volumetric Skin Gradients -->
    <radialGradient id="doll-skin-face" cx="44%" cy="38%" r="62%" fx="40%" fy="32%">
      <stop offset="0%" stop-color="#fff5ee"/>
      <stop offset="48%" stop-color="#ffe2d2"/>
      <stop offset="82%" stop-color="#f8c8b5"/>
      <stop offset="100%" stop-color="#ebb19d"/>
    </radialGradient>

    <linearGradient id="doll-skin-neck" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#dea18f"/>
      <stop offset="32%" stop-color="#f4beab"/>
      <stop offset="68%" stop-color="#ffe0d0"/>
      <stop offset="100%" stop-color="#fbd2c0"/>
    </linearGradient>

    <linearGradient id="doll-skin-torso" x1="18%" y1="8%" x2="86%" y2="92%">
      <stop offset="0%" stop-color="#fff0e7"/>
      <stop offset="38%" stop-color="#ffdfd0"/>
      <stop offset="76%" stop-color="#f7c4b0"/>
      <stop offset="100%" stop-color="#eab09b"/>
    </linearGradient>

    <linearGradient id="doll-skin-arm-l" x1="0%" y1="10%" x2="100%" y2="30%">
      <stop offset="0%" stop-color="#fff2ea"/>
      <stop offset="48%" stop-color="#ffdecb"/>
      <stop offset="100%" stop-color="#eeb5a0"/>
    </linearGradient>

    <linearGradient id="doll-skin-arm-r" x1="0%" y1="30%" x2="100%" y2="10%">
      <stop offset="0%" stop-color="#eeb5a0"/>
      <stop offset="52%" stop-color="#ffdecb"/>
      <stop offset="100%" stop-color="#fff2ea"/>
    </linearGradient>

    <linearGradient id="doll-skin-leg-l" x1="0%" y1="0%" x2="100%" y2="10%">
      <stop offset="0%" stop-color="#fff3ec"/>
      <stop offset="45%" stop-color="#ffe0cf"/>
      <stop offset="85%" stop-color="#f6c3af"/>
      <stop offset="100%" stop-color="#eab09b"/>
    </linearGradient>

    <linearGradient id="doll-skin-leg-r" x1="0%" y1="10%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#eab09b"/>
      <stop offset="15%" stop-color="#f6c3af"/>
      <stop offset="55%" stop-color="#ffe0cf"/>
      <stop offset="100%" stop-color="#fff3ec"/>
    </linearGradient>

    <radialGradient id="doll-skin-highlight" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.65"/>
      <stop offset="60%" stop-color="#fff5ef" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#fff5ef" stop-opacity="0"/>
    </radialGradient>

    <linearGradient id="doll-rim-light" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#fff7fb" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#ffd6eb" stop-opacity="0"/>
    </linearGradient>

    <!-- Cute Default Undergarments (Soft Pastel Pink Silk + Ivory Lace) -->
    <linearGradient id="doll-camisole-grad" x1="15%" y1="0%" x2="85%" y2="100%">
      <stop offset="0%" stop-color="#ffe4f2"/>
      <stop offset="42%" stop-color="#ffb8dc"/>
      <stop offset="85%" stop-color="#f896c7"/>
      <stop offset="100%" stop-color="#eb7eb6"/>
    </linearGradient>

    <linearGradient id="doll-camisole-shine" x1="0%" y1="0%" x2="100%" y2="40%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.55"/>
      <stop offset="50%" stop-color="#ffffff" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>

    <!-- Crystal Heeled Princess Shoes -->
    <linearGradient id="doll-shoe-crystal" x1="10%" y1="0%" x2="90%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
      <stop offset="30%" stop-color="#ffd6ee" stop-opacity="0.88"/>
      <stop offset="68%" stop-color="#ff88c8" stop-opacity="0.86"/>
      <stop offset="100%" stop-color="#c9eeff" stop-opacity="0.92"/>
    </linearGradient>

    <linearGradient id="doll-shoe-sole" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ff74b8"/>
      <stop offset="55%" stop-color="#e11d74"/>
      <stop offset="100%" stop-color="#a61356"/>
    </linearGradient>

    <radialGradient id="doll-shoe-gem" cx="38%" cy="32%" r="65%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="35%" stop-color="#ff99d6"/>
      <stop offset="80%" stop-color="#ec4899"/>
      <stop offset="100%" stop-color="#9d174d"/>
    </radialGradient>

    <radialGradient id="doll-floor-shadow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#9d4edd" stop-opacity="0.28"/>
      <stop offset="55%" stop-color="#ec4899" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#ec4899" stop-opacity="0"/>
    </radialGradient>

    <!-- Eyes & Dynamic Makeup Gradients -->
    <linearGradient id="doll-sclera-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#d8dff6"/>
      <stop offset="22%" stop-color="#f6f7ff"/>
      <stop offset="65%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f5f0fa"/>
    </linearGradient>

    <linearGradient id="doll-iris-grad-left" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop id="doll-iris-left-top" offset="0%" stop-color="#1d4ed8"/>
      <stop id="doll-iris-left-mid" offset="52%" stop-color="#3b82f6"/>
      <stop id="doll-iris-left-bot" offset="100%" stop-color="#93c5fd"/>
    </linearGradient>

    <linearGradient id="doll-iris-grad-right" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop id="doll-iris-right-top" offset="0%" stop-color="#1d4ed8"/>
      <stop id="doll-iris-right-mid" offset="52%" stop-color="#3b82f6"/>
      <stop id="doll-iris-right-bot" offset="100%" stop-color="#93c5fd"/>
    </linearGradient>

    <radialGradient id="doll-iris-glow-left" cx="50%" cy="76%" r="52%">
      <stop id="doll-iris-glow-left-stop" offset="0%" stop-color="#e0f2fe" stop-opacity="0.9"/>
      <stop offset="65%" stop-color="#bae6fd" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="doll-iris-glow-right" cx="50%" cy="76%" r="52%">
      <stop id="doll-iris-glow-right-stop" offset="0%" stop-color="#e0f2fe" stop-opacity="0.9"/>
      <stop offset="65%" stop-color="#bae6fd" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>

    <!-- Jewelry & Nail Rainbow -->
    <radialGradient id="doll-pearl-grad" cx="35%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="48%" stop-color="#fff4fa"/>
      <stop offset="85%" stop-color="#ebd0e2"/>
      <stop offset="100%" stop-color="#cfa9c4"/>
    </radialGradient>

    <linearGradient id="doll-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fff7cc"/>
      <stop offset="40%" stop-color="#fcd34d"/>
      <stop offset="78%" stop-color="#d97706"/>
      <stop offset="100%" stop-color="#fde68a"/>
    </linearGradient>

    <linearGradient id="doll-nail-rainbow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff69b4"/>
      <stop offset="28%" stop-color="#fbbf24"/>
      <stop offset="56%" stop-color="#34d399"/>
      <stop offset="80%" stop-color="#60a5fa"/>
      <stop offset="100%" stop-color="#c084fc"/>
    </linearGradient>

    <!-- Eye Clip Paths -->
    <clipPath id="doll-eye-clip-left">
      <path d="M 248,221 C 252,205 262,202 271,203 C 281,204 287,212 288,222 C 287,233 279,239 268,239 C 257,239 249,232 248,221 Z"/>
    </clipPath>

    <clipPath id="doll-eye-clip-right">
      <path d="M 352,221 C 348,205 338,202 329,203 C 319,204 313,212 312,222 C 313,233 321,239 332,239 C 343,239 351,232 352,221 Z"/>
    </clipPath>

    <!-- Soft Airbrush Filters -->
    <filter id="doll-blush-blur" x="-35%" y="-35%" width="170%" height="170%">
      <feGaussianBlur stdDeviation="5.2"/>
    </filter>

    <filter id="doll-shadow-blur" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="2.4"/>
    </filter>

    <filter id="doll-soft-shadow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0" dy="2.5" stdDeviation="2.2" flood-color="#b86b8a" flood-opacity="0.2"/>
    </filter>
  `;

  // ==================== LEGS & CRYSTAL HEELS ====================
  const legsSvg = `
    <g id="rig-legs">
      <!-- Ground Pedestal Soft Drop Shadow -->
      <ellipse cx="300" cy="884" rx="74" ry="11" fill="url(#doll-floor-shadow)"/>

      <!-- Left Leg (origin 274, 500; knee 270, 670; ankle 268, 825; shoe 265, 875) -->
      <g id="rig-leg-left" style="transform-origin: 274px 500px;">
        <!-- Leg Silhouette -->
        <path d="M 250,496
                 C 247,522 247,565 251,608
                 C 254,638 256,656 256,670
                 C 256,688 252,714 253,738
                 C 254,768 259,802 260,825
                 C 260,836 258,849 257,862
                 C 256,871 260,876 265,876
                 C 271,876 275,870 276,860
                 C 276,846 276,834 276,825
                 C 278,798 285,762 286,730
                 C 286,704 284,685 284,670
                 C 284,655 288,634 292,602
                 C 296,568 298,532 297,502
                 C 296,488 286,482 274,482
                 C 261,482 252,488 250,496 Z"
              fill="url(#doll-skin-leg-l)" stroke="#e5a996" stroke-width="0.9"/>

        <!-- 2.5D Knee Volume & Shin Sheen -->
        <ellipse cx="270" cy="669" rx="8.5" ry="11" fill="url(#doll-skin-highlight)"/>
        <path d="M 267,666 Q 270,663 273,666" fill="none" stroke="#efb4a2" stroke-width="1" stroke-linecap="round" opacity="0.65"/>
        <ellipse cx="264" cy="575" rx="6" ry="42" fill="url(#doll-skin-highlight)" opacity="0.7"/>
        <ellipse cx="266" cy="745" rx="4.5" ry="38" fill="url(#doll-skin-highlight)" opacity="0.75"/>

        <!-- Left Princess Crystal Heeled Shoe (centered ~265, 875) -->
        <g id="doll-shoe-left">
          <!-- Crystal Stiletto Heel -->
          <path d="M 271,847 L 275,847 L 274,877 L 270,877 Z"
                fill="url(#doll-shoe-crystal)" stroke="#f9a8d4" stroke-width="0.7"/>
          <!-- Pink Sole & Arch -->
          <path d="M 254,872 C 254,877 259,879 266,879 C 272,879 275,876 276,871 L 274,864 C 271,871 268,874 264,874 C 259,874 256,871 254,872 Z"
                fill="url(#doll-shoe-sole)"/>
          <!-- Glass Slipper Toe Box & Side -->
          <path d="M 255,856
                   C 253,864 252,873 257,876
                   C 261,878 269,878 273,874
                   C 277,869 278,860 276,851
                   C 273,858 268,862 264,862
                   C 259,862 257,859 255,856 Z"
                fill="url(#doll-shoe-crystal)" stroke="#ffffff" stroke-width="0.9"/>
          <!-- Specular Glass Highlights -->
          <path d="M 257,863 Q 260,871 266,872" fill="none" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round" opacity="0.9"/>
          <path d="M 271,858 Q 274,864 272,870" fill="none" stroke="#ffffff" stroke-width="0.9" stroke-linecap="round" opacity="0.75"/>
          <!-- Delicate Ankle Strap & Gem -->
          <path d="M 259,828 Q 268,834 277,828" fill="none" stroke="#ffd6ec" stroke-width="2.4" stroke-linecap="round"/>
          <path d="M 259,828 Q 268,834 277,828" fill="none" stroke="#ffffff" stroke-width="0.8" stroke-linecap="round" opacity="0.85"/>
          <circle cx="268" cy="831" r="2.2" fill="url(#doll-shoe-gem)" stroke="#ffffff" stroke-width="0.5"/>
          <!-- Heart Crystal Bow on Vamp -->
          <path d="M 264,858 C 261,854 257,856 258,860 C 259,863 264,866 264,866 C 264,866 269,863 270,860 C 271,856 267,854 264,858 Z"
                fill="url(#doll-shoe-gem)" stroke="#ffffff" stroke-width="0.6"/>
          <circle cx="262.5" cy="858.5" r="1" fill="#ffffff" opacity="0.95"/>
        </g>
      </g>

      <!-- Right Leg (origin 326, 500; knee 330, 670; ankle 332, 825; shoe 335, 875) -->
      <g id="rig-leg-right" style="transform-origin: 326px 500px;">
        <!-- Leg Silhouette -->
        <path d="M 350,496
                 C 353,522 353,565 349,608
                 C 346,638 344,656 344,670
                 C 344,688 348,714 347,738
                 C 346,768 341,802 340,825
                 C 340,836 342,849 343,862
                 C 344,871 340,876 335,876
                 C 329,876 325,870 324,860
                 C 324,846 324,834 324,825
                 C 322,798 315,762 314,730
                 C 314,704 316,685 316,670
                 C 316,655 312,634 308,602
                 C 304,568 302,532 303,502
                 C 304,488 314,482 326,482
                 C 339,482 348,488 350,496 Z"
              fill="url(#doll-skin-leg-r)" stroke="#e5a996" stroke-width="0.9"/>

        <!-- 2.5D Knee Volume & Shin Sheen -->
        <ellipse cx="330" cy="669" rx="8.5" ry="11" fill="url(#doll-skin-highlight)"/>
        <path d="M 327,666 Q 330,663 333,666" fill="none" stroke="#efb4a2" stroke-width="1" stroke-linecap="round" opacity="0.65"/>
        <ellipse cx="336" cy="575" rx="6" ry="42" fill="url(#doll-skin-highlight)" opacity="0.7"/>
        <ellipse cx="334" cy="745" rx="4.5" ry="38" fill="url(#doll-skin-highlight)" opacity="0.75"/>

        <!-- Right Princess Crystal Heeled Shoe (centered ~335, 875) -->
        <g id="doll-shoe-right">
          <path d="M 329,847 L 325,847 L 326,877 L 330,877 Z"
                fill="url(#doll-shoe-crystal)" stroke="#f9a8d4" stroke-width="0.7"/>
          <path d="M 346,872 C 346,877 341,879 334,879 C 328,879 325,876 324,871 L 326,864 C 329,871 332,874 336,874 C 341,874 344,871 346,872 Z"
                fill="url(#doll-shoe-sole)"/>
          <path d="M 345,856
                   C 347,864 348,873 343,876
                   C 339,878 331,878 327,874
                   C 323,869 322,860 324,851
                   C 327,858 332,862 336,862
                   C 341,862 343,859 345,856 Z"
                fill="url(#doll-shoe-crystal)" stroke="#ffffff" stroke-width="0.9"/>
          <path d="M 343,863 Q 340,871 334,872" fill="none" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round" opacity="0.9"/>
          <path d="M 329,858 Q 326,864 328,870" fill="none" stroke="#ffffff" stroke-width="0.9" stroke-linecap="round" opacity="0.75"/>
          <path d="M 341,828 Q 332,834 323,828" fill="none" stroke="#ffd6ec" stroke-width="2.4" stroke-linecap="round"/>
          <path d="M 341,828 Q 332,834 323,828" fill="none" stroke="#ffffff" stroke-width="0.8" stroke-linecap="round" opacity="0.85"/>
          <circle cx="332" cy="831" r="2.2" fill="url(#doll-shoe-gem)" stroke="#ffffff" stroke-width="0.5"/>
          <path d="M 336,858 C 339,854 343,856 342,860 C 341,863 336,866 336,866 C 336,866 331,863 330,860 C 329,856 333,854 336,858 Z"
                fill="url(#doll-shoe-gem)" stroke="#ffffff" stroke-width="0.6"/>
          <circle cx="334.5" cy="858.5" r="1" fill="#ffffff" opacity="0.95"/>
        </g>
      </g>
    </g>
  `;

  // ==================== NECK, TORSO & CUTE WHOLESOME BASE BODICE ====================
  const torsoSvg = `
    <g id="rig-torso">
      <!-- Neck (x: 284..316, y: 274..324) -->
      <path d="M 285,274 L 315,274 C 315,296 316,314 320,322 L 280,322 C 284,314 285,296 285,274 Z"
            fill="url(#doll-skin-neck)" stroke="#e4a795" stroke-width="0.8"/>

      <!-- Main Torso Silhouette: Shoulders (230,328 & 370,328), Bust (242..358, 322..415), Waist (262..338 at 432), Hips (240..360, 450..520) -->
      <path d="M 281,321
               C 266,322 250,324 230,328
               C 223,331 221,337 223,342
               C 226,350 238,354 245,358
               C 246,374 242,390 245,404
               C 249,417 262,425 262,432
               C 262,442 252,456 245,472
               C 240,486 240,504 247,515
               C 256,524 284,528 300,528
               C 316,528 344,524 353,515
               C 360,504 360,486 355,472
               C 348,456 338,442 338,432
               C 338,425 351,417 355,404
               C 358,390 354,374 355,358
               C 362,354 374,350 377,342
               C 379,337 377,331 370,328
               C 350,324 334,322 319,321
               C 309,324 291,324 281,321 Z"
            fill="url(#doll-skin-torso)" stroke="#e4a795" stroke-width="0.9"/>

      <!-- 2.5D Collarbone & Shoulder Volume Highlights -->
      <path d="M 264,331 Q 279,336 294,334" fill="none" stroke="#e29f8d" stroke-width="1.2" stroke-linecap="round" opacity="0.65"/>
      <path d="M 336,331 Q 321,336 306,334" fill="none" stroke="#e29f8d" stroke-width="1.2" stroke-linecap="round" opacity="0.65"/>
      <path d="M 266,333 Q 279,338 292,336" fill="none" stroke="#ffffff" stroke-width="1.1" stroke-linecap="round" opacity="0.45"/>
      <path d="M 334,333 Q 321,338 308,336" fill="none" stroke="#ffffff" stroke-width="1.1" stroke-linecap="round" opacity="0.45"/>
      <ellipse cx="272" cy="346" rx="18" ry="8" fill="url(#doll-skin-highlight)" opacity="0.6"/>
      <ellipse cx="328" cy="346" rx="18" ry="8" fill="url(#doll-skin-highlight)" opacity="0.5"/>
      <ellipse cx="300" cy="414" rx="16" ry="8" fill="url(#doll-skin-highlight)" opacity="0.4"/>

      <!-- Cute Kid-Safe Pastel Pink Silk Camisole & Shorts (Inset neatly so all tops & bottoms cover cleanly) -->
      <g id="doll-default-undergarments">
        <!-- Soft Pink Silk Shorts (y: 433..508) -->
        <path d="M 264,433
                 L 336,433
                 C 338,448 352,464 355,484
                 C 357,496 355,506 350,511
                 C 336,515 316,513 305,509
                 L 300,520
                 L 295,509
                 C 284,513 264,515 250,511
                 C 245,506 243,496 245,484
                 C 248,464 262,448 264,433 Z"
              fill="url(#doll-camisole-grad)" stroke="#f082b9" stroke-width="0.8"/>
        <!-- Shorts Lace Hem -->
        <path d="M 250,509 Q 256,514 262,510 Q 268,515 274,510 Q 280,514 286,510 Q 292,513 296,508"
              fill="none" stroke="#fff5fa" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M 350,509 Q 344,514 338,510 Q 332,515 326,510 Q 320,514 314,510 Q 308,513 304,508"
              fill="none" stroke="#fff5fa" stroke-width="1.8" stroke-linecap="round"/>

        <!-- Strapless Sweetheart Pink Silk Camisole Bodice (y: 353..435) -->
        <path d="M 251,357
                 C 262,349 286,350 300,361
                 C 314,350 338,349 349,357
                 C 353,372 353,391 349,405
                 C 345,418 337,426 336,434
                 L 264,434
                 C 263,426 255,418 251,405
                 C 247,391 247,372 251,357 Z"
              fill="url(#doll-camisole-grad)" stroke="#f082b9" stroke-width="0.8"/>

        <!-- 2.5D Silk Gloss & Princess Seams on Camisole -->
        <path d="M 253,360 C 266,354 285,355 299,365 C 288,392 284,414 282,433 L 265,433 C 262,418 250,392 253,360 Z"
              fill="url(#doll-camisole-shine)"/>
        <path d="M 276,356 Q 280,394 277,432" fill="none" stroke="#f472b6" stroke-width="0.7" opacity="0.45"/>
        <path d="M 324,356 Q 320,394 323,432" fill="none" stroke="#f472b6" stroke-width="0.7" opacity="0.45"/>

        <!-- Delicate Scalloped Top Lace Trim -->
        <path d="M 252,357 Q 259,352 266,354 Q 273,350 280,354 Q 287,352 293,357 Q 300,362 307,357 Q 313,352 320,354 Q 327,350 334,354 Q 341,352 348,357"
              fill="none" stroke="#fff7fb" stroke-width="2" stroke-linecap="round"/>

        <!-- Tiny Satin Ribbon Bows at Center Neckline & Waist -->
        <g transform="translate(300, 364)">
          <path d="M 0,0 C -5,-4 -9,-2 -8,2 C -7,4 -2,2 0,0 Z" fill="#ff70b8" stroke="#fff5fa" stroke-width="0.5"/>
          <path d="M 0,0 C 5,-4 9,-2 8,2 C 7,4 2,2 0,0 Z" fill="#ff70b8" stroke="#fff5fa" stroke-width="0.5"/>
          <circle cx="0" cy="0" r="1.8" fill="#ffe6f2"/>
        </g>
        <g transform="translate(300, 434)">
          <path d="M -35,0 L 35,0" stroke="#ffd6ec" stroke-width="2.4" stroke-linecap="round"/>
          <path d="M 0,0 C -5,-4 -9,-2 -8,2 C -7,4 -2,2 0,0 Z" fill="#ff70b8" stroke="#fff5fa" stroke-width="0.5"/>
          <path d="M 0,0 C 5,-4 9,-2 8,2 C 7,4 2,2 0,0 Z" fill="#ff70b8" stroke="#fff5fa" stroke-width="0.5"/>
          <circle cx="0" cy="0" r="1.8" fill="#ffe6f2"/>
        </g>
      </g>
    </g>
  `;

  // ==================== ARMS & HANDS WITH 10 PAINTABLE NAILS ====================
  const armsSvg = `
    <g id="rig-arms">
      <!-- Left Arm (origin 230, 330; shoulder 226,325 -> elbow 196,425 -> hand 176,510) -->
      <g id="rig-arm-left" style="transform-origin: 230px 330px;">
        <!-- Arm Contour + Graceful 5-Finger Hand -->
        <path d="M 226,325
                 C 217,327 210,336 208,355
                 C 204,380 194,405 191,425
                 C 188,446 181,474 176,496
                 C 172,504 167,510 164,515
                 C 161,520 159,525 161,527
                 C 163,529 166,525 169,519
                 C 169,525 166,533 167,536
                 C 169,538 172,534 174,524
                 C 175,532 174,540 176,542
                 C 178,543 180,536 180,524
                 C 181,531 182,536 184,536
                 C 186,536 186,527 185,517
                 C 188,518 190,521 192,519
                 C 194,517 192,511 189,506
                 C 188,502 187,498 186,495
                 C 191,475 200,446 204,427
                 C 208,408 221,384 228,360
                 C 234,344 238,334 234,327
                 C 232,324 229,324 226,325 Z"
              fill="url(#doll-skin-arm-l)" stroke="#e4a795" stroke-width="0.85"/>

        <!-- 2.5D Arm Specular Highlight & Elbow Dimple -->
        <path d="M 217,338 Q 205,382 195,422" fill="none" stroke="#fff7f2" stroke-width="3" stroke-linecap="round" opacity="0.5"/>
        <path d="M 192,434 Q 184,468 179,492" fill="none" stroke="#fff7f2" stroke-width="2.2" stroke-linecap="round" opacity="0.5"/>
        <path d="M 197,424 Q 200,427 202,424" fill="none" stroke="#e49d8a" stroke-width="0.9" stroke-linecap="round" opacity="0.55"/>

        <!-- Left Hand 5 Nails (data-finger 0=Thumb .. 4=Pinky) -->
        <path class="doll-nail" data-hand="left" data-finger="0"
              d="M 190.0,514.5 C 191.5,514.0 193.0,516.5 192.4,519.0 C 191.6,519.8 189.8,518.8 189.4,516.8 C 189.2,515.6 189.4,514.8 190.0,514.5 Z"
              fill="#ff85c1" stroke="#d9468f" stroke-width="0.45"/>
        <path class="doll-nail" data-hand="left" data-finger="1"
              d="M 183.4,530.5 C 184.9,530.5 185.7,532.4 185.4,535.2 C 184.7,536.2 183.3,536.1 182.6,535.0 C 182.2,532.6 182.4,530.6 183.4,530.5 Z"
              fill="#ff85c1" stroke="#d9468f" stroke-width="0.45"/>
        <path class="doll-nail" data-hand="left" data-finger="2"
              d="M 175.8,536.2 C 177.4,536.2 178.3,538.2 177.8,541.2 C 177.0,542.2 175.5,542.1 174.9,540.9 C 174.4,538.3 174.8,536.3 175.8,536.2 Z"
              fill="#ff85c1" stroke="#d9468f" stroke-width="0.45"/>
        <path class="doll-nail" data-hand="left" data-finger="3"
              d="M 167.8,531.0 C 169.3,531.2 169.9,533.1 169.2,535.8 C 168.4,536.6 167.1,536.3 166.5,535.0 C 166.3,532.7 166.9,530.9 167.8,531.0 Z"
              fill="#ff85c1" stroke="#d9468f" stroke-width="0.45"/>
        <path class="doll-nail" data-hand="left" data-finger="4"
              d="M 161.6,522.0 C 162.9,522.4 163.3,524.2 162.4,526.4 C 161.5,527.1 160.4,526.6 160.1,525.3 C 160.1,523.3 160.8,521.8 161.6,522.0 Z"
              fill="#ff85c1" stroke="#d9468f" stroke-width="0.45"/>

        <!-- Nail FX Overlay Slots (French tips, glitter, charms) -->
        <g class="doll-nail-fx" data-hand="left" data-finger="0" pointer-events="none"></g>
        <g class="doll-nail-fx" data-hand="left" data-finger="1" pointer-events="none"></g>
        <g class="doll-nail-fx" data-hand="left" data-finger="2" pointer-events="none"></g>
        <g class="doll-nail-fx" data-hand="left" data-finger="3" pointer-events="none"></g>
        <g class="doll-nail-fx" data-hand="left" data-finger="4" pointer-events="none"></g>
      </g>

      <!-- Right Arm (origin 370, 330; shoulder 374,325 -> elbow 404,425 -> hand 424,510) -->
      <g id="rig-arm-right" style="transform-origin: 370px 330px;">
        <path d="M 374,325
                 C 383,327 390,336 392,355
                 C 396,380 406,405 409,425
                 C 412,446 419,474 424,496
                 C 428,504 433,510 436,515
                 C 439,520 441,525 439,527
                 C 437,529 434,525 431,519
                 C 431,525 434,533 433,536
                 C 431,538 428,534 426,524
                 C 425,532 426,540 424,542
                 C 422,543 420,536 420,524
                 C 419,531 418,536 416,536
                 C 414,536 414,527 415,517
                 C 412,518 410,521 408,519
                 C 406,517 408,511 411,506
                 C 412,502 413,498 414,495
                 C 409,475 400,446 396,427
                 C 392,408 379,384 372,360
                 C 366,344 362,334 366,327
                 C 368,324 371,324 374,325 Z"
              fill="url(#doll-skin-arm-r)" stroke="#e4a795" stroke-width="0.85"/>

        <path d="M 383,338 Q 395,382 405,422" fill="none" stroke="#fff7f2" stroke-width="3" stroke-linecap="round" opacity="0.5"/>
        <path d="M 408,434 Q 416,468 421,492" fill="none" stroke="#fff7f2" stroke-width="2.2" stroke-linecap="round" opacity="0.5"/>
        <path d="M 403,424 Q 400,427 398,424" fill="none" stroke="#e49d8a" stroke-width="0.9" stroke-linecap="round" opacity="0.55"/>

        <!-- Right Hand 5 Nails (data-finger 0=Thumb .. 4=Pinky) -->
        <path class="doll-nail" data-hand="right" data-finger="0"
              d="M 410.0,514.5 C 408.5,514.0 407.0,516.5 407.6,519.0 C 408.4,519.8 410.2,518.8 410.6,516.8 C 410.8,515.6 410.6,514.8 410.0,514.5 Z"
              fill="#ff85c1" stroke="#d9468f" stroke-width="0.45"/>
        <path class="doll-nail" data-hand="right" data-finger="1"
              d="M 416.6,530.5 C 415.1,530.5 414.3,532.4 414.6,535.2 C 415.3,536.2 416.7,536.1 417.4,535.0 C 417.8,532.6 417.6,530.6 416.6,530.5 Z"
              fill="#ff85c1" stroke="#d9468f" stroke-width="0.45"/>
        <path class="doll-nail" data-hand="right" data-finger="2"
              d="M 424.2,536.2 C 422.6,536.2 421.7,538.2 422.2,541.2 C 423.0,542.2 424.5,542.1 425.1,540.9 C 425.6,538.3 425.2,536.3 424.2,536.2 Z"
              fill="#ff85c1" stroke="#d9468f" stroke-width="0.45"/>
        <path class="doll-nail" data-hand="right" data-finger="3"
              d="M 432.2,531.0 C 430.7,531.2 430.1,533.1 430.8,535.8 C 431.6,536.6 432.9,536.3 433.5,535.0 C 433.7,532.7 433.1,530.9 432.2,531.0 Z"
              fill="#ff85c1" stroke="#d9468f" stroke-width="0.45"/>
        <path class="doll-nail" data-hand="right" data-finger="4"
              d="M 438.4,522.0 C 437.1,522.4 436.7,524.2 437.6,526.4 C 438.5,527.1 439.6,526.6 439.9,525.3 C 439.9,523.3 439.2,521.8 438.4,522.0 Z"
              fill="#ff85c1" stroke="#d9468f" stroke-width="0.45"/>

        <g class="doll-nail-fx" data-hand="right" data-finger="0" pointer-events="none"></g>
        <g class="doll-nail-fx" data-hand="right" data-finger="1" pointer-events="none"></g>
        <g class="doll-nail-fx" data-hand="right" data-finger="2" pointer-events="none"></g>
        <g class="doll-nail-fx" data-hand="right" data-finger="3" pointer-events="none"></g>
        <g class="doll-nail-fx" data-hand="right" data-finger="4" pointer-events="none"></g>
      </g>
    </g>
  `;

  // ==================== HEAD, ANIME PRINCESS EYES, MAKEUP SLOTS & EARRINGS ====================
  const headSvg = `
    <g id="rig-head" style="transform-origin: 300px 285px;">
      <!-- Ears (around x: 226 & 374, y: 222) -->
      <g id="doll-ears">
        <path d="M 235,210 C 226,207 220,213 221,222 C 222,231 226,238 232,237 C 234,236 236,232 236,227"
              fill="#f8cbb9" stroke="#e2a390" stroke-width="0.9"/>
        <path d="M 231,215 C 226,216 225,222 228,229" fill="none" stroke="#df9d8a" stroke-width="0.9" stroke-linecap="round"/>

        <path d="M 365,210 C 374,207 380,213 379,222 C 378,231 374,238 368,237 C 366,236 364,232 364,227"
              fill="#f8cbb9" stroke="#e2a390" stroke-width="0.9"/>
        <path d="M 369,215 C 374,216 375,222 372,229" fill="none" stroke="#df9d8a" stroke-width="0.9" stroke-linecap="round"/>
      </g>

      <!-- Pearl & Pink Gem Earrings -->
      <g id="doll-earrings" filter="url(#doll-soft-shadow)">
        <!-- Left Earring -->
        <circle cx="226" cy="236" r="2.2" fill="url(#doll-gold-grad)"/>
        <circle cx="226" cy="242" r="4.2" fill="url(#doll-pearl-grad)" stroke="#f3c5de" stroke-width="0.5"/>
        <path d="M 226,247 L 229.5,252.5 L 226,258 L 222.5,252.5 Z" fill="url(#doll-shoe-gem)" stroke="#ffffff" stroke-width="0.5"/>
        <circle cx="225.2" cy="251.2" r="0.9" fill="#ffffff"/>

        <!-- Right Earring -->
        <circle cx="374" cy="236" r="2.2" fill="url(#doll-gold-grad)"/>
        <circle cx="374" cy="242" r="4.2" fill="url(#doll-pearl-grad)" stroke="#f3c5de" stroke-width="0.5"/>
        <path d="M 374,247 L 377.5,252.5 L 374,258 L 370.5,252.5 Z" fill="url(#doll-shoe-gem)" stroke="#ffffff" stroke-width="0.5"/>
        <circle cx="373.2" cy="251.2" r="0.9" fill="#ffffff"/>
      </g>

      <!-- Face Oval (centered 300, 215; x: 232..368, y: 142..288; chin 300,288) -->
      <path id="doll-face-shape"
            d="M 300,142
               C 338,142 363,160 366,188
               C 369,208 369,225 366,239
               C 361,259 333,288 300,288
               C 267,288 239,259 234,239
               C 231,225 231,208 234,188
               C 237,160 262,142 300,142 Z"
            fill="url(#doll-skin-face)" stroke="#e4a795" stroke-width="0.95"/>

      <!-- Soft Volumetric Cheek, Forehead & Chin Glows -->
      <ellipse cx="288" cy="182" rx="34" ry="18" fill="url(#doll-skin-highlight)" opacity="0.5"/>
      <ellipse cx="300" cy="276" rx="14" ry="6" fill="url(#doll-skin-highlight)" opacity="0.45"/>

      <!-- Cheek Blushes (#doll-blush-left at 248,244; #doll-blush-right at 352,244) -->
      <ellipse id="doll-blush-left" cx="248" cy="244" rx="17" ry="9.5"
               transform="rotate(-8 248 244)" fill="#ff8fa3" opacity="0.48" filter="url(#doll-blush-blur)"/>
      <ellipse id="doll-blush-right" cx="352" cy="244" rx="17" ry="9.5"
               transform="rotate(8 352 244)" fill="#ff8fa3" opacity="0.48" filter="url(#doll-blush-blur)"/>

      <!-- Subtle Anime Rosy Cheek Glints -->
      <ellipse cx="246" cy="242" rx="3.2" ry="1.6" fill="#ffffff" opacity="0.38"/>
      <ellipse cx="354" cy="242" rx="3.2" ry="1.6" fill="#ffffff" opacity="0.38"/>

      <!-- Cheek / Temple Face Sticker Slot -->
      <g id="doll-face-sticker"></g>

      <!-- Eyeshadows (#doll-eyeshadow-left & #doll-eyeshadow-right) -->
      <path id="doll-eyeshadow-left"
            d="M 244,218 C 248,199 260,194 273,196 C 284,197 290,206 289,217 C 282,208 273,205 264,205 C 254,205 248,211 244,218 Z"
            fill="#ff8ac8" opacity="0.62" filter="url(#doll-shadow-blur)"/>
      <path id="doll-eyeshadow-shimmer-left"
            d="M 250,209 C 256,200 268,198 281,203 C 272,202 260,203 250,209 Z"
            fill="#ffe6f5" opacity="0.72"/>

      <path id="doll-eyeshadow-right"
            d="M 356,218 C 352,199 340,194 327,196 C 316,197 310,206 311,217 C 318,208 327,205 336,205 C 346,205 352,211 356,218 Z"
            fill="#ff8ac8" opacity="0.62" filter="url(#doll-shadow-blur)"/>
      <path id="doll-eyeshadow-shimmer-right"
            d="M 350,209 C 344,200 332,198 319,203 C 328,202 340,203 350,209 Z"
            fill="#ffe6f5" opacity="0.72"/>

      <!-- Delicate Upper Eyelid Crease -->
      <path d="M 249,204 Q 268,194 286,204" fill="none" stroke="#d48c7e" stroke-width="0.95" stroke-linecap="round" opacity="0.68"/>
      <path d="M 351,204 Q 332,194 314,204" fill="none" stroke="#d48c7e" stroke-width="0.95" stroke-linecap="round" opacity="0.68"/>

      <!-- LEFT EYE (center 268, 222) -->
      <g id="doll-eye-left">
        <!-- Sclera -->
        <path d="M 248,221 C 252,205 262,202 271,203 C 281,204 287,212 288,222 C 287,233 279,239 268,239 C 257,239 249,232 248,221 Z"
              fill="url(#doll-sclera-grad)"/>
        <!-- Clipped Iris & Speculars -->
        <g clip-path="url(#doll-eye-clip-left)">
          <!-- Main Layered Iris -->
          <ellipse id="doll-iris-left" cx="268.5" cy="221.5" rx="13.5" ry="15.8"
                   fill="url(#doll-iris-grad-left)" stroke="#1e1b4b" stroke-width="1.35"/>
          <!-- Lower Luminous Crescent -->
          <ellipse cx="268.5" cy="225.5" rx="10.8" ry="10.5" fill="url(#doll-iris-glow-left)"/>
          <!-- Radial Starburst Iris Texture -->
          <g stroke="#ffffff" stroke-width="0.6" opacity="0.28">
            <line x1="268.5" y1="208" x2="268.5" y2="214"/>
            <line x1="261" y1="210" x2="264" y2="215"/>
            <line x1="276" y1="210" x2="273" y2="215"/>
            <line x1="257" y1="219" x2="262" y2="220"/>
            <line x1="280" y1="219" x2="275" y2="220"/>
            <line x1="261" y1="233" x2="264" y2="228"/>
            <line x1="276" y1="233" x2="273" y2="228"/>
          </g>
          <!-- Deep Starry Pupil -->
          <ellipse cx="268.5" cy="221.5" rx="5.5" ry="6.8" fill="#180c2e"/>
          <!-- Top Eyelid Ambient Shadow inside Iris -->
          <path d="M 248,202 L 290,202 L 290,213 Q 269,209 248,214 Z" fill="#2d123b" opacity="0.24"/>
          <!-- Gorgeous Anime Specular Catchlights -->
          <ellipse cx="262.8" cy="214.2" rx="4.2" ry="3.3" transform="rotate(-18 262.8 214.2)" fill="#ffffff" opacity="0.96"/>
          <circle cx="275.5" cy="215.5" r="1.4" fill="#ffffff" opacity="0.9"/>
          <!-- 4-Point Sparkle Catchlight -->
          <path d="M 274.2,226.2 L 275.1,228.8 L 277.7,229.7 L 275.1,230.6 L 274.2,233.2 L 273.3,230.6 L 270.7,229.7 L 273.3,228.8 Z"
                fill="#ffffff" opacity="0.94"/>
          <circle cx="262.2" cy="229.5" r="1.1" fill="#ffffff" opacity="0.72"/>
        </g>
        <!-- Upper Lash Line & Cute Wing Lashes -->
        <path d="M 245,218 C 251,203 263,200 274,201 C 283,202 289,211 289,221
                 C 286,213 280,206 271,205 C 261,204 252,208 247,220 Z"
              fill="#2a1126"/>
        <path d="M 247,213 Q 241,208 239,204" fill="none" stroke="#2a1126" stroke-width="1.9" stroke-linecap="round"/>
        <path d="M 250,209 Q 245,202 244,198" fill="none" stroke="#2a1126" stroke-width="1.6" stroke-linecap="round"/>
        <path d="M 255,205 Q 252,199 251,195" fill="none" stroke="#2a1126" stroke-width="1.35" stroke-linecap="round"/>
        <path d="M 245,219 Q 241,216 239,213" fill="none" stroke="#2a1126" stroke-width="1.3" stroke-linecap="round"/>
        <!-- Shimmering Lower Lash -->
        <path d="M 254,236 Q 268,241 282,236" fill="none" stroke="#9e627e" stroke-width="1.15" stroke-linecap="round" opacity="0.7"/>
        <circle cx="285" cy="228" r="0.9" fill="#ffffff" opacity="0.85"/>
      </g>

      <!-- RIGHT EYE (center 332, 222) -->
      <g id="doll-eye-right">
        <path d="M 352,221 C 348,205 338,202 329,203 C 319,204 313,212 312,222 C 313,233 321,239 332,239 C 343,239 351,232 352,221 Z"
              fill="url(#doll-sclera-grad)"/>
        <g clip-path="url(#doll-eye-clip-right)">
          <ellipse id="doll-iris-right" cx="331.5" cy="221.5" rx="13.5" ry="15.8"
                   fill="url(#doll-iris-grad-right)" stroke="#1e1b4b" stroke-width="1.35"/>
          <ellipse cx="331.5" cy="225.5" rx="10.8" ry="10.5" fill="url(#doll-iris-glow-right)"/>
          <g stroke="#ffffff" stroke-width="0.6" opacity="0.28">
            <line x1="331.5" y1="208" x2="331.5" y2="214"/>
            <line x1="324" y1="210" x2="327" y2="215"/>
            <line x1="339" y1="210" x2="336" y2="215"/>
            <line x1="320" y1="219" x2="325" y2="220"/>
            <line x1="343" y1="219" x2="338" y2="220"/>
            <line x1="324" y1="233" x2="327" y2="228"/>
            <line x1="339" y1="233" x2="336" y2="228"/>
          </g>
          <ellipse cx="331.5" cy="221.5" rx="5.5" ry="6.8" fill="#180c2e"/>
          <path d="M 310,202 L 352,202 L 352,213 Q 331,209 310,214 Z" fill="#2d123b" opacity="0.24"/>
          <ellipse cx="325.8" cy="214.2" rx="4.2" ry="3.3" transform="rotate(-18 325.8 214.2)" fill="#ffffff" opacity="0.96"/>
          <circle cx="338.5" cy="215.5" r="1.4" fill="#ffffff" opacity="0.9"/>
          <path d="M 337.2,226.2 L 338.1,228.8 L 340.7,229.7 L 338.1,230.6 L 337.2,233.2 L 336.3,230.6 L 333.7,229.7 L 336.3,228.8 Z"
                fill="#ffffff" opacity="0.94"/>
          <circle cx="325.2" cy="229.5" r="1.1" fill="#ffffff" opacity="0.72"/>
        </g>
        <path d="M 355,218 C 349,203 337,200 326,201 C 317,202 311,211 311,221
                 C 314,213 320,206 329,205 C 339,204 348,208 353,220 Z"
              fill="#2a1126"/>
        <path d="M 353,213 Q 359,208 361,204" fill="none" stroke="#2a1126" stroke-width="1.9" stroke-linecap="round"/>
        <path d="M 350,209 Q 355,202 356,198" fill="none" stroke="#2a1126" stroke-width="1.6" stroke-linecap="round"/>
        <path d="M 345,205 Q 348,199 349,195" fill="none" stroke="#2a1126" stroke-width="1.35" stroke-linecap="round"/>
        <path d="M 355,219 Q 359,216 361,213" fill="none" stroke="#2a1126" stroke-width="1.3" stroke-linecap="round"/>
        <path d="M 346,236 Q 332,241 318,236" fill="none" stroke="#9e627e" stroke-width="1.15" stroke-linecap="round" opacity="0.7"/>
        <circle cx="315" cy="228" r="0.9" fill="#ffffff" opacity="0.85"/>
      </g>

      <!-- Animated Eyelids for Blinking (#doll-eyelids) -->
      <g id="doll-eyelids" class="doll-eyelids">
        <path d="M 244,202 L 291,202 L 290,224 C 282,237 256,237 245,224 Z" fill="url(#doll-skin-face)"/>
        <path d="M 245,222 Q 268,235 289,222" fill="none" stroke="#2a1126" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M 245,222 Q 240,220 238,217" fill="none" stroke="#2a1126" stroke-width="1.6" stroke-linecap="round"/>

        <path d="M 309,202 L 356,202 L 355,224 C 344,237 318,237 310,224 Z" fill="url(#doll-skin-face)"/>
        <path d="M 311,222 Q 332,235 355,222" fill="none" stroke="#2a1126" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M 355,222 Q 360,220 362,217" fill="none" stroke="#2a1126" stroke-width="1.6" stroke-linecap="round"/>
      </g>

      <!-- Graceful Arched Anime Eyebrows -->
      <path d="M 249,195 Q 267,186 286,194" fill="none" stroke="#855148" stroke-width="2.1" stroke-linecap="round"/>
      <path d="M 351,195 Q 333,186 314,194" fill="none" stroke="#855148" stroke-width="2.1" stroke-linecap="round"/>

      <!-- Dainty Anime Nose -->
      <path d="M 299.2,236 C 298.8,240 298.3,243 299.8,245" fill="none" stroke="#dfa291" stroke-width="1.2" stroke-linecap="round"/>
      <ellipse cx="300.2" cy="241" rx="1.6" ry="2.2" fill="#ffffff" opacity="0.55"/>

      <!-- Glossy 2.5D Princess Lips (centered 300, 265) -->
      <g id="doll-lips-group">
        <!-- Main Dynamic Lip Fill -->
        <path id="doll-lips-fill"
              d="M 284.5,264.2
                 C 289.5,260.2 295.8,259.2 300,261.2
                 C 304.2,259.2 310.5,260.2 315.5,264.2
                 C 311.5,270.8 305.5,272.5 300,272.5
                 C 294.5,272.5 288.5,270.8 284.5,264.2 Z"
              fill="#ff4da6" stroke="#c92a76" stroke-width="0.6"/>
        <!-- Upper Lip 2.5D Shadow Depth & Sweet Smile Line -->
        <path d="M 285,264.2 C 289.8,260.5 295.8,259.5 300,261.4 C 304.2,259.5 310.2,260.5 315,264.2 Q 300,266.2 285,264.2 Z"
              fill="#6a0834" opacity="0.18" pointer-events="none"/>
        <path d="M 283.5,263.8 Q 300,266.8 316.5,263.8" fill="none" stroke="#9d174d" stroke-width="0.9" stroke-linecap="round" opacity="0.65"/>
        <!-- Glossy Lip Specular Highlight -->
        <g id="doll-lips-gloss" opacity="0.85" fill="#ffb8dc" pointer-events="none">
          <path d="M 292.5,267.8 Q 300,270.6 307.5,267.8 Q 300,269.0 292.5,267.8 Z"/>
          <ellipse cx="297.2" cy="268.2" rx="3.2" ry="1.1" fill="#ffffff" opacity="0.72"/>
          <circle cx="305.2" cy="268.0" r="1.0" fill="#ffffff" opacity="0.75"/>
          <path d="M 294.5,261.8 Q 297.2,260.8 299.2,262.0" fill="none" stroke="#ffffff" stroke-width="0.8" stroke-linecap="round" opacity="0.65"/>
          <path d="M 305.5,261.8 Q 302.8,260.8 300.8,262.0" fill="none" stroke="#ffffff" stroke-width="0.8" stroke-linecap="round" opacity="0.65"/>
        </g>
      </g>
    </g>
  `;

  // ==================== MAKEUP DATA (12 ITEMS PER CATEGORY) ====================
  const MAKEUP_DATA = {
    lipsticks: [
      { id: 'lip-01', name: 'Hồng Barbie Ngọt Ngào', color: '#ff4da6', highlight: '#ffb8dc', glossOpacity: 0.85 },
      { id: 'lip-02', name: 'Hồng Cánh Sen Nhẹ Nhàng', color: '#f472b6', highlight: '#fde2f3', glossOpacity: 0.78 },
      { id: 'lip-03', name: 'Đỏ Dâu Tây Mọng Nước', color: '#ef234b', highlight: '#ff9eb3', glossOpacity: 0.90 },
      { id: 'lip-04', name: 'Hồng Đào Kẹo Ngọt', color: '#fb7185', highlight: '#ffd6de', glossOpacity: 0.82 },
      { id: 'lip-05', name: 'Cam San Hô Nắng Mai', color: '#ff6f61', highlight: '#ffd1c9', glossOpacity: 0.76 },
      { id: 'lip-06', name: 'Đỏ Táo Hoàng Gia', color: '#d90429', highlight: '#ff8fa3', glossOpacity: 0.88 },
      { id: 'lip-07', name: 'Hồng Anh Đào Lấp Lánh', color: '#ff85b3', highlight: '#fff0f6', glossOpacity: 0.92 },
      { id: 'lip-08', name: 'Tím Mận Ngọc Bích', color: '#c026d3', highlight: '#f5c2ff', glossOpacity: 0.84 },
      { id: 'lip-09', name: 'Hồng Nude Công Chúa', color: '#e88d9c', highlight: '#ffe3e8', glossOpacity: 0.72 },
      { id: 'lip-10', name: 'Hồng Neon Ngôi Sao', color: '#ff1f8e', highlight: '#ffc2e2', glossOpacity: 0.90 },
      { id: 'lip-11', name: 'Tím Oải Hương Pha Lê', color: '#a855f7', highlight: '#ebd6ff', glossOpacity: 0.86 },
      { id: 'lip-12', name: 'Vàng Hồng Kim Tuyến', color: '#e57c92', highlight: '#fff1e6', glossOpacity: 0.95 }
    ],
    eyeshadows: [
      { id: 'eye-sh-01', name: 'Hồng Phấn Công Chúa', color: '#ff8ac8', shimmerColor: '#ffe6f5', opacity: 0.62 },
      { id: 'eye-sh-02', name: 'Tím Lavender Tiên Nữ', color: '#c084fc', shimmerColor: '#f3e8ff', opacity: 0.65 },
      { id: 'eye-sh-03', name: 'Xanh Băng Tuyết', color: '#67e8f9', shimmerColor: '#e0faff', opacity: 0.65 },
      { id: 'eye-sh-04', name: 'Vàng Hồng Hoàng Gia', color: '#fda4af', shimmerColor: '#fff1c1', opacity: 0.60 },
      { id: 'eye-sh-05', name: 'Xanh Bạc Hà Ngọt Ngào', color: '#5eead4', shimmerColor: '#dcfce7', opacity: 0.60 },
      { id: 'eye-sh-06', name: 'Cam Đào Hoàng Hôn', color: '#fdba74', shimmerColor: '#ffedd5', opacity: 0.58 },
      { id: 'eye-sh-07', name: 'Ngọc Trai Ánh Trăng', color: '#cbd5e1', shimmerColor: '#ffffff', opacity: 0.68 },
      { id: 'eye-sh-08', name: 'Hồng Dâu Ngọt Lịm', color: '#fb7185', shimmerColor: '#ffe4e6', opacity: 0.64 },
      { id: 'eye-sh-09', name: 'Xanh Thiên Hà Huyền Bí', color: '#818cf8', shimmerColor: '#e0e7ff', opacity: 0.68 },
      { id: 'eye-sh-10', name: 'Vàng Kim Sa Lộng Lẫy', color: '#fbbf24', shimmerColor: '#fef9c3', opacity: 0.66 },
      { id: 'eye-sh-11', name: 'Hồng Fuchsia Sân Khấu', color: '#f43f5e', shimmerColor: '#fbcfe8', opacity: 0.66 },
      { id: 'eye-sh-12', name: 'Tím Cầu Vồng Kẹo Bông', color: '#a78bfa', shimmerColor: '#fbcfe8', opacity: 0.66 }
    ],
    eyeColors: [
      { id: 'eye-01', name: 'Xanh Đại Dương Barbie', topColor: '#1d4ed8', midColor: '#3b82f6', botColor: '#93c5fd', sparkleColor: '#e0f2fe' },
      { id: 'eye-02', name: 'Tím Thạch Anh Huyền Ảo', topColor: '#6d28d9', midColor: '#a855f7', botColor: '#e879f9', sparkleColor: '#fae8ff' },
      { id: 'eye-03', name: 'Hồng Kẹo Ngọt', topColor: '#be185d', midColor: '#ec4899', botColor: '#f9a8d4', sparkleColor: '#fff1f2' },
      { id: 'eye-04', name: 'Xanh Ngọc Lục Bảo', topColor: '#047857', midColor: '#10b981', botColor: '#6ee7b7', sparkleColor: '#ecfdf5' },
      { id: 'eye-05', name: 'Xanh Băng Tuyết', topColor: '#0369a1', midColor: '#38bdf8', botColor: '#bae6fd', sparkleColor: '#ffffff' },
      { id: 'eye-06', name: 'Nâu Hổ Phách Ấm Áp', topColor: '#78350f', midColor: '#d97706', botColor: '#fcd34d', sparkleColor: '#fef3c7' },
      { id: 'eye-07', name: 'Vàng Ánh Sao', topColor: '#b45309', midColor: '#f59e0b', botColor: '#fde047', sparkleColor: '#fef9c3' },
      { id: 'eye-08', name: 'Xám Bạc Ánh Trăng', topColor: '#334155', midColor: '#64748b', botColor: '#cbd5e1', sparkleColor: '#f8fafc' },
      { id: 'eye-09', name: 'Xanh Bạc Hà Tiên Cá', topColor: '#0f766e', midColor: '#2dd4bf', botColor: '#99f6e4', sparkleColor: '#f0fdfa' },
      { id: 'eye-10', name: 'Đỏ Ruby Hoàng Gia', topColor: '#9f1239', midColor: '#e11d48', botColor: '#fda4af', sparkleColor: '#ffe4e6' },
      { id: 'eye-11', name: 'Xanh Đêm Ngân Hà', topColor: '#1e1b4b', midColor: '#4f46e5', botColor: '#a5b4fc', sparkleColor: '#e0e7ff' },
      { id: 'eye-12', name: 'Đen Tuyền Long Lanh', topColor: '#0f172a', midColor: '#334155', botColor: '#94a3b8', sparkleColor: '#f1f5f9' }
    ],
    blushes: [
      {
        id: 'blush-01',
        name: 'Má Hồng Tự Nhiên',
        blushColor: '#ff8fa3',
        blushOpacity: 0.48,
        stickerName: 'Không sticker',
        stickerSvg: ''
      },
      {
        id: 'blush-02',
        name: 'Má Đào + Trái Tim Pha Lê',
        blushColor: '#ff758f',
        blushOpacity: 0.56,
        stickerName: 'Trái Tim Pha Lê',
        stickerSvg: '<g transform="translate(355, 244)"><path d="M 0,-3.5 C -2.8,-6.8 -7.2,-4.8 -6.6,-0.5 C -6.0,3.2 0,6.8 0,6.8 C 0,6.8 6.0,3.2 6.6,-0.5 C 7.2,-4.8 2.8,-6.8 0,-3.5 Z" fill="#ff3b9a" stroke="#ffffff" stroke-width="0.9"/><circle cx="-2.2" cy="-1.6" r="1.2" fill="#ffffff" opacity="0.95"/></g>'
      },
      {
        id: 'blush-03',
        name: 'Má Hồng Phấn + Ngôi Sao Vàng',
        blushColor: '#ff9ebb',
        blushOpacity: 0.55,
        stickerName: 'Ngôi Sao Vàng',
        stickerSvg: '<g transform="translate(355, 244)"><path d="M 0,-6.5 L 1.9,-2.1 L 6.6,-1.8 L 3.0,1.4 L 4.1,6.0 L 0,3.5 L -4.1,6.0 L -3.0,1.4 L -6.6,-1.8 L -1.9,-2.1 Z" fill="#fcd34d" stroke="#ffffff" stroke-width="0.8"/><circle cx="-1.2" cy="-1.5" r="1.1" fill="#ffffff" opacity="0.9"/><circle cx="-8.5" cy="-5.2" r="1.4" fill="#fef08a"/></g>'
      },
      {
        id: 'blush-04',
        name: 'Má Cam San Hô + Hoa Anh Đào',
        blushColor: '#ff8c7a',
        blushOpacity: 0.52,
        stickerName: 'Hoa Anh Đào',
        stickerSvg: '<g transform="translate(245, 244)"><circle cx="0" cy="-4.2" r="2.9" fill="#ffb3d1" stroke="#ffffff" stroke-width="0.6"/><circle cx="4.0" cy="-1.3" r="2.9" fill="#ffb3d1" stroke="#ffffff" stroke-width="0.6"/><circle cx="2.5" cy="3.4" r="2.9" fill="#ffb3d1" stroke="#ffffff" stroke-width="0.6"/><circle cx="-2.5" cy="3.4" r="2.9" fill="#ffb3d1" stroke="#ffffff" stroke-width="0.6"/><circle cx="-4.0" cy="-1.3" r="2.9" fill="#ffb3d1" stroke="#ffffff" stroke-width="0.6"/><circle cx="0" cy="0" r="1.9" fill="#fde047"/></g>'
      },
      {
        id: 'blush-05',
        name: 'Má Hồng Dâu + Bướm Tím',
        blushColor: '#fb6f92',
        blushOpacity: 0.56,
        stickerName: 'Bướm Tím Mộng Mơ',
        stickerSvg: '<g transform="translate(355, 243) rotate(10)"><path d="M -1,-1 C -6,-6 -9,-1 -5,2 C -7,5 -3,7 -1,2 Z" fill="#c084fc" stroke="#ffffff" stroke-width="0.7"/><path d="M 1,-1 C 6,-6 9,-1 5,2 C 7,5 3,7 1,2 Z" fill="#e879f9" stroke="#ffffff" stroke-width="0.7"/><ellipse cx="0" cy="0.5" rx="0.9" ry="3.2" fill="#4c1d95"/><circle cx="-3.5" cy="-1.2" r="0.9" fill="#ffffff"/></g>'
      },
      {
        id: 'blush-06',
        name: 'Má Tím Hồng + Trăng Khuyết',
        blushColor: '#f472b6',
        blushOpacity: 0.50,
        stickerName: 'Mặt Trăng Bạc',
        stickerSvg: '<g transform="translate(355, 243)"><path d="M 2,-5.8 C -3.5,-5.2 -5.5,0 -2.2,4.5 C 0,6.6 4.2,6.2 5.6,4.2 C 2.2,4.6 0,2.2 0,-0.8 C 0,-3.2 1.1,-4.8 2,-5.8 Z" fill="#fde68a" stroke="#ffffff" stroke-width="0.7"/><circle cx="4.5" cy="-3.0" r="1.2" fill="#ffffff"/></g>'
      },
      {
        id: 'blush-07',
        name: 'Má Hồng Kẹo + Nơ Hồng Nhí',
        blushColor: '#ff7aa2',
        blushOpacity: 0.55,
        stickerName: 'Nơ Hồng Nhí',
        stickerSvg: '<g transform="translate(245, 244) rotate(-8)"><path d="M 0,0 C -4,-4.5 -8,-2.5 -7.5,1.5 C -7,4.5 -2.5,2.5 0,0 Z" fill="#ff5ca8" stroke="#ffffff" stroke-width="0.7"/><path d="M 0,0 C 4,-4.5 8,-2.5 7.5,1.5 C 7,4.5 2.5,2.5 0,0 Z" fill="#ff5ca8" stroke="#ffffff" stroke-width="0.7"/><circle cx="0" cy="0" r="1.9" fill="#ffe4f2" stroke="#ffffff" stroke-width="0.5"/></g>'
      },
      {
        id: 'blush-08',
        name: 'Má Đào Ngọt + Dâu Tây',
        blushColor: '#ff708d',
        blushOpacity: 0.54,
        stickerName: 'Dâu Tây Ngọt',
        stickerSvg: '<g transform="translate(355, 244)"><path d="M -4,-2 C -4,-4.5 4,-4.5 4,-2 C 4.5,2 1.8,6 0,6 C -1.8,6 -4.5,2 -4,-2 Z" fill="#f43f5e" stroke="#ffffff" stroke-width="0.7"/><path d="M -3.5,-3 L 0,-5.5 L 3.5,-3 L 1.2,-2 L -1.2,-2 Z" fill="#4ade80"/><circle cx="-1.3" cy="0.5" r="0.6" fill="#fef08a"/><circle cx="1.4" cy="1.2" r="0.6" fill="#fef08a"/><circle cx="0" cy="3.2" r="0.6" fill="#fef08a"/></g>'
      },
      {
        id: 'blush-09',
        name: 'Má Băng Tuyết + Kim Cương',
        blushColor: '#ffa6c1',
        blushOpacity: 0.52,
        stickerName: 'Kim Cương Băng',
        stickerSvg: '<g transform="translate(245, 244)"><polygon points="-4,-3 4,-3 6,0 0,6 -6,0" fill="#7dd3fc" stroke="#ffffff" stroke-width="0.8"/><polyline points="-4,-3 -2,0 0,6 2,0 4,-3" fill="none" stroke="#e0f2fe" stroke-width="0.7"/><circle cx="-1.5" cy="-1.2" r="1" fill="#ffffff"/></g>'
      },
      {
        id: 'blush-10',
        name: 'Má Hồng Mơ + Vương Miện Nhí',
        blushColor: '#ff99ac',
        blushOpacity: 0.54,
        stickerName: 'Vương Miện Nhí',
        stickerSvg: '<g transform="translate(355, 244)"><path d="M -5.5,3 L -6.5,-3.5 L -2.5,0 L 0,-5 L 2.5,0 L 6.5,-3.5 L 5.5,3 Z" fill="#fbbf24" stroke="#ffffff" stroke-width="0.7"/><circle cx="0" cy="0.6" r="1.2" fill="#ec4899"/></g>'
      },
      {
        id: 'blush-11',
        name: 'Má Cầu Vồng + Cầu Vồng Nhỏ',
        blushColor: '#ff85b3',
        blushOpacity: 0.52,
        stickerName: 'Cầu Vồng Nhỏ',
        stickerSvg: '<g transform="translate(355, 245)"><path d="M -6,1 A 6,6 0 0 1 6,1" fill="none" stroke="#ff69b4" stroke-width="2" stroke-linecap="round"/><path d="M -4.2,1 A 4.2,4.2 0 0 1 4.2,1" fill="none" stroke="#fde047" stroke-width="1.8" stroke-linecap="round"/><path d="M -2.4,1 A 2.4,2.4 0 0 1 2.4,1" fill="none" stroke="#60a5fa" stroke-width="1.5" stroke-linecap="round"/><circle cx="-5.5" cy="1.8" r="2.1" fill="#ffffff"/><circle cx="5.5" cy="1.8" r="2.1" fill="#ffffff"/></g>'
      },
      {
        id: 'blush-12',
        name: 'Má Ấm Áp + Sao Lấp Lánh Đôi',
        blushColor: '#ff928b',
        blushOpacity: 0.50,
        stickerName: 'Sao Lấp Lánh Đôi',
        stickerSvg: '<g><path d="M 245,239 L 246.3,242.5 L 249.8,243.8 L 246.3,245.1 L 245,248.6 L 243.7,245.1 L 240.2,243.8 L 243.7,242.5 Z" fill="#fef08a" stroke="#ffffff" stroke-width="0.6"/><path d="M 355,239 L 356.3,242.5 L 359.8,243.8 L 356.3,245.1 L 355,248.6 L 353.7,245.1 L 350.2,243.8 L 353.7,242.5 Z" fill="#fef08a" stroke="#ffffff" stroke-width="0.6"/><circle cx="252" cy="249" r="1.2" fill="#ffffff"/><circle cx="348" cy="249" r="1.2" fill="#ffffff"/></g>'
      }
    ]
  };

  // ==================== MAKEUP & NAIL APPLICATION HELPER ====================
  function resolveMakeupItem(list, val) {
    if (!Array.isArray(list) || list.length === 0) return null;
    if (val && typeof val === 'object') return val;
    if (typeof val === 'number' && list[val]) return list[val];
    if (typeof val === 'string') {
      const found = list.find((item) => item.id === val);
      if (found) return found;
    }
    return list[0];
  }

  // Nail tip center coordinates for miniature pattern/charm overlays on the doll's hands
  const NAIL_ANCHORS = {
    left: [
      { cx: 191.0, cy: 516.8, tipX: 191.4, tipY: 518.6, rot: -15 },
      { cx: 184.0, cy: 533.2, tipX: 184.0, tipY: 535.2, rot: 4 },
      { cx: 176.4, cy: 539.0, tipX: 176.4, tipY: 541.1, rot: 6 },
      { cx: 168.0, cy: 533.6, tipX: 167.9, tipY: 535.6, rot: 12 },
      { cx: 161.4, cy: 524.3, tipX: 161.2, tipY: 526.0, rot: 18 }
    ],
    right: [
      { cx: 409.0, cy: 516.8, tipX: 408.6, tipY: 518.6, rot: 15 },
      { cx: 416.0, cy: 533.2, tipX: 416.0, tipY: 535.2, rot: -4 },
      { cx: 423.6, cy: 539.0, tipX: 423.6, tipY: 541.1, rot: -6 },
      { cx: 432.0, cy: 533.6, tipX: 432.1, tipY: 535.6, rot: -12 },
      { cx: 438.6, cy: 524.3, tipX: 438.8, tipY: 526.0, rot: -18 }
    ]
  };

  function resolveNailColor(color) {
    if (!color || typeof color !== 'string') return '#ff85c1';
    if (color.indexOf('gradient') !== -1 || color === 'rainbow') {
      return 'url(#doll-nail-rainbow)';
    }
    return color;
  }

  function buildNailFxMarkup(anchor, pattern, charm) {
    if (!anchor) return '';
    let markup = '';
    const { cx, cy, tipX, tipY, rot } = anchor;

    if (pattern === 'french') {
      markup += `<ellipse cx="${tipX}" cy="${tipY}" rx="1.45" ry="0.8" transform="rotate(${rot} ${tipX} ${tipY})" fill="#ffffff" opacity="0.95"/>`;
    } else if (pattern === 'glitter') {
      markup += `<circle cx="${cx - 0.6}" cy="${cy - 0.8}" r="0.55" fill="#ffffff"/><circle cx="${cx + 0.6}" cy="${cy + 0.5}" r="0.55" fill="#fef08a"/><circle cx="${cx - 0.2}" cy="${cy + 1.1}" r="0.45" fill="#ffffff"/>`;
    } else if (pattern === 'dots') {
      markup += `<circle cx="${cx - 0.5}" cy="${cy - 0.7}" r="0.5" fill="#ffffff"/><circle cx="${cx + 0.6}" cy="${cy + 0.7}" r="0.5" fill="#ffffff"/>`;
    } else if (pattern === 'hearts') {
      markup += `<circle cx="${cx}" cy="${cy}" r="0.8" fill="#ffffff" opacity="0.9"/>`;
    } else if (pattern === 'stars') {
      markup += `<circle cx="${cx}" cy="${cy}" r="0.75" fill="#fef08a" opacity="0.95"/>`;
    }

    if (charm && charm !== 'none' && charm !== 'khong') {
      markup += `<circle cx="${cx}" cy="${cy - 0.3}" r="1.05" fill="#ffffff" stroke="#fbbf24" stroke-width="0.45"/>`;
    } else if (!pattern || pattern === 'glossy') {
      // Subtle 2.5D lacquer gloss dot
      markup += `<ellipse cx="${cx - 0.35}" cy="${cy - 0.7}" rx="0.45" ry="0.9" transform="rotate(${rot} ${cx} ${cy})" fill="#ffffff" opacity="0.65"/>`;
    }
    return markup;
  }

  function applyDollMakeup(state, rootEl) {
    ensureRigStyles();
    if (typeof document === 'undefined') return;

    const svg = rootEl || document.getElementById('princess-svg');
    if (!svg) return;

    const s = state || {};
    const mk = s.makeup || {};

    const lipstick = resolveMakeupItem(
      MAKEUP_DATA.lipsticks,
      mk.lipstick ?? s.lipstick ?? s.lipstickIndex
    );
    const eyeshadow = resolveMakeupItem(
      MAKEUP_DATA.eyeshadows,
      mk.eyeshadow ?? s.eyeshadow ?? s.eyeshadowIndex
    );
    const eyeColor = resolveMakeupItem(
      MAKEUP_DATA.eyeColors,
      mk.eyeColor ?? s.eyeColor ?? s.eyeColorIndex
    );
    const blush = resolveMakeupItem(
      MAKEUP_DATA.blushes,
      mk.blush ?? s.blush ?? s.blushIndex
    );

    const findEl = (id) => svg.querySelector('#' + id) || document.getElementById(id);

    // 1. Lipstick
    if (lipstick) {
      const lipsFill = findEl('doll-lips-fill');
      const lipsGloss = findEl('doll-lips-gloss');
      if (lipsFill) lipsFill.setAttribute('fill', lipstick.color);
      if (lipsGloss) {
        lipsGloss.setAttribute('fill', lipstick.highlight || '#ffb8dc');
        lipsGloss.setAttribute('opacity', String(lipstick.glossOpacity ?? 0.85));
      }
    }

    // 2. Eyeshadow
    if (eyeshadow) {
      const esLeft = findEl('doll-eyeshadow-left');
      const esRight = findEl('doll-eyeshadow-right');
      const shimLeft = findEl('doll-eyeshadow-shimmer-left');
      const shimRight = findEl('doll-eyeshadow-shimmer-right');
      [esLeft, esRight].forEach((el) => {
        if (!el) return;
        el.setAttribute('fill', eyeshadow.color);
        el.setAttribute('opacity', String(eyeshadow.opacity ?? 0.62));
      });
      [shimLeft, shimRight].forEach((el) => {
        if (!el) return;
        el.setAttribute('fill', eyeshadow.shimmerColor || '#ffe6f5');
      });
    }

    // 3. Eye Iris Colors (gradient stops + CSS custom properties)
    if (eyeColor) {
      if (svg.style && typeof svg.style.setProperty === 'function') {
        svg.style.setProperty('--eye-top', eyeColor.topColor);
        svg.style.setProperty('--eye-mid', eyeColor.midColor);
        svg.style.setProperty('--eye-bot', eyeColor.botColor);
        svg.style.setProperty('--eye-glow', eyeColor.sparkleColor || '#ffffff');
      }
      ['left', 'right'].forEach((side) => {
        const sTop = findEl('doll-iris-' + side + '-top');
        const sMid = findEl('doll-iris-' + side + '-mid');
        const sBot = findEl('doll-iris-' + side + '-bot');
        const sGlow = findEl('doll-iris-glow-' + side + '-stop');
        if (sTop) sTop.setAttribute('stop-color', eyeColor.topColor);
        if (sMid) sMid.setAttribute('stop-color', eyeColor.midColor);
        if (sBot) sBot.setAttribute('stop-color', eyeColor.botColor);
        if (sGlow) sGlow.setAttribute('stop-color', eyeColor.sparkleColor || '#ffffff');
      });
    }

    // 4. Cheek Blush & Face Sticker
    if (blush) {
      const blLeft = findEl('doll-blush-left');
      const blRight = findEl('doll-blush-right');
      [blLeft, blRight].forEach((el) => {
        if (!el) return;
        el.setAttribute('fill', blush.blushColor);
        el.setAttribute('opacity', String(blush.blushOpacity ?? 0.5));
      });
      const stickerSlot = findEl('doll-face-sticker');
      if (stickerSlot) {
        stickerSlot.innerHTML = blush.stickerSvg || '';
      }
    }

    // 5. Nail Polish & Patterns/Charms from state.nails
    if (s.nails) {
      const nailsSrc = Array.isArray(s.nails)
        ? s.nails
        : Array.isArray(s.nails.fingers)
          ? s.nails.fingers
          : s.nails;

      const nailNodes = svg.querySelectorAll('.doll-nail');
      nailNodes.forEach((nailEl) => {
        const fingerIdx = Number(nailEl.getAttribute('data-finger'));
        const hand = nailEl.getAttribute('data-hand') || 'left';
        let fData = null;

        if (Array.isArray(nailsSrc)) {
          fData = nailsSrc[fingerIdx];
        } else if (nailsSrc && typeof nailsSrc === 'object') {
          if (Array.isArray(nailsSrc[hand])) {
            fData = nailsSrc[hand][fingerIdx];
          } else {
            fData = nailsSrc[fingerIdx] || nailsSrc[String(fingerIdx)];
          }
        }

        if (fData && typeof fData === 'object') {
          const fillVal = resolveNailColor(fData.color);
          nailEl.setAttribute('fill', fillVal);
          if (fData.stroke) nailEl.setAttribute('stroke', fData.stroke);
        } else if (typeof fData === 'string') {
          nailEl.setAttribute('fill', resolveNailColor(fData));
        }
      });

      const fxNodes = svg.querySelectorAll('.doll-nail-fx');
      fxNodes.forEach((fxEl) => {
        const fingerIdx = Number(fxEl.getAttribute('data-finger'));
        const hand = fxEl.getAttribute('data-hand') || 'left';
        let fData = null;

        if (Array.isArray(nailsSrc)) {
          fData = nailsSrc[fingerIdx];
        } else if (nailsSrc && typeof nailsSrc === 'object') {
          if (Array.isArray(nailsSrc[hand])) {
            fData = nailsSrc[hand][fingerIdx];
          } else {
            fData = nailsSrc[fingerIdx] || nailsSrc[String(fingerIdx)];
          }
        }

        const anchor = NAIL_ANCHORS[hand] && NAIL_ANCHORS[hand][fingerIdx];
        if (fData && typeof fData === 'object') {
          fxEl.innerHTML = buildNailFxMarkup(anchor, fData.pattern, fData.charm);
        } else {
          fxEl.innerHTML = buildNailFxMarkup(anchor, 'glossy', 'none');
        }
      });
    }
  }

  ensureRigStyles();

  global.DOLL_RIG_CSS = DOLL_RIG_CSS;
  global.DOLL_RIG = {
    defsSvg,
    legsSvg,
    torsoSvg,
    armsSvg,
    headSvg
  };
  global.MAKEUP_DATA = MAKEUP_DATA;
  global.applyDollMakeup = applyDollMakeup;
})(typeof window !== 'undefined' ? window : globalThis);
