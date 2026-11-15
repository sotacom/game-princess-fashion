/**
 * 2.5D Anime / Barbie Princess Wardrobe — Shoes & Boots Dataset
 * Canvas coordinate system: SVG viewBox="0 0 600 950"
 * Left leg (#rig-leg-left): hip (274,500), knee (270,670), calf y:700..800 (x:253..286),
 *   ankle (268,825) (x:260..276), foot/toe (265,850..878) (x:253..277), floor shadow y=884.
 * Right leg (#rig-leg-right): symmetric across x=300 (x_right = 600 - x_left).
 */
(function (root) {
  'use strict';

  /** Exact sampled left leg contour (y, xOuterLeft, xInnerRight) from #rig-leg-left. */
  var LEG_PROFILE = [
    [670, 256.0, 284.0],
    [685, 255.4, 284.4],
    [700, 254.3, 285.2],
    [715, 253.2, 285.8],
    [730, 252.8, 286.0],
    [745, 253.3, 285.2],
    [760, 254.4, 283.8],
    [775, 255.6, 282.0],
    [790, 257.2, 280.1],
    [805, 258.5, 278.0],
    [820, 259.7, 276.3],
    [830, 259.9, 276.0],
    [845, 258.6, 276.0],
    [860, 257.2, 276.0],
    [870, 257.6, 273.4]
  ];

  /** Linearly interpolates left-leg outer, inner, and center X at any Y in 670..870. */
  function legSpanAt(y) {
    if (y <= LEG_PROFILE[0][0]) {
      return { l: LEG_PROFILE[0][1], r: LEG_PROFILE[0][2], c: (LEG_PROFILE[0][1] + LEG_PROFILE[0][2]) / 2 };
    }
    var last = LEG_PROFILE[LEG_PROFILE.length - 1];
    if (y >= last[0]) {
      return { l: last[1], r: last[2], c: (last[1] + last[2]) / 2 };
    }
    for (var i = 0; i < LEG_PROFILE.length - 1; i++) {
      var a = LEG_PROFILE[i];
      var b = LEG_PROFILE[i + 1];
      if (y >= a[0] && y <= b[0]) {
        var t = (y - a[0]) / (b[0] - a[0]);
        var l = a[1] + (b[1] - a[1]) * t;
        var r = a[2] + (b[2] - a[2]) * t;
        return { l: l, r: r, c: (l + r) / 2 };
      }
    }
    return { l: 260, r: 276, c: 268 };
  }

  /** Builds a form-fitting sleeve/boot-shaft path hugging the left leg from yTop to yBot. */
  function legShaftPath(yTop, yBot, expL, expR, topDip, botDip) {
    var el = expL === undefined ? 1.6 : expL;
    var er = expR === undefined ? 1.6 : expR;
    var td = topDip || 0;
    var bd = botDip || 0;
    var steps = Math.max(4, Math.round((yBot - yTop) / 14));
    var leftPts = [];
    var rightPts = [];
    for (var i = 0; i <= steps; i++) {
      var y = yTop + ((yBot - yTop) * i) / steps;
      var s = legSpanAt(y);
      leftPts.push([(s.l - el).toFixed(1), y.toFixed(1)]);
      rightPts.push([(s.r + er).toFixed(1), y.toFixed(1)]);
    }
    var topMid = legSpanAt(yTop);
    var botMid = legSpanAt(yBot);
    var d = 'M' + leftPts[0][0] + ',' + leftPts[0][1];
    for (var j = 1; j < leftPts.length; j++) {
      d += ' L' + leftPts[j][0] + ',' + leftPts[j][1];
    }
    if (bd !== 0) {
      d += ' Q' + botMid.c.toFixed(1) + ',' + (yBot + bd).toFixed(1) + ' ' + rightPts[rightPts.length - 1][0] + ',' + rightPts[rightPts.length - 1][1];
    } else {
      d += ' L' + rightPts[rightPts.length - 1][0] + ',' + rightPts[rightPts.length - 1][1];
    }
    for (var k = rightPts.length - 2; k >= 0; k--) {
      d += ' L' + rightPts[k][0] + ',' + rightPts[k][1];
    }
    if (td !== 0) {
      d += ' Q' + topMid.c.toFixed(1) + ',' + (yTop + td).toFixed(1) + ' ' + leftPts[0][0] + ',' + leftPts[0][1];
    }
    return d + ' Z';
  }

  /** Builds a sleek linearGradient SVG string. */
  function lg(id, x1, y1, x2, y2, stops, userSpace) {
    var out = '<linearGradient id="' + id + '" x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '"' +
      (userSpace ? ' gradientUnits="userSpaceOnUse"' : '') + '>';
    for (var i = 0; i < stops.length; i++) {
      var s = stops[i];
      out += '<stop offset="' + s[0] + '" stop-color="' + s[1] + '"' + (s[2] !== undefined ? ' stop-opacity="' + s[2] + '"' : '') + '/>';
    }
    return out + '</linearGradient>';
  }

  /** Builds a sleek radialGradient SVG string. */
  function rg(id, cx, cy, r, stops, fx, fy, userSpace) {
    var out = '<radialGradient id="' + id + '" cx="' + cx + '" cy="' + cy + '" r="' + r + '" fx="' + (fx || cx) + '" fy="' + (fy || cy) + '"' +
      (userSpace ? ' gradientUnits="userSpaceOnUse"' : '') + '>';
    for (var i = 0; i < stops.length; i++) {
      var s = stops[i];
      out += '<stop offset="' + s[0] + '" stop-color="' + s[1] + '"' + (s[2] !== undefined ? ' stop-opacity="' + s[2] + '"' : '') + '/>';
    }
    return out + '</radialGradient>';
  }

  /** Renders a crisp 4-point anime diamond sparkle. */
  function sparkle4(cx, cy, r, fill, opacity) {
    var ri = +(r * 0.22).toFixed(2);
    var op = opacity !== undefined ? ' opacity="' + opacity + '"' : '';
    return (
      '<path d="M' + cx + ',' + (cy - r) +
      ' Q' + (cx + ri) + ',' + (cy - ri) + ' ' + (cx + r) + ',' + cy +
      ' Q' + (cx + ri) + ',' + (cy + ri) + ' ' + cx + ',' + (cy + r) +
      ' Q' + (cx - ri) + ',' + (cy + ri) + ' ' + (cx - r) + ',' + cy +
      ' Q' + (cx - ri) + ',' + (cy - ri) + ' ' + cx + ',' + (cy - r) +
      ' Z" fill="' + (fill || '#ffffff') + '"' + op + '/>'
    );
  }

  /** Renders a 5-point princess star. */
  function star5(cx, cy, ro, ri, fill, stroke, sw) {
    var pts = [];
    for (var i = 0; i < 10; i++) {
      var a = -Math.PI / 2 + (i * Math.PI) / 5;
      var rad = i % 2 === 0 ? ro : ri;
      pts.push((cx + Math.cos(a) * rad).toFixed(1) + ',' + (cy + Math.sin(a) * rad).toFixed(1));
    }
    var st = stroke ? ' stroke="' + stroke + '" stroke-width="' + (sw || 0.7) + '"' : '';
    return '<polygon points="' + pts.join(' ') + '" fill="' + fill + '"' + st + '/>';
  }

  /** Renders a symmetrical anime heart path centered around (cx, cy). */
  function heartPath(cx, cy, s) {
    var dipY = (cy - s * 0.1).toFixed(1);
    var topY = (cy - s * 0.35).toFixed(1);
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

  /** Renders a 2.5D pearl sphere with specular catchlight. */
  function pearl(cx, cy, r, gradId, rim) {
    return (
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="url(#' + gradId + ')" stroke="' + (rim || '#e2d4e8') + '" stroke-width="0.55"/>' +
      '<circle cx="' + (cx - r * 0.32).toFixed(2) + '" cy="' + (cy - r * 0.32).toFixed(2) + '" r="' + Math.max(0.5, r * 0.3).toFixed(2) + '" fill="#ffffff" opacity="0.92"/>'
    );
  }

  /** Renders a curved string of pearls along a quadratic Bezier. */
  function pearlChain(x0, y0, cx, cy, x1, y1, count, r, gradId, rim) {
    var out = '';
    for (var i = 0; i < count; i++) {
      var t = count === 1 ? 0.5 : i / (count - 1);
      var mt = 1 - t;
      var x = mt * mt * x0 + 2 * mt * t * cx + t * t * x1;
      var y = mt * mt * y0 + 2 * mt * t * cy + t * t * y1;
      out += pearl(Number(x.toFixed(1)), Number(y.toFixed(1)), r, gradId, rim);
    }
    return out;
  }

  /** Renders a faceted 2.5D diamond gem with rim and catchlight. */
  function gemDiamond(cx, cy, rx, ry, gradId, rim) {
    return (
      '<polygon points="' + cx + ',' + (cy - ry) + ' ' + (cx + rx) + ',' + cy + ' ' + cx + ',' + (cy + ry) + ' ' + (cx - rx) + ',' + cy +
      '" fill="url(#' + gradId + ')" stroke="' + (rim || '#ffffff') + '" stroke-width="0.7" stroke-linejoin="round"/>' +
      '<polygon points="' + cx + ',' + (cy - ry * 0.55).toFixed(2) + ' ' + (cx + rx * 0.52).toFixed(2) + ',' + cy + ' ' + cx + ',' + (cy + ry * 0.55).toFixed(2) + ' ' + (cx - rx * 0.52).toFixed(2) + ',' + cy +
      '" fill="#ffffff" opacity="0.32"/>' +
      '<circle cx="' + (cx - rx * 0.28).toFixed(2) + '" cy="' + (cy - ry * 0.3).toFixed(2) + '" r="' + Math.max(0.55, rx * 0.22).toFixed(2) + '" fill="#ffffff" opacity="0.92"/>'
    );
  }

  /** Renders a 2.5D faceted oval gem with rim and specular catchlight. */
  function gemOval(cx, cy, rx, ry, gradId, rim) {
    return (
      '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" fill="url(#' + gradId + ')" stroke="' + (rim || '#ffffff') + '" stroke-width="0.65"/>' +
      '<ellipse cx="' + (cx - rx * 0.24).toFixed(2) + '" cy="' + (cy - ry * 0.28).toFixed(2) + '" rx="' + (rx * 0.44).toFixed(2) + '" ry="' + (ry * 0.3).toFixed(2) + '" fill="#ffffff" opacity="0.45"/>' +
      '<circle cx="' + (cx - rx * 0.32).toFixed(2) + '" cy="' + (cy - ry * 0.35).toFixed(2) + '" r="' + Math.max(0.5, rx * 0.2).toFixed(2) + '" fill="#ffffff" opacity="0.92"/>'
    );
  }

  /** Renders a 2.5D satin ribbon bow with loops, knot, and notched tails. */
  function bow25D(cx, cy, s, fillMain, fillDark, strokeCol, tailLen) {
    var tl = tailLen === undefined ? 14 : tailLen;
    var tails = tl > 0
      ? '<path d="M-2,2 C-6,' + (tl * 0.45).toFixed(1) + ' -9,' + (tl * 0.78).toFixed(1) + ' -11,' + tl + ' L-6,' + (tl - 2.5) + ' L-4,' + (tl + 1) + ' C-2,' + (tl * 0.65).toFixed(1) + ' -1,' + (tl * 0.3).toFixed(1) + ' 0,2 Z" fill="' + fillDark + '" stroke="' + strokeCol + '" stroke-width="0.7"/>' +
        '<path d="M2,2 C6,' + (tl * 0.45).toFixed(1) + ' 9,' + (tl * 0.78).toFixed(1) + ' 11,' + tl + ' L6,' + (tl - 2.5) + ' L4,' + (tl + 1) + ' C2,' + (tl * 0.65).toFixed(1) + ' 1,' + (tl * 0.3).toFixed(1) + ' 0,2 Z" fill="' + fillDark + '" stroke="' + strokeCol + '" stroke-width="0.7"/>'
      : '';
    return (
      '<g transform="translate(' + cx + ',' + cy + ') scale(' + s + ')">' +
        tails +
        '<path d="M-2,-1.5 C-9,-9 -16,-6 -15,1 C-14,7 -7,6.5 -2,2 Z" fill="' + fillMain + '" stroke="' + strokeCol + '" stroke-width="0.75"/>' +
        '<path d="M2,-1.5 C9,-9 16,-6 15,1 C14,7 7,6.5 2,2 Z" fill="' + fillMain + '" stroke="' + strokeCol + '" stroke-width="0.75"/>' +
        '<path d="M-3,0 C-9,-3.2 -13,-1.6 -12.2,1.2 C-11.5,3.5 -7,3.5 -2.8,1.2 Z" fill="' + fillDark + '" opacity="0.38"/>' +
        '<path d="M3,0 C9,-3.2 13,-1.6 12.2,1.2 C11.5,3.5 7,3.5 2.8,1.2 Z" fill="' + fillDark + '" opacity="0.38"/>' +
        '<path d="M-4,-2.5 C-8.5,-5.2 -12.5,-4 -12.8,-1.2" fill="none" stroke="#ffffff" stroke-width="0.9" stroke-linecap="round" opacity="0.72"/>' +
        '<path d="M4,-2.5 C8.5,-5.2 12.5,-4 12.8,-1.2" fill="none" stroke="#ffffff" stroke-width="0.9" stroke-linecap="round" opacity="0.72"/>' +
        '<rect x="-3.2" y="-3" width="6.4" height="6" rx="2" fill="' + fillMain + '" stroke="' + strokeCol + '" stroke-width="0.75"/>' +
        '<ellipse cx="-0.8" cy="-1.2" rx="1.4" ry="0.7" fill="#ffffff" opacity="0.72"/>' +
      '</g>'
    );
  }

  /** Renders a 6-point crystal snowflake. */
  function snowflake(cx, cy, r, stroke, sw, opacity) {
    var out = '<g stroke="' + (stroke || '#ffffff') + '" stroke-width="' + (sw || 0.9) + '" stroke-linecap="round" opacity="' + (opacity || 0.9) + '">';
    for (var i = 0; i < 6; i++) {
      var a = (i * Math.PI) / 3;
      var ex = (cx + Math.cos(a) * r).toFixed(1);
      var ey = (cy + Math.sin(a) * r).toFixed(1);
      var bx = cx + Math.cos(a) * r * 0.55;
      var by = cy + Math.sin(a) * r * 0.55;
      var lx = (bx + Math.cos(a - 0.65) * r * 0.34).toFixed(1);
      var ly = (by + Math.sin(a - 0.65) * r * 0.34).toFixed(1);
      var rx = (bx + Math.cos(a + 0.65) * r * 0.34).toFixed(1);
      var ry = (by + Math.sin(a + 0.65) * r * 0.34).toFixed(1);
      out +=
        '<line x1="' + cx + '" y1="' + cy + '" x2="' + ex + '" y2="' + ey + '"/>' +
        '<path d="M' + lx + ',' + ly + ' L' + bx.toFixed(1) + ',' + by.toFixed(1) + ' L' + rx + ',' + ry + '" fill="none"/>';
    }
    return out + '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r * 0.2).toFixed(1) + '" fill="#ffffff" stroke="none"/></g>';
  }

  /** Renders a 5-petal blossom (sakura / spring flower). */
  function flower5(cx, cy, r, petalFill, centerCol, rim) {
    var out = '';
    for (var i = 0; i < 5; i++) {
      var a = ((i * 72 - 90) * Math.PI) / 180;
      var px = (cx + Math.cos(a) * r * 0.56).toFixed(1);
      var py = (cy + Math.sin(a) * r * 0.56).toFixed(1);
      out += '<circle cx="' + px + '" cy="' + py + '" r="' + (r * 0.45).toFixed(1) + '" fill="' + petalFill + '" stroke="' + (rim || '#ffffff') + '" stroke-width="0.6"/>';
    }
    return (
      out +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r * 0.28).toFixed(1) + '" fill="' + (centerCol || '#ffe066') + '" stroke="#d97706" stroke-width="0.5"/>' +
      '<circle cx="' + (cx - r * 0.08).toFixed(1) + '" cy="' + (cy - r * 0.08).toFixed(1) + '" r="' + (r * 0.1).toFixed(1) + '" fill="#ffffff" opacity="0.88"/>'
    );
  }

  /** Renders scalloped lace trim across a horizontal/curved span. */
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
    var st = stroke ? ' stroke="' + stroke + '" stroke-width="' + (sw || 0.75) + '"' : '';
    return '<path d="' + d + '" fill="' + fill + '"' + st + ' stroke-linecap="round"/>';
  }

  /** Renders criss-cross ribbons or boot laces hugging the exact leg curvature. */
  function crossLaces(yTop, yBot, steps, inset, stroke, sw, eyeletFill, eyeletRim) {
    var out = '';
    var pts = [];
    for (var i = 0; i <= steps; i++) {
      var y = yTop + ((yBot - yTop) * i) / steps;
      var s = legSpanAt(y);
      pts.push({ l: s.l + inset, r: s.r - inset, y: y });
    }
    for (var j = 0; j < steps; j++) {
      var a = pts[j];
      var b = pts[j + 1];
      out +=
        '<line x1="' + a.l.toFixed(1) + '" y1="' + a.y.toFixed(1) + '" x2="' + b.r.toFixed(1) + '" y2="' + b.y.toFixed(1) + '" stroke="' + stroke + '" stroke-width="' + sw + '" stroke-linecap="round"/>' +
        '<line x1="' + a.r.toFixed(1) + '" y1="' + a.y.toFixed(1) + '" x2="' + b.l.toFixed(1) + '" y2="' + b.y.toFixed(1) + '" stroke="' + stroke + '" stroke-width="' + sw + '" stroke-linecap="round"/>';
    }
    if (eyeletFill) {
      for (var k = 0; k <= steps; k++) {
        var p = pts[k];
        out +=
          '<circle cx="' + p.l.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="1.1" fill="' + eyeletFill + '" stroke="' + (eyeletRim || '#ffffff') + '" stroke-width="0.4"/>' +
          '<circle cx="' + p.r.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="1.1" fill="' + eyeletFill + '" stroke="' + (eyeletRim || '#ffffff') + '" stroke-width="0.4"/>';
      }
    }
    return out;
  }

  /** Mirrors left-foot SVG cleanly across x=300 for the right foot. */
  function mirrorShoe(leftSvg) {
    return '<g transform="translate(600,0) scale(-1,1)">' + leftSvg + '</g>';
  }

  /** Builds a complete shoe entry with symmetric rightSvg and combined drawer svg. */
  function makeShoe(spec) {
    var rightSvg = mirrorShoe(spec.leftSvg);
    return {
      id: spec.id,
      name: spec.name,
      icon: spec.icon,
      accentColor: spec.accentColor,
      previewBox: spec.previewBox,
      defs: spec.defs,
      leftSvg: spec.leftSvg,
      rightSvg: rightSvg,
      svg: spec.leftSvg + rightSvg
    };
  }

  var RAW_SHOES = [
    /* ======================================================================
       1. Giày Cao Gót Pha Lê Lọ Lem
       ====================================================================== */
    {
      id: 'shoe-01',
      name: 'Giày Cao Gót Pha Lê Lọ Lem',
      icon: '👠',
      accentColor: '#ff74b8',
      previewBox: '225 775 150 120',
      defs:
        lg('shoe01-glass', '10%', '0%', '90%', '100%', [
          ['0%', '#ffffff', '0.96'],
          ['26%', '#ffe3f3', '0.92'],
          ['62%', '#ff88c8', '0.9'],
          ['100%', '#bae6fd', '0.95']
        ]) +
        lg('shoe01-inner', '0%', '0%', '0%', '100%', [
          ['0%', '#ffd9ee', '0.52'],
          ['100%', '#f472b6', '0.3']
        ]) +
        lg('shoe01-sole', '0%', '0%', '100%', '0%', [
          ['0%', '#ff74b8'],
          ['50%', '#e11d74'],
          ['100%', '#9d174d']
        ]) +
        lg('shoe01-heel', '0%', '0%', '100%', '100%', [
          ['0%', '#ffffff'],
          ['42%', '#bae6fd'],
          ['100%', '#f472b6']
        ]) +
        rg('shoe01-gem', '36%', '30%', '68%', [
          ['0%', '#ffffff'],
          ['32%', '#fbcfe8'],
          ['75%', '#ec4899'],
          ['100%', '#831843']
        ]) +
        rg('shoe01-pearl', '34%', '30%', '68%', [
          ['0%', '#ffffff'],
          ['62%', '#fff0f7'],
          ['100%', '#d8b4d2']
        ]),
      leftSvg:
        '<g>' +
          /* Faceted crystal stiletto heel */
          '<path d="M270.2,847 L275.4,847 L274.2,878.5 Q272.2,879.6 270.4,878.5 Z" fill="url(#shoe01-heel)" stroke="#f9a8d4" stroke-width="0.7"/>' +
          '<path d="M272.4,847 L272.2,878" stroke="#ffffff" stroke-width="0.9" opacity="0.85"/>' +
          /* Subtle 2.5D inner collar & translucent footbed liner */
          '<path d="M254.2,851 Q265,844 276.6,850 C276.6,857 271.5,862 265,862 C259,862 254.2,857 254.2,851 Z" fill="url(#shoe01-inner)" stroke="#ffffff" stroke-width="0.6" opacity="0.8"/>' +
          /* Glossy magenta arch sole */
          '<path d="M252.8,871.5 C253.2,877.5 258.8,880 265.5,880 C272,880 276,876.8 277.2,870.5 L275,863.5 C271.8,871.2 268.6,874.2 264.5,874.2 C259.2,874.2 255.2,871 252.8,871.5 Z" fill="url(#shoe01-sole)" stroke="#831843" stroke-width="0.6"/>' +
          /* Sculpted glass slipper toe box & side walls */
          '<path d="M253.6,849.5 C251.8,860 251.8,872 256.4,876.2 C260.4,879.2 269.6,879.2 273.8,874.8 C278,869.8 278.4,859 276.8,849 C273.5,855.6 269.2,859.2 265,859.2 C260.8,859.2 256.8,855.6 253.6,849.5 Z" fill="url(#shoe01-glass)" stroke="#ffffff" stroke-width="0.95"/>' +
          /* Facet planes & specular glass catchlights */
          '<path d="M255.8,861.5 Q259.5,871.5 266.2,873" fill="none" stroke="#ffffff" stroke-width="1.35" stroke-linecap="round" opacity="0.94"/>' +
          '<path d="M271.5,857.5 Q274.5,864.5 272.2,870.5" fill="none" stroke="#ffffff" stroke-width="0.95" stroke-linecap="round" opacity="0.78"/>' +
          '<path d="M253.6,849.5 C256.8,855.6 260.8,859.2 265,859.2 C269.2,859.2 273.5,855.6 276.8,849" fill="none" stroke="#fbcfe8" stroke-width="0.85" opacity="0.9"/>' +
          /* Beaded crystal ankle strap & dangling droplet charm */
          '<path d="M258.8,828 Q268,834.5 277.2,828" fill="none" stroke="#ffd6ec" stroke-width="2.5" stroke-linecap="round"/>' +
          pearlChain(259.4, 828.2, 268, 833.4, 276.6, 828.2, 5, 1.35, 'shoe01-pearl', '#f9a8d4') +
          '<line x1="259.2" y1="829.5" x2="257.6" y2="835" stroke="#ffffff" stroke-width="0.75"/>' +
          gemDiamond(257.4, 837.2, 2.0, 2.8, 'shoe01-gem', '#ffffff') +
          /* Royal heart crystal & wing brooch on vamp */
          '<path d="M264.8,857.5 C261,852 256,853.5 258,858.5 L264.8,858.5 Z" fill="#e0f2fe" stroke="#ffffff" stroke-width="0.55" opacity="0.88"/>' +
          '<path d="M265.2,857.5 C269,852 274,853.5 272,858.5 L265.2,858.5 Z" fill="#e0f2fe" stroke="#ffffff" stroke-width="0.55" opacity="0.88"/>' +
          '<path d="' + heartPath(265, 859.5, 6.2) + '" fill="url(#shoe01-gem)" stroke="#ffffff" stroke-width="0.65"/>' +
          '<circle cx="263.4" cy="858.4" r="1.05" fill="#ffffff" opacity="0.95"/>' +
          sparkle4(255.5, 853.5, 3.2, '#ffffff', 0.95) +
          sparkle4(273.5, 868.5, 2.6, '#fff7d6', 0.9) +
        '</g>'
    },

    /* ======================================================================
       2. Giày Múa Ba-Lê Ruy-Băng Lụa Hồng
       ====================================================================== */
    {
      id: 'shoe-02',
      name: 'Giày Múa Ba-Lê Ruy-Băng Lụa Hồng',
      icon: '🩰',
      accentColor: '#f472b6',
      previewBox: '220 690 160 205',
      defs:
        lg('shoe02-satin', '0%', '0%', '100%', '100%', [
          ['0%', '#fff1f7'],
          ['32%', '#fbcfe8'],
          ['70%', '#f472b6'],
          ['100%', '#be185d']
        ]) +
        lg('shoe02-ribbon', '0%', '0%', '100%', '0%', [
          ['0%', '#f472b6'],
          ['45%', '#ffe4f2'],
          ['100%', '#db2777']
        ]) +
        lg('shoe02-sole', '0%', '0%', '100%', '0%', [
          ['0%', '#f9a8d4'],
          ['55%', '#db2777'],
          ['100%', '#9d174d']
        ]) +
        rg('shoe02-pearl', '35%', '30%', '68%', [
          ['0%', '#ffffff'],
          ['65%', '#fce7f3'],
          ['100%', '#d8a4c2']
        ]),
      leftSvg:
        '<g>' +
          /* Criss-cross silk satin ballet ribbons hugging calf & ankle */
          crossLaces(744, 848, 6, -0.8, 'url(#shoe02-ribbon)', 2.4) +
          '<path d="M251.8,743 Q269,748 286.2,743" fill="none" stroke="url(#shoe02-ribbon)" stroke-width="2.6" stroke-linecap="round"/>' +
          '<path d="M258.5,826 Q268,831 277.4,826" fill="none" stroke="url(#shoe02-ribbon)" stroke-width="2.6" stroke-linecap="round"/>' +
          /* Flowing satin ribbon bow on outer calf */
          bow25D(248.5, 743.5, 0.85, '#f9a8d4', '#db2777', '#9d174d', 16) +
          pearl(248.5, 743.5, 1.5, 'shoe02-pearl', '#db2777') +
          /* Petite low heel & sculpted pointe sole */
          '<path d="M270.2,850 L275.4,850 L274.5,877 L270.5,877 Z" fill="url(#shoe02-sole)" stroke="#9d174d" stroke-width="0.6"/>' +
          '<path d="M253,872 C253.5,877.5 258.8,879.5 265.2,879.5 C271.5,879.5 275.8,876.5 277,871 L274.5,865 C270,872 260,873 253,872 Z" fill="url(#shoe02-sole)"/>' +
          /* Inner satin lining rim */
          '<path d="M254.5,850.5 Q265,844.5 276.2,850 C276.2,857 271.5,861.5 265,861.5 C259,861.5 254.5,857 254.5,850.5 Z" fill="#fce7f3" opacity="0.6" stroke="#f9a8d4" stroke-width="0.6"/>' +
          /* Satin ballet slipper toe box & pleated pointe platform */
          '<path d="M253.4,849.5 C251.8,860 252.2,872.5 256.8,876.4 C260.8,879 269.2,879 273.6,875.5 C277.8,870.8 278.2,859.5 276.6,849 C273.6,855.5 269.4,859 265,859 C260.8,859 256.6,855.5 253.4,849.5 Z" fill="url(#shoe02-satin)" stroke="#db2777" stroke-width="0.85"/>' +
          /* Gold piping & satin pleats */
          '<path d="M253.6,850 C256.8,856 260.8,859.4 265,859.4 C269.2,859.4 273.4,856 276.4,849.8" fill="none" stroke="#fde68a" stroke-width="0.9"/>' +
          '<path d="M261,871 Q265,873.5 269.5,871" fill="none" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" opacity="0.85"/>' +
          '<path d="M256.8,862 Q259.5,870 264.5,873" fill="none" stroke="#ffffff" stroke-width="1.1" stroke-linecap="round" opacity="0.78"/>' +
          /* Tiny satin rosebud & pearls at throat */
          bow25D(265, 859.5, 0.56, '#ffd6ea', '#f472b6', '#be185d', 4) +
          pearl(265, 859.5, 1.6, 'shoe02-pearl', '#db2777') +
          sparkle4(254.8, 864.5, 2.5, '#ffffff', 0.9) +
        '</g>'
    },

    /* ======================================================================
       3. Giày Mary Jane Tất Ren Cổ Điển
       ====================================================================== */
    {
      id: 'shoe-03',
      name: 'Giày Mary Jane Tất Ren Cổ Điển',
      icon: '🎀',
      accentColor: '#fb7185',
      previewBox: '225 775 150 120',
      defs:
        lg('shoe03-sock', '0%', '0%', '100%', '0%', [
          ['0%', '#fff1f5'],
          ['42%', '#ffffff'],
          ['100%', '#f5d0de']
        ]) +
        lg('shoe03-lace', '0%', '0%', '0%', '100%', [
          ['0%', '#ffffff'],
          ['100%', '#fce7f3']
        ]) +
        lg('shoe03-patent', '10%', '0%', '90%', '100%', [
          ['0%', '#fda4af'],
          ['28%', '#fb7185'],
          ['74%', '#e11d48'],
          ['100%', '#881337']
        ]) +
        lg('shoe03-sole', '0%', '0%', '100%', '0%', [
          ['0%', '#ffe4e6'],
          ['50%', '#fda4af'],
          ['100%', '#be123c']
        ]) +
        rg('shoe03-pearl', '35%', '30%', '68%', [
          ['0%', '#ffffff'],
          ['65%', '#fff1f2'],
          ['100%', '#e2b4c2']
        ]),
      leftSvg:
        '<g>' +
          /* Soft ribbed ivory ankle socks (y=792..865) */
          '<path d="' + legShaftPath(793, 864, 1.3, 1.3, 2, 0) + '" fill="url(#shoe03-sock)" stroke="#f3c6d3" stroke-width="0.7"/>' +
          '<path d="M262,796 L263.5,846 M267,796 L267.5,848 M272,796 L271.5,846" stroke="#f9dbe5" stroke-width="0.65" opacity="0.8"/>' +
          /* Double-layered scalloped eyelet lace ruffle cuff */
          scallopTrim(255.2, 795.5, 281.2, 795.5, 6, 4.5, 'url(#shoe03-lace)', '#f4a9be', 0.65) +
          scallopTrim(255.8, 792, 280.6, 792, 6, 3.8, '#ffffff', '#f9a8d4', 0.6) +
          '<path d="M256.2,790.5 Q268.2,793.5 280.2,790.5" fill="none" stroke="#fb7185" stroke-width="1.6" stroke-linecap="round"/>' +
          bow25D(254.8, 792.5, 0.55, '#fda4af', '#e11d48', '#881337', 8) +
          /* Chunky Mary Jane block heel */
          '<path d="M268.5,852 L276.6,852 L275.8,879.5 L268.8,879.5 Z" fill="url(#shoe03-patent)" stroke="#881337" stroke-width="0.7"/>' +
          /* Scalloped thick cream-rose sole */
          '<path d="M252.2,870.5 C252.6,877.5 258,880.5 265.2,880.5 C272.2,880.5 277.2,877.2 277.8,870.5 L275.5,866 C271,872.2 259,872.5 252.2,870.5 Z" fill="url(#shoe03-sole)" stroke="#9f1239" stroke-width="0.65"/>' +
          /* Glossy cherry-rose Mary Jane shoe body */
          '<path d="M253.2,850 C251.5,860 251.8,872 256.8,875.8 C261,878.5 269.5,878.5 273.8,875 C278.2,870.2 278.2,858.5 276.5,849.5 C273.2,855.5 269,858.5 265,858.5 C260.8,858.5 256.5,855.5 253.2,850 Z" fill="url(#shoe03-patent)" stroke="#881337" stroke-width="0.85"/>' +
          /* Specular patent leather shine */
          '<path d="M255.8,862 Q259,871 266.2,872.8" fill="none" stroke="#ffffff" stroke-width="1.45" stroke-linecap="round" opacity="0.88"/>' +
          '<ellipse cx="261.5" cy="865.5" rx="3.2" ry="1.6" transform="rotate(-22 261.5 865.5)" fill="#ffffff" opacity="0.5"/>' +
          /* Buckled Mary Jane instep strap + satin bow & pearl */
          '<path d="M255,845 Q265.2,850.5 276.4,845" fill="none" stroke="#be123c" stroke-width="3.4" stroke-linecap="round"/>' +
          '<path d="M255,844.5 Q265.2,850 276.4,844.5" fill="none" stroke="#fda4af" stroke-width="1.2" stroke-linecap="round"/>' +
          bow25D(265.2, 846.5, 0.72, '#fecdd3', '#e11d48', '#881337', 5) +
          pearl(265.2, 846.5, 1.75, 'shoe03-pearl', '#be123c') +
          sparkle4(255, 868, 2.3, '#ffffff', 0.9) +
        '</g>'
    },

    /* ======================================================================
       4. Bốt Cao Cổ Thần Tượng Ngôi Sao
       ====================================================================== */
    {
      id: 'shoe-04',
      name: 'Bốt Cao Cổ Thần Tượng Ngôi Sao',
      icon: '👢',
      accentColor: '#a855f7',
      previewBox: '220 690 160 205',
      defs:
        lg('shoe04-boot', '0%', '0%', '100%', '0%', [
          ['0%', '#7e22ce'],
          ['28%', '#c084fc'],
          ['52%', '#f5d0fe'],
          ['78%', '#a855f7'],
          ['100%', '#581c87']
        ]) +
        lg('shoe04-cuff', '0%', '0%', '100%', '100%', [
          ['0%', '#f3e8ff'],
          ['48%', '#c084fc'],
          ['100%', '#6b21a8']
        ]) +
        lg('shoe04-sole', '0%', '0%', '100%', '0%', [
          ['0%', '#d8b4fe'],
          ['55%', '#7e22ce'],
          ['100%', '#3b0764']
        ]) +
        lg('shoe04-gold', '0%', '0%', '100%', '100%', [
          ['0%', '#fef9c3'],
          ['45%', '#facc15'],
          ['100%', '#b45309']
        ]),
      leftSvg:
        '<g>' +
          /* Chunky idol block heel */
          '<path d="M268.2,852 L277,852 L276.2,880.5 L268.4,880.5 Z" fill="url(#shoe04-sole)" stroke="#3b0764" stroke-width="0.75"/>' +
          /* Knee-high metallic go-go boot shaft hugging leg contour */
          '<path d="' + legShaftPath(704, 858, 2.0, 2.0, 8, 0) + '" fill="url(#shoe04-boot)" stroke="#581c87" stroke-width="0.9"/>' +
          /* V-cut idol cuff collar with silver piping */
          '<path d="M252,704 Q269.6,716 287.6,704 L287.2,713 Q269.6,725 252.2,713 Z" fill="url(#shoe04-cuff)" stroke="#4c1d95" stroke-width="0.8"/>' +
          '<path d="M252,704 Q269.6,716 287.6,704" fill="none" stroke="#ffffff" stroke-width="1.3" opacity="0.9"/>' +
          /* Foot box & thick glowing lilac platform sole */
          '<path d="M252.5,850 C251.5,861 251.8,872 256.5,876 C260.5,879 270,879 274.2,875.5 C278,871 278.4,859 277.2,849 Z" fill="url(#shoe04-boot)" stroke="#581c87" stroke-width="0.85"/>' +
          '<path d="M251.8,869 C252.2,877.5 257.8,881 265.2,881 C272.5,881 277.5,877.5 278,869.5 L275.5,867 C270.5,872 259.5,872 251.8,869 Z" fill="url(#shoe04-sole)" stroke="#3b0764" stroke-width="0.7"/>' +
          /* Vertical metallic shine highlight & front zipper seam */
          '<path d="M261,720 C260.5,765 262,812 262.5,862" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" opacity="0.48"/>' +
          '<line x1="271.5" y1="718" x2="270.5" y2="854" stroke="#e9d5ff" stroke-width="0.9" stroke-dasharray="2.5,1.5" opacity="0.85"/>' +
          /* Gold star buckle crest & dangling star chain */
          star5(269.6, 717.5, 5.2, 2.2, 'url(#shoe04-gold)', '#b45309', 0.65) +
          '<path d="M253.5,716 Q261,728 269.6,721" fill="none" stroke="url(#shoe04-gold)" stroke-width="1" stroke-dasharray="1.5,1.2"/>' +
          star5(254.2, 725, 3.3, 1.4, 'url(#shoe04-gold)', '#b45309', 0.45) +
          star5(259.5, 768, 3.8, 1.6, '#fef08a', '#c084fc', 0.5) +
          star5(263.5, 816, 3.2, 1.4, '#fef08a', '#c084fc', 0.5) +
          sparkle4(260, 864, 3.0, '#ffffff', 0.95) +
          sparkle4(278, 742, 2.5, '#f5d0fe', 0.9) +
        '</g>'
    },

    /* ======================================================================
       5. Giày Cao Gót Nữ Hoàng Băng Tuyết
       ====================================================================== */
    {
      id: 'shoe-05',
      name: 'Giày Cao Gót Nữ Hoàng Băng Tuyết',
      icon: '❄️',
      accentColor: '#38bdf8',
      previewBox: '225 775 150 120',
      defs:
        lg('shoe05-ice', '10%', '0%', '90%', '100%', [
          ['0%', '#ffffff', '0.96'],
          ['32%', '#bae6fd', '0.92'],
          ['68%', '#38bdf8', '0.9'],
          ['100%', '#0284c7', '0.96']
        ]) +
        lg('shoe05-prism', '0%', '0%', '100%', '100%', [
          ['0%', '#f0f9ff'],
          ['48%', '#7dd3fc'],
          ['100%', '#0369a1']
        ]) +
        lg('shoe05-silver', '0%', '0%', '100%', '0%', [
          ['0%', '#e0f2fe'],
          ['50%', '#ffffff'],
          ['100%', '#7dd3fc']
        ]) +
        rg('shoe05-gem', '35%', '30%', '68%', [
          ['0%', '#ffffff'],
          ['38%', '#bae6fd'],
          ['78%', '#0ea5e9'],
          ['100%', '#0c4a6e']
        ]),
      leftSvg:
        '<g>' +
          /* Faceted icicle prism stiletto heel */
          '<path d="M270,846 L275.8,846 L274.2,879 L270.4,879 Z" fill="url(#shoe05-prism)" stroke="#e0f2fe" stroke-width="0.7"/>' +
          '<polygon points="272.8,847 274.6,862 272.2,878 271.2,862" fill="#ffffff" opacity="0.62"/>' +
          /* Translucent frosted inner collar */
          '<path d="M254.2,850.5 Q265,843.5 276.6,850 C276.6,857 271.5,861.5 265,861.5 C259,861.5 254.2,857 254.2,850.5 Z" fill="#e0f2fe" opacity="0.52" stroke="#ffffff" stroke-width="0.6"/>' +
          /* Frosted glacier sole */
          '<path d="M252.6,871.5 C253.2,877.5 258.5,880 265.4,880 C272,880 276.2,876.8 277.2,870.5 L275,864 C271.6,871.2 268.4,874.2 264.4,874.2 C259.2,874.2 255.2,871 252.6,871.5 Z" fill="url(#shoe05-prism)" stroke="#0369a1" stroke-width="0.6"/>' +
          /* Crystalline sculpted ice-queen pump upper */
          '<path d="M253.5,849.5 C251.8,860 251.8,872 256.5,876.2 C260.6,879.2 269.6,879.2 273.8,874.8 C278,869.8 278.4,859 276.8,849 C273.5,855.6 269.2,859.2 265,859.2 C260.8,859.2 256.8,855.6 253.5,849.5 Z" fill="url(#shoe05-ice)" stroke="#ffffff" stroke-width="0.95"/>' +
          /* Facet lines & frosted silver collar */
          '<path d="M255.8,862 Q259.5,871.5 266.2,873" fill="none" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round" opacity="0.95"/>' +
          '<path d="M271.6,857.5 Q274.2,864.5 272,870.5" fill="none" stroke="#ffffff" stroke-width="0.9" stroke-linecap="round" opacity="0.8"/>' +
          /* Ice filigree ankle cuff & icicle crown points */
          '<path d="M259,828 Q268,834 277,828" fill="none" stroke="url(#shoe05-silver)" stroke-width="2.4" stroke-linecap="round"/>' +
          '<polygon points="262,828.5 264,821.5 266,829.5 268,820 270,829.5 272,821.5 274,828.5" fill="url(#shoe05-silver)" stroke="#38bdf8" stroke-width="0.55" stroke-linejoin="round"/>' +
          gemDiamond(268, 829.5, 2.0, 2.4, 'shoe05-gem', '#ffffff') +
          /* Crystal snowflake crest on toe vamp */
          snowflake(265, 860, 5.2, '#ffffff', 0.95, 0.98) +
          gemDiamond(265, 860, 1.8, 2.2, 'shoe05-gem', '#ffffff') +
          sparkle4(254.5, 851, 3.1, '#ffffff', 0.95) +
          sparkle4(273.5, 869, 2.5, '#e0f2fe', 0.92) +
        '</g>'
    },

    /* ======================================================================
       6. Sandal Cánh Bướm Tiên Tử
       ====================================================================== */
    {
      id: 'shoe-06',
      name: 'Sandal Cánh Bướm Tiên Tử',
      icon: '🦋',
      accentColor: '#c084fc',
      previewBox: '225 775 150 120',
      defs:
        lg('shoe06-wing', '0%', '0%', '100%', '100%', [
          ['0%', '#fdf4ff', '0.94'],
          ['38%', '#d8b4fe', '0.88'],
          ['75%', '#a855f7', '0.9'],
          ['100%', '#701a75', '0.95']
        ]) +
        lg('shoe06-bed', '0%', '0%', '100%', '100%', [
          ['0%', '#faf5ff'],
          ['50%', '#e9d5ff'],
          ['100%', '#c084fc']
        ]) +
        lg('shoe06-gold', '0%', '0%', '100%', '0%', [
          ['0%', '#fef08a'],
          ['50%', '#fbbf24'],
          ['100%', '#d97706']
        ]) +
        rg('shoe06-gem', '35%', '30%', '68%', [
          ['0%', '#ffffff'],
          ['35%', '#f5d0fe'],
          ['78%', '#a855f7'],
          ['100%', '#4c1d95']
        ]),
      leftSvg:
        '<g>' +
          /* Translucent stained-glass fairy butterfly wings flaring off outer ankle (x:230..262) */
          '<path d="M261,826 C252,816 241,802 239,808 C237.5,814 242,824 253,829 C242,833 238,844 243,849 C248,853 256,844 261,834 Z" fill="url(#shoe06-wing)" stroke="#f5d0fe" stroke-width="0.85"/>' +
          '<path d="M257,826 C250,818 244,810 241,810 M255,831 C247,836 244,842 245,845" fill="none" stroke="#ffffff" stroke-width="0.7" opacity="0.85"/>' +
          '<circle cx="244" cy="814" r="1.3" fill="#ffffff" opacity="0.85"/>' +
          '<circle cx="243" cy="843" r="1.1" fill="#fde047" opacity="0.9"/>' +
          /* Rose-gold stiletto heel */
          '<path d="M270.2,847 L275.5,847 L274.2,879 L270.4,879 Z" fill="url(#shoe06-gold)" stroke="#92400e" stroke-width="0.6"/>' +
          /* Sculpted iridescent lavender sandal footbed & metallic gold platform rim (covers 253..277, 848..878) */
          '<path d="M252.6,872 C253.2,877.8 258.5,880.2 265.2,880.2 C272,880.2 276.2,877 277.4,871 L275.4,864.5 C271.5,871.5 268.2,874.5 264.4,874.5 C259,874.5 255.2,871 252.6,872 Z" fill="url(#shoe06-gold)" stroke="#92400e" stroke-width="0.6"/>' +
          '<path d="M253.6,849.5 C251.8,860 252,872 256.5,876 C260.6,878.8 269.6,878.8 273.8,874.5 C278,869.5 278.4,858.5 276.8,848.5 C273.5,853.5 269.2,856 265,856 C260.8,856 256.8,853.5 253.6,849.5 Z" fill="url(#shoe06-bed)" stroke="url(#shoe06-gold)" stroke-width="0.9"/>' +
          /* Strappy golden vine & violet gem sandal straps across toe, vamp & ankle */
          '<path d="M253.2,865.5 Q265,872.5 276.8,865" fill="none" stroke="url(#shoe06-gold)" stroke-width="2.3" stroke-linecap="round"/>' +
          '<path d="M253.8,856.5 Q265,863 276.6,856" fill="none" stroke="#c084fc" stroke-width="2.1" stroke-linecap="round"/>' +
          '<path d="M265,868 L265,850 M258,849 Q268,855 276.5,849" fill="none" stroke="url(#shoe06-gold)" stroke-width="1.5" stroke-linecap="round"/>' +
          '<path d="M259,825 Q268,832 276.5,826 M258.8,835 Q268,842 276.8,836" fill="none" stroke="url(#shoe06-gold)" stroke-width="1.8" stroke-linecap="round"/>' +
          /* Jeweled butterfly ornament on toe strap */
          '<path d="M264.8,863 C261,858 256.5,860 258,864.5 C259.5,867 264.8,865.5 264.8,865.5 Z" fill="url(#shoe06-wing)" stroke="#ffffff" stroke-width="0.5"/>' +
          '<path d="M265.2,863 C269,858 273.5,860 272,864.5 C270.5,867 265.2,865.5 265.2,865.5 Z" fill="url(#shoe06-wing)" stroke="#ffffff" stroke-width="0.5"/>' +
          gemOval(265, 864.5, 1.6, 2.2, 'shoe06-gem', '#fef08a') +
          gemOval(268, 829, 1.6, 1.6, 'shoe06-gem', '#ffffff') +
          sparkle4(241.5, 805.5, 2.8, '#ffffff', 0.95) +
          sparkle4(274.5, 862, 2.3, '#f5d0fe', 0.9) +
        '</g>'
    },

    /* ======================================================================
       7. Giày Sneaker Đế Mây Cầu Vồng
       ====================================================================== */
    {
      id: 'shoe-07',
      name: 'Giày Sneaker Đế Mây Cầu Vồng',
      icon: '👟',
      accentColor: '#60a5fa',
      previewBox: '225 775 150 120',
      defs:
        lg('shoe07-sky', '0%', '0%', '100%', '100%', [
          ['0%', '#dbeafe'],
          ['35%', '#93c5fd'],
          ['75%', '#60a5fa'],
          ['100%', '#2563eb']
        ]) +
        lg('shoe07-cloud', '0%', '0%', '0%', '100%', [
          ['0%', '#ffffff'],
          ['72%', '#f1f5f9'],
          ['100%', '#cbd5e1']
        ]) +
        lg('shoe07-rainbow', '0%', '0%', '100%', '0%', [
          ['0%', '#fb7185'],
          ['26%', '#fbbf24'],
          ['52%', '#4ade80'],
          ['78%', '#38bdf8'],
          ['100%', '#c084fc']
        ]),
      leftSvg:
        '<g>' +
          /* High-top sneaker tongue & padded pastel ankle collar */
          '<path d="M258.5,826 C261,816 271.5,816 274.5,826 L276.8,848 L256.5,848 Z" fill="url(#shoe07-sky)" stroke="#2563eb" stroke-width="0.8"/>' +
          '<path d="M257.5,825 Q267.5,830 277.2,825 L277.6,833 Q267.5,838 256.8,833 Z" fill="#ffffff" stroke="#93c5fd" stroke-width="0.75"/>' +
          /* Main sky-blue & crisp white sneaker upper */
          '<path d="M253.5,842 C251.5,854 251.5,866 254.5,871 L276.8,871 C279,865 278.8,852 276.8,842 Z" fill="url(#shoe07-sky)" stroke="#1d4ed8" stroke-width="0.85"/>' +
          /* White leather toe-cap overlay */
          '<path d="M253.2,861 C258.5,857 271.5,857 277.2,861 L276.8,869 L253.4,869 Z" fill="#ffffff" stroke="#93c5fd" stroke-width="0.7"/>' +
          /* Pastel rainbow midsole stripe */
          '<path d="M252.2,866.5 Q265,870.5 278,866.5 L278.4,871.5 Q265,875.5 251.8,871.5 Z" fill="url(#shoe07-rainbow)" stroke="#64748b" stroke-width="0.5"/>' +
          /* Puffy scalloped 2.5D cloud midsole & pastel pink tread */
          '<path d="M251.5,871 C250.5,874.5 253,878 256.5,878 C258,880.5 262.5,881 265.2,879.5 C268,881 272.5,880.5 274,878 C277.5,878 279.8,874.5 278.5,871 Q265,875 251.5,871 Z" fill="url(#shoe07-cloud)" stroke="#94a3b8" stroke-width="0.75"/>' +
          '<path d="M255,878.5 Q265,882.2 275.5,878.5" fill="none" stroke="#f472b6" stroke-width="1.6" stroke-linecap="round"/>' +
          /* Criss-cross pastel sneaker laces */
          crossLaces(832, 855, 3, 1.2, '#ffffff', 1.6, '#f472b6', '#ffffff') +
          /* Cute mini angel wing badge on outer side */
          '<path d="M256.5,843 C250.5,839.5 245,842 246.5,846 C248,849 252,849.5 256.5,847.5 Z" fill="#ffffff" stroke="#60a5fa" stroke-width="0.7"/>' +
          '<path d="M255.2,847.5 C250,848.5 247.2,851.5 249.5,853.5 C252,855 255.2,852.5 256.8,850 Z" fill="#e0f2fe" stroke="#60a5fa" stroke-width="0.65"/>' +
          star5(266.8, 821.5, 3.2, 1.4, '#fde047', '#d97706', 0.45) +
          sparkle4(258, 864, 2.5, '#60a5fa', 0.85) +
        '</g>'
    },

    /* ======================================================================
       8. Giày Cao Gót Nàng Tiên Cá Ngọc Trai
       ====================================================================== */
    {
      id: 'shoe-08',
      name: 'Giày Cao Gót Nàng Tiên Cá Ngọc Trai',
      icon: '🧜‍♀️',
      accentColor: '#2dd4bf',
      previewBox: '225 775 150 120',
      defs:
        lg('shoe08-aqua', '10%', '0%', '90%', '100%', [
          ['0%', '#ccfbf1'],
          ['32%', '#5eead4'],
          ['68%', '#14b8a6'],
          ['100%', '#0f766e']
        ]) +
        lg('shoe08-shell', '0%', '0%', '100%', '100%', [
          ['0%', '#fff1f7'],
          ['42%', '#fbcfe8'],
          ['75%', '#99f6e4'],
          ['100%', '#2dd4bf']
        ]) +
        lg('shoe08-coral', '0%', '0%', '100%', '100%', [
          ['0%', '#fecdd3'],
          ['50%', '#fb7185'],
          ['100%', '#be123c']
        ]) +
        rg('shoe08-pearl', '34%', '28%', '68%', [
          ['0%', '#ffffff'],
          ['55%', '#f0fdfa'],
          ['100%', '#99d5cc']
        ]),
      leftSvg:
        '<g>' +
          /* Sculpted curved coral-pearl stiletto heel */
          '<path d="M270.2,847 C273.5,855 274.2,866 273.8,879 L270.4,879 C271.2,866 271.2,855 270.2,847 Z" fill="url(#shoe08-coral)" stroke="#9f1239" stroke-width="0.6"/>' +
          '<path d="M273.5,847 L275.8,847 L274.2,879 L273,879 Z" fill="url(#shoe08-coral)"/>' +
          /* Nacre inner footbed rim */
          '<path d="M254.2,850.5 Q265,844 276.6,850 C276.6,857 271.5,861.5 265,861.5 C259,861.5 254.2,857 254.2,850.5 Z" fill="#ccfbf1" opacity="0.55" stroke="#ffffff" stroke-width="0.6"/>' +
          /* Coral-rose arched sole */
          '<path d="M252.6,871.5 C253.2,877.5 258.5,880 265.4,880 C272,880 276.2,876.8 277.2,870.5 L275,864 C271.6,871.2 268.4,874.2 264.4,874.2 C259.2,874.2 255.2,871 252.6,871.5 Z" fill="url(#shoe08-coral)" stroke="#9f1239" stroke-width="0.6"/>' +
          /* Iridescent seafoam mermaid-scale pump upper */
          '<path d="M253.5,849.5 C251.8,860 251.8,872 256.5,876.2 C260.6,879.2 269.6,879.2 273.8,874.8 C278,869.8 278.4,859 276.8,849 C273.5,855.6 269.2,859.2 265,859.2 C260.8,859.2 256.8,855.6 253.5,849.5 Z" fill="url(#shoe08-aqua)" stroke="#0f766e" stroke-width="0.85"/>' +
          /* Subtle mermaid scale arcs */
          '<path d="M255.5,865 Q259,869 262.5,865 Q266,869 269.5,865 Q273,869 276,865" fill="none" stroke="#ccfbf1" stroke-width="0.85" opacity="0.8"/>' +
          '<path d="M257,870.5 Q261,874 265,870.5 Q269,874 273,870.5" fill="none" stroke="#ccfbf1" stroke-width="0.8" opacity="0.75"/>' +
          /* Scallop seashell fan crest & giant ocean pearl on vamp */
          '<path d="M257.5,858.5 C257.5,852 261.5,849 265,849 C268.5,849 272.5,852 272.5,858.5 Q265,862.5 257.5,858.5 Z" fill="url(#shoe08-shell)" stroke="#ffffff" stroke-width="0.7"/>' +
          '<path d="M261,850 L263,858 M265,849 L265,859 M269,850 L267,858" stroke="#f9a8d4" stroke-width="0.6" opacity="0.8"/>' +
          pearl(265, 859.5, 2.7, 'shoe08-pearl', '#5eead4') +
          /* Double pearl ankle bracelet & dangling mermaid tail charm */
          pearlChain(259, 827, 268, 833, 277, 827, 6, 1.45, 'shoe08-pearl', '#2dd4bf') +
          pearlChain(259, 832, 268, 838, 277, 832, 5, 1.25, 'shoe08-pearl', '#fb7185') +
          '<path d="M257.5,834 L256.8,840 C254,841 253,844.5 255.5,845.5 C256.8,844 257.5,843 257.8,842 C258.2,843 259,844 260,845.5 C262.5,844.5 261.5,841 258.5,840 Z" fill="url(#shoe08-aqua)" stroke="#ffffff" stroke-width="0.5"/>' +
          sparkle4(255.2, 854, 2.8, '#ffffff', 0.95) +
        '</g>'
    },

    /* ======================================================================
       9. Giày Patin Kỳ Lân Kẹo Bông
       ====================================================================== */
    {
      id: 'shoe-09',
      name: 'Giày Patin Kỳ Lân Kẹo Bông',
      icon: '🛼',
      accentColor: '#f472b6',
      previewBox: '220 690 160 205',
      defs:
        lg('shoe09-cotton', '0%', '0%', '100%', '100%', [
          ['0%', '#fdf2f8'],
          ['35%', '#f9a8d4'],
          ['72%', '#c4b5fd'],
          ['100%', '#7dd3fc']
        ]) +
        lg('shoe09-sock', '0%', '0%', '100%', '0%', [
          ['0%', '#fce7f3'],
          ['50%', '#ffffff'],
          ['100%', '#e0e7ff']
        ]) +
        lg('shoe09-plate', '0%', '0%', '100%', '0%', [
          ['0%', '#a7f3d0'],
          ['50%', '#5eead4'],
          ['100%', '#0d9488']
        ]) +
        rg('shoe09-wheel', '36%', '32%', '68%', [
          ['0%', '#ffffff'],
          ['35%', '#fbcfe8'],
          ['78%', '#ec4899'],
          ['100%', '#831843']
        ]) +
        lg('shoe09-horn', '0%', '0%', '100%', '100%', [
          ['0%', '#fef08a'],
          ['50%', '#f472b6'],
          ['100%', '#a855f7']
        ]),
      leftSvg:
        '<g>' +
          /* Rainbow-striped tube sock peeking above the skate cuff */
          '<path d="' + legShaftPath(738, 776, 1.3, 1.3, 0, 0) + '" fill="url(#shoe09-sock)" stroke="#f9a8d4" stroke-width="0.7"/>' +
          '<path d="M252,744 Q269,748 286,744" fill="none" stroke="#f472b6" stroke-width="2.2"/>' +
          '<path d="M252.5,750 Q269,754 285.5,750" fill="none" stroke="#60a5fa" stroke-width="2.2"/>' +
          '<path d="M253,756 Q269,760 285,756" fill="none" stroke="#fde047" stroke-width="2.2"/>' +
          /* High-top cotton-candy unicorn roller skate boot */
          '<path d="' + legShaftPath(766, 848, 2.2, 2.2, 4, 0) + '" fill="url(#shoe09-cotton)" stroke="#db2777" stroke-width="0.85"/>' +
          '<path d="M253.5,843 C251.5,853 251.5,862 254.2,866 L276.8,866 C279,861 278.8,851 277.2,843 Z" fill="url(#shoe09-cotton)" stroke="#db2777" stroke-width="0.85"/>' +
          /* Fluffy pastel collar cuff */
          '<path d="M253,766 Q269,772 284.8,766 L284.4,775 Q269,781 253.5,775 Z" fill="#ffffff" stroke="#f472b6" stroke-width="0.75"/>' +
          /* Rainbow laces up the skate boot */
          crossLaces(780, 845, 5, 1.8, '#ffffff', 1.4, '#fde047', '#ec4899') +
          /* Pastel unicorn wing & golden spiral horn badge on outer cuff */
          '<path d="M255.5,786 C244,776 234,782 239,790 C236,793 239,798 245,797 C244,801 249,803 256,798 Z" fill="#ffffff" stroke="#c084fc" stroke-width="0.7"/>' +
          '<polygon points="256,784 246,770 259,779" fill="url(#shoe09-horn)" stroke="#ffffff" stroke-width="0.6"/>' +
          /* Mint chassis plate, metallic axle truck & front pink star toe-stop */
          '<path d="M252,864.5 Q265,868.5 278.2,864.5 L277.8,870.5 Q265,874 252.4,870.5 Z" fill="url(#shoe09-plate)" stroke="#0f766e" stroke-width="0.65"/>' +
          '<rect x="254.5" y="871" width="21" height="6.2" rx="1.8" fill="#cbd5e1" stroke="#64748b" stroke-width="0.6"/>' +
          /* Quad roller skate wheels (outer-front & inner-rear 2.5D cylinders) */
          '<rect x="249.5" y="869" width="7.2" height="14" rx="3.4" fill="url(#shoe09-wheel)" stroke="#831843" stroke-width="0.7"/>' +
          '<ellipse cx="252.8" cy="876" rx="1.6" ry="3.5" fill="#fef08a"/>' +
          '<rect x="273.5" y="869" width="7.2" height="14" rx="3.4" fill="url(#shoe09-wheel)" stroke="#831843" stroke-width="0.7"/>' +
          '<ellipse cx="277.2" cy="876" rx="1.6" ry="3.5" fill="#fef08a"/>' +
          /* Center front star toe-stopper covering arch gap */
          '<path d="M259.5,871 L270.5,871 L268.8,882.5 Q265,884 261.2,882.5 Z" fill="#f472b6" stroke="#831843" stroke-width="0.7"/>' +
          star5(265, 876.5, 3.8, 1.6, '#fef08a', '#db2777', 0.45) +
          sparkle4(241, 773, 2.8, '#ffffff', 0.95) +
          sparkle4(253, 862, 2.5, '#ffffff', 0.9) +
        '</g>'
    },

    /* ======================================================================
       10. Giày Cao Gót Nhung Đỏ Hoàng Gia
       ====================================================================== */
    {
      id: 'shoe-10',
      name: 'Giày Cao Gót Nhung Đỏ Hoàng Gia',
      icon: '👑',
      accentColor: '#e11d48',
      previewBox: '225 775 150 120',
      defs:
        lg('shoe10-velvet', '0%', '0%', '100%', '100%', [
          ['0%', '#fb7185'],
          ['28%', '#e11d48'],
          ['68%', '#9f1239'],
          ['100%', '#4c0519']
        ]) +
        lg('shoe10-gold', '0%', '0%', '100%', '100%', [
          ['0%', '#fef9c3'],
          ['42%', '#fbbf24'],
          ['100%', '#b45309']
        ]) +
        rg('shoe10-ruby', '35%', '30%', '68%', [
          ['0%', '#ffffff'],
          ['28%', '#fda4af'],
          ['75%', '#e11d48'],
          ['100%', '#4c0519']
        ]),
      leftSvg:
        '<g>' +
          /* Baroque sculpted 24K gold stiletto heel */
          '<path d="M270,846 L275.8,846 L274.2,879 L270.4,879 Z" fill="url(#shoe10-gold)" stroke="#92400e" stroke-width="0.65"/>' +
          '<path d="M272.8,847 L272.5,878" stroke="#fef9c3" stroke-width="0.85" opacity="0.85"/>' +
          /* Plush inner collar rim */
          '<path d="M254.2,850.5 Q265,844 276.6,850 C276.6,857 271.5,861.5 265,861.5 C259,861.5 254.2,857 254.2,850.5 Z" fill="#881337" opacity="0.55" stroke="#fbbf24" stroke-width="0.6"/>' +
          /* Gold-trimmed royal sole */
          '<path d="M252.6,871.5 C253.2,877.5 258.5,880 265.4,880 C272,880 276.2,876.8 277.2,870.5 L275,864 C271.6,871.2 268.4,874.2 264.4,874.2 C259.2,874.2 255.2,871 252.6,871.5 Z" fill="url(#shoe10-gold)" stroke="#78350f" stroke-width="0.6"/>' +
          /* Deep crimson velvet pump body */
          '<path d="M253.5,849.5 C251.8,860 251.8,872 256.5,876.2 C260.6,879.2 269.6,879.2 273.8,874.8 C278,869.8 278.4,859 276.8,849 C273.5,855.6 269.2,859.2 265,859.2 C260.8,859.2 256.8,855.6 253.5,849.5 Z" fill="url(#shoe10-velvet)" stroke="#4c0519" stroke-width="0.9"/>' +
          /* Velvet pile rim highlight & gold embroidery trim */
          '<path d="M253.8,850 C256.8,856 260.8,859.4 265,859.4 C269.2,859.4 273.2,856 276.4,849.6" fill="none" stroke="url(#shoe10-gold)" stroke-width="1.3"/>' +
          '<path d="M256,862 Q259.5,871.5 266,873" fill="none" stroke="#fda4af" stroke-width="1.2" stroke-linecap="round" opacity="0.65"/>' +
          /* Royal gold ankle chain & crown crest */
          '<path d="M258.8,828 Q268,834.5 277.2,828" fill="none" stroke="url(#shoe10-gold)" stroke-width="2.1" stroke-linecap="round"/>' +
          '<circle cx="268" cy="831.2" r="1.8" fill="url(#shoe10-ruby)" stroke="#fef08a" stroke-width="0.5"/>' +
          /* Baroque gold crown & oval ruby cabochon on vamp */
          '<polygon points="260.5,856.5 261.5,851.5 263.8,854.2 265,850 266.2,854.2 268.5,851.5 269.5,856.5" fill="url(#shoe10-gold)" stroke="#92400e" stroke-width="0.5"/>' +
          gemOval(265, 860.5, 2.8, 3.6, 'shoe10-ruby', '#fde047') +
          sparkle4(255.5, 853.5, 2.8, '#fef9c3', 0.95) +
          sparkle4(274.2, 868.5, 2.4, '#ffffff', 0.9) +
        '</g>'
    },

    /* ======================================================================
       11. Bốt Cổ Ngắn Lông Vũ Thiên Nga
       ====================================================================== */
    {
      id: 'shoe-11',
      name: 'Bốt Cổ Ngắn Lông Vũ Thiên Nga',
      icon: '🦢',
      accentColor: '#93c5fd',
      previewBox: '225 775 150 120',
      defs:
        lg('shoe11-satin', '0%', '0%', '100%', '100%', [
          ['0%', '#ffffff'],
          ['34%', '#dbeafe'],
          ['75%', '#93c5fd'],
          ['100%', '#3b82f6']
        ]) +
        lg('shoe11-plume', '0%', '0%', '100%', '100%', [
          ['0%', '#ffffff'],
          ['62%', '#f0f9ff'],
          ['100%', '#bae6fd']
        ]) +
        lg('shoe11-silver', '0%', '0%', '100%', '0%', [
          ['0%', '#cbd5e1'],
          ['50%', '#ffffff'],
          ['100%', '#64748b']
        ]) +
        rg('shoe11-gem', '35%', '30%', '68%', [
          ['0%', '#ffffff'],
          ['40%', '#bae6fd'],
          ['80%', '#38bdf8'],
          ['100%', '#1e3a8a']
        ]),
      leftSvg:
        '<g>' +
          /* Sculpted silver stiletto heel */
          '<path d="M270,847 L275.8,847 L274.2,879.5 L270.4,879.5 Z" fill="url(#shoe11-silver)" stroke="#64748b" stroke-width="0.6"/>' +
          /* Porcelain ice-blue ankle bootie body (y=802..878) */
          '<path d="' + legShaftPath(804, 848, 2.0, 2.0, 2, 0) + '" fill="url(#shoe11-satin)" stroke="#60a5fa" stroke-width="0.8"/>' +
          '<path d="M253.2,847 C251.5,858 251.8,872 256.5,876.2 C260.6,879.2 269.6,879.2 273.8,874.8 C278,869.8 278.2,858 276.8,847 Z" fill="url(#shoe11-satin)" stroke="#60a5fa" stroke-width="0.85"/>' +
          /* Silver swan sole */
          '<path d="M252.6,871.5 C253.2,877.5 258.5,880 265.4,880 C272,880 276.2,876.8 277.2,870.5 L275,865 C271.2,871.5 259,872 252.6,871.5 Z" fill="url(#shoe11-silver)" stroke="#475569" stroke-width="0.6"/>' +
          /* Sweeping sculpted swan-wing feathers embracing outer ankle (x:242..262) */
          '<path d="M259,814 C250,803 241,806 244,815 C241,819 244,826 250,828 C246,833 250,839 258,840 Z" fill="url(#shoe11-plume)" stroke="#93c5fd" stroke-width="0.8"/>' +
          '<path d="M247,813 Q253,816 257,820 M248,823 Q253,825 257,829" fill="none" stroke="#bae6fd" stroke-width="0.8"/>' +
          /* Fluffy cloud-like swan feather cuff around top of bootie */
          '<path d="M253.5,802 C253,795 259,793 262.5,797 C266,792 271.5,792 274.5,797 C278,793.5 282,796 280.5,803 C282,808 277,812 272.5,810 C269.5,813 264.5,813 262,810 C257.5,812 252.5,808 253.5,802 Z" fill="url(#shoe11-plume)" stroke="#93c5fd" stroke-width="0.75"/>' +
          /* Front pearl corset lacing */
          crossLaces(814, 846, 3, 2.2, '#ffffff', 1.2, '#e0f2fe', '#60a5fa') +
          /* Swan crown gem at collar */
          gemOval(267.8, 804.5, 2.2, 2.8, 'shoe11-gem', '#ffffff') +
          '<path d="M256.5,862 Q260.5,871 266.5,873" fill="none" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round" opacity="0.9"/>' +
          sparkle4(243, 806, 2.7, '#ffffff', 0.95) +
          sparkle4(274.5, 864, 2.4, '#e0f2fe', 0.9) +
        '</g>'
    },

    /* ======================================================================
       12. Giày Búp Bê Hoa Anh Đào Mùa Xuân
       ====================================================================== */
    {
      id: 'shoe-12',
      name: 'Giày Búp Bê Hoa Anh Đào Mùa Xuân',
      icon: '🌸',
      accentColor: '#ff85b3',
      previewBox: '225 775 150 120',
      defs:
        lg('shoe12-sakura', '0%', '0%', '100%', '100%', [
          ['0%', '#fff5f9'],
          ['34%', '#fbcfe8'],
          ['72%', '#ff85b3'],
          ['100%', '#db2777']
        ]) +
        lg('shoe12-sole', '0%', '0%', '100%', '0%', [
          ['0%', '#fef2f8'],
          ['52%', '#f472b6'],
          ['100%', '#be185d']
        ]) +
        lg('shoe12-petal', '0%', '0%', '100%', '100%', [
          ['0%', '#ffffff'],
          ['55%', '#ffc4de'],
          ['100%', '#f472b6']
        ]),
      leftSvg:
        '<g>' +
          /* Sweetheart low kitten heel */
          '<path d="M269.6,850 L275.8,850 L274.8,878.5 L270.2,878.5 Z" fill="url(#shoe12-sole)" stroke="#be185d" stroke-width="0.6"/>' +
          /* Soft ivory-blush inner shoe lining */
          '<path d="M254.2,850.5 Q265,844.5 276.4,850 C276.4,857 271.5,861.5 265,861.5 C259,861.5 254.2,857 254.2,850.5 Z" fill="#fff0f6" opacity="0.65" stroke="#f9a8d4" stroke-width="0.6"/>' +
          /* Cream-pink arched dolly sole */
          '<path d="M252.6,871.5 C253.2,877.5 258.5,879.8 265.2,879.8 C271.8,879.8 276.2,876.8 277.2,870.8 L275,864.5 C271.2,871.2 268.2,874 264.4,874 C259,874 255.2,871 252.6,871.5 Z" fill="url(#shoe12-sole)" stroke="#9d174d" stroke-width="0.6"/>' +
          /* Sakura blush doll pump upper */
          '<path d="M253.4,849.5 C251.8,860 251.8,872 256.5,876.2 C260.6,879 269.6,879 273.8,874.8 C278,869.8 278.2,859 276.6,849 C273.4,855.5 269.2,859 265,859 C260.8,859 256.8,855.5 253.4,849.5 Z" fill="url(#shoe12-sakura)" stroke="#db2777" stroke-width="0.85"/>' +
          /* Scalloped sakura petal collar trim */
          '<path d="M254,851 Q259,858.5 265,859.2 Q271,858.5 276,850.5" fill="none" stroke="#ffffff" stroke-width="1.2"/>' +
          /* Ankle ribbon tie & floating sakura petal */
          '<path d="M258.8,828 Q268,834 277.2,828" fill="none" stroke="#f9a8d4" stroke-width="2.3" stroke-linecap="round"/>' +
          bow25D(258, 829, 0.58, '#fbcfe8', '#f472b6', '#be185d', 9) +
          '<ellipse cx="253" cy="842" rx="2.6" ry="1.5" transform="rotate(-35 253 842)" fill="url(#shoe12-petal)" stroke="#f472b6" stroke-width="0.45"/>' +
          /* Lush 5-petal sakura blossom & sage leaf accent on vamp */
          '<path d="M269,857 C273,853.5 275.5,856 273,859.5 Z" fill="#86efac" stroke="#16a34a" stroke-width="0.45"/>' +
          flower5(265, 859.5, 5.4, 'url(#shoe12-petal)', '#fde047', '#f472b6') +
          '<path d="M256.2,864 Q259.5,871.5 265.8,873" fill="none" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" opacity="0.85"/>' +
          sparkle4(255.5, 853, 2.6, '#ffffff', 0.95) +
        '</g>'
    },

    /* ======================================================================
       13. Bốt Đan Dây Ngân Hà Ánh Sao
       ====================================================================== */
    {
      id: 'shoe-13',
      name: 'Bốt Đan Dây Ngân Hà Ánh Sao',
      icon: '🌙',
      accentColor: '#6366f1',
      previewBox: '220 690 160 205',
      defs:
        lg('shoe13-galaxy', '0%', '0%', '100%', '100%', [
          ['0%', '#312e81'],
          ['32%', '#4f46e5'],
          ['65%', '#6366f1'],
          ['100%', '#1e1b4b']
        ]) +
        lg('shoe13-sole', '0%', '0%', '100%', '0%', [
          ['0%', '#1e1b4b'],
          ['50%', '#4338ca'],
          ['100%', '#0f172a']
        ]) +
        lg('shoe13-gold', '0%', '0%', '100%', '100%', [
          ['0%', '#fef9c3'],
          ['48%', '#facc15'],
          ['100%', '#b45309']
        ]),
      leftSvg:
        '<g>' +
          /* Chunky cosmic lugged block heel */
          '<path d="M268.2,852 L277.2,852 L276.4,881 L268.4,881 Z" fill="url(#shoe13-sole)" stroke="#0f172a" stroke-width="0.75"/>' +
          /* Tall midnight-galaxy lace-up combat boot shaft (y=712..858) */
          '<path d="' + legShaftPath(712, 858, 2.0, 2.0, 2, 0) + '" fill="url(#shoe13-galaxy)" stroke="#1e1b4b" stroke-width="0.9"/>' +
          /* Toe box & thick platform lug sole */
          '<path d="M252.2,850 C251.4,860 251.6,872 256.2,876 C260.2,879 270,879 274.2,875.5 C278,871 278.4,859 277.2,849 Z" fill="url(#shoe13-galaxy)" stroke="#1e1b4b" stroke-width="0.85"/>' +
          '<path d="M251.6,869 C252,877.5 257.6,881.2 265.2,881.2 C272.5,881.2 277.6,877.5 278.2,869.5 L275.5,867 C270.2,872.2 259.5,872.2 251.6,869 Z" fill="url(#shoe13-sole)" stroke="#0f172a" stroke-width="0.7"/>' +
          /* Galactic shimmer & twinkling stars across shaft */
          '<path d="M257.5,738 C258.5,775 260,812 261,852" fill="none" stroke="#a5b4fc" stroke-width="2" stroke-linecap="round" opacity="0.45"/>' +
          /* Full criss-cross silver corset laces + gold eyelets */
          crossLaces(734, 846, 8, 2.5, '#e0e7ff', 1.15, '#fde047', '#312e81') +
          /* Gold crescent-moon cuff strap at top of boot */
          '<path d="M251.5,716 Q269.5,722.5 287.5,716 L287.2,724.5 Q269.5,731 251.8,724.5 Z" fill="#1e1b4b" stroke="url(#shoe13-gold)" stroke-width="0.85"/>' +
          '<path d="M266.2,718.5 A3.8,3.8 0 1 0 272.4,722.5 A3.1,3.1 0 1 1 266.2,718.5 Z" fill="url(#shoe13-gold)" stroke="#b45309" stroke-width="0.35"/>' +
          /* Cosmic stars & galaxy sparkles */
          star5(257, 756, 2.8, 1.2, '#fef08a', '#6366f1', 0.35) +
          star5(276.5, 792, 2.6, 1.1, '#fef08a', '#6366f1', 0.35) +
          sparkle4(260, 864, 3.0, '#e0e7ff', 0.95) +
          sparkle4(254, 738, 2.4, '#ffffff', 0.9) +
        '</g>'
    },

    /* ======================================================================
       14. Giày Đế Xuồng Dâu Tây Kem Ngọt
       ====================================================================== */
    {
      id: 'shoe-14',
      name: 'Giày Đế Xuồng Dâu Tây Kem Ngọt',
      icon: '🍓',
      accentColor: '#fb7185',
      previewBox: '225 775 150 120',
      defs:
        lg('shoe14-berry', '0%', '0%', '100%', '100%', [
          ['0%', '#fda4af'],
          ['32%', '#fb7185'],
          ['72%', '#e11d48'],
          ['100%', '#9f1239']
        ]) +
        lg('shoe14-wedge', '0%', '0%', '100%', '100%', [
          ['0%', '#fef3c7'],
          ['48%', '#fcd34d'],
          ['100%', '#d97706']
        ]) +
        lg('shoe14-cream', '0%', '0%', '0%', '100%', [
          ['0%', '#ffffff'],
          ['100%', '#ffe4ec']
        ]),
      leftSvg:
        '<g>' +
          /* Sculpted waffle-cone cake wedge heel & sole (covers 252.5..277.8, y:850..880) */
          '<path d="M252.4,864.5 L277.6,852 L276.6,876.5 C273.5,879.8 257.5,880.5 253.2,876 Z" fill="url(#shoe14-wedge)" stroke="#b45309" stroke-width="0.7"/>' +
          '<path d="M256,874 L268,862 M262,877 L275,863 M269,877 L276,870" stroke="#d97706" stroke-width="0.6" opacity="0.55"/>' +
          /* Whipped cream scalloped icing band along wedge top */
          '<path d="M252.5,863 C255,868.5 258.5,868.5 261,864 C263.5,869 267,869 269.5,864 C272,868.5 275.5,868 277.6,862 L277.5,857 L252.8,858 Z" fill="url(#shoe14-cream)" stroke="#f9a8d4" stroke-width="0.65"/>' +
          /* Glossy strawberry-red patent upper */
          '<path d="M253.4,849.5 C252.2,856 252.4,862 254.8,864.5 Q265,869.5 275.8,863.5 C277.6,860 277.8,853.5 276.6,848.8 C273.4,854.5 269,857.5 265,857.5 C260.8,857.5 256.8,854.5 253.4,849.5 Z" fill="url(#shoe14-berry)" stroke="#9f1239" stroke-width="0.8"/>' +
          /* Cute ankle strap & strawberry gingham bow */
          '<path d="M258.8,828 Q268,834 277.2,828" fill="none" stroke="#fb7185" stroke-width="2.5" stroke-linecap="round"/>' +
          '<path d="M258.8,828 Q268,834 277.2,828" fill="none" stroke="#ffffff" stroke-width="0.8" stroke-dasharray="1.8,1.8"/>' +
          bow25D(268, 831, 0.65, '#fecdd3', '#fb7185', '#9f1239', 6) +
          /* 2.5D Fresh Strawberry charm with green calyx leaves on vamp */
          '<path d="M261.2,856.5 C261,861.5 263.5,865 265,865 C266.5,865 269,861.5 268.8,856.5 C268.5,854.2 261.5,854.2 261.2,856.5 Z" fill="#e11d48" stroke="#881337" stroke-width="0.65"/>' +
          '<path d="M261.5,855.5 L263.5,853 L265,855.2 L266.5,853 L268.5,855.5 Q265,857 261.5,855.5 Z" fill="#22c55e" stroke="#15803d" stroke-width="0.45"/>' +
          '<circle cx="263.6" cy="858.5" r="0.55" fill="#fef08a"/>' +
          '<circle cx="266.2" cy="859" r="0.55" fill="#fef08a"/>' +
          '<circle cx="265" cy="861.8" r="0.55" fill="#fef08a"/>' +
          sparkle4(255.8, 855.5, 2.5, '#ffffff', 0.92) +
        '</g>'
    },

    /* ======================================================================
       15. Sandal Chiến Binh Pha Lê Ánh Vàng
       ====================================================================== */
    {
      id: 'shoe-15',
      name: 'Sandal Chiến Binh Pha Lê Ánh Vàng',
      icon: '⭐',
      accentColor: '#eab308',
      previewBox: '220 690 160 205',
      defs:
        lg('shoe15-gold', '0%', '0%', '100%', '100%', [
          ['0%', '#fef9c3'],
          ['32%', '#fde047'],
          ['68%', '#eab308'],
          ['100%', '#a16207']
        ]) +
        lg('shoe15-bed', '0%', '0%', '100%', '100%', [
          ['0%', '#fffbeb'],
          ['50%', '#fef3c7'],
          ['100%', '#f59e0b']
        ]) +
        rg('shoe15-gem', '36%', '30%', '68%', [
          ['0%', '#ffffff'],
          ['32%', '#fef08a'],
          ['75%', '#f59e0b'],
          ['100%', '#78350f']
        ]),
      leftSvg:
        '<g>' +
          /* Slender golden stiletto heel */
          '<path d="M270.2,847 L275.6,847 L274.2,879.5 L270.4,879.5 Z" fill="url(#shoe15-gold)" stroke="#854d0e" stroke-width="0.6"/>' +
          /* Contoured champagne-gold sandal footbed & sole (covers 253..277, 848..878) */
          '<path d="M252.6,871.5 C253.2,877.5 258.5,880 265.4,880 C272,880 276.2,876.8 277.2,870.5 L275,864.5 C271.5,871.5 268.2,874.2 264.4,874.2 C259,874.2 255.2,871 252.6,871.5 Z" fill="url(#shoe15-gold)" stroke="#854d0e" stroke-width="0.6"/>' +
          '<path d="M253.5,849.5 C251.8,860 251.8,872 256.5,876 C260.6,878.8 269.6,878.8 273.8,874.5 C278,869.5 278.4,858.5 276.8,848.5 C273.5,853.5 269.2,856 265,856 C260.8,856 256.8,853.5 253.5,849.5 Z" fill="url(#shoe15-bed)" stroke="url(#shoe15-gold)" stroke-width="0.9"/>' +
          /* Sunburst gladiator straps over toe & instep */
          '<path d="M253.2,866 Q265,872.5 276.8,865.5" fill="none" stroke="url(#shoe15-gold)" stroke-width="2.6" stroke-linecap="round"/>' +
          '<path d="M253.8,857 Q265,863 276.5,856.5" fill="none" stroke="url(#shoe15-gold)" stroke-width="2.2" stroke-linecap="round"/>' +
          '<path d="M265,869 L265,847" fill="none" stroke="url(#shoe15-gold)" stroke-width="2.2"/>' +
          /* Tall climbing warrior gladiator straps hugging exact calf contour up to y=724 */
          crossLaces(726, 846, 6, -0.7, 'url(#shoe15-gold)', 2.0) +
          '<path d="M252,724 Q269.5,730 286.8,724" fill="none" stroke="url(#shoe15-gold)" stroke-width="2.6" stroke-linecap="round"/>' +
          '<path d="M257.5,805 Q268,811 278.8,805" fill="none" stroke="url(#shoe15-gold)" stroke-width="2.2" stroke-linecap="round"/>' +
          /* Sculpted golden laurel wings flaring gracefully off upper calf */
          '<path d="M253,725 C244,719 240,724 246,729 C241,731 242,737 249,736 C246,740 249,745 255,741 Z" fill="url(#shoe15-gold)" stroke="#92400e" stroke-width="0.65"/>' +
          /* Radiant sun-crystal star emblems */
          star5(265, 864.5, 4.4, 1.9, 'url(#shoe15-gold)', '#92400e', 0.5) +
          gemDiamond(265, 864.5, 1.6, 2.0, 'shoe15-gem', '#ffffff') +
          gemDiamond(269.2, 726.5, 1.8, 2.5, 'shoe15-gem', '#ffffff') +
          sparkle4(243.5, 720, 2.8, '#ffffff', 0.95) +
          sparkle4(274.5, 860, 2.5, '#fef9c3', 0.92) +
        '</g>'
    },

    /* ======================================================================
       16. Giày Cao Gót Hoa Hồng Vàng Champagne
       ====================================================================== */
    {
      id: 'shoe-16',
      name: 'Giày Cao Gót Hoa Hồng Vàng Champagne',
      icon: '🌹',
      accentColor: '#f59e0b',
      previewBox: '225 775 150 120',
      defs:
        lg('shoe16-champagne', '0%', '0%', '100%', '100%', [
          ['0%', '#fffbeb'],
          ['32%', '#fde68a'],
          ['68%', '#f59e0b'],
          ['100%', '#b45309']
        ]) +
        lg('shoe16-rose', '0%', '0%', '100%', '100%', [
          ['0%', '#fecdd3'],
          ['40%', '#fb7185'],
          ['80%', '#e11d48'],
          ['100%', '#881337']
        ]) +
        lg('shoe16-gold', '0%', '0%', '100%', '0%', [
          ['0%', '#fef3c7'],
          ['50%', '#fbbf24'],
          ['100%', '#92400e']
        ]),
      leftSvg:
        '<g>' +
          /* Champagne-gold mirror stiletto heel */
          '<path d="M270.2,847 L275.6,847 L274.2,879.5 L270.4,879.5 Z" fill="url(#shoe16-gold)" stroke="#92400e" stroke-width="0.6"/>' +
          /* Champagne satin inner rim */
          '<path d="M254.2,850.5 Q265,844 276.6,850 C276.6,857 271.5,861.5 265,861.5 C259,861.5 254.2,857 254.2,850.5 Z" fill="#fef3c7" opacity="0.58" stroke="#fbbf24" stroke-width="0.6"/>' +
          /* Burnished gold sole */
          '<path d="M252.6,871.5 C253.2,877.5 258.5,880 265.4,880 C272,880 276.2,876.8 277.2,870.5 L275,864 C271.6,871.2 268.4,874.2 264.4,874.2 C259.2,874.2 255.2,871 252.6,871.5 Z" fill="url(#shoe16-gold)" stroke="#78350f" stroke-width="0.6"/>' +
          /* Champagne silk pump upper */
          '<path d="M253.5,849.5 C251.8,860 251.8,872 256.5,876.2 C260.6,879.2 269.6,879.2 273.8,874.8 C278,869.8 278.4,859 276.8,849 C273.5,855.6 269.2,859.2 265,859.2 C260.8,859.2 256.8,855.6 253.5,849.5 Z" fill="url(#shoe16-champagne)" stroke="#b45309" stroke-width="0.85"/>' +
          /* Winding rose-gold vine tendrils up the ankle */
          '<path d="M275.5,848 C278.5,838 259,835 259,828 C259,823 272,824 276.5,820" fill="none" stroke="url(#shoe16-gold)" stroke-width="1.65" stroke-linecap="round"/>' +
          '<path d="M256.5,862 Q260,871.5 266.2,873" fill="none" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round" opacity="0.88"/>' +
          /* Multi-layered 2.5D Crimson Velvet Rose & Emerald Leaves on vamp */
          '<path d="M258,856 C255,852 258,849 261.5,853 Z" fill="#10b981" stroke="#065f46" stroke-width="0.45"/>' +
          '<path d="M272,856 C275,852 272,849 268.5,853 Z" fill="#10b981" stroke="#065f46" stroke-width="0.45"/>' +
          '<circle cx="265" cy="857.5" r="5.2" fill="url(#shoe16-rose)" stroke="#881337" stroke-width="0.65"/>' +
          '<path d="M261.5,856.5 C262.5,853 267.5,853 268.5,856.5 C267,859 263,859 261.5,856.5 Z" fill="#fb7185" stroke="#fff1f2" stroke-width="0.5"/>' +
          '<path d="M263.4,856.5 C264.2,854.8 265.8,854.8 266.6,856.5" fill="none" stroke="#ffe4e6" stroke-width="0.85"/>' +
          sparkle4(255.2, 853, 2.7, '#ffffff', 0.95) +
          sparkle4(273.8, 868, 2.3, '#fef3c7', 0.92) +
        '</g>'
    },

    /* ======================================================================
       17. Bốt Tai Thỏ Bông Tuyết Ngọt Ngào
       ====================================================================== */
    {
      id: 'shoe-17',
      name: 'Bốt Tai Thỏ Bông Tuyết Ngọt Ngào',
      icon: '🐰',
      accentColor: '#f9a8d4',
      previewBox: '220 690 160 205',
      defs:
        lg('shoe17-suede', '0%', '0%', '100%', '0%', [
          ['0%', '#fbcfe8'],
          ['42%', '#f9a8d4'],
          ['78%', '#f472b6'],
          ['100%', '#db2777']
        ]) +
        lg('shoe17-fur', '0%', '0%', '0%', '100%', [
          ['0%', '#ffffff'],
          ['65%', '#fdf2f8'],
          ['100%', '#fbcfe8']
        ]) +
        lg('shoe17-sole', '0%', '0%', '0%', '100%', [
          ['0%', '#ffffff'],
          ['60%', '#ffe4f2'],
          ['100%', '#f9a8d4']
        ]),
      leftSvg:
        '<g>' +
          /* Upright plush bunny ears rising above fluffy cuff (y=700..748) */
          '<path d="M256.5,746 C251.5,725 251.5,703 257,701 C261.5,699.5 264.5,716 264.5,744 Z" fill="url(#shoe17-fur)" stroke="#f472b6" stroke-width="0.85"/>' +
          '<path d="M257,742 C254.5,726 254.8,708 257.8,706.5 C260.2,705.5 261.8,720 261.5,741 Z" fill="#fbcfe8"/>' +
          '<path d="M270.5,745 C271.5,718 275.5,700 280,702 C285,704 284,726 279,746 Z" fill="url(#shoe17-fur)" stroke="#f472b6" stroke-width="0.85"/>' +
          '<path d="M273,742 C274,721 276.5,706.5 278.8,707.5 C281.2,708.5 280.6,725 277.6,742 Z" fill="#fbcfe8"/>' +
          /* Cozy mid-calf pastel strawberry-milk suede boot shaft */
          '<path d="' + legShaftPath(748, 858, 2.3, 2.3, 0, 0) + '" fill="url(#shoe17-suede)" stroke="#db2777" stroke-width="0.85"/>' +
          '<path d="M252.5,850 C251.4,860 251.6,871 256,874.5 L274.8,874.5 C278.2,870.5 278.4,859 277.2,849 Z" fill="url(#shoe17-suede)" stroke="#db2777" stroke-width="0.85"/>' +
          /* Chunky marshmallow platform sole */
          '<path d="M251.6,869 C252,877.5 257.6,881 265.2,881 C272.5,881 277.6,877.5 278.2,869.5 L275.5,867 C270,872.2 259.5,872.2 251.6,869 Z" fill="url(#shoe17-sole)" stroke="#f472b6" stroke-width="0.75"/>' +
          /* Cloud-fluffy faux-fur collar around y=744..766 */
          '<path d="M252,750 C250,742 256,738 261,743 C265,738 272,738 275.5,743 C281,738 287,742 285.5,750 C287,758 281,763 275.5,760 C272,764 265,764 261.5,760 C256,763 250,758 252,750 Z" fill="url(#shoe17-fur)" stroke="#f9a8d4" stroke-width="0.8"/>' +
          /* Fluffy pom-pom bunny tail charm & satin ribbon bow */
          '<circle cx="250.5" cy="762.5" r="4.5" fill="url(#shoe17-fur)" stroke="#f472b6" stroke-width="0.7"/>' +
          bow25D(268.8, 761.5, 0.72, '#ffe4f2', '#f472b6', '#be185d', 8) +
          '<path d="' + heartPath(268.8, 761.5, 3.2) + '" fill="#ec4899" stroke="#ffffff" stroke-width="0.4"/>' +
          '<path d="M258.5,772 C259,804 260,832 260.5,856" fill="none" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round" opacity="0.5"/>' +
          sparkle4(248.5, 718, 2.6, '#ffffff', 0.95) +
          sparkle4(258, 864, 2.4, '#ffffff', 0.9) +
        '</g>'
    },

    /* ======================================================================
       18. Giày Thủy Tinh Ánh Trăng Pha Lê Tím
       ====================================================================== */
    {
      id: 'shoe-18',
      name: 'Giày Thủy Tinh Ánh Trăng Pha Lê Tím',
      icon: '💎',
      accentColor: '#8b5cf6',
      previewBox: '225 775 150 120',
      defs:
        lg('shoe18-amethyst', '10%', '0%', '90%', '100%', [
          ['0%', '#ffffff', '0.96'],
          ['28%', '#e9d5ff', '0.92'],
          ['68%', '#8b5cf6', '0.92'],
          ['100%', '#4c1d95', '0.96']
        ]) +
        lg('shoe18-prism', '0%', '0%', '100%', '100%', [
          ['0%', '#f5f3ff'],
          ['48%', '#a78bfa'],
          ['100%', '#5b21b6']
        ]) +
        rg('shoe18-gem', '35%', '30%', '68%', [
          ['0%', '#ffffff'],
          ['32%', '#ddd6fe'],
          ['75%', '#7c3aed'],
          ['100%', '#2e1065']
        ]),
      leftSvg:
        '<g>' +
          /* Multi-faceted violet prism stiletto heel */
          '<path d="M270,846.5 L275.8,846.5 L274.2,879.5 L270.4,879.5 Z" fill="url(#shoe18-prism)" stroke="#ddd6fe" stroke-width="0.65"/>' +
          '<polygon points="272.6,847.5 274.5,863 272.2,878 271.2,863" fill="#ffffff" opacity="0.55"/>' +
          /* Translucent lilac inner slipper contour */
          '<path d="M254.2,850.5 Q265,844 276.6,850 C276.6,857 271.5,861.5 265,861.5 C259,861.5 254.2,857 254.2,850.5 Z" fill="#ede9fe" opacity="0.52" stroke="#ffffff" stroke-width="0.6"/>' +
          /* Amethyst prism sole */
          '<path d="M252.6,871.5 C253.2,877.5 258.5,880 265.4,880 C272,880 276.2,876.8 277.2,870.5 L275,864 C271.6,871.2 268.4,874.2 264.4,874.2 C259.2,874.2 255.2,871 252.6,871.5 Z" fill="url(#shoe18-prism)" stroke="#4c1d95" stroke-width="0.6"/>' +
          /* Moonlight crystal glass slipper body */
          '<path d="M253.5,849.5 C251.8,860 251.8,872 256.5,876.2 C260.6,879.2 269.6,879.2 273.8,874.8 C278,869.8 278.4,859 276.8,849 C273.5,855.6 269.2,859.2 265,859.2 C260.8,859.2 256.8,855.6 253.5,849.5 Z" fill="url(#shoe18-amethyst)" stroke="#ffffff" stroke-width="0.95"/>' +
          /* Silver filigree ankle band & dangling crescent moon */
          '<path d="M258.8,828 Q268,834.5 277.2,828" fill="none" stroke="#e9d5ff" stroke-width="2.3" stroke-linecap="round"/>' +
          '<path d="M266.2,832.5 A2.6,2.6 0 1 0 270.4,835.5 A2.1,2.1 0 1 1 266.2,832.5 Z" fill="#fef08a" stroke="#7c3aed" stroke-width="0.35"/>' +
          /* Cut-amethyst teardrop diamond brooch framed in silver filigree */
          gemDiamond(265, 860, 4.2, 5.4, 'shoe18-gem', '#ffffff') +
          '<path d="M256,862 Q259.5,871.5 266,873" fill="none" stroke="#ffffff" stroke-width="1.35" stroke-linecap="round" opacity="0.92"/>' +
          sparkle4(255.2, 853.5, 3.0, '#ffffff', 0.95) +
          sparkle4(274.2, 867.5, 2.5, '#e9d5ff', 0.9) +
        '</g>'
    },

    /* ======================================================================
       19. Giày Loafer Học Viện Tất Cao Cổ
       ====================================================================== */
    {
      id: 'shoe-19',
      name: 'Giày Loafer Học Viện Tất Cao Cổ',
      icon: '🎓',
      accentColor: '#b45309',
      previewBox: '220 690 160 205',
      defs:
        lg('shoe19-leather', '0%', '0%', '100%', '100%', [
          ['0%', '#d97706'],
          ['32%', '#b45309'],
          ['72%', '#78350f'],
          ['100%', '#451a03']
        ]) +
        lg('shoe19-sock', '0%', '0%', '100%', '0%', [
          ['0%', '#fefce8'],
          ['46%', '#ffffff'],
          ['100%', '#e7e5e4']
        ]) +
        lg('shoe19-gold', '0%', '0%', '100%', '100%', [
          ['0%', '#fef9c3'],
          ['50%', '#facc15'],
          ['100%', '#b45309']
        ]),
      leftSvg:
        '<g>' +
          /* Crisp ivory ribbed knee-high academy socks up to y=708 */
          '<path d="' + legShaftPath(708, 855, 1.3, 1.3, 2, 0) + '" fill="url(#shoe19-sock)" stroke="#d6d3d1" stroke-width="0.75"/>' +
          '<path d="M261,724 L263,842 M268,724 L268,844 M275,724 L273,842" stroke="#e7e5e4" stroke-width="0.65" opacity="0.85"/>' +
          /* Royal academy navy & gold varsity stripe cuff at top */
          '<path d="M252.2,713 Q269.6,717.5 286.8,713" fill="none" stroke="#1e3a8a" stroke-width="3.4"/>' +
          '<path d="M252,718.5 Q269.6,723 287,718.5" fill="none" stroke="#1e3a8a" stroke-width="1.8"/>' +
          '<path d="M252,716 Q269.6,720.5 287,716" fill="none" stroke="#facc15" stroke-width="1.1"/>' +
          /* Mini gold academy shield badge on outer cuff */
          '<path d="M250.5,713 L256.5,713 L256.5,717.5 Q253.5,720.5 250.5,717.5 Z" fill="url(#shoe19-gold)" stroke="#1e3a8a" stroke-width="0.6"/>' +
          /* Stacked wood-grain low loafer block heel */
          '<path d="M268.4,852 L276.6,852 L275.8,879.5 L268.6,879.5 Z" fill="#451a03" stroke="#292524" stroke-width="0.7"/>' +
          /* Chocolate-caramel penny loafer body & dark stitched welt sole */
          '<path d="M252.2,870.5 C252.8,877.5 258.2,880 265.2,880 C272,880 277,877 277.6,870.5 L275.2,866.5 C270.5,872 259,872.5 252.2,870.5 Z" fill="#292524" stroke="#1c1917" stroke-width="0.65"/>' +
          '<path d="M253.2,847 C251.5,858 251.8,871 256.8,875.2 C261,878 269.5,878 273.8,874.5 C278,869.8 278.2,857 276.6,846.5 C272.5,843 257.5,843 253.2,847 Z" fill="url(#shoe19-leather)" stroke="#451a03" stroke-width="0.85"/>' +
          /* Classic moccasin apron seam */
          '<path d="M256.5,856 C256.5,867 273.5,867 273.5,856" fill="none" stroke="#fef3c7" stroke-width="0.8" stroke-dasharray="1.8,1.2" opacity="0.8"/>' +
          /* Penny loafer saddle strap with gleaming gold crest coin */
          '<path d="M253.6,852 Q265,856 276.6,852 L276.4,857 Q265,861 253.8,857 Z" fill="#78350f" stroke="#451a03" stroke-width="0.65"/>' +
          '<circle cx="265" cy="856" r="2.6" fill="url(#shoe19-gold)" stroke="#78350f" stroke-width="0.5"/>' +
          '<path d="M256,863 Q259,870.5 264.5,872" fill="none" stroke="#fde68a" stroke-width="1.2" stroke-linecap="round" opacity="0.65"/>' +
          sparkle4(266.2, 854.5, 2.2, '#ffffff', 0.9) +
        '</g>'
    },

    /* ======================================================================
       20. Giày Cao Gót Kẹo Mút Macaron
       ====================================================================== */
    {
      id: 'shoe-20',
      name: 'Giày Cao Gót Kẹo Mút Macaron',
      icon: '🍭',
      accentColor: '#ec4899',
      previewBox: '225 775 150 120',
      defs:
        lg('shoe20-candy', '0%', '0%', '100%', '100%', [
          ['0%', '#fbcfe8'],
          ['32%', '#f472b6'],
          ['68%', '#ec4899'],
          ['100%', '#9d174d']
        ]) +
        lg('shoe20-mint', '0%', '0%', '100%', '0%', [
          ['0%', '#a7f3d0'],
          ['52%', '#6ee7b7'],
          ['100%', '#059669']
        ]) +
        lg('shoe20-peppermint', '0%', '0%', '0%', '100%', [
          ['0%', '#ffffff'],
          ['20%', '#f43f5e'],
          ['40%', '#ffffff'],
          ['60%', '#f43f5e'],
          ['80%', '#ffffff'],
          ['100%', '#f43f5e']
        ]),
      leftSvg:
        '<g>' +
          /* Spiral peppermint candy-cane stiletto heel */
          '<path d="M270.2,847 L275.6,847 L274.2,879.5 L270.4,879.5 Z" fill="url(#shoe20-peppermint)" stroke="#be123c" stroke-width="0.65"/>' +
          /* Pastel cream-icing inner rim */
          '<path d="M254.2,850.5 Q265,844 276.6,850 C276.6,857 271.5,861.5 265,861.5 C259,861.5 254.2,857 254.2,850.5 Z" fill="#fdf2f8" opacity="0.62" stroke="#f9a8d4" stroke-width="0.6"/>' +
          /* Mint-cream candy sole */
          '<path d="M252.6,871.5 C253.2,877.5 258.5,880 265.4,880 C272,880 276.2,876.8 277.2,870.5 L275,864 C271.6,871.2 268.4,874.2 264.4,874.2 C259.2,874.2 255.2,871 252.6,871.5 Z" fill="url(#shoe20-mint)" stroke="#047857" stroke-width="0.6"/>' +
          /* Glossy bubblegum-magenta upper */
          '<path d="M253.5,849.5 C251.8,860 251.8,872 256.5,876.2 C260.6,879.2 269.6,879.2 273.8,874.8 C278,869.8 278.4,859 276.8,849 C273.5,855.6 269.2,859.2 265,859.2 C260.8,859.2 256.8,855.6 253.5,849.5 Z" fill="url(#shoe20-candy)" stroke="#9d174d" stroke-width="0.85"/>' +
          /* White sugar icing drip collar */
          '<path d="M253.8,850.5 C256,855 258,856.5 259.2,860 C260.5,856.5 263,858.5 265,861 C267,858.5 269.5,856.5 270.8,860 C272,856.5 274,855 276.4,850" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round"/>' +
          /* Swirl lollipop charm on ankle strap */
          '<path d="M258.8,828 Q268,834 277.2,828" fill="none" stroke="url(#shoe20-mint)" stroke-width="2.4" stroke-linecap="round"/>' +
          '<circle cx="257.5" cy="832" r="3.4" fill="#ffffff" stroke="#ec4899" stroke-width="0.75"/>' +
          '<path d="M257.5,832 m-2,0 a2,2 0 1,0 4,0 a1.3,1.3 0 1,0 -2.6,0 a0.7,0.7 0 1,0 1.4,0" fill="none" stroke="#f43f5e" stroke-width="0.85" stroke-linecap="round"/>' +
          /* Pastel 2.5D Macaron cookie ornament on vamp */
          '<ellipse cx="265" cy="856.5" rx="4.8" ry="2.2" fill="#a7f3d0" stroke="#059669" stroke-width="0.5"/>' +
          '<rect x="260.4" y="857.4" width="9.2" height="2" rx="1" fill="#ffffff"/>' +
          '<ellipse cx="265" cy="860.4" rx="4.8" ry="2.2" fill="#f9a8d4" stroke="#db2777" stroke-width="0.5"/>' +
          /* Sugar rainbow sprinkles */
          '<circle cx="258" cy="867" r="0.9" fill="#fde047"/>' +
          '<circle cx="264" cy="870.5" r="0.9" fill="#a7f3d0"/>' +
          '<circle cx="271.5" cy="866.5" r="0.9" fill="#ffffff"/>' +
          sparkle4(255.2, 853, 2.6, '#ffffff', 0.95) +
        '</g>'
    },

    /* ======================================================================
       21. Bốt Chiến Binh Cyber Neon Idol
       ====================================================================== */
    {
      id: 'shoe-21',
      name: 'Bốt Chiến Binh Cyber Neon Idol',
      icon: '⚡',
      accentColor: '#06b6d4',
      previewBox: '220 690 160 205',
      defs:
        lg('shoe21-armor', '0%', '0%', '100%', '0%', [
          ['0%', '#0f172a'],
          ['32%', '#334155'],
          ['55%', '#475569'],
          ['82%', '#1e293b'],
          ['100%', '#020617']
        ]) +
        lg('shoe21-neon', '0%', '0%', '100%', '100%', [
          ['0%', '#ecfeff'],
          ['38%', '#22d3ee'],
          ['78%', '#06b6d4'],
          ['100%', '#0284c7']
        ]) +
        lg('shoe21-magenta', '0%', '0%', '100%', '100%', [
          ['0%', '#fdf2f8'],
          ['50%', '#f472b6'],
          ['100%', '#db2777']
        ]),
      leftSvg:
        '<g>' +
          /* Futuristic neon-hollow cutout wedge heel */
          '<path d="M268.2,852 L277.2,852 L276.4,881 L268.4,881 Z" fill="url(#shoe21-armor)" stroke="#06b6d4" stroke-width="0.75"/>' +
          '<polygon points="270.4,858 274.8,858 274.4,874 270.6,874" fill="#083344" stroke="#22d3ee" stroke-width="0.8"/>' +
          /* High knee-length cyber armor boot shaft (y=700..858) */
          '<path d="' + legShaftPath(700, 858, 2.0, 2.0, 6, 0) + '" fill="url(#shoe21-armor)" stroke="#0f172a" stroke-width="0.9"/>' +
          /* Glowing cyan knee-armor collar */
          '<path d="M252.2,700 Q269.6,710 287.2,700 L286.8,707 Q269.6,717 252.6,707 Z" fill="url(#shoe21-neon)" stroke="#0891b2" stroke-width="0.75"/>' +
          /* Cyber armor toe box & glowing holographic neon platform sole */
          '<path d="M252.2,850 C251.4,860 251.6,872 256.2,876 C260.2,879 270,879 274.2,875.5 C278,871 278.4,859 277.2,849 Z" fill="url(#shoe21-armor)" stroke="#0f172a" stroke-width="0.85"/>' +
          '<path d="M251.6,869 C252,877.5 257.6,881.2 265.2,881.2 C272.5,881.2 277.6,877.5 278.2,869.5 L275.5,867 C270.2,872.2 259.5,872.2 251.6,869 Z" fill="url(#shoe21-neon)" stroke="#0e7490" stroke-width="0.7"/>' +
          /* Glowing cyber circuit trim & double magnetic buckle straps */
          '<path d="M258,718 L258,798 L263,808 L263,858" fill="none" stroke="#22d3ee" stroke-width="1.2" opacity="0.9"/>' +
          '<path d="M252,728 Q269.5,734 287,728 L286.6,735 Q269.5,741 252.4,735 Z" fill="#1e293b" stroke="#22d3ee" stroke-width="0.75"/>' +
          '<rect x="264" y="730" width="9" height="5.5" rx="1.2" fill="url(#shoe21-magenta)" stroke="#ffffff" stroke-width="0.5"/>' +
          '<path d="M257.2,814 Q268,820 278.5,814 L278.2,820 Q268,826 257.6,820 Z" fill="#1e293b" stroke="#f472b6" stroke-width="0.75"/>' +
          /* Glowing electric lightning hologram emblem on shin */
          '<polygon points="270.5,758 263,772 269,772 265.5,786 275.5,769 269.2,769" fill="url(#shoe21-neon)" stroke="#ffffff" stroke-width="0.65" stroke-linejoin="round"/>' +
          sparkle4(258, 864, 2.8, '#22d3ee', 0.95) +
          sparkle4(277, 748, 2.5, '#f472b6', 0.92) +
        '</g>'
    },

    /* ======================================================================
       22. Giày Hoàng Hậu Phượng Hoàng Lửa Vàng
       ====================================================================== */
    {
      id: 'shoe-22',
      name: 'Giày Hoàng Hậu Phượng Hoàng Lửa Vàng',
      icon: '🔥',
      accentColor: '#f97316',
      previewBox: '220 690 160 205',
      defs:
        lg('shoe22-flame', '0%', '0%', '100%', '100%', [
          ['0%', '#fef08a'],
          ['32%', '#fb923c'],
          ['68%', '#ea580c'],
          ['100%', '#991b1b']
        ]) +
        lg('shoe22-gold', '0%', '0%', '100%', '100%', [
          ['0%', '#fef9c3'],
          ['42%', '#fbbf24'],
          ['100%', '#b45309']
        ]) +
        lg('shoe22-crimson', '0%', '0%', '100%', '100%', [
          ['0%', '#fb7185'],
          ['38%', '#dc2626'],
          ['78%', '#991b1b'],
          ['100%', '#450a0a']
        ]) +
        rg('shoe22-opal', '35%', '30%', '68%', [
          ['0%', '#ffffff'],
          ['35%', '#fed7aa'],
          ['75%', '#f97316'],
          ['100%', '#7c2d12']
        ]),
      leftSvg:
        '<g>' +
          /* Soaring layered phoenix fire-wings sweeping up the outer calf (y=738..850) */
          '<path d="M261,836 C250,818 240,778 243,744 C247,760 251,775 256,788 C249,782 244,768 246,756 C251,774 255,792 260,806 Z" fill="url(#shoe22-flame)" stroke="#fef08a" stroke-width="0.75"/>' +
          '<path d="M261,838 C250,824 243,804 242,786 C248,798 253,810 259,820 Z" fill="url(#shoe22-gold)" stroke="#9a3412" stroke-width="0.65"/>' +
          '<path d="M244,750 C248,768 253,792 258,815" fill="none" stroke="#ffffff" stroke-width="0.9" opacity="0.8"/>' +
          /* Sculpted curved phoenix-flame golden stiletto heel */
          '<path d="M270.2,846.5 C273.5,854 274.5,865 274,879.5 L270.4,879.5 C271.4,865 271.2,854 270.2,846.5 Z" fill="url(#shoe22-gold)" stroke="#9a3412" stroke-width="0.65"/>' +
          '<path d="M273.5,846.5 L276,846.5 L274.2,879.5 L273,879.5 Z" fill="url(#shoe22-gold)"/>' +
          /* Golden inner heel liner */
          '<path d="M254.2,850.5 Q265,844 276.6,850 C276.6,857 271.5,861.5 265,861.5 C259,861.5 254.2,857 254.2,850.5 Z" fill="#fef08a" opacity="0.52" stroke="#f59e0b" stroke-width="0.6"/>' +
          /* Burnished 24K gold sole */
          '<path d="M252.6,871.5 C253.2,877.5 258.5,880 265.4,880 C272,880 276.2,876.8 277.2,870.5 L275,864 C271.6,871.2 268.4,874.2 264.4,874.2 C259.2,874.2 255.2,871 252.6,871.5 Z" fill="url(#shoe22-gold)" stroke="#7c2d12" stroke-width="0.6"/>' +
          /* Blazing crimson lacquer upper */
          '<path d="M253.5,849.5 C251.8,860 251.8,872 256.5,876.2 C260.6,879.2 269.6,879.2 273.8,874.8 C278,869.8 278.4,859 276.8,849 C273.5,855.6 269.2,859.2 265,859.2 C260.8,859.2 256.8,855.6 253.5,849.5 Z" fill="url(#shoe22-crimson)" stroke="#7c2d12" stroke-width="0.85"/>' +
          /* Gilded phoenix collar filigree & spiral golden ankle wrap */
          '<path d="M253.8,850 C256.8,856 260.8,859.4 265,859.4 C269.2,859.4 273.2,856 276.4,849.6" fill="none" stroke="url(#shoe22-gold)" stroke-width="1.35"/>' +
          '<path d="M258.5,826 Q268,833 277,826 M258.8,835 Q268,842 276.8,835" fill="none" stroke="url(#shoe22-gold)" stroke-width="1.9" stroke-linecap="round"/>' +
          /* Phoenix gilded feather crest & blazing fire-opal gem on vamp */
          '<path d="M257.5,858.5 C258,851.5 262.5,851.5 265,856.5 C267.5,851.5 272,851.5 272.5,858.5 Q265,863.5 257.5,858.5 Z" fill="url(#shoe22-gold)" stroke="#9a3412" stroke-width="0.55"/>' +
          gemDiamond(265, 859.5, 2.5, 3.6, 'shoe22-opal', '#fef08a') +
          '<path d="M256,863 Q259.5,871.5 266,873" fill="none" stroke="#fef08a" stroke-width="1.25" stroke-linecap="round" opacity="0.85"/>' +
          /* Floating ember sparks */
          sparkle4(244, 742, 2.8, '#fef08a', 0.95) +
          sparkle4(247, 770, 2.4, '#ffffff', 0.9) +
          sparkle4(274.5, 868, 2.4, '#fef08a', 0.92) +
        '</g>'
    }
  ];

  var WARDROBE_SHOES = [];
  for (var i = 0; i < RAW_SHOES.length; i++) {
    WARDROBE_SHOES.push(makeShoe(RAW_SHOES[i]));
  }

  root.WARDROBE_SHOES = WARDROBE_SHOES;
})(typeof window !== 'undefined' ? window : globalThis);
