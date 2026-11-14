(() => {
  const lg = (id, x1, y1, x2, y2, stops, userSpace = false) =>
    `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"${userSpace ? ' gradientUnits="userSpaceOnUse"' : ''}>` +
    stops.map(([off, col, op]) => `<stop offset="${off}" stop-color="${col}"${op !== undefined ? ` stop-opacity="${op}"` : ''}/>`).join('') +
    `</linearGradient>`;

  const rg = (id, cx, cy, r, stops, fx = cx, fy = cy, userSpace = false) =>
    `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}" fx="${fx}" fy="${fy}"${userSpace ? ' gradientUnits="userSpaceOnUse"' : ''}>` +
    stops.map(([off, col, op]) => `<stop offset="${off}" stop-color="${col}"${op !== undefined ? ` stop-opacity="${op}"` : ''}/>`).join('') +
    `</radialGradient>`;

  const sparkle = (x, y, r, fill = '#ffffff', op = 0.95) =>
    `<path d="M${x},${y - r} Q${x},${y} ${x + r},${y} Q${x},${y} ${x},${y + r} Q${x},${y} ${x - r},${y} Q${x},${y} ${x},${y - r} Z" fill="${fill}" opacity="${op}"/>`;

  const pearl = (cx, cy, r, gradId, stroke = '#d9cfe6') =>
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${gradId})" stroke="${stroke}" stroke-width="0.9"/>` +
    `<circle cx="${(cx - r * 0.32).toFixed(1)}" cy="${(cy - r * 0.32).toFixed(1)}" r="${(r * 0.28).toFixed(1)}" fill="#ffffff" opacity="0.92"/>`;

  const diamondGem = (cx, cy, rx, ry, gradId, rim = '#fff8dc') =>
    `<polygon points="${cx},${cy - ry} ${cx + rx},${cy} ${cx},${cy + ry} ${cx - rx},${cy}" fill="url(#${gradId})" stroke="${rim}" stroke-width="1.3" stroke-linejoin="round"/>` +
    `<polygon points="${cx},${cy - ry * 0.56} ${cx + rx * 0.54},${cy} ${cx},${cy + ry * 0.56} ${cx - rx * 0.54},${cy}" fill="#ffffff" opacity="0.34"/>` +
    `<ellipse cx="${(cx - rx * 0.24).toFixed(1)}" cy="${(cy - ry * 0.28).toFixed(1)}" rx="${(rx * 0.22).toFixed(1)}" ry="${(ry * 0.16).toFixed(1)}" fill="#ffffff" opacity="0.88"/>`;

  const ovalGem = (cx, cy, rx, ry, gradId, rim = '#ffffff') =>
    `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#${gradId})" stroke="${rim}" stroke-width="1.2"/>` +
    `<ellipse cx="${(cx - rx * 0.25).toFixed(1)}" cy="${(cy - ry * 0.3).toFixed(1)}" rx="${(rx * 0.42).toFixed(1)}" ry="${(ry * 0.28).toFixed(1)}" fill="#ffffff" opacity="0.52"/>` +
    `<circle cx="${(cx - rx * 0.32).toFixed(1)}" cy="${(cy - ry * 0.34).toFixed(1)}" r="${Math.max(1.4, rx * 0.18).toFixed(1)}" fill="#ffffff" opacity="0.92"/>`;

  const daisy = (cx, cy, r, petalFill, centerFill, stroke = '#e8d7b8') => {
    let petals = '';
    for (let i = 0; i < 8; i++) {
      const ang = (i * 45 * Math.PI) / 180;
      const px = (cx + Math.cos(ang) * r * 0.65).toFixed(1);
      const py = (cy + Math.sin(ang) * r * 0.65).toFixed(1);
      petals += `<ellipse cx="${px}" cy="${py}" rx="${(r * 0.45).toFixed(1)}" ry="${(r * 0.24).toFixed(1)}" transform="rotate(${i * 45} ${px} ${py})" fill="${petalFill}" stroke="${stroke}" stroke-width="0.7"/>`;
    }
    return petals +
      `<circle cx="${cx}" cy="${cy}" r="${(r * 0.36).toFixed(1)}" fill="${centerFill}" stroke="#d9951e" stroke-width="0.8"/>` +
      `<circle cx="${(cx - r * 0.1).toFixed(1)}" cy="${(cy - r * 0.1).toFixed(1)}" r="${(r * 0.12).toFixed(1)}" fill="#fffce0" opacity="0.85"/>`;
  };

  const flower5 = (cx, cy, r, petalGrad, centerCol = '#ffe169') => {
    let petals = '';
    for (let i = 0; i < 5; i++) {
      const a = (i * 72 - 90) * Math.PI / 180;
      const px = (cx + Math.cos(a) * r * 0.56).toFixed(1);
      const py = (cy + Math.sin(a) * r * 0.56).toFixed(1);
      petals += `<circle cx="${px}" cy="${py}" r="${(r * 0.46).toFixed(1)}" fill="url(#${petalGrad})" stroke="#ffffff" stroke-width="0.8" stroke-opacity="0.65"/>`;
    }
    return petals +
      `<circle cx="${cx}" cy="${cy}" r="${(r * 0.28).toFixed(1)}" fill="${centerCol}" stroke="#e6a622" stroke-width="0.8"/>` +
      `<circle cx="${(cx - r * 0.08).toFixed(1)}" cy="${(cy - r * 0.08).toFixed(1)}" r="${(r * 0.1).toFixed(1)}" fill="#ffffff" opacity="0.85"/>`;
  };

  // Standard 2.5D anime angel-ring specular crown gloss arching across y ~ 142..166
  const angelRing = (gradId, yTop = 146, op = 0.78) =>
    `<path d="M242,${yTop + 18} Q262,${yTop + 2} 282,${yTop + 8} L286,${yTop + 14} Q294,${yTop} 303,${yTop + 7} L308,${yTop + 13} Q318,${yTop - 1} 330,${yTop + 7} L335,${yTop + 13} Q346,${yTop + 3} 358,${yTop + 17} ` +
    `Q345,${yTop + 12} 334,${yTop + 20} L329,${yTop + 15} Q318,${yTop + 9} 308,${yTop + 20} L302,${yTop + 15} Q293,${yTop + 10} 285,${yTop + 21} L280,${yTop + 16} Q262,${yTop + 11} 242,${yTop + 18} Z" fill="url(#${gradId})" opacity="${op}"/>`;

  // Rich under-head hair shell behind face & neck so neither doll nor thumbnail ever shows gaps
  const innerHeadShell = (fill, stroke) =>
    `<path d="M222,195 C220,145 256,125 300,125 C344,125 380,145 378,195 C382,245 372,292 346,312 L254,312 C228,292 218,245 222,195 Z" fill="${fill}" stroke="${stroke}" stroke-width="1.6"/>`;

  // Sculpted cheek-framing side locks positioned cleanly outside x:222..378 at ear/earring height (y:215..260),
  // tapering softly below jawline so eyes, brows, cheek stickers & earrings remain crisp and unobstructed.
  const sideLocks = (leftFill, rightFill, stroke, yEnd = 308) =>
    `<path d="M225,180 C203,208 200,256 218,296 C225,310 235,${yEnd} 236,302 C221,274 218,236 227,196 Z" fill="${leftFill}" stroke="${stroke}" stroke-width="1.6"/>` +
    `<path d="M375,180 C397,208 400,256 382,296 C375,310 365,${yEnd} 364,302 C379,274 382,236 373,196 Z" fill="${rightFill}" stroke="${stroke}" stroke-width="1.6"/>`;

  window.WARDROBE_HAIR_HATS = [
    // =========================================================================
    // 1. Blonde Barbie Waves + Golden Diamond Tiara
    // =========================================================================
    {
      id: 'hair-01',
      name: 'Tóc Vàng Sóng & Vương Miện Kim Cương',
      icon: '👑',
      accentColor: '#f6c445',
      previewBox: '130 35 340 340',
      defs:
        lg('hair01-base', '0%', '0%', '0%', '100%', [
          ['0%', '#fff6bf'],
          ['24%', '#ffe066'],
          ['62%', '#f2b830'],
          ['100%', '#c98218']
        ]) +
        lg('hair01-deep', '0%', '0%', '0%', '100%', [
          ['0%', '#d99621'],
          ['55%', '#ad6c10'],
          ['100%', '#784407']
        ]) +
        lg('hair01-hi', '0%', '0%', '100%', '0%', [
          ['0%', '#ffffff', 0.1],
          ['48%', '#fffde0', 0.92],
          ['100%', '#ffffff', 0.1]
        ]) +
        lg('hair01-gold', '0%', '0%', '100%', '100%', [
          ['0%', '#fff9cc'],
          ['30%', '#ffd859'],
          ['65%', '#e6a519'],
          ['100%', '#a86b08']
        ]) +
        rg('hair01-pinkgem', '38%', '32%', '68%', [
          ['0%', '#ffe6f4'],
          ['38%', '#ff59b4'],
          ['82%', '#cf1578'],
          ['100%', '#8a084c']
        ]) +
        rg('hair01-bluegem', '35%', '30%', '70%', [
          ['0%', '#ffffff'],
          ['40%', '#7de3ff'],
          ['85%', '#1f9cf0'],
          ['100%', '#0e5da8']
        ]) +
        rg('hair01-pearl', '35%', '32%', '65%', [
          ['0%', '#ffffff'],
          ['55%', '#fff5f9'],
          ['100%', '#d9c4d0']
        ]),
      backSvg:
        innerHeadShell('url(#hair01-deep)', '#9e630c') +
        `<path d="M226,188 C192,235 170,295 186,355 C198,402 152,445 166,515 C176,568 154,615 182,662 C202,650 220,628 232,648 C258,668 282,642 300,656 C318,642 342,668 368,648 C380,628 398,650 418,662 C446,615 424,568 434,515 C448,445 402,402 414,355 C430,295 408,235 374,188 Z" fill="url(#hair01-base)" stroke="#a3680e" stroke-width="2" stroke-linejoin="round"/>` +
        `<path d="M188,354 C216,368 228,396 206,435 C185,470 218,505 196,558 C182,592 204,625 186,654 C170,618 182,566 172,516 C160,452 198,406 188,354 Z" fill="url(#hair01-deep)" opacity="0.45"/>` +
        `<path d="M412,354 C384,368 372,396 394,435 C415,470 382,505 404,558 C418,592 396,625 414,654 C430,618 418,566 428,516 C440,452 402,406 412,354 Z" fill="url(#hair01-deep)" opacity="0.45"/>` +
        `<path d="M235,515 C248,556 226,605 248,645 C262,620 278,568 265,522 Z" fill="url(#hair01-deep)" opacity="0.34"/>` +
        `<path d="M365,515 C352,556 374,605 352,645 C338,620 322,568 335,522 Z" fill="url(#hair01-deep)" opacity="0.34"/>` +
        `<path d="M196,295 C184,335 206,368 188,415 C176,448 198,488 182,535 C196,496 215,458 202,416 C220,372 198,334 210,295 Z" fill="#fffbe0" opacity="0.58"/>` +
        `<path d="M404,295 C416,335 394,368 412,415 C424,448 402,488 418,535 C404,496 385,458 398,416 C380,372 402,334 390,295 Z" fill="#fffbe0" opacity="0.58"/>` +
        `<path d="M204,552 Q216,592 204,630 Q222,598 214,554 Z" fill="#fffbe0" opacity="0.5"/>` +
        `<path d="M396,552 Q384,592 396,630 Q378,598 386,554 Z" fill="#fffbe0" opacity="0.5"/>`,
      frontSvg:
        `<path d="M214,208 C214,152 248,125 300,125 C352,125 386,152 386,208 C374,186 356,170 336,166 C318,176 306,184 298,166 C284,180 264,182 244,180 C230,186 222,196 214,208 Z" fill="url(#hair01-base)" stroke="#a3680e" stroke-width="1.8"/>` +
        `<path d="M294,135 C274,152 254,174 234,188 C254,182 276,172 294,154 C300,168 318,178 340,180 C356,182 368,188 376,202 C372,168 342,136 294,135 Z" fill="url(#hair01-base)" stroke="#a3680e" stroke-width="1.5"/>` +
        sideLocks('url(#hair01-base)', 'url(#hair01-base)', '#a3680e', 318) +
        `<path d="M216,208 C210,236 210,266 222,292 C218,264 218,236 222,210 Z" fill="#fffde0" opacity="0.65"/>` +
        `<path d="M384,208 C390,236 390,266 378,292 C382,264 382,236 378,210 Z" fill="#fffde0" opacity="0.65"/>` +
        angelRing('hair01-hi', 141, 0.82) +
        `<path d="M236,134 Q300,118 364,134 L356,120 Q300,104 244,120 Z" fill="url(#hair01-gold)" stroke="#8c5705" stroke-width="1.6"/>` +
        `<path d="M244,122 C240,98 248,80 258,78 C266,86 270,102 276,108 C280,80 290,54 300,48 C310,54 320,80 324,108 C330,102 334,86 342,78 C352,80 360,98 356,122 Q300,106 244,122 Z" fill="url(#hair01-gold)" stroke="#8c5705" stroke-width="1.7" stroke-linejoin="round"/>` +
        `<path d="M254,114 Q264,92 275,110 M282,108 Q300,68 318,108 M325,110 Q336,92 346,114" fill="none" stroke="#fff9cc" stroke-width="1.8" stroke-linecap="round" opacity="0.85"/>` +
        pearl(258, 76, 4.2, 'hair01-pearl') +
        pearl(342, 76, 4.2, 'hair01-pearl') +
        pearl(300, 46, 5, 'hair01-pearl') +
        diamondGem(264, 108, 6.5, 9, 'hair01-bluegem') +
        diamondGem(336, 108, 6.5, 9, 'hair01-bluegem') +
        diamondGem(300, 92, 11, 16, 'hair01-pinkgem', '#fff9d6') +
        sparkle(252, 62, 7, '#fffdf0') +
        sparkle(348, 64, 6, '#fffdf0') +
        sparkle(316, 48, 8, '#ffffff')
    },

    // =========================================================================
    // 2. Pastel Pink Twin-Tails + Satin Silk Bows
    // =========================================================================
    {
      id: 'hair-02',
      name: 'Tóc Hai Chùm Hồng Pastel & Nơ Lụa',
      icon: '🎀',
      accentColor: '#ff7eb9',
      previewBox: '105 55 390 340',
      defs:
        lg('hair02-base', '0%', '0%', '0%', '100%', [
          ['0%', '#ffeaf6'],
          ['28%', '#ffb3db'],
          ['70%', '#f272b2'],
          ['100%', '#bd3e7d']
        ]) +
        lg('hair02-deep', '0%', '0%', '0%', '100%', [
          ['0%', '#e069a6'],
          ['65%', '#ab3874'],
          ['100%', '#751c4a']
        ]) +
        lg('hair02-hi', '0%', '0%', '100%', '0%', [
          ['0%', '#ffffff', 0.15],
          ['50%', '#ffffff', 0.92],
          ['100%', '#ffffff', 0.15]
        ]) +
        lg('hair02-bow', '0%', '0%', '100%', '100%', [
          ['0%', '#ffcce6'],
          ['40%', '#ff5ca8'],
          ['80%', '#d92678'],
          ['100%', '#9c1150']
        ]) +
        rg('hair02-pearl', '35%', '30%', '65%', [
          ['0%', '#ffffff'],
          ['60%', '#ffeef7'],
          ['100%', '#dfb8cc']
        ]),
      backSvg:
        innerHeadShell('url(#hair02-deep)', '#912a60') +
        `<path d="M226,154 C180,148 142,190 134,254 C128,308 112,356 128,412 C138,448 118,496 144,548 C156,572 178,568 184,542 C188,522 174,492 186,465 C202,430 182,385 198,342 C214,300 200,242 226,184 Z" fill="url(#hair02-base)" stroke="#9c2c66" stroke-width="2" stroke-linejoin="round"/>` +
        `<path d="M374,154 C420,148 458,190 466,254 C472,308 488,356 472,412 C462,448 482,496 456,548 C444,572 422,568 416,542 C412,522 426,492 414,465 C398,430 418,385 402,342 C386,300 400,242 374,184 Z" fill="url(#hair02-base)" stroke="#9c2c66" stroke-width="2" stroke-linejoin="round"/>` +
        `<path d="M160,248 C144,296 164,335 144,386 C132,418 158,452 146,506 C158,476 174,442 162,395 C178,346 158,304 176,254 Z" fill="url(#hair02-deep)" opacity="0.42"/>` +
        `<path d="M440,248 C456,296 436,335 456,386 C468,418 442,452 454,506 C442,476 426,442 438,395 C422,346 442,304 424,254 Z" fill="url(#hair02-deep)" opacity="0.42"/>` +
        `<path d="M168,206 C148,248 154,288 142,332 C160,295 162,252 180,214 Z" fill="#fff5fa" opacity="0.65"/>` +
        `<path d="M432,206 C452,248 446,288 458,332 C440,295 438,252 420,214 Z" fill="#fff5fa" opacity="0.65"/>` +
        `<path d="M148,408 C136,445 154,485 150,528 C162,492 152,448 160,414 Z" fill="#fff5fa" opacity="0.58"/>` +
        `<path d="M452,408 C464,445 446,485 450,528 C438,492 448,448 440,414 Z" fill="#fff5fa" opacity="0.58"/>`,
      frontSvg:
        `<path d="M216,208 C214,150 250,124 300,124 C350,124 386,150 384,208 C370,188 354,176 338,174 C330,182 320,185 310,184 C304,176 302,164 300,152 C298,164 296,176 290,184 C280,185 270,182 262,174 C246,176 230,188 216,208 Z" fill="url(#hair02-base)" stroke="#9c2c66" stroke-width="1.8"/>` +
        `<path d="M295,152 C292,168 295,184 300,192 C305,184 308,168 305,152 Z" fill="url(#hair02-base)" stroke="#9c2c66" stroke-width="1.2"/>` +
        sideLocks('url(#hair02-base)', 'url(#hair02-base)', '#9c2c66', 306) +
        angelRing('hair02-hi', 140, 0.85) +
        `<path d="M224,162 Q300,114 376,162" fill="none" stroke="#ff7ec0" stroke-width="4.5" stroke-linecap="round"/>` +
        pearl(252, 141, 4, 'hair02-pearl') +
        pearl(276, 134, 4.5, 'hair02-pearl') +
        pearl(300, 132, 5, 'hair02-pearl') +
        pearl(324, 134, 4.5, 'hair02-pearl') +
        pearl(348, 141, 4, 'hair02-pearl') +
        `<g transform="translate(216,154) rotate(-26)">` +
          `<path d="M-8,8 L-28,68 L-12,60 L-2,72 L2,10 Z" fill="url(#hair02-bow)" stroke="#8a0d45" stroke-width="1.5"/>` +
          `<path d="M8,8 L28,68 L12,60 L2,72 L-2,10 Z" fill="url(#hair02-bow)" stroke="#8a0d45" stroke-width="1.5"/>` +
          `<path d="M-4,0 C-26,-28 -56,-20 -52,4 C-48,28 -18,22 -4,6 Z" fill="url(#hair02-bow)" stroke="#8a0d45" stroke-width="1.6"/>` +
          `<path d="M4,0 C26,-28 56,-20 52,4 C48,28 18,22 4,6 Z" fill="url(#hair02-bow)" stroke="#8a0d45" stroke-width="1.6"/>` +
          `<path d="M-44,-4 Q-26,-12 -10,-1 M10,-1 Q26,-12 44,-4" fill="none" stroke="#ffe6f2" stroke-width="2" stroke-linecap="round" opacity="0.8"/>` +
          `<rect x="-9" y="-9" width="18" height="18" rx="6" fill="url(#hair02-bow)" stroke="#8a0d45" stroke-width="1.5"/>` +
          pearl(0, 0, 5, 'hair02-pearl') +
        `</g>` +
        `<g transform="translate(384,154) rotate(26)">` +
          `<path d="M-8,8 L-28,68 L-12,60 L-2,72 L2,10 Z" fill="url(#hair02-bow)" stroke="#8a0d45" stroke-width="1.5"/>` +
          `<path d="M8,8 L28,68 L12,60 L2,72 L-2,10 Z" fill="url(#hair02-bow)" stroke="#8a0d45" stroke-width="1.5"/>` +
          `<path d="M-4,0 C-26,-28 -56,-20 -52,4 C-48,28 -18,22 -4,6 Z" fill="url(#hair02-bow)" stroke="#8a0d45" stroke-width="1.6"/>` +
          `<path d="M4,0 C26,-28 56,-20 52,4 C48,28 18,22 4,6 Z" fill="url(#hair02-bow)" stroke="#8a0d45" stroke-width="1.6"/>` +
          `<path d="M-44,-4 Q-26,-12 -10,-1 M10,-1 Q26,-12 44,-4" fill="none" stroke="#ffe6f2" stroke-width="2" stroke-linecap="round" opacity="0.8"/>` +
          `<rect x="-9" y="-9" width="18" height="18" rx="6" fill="url(#hair02-bow)" stroke="#8a0d45" stroke-width="1.5"/>` +
          pearl(0, 0, 5, 'hair02-pearl') +
        `</g>` +
        sparkle(168, 120, 7, '#ffffff') +
        sparkle(432, 120, 7, '#ffffff') +
        sparkle(300, 114, 6, '#ffe6f4')
    },

    // =========================================================================
    // 3. Ice Blue Braided Crown + Snowflake Crystal Tiara
    // =========================================================================
    {
      id: 'hair-03',
      name: 'Tóc Tết Băng Giá & Vương Miện Tuyết',
      icon: '❄️',
      accentColor: '#58c4ff',
      previewBox: '135 32 330 345',
      defs:
        lg('hair03-base', '0%', '0%', '0%', '100%', [
          ['0%', '#f7fdff'],
          ['30%', '#bae9ff'],
          ['70%', '#62bef5'],
          ['100%', '#287fc2']
        ]) +
        lg('hair03-deep', '0%', '0%', '0%', '100%', [
          ['0%', '#62b2e8'],
          ['55%', '#327ab8'],
          ['100%', '#184b85']
        ]) +
        lg('hair03-hi', '0%', '0%', '100%', '0%', [
          ['0%', '#ffffff', 0.15],
          ['50%', '#ffffff', 0.95],
          ['100%', '#ffffff', 0.15]
        ]) +
        lg('hair03-ice', '0%', '0%', '100%', '100%', [
          ['0%', '#ffffff'],
          ['35%', '#b8f0ff'],
          ['75%', '#4cb8ff'],
          ['100%', '#1c78d4']
        ]) +
        rg('hair03-gem', '38%', '32%', '68%', [
          ['0%', '#ffffff'],
          ['40%', '#8ff0ff'],
          ['82%', '#1494f5'],
          ['100%', '#074596']
        ]),
      backSvg:
        innerHeadShell('url(#hair03-deep)', '#1f5a99') +
        `<path d="M225,210 C196,268 188,342 208,395 C235,382 260,368 300,368 C340,368 365,382 392,395 C412,342 404,268 375,210 Z" fill="url(#hair03-base)" stroke="#2366a8" stroke-width="1.8"/>` +
        (() => {
          const links = [
            [262, 310, 32], [244, 348, 30], [228, 386, 29], [216, 424, 28],
            [208, 462, 26], [202, 498, 24], [198, 534, 21], [195, 568, 18], [194, 598, 15]
          ];
          let svg = '';
          links.forEach(([x, y, w], idx) => {
            const dx = idx % 2 === 0 ? -8 : 8;
            svg += `<ellipse cx="${x + dx}" cy="${y}" rx="${w}" ry="${Math.round(w * 0.68)}" transform="rotate(${idx % 2 === 0 ? -24 : 24} ${x + dx} ${y})" fill="url(#hair03-base)" stroke="#2366a8" stroke-width="1.8"/>`;
            svg += `<ellipse cx="${x + dx - 3}" cy="${y - 4}" rx="${(w * 0.52).toFixed(1)}" ry="${(w * 0.28).toFixed(1)}" transform="rotate(${idx % 2 === 0 ? -24 : 24} ${x + dx} ${y})" fill="#ffffff" opacity="0.58"/>`;
          });
          svg += `<path d="M188,608 C178,630 184,654 196,668 C206,650 212,626 202,608 Z" fill="url(#hair03-base)" stroke="#2366a8" stroke-width="1.6"/>`;
          svg += `<ellipse cx="195" cy="609" rx="12" ry="6" fill="url(#hair03-ice)" stroke="#1a63ad" stroke-width="1.3"/>`;
          svg += diamondGem(195, 609, 5, 7, 'hair03-gem');
          return svg;
        })() +
        sparkle(224, 382, 5, '#ffffff') +
        sparkle(206, 488, 6, '#e0f8ff') +
        sparkle(196, 574, 5, '#ffffff'),
      frontSvg:
        `<path d="M214,208 C210,148 248,118 300,118 C352,118 390,148 386,208 C372,186 354,168 334,166 C316,178 294,180 276,170 C252,174 232,188 214,208 Z" fill="url(#hair03-base)" stroke="#2366a8" stroke-width="1.8"/>` +
        `<path d="M226,162 Q262,130 300,130 Q338,130 374,162 Q338,144 300,144 Q262,144 226,162 Z" fill="url(#hair03-base)" stroke="#2366a8" stroke-width="1.4"/>` +
        `<path d="M244,151 Q258,136 272,143 M276,143 Q290,130 304,140 M308,140 Q324,132 336,144 M340,145 Q352,138 362,152" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity="0.8"/>` +
        sideLocks('url(#hair03-base)', 'url(#hair03-base)', '#2366a8', 308) +
        angelRing('hair03-hi', 146, 0.85) +
        `<path d="M240,134 Q300,116 360,134 L350,118 Q300,102 250,118 Z" fill="url(#hair03-ice)" stroke="#1b6bb8" stroke-width="1.5"/>` +
        `<polygon points="256,118 250,86 266,112" fill="url(#hair03-ice)" stroke="#1b6bb8" stroke-width="1.4"/>` +
        `<polygon points="274,112 274,68 288,108" fill="url(#hair03-ice)" stroke="#1b6bb8" stroke-width="1.4"/>` +
        `<polygon points="344,118 350,86 334,112" fill="url(#hair03-ice)" stroke="#1b6bb8" stroke-width="1.4"/>` +
        `<polygon points="326,112 326,68 312,108" fill="url(#hair03-ice)" stroke="#1b6bb8" stroke-width="1.4"/>` +
        `<polygon points="288,110 300,44 312,110" fill="url(#hair03-ice)" stroke="#1b6bb8" stroke-width="1.5"/>` +
        `<g stroke="#ffffff" stroke-width="2.4" stroke-linecap="round">` +
          `<line x1="300" y1="40" x2="300" y2="80"/>` +
          `<line x1="283" y1="50" x2="317" y2="70"/>` +
          `<line x1="317" y1="50" x2="283" y2="70"/>` +
        `</g>` +
        diamondGem(300, 60, 8, 10, 'hair03-gem') +
        diamondGem(300, 104, 8, 11, 'hair03-gem') +
        diamondGem(276, 110, 5, 7, 'hair03-gem') +
        diamondGem(324, 110, 5, 7, 'hair03-gem') +
        sparkle(250, 74, 6, '#ffffff') +
        sparkle(350, 74, 6, '#ffffff') +
        sparkle(318, 42, 7, '#ffffff')
    },

    // =========================================================================
    // 4. Lavender Fairy Wavy Hair + Butterfly Flower Crown
    // =========================================================================
    {
      id: 'hair-04',
      name: 'Tóc Tím Tiên Hoa & Vòng Hoa Bướm',
      icon: '🦋',
      accentColor: '#b47cff',
      previewBox: '120 45 360 340',
      defs:
        lg('hair04-base', '0%', '0%', '0%', '100%', [
          ['0%', '#f6ebff'],
          ['26%', '#d8b4ff'],
          ['68%', '#a366eb'],
          ['100%', '#6a33b5']
        ]) +
        lg('hair04-deep', '0%', '0%', '0%', '100%', [
          ['0%', '#985ee0'],
          ['60%', '#6830ad'],
          ['100%', '#41177a']
        ]) +
        lg('hair04-hi', '0%', '0%', '100%', '0%', [
          ['0%', '#ffffff', 0.15],
          ['50%', '#fcf5ff', 0.92],
          ['100%', '#ffffff', 0.15]
        ]) +
        rg('hair04-pinkfl', '40%', '35%', '65%', [
          ['0%', '#fff5fa'],
          ['65%', '#ff8ec7'],
          ['100%', '#e04896']
        ]) +
        rg('hair04-peachfl', '40%', '35%', '65%', [
          ['0%', '#fff8f0'],
          ['65%', '#ffba82'],
          ['100%', '#eb7a44']
        ]) +
        lg('hair04-wing', '0%', '0%', '100%', '100%', [
          ['0%', '#b5f8ff', 0.95],
          ['50%', '#e29eff', 0.9],
          ['100%', '#ff7ac8', 0.95]
        ]),
      backSvg:
        innerHeadShell('url(#hair04-deep)', '#522291') +
        `<path d="M224,185 C185,235 162,310 176,385 C188,450 148,510 168,582 C178,618 205,648 228,620 C246,645 276,632 300,646 C324,632 354,645 372,620 C395,648 422,618 432,582 C452,510 412,450 424,385 C438,310 415,235 376,185 Z" fill="url(#hair04-base)" stroke="#5c28a3" stroke-width="2"/>` +
        `<path d="M188,332 C210,375 190,425 204,475 C215,515 192,562 206,608 C184,570 194,520 184,475 C172,420 190,375 188,332 Z" fill="url(#hair04-deep)" opacity="0.4"/>` +
        `<path d="M412,332 C390,375 410,425 396,475 C385,515 408,562 394,608 C416,570 406,520 416,475 C428,420 410,375 412,332 Z" fill="url(#hair04-deep)" opacity="0.4"/>` +
        `<path d="M196,282 C180,335 202,388 186,445 C200,398 188,342 206,290 Z" fill="#fcf5ff" opacity="0.55"/>` +
        `<path d="M404,282 C420,335 398,388 414,445 C400,398 412,342 394,290 Z" fill="#fcf5ff" opacity="0.55"/>` +
        `<circle cx="192" cy="485" r="3.5" fill="#fff8d6" opacity="0.8"/>` +
        `<circle cx="408" cy="512" r="3.2" fill="#d9ffff" opacity="0.8"/>` +
        `<circle cx="204" cy="568" r="2.8" fill="#ffe6f7" opacity="0.85"/>`,
      frontSvg:
        `<path d="M214,208 C214,152 252,124 300,124 C348,124 386,152 386,208 C372,186 352,170 330,168 C318,180 308,188 300,170 C292,188 282,180 270,168 C248,170 228,186 214,208 Z" fill="url(#hair04-base)" stroke="#5c28a3" stroke-width="1.8"/>` +
        `<path d="M225,180 C203,210 202,256 216,288 C224,304 238,298 232,284 C220,284 218,244 228,196 Z" fill="url(#hair04-base)" stroke="#5c28a3" stroke-width="1.6"/>` +
        `<path d="M375,180 C397,210 398,256 384,288 C376,304 362,298 368,284 C380,284 382,244 372,196 Z" fill="url(#hair04-base)" stroke="#5c28a3" stroke-width="1.6"/>` +
        angelRing('hair04-hi', 140, 0.8) +
        `<path d="M222,158 Q300,110 378,158" fill="none" stroke="#48b878" stroke-width="5" stroke-linecap="round"/>` +
        `<ellipse cx="245" cy="138" rx="11" ry="5" transform="rotate(-32 245 138)" fill="#72e09d" stroke="#2e8c57" stroke-width="1"/>` +
        `<ellipse cx="282" cy="126" rx="11" ry="5" transform="rotate(-12 282 126)" fill="#72e09d" stroke="#2e8c57" stroke-width="1"/>` +
        `<ellipse cx="318" cy="126" rx="11" ry="5" transform="rotate(12 318 126)" fill="#72e09d" stroke="#2e8c57" stroke-width="1"/>` +
        `<ellipse cx="355" cy="138" rx="11" ry="5" transform="rotate(32 355 138)" fill="#72e09d" stroke="#2e8c57" stroke-width="1"/>` +
        flower5(232, 146, 13, 'hair04-pinkfl') +
        flower5(266, 128, 14, 'hair04-peachfl') +
        flower5(300, 122, 16, 'hair04-pinkfl') +
        flower5(334, 128, 14, 'hair04-peachfl') +
        flower5(368, 146, 13, 'hair04-pinkfl') +
        `<g transform="translate(234,104) rotate(-22)">` +
          `<path d="M0,0 C-18,-26 -36,-14 -24,4 C-32,16 -14,26 0,8 Z" fill="url(#hair04-wing)" stroke="#7b38b5" stroke-width="1.2"/>` +
          `<path d="M0,0 C18,-26 36,-14 24,4 C32,16 14,26 0,8 Z" fill="url(#hair04-wing)" stroke="#7b38b5" stroke-width="1.2"/>` +
          `<ellipse cx="0" cy="4" rx="2.5" ry="10" fill="#5e298c"/>` +
          `<circle cx="-13" cy="-5" r="2.6" fill="#ffffff" opacity="0.8"/>` +
          `<circle cx="13" cy="-5" r="2.6" fill="#ffffff" opacity="0.8"/>` +
        `</g>` +
        `<g transform="translate(362,112) rotate(24) scale(0.86)">` +
          `<path d="M0,0 C-18,-26 -36,-14 -24,4 C-32,16 -14,26 0,8 Z" fill="url(#hair04-wing)" stroke="#7b38b5" stroke-width="1.2"/>` +
          `<path d="M0,0 C18,-26 36,-14 24,4 C32,16 14,26 0,8 Z" fill="url(#hair04-wing)" stroke="#7b38b5" stroke-width="1.2"/>` +
          `<ellipse cx="0" cy="4" rx="2.5" ry="10" fill="#5e298c"/>` +
          `<circle cx="-13" cy="-5" r="2.6" fill="#ffffff" opacity="0.8"/>` +
          `<circle cx="13" cy="-5" r="2.6" fill="#ffffff" opacity="0.8"/>` +
        `</g>` +
        sparkle(208, 86, 6, '#ffffff') +
        sparkle(386, 94, 6, '#fff0fa') +
        sparkle(300, 96, 7, '#ffffff')
    },

    // =========================================================================
    // 5. Jet Black Anime Hime Cut + Cute Cat-Ear Headband
    // =========================================================================
    {
      id: 'hair-05',
      name: 'Tóc Hime Đen & Băng Đô Tai Mèo',
      icon: '🐱',
      accentColor: '#ff5c93',
      previewBox: '140 42 320 315',
      defs:
        lg('hair05-base', '0%', '0%', '0%', '100%', [
          ['0%', '#494e75'],
          ['25%', '#262840'],
          ['70%', '#151626'],
          ['100%', '#090912']
        ]) +
        lg('hair05-deep', '0%', '0%', '0%', '100%', [
          ['0%', '#1f2136'],
          ['100%', '#06060d']
        ]) +
        lg('hair05-hi', '0%', '0%', '100%', '0%', [
          ['0%', '#a8b8ff', 0.15],
          ['50%', '#eef4ff', 0.92],
          ['100%', '#a8b8ff', 0.15]
        ]) +
        lg('hair05-pink', '0%', '0%', '100%', '100%', [
          ['0%', '#ffb3d1'],
          ['50%', '#ff4d94'],
          ['100%', '#bd195e']
        ]) +
        lg('hair05-earin', '0%', '0%', '0%', '100%', [
          ['0%', '#ffd6e8'],
          ['100%', '#ff7ab3']
        ]) +
        rg('hair05-bell', '35%', '30%', '65%', [
          ['0%', '#fffce0'],
          ['50%', '#ffd24d'],
          ['100%', '#b8760b']
        ]),
      backSvg:
        innerHeadShell('url(#hair05-deep)', '#05050a') +
        `<path d="M222,190 C206,275 192,435 184,622 Q242,638 300,632 Q358,638 416,622 C408,435 394,275 378,190 Z" fill="url(#hair05-base)" stroke="#05050b" stroke-width="2"/>` +
        `<path d="M214,320 L204,590 L216,592 L224,322 Z" fill="#6f7ab8" opacity="0.26"/>` +
        `<path d="M386,320 L396,590 L384,592 L376,322 Z" fill="#6f7ab8" opacity="0.26"/>` +
        `<path d="M196,490 Q206,540 198,605" fill="none" stroke="#8b98db" stroke-width="2.2" opacity="0.4" stroke-linecap="round"/>` +
        `<path d="M404,490 Q394,540 402,605" fill="none" stroke="#8b98db" stroke-width="2.2" opacity="0.4" stroke-linecap="round"/>`,
      frontSvg:
        // Blunt feathered Hime bangs sitting cleanly at y:186 above eyebrows & lashes
        `<path d="M216,204 C216,150 250,124 300,124 C350,124 384,150 384,204 L368,198 L360,180 L352,186 L322,186 L315,176 L308,186 L292,186 L285,176 L278,186 L248,186 L240,180 L232,198 Z" fill="url(#hair05-base)" stroke="#05050b" stroke-width="1.8" stroke-linejoin="round"/>` +
        // Iconic flat-cut Hime cheek locks flanking the earrings (x:203..223 and x:377..397)
        `<path d="M222,178 C206,206 203,246 204,284 L224,284 C221,250 222,216 228,186 Z" fill="url(#hair05-base)" stroke="#05050b" stroke-width="1.7"/>` +
        `<path d="M378,178 C394,206 397,246 396,284 L376,284 C379,250 378,216 372,186 Z" fill="url(#hair05-base)" stroke="#05050b" stroke-width="1.7"/>` +
        `<rect x="209" y="218" width="6" height="44" rx="3" fill="#99a8eb" opacity="0.42"/>` +
        `<rect x="385" y="218" width="6" height="44" rx="3" fill="#99a8eb" opacity="0.42"/>` +
        angelRing('hair05-hi', 140, 0.85) +
        `<path d="M220,158 Q300,110 380,158" fill="none" stroke="url(#hair05-pink)" stroke-width="9" stroke-linecap="round"/>` +
        `<path d="M230,144 C222,102 226,68 242,60 C258,64 272,96 276,126 Z" fill="url(#hair05-base)" stroke="#05050b" stroke-width="1.8" stroke-linejoin="round"/>` +
        `<path d="M237,134 C233,104 236,80 245,74 C255,78 264,100 267,122 Z" fill="url(#hair05-earin)"/>` +
        `<path d="M370,144 C378,102 374,68 358,60 C342,64 328,96 324,126 Z" fill="url(#hair05-base)" stroke="#05050b" stroke-width="1.8" stroke-linejoin="round"/>` +
        `<path d="M363,134 C367,104 364,80 355,74 C345,78 336,100 333,122 Z" fill="url(#hair05-earin)"/>` +
        `<g transform="translate(358,128) rotate(18)">` +
          `<path d="M0,0 C-14,-14 -28,-8 -24,4 C-20,14 -8,10 0,3 Z" fill="url(#hair05-pink)" stroke="#8a0d45" stroke-width="1.3"/>` +
          `<path d="M0,0 C14,-14 28,-8 24,4 C20,14 8,10 0,3 Z" fill="url(#hair05-pink)" stroke="#8a0d45" stroke-width="1.3"/>` +
          `<circle cx="0" cy="2" r="4.5" fill="#ff3385" stroke="#8a0d45" stroke-width="1.2"/>` +
          `<circle cx="0" cy="11" r="6" fill="url(#hair05-bell)" stroke="#8c5705" stroke-width="1.2"/>` +
          `<line x1="-4" y1="12" x2="4" y2="12" stroke="#8c5705" stroke-width="1.3" stroke-linecap="round"/>` +
        `</g>` +
        sparkle(242, 50, 6, '#ffffff') +
        sparkle(362, 52, 6, '#ffb3d1')
    },

    // =========================================================================
    // 6. Strawberry Red High Ponytail + French Pink Beret
    // =========================================================================
    {
      id: 'hair-06',
      name: 'Tóc Đuôi Ngựa Đỏ & Mũ Bê-rê Hồng',
      icon: '🍓',
      accentColor: '#ff4f6d',
      previewBox: '150 48 330 330',
      defs:
        lg('hair06-base', '0%', '0%', '0%', '100%', [
          ['0%', '#ffd1da'],
          ['26%', '#ff6982'],
          ['68%', '#d9294b'],
          ['100%', '#8f112c']
        ]) +
        lg('hair06-deep', '0%', '0%', '0%', '100%', [
          ['0%', '#ba1e3d'],
          ['100%', '#69091e']
        ]) +
        lg('hair06-hi', '0%', '0%', '100%', '0%', [
          ['0%', '#ffffff', 0.15],
          ['50%', '#ffeef2', 0.92],
          ['100%', '#ffffff', 0.15]
        ]) +
        rg('hair06-beret', '40%', '30%', '68%', [
          ['0%', '#ffe6f0'],
          ['42%', '#ff8fb9'],
          ['82%', '#e04f88'],
          ['100%', '#ab265b']
        ]) +
        lg('hair06-gold', '0%', '0%', '100%', '100%', [
          ['0%', '#fff8c4'],
          ['50%', '#ffd24d'],
          ['100%', '#b8760b']
        ]),
      backSvg:
        innerHeadShell('url(#hair06-deep)', '#730c22') +
        `<path d="M356,162 C412,144 462,188 460,256 C458,312 478,358 456,422 C442,462 454,508 424,542 C412,516 420,486 404,460 C388,434 406,374 390,322 C376,278 386,215 352,186 Z" fill="url(#hair06-base)" stroke="#7a0d26" stroke-width="2" stroke-linejoin="round"/>` +
        `<path d="M412,216 C432,262 416,320 434,376 C446,412 426,456 432,494 C416,460 426,416 414,376 C398,325 416,268 398,224 Z" fill="url(#hair06-deep)" opacity="0.42"/>` +
        `<path d="M422,190 C444,234 436,284 446,330 C430,288 432,240 412,198 Z" fill="#ffe6ec" opacity="0.6"/>` +
        `<path d="M366,178 L398,236 L384,232 L374,244 L356,184 Z" fill="#ff7aa8" stroke="#9e1e50" stroke-width="1.3"/>`,
      frontSvg:
        `<path d="M216,208 C216,152 252,126 300,126 C348,126 384,152 384,208 C370,186 348,172 328,170 C312,184 292,186 274,178 C252,186 234,192 216,208 Z" fill="url(#hair06-base)" stroke="#7a0d26" stroke-width="1.8"/>` +
        sideLocks('url(#hair06-base)', 'url(#hair06-base)', '#7a0d26', 306) +
        angelRing('hair06-hi', 146, 0.72) +
        `<g transform="translate(292,110) rotate(-14)">` +
          `<path d="M0,-44 C-2,-55 4,-58 6,-50 C7,-44 4,-40 0,-44 Z" fill="#b82c63" stroke="#821540" stroke-width="1.3"/>` +
          `<path d="M-78,12 C-92,-16 -52,-46 0,-46 C54,-46 92,-18 76,12 C56,28 -56,28 -78,12 Z" fill="url(#hair06-beret)" stroke="#9e1e50" stroke-width="1.8"/>` +
          `<path d="M-54,-14 Q-15,-34 32,-26" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity="0.45"/>` +
          `<path d="M-66,18 Q0,4 66,18 Q68,28 60,30 Q0,16 -60,30 Q-68,28 -66,18 Z" fill="#d43f79" stroke="#8c1644" stroke-width="1.5"/>` +
          `<path d="M-38,0 C-42,-8 -52,-6 -50,2 C-48,8 -38,14 -38,14 C-38,14 -28,8 -26,2 C-24,-6 -34,-8 -38,0 Z" fill="url(#hair06-gold)" stroke="#8c5705" stroke-width="1.2"/>` +
          `<circle cx="-41" cy="0" r="1.8" fill="#ffffff" opacity="0.9"/>` +
        `</g>` +
        sparkle(210, 88, 6, '#ffffff') +
        sparkle(366, 74, 6, '#ffe6f0') +
        sparkle(446, 200, 6, '#ffffff')
    },

    // =========================================================================
    // 7. Mint Mermaid Long Curls + Starfish Pearl Crown
    // =========================================================================
    {
      id: 'hair-07',
      name: 'Tóc Xoăn Tiên Cá Bạc Hà & Vương Miện Ngọc Trai',
      icon: '🧜‍♀️',
      accentColor: '#3fd8b6',
      previewBox: '125 38 350 340',
      defs:
        lg('hair07-base', '0%', '0%', '0%', '100%', [
          ['0%', '#e8fff9'],
          ['28%', '#82f2d8'],
          ['68%', '#2bc4a8'],
          ['100%', '#147873']
        ]) +
        lg('hair07-deep', '0%', '0%', '0%', '100%', [
          ['0%', '#24a895'],
          ['55%', '#13706a'],
          ['100%', '#0a444a']
        ]) +
        lg('hair07-hi', '0%', '0%', '100%', '0%', [
          ['0%', '#ffffff', 0.15],
          ['50%', '#f0fffc', 0.92],
          ['100%', '#ffffff', 0.15]
        ]) +
        lg('hair07-gold', '0%', '0%', '100%', '100%', [
          ['0%', '#fff8db'],
          ['50%', '#f5cb73'],
          ['100%', '#b57b24']
        ]) +
        rg('hair07-coral', '40%', '35%', '65%', [
          ['0%', '#ffd9cc'],
          ['55%', '#ff8073'],
          ['100%', '#d93d3b']
        ]) +
        rg('hair07-pearl', '35%', '30%', '65%', [
          ['0%', '#ffffff'],
          ['60%', '#f0fcff'],
          ['100%', '#b5d6de']
        ]) +
        rg('hair07-aquagem', '38%', '32%', '68%', [
          ['0%', '#ffffff'],
          ['45%', '#73fff0'],
          ['85%', '#0ea8b0'],
          ['100%', '#075a6b']
        ]),
      backSvg:
        innerHeadShell('url(#hair07-deep)', '#0d5759') +
        `<path d="M224,182 C178,225 152,295 168,365 C182,422 140,480 156,552 C168,608 148,655 186,680 C212,665 228,638 252,658 C275,676 288,650 300,664 C312,650 325,676 348,658 C372,638 388,665 414,680 C452,655 432,608 444,552 C460,480 418,422 432,365 C448,295 422,225 376,182 Z" fill="url(#hair07-base)" stroke="#0f6161" stroke-width="2" stroke-linejoin="round"/>` +
        `<path d="M180,320 C206,368 176,422 198,480 C216,528 176,585 198,642 C170,602 182,535 170,482 C156,418 182,366 180,320 Z" fill="#7082e6" opacity="0.28"/>` +
        `<path d="M420,320 C394,368 424,422 402,480 C384,528 424,585 402,642 C430,602 418,535 430,482 C444,418 418,366 420,320 Z" fill="#7082e6" opacity="0.28"/>` +
        `<path d="M188,266 C172,315 196,362 178,415 C195,368 184,316 200,272 Z" fill="#f0fffc" opacity="0.6"/>` +
        `<path d="M412,266 C428,315 404,362 422,415 C405,368 416,316 400,272 Z" fill="#f0fffc" opacity="0.6"/>` +
        pearl(184, 425, 4, 'hair07-pearl', '#7ab5bf') +
        pearl(416, 455, 4, 'hair07-pearl', '#7ab5bf') +
        pearl(192, 580, 4.5, 'hair07-pearl', '#7ab5bf') +
        pearl(408, 595, 4.5, 'hair07-pearl', '#7ab5bf'),
      frontSvg:
        `<path d="M214,208 C214,152 250,124 300,124 C350,124 386,152 386,208 C370,186 350,170 330,168 C316,180 306,186 300,168 C294,186 284,180 270,168 C250,170 230,186 214,208 Z" fill="url(#hair07-base)" stroke="#0f6161" stroke-width="1.8"/>` +
        sideLocks('url(#hair07-base)', 'url(#hair07-base)', '#0f6161', 316) +
        angelRing('hair07-hi', 140, 0.85) +
        `<path d="M238,136 Q300,114 362,136" fill="none" stroke="url(#hair07-gold)" stroke-width="5" stroke-linecap="round"/>` +
        `<path d="M276,120 C266,94 276,74 288,82 C292,70 308,70 312,82 C324,74 334,94 324,120 Z" fill="url(#hair07-pearl)" stroke="#8cbec7" stroke-width="1.4"/>` +
        `<path d="M286,118 L282,84 M300,118 L300,76 M314,118 L318,84" stroke="#a6d6de" stroke-width="1.2" opacity="0.75"/>` +
        diamondGem(300, 102, 8, 12, 'hair07-aquagem') +
        `<g transform="translate(256,98) rotate(-15)">` +
          `<polygon points="0,-18 5,-6 18,-6 8,3 11,16 0,9 -11,16 -8,3 -18,-6 -5,-6" fill="url(#hair07-coral)" stroke="#b32b2b" stroke-width="1.3" stroke-linejoin="round"/>` +
          `<circle cx="0" cy="0" r="2.2" fill="#fff0eb"/>` +
          `<circle cx="0" cy="-8" r="1.4" fill="#fff0eb"/>` +
          `<circle cx="-8" cy="-2" r="1.4" fill="#fff0eb"/>` +
          `<circle cx="8" cy="-2" r="1.4" fill="#fff0eb"/>` +
        `</g>` +
        pearl(242, 132, 4.5, 'hair07-pearl') +
        pearl(274, 124, 5, 'hair07-pearl') +
        pearl(326, 124, 5, 'hair07-pearl') +
        pearl(344, 110, 6, 'hair07-pearl') +
        pearl(358, 132, 4.5, 'hair07-pearl') +
        sparkle(300, 56, 7, '#ffffff') +
        sparkle(234, 78, 6, '#d9fff8') +
        sparkle(360, 88, 6, '#ffffff')
    },

    // =========================================================================
    // 8. Honey Brown Space Buns + Sparkling Star Hairpins
    // =========================================================================
    {
      id: 'hair-08',
      name: 'Tóc Búi Na Tra Nâu Mật & Kẹp Sao Lấp Lánh',
      icon: '⭐',
      accentColor: '#e69c3a',
      previewBox: '125 42 350 295',
      defs:
        lg('hair08-base', '0%', '0%', '0%', '100%', [
          ['0%', '#ffe8bf'],
          ['28%', '#d68c45'],
          ['70%', '#96501a'],
          ['100%', '#592808']
        ]) +
        lg('hair08-deep', '0%', '0%', '0%', '100%', [
          ['0%', '#7a3d10'],
          ['100%', '#421d04']
        ]) +
        lg('hair08-hi', '0%', '0%', '100%', '0%', [
          ['0%', '#ffffff', 0.1],
          ['50%', '#fff5dc', 0.88],
          ['100%', '#ffffff', 0.1]
        ]) +
        rg('hair08-bun', '38%', '32%', '68%', [
          ['0%', '#ffdfad'],
          ['42%', '#c97d38'],
          ['84%', '#874412'],
          ['100%', '#4d2204']
        ]) +
        lg('hair08-star', '0%', '0%', '100%', '100%', [
          ['0%', '#fffbe0'],
          ['45%', '#ffd43b'],
          ['100%', '#e88a0c']
        ]) +
        lg('hair08-scrunch', '0%', '0%', '100%', '100%', [
          ['0%', '#ffc2df'],
          ['50%', '#ff5c9e'],
          ['100%', '#c91e63']
        ]),
      backSvg:
        innerHeadShell('url(#hair08-deep)', '#472006') +
        `<path d="M222,228 C210,264 212,298 228,322 C245,310 264,306 300,306 C336,306 355,310 372,322 C388,298 390,264 378,228 Z" fill="url(#hair08-base)" stroke="#4f2306" stroke-width="1.8"/>` +
        `<path d="M214,148 C184,185 168,242 182,286 L194,274 L204,292 C196,245 204,195 224,158 Z" fill="url(#hair08-scrunch)" stroke="#9e1750" stroke-width="1.4"/>` +
        `<path d="M386,148 C416,185 432,242 418,286 L406,274 L396,292 C404,245 396,195 376,158 Z" fill="url(#hair08-scrunch)" stroke="#9e1750" stroke-width="1.4"/>`,
      frontSvg:
        `<g>` +
          `<circle cx="218" cy="108" r="42" fill="url(#hair08-bun)" stroke="#4f2306" stroke-width="1.9"/>` +
          `<path d="M188,108 C192,82 224,74 242,92 C252,102 246,126 226,130 C208,134 196,120 202,106" fill="none" stroke="#592808" stroke-width="2" stroke-linecap="round" opacity="0.5"/>` +
          `<path d="M196,88 Q216,74 238,88" fill="none" stroke="#fff3d6" stroke-width="4.5" stroke-linecap="round" opacity="0.65"/>` +
          `<ellipse cx="228" cy="144" rx="26" ry="9" transform="rotate(-32 228 144)" fill="url(#hair08-scrunch)" stroke="#9e1750" stroke-width="1.5"/>` +
        `</g>` +
        `<g>` +
          `<circle cx="382" cy="108" r="42" fill="url(#hair08-bun)" stroke="#4f2306" stroke-width="1.9"/>` +
          `<path d="M412,108 C408,82 376,74 358,92 C348,102 354,126 374,130 C392,134 404,120 398,106" fill="none" stroke="#592808" stroke-width="2" stroke-linecap="round" opacity="0.5"/>` +
          `<path d="M362,88 Q384,74 404,88" fill="none" stroke="#fff3d6" stroke-width="4.5" stroke-linecap="round" opacity="0.65"/>` +
          `<ellipse cx="372" cy="144" rx="26" ry="9" transform="rotate(32 372 144)" fill="url(#hair08-scrunch)" stroke="#9e1750" stroke-width="1.5"/>` +
        `</g>` +
        `<path d="M216,206 C216,150 252,126 300,126 C348,126 384,150 384,206 C370,186 356,174 340,170 L334,184 L322,170 L306,190 L300,172 L294,190 L278,170 L266,184 L260,170 C244,174 230,186 216,206 Z" fill="url(#hair08-base)" stroke="#4f2306" stroke-width="1.8" stroke-linejoin="round"/>` +
        sideLocks('url(#hair08-base)', 'url(#hair08-base)', '#4f2306', 300) +
        angelRing('hair08-hi', 141, 0.85) +
        (() => {
          const star = (cx, cy, r, rot = 0) =>
            `<polygon transform="translate(${cx},${cy}) rotate(${rot})" points="0,${-r} ${(r * 0.28).toFixed(1)},${(-r * 0.28).toFixed(1)} ${r},${(-r * 0.22).toFixed(1)} ${(r * 0.42).toFixed(1)},${(r * 0.2).toFixed(1)} ${(r * 0.62).toFixed(1)},${(r * 0.85).toFixed(1)} 0,${(r * 0.46).toFixed(1)} ${(-r * 0.62).toFixed(1)},${(r * 0.85).toFixed(1)} ${(-r * 0.42).toFixed(1)},${(r * 0.2).toFixed(1)} ${-r},${(-r * 0.22).toFixed(1)} ${(-r * 0.28).toFixed(1)},${(-r * 0.28).toFixed(1)}" fill="url(#hair08-star)" stroke="#a35b00" stroke-width="1.2" stroke-linejoin="round"/>`;
          return star(246, 162, 13, -12) +
            star(232, 178, 9, 10) +
            star(354, 162, 13, 12) +
            star(368, 178, 9, -10) +
            star(224, 144, 10, -18) +
            star(376, 144, 10, 18);
        })() +
        sparkle(180, 68, 6, '#fff8c4') +
        sparkle(420, 68, 6, '#fff8c4') +
        sparkle(300, 116, 6, '#ffffff')
    },

    // =========================================================================
    // 9. Sunset Ombre Long Straight + Daisy Sun Straw Hat
    // =========================================================================
    {
      id: 'hair-09',
      name: 'Tóc Hoàng Hôn & Mũ Cói Hoa Cúc',
      icon: '🌻',
      accentColor: '#ff8c5a',
      previewBox: '100 45 400 340',
      defs:
        lg('hair09-ombre', '0', '140', '0', '640', [
          ['0%', '#ff7aa8'],
          ['32%', '#ff9472'],
          ['68%', '#ffc46b'],
          ['100%', '#fff099']
        ], true) +
        lg('hair09-deep', '0', '140', '0', '640', [
          ['0%', '#b5386e'],
          ['50%', '#c95c38'],
          ['100%', '#d98f2b']
        ], true) +
        lg('hair09-hi', '0%', '0%', '100%', '0%', [
          ['0%', '#ffffff', 0.12],
          ['50%', '#fff6e8', 0.88],
          ['100%', '#ffffff', 0.12]
        ]) +
        rg('hair09-straw', '50%', '35%', '65%', [
          ['0%', '#fff7d6'],
          ['50%', '#f5cf82'],
          ['100%', '#c99038']
        ]) +
        lg('hair09-band', '0%', '0%', '100%', '0%', [
          ['0%', '#ff6996'],
          ['50%', '#ff99b8'],
          ['100%', '#e04878']
        ]),
      backSvg:
        innerHeadShell('url(#hair09-deep)', '#912958') +
        `<ellipse cx="300" cy="146" rx="184" ry="42" fill="#d49d46" stroke="#99671f" stroke-width="1.8"/>` +
        `<path d="M222,188 C206,280 190,435 178,632 Q238,652 300,636 Q362,652 422,632 C410,435 394,280 378,188 Z" fill="url(#hair09-ombre)" stroke="#9e3d4c" stroke-width="2" stroke-linejoin="round"/>` +
        `<path d="M208,330 L196,600 L212,602 L222,332 Z" fill="#fff5e0" opacity="0.28"/>` +
        `<path d="M392,330 L404,600 L388,602 L378,332 Z" fill="#fff5e0" opacity="0.28"/>` +
        `<path d="M214,250 C206,365 196,490 192,612" fill="none" stroke="#fff7e6" stroke-width="2.4" opacity="0.52" stroke-linecap="round"/>` +
        `<path d="M386,250 C394,365 404,490 408,612" fill="none" stroke="#fff7e6" stroke-width="2.4" opacity="0.52" stroke-linecap="round"/>`,
      frontSvg:
        `<path d="M218,208 C218,152 252,130 300,130 C348,130 382,152 382,208 C368,186 346,172 322,170 C304,182 278,184 254,176 C238,184 228,192 218,208 Z" fill="url(#hair09-ombre)" stroke="#9e3d4c" stroke-width="1.7"/>` +
        sideLocks('url(#hair09-ombre)', 'url(#hair09-ombre)', '#9e3d4c', 320) +
        angelRing('hair09-hi', 146, 0.7) +
        `<path d="M116,146 Q300,82 484,146 Q390,124 300,124 Q210,124 116,146 Z" fill="url(#hair09-straw)" stroke="#99671f" stroke-width="1.8"/>` +
        `<path d="M140,141 Q300,92 460,141 M170,134 Q300,98 430,134" fill="none" stroke="#c48a35" stroke-width="1.2" opacity="0.55"/>` +
        `<path d="M214,122 C216,74 252,58 300,58 C348,58 384,74 386,122 Q300,108 214,122 Z" fill="url(#hair09-straw)" stroke="#99671f" stroke-width="1.8"/>` +
        `<path d="M236,84 Q300,70 364,84 M224,102 Q300,88 376,102" fill="none" stroke="#c48a35" stroke-width="1.2" opacity="0.45"/>` +
        `<path d="M215,120 Q300,104 385,120 L386,130 Q300,114 214,130 Z" fill="url(#hair09-band)" stroke="#9e1e50" stroke-width="1.3"/>` +
        daisy(242, 118, 17, '#ffffff', '#ffd038') +
        daisy(272, 110, 14, '#fffce8', '#ffbb29') +
        daisy(225, 132, 12, '#ffffff', '#ffd038') +
        sparkle(360, 70, 6, '#ffffff') +
        sparkle(164, 122, 6, '#fff8d6')
    },

    // =========================================================================
    // 10. Silver Moonlight Updo + Crescent Moon Tiara
    // =========================================================================
    {
      id: 'hair-10',
      name: 'Tóc Búi Hoàng Gia Bạc & Vương Miện Trăng Khuyết',
      icon: '🌙',
      accentColor: '#9eb4ff',
      previewBox: '140 32 320 305',
      defs:
        lg('hair10-base', '0%', '0%', '0%', '100%', [
          ['0%', '#ffffff'],
          ['30%', '#e0e9ff'],
          ['72%', '#a2b7eb'],
          ['100%', '#6276b8']
        ]) +
        lg('hair10-deep', '0%', '0%', '0%', '100%', [
          ['0%', '#90a4db'],
          ['100%', '#4d5f9e']
        ]) +
        lg('hair10-hi', '0%', '0%', '100%', '0%', [
          ['0%', '#ffffff', 0.2],
          ['50%', '#ffffff', 0.96],
          ['100%', '#ffffff', 0.2]
        ]) +
        lg('hair10-gold', '0%', '0%', '100%', '100%', [
          ['0%', '#fffbe0'],
          ['45%', '#ffdc6b'],
          ['100%', '#c78c18']
        ]) +
        rg('hair10-sapphire', '38%', '32%', '68%', [
          ['0%', '#ffffff'],
          ['40%', '#8caeff'],
          ['82%', '#3857d6'],
          ['100%', '#182985']
        ]) +
        rg('hair10-pearl', '35%', '30%', '65%', [
          ['0%', '#ffffff'],
          ['65%', '#edf4ff'],
          ['100%', '#b0c2e6']
        ]),
      backSvg:
        innerHeadShell('url(#hair10-deep)', '#485a94') +
        `<ellipse cx="300" cy="96" rx="50" ry="40" fill="url(#hair10-base)" stroke="#485a94" stroke-width="1.9"/>` +
        `<path d="M262,88 Q300,66 338,88" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity="0.8"/>` +
        `<path d="M234,268 C222,292 222,318 232,334 C240,322 242,302 246,282 Z" fill="url(#hair10-base)" stroke="#485a94" stroke-width="1.5"/>` +
        `<path d="M366,268 C378,292 378,318 368,334 C360,322 358,302 354,282 Z" fill="url(#hair10-base)" stroke="#485a94" stroke-width="1.5"/>`,
      frontSvg:
        `<path d="M216,208 C216,150 252,124 300,124 C348,124 384,150 384,208 C370,186 348,170 326,168 C314,180 306,188 300,170 C294,188 286,180 274,168 C252,170 230,186 216,208 Z" fill="url(#hair10-base)" stroke="#485a94" stroke-width="1.8"/>` +
        sideLocks('url(#hair10-base)', 'url(#hair10-base)', '#485a94', 298) +
        `<path d="M250,122 Q300,100 350,122" fill="none" stroke="url(#hair10-gold)" stroke-width="4" stroke-linecap="round"/>` +
        pearl(260, 118, 4, 'hair10-pearl') +
        pearl(276, 112, 4.2, 'hair10-pearl') +
        pearl(324, 112, 4.2, 'hair10-pearl') +
        pearl(340, 118, 4, 'hair10-pearl') +
        angelRing('hair10-hi', 140, 0.88) +
        `<path d="M244,132 Q300,112 356,132 L348,118 Q300,98 252,118 Z" fill="url(#hair10-gold)" stroke="#8c5705" stroke-width="1.5"/>` +
        `<path d="M254,116 Q264,88 276,108 M346,116 Q336,88 324,108" fill="none" stroke="url(#hair10-gold)" stroke-width="3" stroke-linecap="round"/>` +
        `<path d="M294,40 A28,28 0 1,0 326,86 A22,22 0 1,1 294,40 Z" fill="url(#hair10-gold)" stroke="#8c5705" stroke-width="1.6" stroke-linejoin="round"/>` +
        ovalGem(300, 108, 7.5, 10.5, 'hair10-sapphire', '#fff6c2') +
        diamondGem(274, 112, 5, 7, 'hair10-sapphire', '#fff6c2') +
        diamondGem(326, 112, 5, 7, 'hair10-sapphire', '#fff6c2') +
        sparkle(312, 58, 8, '#ffffff') +
        sparkle(258, 72, 6, '#dbe8ff') +
        sparkle(346, 74, 6, '#dbe8ff')
    },

    // =========================================================================
    // 11. Rose Gold Bob Cut + Giant Magical Girl Ribbon
    // =========================================================================
    {
      id: 'hair-11',
      name: 'Tóc Ngắn Vàng Hồng & Nơ Ma Thuật Siêu To',
      icon: '✨',
      accentColor: '#f28da8',
      previewBox: '120 38 360 300',
      defs:
        lg('hair11-base', '0%', '0%', '0%', '100%', [
          ['0%', '#fff0f3'],
          ['26%', '#ffc4d4'],
          ['68%', '#ed8ca8'],
          ['100%', '#b54c6f']
        ]) +
        lg('hair11-deep', '0%', '0%', '0%', '100%', [
          ['0%', '#c96b88'],
          ['100%', '#7d2846']
        ]) +
        lg('hair11-hi', '0%', '0%', '100%', '0%', [
          ['0%', '#ffffff', 0.15],
          ['50%', '#fff8fa', 0.94],
          ['100%', '#ffffff', 0.15]
        ]) +
        lg('hair11-ribbon', '0%', '0%', '100%', '100%', [
          ['0%', '#ffd6eb'],
          ['40%', '#ff4794'],
          ['82%', '#cf1566'],
          ['100%', '#8c0640']
        ]) +
        lg('hair11-gold', '0%', '0%', '100%', '100%', [
          ['0%', '#fff9cc'],
          ['50%', '#ffd24c'],
          ['100%', '#ba7b0d']
        ]) +
        rg('hair11-gem', '38%', '32%', '68%', [
          ['0%', '#ffffff'],
          ['42%', '#ff75bc'],
          ['85%', '#d10d6f'],
          ['100%', '#7a043f']
        ]),
      backSvg:
        innerHeadShell('url(#hair11-deep)', '#7a2c48') +
        `<path d="M256,142 L198,370 L228,348 L244,386 L278,152 Z" fill="url(#hair11-ribbon)" stroke="#82063c" stroke-width="1.8" stroke-linejoin="round"/>` +
        `<path d="M344,142 L402,370 L372,348 L356,386 L322,152 Z" fill="url(#hair11-ribbon)" stroke="#82063c" stroke-width="1.8" stroke-linejoin="round"/>` +
        `<path d="M214,174 C194,218 192,276 226,312 C254,322 276,306 300,308 C324,306 346,322 374,312 C408,276 406,218 386,174 Z" fill="url(#hair11-base)" stroke="#8c3252" stroke-width="2"/>` +
        `<path d="M204,235 C200,268 214,296 238,308 C222,286 218,256 220,232 Z" fill="#fff5f8" opacity="0.5"/>` +
        `<path d="M396,235 C400,268 386,296 362,308 C378,286 382,256 380,232 Z" fill="#fff5f8" opacity="0.5"/>`,
      frontSvg:
        `<path d="M214,206 C214,150 252,126 300,126 C348,126 386,150 386,206 C372,186 354,174 336,174 L328,186 L314,174 L300,192 L286,174 L272,186 L264,174 C246,174 228,186 214,206 Z" fill="url(#hair11-base)" stroke="#8c3252" stroke-width="1.8" stroke-linejoin="round"/>` +
        `<path d="M222,180 C198,214 198,270 230,304 C240,310 246,302 238,290 C220,264 218,224 230,192 Z" fill="url(#hair11-base)" stroke="#8c3252" stroke-width="1.7"/>` +
        `<path d="M378,180 C402,214 402,270 370,304 C360,310 354,302 362,290 C380,264 382,224 370,192 Z" fill="url(#hair11-base)" stroke="#8c3252" stroke-width="1.7"/>` +
        angelRing('hair11-hi', 141, 0.85) +
        `<g transform="translate(300,112)">` +
          `<path d="M-12,-4 C-46,-62 -118,-54 -116,-14 C-114,22 -52,24 -12,6 Z" fill="url(#hair11-ribbon)" stroke="#82063c" stroke-width="1.9"/>` +
          `<path d="M12,-4 C46,-62 118,-54 116,-14 C114,22 52,24 12,6 Z" fill="url(#hair11-ribbon)" stroke="#82063c" stroke-width="1.9"/>` +
          `<path d="M-18,-6 C-52,-52 -106,-44 -106,-14 C-106,12 -54,14 -18,4" fill="none" stroke="url(#hair11-gold)" stroke-width="2.6" stroke-linecap="round"/>` +
          `<path d="M18,-6 C52,-52 106,-44 106,-14 C106,12 54,14 18,4" fill="none" stroke="url(#hair11-gold)" stroke-width="2.6" stroke-linecap="round"/>` +
          `<path d="M-92,-16 Q-56,-28 -22,-4 M22,-4 Q56,-28 92,-16" fill="none" stroke="#ffe6f2" stroke-width="3" stroke-linecap="round" opacity="0.8"/>` +
          `<rect x="-18" y="-16" width="36" height="32" rx="10" fill="url(#hair11-ribbon)" stroke="#82063c" stroke-width="1.8"/>` +
          `<path d="M-16,-2 C-32,-16 -36,-2 -22,6 Z" fill="url(#hair11-gold)" stroke="#8c5705" stroke-width="1.2"/>` +
          `<path d="M16,-2 C32,-16 36,-2 22,6 Z" fill="url(#hair11-gold)" stroke="#8c5705" stroke-width="1.2"/>` +
          `<path d="M0,-6 C-7,-15 -19,-11 -16,0 C-14,9 0,16 0,16 C0,16 14,9 16,0 C19,-11 7,-15 0,-6 Z" fill="url(#hair11-gem)" stroke="url(#hair11-gold)" stroke-width="2"/>` +
          `<circle cx="-6" cy="-2" r="2.5" fill="#ffffff" opacity="0.9"/>` +
        `</g>` +
        sparkle(178, 66, 7, '#ffffff') +
        sparkle(422, 66, 7, '#ffffff') +
        sparkle(300, 56, 8, '#fff7cc')
    },

    // =========================================================================
    // 12. Cotton Candy Rainbow Curls + Unicorn Horn Headband
    // =========================================================================
    {
      id: 'hair-12',
      name: 'Tóc Cầu Vồng Kẹo Bông & Bờm Kỳ Lân',
      icon: '🦄',
      accentColor: '#ff75d8',
      previewBox: '120 30 360 348',
      defs:
        lg('hair12-rainbowL', '0%', '0%', '0%', '100%', [
          ['0%', '#ffb3e6'],
          ['25%', '#ffe399'],
          ['52%', '#9ef5dd'],
          ['78%', '#96dcff'],
          ['100%', '#cfabff']
        ]) +
        lg('hair12-rainbowR', '0%', '0%', '0%', '100%', [
          ['0%', '#cfabff'],
          ['28%', '#96dcff'],
          ['55%', '#9ef5dd'],
          ['80%', '#ffe399'],
          ['100%', '#ffb3e6']
        ]) +
        lg('hair12-crown', '0%', '0%', '100%', '0%', [
          ['0%', '#ff99d6'],
          ['28%', '#ffd4e5'],
          ['50%', '#fff5b8'],
          ['74%', '#a8f5e8'],
          ['100%', '#c7a6ff']
        ]) +
        lg('hair12-deep', '0%', '0%', '100%', '100%', [
          ['0%', '#d971b8'],
          ['50%', '#789be6'],
          ['100%', '#8b5cd6']
        ]) +
        lg('hair12-hi', '0%', '0%', '100%', '0%', [
          ['0%', '#ffffff', 0.15],
          ['50%', '#ffffff', 0.94],
          ['100%', '#ffffff', 0.15]
        ]) +
        lg('hair12-horn', '0%', '0%', '100%', '100%', [
          ['0%', '#fffbe0'],
          ['30%', '#ffd666'],
          ['62%', '#ff99d8'],
          ['100%', '#9eeeff']
        ]) +
        lg('hair12-ear', '0%', '0%', '0%', '100%', [
          ['0%', '#ffffff'],
          ['50%', '#ffcce8'],
          ['100%', '#ff7ac3']
        ]),
      backSvg:
        innerHeadShell('url(#hair12-deep)', '#8c3d8a') +
        `<path d="M226,184 C178,224 148,292 162,362 C176,422 138,480 156,556 C168,608 152,652 188,672 C218,656 238,632 260,650 C282,664 294,644 300,656 L300,260 Z" fill="url(#hair12-rainbowL)" stroke="#9e4798" stroke-width="2" stroke-linejoin="round"/>` +
        `<path d="M374,184 C422,224 452,292 438,362 C424,422 462,480 444,556 C432,608 448,652 412,672 C382,656 362,632 340,650 C318,664 306,644 300,656 L300,260 Z" fill="url(#hair12-rainbowR)" stroke="#9e4798" stroke-width="2" stroke-linejoin="round"/>` +
        `<path d="M186,288 C170,336 196,386 176,442 C164,478 188,524 176,574 C192,534 182,484 196,442 C214,388 188,336 202,292 Z" fill="#ffffff" opacity="0.52"/>` +
        `<path d="M414,288 C430,336 404,386 424,442 C436,478 412,524 424,574 C408,534 418,484 404,442 C386,388 412,336 398,292 Z" fill="#ffffff" opacity="0.52"/>` +
        sparkle(182, 405, 6, '#ffffff') +
        sparkle(418, 425, 6, '#ffffff') +
        sparkle(194, 560, 7, '#fff9d6') +
        sparkle(406, 560, 7, '#fff9d6'),
      frontSvg:
        `<path d="M214,208 C212,150 248,124 300,124 C352,124 388,150 386,208 C370,186 350,172 328,172 C316,184 306,188 300,170 C294,188 284,184 272,172 C250,172 230,186 214,208 Z" fill="url(#hair12-crown)" stroke="#9e4798" stroke-width="1.8"/>` +
        sideLocks('url(#hair12-rainbowL)', 'url(#hair12-rainbowR)', '#9e4798', 316) +
        angelRing('hair12-hi', 140, 0.88) +
        `<path d="M224,158 Q300,110 376,158" fill="none" stroke="#ffd4ec" stroke-width="7.5" stroke-linecap="round"/>` +
        `<path d="M224,158 Q300,110 376,158" fill="none" stroke="#ff7ec9" stroke-width="2" stroke-linecap="round"/>` +
        `<path d="M236,140 C228,104 236,74 250,68 C266,76 274,104 272,130 Z" fill="url(#hair12-ear)" stroke="#b83b82" stroke-width="1.6" stroke-linejoin="round"/>` +
        `<path d="M244,132 C240,108 244,86 252,82 C260,88 265,108 264,126 Z" fill="#fff099" opacity="0.85"/>` +
        `<path d="M364,140 C372,104 364,74 350,68 C334,76 326,104 328,130 Z" fill="url(#hair12-ear)" stroke="#b83b82" stroke-width="1.6" stroke-linejoin="round"/>` +
        `<path d="M356,132 C360,108 356,86 348,82 C340,88 335,108 336,126 Z" fill="#a8f5e8" opacity="0.85"/>` +
        `<path d="M284,124 L297,40 Q300,34 303,40 L316,124 Z" fill="url(#hair12-horn)" stroke="#c78318" stroke-width="1.6" stroke-linejoin="round"/>` +
        `<path d="M286,112 Q302,104 314,114 M289,96 Q302,88 311,98 M292,80 Q301,74 308,82 M295,64 Q301,60 305,66" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" opacity="0.9"/>` +
        `<circle cx="278" cy="126" r="8" fill="#ff8ec7" stroke="#c93882" stroke-width="1.1"/>` +
        `<circle cx="278" cy="126" r="3" fill="#fff5b8"/>` +
        `<circle cx="322" cy="126" r="8" fill="#8ee8f5" stroke="#2f9fb5" stroke-width="1.1"/>` +
        `<circle cx="322" cy="126" r="3" fill="#fff5b8"/>` +
        `<circle cx="300" cy="123" r="9.5" fill="#fff59e" stroke="#d99a1e" stroke-width="1.2"/>` +
        `<circle cx="300" cy="123" r="3.6" fill="#ff7ac3"/>` +
        sparkle(300, 34, 8, '#ffffff') +
        sparkle(270, 56, 6, '#ffe6f7') +
        sparkle(330, 56, 6, '#d9ffff')
    }
  ];
})();
