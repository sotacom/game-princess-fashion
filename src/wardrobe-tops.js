/**
 * 2.5D Anime / Barbie Princess Wardrobe — Tops Dataset
 * Canvas coordinate system: SVG viewBox="0 0 600 950"
 * Neck base: x 284..316, y 315..325 | Shoulders: (226,326) & (374,326)
 * Bust: x 242..358, y 322..415 | Waist: x 262..338 at y 432
 * Hems finish cleanly between y 434..468 over bottoms.
 */
(function (root) {
  'use strict';

  /** Renders a crisp 4-point anime sparkle star. */
  function star4(cx, cy, r, fill, opacity) {
    var ri = +(r * 0.24).toFixed(2);
    var op = opacity !== undefined ? ' opacity="' + opacity + '"' : '';
    var d =
      'M' + cx + ',' + (cy - r) +
      ' Q' + (cx + ri) + ',' + (cy - ri) + ' ' + (cx + r) + ',' + cy +
      ' Q' + (cx + ri) + ',' + (cy + ri) + ' ' + cx + ',' + (cy + r) +
      ' Q' + (cx - ri) + ',' + (cy + ri) + ' ' + (cx - r) + ',' + cy +
      ' Q' + (cx - ri) + ',' + (cy - ri) + ' ' + cx + ',' + (cy - r) + ' Z';
    return '<path d="' + d + '" fill="' + (fill || '#ffffff') + '"' + op + '/>';
  }

  /** Renders a 5-point princess star. */
  function star5(cx, cy, ro, ri, fill, stroke, sw) {
    var pts = [];
    for (var i = 0; i < 10; i++) {
      var a = -Math.PI / 2 + (i * Math.PI) / 5;
      var rad = i % 2 === 0 ? ro : ri;
      pts.push((cx + Math.cos(a) * rad).toFixed(1) + ',' + (cy + Math.sin(a) * rad).toFixed(1));
    }
    var st = stroke ? ' stroke="' + stroke + '" stroke-width="' + (sw || 0.8) + '"' : '';
    return '<polygon points="' + pts.join(' ') + '" fill="' + fill + '"' + st + '/>';
  }

  /** Renders a symmetrical anime heart path centered around (cx, cy). */
  function heartPath(cx, cy, s) {
    var topY = (cy - s * 0.35).toFixed(1);
    var dipY = (cy - s * 0.1).toFixed(1);
    var sideY = (cy + s * 0.15).toFixed(1);
    var botY = (cy + s * 0.72).toFixed(1);
    return (
      'M' + cx + ',' + dipY +
      ' C' + (cx - s * 0.35).toFixed(1) + ',' + (cy - s * 0.75).toFixed(1) +
      ' ' + (cx - s * 0.95).toFixed(1) + ',' + topY +
      ' ' + (cx - s * 0.82).toFixed(1) + ',' + sideY +
      ' C' + (cx - s * 0.7).toFixed(1) + ',' + (cy + s * 0.42).toFixed(1) +
      ' ' + (cx - s * 0.2).toFixed(1) + ',' + (cy + s * 0.6).toFixed(1) +
      ' ' + cx + ',' + botY +
      ' C' + (cx + s * 0.2).toFixed(1) + ',' + (cy + s * 0.6).toFixed(1) +
      ' ' + (cx + s * 0.7).toFixed(1) + ',' + (cy + s * 0.42).toFixed(1) +
      ' ' + (cx + s * 0.82).toFixed(1) + ',' + sideY +
      ' C' + (cx + s * 0.95).toFixed(1) + ',' + topY +
      ' ' + (cx + s * 0.35).toFixed(1) + ',' + (cy - s * 0.75).toFixed(1) +
      ' ' + cx + ',' + dipY + ' Z'
    );
  }

  /** Renders a string of 3D luminous pearls along a quadratic Bezier curve. */
  function pearlChain(x0, y0, cx, cy, x1, y1, count, r, fillGrad, rimStroke) {
    var out = '';
    for (var i = 0; i < count; i++) {
      var t = count === 1 ? 0.5 : i / (count - 1);
      var mt = 1 - t;
      var x = mt * mt * x0 + 2 * mt * t * cx + t * t * x1;
      var y = mt * mt * y0 + 2 * mt * t * cy + t * t * y1;
      var px = x.toFixed(1);
      var py = y.toFixed(1);
      var hx = (x - r * 0.32).toFixed(1);
      var hy = (y - r * 0.32).toFixed(1);
      out +=
        '<circle cx="' + px + '" cy="' + py + '" r="' + r + '" fill="url(#' + fillGrad + ')" stroke="' + (rimStroke || '#e2d4e8') + '" stroke-width="0.6"/>' +
        '<circle cx="' + hx + '" cy="' + hy + '" r="' + (r * 0.28).toFixed(2) + '" fill="#ffffff" opacity="0.9"/>';
    }
    return out;
  }

  /** Renders scalloped lace trim along a curve. */
  function scallopTrim(x1, y1, x2, y2, count, depth, fill, stroke, sw) {
    var d = 'M' + x1 + ',' + y1;
    for (var i = 0; i < count; i++) {
      var t0 = i / count;
      var t1 = (i + 1) / count;
      var tm = (t0 + t1) / 2;
      var sx = x1 + (x2 - x1) * t1;
      var sy = y1 + (y2 - y1) * t1;
      var mx = x1 + (x2 - x1) * tm;
      var my = y1 + (y2 - y1) * tm + depth;
      d += ' Q' + mx.toFixed(1) + ',' + my.toFixed(1) + ' ' + sx.toFixed(1) + ',' + sy.toFixed(1);
    }
    var st = stroke ? ' stroke="' + stroke + '" stroke-width="' + (sw || 0.9) + '"' : '';
    return '<path d="' + d + '" fill="' + fill + '"' + st + ' stroke-linecap="round"/>';
  }

  /** Renders a 6-point crystal snowflake. */
  function snowflake(cx, cy, r, stroke, opacity) {
    var out = '<g stroke="' + stroke + '" stroke-width="1.2" stroke-linecap="round" opacity="' + (opacity || 0.85) + '">';
    for (var i = 0; i < 6; i++) {
      var a = (i * Math.PI) / 3;
      var ex = (cx + Math.cos(a) * r).toFixed(1);
      var ey = (cy + Math.sin(a) * r).toFixed(1);
      var bx = cx + Math.cos(a) * r * 0.55;
      var by = cy + Math.sin(a) * r * 0.55;
      var lx = (bx + Math.cos(a - 0.65) * r * 0.35).toFixed(1);
      var ly = (by + Math.sin(a - 0.65) * r * 0.35).toFixed(1);
      var rx = (bx + Math.cos(a + 0.65) * r * 0.35).toFixed(1);
      var ry = (by + Math.sin(a + 0.65) * r * 0.35).toFixed(1);
      out +=
        '<line x1="' + cx + '" y1="' + cy + '" x2="' + ex + '" y2="' + ey + '"/>' +
        '<path d="M' + lx + ',' + ly + ' L' + bx.toFixed(1) + ',' + by.toFixed(1) + ' L' + rx + ',' + ry + '" fill="none"/>';
    }
    out += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r * 0.18).toFixed(1) + '" fill="#ffffff" stroke="none"/></g>';
    return out;
  }

  /** Renders a 2.5D faceted circular/oval gem with rim and specular catchlight. */
  function gemCircle(cx, cy, r, fillGrad, rimColor) {
    return (
      '<circle cx="' + cx + '" cy="' + (cy + 1.2) + '" r="' + (r + 1.4) + '" fill="#1a0b24" opacity="0.2"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r + 1.5) + '" fill="' + rimColor + '"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="url(#' + fillGrad + ')"/>' +
      '<polygon points="' + cx + ',' + (cy - r * 0.72) + ' ' + (cx + r * 0.65) + ',' + cy + ' ' + cx + ',' + (cy + r * 0.72) + ' ' + (cx - r * 0.65) + ',' + cy + '" fill="#ffffff" opacity="0.28"/>' +
      '<ellipse cx="' + (cx - r * 0.28) + '" cy="' + (cy - r * 0.32) + '" rx="' + (r * 0.34) + '" ry="' + (r * 0.2) + '" transform="rotate(-25 ' + (cx - r * 0.28) + ' ' + (cy - r * 0.32) + ')" fill="#ffffff" opacity="0.88"/>'
    );
  }

  /** Renders a cluster of glittery sequin dots across given coordinates. */
  function glitterDots(pts, color, opacity) {
    var out = '';
    for (var i = 0; i < pts.length; i++) {
      var p = pts[i];
      out += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + p[2] + '" fill="' + (p[3] || color) + '" opacity="' + (p[4] || opacity || 0.85) + '"/>';
    }
    return out;
  }

  /** Renders a 5-petal notched cherry blossom flower with golden center. */
  function sakuraFlower(cx, cy, r, fill, stroke, centerFill) {
    var out = '<g transform="translate(' + cx + ',' + cy + ')">';
    var p =
      'M0,0 C' + (-r * 0.42).toFixed(1) + ',' + (-r * 0.35).toFixed(1) +
      ' ' + (-r * 0.46).toFixed(1) + ',' + (-r * 0.88).toFixed(1) +
      ' ' + (-r * 0.14).toFixed(1) + ',' + (-r * 0.98).toFixed(1) +
      ' L0,' + (-r * 0.78).toFixed(1) +
      ' L' + (r * 0.14).toFixed(1) + ',' + (-r * 0.98).toFixed(1) +
      ' C' + (r * 0.46).toFixed(1) + ',' + (-r * 0.88).toFixed(1) +
      ' ' + (r * 0.42).toFixed(1) + ',' + (-r * 0.35).toFixed(1) + ' 0,0 Z';
    var st = stroke ? ' stroke="' + stroke + '" stroke-width="0.6"' : '';
    for (var i = 0; i < 5; i++) {
      out += '<path d="' + p + '" transform="rotate(' + (i * 72) + ')" fill="' + fill + '"' + st + '/>';
    }
    out += '<circle cx="0" cy="0" r="' + (r * 0.23).toFixed(1) + '" fill="' + (centerFill || '#fde047') + '"/>';
    out += '</g>';
    return out;
  }

  /** Builds symmetric twin-element pair using SVG mirror around x=300. */
  function mirrorX(innerSvg) {
    return innerSvg + '<g transform="translate(600,0) scale(-1,1)">' + innerSvg + '</g>';
  }

  var WARDROBE_TOPS = [
    /* ======================================================================
       1. Áo Tay Phồng Hoàng Gia Hồng Barbie
       ====================================================================== */
    {
      id: 'top-01',
      name: 'Áo Tay Phồng Hoàng Gia Hồng Barbie',
      icon: '👚',
      accentColor: '#ff4da6',
      previewBox: '168 292 264 205',
      defs:
        '<linearGradient id="top01-satin" x1="0%" y1="0%" x2="100%" y2="8%">' +
          '<stop offset="0%" stop-color="#c9186f"/>' +
          '<stop offset="22%" stop-color="#ff4da6"/>' +
          '<stop offset="46%" stop-color="#ff99cc"/>' +
          '<stop offset="68%" stop-color="#ff5cad"/>' +
          '<stop offset="88%" stop-color="#e02482"/>' +
          '<stop offset="100%" stop-color="#b51261"/>' +
        '</linearGradient>' +
        '<radialGradient id="top01-puff" cx="40%" cy="32%" r="68%">' +
          '<stop offset="0%" stop-color="#ffd9ec"/>' +
          '<stop offset="38%" stop-color="#ff85c2"/>' +
          '<stop offset="78%" stop-color="#ff3b9a"/>' +
          '<stop offset="100%" stop-color="#b81665"/>' +
        '</radialGradient>' +
        '<linearGradient id="top01-sheer" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#fff5fa" stop-opacity="0.88"/>' +
          '<stop offset="100%" stop-color="#ffb8dc" stop-opacity="0.96"/>' +
        '</linearGradient>' +
        '<linearGradient id="top01-gold" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#fff3b0"/>' +
          '<stop offset="45%" stop-color="#ffd166"/>' +
          '<stop offset="100%" stop-color="#d48c1a"/>' +
        '</linearGradient>' +
        '<radialGradient id="top01-gem" cx="35%" cy="30%" r="70%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="28%" stop-color="#ff99dd"/>' +
          '<stop offset="70%" stop-color="#ff1a8c"/>' +
          '<stop offset="100%" stop-color="#8c0046"/>' +
        '</radialGradient>' +
        '<radialGradient id="top01-pearl" cx="34%" cy="30%" r="68%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="60%" stop-color="#ffe6f2"/>' +
          '<stop offset="100%" stop-color="#dcb8cc"/>' +
        '</radialGradient>' +
        '<linearGradient id="top01-lace" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="100%" stop-color="#ffd9ec"/>' +
        '</linearGradient>',
      backSvg:
        '<g>' +
          mirrorX(
            '<path d="M264,432 C244,448 232,482 224,514 L244,506 L252,520 C260,490 268,456 274,436 Z" fill="url(#top01-satin)" opacity="0.88" stroke="#b51261" stroke-width="0.9"/>' +
            '<path d="M258,438 C246,458 238,484 233,505" fill="none" stroke="#ffd9ec" stroke-width="1.4" opacity="0.65"/>'
          ) +
        '</g>',
      svg:
        '<g>' +
          /* Sheer sweetheart yoke protecting neckline */
          '<path d="M236,342 C240,324 264,319 283,319 C290,326 310,326 317,319 C336,319 360,324 364,342 L348,358 L252,358 Z" fill="url(#top01-sheer)" stroke="#ff85c2" stroke-width="0.9"/>' +
          /* Left & right lush princess puff sleeves framing shoulders */
          mirrorX(
            '<ellipse cx="220" cy="338" rx="32" ry="29" fill="url(#top01-puff)" stroke="#b81665" stroke-width="1.2"/>' +
            '<path d="M198,322 C209,312 230,313 241,324 C235,336 225,346 218,354" fill="none" stroke="#ffeaf5" stroke-width="2.4" stroke-linecap="round" opacity="0.72"/>' +
            '<path d="M196,342 C203,352 211,358 220,362" fill="none" stroke="#b81665" stroke-width="1.2" opacity="0.45"/>' +
            '<path d="M195,361 Q220,369 243,361 L241,371 Q220,379 197,370 Z" fill="url(#top01-satin)" stroke="#9e1054" stroke-width="1"/>' +
            scallopTrim(197, 370, 241, 371, 6, 4.5, 'url(#top01-lace)', '#f2a7cc', 0.8) +
            '<path d="M206,367 C198,362 197,373 206,369 Z M206,367 C214,362 215,373 206,369 Z" fill="#ff99cc" stroke="#b81665" stroke-width="0.8"/>' +
            '<circle cx="206" cy="368" r="2.2" fill="#ffd166"/>'
          ) +
          /* Main contoured satin bodice hugging bust & ribcage */
          '<path d="M240,344 C256,335 280,336 300,350 C320,336 344,335 360,344 C361,368 359,394 353,413 C349,423 343,430 342,436 C326,442 312,448 300,456 C288,448 274,442 258,436 C257,430 251,423 247,413 C241,394 239,368 240,344 Z" fill="url(#top01-satin)" stroke="#9e1054" stroke-width="1.3"/>' +
          /* 2.5D Satin bust highlights & princess seam shading */
          '<path d="M252,352 C266,348 282,354 290,368 C280,376 260,374 249,362 Z" fill="#ffd9ec" opacity="0.4"/>' +
          '<path d="M348,352 C334,348 318,354 310,368 C320,376 340,374 351,362 Z" fill="#ffd9ec" opacity="0.22"/>' +
          '<path d="M268,350 C272,380 274,408 275,436" fill="none" stroke="#8c0c4a" stroke-width="1.4" opacity="0.45"/>' +
          '<path d="M332,350 C328,380 326,408 325,436" fill="none" stroke="#8c0c4a" stroke-width="1.4" opacity="0.45"/>' +
          '<path d="M270,352 C274,380 276,408 277,435" fill="none" stroke="#ffd9ec" stroke-width="1.1" opacity="0.55"/>' +
          '<path d="M289,374 C293,395 294,418 295,442" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.28" stroke-linecap="round"/>' +
          /* Sweetheart lace & pearl neckline trim */
          '<path d="M240,344 C256,335 280,336 300,350 C320,336 344,335 360,344" fill="none" stroke="#fff0f7" stroke-width="2.6" stroke-linecap="round"/>' +
          pearlChain(283, 320, 300, 328, 317, 320, 7, 2.3, 'top01-pearl', '#e0a8c5') +
          /* Scalloped white lace waist hem */
          '<path d="M258,434 Q278,442 300,454 Q322,442 342,434 L343,441 Q322,450 300,462 Q278,450 257,441 Z" fill="url(#top01-lace)" stroke="#f2a7cc" stroke-width="0.9"/>' +
          pearlChain(261, 434, 300, 452, 339, 434, 11, 2.1, 'top01-pearl', '#e0a8c5') +
          /* Royal Heart Diamond Brooch */
          '<circle cx="300" cy="355" r="11.5" fill="#700539" opacity="0.22"/>' +
          '<path d="' + heartPath(300, 354, 12.5) + '" fill="url(#top01-gold)" stroke="#b8730a" stroke-width="0.9"/>' +
          '<path d="' + heartPath(300, 354, 9.2) + '" fill="url(#top01-gem)"/>' +
          '<ellipse cx="296" cy="350" rx="2.6" ry="1.6" transform="rotate(-25 296 350)" fill="#ffffff" opacity="0.9"/>' +
          star4(309, 346, 5.5, '#ffffff', 0.95) +
          star4(288, 362, 4, '#fff7cc', 0.9) +
        '</g>'
    },

    /* ======================================================================
       2. Áo Corset Pha Lê Băng Tuyết
       ====================================================================== */
    {
      id: 'top-02',
      name: 'Áo Corset Pha Lê Băng Tuyết',
      icon: '❄️',
      accentColor: '#4cc9ff',
      previewBox: '142 285 316 240',
      defs:
        '<linearGradient id="top02-ice" x1="0%" y1="0%" x2="100%" y2="12%">' +
          '<stop offset="0%" stop-color="#197ec7"/>' +
          '<stop offset="25%" stop-color="#59c7ff"/>' +
          '<stop offset="48%" stop-color="#d6f6ff"/>' +
          '<stop offset="72%" stop-color="#66d1ff"/>' +
          '<stop offset="100%" stop-color="#1b74bc"/>' +
        '</linearGradient>' +
        '<linearGradient id="top02-cape" x1="50%" y1="0%" x2="50%" y2="100%">' +
          '<stop offset="0%" stop-color="#e8fbff" stop-opacity="0.72"/>' +
          '<stop offset="55%" stop-color="#8ae2ff" stop-opacity="0.52"/>' +
          '<stop offset="100%" stop-color="#b8f0ff" stop-opacity="0.18"/>' +
        '</linearGradient>' +
        '<linearGradient id="top02-mesh" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#f5fdff" stop-opacity="0.94"/>' +
          '<stop offset="100%" stop-color="#9ee8ff" stop-opacity="0.98"/>' +
        '</linearGradient>' +
        '<linearGradient id="top02-silver" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="50%" stop-color="#cfe8ff"/>' +
          '<stop offset="100%" stop-color="#7ab4e8"/>' +
        '</linearGradient>' +
        '<radialGradient id="top02-crystal" cx="35%" cy="30%" r="70%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="35%" stop-color="#aef0ff"/>' +
          '<stop offset="78%" stop-color="#2bb8ff"/>' +
          '<stop offset="100%" stop-color="#0a5ca8"/>' +
        '</radialGradient>',
      backSvg:
        '<g>' +
          '<path d="M236,326 C192,368 158,472 146,615 C195,638 248,645 300,636 C352,645 405,638 454,615 C442,472 408,368 364,326 Z" fill="url(#top02-cape)" stroke="#bdefff" stroke-width="1.3"/>' +
          '<path d="M244,334 C206,385 182,485 174,606" fill="none" stroke="#ffffff" stroke-width="1.6" opacity="0.55"/>' +
          '<path d="M356,334 C394,385 418,485 426,606" fill="none" stroke="#ffffff" stroke-width="1.6" opacity="0.55"/>' +
          snowflake(192, 462, 13, '#ffffff', 0.8) +
          snowflake(408, 462, 13, '#ffffff', 0.8) +
          snowflake(212, 565, 16, '#e6faff', 0.72) +
          snowflake(388, 565, 16, '#e6faff', 0.72) +
          star4(175, 515, 6, '#ffffff', 0.85) +
          star4(425, 515, 6, '#ffffff', 0.85) +
        '</g>',
      svg:
        '<g>' +
          /* Sheer icy illusion upper yoke & silver collar */
          '<path d="M236,342 C240,322 266,318 284,318 C292,324 308,324 316,318 C334,318 360,322 364,342 L348,360 L252,360 Z" fill="url(#top02-mesh)" stroke="#b3ebff" stroke-width="0.9"/>' +
          '<path d="M282,318 Q300,327 318,318 L317,325 Q300,334 283,325 Z" fill="url(#top02-silver)" stroke="#5ba4dc" stroke-width="0.8"/>' +
          /* Frosted ice-silk shoulder drapes covering shoulder cap cleanly */
          mirrorX(
            '<path d="M248,324 C222,316 196,328 191,352 C197,366 222,372 246,360 Z" fill="url(#top02-mesh)" stroke="#9ae2ff" stroke-width="1"/>' +
            '<path d="M246,334 C222,328 198,342 192,362 C206,375 230,375 247,364 Z" fill="url(#top02-ice)" opacity="0.96" stroke="#ffffff" stroke-width="0.9"/>' +
            '<path d="M203,332 C214,323 228,323 240,332" fill="none" stroke="#ffffff" stroke-width="1.8" opacity="0.75" stroke-linecap="round"/>' +
            gemCircle(239, 342, 3.8, 'top02-crystal', '#ffffff')
          ) +
          /* Faceted crystal corset body */
          '<path d="M240,344 C260,336 280,340 300,352 C320,340 340,336 360,344 C360,370 356,396 350,415 L342,435 L322,446 L300,458 L278,446 L258,435 L250,415 C244,396 240,370 240,344 Z" fill="url(#top02-ice)" stroke="#1670b8" stroke-width="1.3"/>' +
          /* 2.5D Crystal prism facets */
          '<polygon points="242,346 276,344 284,378 245,376" fill="#ffffff" opacity="0.28"/>' +
          '<polygon points="358,346 324,344 316,378 355,376" fill="#1360a8" opacity="0.16"/>' +
          '<polygon points="284,378 300,352 316,378 300,432" fill="#e6faff" opacity="0.34"/>' +
          '<polygon points="249,398 284,378 278,444 259,434" fill="#ffffff" opacity="0.22"/>' +
          '<polygon points="351,398 316,378 322,444 341,434" fill="#0f5596" opacity="0.18"/>' +
          /* Silver corset boning & lacing */
          '<path d="M276,348 L279,444 M324,348 L321,444" fill="none" stroke="url(#top02-silver)" stroke-width="1.6"/>' +
          '<path d="M291,376 L309,388 L291,400 L309,412 L291,424 L309,434" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"/>' +
          '<path d="M309,376 L291,388 L309,400 L291,412 L309,424 L291,434" fill="none" stroke="#c2efff" stroke-width="1.2" stroke-linecap="round"/>' +
          /* Icicle diamond hem drops */
          '<path d="M258,435 L278,446 L300,458 L322,446 L342,435" fill="none" stroke="#ffffff" stroke-width="2.2"/>' +
          '<polygon points="300,456 296,464 300,470 304,464" fill="url(#top02-crystal)" stroke="#ffffff" stroke-width="0.7"/>' +
          '<polygon points="278,445 275,452 278,457 281,452" fill="url(#top02-crystal)" stroke="#ffffff" stroke-width="0.6"/>' +
          '<polygon points="322,445 319,452 322,457 325,452" fill="url(#top02-crystal)" stroke="#ffffff" stroke-width="0.6"/>' +
          /* Center snowflake brooch */
          '<circle cx="300" cy="358" r="10.5" fill="url(#top02-silver)" stroke="#3895db" stroke-width="0.9"/>' +
          snowflake(300, 358, 7.5, '#0b6bc2', 0.95) +
          star4(264, 354, 4.5, '#ffffff', 0.9) +
          star4(336, 354, 4.5, '#ffffff', 0.9) +
          star4(300, 344, 5, '#ffffff', 0.95) +
        '</g>'
    },

    /* ======================================================================
       3. Áo Thủy Thủ Ngôi Sao Nơ Lụa
       ====================================================================== */
    {
      id: 'top-03',
      name: 'Áo Thủy Thủ Ngôi Sao Nơ Lụa',
      icon: '🎀',
      accentColor: '#4da6ff',
      previewBox: '168 295 264 200',
      defs:
        '<linearGradient id="top03-white" x1="0%" y1="0%" x2="100%" y2="0%">' +
          '<stop offset="0%" stop-color="#d9e8ff"/>' +
          '<stop offset="22%" stop-color="#f7faff"/>' +
          '<stop offset="52%" stop-color="#ffffff"/>' +
          '<stop offset="80%" stop-color="#eef5ff"/>' +
          '<stop offset="100%" stop-color="#cfe2ff"/>' +
        '</linearGradient>' +
        '<linearGradient id="top03-blue" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#7cc4ff"/>' +
          '<stop offset="50%" stop-color="#489ef5"/>' +
          '<stop offset="100%" stop-color="#2876cf"/>' +
        '</linearGradient>' +
        '<linearGradient id="top03-bow" x1="0%" y1="0%" x2="100%" y2="20%">' +
          '<stop offset="0%" stop-color="#d92678"/>' +
          '<stop offset="35%" stop-color="#ff66b0"/>' +
          '<stop offset="55%" stop-color="#ffb3d7"/>' +
          '<stop offset="85%" stop-color="#ff4d9e"/>' +
          '<stop offset="100%" stop-color="#c41968"/>' +
        '</linearGradient>' +
        '<linearGradient id="top03-gold" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#fff4b8"/>' +
          '<stop offset="50%" stop-color="#ffd24c"/>' +
          '<stop offset="100%" stop-color="#d99416"/>' +
        '</linearGradient>',
      backSvg:
        '<g>' +
          '<path d="M276,318 Q300,310 324,318 L318,328 L282,328 Z" fill="url(#top03-blue)" stroke="#2366b5" stroke-width="1"/>' +
          mirrorX(
            '<path d="M270,400 C250,425 236,456 232,482 L248,476 L256,488 C264,462 272,434 278,412 Z" fill="url(#top03-bow)" opacity="0.86" stroke="#b5165d" stroke-width="0.9"/>'
          ) +
        '</g>',
      svg:
        '<g>' +
          /* Crisp white sailor blouse sleeves */
          mirrorX(
            '<ellipse cx="220" cy="338" rx="31" ry="29" fill="url(#top03-white)" stroke="#8eb4e6" stroke-width="1.2"/>' +
            '<path d="M199,323 C211,313 230,315 240,329" fill="none" stroke="#ffffff" stroke-width="2.4" opacity="0.85" stroke-linecap="round"/>' +
            '<path d="M195,358 Q220,367 243,358 L241,369 Q220,378 197,368 Z" fill="url(#top03-blue)" stroke="#2366b5" stroke-width="1"/>' +
            '<path d="M196,363 Q220,372 242,363" fill="none" stroke="#ffffff" stroke-width="1.6"/>'
          ) +
          /* Sailor white fitted blouse torso */
          '<path d="M236,332 C249,321 271,318 284,318 L316,318 C329,318 351,321 364,332 C363,363 359,395 351,415 L342,436 L258,436 L249,415 C241,395 237,363 236,332 Z" fill="url(#top03-white)" stroke="#8eb4e6" stroke-width="1.3"/>' +
          '<path d="M276,374 C278,396 280,414 282,428 M324,374 C322,396 320,414 318,428" fill="none" stroke="#b9d1f2" stroke-width="1.4" opacity="0.75"/>' +
          /* Sailor V-collar with double stripes & gold stars */
          '<path d="M282,318 C264,318 244,324 236,336 C242,354 256,368 300,382 C344,368 358,354 364,336 C356,324 336,318 318,318 L315,326 L300,370 L285,326 Z" fill="url(#top03-blue)" stroke="#2366b5" stroke-width="1.2"/>' +
          '<path d="M241,337 C248,352 262,364 300,377 C338,364 352,352 359,337" fill="none" stroke="#ffffff" stroke-width="1.7"/>' +
          '<path d="M245,334 C253,347 266,358 300,371 C334,358 347,347 355,334" fill="none" stroke="#ffffff" stroke-width="1.2" opacity="0.88"/>' +
          star5(254, 342, 5.2, 2.3, 'url(#top03-gold)', '#b5720b', 0.6) +
          star5(346, 342, 5.2, 2.3, 'url(#top03-gold)', '#b5720b', 0.6) +
          /* Striped sailor waistband */
          '<path d="M258,426 Q300,432 342,426 L343,443 Q300,449 257,443 Z" fill="url(#top03-blue)" stroke="#2366b5" stroke-width="1.1"/>' +
          '<path d="M258,438 Q300,444 342,438" fill="none" stroke="#ffffff" stroke-width="1.6"/>' +
          '<circle cx="282" cy="434" r="2.6" fill="url(#top03-gold)" stroke="#9e6308" stroke-width="0.6"/>' +
          '<circle cx="318" cy="434" r="2.6" fill="url(#top03-gold)" stroke="#9e6308" stroke-width="0.6"/>' +
          /* Big glossy 2.5D pink satin bow */
          '<g>' +
            '<path d="M294,376 L278,424 L290,418 L298,428 L300,380 L302,428 L310,418 L322,424 L306,376 Z" fill="url(#top03-bow)" stroke="#ad1358" stroke-width="1"/>' +
            '<path d="M296,368 C264,344 252,374 268,388 C278,395 292,386 297,376 Z" fill="url(#top03-bow)" stroke="#ad1358" stroke-width="1.1"/>' +
            '<path d="M304,368 C336,344 348,374 332,388 C322,395 308,386 303,376 Z" fill="url(#top03-bow)" stroke="#ad1358" stroke-width="1.1"/>' +
            '<path d="M266,368 C276,362 288,366 294,373 M334,368 C324,362 312,366 306,373" fill="none" stroke="#ffe0ef" stroke-width="1.6" opacity="0.7" stroke-linecap="round"/>' +
            '<rect x="292" y="362" width="16" height="15" rx="5" fill="url(#top03-bow)" stroke="#ad1358" stroke-width="1"/>' +
            star5(300, 369.5, 6.2, 2.8, 'url(#top03-gold)', '#9e6308', 0.7) +
            star4(309, 360, 4, '#ffffff', 0.95) +
          '</g>' +
        '</g>'
    },

    /* ======================================================================
       4. Áo Tiên Hoa Cánh Bướm
       ====================================================================== */
    {
      id: 'top-04',
      name: 'Áo Tiên Hoa Cánh Bướm',
      icon: '🦋',
      accentColor: '#52e0b6',
      previewBox: '116 238 368 295',
      defs:
        '<linearGradient id="top04-wing" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#99ffe0" stop-opacity="0.82"/>' +
          '<stop offset="48%" stop-color="#c4b5fd" stop-opacity="0.76"/>' +
          '<stop offset="100%" stop-color="#f9a8d4" stop-opacity="0.72"/>' +
        '</linearGradient>' +
        '<linearGradient id="top04-wing-lo" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#d8b4fe" stop-opacity="0.78"/>' +
          '<stop offset="55%" stop-color="#6ee7b7" stop-opacity="0.72"/>' +
          '<stop offset="100%" stop-color="#fbcfe8" stop-opacity="0.68"/>' +
        '</linearGradient>' +
        '<linearGradient id="top04-mint" x1="0%" y1="0%" x2="100%" y2="10%">' +
          '<stop offset="0%" stop-color="#1e9e7b"/>' +
          '<stop offset="28%" stop-color="#6ef2c8"/>' +
          '<stop offset="52%" stop-color="#c7ffed"/>' +
          '<stop offset="78%" stop-color="#4fd9b0"/>' +
          '<stop offset="100%" stop-color="#198769"/>' +
        '</linearGradient>' +
        '<linearGradient id="top04-lav" x1="0%" y1="0%" x2="100%" y2="20%">' +
          '<stop offset="0%" stop-color="#7c3aed"/>' +
          '<stop offset="35%" stop-color="#c084fc"/>' +
          '<stop offset="60%" stop-color="#f3e8ff"/>' +
          '<stop offset="100%" stop-color="#9333ea"/>' +
        '</linearGradient>' +
        '<radialGradient id="top04-blossom" cx="40%" cy="35%" r="65%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="45%" stop-color="#fbcfe8"/>' +
          '<stop offset="100%" stop-color="#ec4899"/>' +
        '</radialGradient>' +
        '<linearGradient id="top04-sheer" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#f0fff9" stop-opacity="0.94"/>' +
          '<stop offset="100%" stop-color="#d8fff0" stop-opacity="0.98"/>' +
        '</linearGradient>',
      backSvg:
        '<g>' +
          mirrorX(
            '<path d="M276,348 C236,280 156,232 122,256 C106,274 128,354 198,382 C232,396 262,386 276,374 Z" fill="url(#top04-wing)" stroke="#fef08a" stroke-width="1.6"/>' +
            '<path d="M262,354 C216,304 164,264 138,274 C152,324 196,362 254,370" fill="none" stroke="#fffbeb" stroke-width="1.2" opacity="0.72"/>' +
            '<path d="M250,362 C202,328 164,302 142,310" fill="none" stroke="#fffbeb" stroke-width="1" opacity="0.62"/>' +
            '<ellipse cx="164" cy="292" rx="14" ry="9" transform="rotate(-24 164 292)" fill="#ffffff" opacity="0.45"/>' +
            '<circle cx="152" cy="322" r="5" fill="#fbcfe8" opacity="0.7"/>' +
            '<path d="M274,376 C228,390 156,422 152,472 C152,516 218,524 254,480 C268,460 274,424 276,396 Z" fill="url(#top04-wing-lo)" stroke="#fef08a" stroke-width="1.4"/>' +
            '<path d="M262,394 C220,418 182,452 178,488" fill="none" stroke="#fffbeb" stroke-width="1.1" opacity="0.65"/>' +
            '<circle cx="192" cy="466" r="8" fill="#ffffff" opacity="0.42"/>' +
            star4(142, 272, 6, '#ffffff', 0.92) +
            star4(174, 496, 5, '#fef08a', 0.9)
          ) +
        '</g>',
      svg:
        '<g>' +
          '<path d="M236,340 C242,323 270,318 286,320 Q300,328 314,320 C330,318 358,323 364,340 L348,360 L252,360 Z" fill="url(#top04-sheer)" stroke="#86efac" stroke-width="0.9"/>' +
          mirrorX(
            '<path d="M248,323 C221,308 190,320 193,345 C197,364 224,372 247,358 Z" fill="url(#top04-lav)" stroke="#6d28d9" stroke-width="1"/>' +
            '<path d="M244,335 C217,333 195,347 199,366 C209,376 232,375 247,360 Z" fill="url(#top04-mint)" stroke="#157a5e" stroke-width="1"/>' +
            '<path d="M208,331 C219,322 232,324 240,334" fill="none" stroke="#ffffff" stroke-width="1.6" opacity="0.75" stroke-linecap="round"/>'
          ) +
          '<path d="M238,340 C256,333 282,337 300,352 C318,337 344,333 362,340 C361,370 356,396 349,415 L342,436 L258,436 L251,415 C244,396 239,370 238,340 Z" fill="url(#top04-mint)" stroke="#157a5e" stroke-width="1.2"/>' +
          '<path d="M242,344 C264,342 292,354 300,382 C282,392 254,386 244,364 Z" fill="url(#top04-lav)" opacity="0.88" stroke="#6d28d9" stroke-width="0.9"/>' +
          '<path d="M358,344 C336,342 308,354 300,382 C318,392 346,386 356,364 Z" fill="url(#top04-lav)" opacity="0.88" stroke="#6d28d9" stroke-width="0.9"/>' +
          '<path d="M268,382 C284,390 296,388 300,432 C284,432 266,424 257,412 Z" fill="#a7f3d0" opacity="0.52"/>' +
          '<path d="M278,356 L288,376 M322,356 L312,376 M300,384 L300,430" fill="none" stroke="#fef08a" stroke-width="1.1" opacity="0.75"/>' +
          '<path d="M258,432 C244,442 238,456 250,462 C264,466 276,456 282,444 C288,458 296,464 300,464 C304,464 312,458 318,444 C324,456 336,466 350,462 C362,456 356,442 342,432 Z" fill="url(#top04-lav)" stroke="#6d28d9" stroke-width="1.1"/>' +
          '<path d="M266,434 C260,446 266,458 278,456 C288,454 294,444 300,438 C306,444 312,454 322,456 C334,458 340,446 334,434 Z" fill="url(#top04-mint)" stroke="#157a5e" stroke-width="1"/>' +
          '<g>' +
            '<circle cx="300" cy="434" r="7.5" fill="url(#top04-blossom)" stroke="#db2777" stroke-width="0.8"/>' +
            '<circle cx="300" cy="434" r="3" fill="#fef08a"/>' +
            '<circle cx="272" cy="432" r="5.5" fill="url(#top04-blossom)" stroke="#db2777" stroke-width="0.7"/>' +
            '<circle cx="272" cy="432" r="2.2" fill="#fef08a"/>' +
            '<circle cx="328" cy="432" r="5.5" fill="url(#top04-blossom)" stroke="#db2777" stroke-width="0.7"/>' +
            '<circle cx="328" cy="432" r="2.2" fill="#fef08a"/>' +
            '<circle cx="300" cy="356" r="6" fill="url(#top04-blossom)" stroke="#db2777" stroke-width="0.7"/>' +
            '<circle cx="300" cy="356" r="2.4" fill="#fef08a"/>' +
            star4(288, 344, 4.5, '#ffffff', 0.95) +
            star4(312, 344, 4.5, '#ffffff', 0.95) +
          '</g>' +
        '</g>'
    },

    /* ======================================================================
       5. Áo Khoác Idol Kim Sa Ngôi Sao
       ====================================================================== */
    {
      id: 'top-05',
      name: 'Áo Khoác Idol Kim Sa Ngôi Sao',
      icon: '⭐',
      accentColor: '#d946ef',
      previewBox: '168 295 264 200',
      defs:
        '<linearGradient id="top05-jacket" x1="0%" y1="0%" x2="100%" y2="15%">' +
          '<stop offset="0%" stop-color="#7e22ce"/>' +
          '<stop offset="28%" stop-color="#d946ef"/>' +
          '<stop offset="52%" stop-color="#f5a3ff"/>' +
          '<stop offset="76%" stop-color="#a855f7"/>' +
          '<stop offset="100%" stop-color="#581c87"/>' +
        '</linearGradient>' +
        '<linearGradient id="top05-tee" x1="0%" y1="0%" x2="100%" y2="0%">' +
          '<stop offset="0%" stop-color="#f3e8ff"/>' +
          '<stop offset="50%" stop-color="#ffffff"/>' +
          '<stop offset="100%" stop-color="#ede9fe"/>' +
        '</linearGradient>' +
        '<linearGradient id="top05-neon" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#ff2e93"/>' +
          '<stop offset="52%" stop-color="#f472b6"/>' +
          '<stop offset="100%" stop-color="#22d3ee"/>' +
        '</linearGradient>' +
        '<linearGradient id="top05-belt" x1="0%" y1="0%" x2="100%" y2="0%">' +
          '<stop offset="0%" stop-color="#1e1b4b"/>' +
          '<stop offset="50%" stop-color="#4c1d95"/>' +
          '<stop offset="100%" stop-color="#1e1b4b"/>' +
        '</linearGradient>' +
        '<linearGradient id="top05-gold" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#fef08a"/>' +
          '<stop offset="55%" stop-color="#fbbf24"/>' +
          '<stop offset="100%" stop-color="#b45309"/>' +
        '</linearGradient>',
      backSvg:
        '<g>' +
          mirrorX(
            '<path d="M238,376 C224,412 216,450 218,488 L234,478 L242,494 C244,458 248,418 256,388 Z" fill="url(#top05-neon)" opacity="0.72" stroke="#ffffff" stroke-width="0.8"/>'
          ) +
        '</g>',
      svg:
        '<g>' +
          /* Inner idol fitted tee covering full torso cleanly */
          '<path d="M237,331 C250,321 273,318 285,319 Q300,332 315,319 C327,318 350,321 363,331 C362,364 358,394 351,414 L342,438 L258,438 L249,414 C242,394 238,364 237,331 Z" fill="url(#top05-tee)" stroke="#c4b5fd" stroke-width="1"/>' +
          '<path d="M284,320 Q300,334 316,320" fill="none" stroke="#ff3b9a" stroke-width="2.4"/>' +
          '<path d="' + heartPath(300, 372, 22) + '" fill="url(#top05-neon)" stroke="#ffffff" stroke-width="1.2"/>' +
          star5(300, 372, 8.5, 3.8, '#fef08a', '#ff2e93', 0.8) +
          /* Jacket puff varsity-idol sleeves */
          mirrorX(
            '<ellipse cx="220" cy="340" rx="31" ry="30" fill="url(#top05-jacket)" stroke="#581c87" stroke-width="1.2"/>' +
            '<path d="M199,324 C211,314 230,316 240,329" fill="none" stroke="#fae8ff" stroke-width="2.2" opacity="0.72" stroke-linecap="round"/>' +
            star5(205, 342, 7.2, 3.2, '#22d3ee', '#ffffff', 0.9) +
            '<path d="M195,361 Q220,370 243,361 L241,372 Q220,381 197,371 Z" fill="url(#top05-belt)" stroke="#22d3ee" stroke-width="1"/>' +
            '<path d="M196,366 Q220,375 242,366" fill="none" stroke="#ff3b9a" stroke-width="1.6"/>'
          ) +
          /* Cropped open sequin jacket panels */
          mirrorX(
            '<path d="M236,331 C250,321 268,318 282,320 L278,354 L283,414 L247,414 C239,394 236,362 236,331 Z" fill="url(#top05-jacket)" stroke="#581c87" stroke-width="1.2"/>' +
            '<polygon points="282,320 264,334 274,358 281,354" fill="#22d3ee" stroke="#ffffff" stroke-width="0.8" opacity="0.9"/>' +
            '<path d="M278,356 L282,412" fill="none" stroke="url(#top05-gold)" stroke-width="2.2" stroke-dasharray="3,2"/>' +
            '<path d="M247,407 L283,407 L283,415 L249,415 Z" fill="url(#top05-belt)" stroke="#22d3ee" stroke-width="0.9"/>'
          ) +
          glitterDots([
            [256, 346, 1.8, '#ffffff'], [264, 368, 2.0, '#22d3ee'], [254, 386, 1.7, '#fef08a'],
            [270, 396, 1.9, '#ffffff'], [260, 336, 1.5, '#fef08a'],
            [344, 346, 1.8, '#ffffff'], [336, 368, 2.0, '#22d3ee'], [346, 386, 1.7, '#fef08a'],
            [330, 396, 1.9, '#ffffff'], [340, 336, 1.5, '#fef08a']
          ], '#ffffff', 0.9) +
          '<path d="M258,425 Q300,432 342,425 L343,443 Q300,450 257,443 Z" fill="url(#top05-belt)" stroke="#ff3b9a" stroke-width="1.1"/>' +
          '<rect x="291" y="424" width="18" height="19" rx="4" fill="url(#top05-gold)" stroke="#92400e" stroke-width="0.9"/>' +
          star5(300, 433.5, 6.2, 2.6, '#ff2e93', '#ffffff', 0.7) +
          star4(322, 360, 5, '#ffffff', 0.92) +
          star4(278, 360, 5, '#22d3ee', 0.92) +
        '</g>'
    },

    /* ======================================================================
       6. Áo Len Dệt Tim Kẹo Ngọt
       ====================================================================== */
    {
      id: 'top-06',
      name: 'Áo Len Dệt Tim Kẹo Ngọt',
      icon: '🧸',
      accentColor: '#ff9e7d',
      previewBox: '168 295 264 200',
      defs:
        '<linearGradient id="top06-peach" x1="0%" y1="0%" x2="100%" y2="10%">' +
          '<stop offset="0%" stop-color="#e87a56"/>' +
          '<stop offset="25%" stop-color="#ffb196"/>' +
          '<stop offset="52%" stop-color="#ffd9cc"/>' +
          '<stop offset="78%" stop-color="#ffa787"/>' +
          '<stop offset="100%" stop-color="#de6c47"/>' +
        '</linearGradient>' +
        '<linearGradient id="top06-cream" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="100%" stop-color="#fff0e3"/>' +
        '</linearGradient>' +
        '<radialGradient id="top06-pearl" cx="34%" cy="30%" r="68%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="55%" stop-color="#ffe6f0"/>' +
          '<stop offset="100%" stop-color="#e3adc2"/>' +
        '</radialGradient>' +
        '<linearGradient id="top06-pink" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#ff8fb8"/>' +
          '<stop offset="100%" stop-color="#f43f7d"/>' +
        '</linearGradient>',
      backSvg:
        '<g>' +
          '<path d="M278,318 Q300,312 322,318 L318,328 L282,328 Z" fill="url(#top06-peach)" stroke="#cc5a35" stroke-width="0.9"/>' +
        '</g>',
      svg:
        '<g>' +
          /* Vanilla ribbed camisole underneath */
          '<path d="M242,334 C252,324 272,320 284,320 Q300,334 316,320 C328,320 348,324 358,334 L350,415 L342,438 Q300,446 258,438 L250,415 Z" fill="url(#top06-cream)" stroke="#e6c4b3" stroke-width="1"/>' +
          '<path d="M280,324 Q300,342 320,324" fill="none" stroke="#ff9ebb" stroke-width="2" stroke-dasharray="2,2"/>' +
          scallopTrim(258, 437, 342, 437, 10, 5.5, 'url(#top06-cream)', '#e6b8a2', 0.9) +
          /* Cozy knit puff cardigan sleeves */
          mirrorX(
            '<ellipse cx="220" cy="340" rx="31" ry="29" fill="url(#top06-peach)" stroke="#cc5a35" stroke-width="1.2"/>' +
            '<path d="M206,320 C210,334 210,348 208,360 M220,316 C224,332 224,348 222,360 M234,322 C236,336 236,348 234,358" fill="none" stroke="#e87a56" stroke-width="1.4" opacity="0.45"/>' +
            '<path d="M201,325 C211,316 229,317 239,329" fill="none" stroke="#fff4ed" stroke-width="2.2" opacity="0.65" stroke-linecap="round"/>' +
            '<path d="M195,359 Q220,368 243,359 L241,372 Q220,381 197,371 Z" fill="url(#top06-peach)" stroke="#cc5a35" stroke-width="1"/>' +
            '<path d="M203,362 L203,370 M211,364 L211,373 M220,365 L220,374 M229,364 L229,373 M237,362 L237,371" fill="none" stroke="#cc5a35" stroke-width="0.9" opacity="0.55"/>'
          ) +
          /* Cozy peach cable-knit cardigan body */
          '<path d="M236,331 C250,321 270,318 284,318 L298,350 L302,350 L316,318 C330,318 350,321 364,331 C363,365 357,396 347,424 Q300,432 253,424 C243,396 237,365 236,331 Z" fill="url(#top06-peach)" stroke="#cc5a35" stroke-width="1.2"/>' +
          mirrorX(
            '<path d="M262,334 C256,344 268,354 262,364 C256,374 268,384 262,394 C256,404 266,412 262,418" fill="none" stroke="#ffe8de" stroke-width="2.6" stroke-linecap="round" opacity="0.72"/>' +
            '<path d="M262,334 C268,344 256,354 262,364 C268,374 256,384 262,394 C268,404 258,412 262,418" fill="none" stroke="#c95836" stroke-width="1.2" opacity="0.45"/>' +
            '<path d="M258,386 L282,386 L280,408 Q270,414 260,408 Z" fill="#ffd9cc" stroke="#d9714e" stroke-width="0.9"/>' +
            '<path d="' + heartPath(270, 397, 6.2) + '" fill="url(#top06-pink)"/>'
          ) +
          '<path d="M294,350 L306,350 L306,426 L294,426 Z" fill="#ffc4b0" stroke="#cc5a35" stroke-width="0.9"/>' +
          '<path d="M253,416 Q300,422 347,416 L345,427 Q300,433 255,427 Z" fill="url(#top06-peach)" stroke="#cc5a35" stroke-width="1"/>' +
          '<path d="' + heartPath(300, 362, 5.8) + '" fill="url(#top06-pearl)" stroke="#d493ad" stroke-width="0.8"/>' +
          '<circle cx="298" cy="360" r="1.3" fill="#ffffff"/>' +
          '<path d="' + heartPath(300, 386, 5.8) + '" fill="url(#top06-pearl)" stroke="#d493ad" stroke-width="0.8"/>' +
          '<circle cx="298" cy="384" r="1.3" fill="#ffffff"/>' +
          '<path d="' + heartPath(300, 410, 5.8) + '" fill="url(#top06-pearl)" stroke="#d493ad" stroke-width="0.8"/>' +
          '<circle cx="298" cy="408" r="1.3" fill="#ffffff"/>' +
          star4(282, 338, 4, '#ffffff', 0.85) +
          star4(318, 338, 4, '#ffffff', 0.85) +
        '</g>'
    },

    /* ======================================================================
       7. Áo Ren Dâu Tây Mộng Mơ
       ====================================================================== */
    {
      id: 'top-07',
      name: 'Áo Ren Dâu Tây Mộng Mơ',
      icon: '🍓',
      accentColor: '#ff7096',
      previewBox: '168 292 264 205',
      defs:
        '<linearGradient id="top07-milk" x1="0%" y1="0%" x2="100%" y2="8%">' +
          '<stop offset="0%" stop-color="#eb6388"/>' +
          '<stop offset="22%" stop-color="#ff9ebb"/>' +
          '<stop offset="50%" stop-color="#ffd6e4"/>' +
          '<stop offset="78%" stop-color="#ff94b4"/>' +
          '<stop offset="100%" stop-color="#df5379"/>' +
        '</linearGradient>' +
        '<linearGradient id="top07-cream" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="100%" stop-color="#ffeef4"/>' +
        '</linearGradient>' +
        '<radialGradient id="top07-berry" cx="35%" cy="30%" r="70%">' +
          '<stop offset="0%" stop-color="#ff85a1"/>' +
          '<stop offset="45%" stop-color="#ff1e56"/>' +
          '<stop offset="100%" stop-color="#9e082f"/>' +
        '</radialGradient>',
      backSvg:
        '<g>' +
          mirrorX(
            '<path d="M262,430 C242,448 232,474 228,496 L246,488 L254,500 C262,476 268,450 272,434 Z" fill="#ff5c8a" opacity="0.85" stroke="#bd1e4c" stroke-width="0.9"/>'
          ) +
        '</g>',
      svg:
        '<g>' +
          /* Tiered Lolita eyelet-lace puff sleeves */
          mirrorX(
            '<ellipse cx="220" cy="338" rx="31" ry="29" fill="url(#top07-milk)" stroke="#c73c63" stroke-width="1.2"/>' +
            '<ellipse cx="220" cy="338" rx="23" ry="20" fill="url(#top07-cream)" opacity="0.5"/>' +
            '<path d="M201,321 C212,312 230,314 240,325" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.8" stroke-linecap="round"/>' +
            '<path d="M194,356 Q220,367 244,356 L241,370 Q220,379 197,368 Z" fill="url(#top07-cream)" stroke="#e69bb2" stroke-width="0.9"/>' +
            scallopTrim(197, 368, 241, 370, 6, 4.5, '#ffffff', '#e69bb2', 0.8)
          ) +
          /* Strawberry-milk blouse body */
          '<path d="M236,332 C250,321 271,318 284,318 L316,318 C329,318 350,321 364,332 C363,365 358,396 349,416 L342,436 L258,436 L251,416 C242,396 237,365 236,332 Z" fill="url(#top07-milk)" stroke="#c73c63" stroke-width="1.2"/>' +
          '<path d="M258,432 C246,442 242,452 244,458 Q300,468 356,458 C358,452 354,442 342,432 Z" fill="url(#top07-cream)" stroke="#e08ba5" stroke-width="1"/>' +
          scallopTrim(244, 456, 356, 456, 12, 5.5, '#ffffff', '#e08ba5', 0.85) +
          '<path d="M284,332 L316,332 L314,432 L286,432 Z" fill="url(#top07-cream)" stroke="#f0a8be" stroke-width="0.9"/>' +
          '<path d="M284,344 C278,356 286,368 282,380 C278,392 286,404 282,418 L286,430" fill="none" stroke="#ff9ebb" stroke-width="2" stroke-linecap="round"/>' +
          '<path d="M316,344 C322,356 314,368 318,380 C322,392 314,404 318,418 L314,430" fill="none" stroke="#ff9ebb" stroke-width="2" stroke-linecap="round"/>' +
          '<path d="M291,358 L309,372 L291,386 L309,400 L291,414 L309,428" fill="none" stroke="#ff2e63" stroke-width="1.5" stroke-linecap="round"/>' +
          '<path d="M309,358 L291,372 L309,386 L291,400 L309,414 L291,428" fill="none" stroke="#ff5c8a" stroke-width="1.3" stroke-linecap="round"/>' +
          '<path d="M282,318 C272,328 264,344 282,344 C292,344 298,334 300,328 C302,334 308,344 318,344 C336,344 328,328 318,318 Q300,324 282,318 Z" fill="url(#top07-cream)" stroke="#e08ba5" stroke-width="1"/>' +
          '<path d="M258,427 Q300,434 342,427 L342,438 Q300,445 258,438 Z" fill="#ff4d79" stroke="#bd1e4c" stroke-width="0.9"/>' +
          '<path d="M296,338 C278,326 274,344 286,348 C292,350 297,344 299,340 Z M304,338 C322,326 326,344 314,348 C308,350 303,344 301,340 Z" fill="#ff3b72" stroke="#b51441" stroke-width="0.9"/>' +
          '<path d="M300,342 C292,342 290,352 294,358 C297,362 303,362 306,358 C310,352 308,342 300,342 Z" fill="url(#top07-berry)" stroke="#9e082f" stroke-width="0.8"/>' +
          '<path d="M294,343 L298,346 L300,342 L302,346 L306,343 L303,340 L297,340 Z" fill="#4ade80" stroke="#15803d" stroke-width="0.6"/>' +
          '<circle cx="297" cy="348" r="1.1" fill="#ffffff" opacity="0.85"/>' +
          '<circle cx="298" cy="354" r="0.6" fill="#fde047"/>' +
          '<circle cx="302" cy="352" r="0.6" fill="#fde047"/>' +
          '<circle cx="268" cy="446" r="3.2" fill="url(#top07-berry)"/>' +
          '<path d="M266,443 L268,444.5 L270,443" fill="none" stroke="#22c55e" stroke-width="1.3"/>' +
          '<circle cx="332" cy="446" r="3.2" fill="url(#top07-berry)"/>' +
          '<path d="M330,443 L332,444.5 L334,443" fill="none" stroke="#22c55e" stroke-width="1.3"/>' +
        '</g>'
    },

    /* ======================================================================
       8. Áo Tiên Cá Vỏ Sò Ngọc Trai
       ====================================================================== */
    {
      id: 'top-08',
      name: 'Áo Tiên Cá Vỏ Sò Ngọc Trai',
      icon: '🐚',
      accentColor: '#38e8cf',
      previewBox: '176 295 248 200',
      defs:
        '<linearGradient id="top08-shell" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#a5f3fc"/>' +
          '<stop offset="35%" stop-color="#f9a8d4"/>' +
          '<stop offset="68%" stop-color="#c4b5fd"/>' +
          '<stop offset="100%" stop-color="#2dd4bf"/>' +
        '</linearGradient>' +
        '<linearGradient id="top08-scale" x1="0%" y1="0%" x2="100%" y2="10%">' +
          '<stop offset="0%" stop-color="#0d9488"/>' +
          '<stop offset="28%" stop-color="#5eead4"/>' +
          '<stop offset="52%" stop-color="#e0f2fe"/>' +
          '<stop offset="76%" stop-color="#a78bfa"/>' +
          '<stop offset="100%" stop-color="#0f766e"/>' +
        '</linearGradient>' +
        '<linearGradient id="top08-fin" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#99f6e4" stop-opacity="0.82"/>' +
          '<stop offset="55%" stop-color="#f5d0fe" stop-opacity="0.72"/>' +
          '<stop offset="100%" stop-color="#67e8f9" stop-opacity="0.38"/>' +
        '</linearGradient>' +
        '<linearGradient id="top08-cap" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#a5f3fc" stop-opacity="0.96"/>' +
          '<stop offset="50%" stop-color="#f5d0fe" stop-opacity="0.96"/>' +
          '<stop offset="100%" stop-color="#5eead4" stop-opacity="0.98"/>' +
        '</linearGradient>' +
        '<radialGradient id="top08-pearl" cx="34%" cy="30%" r="68%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="55%" stop-color="#ecfeff"/>' +
          '<stop offset="100%" stop-color="#b4d6e8"/>' +
        '</radialGradient>' +
        '<linearGradient id="top08-starfish" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#fff0f6"/>' +
          '<stop offset="50%" stop-color="#ff8fab"/>' +
          '<stop offset="100%" stop-color="#e11d74"/>' +
        '</linearGradient>',
      backSvg:
        '<g>' +
          mirrorX(
            '<path d="M244,344 C216,356 200,398 206,448 C222,462 246,456 258,432 Z" fill="url(#top08-fin)" stroke="#a5f3fc" stroke-width="1"/>' +
            '<path d="M238,358 C222,380 214,412 216,438" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.65"/>'
          ) +
        '</g>',
      svg:
        '<g>' +
          /* Iridescent sea-silk chest lining covering collarbone cleanly */
          '<path d="M236,342 C244,324 266,320 282,322 Q300,330 318,322 C334,320 356,324 364,342 L348,370 L252,370 Z" fill="url(#top08-cap)" stroke="#99f6e4" stroke-width="0.9"/>' +
          /* Iridescent sea-silk fin flutter cap sleeves covering shoulders cleanly */
          mirrorX(
            '<path d="M248,328 C222,316 196,324 195,346 C198,362 222,368 246,356 Z" fill="url(#top08-cap)" stroke="#2dd4bf" stroke-width="1.1"/>' +
            '<path d="M204,335 C215,326 229,327 239,336" fill="none" stroke="#ffffff" stroke-width="1.6" opacity="0.75" stroke-linecap="round"/>'
          ) +
          /* Opaque sea-silk scale fitted midriff rising behind shells (y: 356..454) so zero camisole shows */
          '<path d="M242,358 Q300,368 358,358 C359,382 355,402 348,418 L342,436 Q320,446 300,454 Q280,446 258,436 L252,418 C245,402 241,382 242,358 Z" fill="url(#top08-scale)" stroke="#0f766e" stroke-width="1.2"/>' +
          '<path d="M254,396 Q268,406 280,396 Q292,406 300,396 Q308,406 320,396 Q332,406 346,396" fill="none" stroke="#ffffff" stroke-width="1.1" opacity="0.55"/>' +
          '<path d="M258,414 Q274,424 288,414 Q300,424 312,414 Q326,424 342,414" fill="none" stroke="#ffffff" stroke-width="1.1" opacity="0.55"/>' +
          '<path d="M262,430 Q282,440 300,430 Q318,440 338,430" fill="none" stroke="#e0f2fe" stroke-width="1.2" opacity="0.65"/>' +
          /* Sculpted 2.5D Iridescent Seashell Cups */
          mirrorX(
            '<path d="M242,358 C238,344 252,334 264,338 C272,332 284,338 290,348 C298,354 300,368 296,384 C282,390 254,386 244,374 Z" fill="url(#top08-shell)" stroke="#0e7490" stroke-width="1.2"/>' +
            '<path d="M252,344 L274,382 M264,339 L282,384 M277,340 L289,383 M246,356 L266,381" fill="none" stroke="#ffffff" stroke-width="1.1" opacity="0.72"/>' +
            '<path d="M252,344 C264,342 276,348 282,358" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.55" stroke-linecap="round"/>'
          ) +
          pearlChain(264, 338, 260, 325, 276, 320, 5, 2.4, 'top08-pearl', '#81b2c9') +
          pearlChain(336, 338, 340, 325, 324, 320, 5, 2.4, 'top08-pearl', '#81b2c9') +
          pearlChain(242, 346, 210, 360, 202, 338, 6, 2.5, 'top08-pearl', '#81b2c9') +
          pearlChain(358, 346, 390, 360, 398, 338, 6, 2.5, 'top08-pearl', '#81b2c9') +
          pearlChain(258, 435, 300, 452, 342, 435, 11, 2.6, 'top08-pearl', '#81b2c9') +
          star5(300, 368, 11.5, 5.2, 'url(#top08-starfish)', '#be185d', 0.9) +
          '<circle cx="300" cy="368" r="4" fill="url(#top08-pearl)" stroke="#81b2c9" stroke-width="0.6"/>' +
          '<circle cx="298.8" cy="366.8" r="1.2" fill="#ffffff"/>' +
          star4(268, 356, 4.5, '#ffffff', 0.92) +
          star4(332, 356, 4.5, '#ffffff', 0.92) +
          star4(300, 412, 4, '#ffffff', 0.85) +
        '</g>'
    },

    /* ======================================================================
       9. Áo Nhung Đỏ Hoàng Tộc
       ====================================================================== */
    {
      id: 'top-09',
      name: 'Áo Nhung Đỏ Hoàng Tộc',
      icon: '👑',
      accentColor: '#d61f4d',
      previewBox: '154 290 292 225',
      defs:
        '<linearGradient id="top09-velvet" x1="0%" y1="0%" x2="100%" y2="8%">' +
          '<stop offset="0%" stop-color="#5e051d"/>' +
          '<stop offset="22%" stop-color="#b8143d"/>' +
          '<stop offset="48%" stop-color="#e83562"/>' +
          '<stop offset="72%" stop-color="#a80f35"/>' +
          '<stop offset="100%" stop-color="#4d0316"/>' +
        '</linearGradient>' +
        '<linearGradient id="top09-cape" x1="50%" y1="0%" x2="50%" y2="100%">' +
          '<stop offset="0%" stop-color="#9e0e32"/>' +
          '<stop offset="65%" stop-color="#700721"/>' +
          '<stop offset="100%" stop-color="#4a0314"/>' +
        '</linearGradient>' +
        '<linearGradient id="top09-fur" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="70%" stop-color="#f1f5f9"/>' +
          '<stop offset="100%" stop-color="#cbd5e1"/>' +
        '</linearGradient>' +
        '<linearGradient id="top09-gold" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#fff3b0"/>' +
          '<stop offset="48%" stop-color="#ffd166"/>' +
          '<stop offset="100%" stop-color="#b87a0e"/>' +
        '</linearGradient>' +
        '<radialGradient id="top09-ruby" cx="35%" cy="30%" r="70%">' +
          '<stop offset="0%" stop-color="#ff99b8"/>' +
          '<stop offset="38%" stop-color="#e11d48"/>' +
          '<stop offset="100%" stop-color="#5c0318"/>' +
        '</radialGradient>',
      backSvg:
        '<g>' +
          '<path d="M236,324 C194,376 168,478 162,608 C206,626 254,630 300,624 C346,630 394,626 438,608 C432,478 406,376 364,324 Z" fill="url(#top09-cape)" stroke="#4a0314" stroke-width="1.4"/>' +
          '<path d="M168,602 C210,618 256,622 300,616 C344,622 390,618 432,602 L436,614 C392,630 346,634 300,628 C254,634 208,630 164,614 Z" fill="url(#top09-fur)" stroke="#cbd5e1" stroke-width="0.9"/>' +
        '</g>',
      svg:
        '<g>' +
          mirrorX(
            '<ellipse cx="220" cy="338" rx="31" ry="29" fill="url(#top09-velvet)" stroke="#5e051d" stroke-width="1.2"/>' +
            '<path d="M201,321 C212,312 230,314 240,325" fill="none" stroke="#ff85a3" stroke-width="2" opacity="0.5" stroke-linecap="round"/>' +
            '<path d="M195,358 Q220,367 244,358 C247,365 243,373 234,373 C224,376 214,376 204,373 C196,373 191,365 195,358 Z" fill="url(#top09-fur)" stroke="#cbd5e1" stroke-width="1"/>'
          ) +
          '<path d="M236,332 C250,321 271,318 284,318 L316,318 C329,318 350,321 364,332 C363,365 358,396 349,416 L342,434 L356,456 Q330,464 306,456 L300,442 L294,456 Q270,464 244,456 L258,434 L251,416 C242,396 237,365 236,332 Z" fill="url(#top09-velvet)" stroke="#5e051d" stroke-width="1.3"/>' +
          '<path d="M280,316 C272,326 266,336 276,342 C286,346 294,340 300,346 C306,340 314,346 324,342 C334,336 328,326 320,316 Q300,324 280,316 Z" fill="url(#top09-fur)" stroke="#cbd5e1" stroke-width="1"/>' +
          '<path d="M244,453 Q270,461 294,453 L296,462 Q270,470 241,461 Z" fill="url(#top09-fur)" stroke="#cbd5e1" stroke-width="0.9"/>' +
          '<path d="M356,453 Q330,461 306,453 L304,462 Q330,470 359,461 Z" fill="url(#top09-fur)" stroke="#cbd5e1" stroke-width="0.9"/>' +
          mirrorX(
            '<path d="M270,352 C278,366 276,386 286,400 C292,408 286,418 278,422" fill="none" stroke="url(#top09-gold)" stroke-width="1.8" stroke-linecap="round"/>' +
            '<path d="M276,374 C268,370 264,378 270,382" fill="none" stroke="url(#top09-gold)" stroke-width="1.4" stroke-linecap="round"/>' +
            '<circle cx="268" cy="356" r="2" fill="#ffd166"/>'
          ) +
          '<path d="M258,426 Q300,434 342,426 L343,438 Q300,446 257,438 Z" fill="url(#top09-gold)" stroke="#9e6308" stroke-width="1"/>' +
          gemCircle(300, 434, 4.8, 'top09-ruby', '#fff3b0') +
          gemCircle(276, 433, 2.8, 'top09-ruby', '#fff3b0') +
          gemCircle(324, 433, 2.8, 'top09-ruby', '#fff3b0') +
          '<polygon points="300,346 310,356 300,368 290,356" fill="url(#top09-gold)" stroke="#9e6308" stroke-width="0.9"/>' +
          gemCircle(300, 357, 5.2, 'top09-ruby', '#fff3b0') +
          star4(309, 349, 4.5, '#ffffff', 0.95) +
        '</g>'
    },

    /* ======================================================================
       10. Áo Ánh Trăng Ngân Hà
       ====================================================================== */
    {
      id: 'top-10',
      name: 'Áo Ánh Trăng Ngân Hà',
      icon: '🌙',
      accentColor: '#7c3aed',
      previewBox: '156 290 288 225',
      defs:
        '<linearGradient id="top10-galaxy" x1="0%" y1="0%" x2="100%" y2="15%">' +
          '<stop offset="0%" stop-color="#1e1b4b"/>' +
          '<stop offset="28%" stop-color="#5b21b6"/>' +
          '<stop offset="52%" stop-color="#a855f7"/>' +
          '<stop offset="76%" stop-color="#4c1d95"/>' +
          '<stop offset="100%" stop-color="#1e1b4b"/>' +
        '</linearGradient>' +
        '<linearGradient id="top10-veil" x1="50%" y1="0%" x2="50%" y2="100%">' +
          '<stop offset="0%" stop-color="#6d28d9" stop-opacity="0.72"/>' +
          '<stop offset="55%" stop-color="#312e81" stop-opacity="0.56"/>' +
          '<stop offset="100%" stop-color="#c084fc" stop-opacity="0.16"/>' +
        '</linearGradient>' +
        '<linearGradient id="top10-gold" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#fef9c3"/>' +
          '<stop offset="50%" stop-color="#fde047"/>' +
          '<stop offset="100%" stop-color="#d97706"/>' +
        '</linearGradient>' +
        '<linearGradient id="top10-tulle" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#e9d5ff" stop-opacity="0.95"/>' +
          '<stop offset="100%" stop-color="#6d28d9" stop-opacity="0.99"/>' +
        '</linearGradient>',
      backSvg:
        '<g>' +
          '<path d="M238,324 C198,378 172,480 166,620 C210,640 256,644 300,636 C344,644 390,640 434,620 C428,480 402,378 362,324 Z" fill="url(#top10-veil)" stroke="#c084fc" stroke-width="1.2"/>' +
          '<polyline points="200,450 222,482 194,520 218,554" fill="none" stroke="#fde047" stroke-width="0.9" opacity="0.65"/>' +
          '<polyline points="400,450 378,482 406,520 382,554" fill="none" stroke="#fde047" stroke-width="0.9" opacity="0.65"/>' +
          star4(200, 450, 4.5, '#fef08a', 0.9) +
          star4(222, 482, 5.5, '#ffffff', 0.9) +
          star4(194, 520, 4, '#fef08a', 0.9) +
          star4(400, 450, 4.5, '#fef08a', 0.9) +
          star4(378, 482, 5.5, '#ffffff', 0.9) +
          star4(406, 520, 4, '#fef08a', 0.9) +
        '</g>',
      svg:
        '<g>' +
          mirrorX(
            '<ellipse cx="220" cy="337" rx="32" ry="29" fill="url(#top10-tulle)" stroke="#7c3aed" stroke-width="1.1"/>' +
            '<path d="M201,321 C212,312 230,314 240,325" fill="none" stroke="#f5d0fe" stroke-width="2" opacity="0.78" stroke-linecap="round"/>' +
            star4(209, 334, 4.5, '#fef08a', 0.95) +
            star4(226, 348, 3.5, '#ffffff', 0.9) +
            '<path d="M195,358 Q220,367 243,358 L241,369 Q220,378 197,368 Z" fill="url(#top10-galaxy)" stroke="url(#top10-gold)" stroke-width="1.1"/>'
          ) +
          '<path d="M236,332 C254,322 276,319 300,322 C324,319 346,322 364,332 C363,365 358,396 349,416 L342,436 L354,458 Q326,466 300,454 Q274,466 246,458 L258,436 L251,416 C242,396 237,365 236,332 Z" fill="url(#top10-galaxy)" stroke="#3b0764" stroke-width="1.3"/>' +
          '<ellipse cx="300" cy="378" rx="34" ry="22" fill="#f472b6" opacity="0.18"/>' +
          '<path d="M280,318 Q300,342 320,318 L317,328 Q300,350 283,328 Z" fill="url(#top10-gold)" stroke="#b45309" stroke-width="0.9"/>' +
          '<path d="M244,332 Q300,352 356,332" fill="none" stroke="url(#top10-gold)" stroke-width="1.6"/>' +
          '<path d="M302,340 C294,341 290,350 295,357 C299,362 307,361 310,355 C304,358 298,354 299,348 C299,344 301,342 302,340 Z" fill="url(#top10-gold)" stroke="#b45309" stroke-width="0.7"/>' +
          star5(305, 349, 4.2, 1.8, '#ffffff', '#fbbf24', 0.5) +
          '<path d="M258,428 Q300,438 342,428 L343,439 Q300,449 257,439 Z" fill="url(#top10-gold)" stroke="#92400e" stroke-width="0.9"/>' +
          star4(274, 374, 5, '#fef08a', 0.95) +
          star4(326, 374, 5, '#fef08a', 0.95) +
          star4(288, 404, 4, '#ffffff', 0.9) +
          star4(312, 404, 4, '#ffffff', 0.9) +
          star5(264, 452, 4.5, 2, 'url(#top10-gold)', '#b45309', 0.5) +
          star5(336, 452, 4.5, 2, 'url(#top10-gold)', '#b45309', 0.5) +
        '</g>'
    },

    /* ======================================================================
       11. Áo Peplum Hoa Hồng Cổ Điển
       ====================================================================== */
    {
      id: 'top-11',
      name: 'Áo Peplum Hoa Hồng Cổ Điển',
      icon: '🌹',
      accentColor: '#e89499',
      previewBox: '168 295 264 205',
      defs:
        '<linearGradient id="top11-champ" x1="0%" y1="0%" x2="100%" y2="10%">' +
          '<stop offset="0%" stop-color="#d6b48c"/>' +
          '<stop offset="25%" stop-color="#ffebd6"/>' +
          '<stop offset="52%" stop-color="#fffaf2"/>' +
          '<stop offset="78%" stop-color="#f7dec2"/>' +
          '<stop offset="100%" stop-color="#cfa87c"/>' +
        '</linearGradient>' +
        '<linearGradient id="top11-rose" x1="0%" y1="0%" x2="100%" y2="20%">' +
          '<stop offset="0%" stop-color="#b54b58"/>' +
          '<stop offset="32%" stop-color="#f0929a"/>' +
          '<stop offset="56%" stop-color="#ffd9dc"/>' +
          '<stop offset="82%" stop-color="#e37c86"/>' +
          '<stop offset="100%" stop-color="#a8414e"/>' +
        '</linearGradient>' +
        '<radialGradient id="top11-cameo" cx="40%" cy="35%" r="65%">' +
          '<stop offset="0%" stop-color="#ffeef2"/>' +
          '<stop offset="55%" stop-color="#ff8fab"/>' +
          '<stop offset="100%" stop-color="#be185d"/>' +
        '</radialGradient>',
      backSvg:
        '<g>' +
          mirrorX(
            '<path d="M262,430 C242,450 228,486 226,526 L246,516 L254,532 C262,496 268,458 274,434 Z" fill="url(#top11-rose)" opacity="0.88" stroke="#a8414e" stroke-width="0.9"/>'
          ) +
        '</g>',
      svg:
        '<g>' +
          mirrorX(
            '<path d="M248,323 C222,310 190,322 191,348 C193,369 220,377 246,360 Z" fill="url(#top11-champ)" stroke="#c2956b" stroke-width="1.1"/>' +
            '<path d="M245,333 C221,331 198,344 195,365 C211,375 233,371 247,358 Z" fill="url(#top11-rose)" opacity="0.96" stroke="#a8414e" stroke-width="0.9"/>' +
            '<path d="M204,331 C215,323 230,325 240,333" fill="none" stroke="#ffffff" stroke-width="1.8" opacity="0.78" stroke-linecap="round"/>'
          ) +
          '<path d="M236,333 C251,322 273,319 286,324 Q300,338 314,324 C327,319 349,322 364,333 C362,365 357,396 349,415 L342,432 L258,432 L251,415 C243,396 238,365 236,333 Z" fill="url(#top11-champ)" stroke="#c2956b" stroke-width="1.2"/>' +
          '<path d="M242,344 C264,338 286,342 300,354 C314,342 336,338 358,344" fill="none" stroke="url(#top11-rose)" stroke-width="2.6"/>' +
          '<path d="M268,348 C272,378 274,404 276,430 M332,348 C328,378 326,404 324,430" fill="none" stroke="url(#top11-rose)" stroke-width="1.4" opacity="0.85"/>' +
          '<path d="M258,432 C244,446 234,458 234,464 Q268,472 300,464 Q332,472 366,464 C366,458 356,446 342,432 Z" fill="url(#top11-champ)" stroke="#c2956b" stroke-width="1.2"/>' +
          '<path d="M270,435 L258,464 M286,435 L280,464 M300,435 L300,464 M314,435 L320,464 M330,435 L342,464" fill="none" stroke="#d9b896" stroke-width="1.2" opacity="0.7"/>' +
          '<path d="M235,462 Q268,470 300,462 Q332,470 365,462" fill="none" stroke="url(#top11-rose)" stroke-width="2"/>' +
          '<path d="M258,424 Q300,431 342,424 L342,435 Q300,442 258,435 Z" fill="url(#top11-rose)" stroke="#a8414e" stroke-width="1"/>' +
          '<path d="M296,428 C278,416 274,434 286,438 C292,440 297,434 299,430 Z M304,428 C322,416 326,434 314,438 C308,440 303,434 301,430 Z" fill="url(#top11-rose)" stroke="#a8414e" stroke-width="0.9"/>' +
          '<circle cx="300" cy="430" r="6" fill="url(#top11-cameo)" stroke="#fff3d6" stroke-width="1"/>' +
          '<path d="M297,430 C298,427 302,427 303,430 C303,433 297,433 297,430 Z" fill="none" stroke="#ffffff" stroke-width="0.9"/>' +
          '<circle cx="256" cy="454" r="3.4" fill="url(#top11-cameo)"/>' +
          '<circle cx="344" cy="454" r="3.4" fill="url(#top11-cameo)"/>' +
          star4(300, 354, 4.5, '#f0929a', 0.9) +
        '</g>'
    },

    /* ======================================================================
       12. Áo Thiên Nga Trắng Lông Vũ
       ====================================================================== */
    {
      id: 'top-12',
      name: 'Áo Thiên Nga Trắng Lông Vũ',
      icon: '🦢',
      accentColor: '#7dd3fc',
      previewBox: '120 250 360 270',
      defs:
        '<linearGradient id="top12-swan" x1="0%" y1="0%" x2="100%" y2="10%">' +
          '<stop offset="0%" stop-color="#cbe2fa"/>' +
          '<stop offset="26%" stop-color="#f5faff"/>' +
          '<stop offset="52%" stop-color="#ffffff"/>' +
          '<stop offset="78%" stop-color="#ebf4ff"/>' +
          '<stop offset="100%" stop-color="#bdd8f7"/>' +
        '</linearGradient>' +
        '<linearGradient id="top12-plume" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="68%" stop-color="#e8f3ff"/>' +
          '<stop offset="100%" stop-color="#bad4f5"/>' +
        '</linearGradient>' +
        '<linearGradient id="top12-silver" x1="0%" y1="0%" x2="100%" y2="0%">' +
          '<stop offset="0%" stop-color="#93c5fd"/>' +
          '<stop offset="50%" stop-color="#ffffff"/>' +
          '<stop offset="100%" stop-color="#93c5fd"/>' +
        '</linearGradient>' +
        '<linearGradient id="top12-gold" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#fef9c3"/>' +
          '<stop offset="55%" stop-color="#fde047"/>' +
          '<stop offset="100%" stop-color="#ca8a04"/>' +
        '</linearGradient>',
      backSvg:
        '<g>' +
          mirrorX(
            '<path d="M276,348 C236,294 166,252 126,270 C114,284 128,314 156,330 C130,334 124,354 146,370 C134,378 138,396 164,404 C156,416 166,432 192,434 C224,436 258,410 274,382 Z" fill="url(#top12-plume)" stroke="#9ac2ed" stroke-width="1.2"/>' +
            '<path d="M262,354 C216,312 162,286 136,288" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.85" stroke-linecap="round"/>' +
            '<path d="M254,364 C214,344 176,336 146,344" fill="none" stroke="#bad4f5" stroke-width="1.3" opacity="0.8"/>' +
            '<path d="M254,376 C216,374 186,378 158,390" fill="none" stroke="#bad4f5" stroke-width="1.3" opacity="0.8"/>' +
            '<path d="M272,386 C236,410 184,442 178,476 C182,494 206,496 226,482 C248,466 266,434 274,406 Z" fill="url(#top12-plume)" opacity="0.92" stroke="#9ac2ed" stroke-width="1.1"/>' +
            star4(142, 276, 5, '#ffffff', 0.95)
          ) +
        '</g>',
      svg:
        '<g>' +
          '<path d="M236,340 C244,322 268,318 285,320 Q300,328 315,320 C332,318 356,322 364,340 L348,360 L252,360 Z" fill="#f0f8ff" opacity="0.95" stroke="#bfdbfe" stroke-width="0.9"/>' +
          mirrorX(
            '<path d="M248,323 C221,308 190,320 190,345 C194,360 209,366 224,359 C218,369 231,375 247,362 Z" fill="url(#top12-plume)" stroke="#9ac2ed" stroke-width="1.1"/>' +
            '<path d="M206,329 C217,320 232,322 240,333" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>'
          ) +
          '<path d="M238,340 C257,333 282,337 300,350 C318,337 343,333 362,340 C361,369 356,396 349,416 L342,436 L258,436 L251,416 C244,396 239,369 238,340 Z" fill="url(#top12-swan)" stroke="#9ac2ed" stroke-width="1.2"/>' +
          '<path d="M244,356 Q262,366 276,356 Q290,366 300,356 Q310,366 324,356 Q338,366 356,356" fill="none" stroke="#bdd8f7" stroke-width="1.3"/>' +
          '<path d="M250,376 Q268,386 284,376 Q300,388 316,376 Q332,386 350,376" fill="none" stroke="#bdd8f7" stroke-width="1.3"/>' +
          '<path d="M256,398 Q278,408 300,398 Q322,408 344,398" fill="none" stroke="#bdd8f7" stroke-width="1.2"/>' +
          '<path d="M258,426 Q300,434 342,426 L342,436 Q300,444 258,436 Z" fill="url(#top12-silver)" stroke="#93c5fd" stroke-width="0.9"/>' +
          '<path d="M258,434 C244,444 242,458 256,462 C268,465 278,454 284,448 C290,462 300,468 300,468 C300,468 310,462 316,448 C322,454 332,465 344,462 C358,458 356,444 342,434 Z" fill="url(#top12-plume)" stroke="#9ac2ed" stroke-width="1.1"/>' +
          '<path d="M266,440 C264,452 274,458 284,448 M334,440 C336,452 326,458 316,448" fill="none" stroke="#ffffff" stroke-width="1.6"/>' +
          '<path d="M291,347 L294,339 L298,344 L300,337 L302,344 L306,339 L309,347 Z" fill="url(#top12-gold)" stroke="#b45309" stroke-width="0.8"/>' +
          '<circle cx="300" cy="347" r="2.2" fill="#ffd1e6"/>' +
          star4(284, 336, 4.5, '#ffffff', 0.95) +
          star4(316, 336, 4.5, '#ffffff', 0.95) +
          star4(300, 431, 4.5, '#ffffff', 0.95) +
        '</g>'
    },

    /* ======================================================================
       13. Áo Corset Nhung Đỏ Hoàng Gia & Choàng Lông Trắng
       ====================================================================== */
    {
      id: 'top-13',
      name: 'Áo Corset Nhung Đỏ Hoàng Gia & Choàng Lông Trắng',
      icon: '👑',
      accentColor: '#e11d48',
      previewBox: '142 288 316 230',
      defs:
        '<linearGradient id="top13-velvet" x1="0%" y1="0%" x2="100%" y2="10%">' +
          '<stop offset="0%" stop-color="#4c0519"/>' +
          '<stop offset="24%" stop-color="#be123c"/>' +
          '<stop offset="48%" stop-color="#fb7185"/>' +
          '<stop offset="74%" stop-color="#9f1239"/>' +
          '<stop offset="100%" stop-color="#4c0519"/>' +
        '</linearGradient>' +
        '<linearGradient id="top13-cape" x1="50%" y1="0%" x2="50%" y2="100%">' +
          '<stop offset="0%" stop-color="#9f1239"/>' +
          '<stop offset="55%" stop-color="#6b0722"/>' +
          '<stop offset="100%" stop-color="#3b0210"/>' +
        '</linearGradient>' +
        '<linearGradient id="top13-lining" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#fff8dc"/>' +
          '<stop offset="55%" stop-color="#fde68a"/>' +
          '<stop offset="100%" stop-color="#d97706"/>' +
        '</linearGradient>' +
        '<linearGradient id="top13-fur" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="68%" stop-color="#f8fafc"/>' +
          '<stop offset="100%" stop-color="#cbd5e1"/>' +
        '</linearGradient>' +
        '<linearGradient id="top13-gold" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#fef9c3"/>' +
          '<stop offset="48%" stop-color="#fbbf24"/>' +
          '<stop offset="100%" stop-color="#b45309"/>' +
        '</linearGradient>' +
        '<radialGradient id="top13-ruby" cx="35%" cy="30%" r="70%">' +
          '<stop offset="0%" stop-color="#ffe4ec"/>' +
          '<stop offset="32%" stop-color="#f43f5e"/>' +
          '<stop offset="72%" stop-color="#be123c"/>' +
          '<stop offset="100%" stop-color="#4c0519"/>' +
        '</radialGradient>' +
        '<radialGradient id="top13-pearl" cx="34%" cy="30%" r="68%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="58%" stop-color="#fff1f2"/>' +
          '<stop offset="100%" stop-color="#d6c2c9"/>' +
        '</radialGradient>',
      backSvg:
        '<g>' +
          /* Majestic royal crimson coronation cape */
          '<path d="M234,326 C184,380 156,488 150,620 C200,638 252,642 300,635 C348,642 400,638 450,620 C444,488 416,380 366,326 Z" fill="url(#top13-cape)" stroke="#3b0210" stroke-width="1.4"/>' +
          mirrorX(
            '<path d="M236,330 C198,388 176,492 170,612 L188,615 C194,498 214,398 246,338 Z" fill="url(#top13-lining)" opacity="0.28"/>' +
            '<path d="M224,352 C202,414 190,502 186,598" fill="none" stroke="url(#top13-gold)" stroke-width="1.5" opacity="0.72"/>'
          ) +
          /* Plush scalloped ermine fur cape hem with royal flecks */
          '<path d="M154,606 Q178,596 202,608 Q228,618 254,608 Q278,598 300,608 Q322,598 346,608 Q372,618 398,608 Q422,596 446,606 L452,622 Q424,634 398,626 Q372,638 346,628 Q322,638 300,628 Q278,638 254,628 Q228,638 202,626 Q176,634 148,622 Z" fill="url(#top13-fur)" stroke="#cbd5e1" stroke-width="1"/>' +
          '<path d="M180,614 L182,621 M228,618 L230,625 M276,614 L278,621 M324,614 L322,621 M372,618 L370,625 M420,614 L418,621" stroke="#334155" stroke-width="2" stroke-linecap="round" opacity="0.7"/>' +
        '</g>',
      svg:
        '<g>' +
          /* Sculpted crimson velvet sweetheart corset covering full bust & waist cleanly */
          '<path d="M238,338 C256,329 280,333 300,346 C320,333 344,329 362,338 C362,368 357,396 349,415 L342,435 L356,456 Q328,466 300,468 Q272,466 244,456 L258,435 L251,415 C243,396 238,368 238,338 Z" fill="url(#top13-velvet)" stroke="#4c0519" stroke-width="1.3"/>' +
          /* 2.5D Velvet bust sheen & curved gold corset boning channels */
          '<path d="M248,348 C264,344 282,350 290,366 C278,376 258,374 246,360 Z" fill="#fda4af" opacity="0.34"/>' +
          '<path d="M352,348 C336,344 318,350 310,366 C322,376 342,374 354,360 Z" fill="#fda4af" opacity="0.22"/>' +
          mirrorX(
            '<path d="M266,345 C270,378 273,408 274,434" fill="none" stroke="url(#top13-gold)" stroke-width="1.6" opacity="0.9"/>' +
            '<path d="M284,352 C286,382 287,410 288,434" fill="none" stroke="url(#top13-gold)" stroke-width="1.4" opacity="0.85"/>' +
            '<path d="M276,348 C279,380 281,410 282,434" fill="none" stroke="#4c0519" stroke-width="1.2" opacity="0.5"/>'
          ) +
          /* Center gold corset cross-lacing over velvet panel */
          '<rect x="290" y="362" width="20" height="70" rx="4" fill="#4c0519" opacity="0.55"/>' +
          '<path d="M291,368 L309,380 L291,392 L309,404 L291,416 L309,428" fill="none" stroke="url(#top13-gold)" stroke-width="1.7" stroke-linecap="round"/>' +
          '<path d="M309,368 L291,380 L309,392 L291,404 L309,416 L291,428" fill="none" stroke="#fef08a" stroke-width="1.2" stroke-linecap="round"/>' +
          /* Crimson sleeves & cuffs peeking beneath plush white fur shoulder stole */
          mirrorX(
            '<ellipse cx="220" cy="343" rx="30" ry="26" fill="url(#top13-velvet)" stroke="#4c0519" stroke-width="1.1"/>' +
            '<path d="M196,358 Q220,368 244,358 L242,370 Q220,379 198,369 Z" fill="url(#top13-gold)" stroke="#92400e" stroke-width="0.9"/>'
          ) +
          /* Plush snowy white ermine fur collar & shoulder boa covering joints cleanly */
          '<path d="M280,317 Q300,326 320,317 C332,317 346,321 352,329 C334,335 316,337 300,342 C284,337 266,335 248,329 C254,321 268,317 280,317 Z" fill="url(#top13-fur)" stroke="#cbd5e1" stroke-width="1"/>' +
          mirrorX(
            '<path d="M254,320 C236,312 208,316 196,328 C186,338 188,356 202,363 C214,368 228,366 238,358 C248,352 254,340 256,328 Z" fill="url(#top13-fur)" stroke="#cbd5e1" stroke-width="1.1"/>' +
            '<circle cx="212" cy="336" r="14" fill="url(#top13-fur)" opacity="0.88"/>' +
            '<circle cx="234" cy="332" r="12" fill="url(#top13-fur)" opacity="0.92"/>' +
            '<path d="M206,326 C216,318 232,318 242,326" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round"/>' +
            /* Royal black ermine flecks */
            '<path d="M208,342 L207,348 M224,332 L223,338 M236,346 L235,352" stroke="#1e293b" stroke-width="2" stroke-linecap="round" opacity="0.72"/>' +
            '<circle cx="207" cy="349" r="1.2" fill="#1e293b" opacity="0.75"/>' +
            '<circle cx="223" cy="339" r="1.2" fill="#1e293b" opacity="0.75"/>' +
            '<circle cx="235" cy="353" r="1.2" fill="#1e293b" opacity="0.75"/>'
          ) +
          /* Scalloped white ermine fur peplum trim & gold filigree waist belt */
          '<path d="M244,452 Q272,462 300,464 Q328,462 356,452 L359,462 Q330,472 300,472 Q270,472 241,462 Z" fill="url(#top13-fur)" stroke="#cbd5e1" stroke-width="1"/>' +
          '<path d="M254,447 Q276,456 300,458 Q324,456 346,447" fill="none" stroke="url(#top13-gold)" stroke-width="1.6"/>' +
          '<path d="M258,426 Q300,435 342,426 L343,438 Q300,447 257,438 Z" fill="url(#top13-gold)" stroke="#92400e" stroke-width="1"/>' +
          /* Draped royal pearl swags & crowned ruby brooch */
          pearlChain(244, 336, 272, 356, 294, 354, 6, 2.2, 'top13-pearl', '#cbd5e1') +
          pearlChain(356, 336, 328, 356, 306, 354, 6, 2.2, 'top13-pearl', '#cbd5e1') +
          '<path d="M291,344 L294,335 L298,340 L300,332 L302,340 L306,335 L309,344 Z" fill="url(#top13-gold)" stroke="#92400e" stroke-width="0.8"/>' +
          gemCircle(300, 354, 6.2, 'top13-ruby', 'url(#top13-gold)') +
          gemCircle(300, 434, 4.6, 'top13-ruby', '#fef08a') +
          gemCircle(276, 433, 2.6, 'top13-ruby', '#fef08a') +
          gemCircle(324, 433, 2.6, 'top13-ruby', '#fef08a') +
          star4(312, 344, 5, '#ffffff', 0.95) +
          star4(286, 360, 4, '#fef08a', 0.9) +
        '</g>'
    },

    /* ======================================================================
       14. Áo Thủy Thủ Thần Tượng Ánh Sao Hồng Tím
       ====================================================================== */
    {
      id: 'top-14',
      name: 'Áo Thủy Thủ Thần Tượng Ánh Sao Hồng Tím',
      icon: '⭐',
      accentColor: '#ec4899',
      previewBox: '164 292 272 208',
      defs:
        '<linearGradient id="top14-blouse" x1="0%" y1="0%" x2="100%" y2="0%">' +
          '<stop offset="0%" stop-color="#f5d0fe"/>' +
          '<stop offset="25%" stop-color="#fff5fa"/>' +
          '<stop offset="52%" stop-color="#ffffff"/>' +
          '<stop offset="78%" stop-color="#fce7f3"/>' +
          '<stop offset="100%" stop-color="#e9d5ff"/>' +
        '</linearGradient>' +
        '<linearGradient id="top14-collar" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#f472b6"/>' +
          '<stop offset="50%" stop-color="#db2777"/>' +
          '<stop offset="100%" stop-color="#7e22ce"/>' +
        '</linearGradient>' +
        '<linearGradient id="top14-bow" x1="0%" y1="0%" x2="100%" y2="25%">' +
          '<stop offset="0%" stop-color="#a21caf"/>' +
          '<stop offset="30%" stop-color="#ec4899"/>' +
          '<stop offset="54%" stop-color="#fbcfe8"/>' +
          '<stop offset="80%" stop-color="#d946ef"/>' +
          '<stop offset="100%" stop-color="#701a75"/>' +
        '</linearGradient>' +
        '<linearGradient id="top14-skirt" x1="0%" y1="0%" x2="100%" y2="10%">' +
          '<stop offset="0%" stop-color="#9333ea"/>' +
          '<stop offset="32%" stop-color="#ec4899"/>' +
          '<stop offset="52%" stop-color="#f9a8d4"/>' +
          '<stop offset="74%" stop-color="#c026d3"/>' +
          '<stop offset="100%" stop-color="#6b21a8"/>' +
        '</linearGradient>' +
        '<linearGradient id="top14-gold" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#fef9c3"/>' +
          '<stop offset="50%" stop-color="#fde047"/>' +
          '<stop offset="100%" stop-color="#ca8a04"/>' +
        '</linearGradient>' +
        '<radialGradient id="top14-gem" cx="35%" cy="30%" r="70%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="35%" stop-color="#f9a8d4"/>' +
          '<stop offset="72%" stop-color="#d946ef"/>' +
          '<stop offset="100%" stop-color="#4a044e"/>' +
        '</radialGradient>',
      backSvg:
        '<g>' +
          '<path d="M276,318 Q300,310 324,318 L318,328 L282,328 Z" fill="url(#top14-collar)" stroke="#7e22ce" stroke-width="1"/>' +
          mirrorX(
            '<path d="M270,404 C248,430 234,464 228,494 L244,486 L252,498 C260,468 268,438 278,414 Z" fill="url(#top14-bow)" opacity="0.88" stroke="#86198f" stroke-width="0.9"/>' +
            star5(242, 476, 4.2, 1.9, 'url(#top14-gold)', '#a16207', 0.5)
          ) +
        '</g>',
      svg:
        '<g>' +
          /* Fluffy idol pink-lilac puff sleeves */
          mirrorX(
            '<ellipse cx="220" cy="338" rx="31" ry="29" fill="url(#top14-blouse)" stroke="#c084fc" stroke-width="1.2"/>' +
            '<path d="M198,323 C210,313 230,315 240,328" fill="none" stroke="#ffffff" stroke-width="2.4" opacity="0.9" stroke-linecap="round"/>' +
            star5(208, 338, 5, 2.2, 'url(#top14-collar)', '#ffffff', 0.7) +
            '<path d="M195,358 Q220,367 243,358 L241,370 Q220,379 197,369 Z" fill="url(#top14-collar)" stroke="#7e22ce" stroke-width="1"/>' +
            '<path d="M196,363 Q220,372 242,363" fill="none" stroke="#ffffff" stroke-width="1.5"/>' +
            '<path d="M197,367 Q220,376 241,367" fill="none" stroke="url(#top14-gold)" stroke-width="1.1"/>'
          ) +
          /* Fitted pink-lilac idol sailor blouse */
          '<path d="M236,331 C250,320 272,318 284,318 L316,318 C328,318 350,320 364,331 C363,365 358,395 350,415 L342,434 L258,434 L250,415 C242,395 237,365 236,331 Z" fill="url(#top14-blouse)" stroke="#c084fc" stroke-width="1.2"/>' +
          '<path d="M275,376 C277,396 279,414 281,428 M325,376 C323,396 321,414 319,428" fill="none" stroke="#e9d5ff" stroke-width="1.4" opacity="0.85"/>' +
          /* Magenta-violet idol sailor V-collar with sparkling double stripes */
          '<path d="M282,318 C263,318 243,324 236,336 C243,354 258,369 300,384 C342,369 357,354 364,336 C357,324 337,318 318,318 L315,326 L300,370 L285,326 Z" fill="url(#top14-collar)" stroke="#701a75" stroke-width="1.2"/>' +
          '<path d="M240,337 C248,352 263,365 300,379 C337,365 352,352 360,337" fill="none" stroke="#ffffff" stroke-width="1.7"/>' +
          '<path d="M245,334 C254,347 267,359 300,373 C333,359 346,347 355,334" fill="none" stroke="url(#top14-gold)" stroke-width="1.3"/>' +
          star5(254, 342, 5.4, 2.4, 'url(#top14-gold)', '#a16207', 0.6) +
          star5(346, 342, 5.4, 2.4, 'url(#top14-gold)', '#a16207', 0.6) +
          /* Pleated starlight idol peplum waistband */
          '<path d="M258,426 Q300,432 342,426 L343,437 Q300,443 257,437 Z" fill="url(#top14-collar)" stroke="#701a75" stroke-width="1"/>' +
          '<path d="M257,436 L248,454 Q274,461 300,456 Q326,461 352,454 L343,436 Z" fill="url(#top14-skirt)" stroke="#701a75" stroke-width="1.1"/>' +
          '<path d="M270,437 L264,455 M284,438 L282,456 M300,438 L300,456 M316,438 L318,456 M330,437 L336,455" fill="none" stroke="#701a75" stroke-width="1" opacity="0.45"/>' +
          '<path d="M250,450 Q275,457 300,452 Q325,457 350,450" fill="none" stroke="#ffffff" stroke-width="1.5"/>' +
          star5(300, 432, 5.5, 2.4, 'url(#top14-gold)', '#854d0e', 0.6) +
          /* Big layered 2.5D idol double bow + star jewel brooch */
          '<g>' +
            '<path d="M294,376 L276,424 L289,418 L298,428 L300,380 L302,428 L311,418 L324,424 L306,376 Z" fill="url(#top14-bow)" stroke="#701a75" stroke-width="1"/>' +
            '<path d="M296,368 C260,342 248,376 266,390 C277,397 292,387 297,376 Z" fill="url(#top14-bow)" stroke="#701a75" stroke-width="1.1"/>' +
            '<path d="M304,368 C340,342 352,376 334,390 C323,397 308,387 303,376 Z" fill="url(#top14-bow)" stroke="#701a75" stroke-width="1.1"/>' +
            '<path d="M295,368 C272,356 262,370 274,380 C282,384 292,378 296,373 Z" fill="#f9a8d4" opacity="0.55"/>' +
            '<path d="M305,368 C328,356 338,370 326,380 C318,384 308,378 304,373 Z" fill="#f9a8d4" opacity="0.55"/>' +
            '<rect x="292" y="362" width="16" height="15" rx="5" fill="url(#top14-bow)" stroke="#701a75" stroke-width="1"/>' +
            gemCircle(300, 369.5, 6.2, 'top14-gem', 'url(#top14-gold)') +
            star5(300, 369.5, 4.5, 2, '#fef08a', '#ffffff', 0.4) +
          '</g>' +
          glitterDots([
            [266, 368, 1.5, '#ffffff'], [334, 368, 1.5, '#ffffff'],
            [268, 444, 1.6, '#fef08a'], [332, 444, 1.6, '#fef08a']
          ], '#ffffff', 0.92) +
          star4(312, 358, 4.5, '#ffffff', 0.95) +
          star4(288, 358, 4, '#fef08a', 0.9) +
        '</g>'
    },

    /* ======================================================================
       15. Áo Kimono Hoa Anh Đào Cách Tân
       ====================================================================== */
    {
      id: 'top-15',
      name: 'Áo Kimono Hoa Anh Đào Cách Tân',
      icon: '🌸',
      accentColor: '#fb7185',
      previewBox: '148 286 304 232',
      defs:
        '<linearGradient id="top15-silk" x1="0%" y1="0%" x2="100%" y2="12%">' +
          '<stop offset="0%" stop-color="#e11d48"/>' +
          '<stop offset="22%" stop-color="#fb7185"/>' +
          '<stop offset="50%" stop-color="#ffe4ea"/>' +
          '<stop offset="78%" stop-color="#fda4af"/>' +
          '<stop offset="100%" stop-color="#be123c"/>' +
        '</linearGradient>' +
        '<linearGradient id="top15-inner" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="100%" stop-color="#fff1f2"/>' +
        '</linearGradient>' +
        '<linearGradient id="top15-obi" x1="0%" y1="0%" x2="100%" y2="10%">' +
          '<stop offset="0%" stop-color="#b45309"/>' +
          '<stop offset="28%" stop-color="#fbbf24"/>' +
          '<stop offset="52%" stop-color="#fef3c7"/>' +
          '<stop offset="76%" stop-color="#f59e0b"/>' +
          '<stop offset="100%" stop-color="#92400e"/>' +
        '</linearGradient>' +
        '<linearGradient id="top15-ribbon" x1="0%" y1="0%" x2="100%" y2="20%">' +
          '<stop offset="0%" stop-color="#9f1239"/>' +
          '<stop offset="50%" stop-color="#f43f5e"/>' +
          '<stop offset="100%" stop-color="#881337"/>' +
        '</linearGradient>' +
        '<linearGradient id="top15-gold" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#fef9c3"/>' +
          '<stop offset="50%" stop-color="#fbbf24"/>' +
          '<stop offset="100%" stop-color="#b45309"/>' +
        '</linearGradient>' +
        '<radialGradient id="top15-petal" cx="40%" cy="35%" r="65%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="55%" stop-color="#fbcfe8"/>' +
          '<stop offset="100%" stop-color="#f472b6"/>' +
        '</radialGradient>',
      backSvg:
        '<g>' +
          /* Billowing neo-kimono furisode wing-sleeves behind arms */
          mirrorX(
            '<path d="M244,332 C202,348 176,404 182,472 C196,488 228,486 244,458 C252,438 254,386 250,350 Z" fill="url(#top15-silk)" stroke="#be123c" stroke-width="1.2"/>' +
            '<path d="M188,464 C202,478 226,476 240,454" fill="none" stroke="url(#top15-gold)" stroke-width="1.6"/>' +
            '<path d="M192,438 Q210,428 226,440" fill="none" stroke="#fef08a" stroke-width="1.2" opacity="0.75"/>' +
            sakuraFlower(204, 412, 8, 'url(#top15-petal)', '#f43f5e', '#fde047') +
            sakuraFlower(224, 448, 6.5, '#ffffff', '#fb7185', '#fbbf24') +
            /* Sculpted back obi bow wings peeking gracefully at waist */
            '<path d="M262,396 C234,386 226,414 246,430 L264,424 Z" fill="url(#top15-obi)" stroke="#92400e" stroke-width="1"/>' +
            '<path d="M254,426 C244,454 236,486 234,512 L250,502 L258,516 C264,486 268,454 270,430 Z" fill="url(#top15-ribbon)" opacity="0.9" stroke="#881337" stroke-width="0.9"/>'
          ) +
        '</g>',
      svg:
        '<g>' +
          /* Crisp white inner juban collar & base kimono torso */
          '<path d="M236,332 C250,321 272,318 284,318 L316,318 C328,318 350,321 364,332 C363,365 358,396 349,416 L342,436 L258,436 L251,416 C242,396 237,365 236,332 Z" fill="url(#top15-silk)" stroke="#be123c" stroke-width="1.2"/>' +
          /* Traditional layered Y-shaped kimono neckline (left-over-right) */
          '<path d="M282,318 L300,362 L318,318 L311,318 L300,348 L289,318 Z" fill="url(#top15-inner)" stroke="#e2e8f0" stroke-width="0.8"/>' +
          '<path d="M320,318 C312,334 300,354 290,368 L302,374 C314,358 326,336 332,320 Z" fill="#fda4af" stroke="#be123c" stroke-width="1"/>' +
          '<path d="M280,318 C288,338 302,360 314,376 L300,382 C288,366 274,342 268,320 Z" fill="url(#top15-inner)" stroke="url(#top15-gold)" stroke-width="1.3"/>' +
          '<path d="M276,320 C284,340 298,360 310,376" fill="none" stroke="url(#top15-ribbon)" stroke-width="2.2"/>' +
          /* Sculpted neo-kimono shoulder caps covering shoulder joints cleanly */
          mirrorX(
            '<path d="M248,322 C220,312 192,324 192,350 C194,368 220,374 246,360 Z" fill="url(#top15-silk)" stroke="#be123c" stroke-width="1.2"/>' +
            '<path d="M202,326 C214,318 230,319 240,329" fill="none" stroke="#fff1f2" stroke-width="2" opacity="0.82" stroke-linecap="round"/>' +
            '<path d="M194,354 Q220,364 244,354 L242,365 Q220,374 196,365 Z" fill="url(#top15-obi)" stroke="#92400e" stroke-width="0.9"/>' +
            '<path d="M206,365 L206,378" stroke="url(#top15-ribbon)" stroke-width="2" stroke-linecap="round"/>' +
            '<circle cx="206" cy="366" r="2.5" fill="url(#top15-gold)"/>'
          ) +
          /* Delicate painted sakura branch & blossoms across bodice */
          '<path d="M248,392 Q268,374 288,366 M262,380 Q270,388 278,386" fill="none" stroke="#881337" stroke-width="1.5" stroke-linecap="round" opacity="0.72"/>' +
          sakuraFlower(262, 360, 7.5, 'url(#top15-petal)', '#e11d48', '#fde047') +
          sakuraFlower(276, 382, 6, '#ffffff', '#fb7185', '#fbbf24') +
          sakuraFlower(334, 358, 7, 'url(#top15-petal)', '#e11d48', '#fde047') +
          /* Ornate golden brocade Obi sash wrapping waist + crimson obijime cord */
          '<path d="M254,398 Q300,404 346,398 L343,435 Q300,441 257,435 Z" fill="url(#top15-obi)" stroke="#92400e" stroke-width="1.1"/>' +
          '<path d="M262,402 L274,434 M284,403 L292,435 M316,403 L308,435 M338,402 L326,434" fill="none" stroke="#fef3c7" stroke-width="1" opacity="0.65"/>' +
          '<path d="M255,416 Q300,422 345,416" fill="none" stroke="url(#top15-ribbon)" stroke-width="3.2"/>' +
          '<path d="M255,416 Q300,422 345,416" fill="none" stroke="#fde68a" stroke-width="0.9" stroke-dasharray="3,2"/>' +
          /* Layered sakura petal peplum hem */
          '<path d="M258,434 C246,444 242,456 254,461 C268,466 280,458 286,448 C292,462 300,466 300,466 C300,466 308,462 314,448 C320,458 332,466 346,461 C358,456 354,444 342,434 Z" fill="url(#top15-silk)" stroke="#be123c" stroke-width="1.1"/>' +
          '<path d="M266,436 C260,448 268,458 280,456 C290,454 295,446 300,442 C305,446 310,454 320,456 C332,458 340,448 334,436 Z" fill="url(#top15-inner)" opacity="0.92" stroke="#fda4af" stroke-width="0.9"/>' +
          /* Central sakura obidome jewel clasp */
          sakuraFlower(300, 417, 9, 'url(#top15-petal)', '#9f1239', '#fbbf24') +
          sakuraFlower(268, 446, 5.5, '#ffffff', '#fb7185', '#fde047') +
          sakuraFlower(332, 446, 5.5, '#ffffff', '#fb7185', '#fde047') +
          star4(300, 386, 4.5, '#ffffff', 0.95) +
          star4(284, 344, 3.8, '#fef08a', 0.9) +
        '</g>'
    },

    /* ======================================================================
       16. Áo Tiên Tử Ngọc Lục Bảo Cánh Chuồn
       ====================================================================== */
    {
      id: 'top-16',
      name: 'Áo Tiên Tử Ngọc Lục Bảo Cánh Chuồn',
      icon: '🧚‍♀️',
      accentColor: '#10b981',
      previewBox: '110 232 380 302',
      defs:
        '<linearGradient id="top16-wing-hi" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#a7f3d0" stop-opacity="0.82"/>' +
          '<stop offset="48%" stop-color="#67e8f9" stop-opacity="0.7"/>' +
          '<stop offset="100%" stop-color="#fef08a" stop-opacity="0.65"/>' +
        '</linearGradient>' +
        '<linearGradient id="top16-wing-lo" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#6ee7b7" stop-opacity="0.76"/>' +
          '<stop offset="55%" stop-color="#a5f3fc" stop-opacity="0.66"/>' +
          '<stop offset="100%" stop-color="#d9f99d" stop-opacity="0.62"/>' +
        '</linearGradient>' +
        '<linearGradient id="top16-emerald" x1="0%" y1="0%" x2="100%" y2="12%">' +
          '<stop offset="0%" stop-color="#064e3b"/>' +
          '<stop offset="26%" stop-color="#059669"/>' +
          '<stop offset="52%" stop-color="#6ee7b7"/>' +
          '<stop offset="78%" stop-color="#10b981"/>' +
          '<stop offset="100%" stop-color="#064e3b"/>' +
        '</linearGradient>' +
        '<linearGradient id="top16-leaf" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#d9f99d"/>' +
          '<stop offset="45%" stop-color="#34d399"/>' +
          '<stop offset="100%" stop-color="#047857"/>' +
        '</linearGradient>' +
        '<linearGradient id="top16-yoke" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#ecfdf5"/>' +
          '<stop offset="100%" stop-color="#a7f3d0"/>' +
        '</linearGradient>' +
        '<linearGradient id="top16-gold" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#fef9c3"/>' +
          '<stop offset="50%" stop-color="#fbbf24"/>' +
          '<stop offset="100%" stop-color="#b45309"/>' +
        '</linearGradient>' +
        '<radialGradient id="top16-gem" cx="35%" cy="30%" r="70%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="32%" stop-color="#6ee7b7"/>' +
          '<stop offset="72%" stop-color="#059669"/>' +
          '<stop offset="100%" stop-color="#022c22"/>' +
        '</radialGradient>',
      backSvg:
        '<g>' +
          /* Elongated gossamer veined 4-blade Dragonfly Fairy Wings */
          mirrorX(
            /* Upper dragonfly wing */
            '<path d="M276,348 C236,274 140,224 114,248 C102,262 128,312 184,342 C222,362 256,370 276,366 Z" fill="url(#top16-wing-hi)" stroke="url(#top16-gold)" stroke-width="1.4"/>' +
            '<path d="M266,352 C218,302 156,260 120,254" fill="none" stroke="#ffffff" stroke-width="1.2" opacity="0.8"/>' +
            '<path d="M254,356 C208,322 158,296 132,292" fill="none" stroke="#fef08a" stroke-width="0.9" opacity="0.72"/>' +
            '<path d="M244,360 C206,342 174,328 152,324" fill="none" stroke="#ffffff" stroke-width="0.8" opacity="0.65"/>' +
            '<path d="M174,274 L164,318 M206,298 L194,338 M234,322 L222,354" fill="none" stroke="#ecfdf5" stroke-width="0.8" opacity="0.55"/>' +
            '<ellipse cx="136" cy="264" rx="11" ry="4.5" transform="rotate(24 136 264)" fill="#fef08a" opacity="0.68"/>' +
            /* Lower dragonfly wing */
            '<path d="M274,370 C226,370 144,386 128,422 C120,444 166,462 214,440 C248,424 268,396 274,380 Z" fill="url(#top16-wing-lo)" stroke="url(#top16-gold)" stroke-width="1.3"/>' +
            '<path d="M262,376 C214,392 162,414 134,424" fill="none" stroke="#ffffff" stroke-width="1.1" opacity="0.75"/>' +
            '<path d="M254,382 C214,412 180,432 162,440" fill="none" stroke="#fef08a" stroke-width="0.85" opacity="0.65"/>' +
            '<ellipse cx="152" cy="422" rx="9" ry="4" transform="rotate(-16 152 422)" fill="#ffffff" opacity="0.52"/>' +
            star4(126, 256, 6, '#ffffff', 0.95) +
            star4(142, 434, 5, '#fef08a', 0.9)
          ) +
        '</g>',
      svg:
        '<g>' +
          /* Opaque dew-emerald silk upper yoke covering collarbone cleanly */
          '<path d="M236,342 C242,324 268,319 285,320 Q300,328 315,320 C332,319 358,324 364,342 L348,366 L252,366 Z" fill="url(#top16-yoke)" stroke="#6ee7b7" stroke-width="0.9"/>' +
          '<path d="M282,319 Q300,328 318,319" fill="none" stroke="url(#top16-gold)" stroke-width="2.2"/>' +
          /* Sculpted overlapping fairy leaf-petal shoulder sleeves covering arm joints cleanly */
          mirrorX(
            '<path d="M248,322 C222,308 190,320 192,344 C196,360 222,368 246,356 Z" fill="url(#top16-leaf)" stroke="#047857" stroke-width="1.1"/>' +
            '<path d="M244,335 C218,334 194,348 198,366 C212,376 234,372 248,358 Z" fill="url(#top16-emerald)" stroke="url(#top16-gold)" stroke-width="1"/>' +
            '<path d="M204,330 C216,322 230,324 239,334" fill="none" stroke="#ecfdf5" stroke-width="1.6" opacity="0.82" stroke-linecap="round"/>' +
            '<circle cx="204" cy="368" r="2.6" fill="#fef08a" stroke="#b45309" stroke-width="0.6"/>'
          ) +
          /* Emerald jewel corset bodice sculpted like interlocking forest leaves */
          '<path d="M238,342 C258,334 282,338 300,352 C318,338 342,334 362,342 C360,372 355,398 348,416 L342,436 L258,436 L252,416 C245,398 240,372 238,342 Z" fill="url(#top16-emerald)" stroke="#064e3b" stroke-width="1.3"/>' +
          mirrorX(
            '<path d="M243,345 C266,342 290,355 298,382 C280,390 256,384 245,364 Z" fill="url(#top16-leaf)" opacity="0.88" stroke="#047857" stroke-width="0.9"/>' +
            '<path d="M254,352 C268,358 280,368 288,378" fill="none" stroke="#fef08a" stroke-width="1.1" opacity="0.8"/>' +
            '<path d="M266,388 C274,402 276,418 274,432" fill="none" stroke="url(#top16-gold)" stroke-width="1.3" opacity="0.85"/>'
          ) +
          /* Golden botanical waist vine & multi-pointed leaf-petal peplum */
          '<path d="M258,432 C244,442 242,456 254,462 C266,466 276,456 282,446 C288,460 300,468 300,468 C300,468 312,460 318,446 C324,456 334,466 346,462 C358,456 356,442 342,432 Z" fill="url(#top16-leaf)" stroke="#047857" stroke-width="1.1"/>' +
          '<path d="M266,434 C260,446 268,456 278,454 C288,452 294,442 300,438 C306,442 312,452 322,454 C332,456 340,446 334,434 Z" fill="url(#top16-emerald)" stroke="url(#top16-gold)" stroke-width="1"/>' +
          '<path d="M258,426 Q300,435 342,426 L342,436 Q300,445 258,436 Z" fill="url(#top16-gold)" stroke="#92400e" stroke-width="0.9"/>' +
          /* Central emerald jewel & golden fairy wings clasp */
          '<path d="M286,354 C290,348 296,350 300,356 C304,350 310,348 314,354 C310,360 304,362 300,358 C296,362 290,360 286,354 Z" fill="url(#top16-gold)" stroke="#92400e" stroke-width="0.7"/>' +
          gemCircle(300, 356, 5.5, 'top16-gem', 'url(#top16-gold)') +
          gemCircle(300, 434, 4.2, 'top16-gem', '#fef08a') +
          star4(286, 344, 4.5, '#ffffff', 0.95) +
          star4(314, 344, 4.5, '#ffffff', 0.95) +
          star4(300, 404, 4.2, '#fef08a', 0.9) +
        '</g>'
    },

    /* ======================================================================
       17. Áo Blazer Học Viện Hoàng Gia Phối Nơ
       ====================================================================== */
    {
      id: 'top-17',
      name: 'Áo Blazer Học Viện Hoàng Gia Phối Nơ',
      icon: '🎓',
      accentColor: '#3b82f6',
      previewBox: '162 292 276 212',
      defs:
        '<linearGradient id="top17-navy" x1="0%" y1="0%" x2="100%" y2="12%">' +
          '<stop offset="0%" stop-color="#172554"/>' +
          '<stop offset="26%" stop-color="#2563eb"/>' +
          '<stop offset="50%" stop-color="#60a5fa"/>' +
          '<stop offset="76%" stop-color="#1d4ed8"/>' +
          '<stop offset="100%" stop-color="#1e3a8a"/>' +
        '</linearGradient>' +
        '<linearGradient id="top17-shirt" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="100%" stop-color="#eff6ff"/>' +
        '</linearGradient>' +
        '<linearGradient id="top17-ribbon" x1="0%" y1="0%" x2="100%" y2="25%">' +
          '<stop offset="0%" stop-color="#1d4ed8"/>' +
          '<stop offset="35%" stop-color="#38bdf8"/>' +
          '<stop offset="55%" stop-color="#bae6fd"/>' +
          '<stop offset="85%" stop-color="#2563eb"/>' +
          '<stop offset="100%" stop-color="#1e3a8a"/>' +
        '</linearGradient>' +
        '<linearGradient id="top17-gold" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#fef9c3"/>' +
          '<stop offset="50%" stop-color="#fbbf24"/>' +
          '<stop offset="100%" stop-color="#b45309"/>' +
        '</linearGradient>' +
        '<radialGradient id="top17-gem" cx="35%" cy="30%" r="70%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="34%" stop-color="#93c5fd"/>' +
          '<stop offset="72%" stop-color="#2563eb"/>' +
          '<stop offset="100%" stop-color="#172554"/>' +
        '</radialGradient>',
      backSvg:
        '<g>' +
          '<path d="M276,318 Q300,312 324,318 L318,328 L282,328 Z" fill="url(#top17-navy)" stroke="#172554" stroke-width="1"/>' +
          mirrorX(
            '<path d="M256,432 L242,462 L262,464 L270,438 Z" fill="#1e3a8a" opacity="0.88" stroke="#172554" stroke-width="0.9"/>'
          ) +
        '</g>',
      svg:
        '<g>' +
          /* Crisp ivory academy shirt underneath */
          '<path d="M242,326 C256,319 276,318 285,318 L315,318 C324,318 344,319 358,326 L350,438 L250,438 Z" fill="url(#top17-shirt)" stroke="#cbd5e1" stroke-width="1"/>' +
          '<path d="M282,318 L272,338 L296,334 L300,324 L304,334 L328,338 L318,318 Q300,324 282,318 Z" fill="#ffffff" stroke="#93c5fd" stroke-width="0.9"/>' +
          /* Tailored royal navy puff-shoulder sleeves */
          mirrorX(
            '<ellipse cx="220" cy="339" rx="31" ry="29" fill="url(#top17-navy)" stroke="#172554" stroke-width="1.2"/>' +
            '<path d="M200,323 C211,314 230,316 240,328" fill="none" stroke="#93c5fd" stroke-width="2" opacity="0.65" stroke-linecap="round"/>' +
            '<path d="M195,358 Q220,367 243,358 L241,370 Q220,379 197,369 Z" fill="url(#top17-shirt)" stroke="#1e3a8a" stroke-width="1"/>' +
            '<path d="M196,363 Q220,372 242,363" fill="none" stroke="url(#top17-gold)" stroke-width="1.5"/>' +
            '<circle cx="206" cy="364" r="1.8" fill="url(#top17-gold)"/>'
          ) +
          /* Tailored double-breasted royal academy blazer */
          '<path d="M236,331 C250,321 270,318 282,319 L300,372 L318,319 C330,318 350,321 364,331 C363,364 358,395 349,415 L342,434 L356,458 Q328,466 300,456 Q272,466 244,458 L258,434 L251,415 C242,395 237,364 236,331 Z" fill="url(#top17-navy)" stroke="#172554" stroke-width="1.3"/>' +
          /* Gold-piped notched lapels & structured princess darts */
          mirrorX(
            '<polygon points="282,319 262,334 274,352 268,360 296,374" fill="#1d4ed8" stroke="url(#top17-gold)" stroke-width="1.1"/>' +
            '<path d="M266,368 C270,390 272,412 273,432" fill="none" stroke="#172554" stroke-width="1.3" opacity="0.5"/>' +
            '<path d="M258,412 L278,412 L277,418 L259,418 Z" fill="#1e3a8a" stroke="url(#top17-gold)" stroke-width="0.8"/>'
          ) +
          /* Gold piped blazer hem & center placket */
          '<path d="M300,372 L300,456" fill="none" stroke="#172554" stroke-width="1.4" opacity="0.65"/>' +
          '<path d="M246,454 Q273,462 300,453 Q327,462 354,454" fill="none" stroke="url(#top17-gold)" stroke-width="2"/>' +
          '<path d="M249,450 Q274,457 300,449 Q326,457 351,450" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.85"/>' +
          /* Double-breasted heraldic gold buttons */
          '<circle cx="284" cy="388" r="3.4" fill="url(#top17-gold)" stroke="#92400e" stroke-width="0.7"/>' +
          '<circle cx="316" cy="388" r="3.4" fill="url(#top17-gold)" stroke="#92400e" stroke-width="0.7"/>' +
          '<circle cx="284" cy="410" r="3.4" fill="url(#top17-gold)" stroke="#92400e" stroke-width="0.7"/>' +
          '<circle cx="316" cy="410" r="3.4" fill="url(#top17-gold)" stroke="#92400e" stroke-width="0.7"/>' +
          /* Royal Academy embroidered crest shield on left chest */
          '<path d="M322,368 L338,368 L338,380 C338,386 330,390 330,390 C330,390 322,386 322,380 Z" fill="#172554" stroke="url(#top17-gold)" stroke-width="1.1"/>' +
          '<path d="M325,365 L327,361 L330,364 L333,361 L335,365 Z" fill="url(#top17-gold)"/>' +
          star4(330, 378, 3.8, '#fef08a', 0.95) +
          /* Royal Academy striped ribbon bow with sapphire brooch */
          '<g>' +
            '<path d="M294,348 L280,388 L291,383 L298,391 L300,352 L302,391 L309,383 L320,388 L306,348 Z" fill="url(#top17-ribbon)" stroke="#1e3a8a" stroke-width="0.9"/>' +
            '<path d="M296,342 C268,324 260,348 273,360 C282,366 293,358 297,349 Z" fill="url(#top17-ribbon)" stroke="#1e3a8a" stroke-width="1"/>' +
            '<path d="M304,342 C332,324 340,348 327,360 C318,366 307,358 303,349 Z" fill="url(#top17-ribbon)" stroke="#1e3a8a" stroke-width="1"/>' +
            '<path d="M270,344 L292,350 M330,344 L308,350" fill="none" stroke="url(#top17-gold)" stroke-width="1.3" opacity="0.9"/>' +
            '<rect x="293" y="338" width="14" height="13" rx="4" fill="url(#top17-ribbon)" stroke="#1e3a8a" stroke-width="0.9"/>' +
            gemCircle(300, 344.5, 4.4, 'top17-gem', 'url(#top17-gold)') +
          '</g>' +
          star4(309, 336, 4, '#ffffff', 0.95) +
        '</g>'
    },

    /* ======================================================================
       18. Áo Kẹo Bông Macaron Tay Bồng
       ====================================================================== */
    {
      id: 'top-18',
      name: 'Áo Kẹo Bông Macaron Tay Bồng',
      icon: '🍭',
      accentColor: '#f472b6',
      previewBox: '160 288 280 216',
      defs:
        '<linearGradient id="top18-pink" x1="0%" y1="0%" x2="100%" y2="10%">' +
          '<stop offset="0%" stop-color="#f472b6"/>' +
          '<stop offset="28%" stop-color="#fbcfe8"/>' +
          '<stop offset="52%" stop-color="#fff5fa"/>' +
          '<stop offset="78%" stop-color="#f9a8d4"/>' +
          '<stop offset="100%" stop-color="#ec4899"/>' +
        '</linearGradient>' +
        '<linearGradient id="top18-mint" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#ecfdf5"/>' +
          '<stop offset="50%" stop-color="#a7f3d0"/>' +
          '<stop offset="100%" stop-color="#34d399"/>' +
        '</linearGradient>' +
        '<linearGradient id="top18-lav" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#f5f3ff"/>' +
          '<stop offset="50%" stop-color="#ddd6fe"/>' +
          '<stop offset="100%" stop-color="#a78bfa"/>' +
        '</linearGradient>' +
        '<linearGradient id="top18-lemon" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#fefce8"/>' +
          '<stop offset="100%" stop-color="#fde047"/>' +
        '</linearGradient>' +
        '<linearGradient id="top18-white" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="100%" stop-color="#ffeef6"/>' +
        '</linearGradient>' +
        '<radialGradient id="top18-candy" cx="35%" cy="30%" r="70%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="35%" stop-color="#f9a8d4"/>' +
          '<stop offset="75%" stop-color="#ec4899"/>' +
          '<stop offset="100%" stop-color="#9d174d"/>' +
        '</radialGradient>',
      backSvg:
        '<g>' +
          mirrorX(
            '<path d="M262,430 C240,450 230,478 228,502 L245,494 L254,506 C262,480 268,454 274,434 Z" fill="url(#top18-mint)" opacity="0.9" stroke="#10b981" stroke-width="0.9"/>'
          ) +
        '</g>',
      svg:
        '<g>' +
          /* Extra-fluffy 2-tier cloud macaron puff sleeves */
          mirrorX(
            '<ellipse cx="218" cy="343" rx="32" ry="26" fill="url(#top18-lav)" stroke="#a78bfa" stroke-width="1.1"/>' +
            '<ellipse cx="222" cy="331" rx="28" ry="23" fill="url(#top18-pink)" stroke="#ec4899" stroke-width="1.1"/>' +
            '<path d="M202,320 C213,311 231,313 240,324" fill="none" stroke="#ffffff" stroke-width="2.4" opacity="0.9" stroke-linecap="round"/>' +
            '<path d="M194,358 Q220,368 244,358 L241,371 Q220,380 197,369 Z" fill="url(#top18-white)" stroke="#f472b6" stroke-width="0.9"/>' +
            scallopTrim(197, 369, 241, 371, 6, 4.5, '#ffffff', '#f9a8d4', 0.8) +
            '<path d="M206,365 C199,360 199,370 206,367 Z M206,365 C213,360 213,370 206,367 Z" fill="url(#top18-mint)" stroke="#10b981" stroke-width="0.7"/>'
          ) +
          /* Sweet pastel macaron-striped bodice */
          '<path d="M237,333 C252,321 274,319 286,320 Q300,332 314,320 C326,319 348,321 363,333 C362,366 357,396 349,416 L342,436 L258,436 L251,416 C243,396 238,366 237,333 Z" fill="url(#top18-pink)" stroke="#db2777" stroke-width="1.2"/>' +
          /* Pastel pistachio & lavender macaron panel stripes */
          '<path d="M262,334 L276,336 L278,432 L264,432 Z" fill="url(#top18-mint)" opacity="0.78"/>' +
          '<path d="M338,334 L324,336 L322,432 L336,432 Z" fill="url(#top18-lav)" opacity="0.78"/>' +
          '<path d="M286,334 L314,334 L312,432 L288,432 Z" fill="url(#top18-white)" opacity="0.88"/>' +
          /* Whipped-cream frosting collar */
          '<path d="M280,318 C270,328 264,344 282,344 C292,344 298,334 300,328 C302,334 308,344 318,344 C336,344 330,328 320,318 Q300,326 280,318 Z" fill="url(#top18-white)" stroke="#f472b6" stroke-width="1"/>' +
          /* Double-tiered lemon & strawberry-cream ruffled macaron peplum */
          '<path d="M256,436 C244,445 240,456 244,461 Q300,470 356,461 C360,456 356,445 344,436 Z" fill="url(#top18-lemon)" stroke="#eab308" stroke-width="0.9"/>' +
          scallopTrim(244, 459, 356, 459, 11, 5.5, 'url(#top18-lemon)', '#eab308', 0.85) +
          '<path d="M258,432 C249,440 247,448 250,452 Q300,460 350,452 C353,448 351,440 342,432 Z" fill="url(#top18-mint)" stroke="#10b981" stroke-width="0.9"/>' +
          scallopTrim(250, 450, 350, 450, 10, 4.5, 'url(#top18-mint)', '#10b981', 0.8) +
          /* Pink candy belt & lollipop-macaron chest brooch */
          '<path d="M258,426 Q300,433 342,426 L342,437 Q300,444 258,437 Z" fill="#ec4899" stroke="#be185d" stroke-width="0.9"/>' +
          '<path d="M295,431 C276,419 272,437 285,441 C292,443 297,437 299,433 Z M305,431 C324,419 328,437 315,441 C308,443 303,437 301,433 Z" fill="#f472b6" stroke="#be185d" stroke-width="0.9"/>' +
          '<circle cx="300" cy="433" r="4.2" fill="url(#top18-lemon)" stroke="#eab308" stroke-width="0.8"/>' +
          /* Swirly candy lollipop chest badge */
          '<circle cx="300" cy="354" r="9.5" fill="url(#top18-candy)" stroke="#ffffff" stroke-width="1.3"/>' +
          '<path d="M300,348 C304,348 306,353 303,356 C300,359 295,357 295,353 C295,349 299,346 303,347" fill="none" stroke="#ffffff" stroke-width="1.4" stroke-linecap="round"/>' +
          /* Rainbow sugar sprinkles across sleeves & bodice */
          glitterDots([
            [212, 329, 1.7, '#fde047'], [228, 336, 1.7, '#6ee7b7'], [216, 348, 1.6, '#ffffff'],
            [388, 329, 1.7, '#fde047'], [372, 336, 1.7, '#6ee7b7'], [384, 348, 1.6, '#ffffff'],
            [268, 376, 1.8, '#fde047'], [271, 398, 1.8, '#f472b6'], [332, 376, 1.8, '#fde047'],
            [329, 398, 1.8, '#34d399'], [295, 386, 1.6, '#a78bfa'], [305, 404, 1.6, '#34d399']
          ], '#ffffff', 0.92) +
          star4(288, 343, 4.2, '#ffffff', 0.95) +
          star4(312, 343, 4.2, '#ffffff', 0.95) +
        '</g>'
    },

    /* ======================================================================
       19. Áo Nữ Hoàng Tuyết Áo Choàng Pha Lê
       ====================================================================== */
    {
      id: 'top-19',
      name: 'Áo Nữ Hoàng Tuyết Áo Choàng Pha Lê',
      icon: '❄️',
      accentColor: '#06b6d4',
      previewBox: '134 270 332 258',
      defs:
        '<linearGradient id="top19-cyan" x1="0%" y1="0%" x2="100%" y2="12%">' +
          '<stop offset="0%" stop-color="#155e75"/>' +
          '<stop offset="25%" stop-color="#06b6d4"/>' +
          '<stop offset="50%" stop-color="#a5f3fc"/>' +
          '<stop offset="76%" stop-color="#0891b2"/>' +
          '<stop offset="100%" stop-color="#164e63"/>' +
        '</linearGradient>' +
        '<linearGradient id="top19-frost" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="55%" stop-color="#ecfeff"/>' +
          '<stop offset="100%" stop-color="#a5f3fc"/>' +
        '</linearGradient>' +
        '<linearGradient id="top19-aurora" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#cffafe" stop-opacity="0.78"/>' +
          '<stop offset="45%" stop-color="#22d3ee" stop-opacity="0.58"/>' +
          '<stop offset="78%" stop-color="#818cf8" stop-opacity="0.46"/>' +
          '<stop offset="100%" stop-color="#e0f2fe" stop-opacity="0.22"/>' +
        '</linearGradient>' +
        '<linearGradient id="top19-collar" x1="50%" y1="0%" x2="50%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="45%" stop-color="#67e8f9"/>' +
          '<stop offset="100%" stop-color="#0e7490"/>' +
        '</linearGradient>' +
        '<linearGradient id="top19-silver" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="50%" stop-color="#bae6fd"/>' +
          '<stop offset="100%" stop-color="#64748b"/>' +
        '</linearGradient>' +
        '<radialGradient id="top19-gem" cx="35%" cy="30%" r="70%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="35%" stop-color="#67e8f9"/>' +
          '<stop offset="75%" stop-color="#06b6d4"/>' +
          '<stop offset="100%" stop-color="#083344"/>' +
        '</radialGradient>',
      backSvg:
        '<g>' +
          /* Majestic sweeping glacier-aurora crystal cloak */
          '<path d="M226,326 C170,382 138,490 132,632 C194,654 252,658 300,646 C348,658 406,654 468,632 C462,490 430,382 374,326 Z" fill="url(#top19-aurora)" stroke="#a5f3fc" stroke-width="1.3"/>' +
          '<path d="M236,336 C194,394 166,498 158,622" fill="none" stroke="#ffffff" stroke-width="1.8" opacity="0.62"/>' +
          '<path d="M364,336 C406,394 434,498 442,622" fill="none" stroke="#ffffff" stroke-width="1.8" opacity="0.62"/>' +
          /* Regal stand-up crystalline Snow Queen collar rising behind neck */
          '<path d="M268,326 C246,298 248,274 266,268 C278,278 286,294 300,296 C314,294 322,278 334,268 C352,274 354,298 332,326 Z" fill="url(#top19-collar)" stroke="#ffffff" stroke-width="1.2"/>' +
          '<polygon points="266,270 280,296 270,318 258,292" fill="#ffffff" opacity="0.34"/>' +
          '<polygon points="334,270 320,296 330,318 342,292" fill="#ffffff" opacity="0.24"/>' +
          snowflake(186, 470, 14, '#ffffff', 0.84) +
          snowflake(414, 470, 14, '#ffffff', 0.84) +
          snowflake(208, 574, 17, '#cffafe', 0.76) +
          snowflake(392, 574, 17, '#cffafe', 0.76) +
          star4(170, 524, 6, '#ffffff', 0.9) +
          star4(430, 524, 6, '#ffffff', 0.9) +
        '</g>',
      svg:
        '<g>' +
          /* Frosted high-neck Snow Queen bodice covering torso & collarbone cleanly */
          '<path d="M238,340 C246,324 270,318 286,318 L314,318 C330,318 354,324 362,340 C361,370 356,396 349,416 L342,435 L258,435 L251,416 C244,396 239,370 238,340 Z" fill="url(#top19-cyan)" stroke="#0e7490" stroke-width="1.3"/>' +
          /* Frosted platinum-ice sweetheart overlay & geometric aurora prism facets */
          '<path d="M242,338 C252,324 272,319 286,319 L314,319 C328,319 348,324 358,338 L346,356 C328,342 312,344 300,356 C288,344 272,342 254,356 Z" fill="url(#top19-frost)" stroke="#67e8f9" stroke-width="1"/>' +
          '<path d="M282,319 Q300,328 318,319" fill="none" stroke="url(#top19-silver)" stroke-width="2.2"/>' +
          '<polygon points="244,358 282,356 286,400 250,398" fill="#ffffff" opacity="0.2"/>' +
          '<polygon points="356,358 318,356 314,400 350,398" fill="#083344" opacity="0.16"/>' +
          mirrorX(
            '<path d="M274,354 L284,386 L278,426" fill="none" stroke="url(#top19-silver)" stroke-width="1.5" opacity="0.9"/>' +
            '<path d="M256,368 L272,382 L262,408" fill="none" stroke="#cffafe" stroke-width="1" opacity="0.75"/>'
          ) +
          /* Sculpted crystal ice pauldron sleeves covering shoulders cleanly */
          mirrorX(
            '<path d="M248,322 C222,310 190,322 190,348 C192,364 218,370 246,358 Z" fill="url(#top19-frost)" stroke="#0891b2" stroke-width="1.1"/>' +
            '<path d="M244,334 C220,332 194,344 194,362 C208,372 232,370 247,358 Z" fill="url(#top19-cyan)" stroke="#ffffff" stroke-width="0.9"/>' +
            '<polygon points="200,362 204,376 208,364" fill="#cffafe" stroke="#ffffff" stroke-width="0.6"/>' +
            '<polygon points="218,365 222,380 226,366" fill="#cffafe" stroke="#ffffff" stroke-width="0.6"/>' +
            '<path d="M204,328 C216,320 230,322 240,332" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round"/>'
          ) +
          /* Pointed crystalline icicle peplum & silver crystal belt */
          '<path d="M258,426 Q300,434 342,426 L342,436 Q300,444 258,436 Z" fill="url(#top19-silver)" stroke="#0891b2" stroke-width="0.9"/>' +
          '<path d="M258,435 L252,458 L270,444 L282,464 L294,446 L300,468 L306,446 L318,464 L330,444 L348,458 L342,435 Z" fill="url(#top19-frost)" stroke="#0891b2" stroke-width="1"/>' +
          '<polygon points="300,444 295,457 300,467 305,457" fill="url(#top19-gem)" stroke="#ffffff" stroke-width="0.6"/>' +
          /* Hexagonal glacier diamond chest brooch */
          '<polygon points="300,344 310,350 310,362 300,368 290,362 290,350" fill="url(#top19-silver)" stroke="#0e7490" stroke-width="0.8"/>' +
          gemCircle(300, 356, 5.2, 'top19-gem', '#ffffff') +
          snowflake(300, 404, 8, '#ecfeff', 0.9) +
          star4(284, 340, 4.5, '#ffffff', 0.95) +
          star4(316, 340, 4.5, '#ffffff', 0.95) +
          star4(300, 431, 4.5, '#ffffff', 0.95) +
        '</g>'
    },

    /* ======================================================================
       20. Áo Dạ Hội Vàng Champagne Nơ Tulle
       ====================================================================== */
    {
      id: 'top-20',
      name: 'Áo Dạ Hội Vàng Champagne Nơ Tulle',
      icon: '✨',
      accentColor: '#eab308',
      previewBox: '148 284 304 228',
      defs:
        '<linearGradient id="top20-champ" x1="0%" y1="0%" x2="100%" y2="10%">' +
          '<stop offset="0%" stop-color="#b45309"/>' +
          '<stop offset="24%" stop-color="#f59e0b"/>' +
          '<stop offset="50%" stop-color="#fef9c3"/>' +
          '<stop offset="76%" stop-color="#fbbf24"/>' +
          '<stop offset="100%" stop-color="#92400e"/>' +
        '</linearGradient>' +
        '<linearGradient id="top20-tulle" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#fffbeb" stop-opacity="0.88"/>' +
          '<stop offset="52%" stop-color="#fde68a" stop-opacity="0.72"/>' +
          '<stop offset="100%" stop-color="#f59e0b" stop-opacity="0.45"/>' +
        '</linearGradient>' +
        '<linearGradient id="top20-gold" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="45%" stop-color="#fde047"/>' +
          '<stop offset="100%" stop-color="#b45309"/>' +
        '</linearGradient>' +
        '<linearGradient id="top20-cream" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#fffef5"/>' +
          '<stop offset="100%" stop-color="#fef3c7"/>' +
        '</linearGradient>' +
        '<radialGradient id="top20-gem" cx="35%" cy="30%" r="70%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="35%" stop-color="#fef08a"/>' +
          '<stop offset="75%" stop-color="#eab308"/>' +
          '<stop offset="100%" stop-color="#78350f"/>' +
        '</radialGradient>',
      backSvg:
        '<g>' +
          /* Giant dramatic champagne tulle bow billowing behind shoulders & waist ribbons */
          mirrorX(
            '<path d="M254,344 C208,292 152,306 164,354 C172,386 220,382 252,364 Z" fill="url(#top20-tulle)" stroke="#fef08a" stroke-width="1.3"/>' +
            '<path d="M244,350 C206,314 172,324 176,352" fill="none" stroke="#ffffff" stroke-width="1.4" opacity="0.78"/>' +
            '<path d="M262,424 C232,456 216,496 214,536 L236,522 L246,540 C254,502 262,462 272,434 Z" fill="url(#top20-tulle)" stroke="#fde68a" stroke-width="1"/>' +
            star4(178, 336, 5, '#ffffff', 0.92) +
            star4(232, 514, 4.5, '#fef08a', 0.9)
          ) +
        '</g>',
      svg:
        '<g>' +
          /* Opaque champagne-ivory illusion chest yoke with gold pearl trim */
          '<path d="M236,342 C242,323 268,319 285,320 Q300,328 315,320 C332,319 358,323 364,342 L348,362 L252,362 Z" fill="url(#top20-cream)" stroke="#fcd34d" stroke-width="0.9"/>' +
          pearlChain(283, 320, 300, 329, 317, 320, 7, 2.2, 'top20-gem', '#d97706') +
          /* Multi-ruffled champagne tulle puff sleeves covering shoulder joints cleanly */
          mirrorX(
            '<ellipse cx="220" cy="340" rx="32" ry="29" fill="url(#top20-champ)" stroke="#b45309" stroke-width="1.1"/>' +
            '<ellipse cx="218" cy="336" rx="28" ry="24" fill="url(#top20-tulle)" stroke="#fef08a" stroke-width="1"/>' +
            '<path d="M196,336 Q218,348 242,336" fill="none" stroke="#ffffff" stroke-width="1.4" opacity="0.85"/>' +
            '<path d="M198,350 Q220,362 242,350" fill="none" stroke="#fef08a" stroke-width="1.3" opacity="0.85"/>' +
            '<path d="M200,324 C212,314 230,316 240,328" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.85" stroke-linecap="round"/>'
          ) +
          /* Draped couture wrap-pleated champagne satin ballgown bodice */
          '<path d="M238,340 C258,332 282,337 300,350 C318,337 342,332 362,340 C360,370 355,396 348,415 L342,436 L258,436 L252,415 C245,396 240,370 238,340 Z" fill="url(#top20-champ)" stroke="#92400e" stroke-width="1.2"/>' +
          /* Diagonal pleated crossover bust drapery */
          mirrorX(
            '<path d="M242,346 C264,352 286,364 300,378" fill="none" stroke="#fffbeb" stroke-width="1.5" opacity="0.72"/>' +
            '<path d="M244,358 C266,366 284,376 298,390" fill="none" stroke="#92400e" stroke-width="1.1" opacity="0.35"/>' +
            '<path d="M248,370 C268,380 284,392 296,404" fill="none" stroke="#fffbeb" stroke-width="1.2" opacity="0.58"/>' +
            '<path d="M268,382 L274,432" fill="none" stroke="url(#top20-gold)" stroke-width="1.3" opacity="0.8"/>'
          ) +
          /* Tiered airy champagne tulle peplum flounce */
          '<path d="M258,433 C242,444 234,458 238,464 Q268,472 300,462 Q332,472 362,464 C366,458 358,444 342,433 Z" fill="url(#top20-tulle)" stroke="#fbbf24" stroke-width="1.1"/>' +
          '<path d="M239,462 Q268,470 300,460 Q332,470 361,462" fill="none" stroke="url(#top20-gold)" stroke-width="1.8"/>' +
          '<path d="M258,425 Q300,433 342,425 L342,436 Q300,444 258,436 Z" fill="url(#top20-gold)" stroke="#92400e" stroke-width="0.9"/>' +
          /* Couture satin & tulle waist bow + diamond chest sunburst */
          '<path d="M295,431 C272,415 264,438 282,444 C290,447 297,439 299,434 Z M305,431 C328,415 336,438 318,444 C310,447 303,439 301,434 Z" fill="url(#top20-cream)" stroke="#d97706" stroke-width="1"/>' +
          gemCircle(300, 434, 4.4, 'top20-gem', 'url(#top20-gold)') +
          gemCircle(300, 355, 5.8, 'top20-gem', '#ffffff') +
          star4(300, 355, 11, '#ffffff', 0.42) +
          star4(286, 344, 4.5, '#ffffff', 0.95) +
          star4(314, 344, 4.5, '#ffffff', 0.95) +
          star4(300, 404, 4, '#fffbeb', 0.9) +
        '</g>'
    },

    /* ======================================================================
       21. Áo Khoác Cyber Pop Idol Hologram
       ====================================================================== */
    {
      id: 'top-21',
      name: 'Áo Khoác Cyber Pop Idol Hologram',
      icon: '⚡',
      accentColor: '#a855f7',
      previewBox: '158 290 284 214',
      defs:
        '<linearGradient id="top21-holo" x1="0%" y1="0%" x2="100%" y2="25%">' +
          '<stop offset="0%" stop-color="#06b6d4"/>' +
          '<stop offset="26%" stop-color="#c084fc"/>' +
          '<stop offset="50%" stop-color="#f5d0fe"/>' +
          '<stop offset="74%" stop-color="#f472b6"/>' +
          '<stop offset="100%" stop-color="#22d3ee"/>' +
        '</linearGradient>' +
        '<linearGradient id="top21-dark" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#312e81"/>' +
          '<stop offset="55%" stop-color="#1e1b4b"/>' +
          '<stop offset="100%" stop-color="#0f172a"/>' +
        '</linearGradient>' +
        '<linearGradient id="top21-neon" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#22d3ee"/>' +
          '<stop offset="50%" stop-color="#e879f9"/>' +
          '<stop offset="100%" stop-color="#ec4899"/>' +
        '</linearGradient>' +
        '<linearGradient id="top21-chrome" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="48%" stop-color="#cbd5e1"/>' +
          '<stop offset="100%" stop-color="#475569"/>' +
        '</linearGradient>' +
        '<linearGradient id="top21-volt" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#fef08a"/>' +
          '<stop offset="50%" stop-color="#22d3ee"/>' +
          '<stop offset="100%" stop-color="#e879f9"/>' +
        '</linearGradient>',
      backSvg:
        '<g>' +
          /* Angular holographic cyber ribbon fins trailing behind waist */
          mirrorX(
            '<path d="M244,352 C214,382 198,438 206,494 L224,478 L234,498 C240,456 248,410 258,376 Z" fill="url(#top21-holo)" opacity="0.72" stroke="#22d3ee" stroke-width="1.1"/>' +
            '<path d="M214,478 L234,404" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.7"/>'
          ) +
        '</g>',
      svg:
        '<g>' +
          /* Sleek obsidian cyber crop-top underneath covering full torso cleanly */
          '<path d="M238,332 C252,321 274,318 286,320 Q300,332 314,320 C326,318 348,321 362,332 C361,365 356,396 349,416 L342,438 L258,438 L251,416 C244,396 239,365 238,332 Z" fill="url(#top21-dark)" stroke="#4c1d95" stroke-width="1.1"/>' +
          /* Cyber choker, harness straps & glowing neon lightning crest */
          '<path d="M284,319 Q300,328 316,319 L316,326 Q300,335 284,326 Z" fill="url(#top21-neon)" stroke="#ffffff" stroke-width="0.7"/>' +
          '<path d="M276,326 L300,350 L324,326" fill="none" stroke="#22d3ee" stroke-width="2"/>' +
          '<circle cx="300" cy="350" r="4.5" fill="none" stroke="url(#top21-chrome)" stroke-width="2.2"/>' +
          '<polygon points="303,362 292,377 299,377 295,392 309,374 301,374" fill="url(#top21-volt)" stroke="#ffffff" stroke-width="0.9"/>' +
          /* Angular padded hologram shoulder armor puffs covering arm joints cleanly */
          mirrorX(
            '<path d="M248,320 C220,312 190,324 190,350 C192,366 218,374 246,360 Z" fill="url(#top21-holo)" stroke="#4c1d95" stroke-width="1.2"/>' +
            '<path d="M200,332 C214,322 230,324 240,334" fill="none" stroke="#ffffff" stroke-width="2.2" opacity="0.85" stroke-linecap="round"/>' +
            '<path d="M196,348 L240,342" fill="none" stroke="#22d3ee" stroke-width="1.8"/>' +
            '<path d="M195,360 Q220,369 243,360 L241,371 Q220,380 197,370 Z" fill="url(#top21-dark)" stroke="#ec4899" stroke-width="1"/>' +
            '<rect x="212" y="362" width="14" height="6" rx="2" fill="url(#top21-chrome)"/>'
          ) +
          /* Open holographic cropped cyber moto-jacket panels */
          mirrorX(
            '<path d="M236,331 C250,321 268,317 282,318 L278,354 L283,414 L247,414 C239,394 236,362 236,331 Z" fill="url(#top21-holo)" stroke="#581c87" stroke-width="1.2"/>' +
            '<polygon points="282,318 263,332 272,356 280,352" fill="url(#top21-neon)" stroke="#ffffff" stroke-width="0.9"/>' +
            '<path d="M278,356 L282,412" fill="none" stroke="url(#top21-chrome)" stroke-width="2" stroke-dasharray="3,2"/>' +
            '<path d="M252,374 L268,374 L272,398" fill="none" stroke="#22d3ee" stroke-width="1.4" opacity="0.9"/>' +
            '<circle cx="272" cy="398" r="2.2" fill="#ffffff"/>' +
            '<path d="M247,407 L283,407 L283,415 L249,415 Z" fill="url(#top21-dark)" stroke="#22d3ee" stroke-width="0.9"/>'
          ) +
          /* Cyber neon waist belt & angular hologram peplum fins */
          '<path d="M258,426 Q300,433 342,426 L343,440 Q300,447 257,440 Z" fill="url(#top21-dark)" stroke="#22d3ee" stroke-width="1.1"/>' +
          '<path d="M257,439 L246,458 L272,448 L286,462 L300,444 L314,462 L328,448 L354,458 L343,439 Z" fill="url(#top21-holo)" stroke="#4c1d95" stroke-width="1"/>' +
          '<rect x="291" y="424" width="18" height="17" rx="4" fill="url(#top21-chrome)" stroke="#1e1b4b" stroke-width="0.9"/>' +
          '<polygon points="301,427 296,433 300,433 298,439 305,432 301,432" fill="#22d3ee"/>' +
          star4(268, 350, 4.5, '#ffffff', 0.95) +
          star4(332, 350, 4.5, '#ffffff', 0.95) +
          star4(300, 408, 4, '#22d3ee', 0.95) +
        '</g>'
    },

    /* ======================================================================
       22. Áo Phượng Hoàng Lửa Cánh Vàng
       ====================================================================== */
    {
      id: 'top-22',
      name: 'Áo Phượng Hoàng Lửa Cánh Vàng',
      icon: '🔥',
      accentColor: '#f97316',
      previewBox: '108 232 384 300',
      defs:
        '<linearGradient id="top22-crimson" x1="0%" y1="0%" x2="100%" y2="12%">' +
          '<stop offset="0%" stop-color="#7f1d1d"/>' +
          '<stop offset="26%" stop-color="#dc2626"/>' +
          '<stop offset="50%" stop-color="#fb7185"/>' +
          '<stop offset="76%" stop-color="#b91c1c"/>' +
          '<stop offset="100%" stop-color="#450a0a"/>' +
        '</linearGradient>' +
        '<linearGradient id="top22-flame" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#fef08a"/>' +
          '<stop offset="48%" stop-color="#f97316"/>' +
          '<stop offset="100%" stop-color="#b91c1c"/>' +
        '</linearGradient>' +
        '<linearGradient id="top22-gold" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#fef9c3"/>' +
          '<stop offset="48%" stop-color="#fbbf24"/>' +
          '<stop offset="100%" stop-color="#b45309"/>' +
        '</linearGradient>' +
        '<linearGradient id="top22-wing-hi" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#fef08a"/>' +
          '<stop offset="46%" stop-color="#fbbf24"/>' +
          '<stop offset="82%" stop-color="#f97316"/>' +
          '<stop offset="100%" stop-color="#dc2626"/>' +
        '</linearGradient>' +
        '<linearGradient id="top22-wing-lo" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#fbbf24" stop-opacity="0.94"/>' +
          '<stop offset="55%" stop-color="#f97316" stop-opacity="0.9"/>' +
          '<stop offset="100%" stop-color="#991b1b" stop-opacity="0.86"/>' +
        '</linearGradient>' +
        '<radialGradient id="top22-ruby" cx="35%" cy="30%" r="70%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="32%" stop-color="#fde047"/>' +
          '<stop offset="72%" stop-color="#f97316"/>' +
          '<stop offset="100%" stop-color="#7f1d1d"/>' +
        '</radialGradient>',
      backSvg:
        '<g>' +
          /* Blazing Golden Phoenix Wings & flowing ember tail plumes */
          mirrorX(
            '<path d="M276,348 C238,274 156,226 112,246 C100,260 116,288 144,302 C114,310 110,334 138,350 C120,362 126,384 160,392 C148,408 162,426 196,426 C230,426 260,398 276,374 Z" fill="url(#top22-wing-hi)" stroke="#9a3412" stroke-width="1.2"/>' +
            '<path d="M262,354 C214,300 156,264 124,258" fill="none" stroke="#fef9c3" stroke-width="2.2" opacity="0.88" stroke-linecap="round"/>' +
            '<path d="M254,362 C210,332 164,314 132,316" fill="none" stroke="#fef08a" stroke-width="1.6" opacity="0.82"/>' +
            '<path d="M250,372 C210,360 170,356 140,366" fill="none" stroke="#fed7aa" stroke-width="1.4" opacity="0.76"/>' +
            '<path d="M248,382 C216,388 188,398 168,412" fill="none" stroke="#fef08a" stroke-width="1.2" opacity="0.72"/>' +
            '<path d="M272,388 C236,416 184,452 174,492 C178,512 204,516 226,496 C248,476 266,440 276,406 Z" fill="url(#top22-wing-lo)" stroke="#9a3412" stroke-width="1.1"/>' +
            '<path d="M256,408 C226,436 198,468 190,496" fill="none" stroke="#fef08a" stroke-width="1.4" opacity="0.8"/>' +
            star4(122, 254, 6, '#fef08a', 0.95) +
            star4(182, 488, 5, '#ffffff', 0.92)
          ) +
        '</g>',
      svg:
        '<g>' +
          /* Flame-scalloped crimson-gold upper yoke covering collarbone cleanly */
          '<path d="M236,342 C242,324 268,318 285,319 Q300,328 315,319 C332,318 358,324 364,342 L348,364 L252,364 Z" fill="url(#top22-flame)" stroke="#9a3412" stroke-width="1"/>' +
          '<path d="M282,319 Q300,329 318,319" fill="none" stroke="url(#top22-gold)" stroke-width="2.4"/>' +
          /* Layered crimson-and-gold phoenix feather shoulder pauldrons covering joints cleanly */
          mirrorX(
            '<path d="M248,322 C220,308 188,320 188,346 C192,362 218,368 246,356 Z" fill="url(#top22-gold)" stroke="#9a3412" stroke-width="1.1"/>' +
            '<path d="M244,335 C216,334 192,348 196,368 C210,378 234,372 248,358 Z" fill="url(#top22-crimson)" stroke="url(#top22-gold)" stroke-width="1.1"/>' +
            '<path d="M202,329 C215,320 230,322 240,332" fill="none" stroke="#fef9c3" stroke-width="2" opacity="0.85" stroke-linecap="round"/>' +
            '<path d="M200,350 L236,344" fill="none" stroke="#fef08a" stroke-width="1.3" opacity="0.8"/>'
          ) +
          /* Imperial Phoenix Empress crimson corset bodice */
          '<path d="M238,340 C256,332 282,336 300,350 C318,336 344,332 362,340 C360,370 355,396 348,416 L342,435 L258,435 L252,416 C245,396 240,370 238,340 Z" fill="url(#top22-crimson)" stroke="#7f1d1d" stroke-width="1.3"/>' +
          /* Sculpted 24k gold phoenix-wing breastplate filigree */
          mirrorX(
            '<path d="M244,344 C264,342 288,356 298,382 C280,388 258,380 246,360 Z" fill="url(#top22-flame)" opacity="0.86" stroke="url(#top22-gold)" stroke-width="1.1"/>' +
            '<path d="M254,354 C268,360 280,370 288,380" fill="none" stroke="#fef9c3" stroke-width="1.4" opacity="0.85"/>' +
            '<path d="M268,388 C274,404 275,418 274,432" fill="none" stroke="url(#top22-gold)" stroke-width="1.6"/>'
          ) +
          /* Multi-layered golden feather & crimson flame-petal peplum */
          '<path d="M258,432 C244,442 240,458 254,464 C268,468 278,456 284,446 C290,462 300,468 300,468 C300,468 310,462 316,446 C322,456 332,468 346,464 C360,458 356,442 342,432 Z" fill="url(#top22-flame)" stroke="#9a3412" stroke-width="1.1"/>' +
          '<path d="M266,434 C260,446 268,458 280,456 C290,454 295,444 300,438 C305,444 310,454 320,456 C332,458 340,446 334,434 Z" fill="url(#top22-gold)" stroke="#b45309" stroke-width="0.9"/>' +
          '<path d="M258,426 Q300,435 342,426 L342,437 Q300,446 258,437 Z" fill="url(#top22-gold)" stroke="#92400e" stroke-width="0.9"/>' +
          /* Blazing sun-ruby phoenix chest & waist emblems */
          '<path d="M282,354 C288,344 296,348 300,355 C304,348 312,344 318,354 C312,362 304,364 300,358 C296,364 288,362 282,354 Z" fill="url(#top22-gold)" stroke="#92400e" stroke-width="0.8"/>' +
          gemCircle(300, 356, 5.6, 'top22-ruby', 'url(#top22-gold)') +
          gemCircle(300, 434, 4.4, 'top22-ruby', '#fef08a') +
          star4(284, 342, 4.5, '#ffffff', 0.95) +
          star4(316, 342, 4.5, '#ffffff', 0.95) +
          star4(300, 404, 4.5, '#fef08a', 0.95) +
        '</g>'
    }
  ];

  root.WARDROBE_TOPS = WARDROBE_TOPS;
})(typeof window !== 'undefined' ? window : globalThis);
