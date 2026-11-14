// 2.5D Anime / Barbie Princess Wardrobe: Bottoms (Skirts, Ballgowns, Mermaid & Pants)
// Coordinate System: SVG viewBox="0 0 600 950"
// Waist: x 262..338 at y 428..436 | Hips: x 240..360 at y 450..520
// Legs: Left x 248..296, Right x 304..352 | Knees y 670 | Ankles y 825 | Shoes end y 880

(function () {
  "use strict";

  function sparkle4(cx, cy, r, fill, opacity) {
    var op = opacity === undefined ? 0.95 : opacity;
    var f = fill || "#ffffff";
    var ir = (r * 0.22).toFixed(2);
    var p1 = cx + "," + (cy - r);
    var p2 = (cx + Number(ir)) + "," + (cy - Number(ir));
    var p3 = (cx + r) + "," + cy;
    var p4 = (cx + Number(ir)) + "," + (cy + Number(ir));
    var p5 = cx + "," + (cy + r);
    var p6 = (cx - Number(ir)) + "," + (cy + Number(ir));
    var p7 = (cx - r) + "," + cy;
    var p8 = (cx - Number(ir)) + "," + (cy - Number(ir));
    return (
      '<path d="M ' + p1 + " L " + p2 + " L " + p3 + " L " + p4 +
      " L " + p5 + " L " + p6 + " L " + p7 + " L " + p8 +
      ' Z" fill="' + f + '" opacity="' + op + '"/>'
    );
  }

  function star5(cx, cy, rOut, rIn, fill, stroke, sw, opacity) {
    var pts = [];
    for (var i = 0; i < 10; i++) {
      var ang = (-Math.PI / 2) + (i * Math.PI) / 5;
      var rad = i % 2 === 0 ? rOut : rIn;
      pts.push((cx + Math.cos(ang) * rad).toFixed(1) + "," + (cy + Math.sin(ang) * rad).toFixed(1));
    }
    var st = stroke ? ' stroke="' + stroke + '" stroke-width="' + (sw || 1) + '"' : "";
    var op = opacity !== undefined ? ' opacity="' + opacity + '"' : "";
    return '<polygon points="' + pts.join(" ") + '" fill="' + fill + '"' + st + op + "/>";
  }

  function sparkleCluster(coords, fill) {
    var out = "";
    for (var i = 0; i < coords.length; i++) {
      var c = coords[i];
      out += sparkle4(c[0], c[1], c[2], fill || c[3] || "#ffffff", c[4] !== undefined ? c[4] : 0.92);
    }
    return out;
  }

  function pearlRow(pts, r, gradId, strokeColor) {
    var out = "";
    var rad = r || 3.4;
    var st = strokeColor || "rgba(255,255,255,0.65)";
    for (var i = 0; i < pts.length; i++) {
      var x = pts[i][0];
      var y = pts[i][1];
      out +=
        '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + rad + '" fill="url(#' + gradId + ')" stroke="' + st + '" stroke-width="0.6"/>' +
        '<circle cx="' + (x - rad * 0.32).toFixed(1) + '" cy="' + (y - rad * 0.32).toFixed(1) + '" r="' + (rad * 0.32).toFixed(2) + '" fill="#ffffff" opacity="0.9"/>';
    }
    return out;
  }

  function pearlArc(x1, y1, cx, cy, x2, y2, count, r, gradId, strokeColor) {
    var pts = [];
    for (var i = 0; i <= count; i++) {
      var t = i / count;
      var mt = 1 - t;
      var x = mt * mt * x1 + 2 * mt * t * cx + t * t * x2;
      var y = mt * mt * y1 + 2 * mt * t * cy + t * t * y2;
      pts.push([x, y]);
    }
    return pearlRow(pts, r, gradId, strokeColor);
  }

  function bow25D(cx, cy, s, fillMain, fillDark, strokeCol, tailLen) {
    var tl = tailLen || 56;
    return (
      '<g transform="translate(' + cx + "," + cy + ") scale(" + s + ')">' +
        '<path d="M -6,4 C -18,' + (tl * 0.45) + ' -28,' + (tl * 0.78) + ' -34,' + tl + ' L -18,' + (tl - 7) + ' L -12,' + (tl + 3) + ' C -7,' + (tl * 0.65) + ' -2,' + (tl * 0.3) + ' 0,5 Z" fill="' + fillDark + '" stroke="' + strokeCol + '" stroke-width="1.2"/>' +
        '<path d="M 6,4 C 18,' + (tl * 0.45) + ' 28,' + (tl * 0.78) + ' 34,' + tl + ' L 18,' + (tl - 7) + ' L 12,' + (tl + 3) + ' C 7,' + (tl * 0.65) + ' 2,' + (tl * 0.3) + ' 0,5 Z" fill="' + fillDark + '" stroke="' + strokeCol + '" stroke-width="1.2"/>' +
        '<path d="M -4,3 C -14,' + (tl * 0.42) + ' -22,' + (tl * 0.72) + ' -27,' + (tl - 5) + ' L -18,' + (tl - 10) + ' C -11,' + (tl * 0.55) + ' -4,' + (tl * 0.25) + ' -1,4 Z" fill="' + fillMain + '" opacity="0.8"/>' +
        '<path d="M 4,3 C 14,' + (tl * 0.42) + ' 22,' + (tl * 0.72) + ' 27,' + (tl - 5) + ' L 18,' + (tl - 10) + ' C 11,' + (tl * 0.55) + ' 4,' + (tl * 0.25) + ' 1,4 Z" fill="' + fillMain + '" opacity="0.8"/>' +
        '<path d="M -5,-3 C -24,-22 -42,-16 -40,2 C -38,18 -18,16 -5,5 Z" fill="' + fillMain + '" stroke="' + strokeCol + '" stroke-width="1.3"/>' +
        '<path d="M 5,-3 C 24,-22 42,-16 40,2 C 38,18 18,16 5,5 Z" fill="' + fillMain + '" stroke="' + strokeCol + '" stroke-width="1.3"/>' +
        '<path d="M -8,0 C -22,-8 -33,-4 -32,3 C -30,9 -18,9 -7,3 Z" fill="' + fillDark + '" opacity="0.45"/>' +
        '<path d="M 8,0 C 22,-8 33,-4 32,3 C 30,9 18,9 7,3 Z" fill="' + fillDark + '" opacity="0.45"/>' +
        '<path d="M -10,-6 C -21,-13 -32,-10 -33,-3" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity="0.65"/>' +
        '<path d="M 10,-6 C 21,-13 32,-10 33,-3" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity="0.65"/>' +
        '<rect x="-8" y="-7" width="16" height="14" rx="5" fill="' + fillMain + '" stroke="' + strokeCol + '" stroke-width="1.3"/>' +
        '<ellipse cx="-2" cy="-3" rx="3.5" ry="1.8" fill="#ffffff" opacity="0.65"/>' +
      "</g>"
    );
  }

  function heartGem(cx, cy, s, fillGrad, strokeCol) {
    return (
      '<g transform="translate(' + cx + "," + cy + ") scale(" + s + ')">' +
        '<path d="M 0,11 C -9,4 -15,-3 -11,-10 C -7,-15 0,-11 0,-6 C 0,-11 7,-15 11,-10 C 15,-3 9,4 0,11 Z" fill="' + fillGrad + '" stroke="' + strokeCol + '" stroke-width="1.4"/>' +
        '<path d="M 0,6 C -5,1 -8,-3 -6,-6.5 C -4,-9 0,-6.5 0,-4 C 0,-6.5 4,-9 6,-6.5 C 8,-3 5,1 0,6 Z" fill="#ffffff" opacity="0.28"/>' +
        '<ellipse cx="-5" cy="-6" rx="2.8" ry="1.5" transform="rotate(-30 -5 -6)" fill="#ffffff" opacity="0.88"/>' +
      "</g>"
    );
  }

  function snowflake(cx, cy, r, strokeCol, op) {
    var o = op === undefined ? 0.85 : op;
    var arms = "";
    for (var i = 0; i < 6; i++) {
      var a = (i * Math.PI) / 3;
      var x2 = cx + Math.cos(a) * r;
      var y2 = cy + Math.sin(a) * r;
      var mx = cx + Math.cos(a) * (r * 0.58);
      var my = cy + Math.sin(a) * (r * 0.58);
      var bx1 = mx + Math.cos(a + 0.6) * (r * 0.28);
      var by1 = my + Math.sin(a + 0.6) * (r * 0.28);
      var bx2 = mx + Math.cos(a - 0.6) * (r * 0.28);
      var by2 = my + Math.sin(a - 0.6) * (r * 0.28);
      arms +=
        '<line x1="' + cx + '" y1="' + cy + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '" stroke="' + strokeCol + '" stroke-width="1.3" stroke-linecap="round"/>' +
        '<path d="M ' + bx1.toFixed(1) + "," + by1.toFixed(1) + " L " + mx.toFixed(1) + "," + my.toFixed(1) + " L " + bx2.toFixed(1) + "," + by2.toFixed(1) + '" fill="none" stroke="' + strokeCol + '" stroke-width="1.1" stroke-linecap="round"/>';
    }
    return '<g opacity="' + o + '">' + arms + '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r * 0.18).toFixed(1) + '" fill="#ffffff"/></g>';
  }

  function scallopedCurve(x1, y1, cx, cy, x2, y2, count, amp, fill, stroke, sw) {
    var d = "M " + x1.toFixed(1) + "," + y1.toFixed(1);
    for (var i = 0; i < count; i++) {
      var t0 = i / count;
      var t1 = (i + 1) / count;
      var tm = (t0 + t1) / 2;
      var mt1 = 1 - t1;
      var mtm = 1 - tm;
      var ex = mt1 * mt1 * x1 + 2 * mt1 * t1 * cx + t1 * t1 * x2;
      var ey = mt1 * mt1 * y1 + 2 * mt1 * t1 * cy + t1 * t1 * y2;
      var qx = mtm * mtm * x1 + 2 * mtm * tm * cx + tm * tm * x2;
      var qy = mtm * mtm * y1 + 2 * mtm * tm * cy + tm * tm * y2 + amp;
      d += " Q " + qx.toFixed(1) + "," + qy.toFixed(1) + " " + ex.toFixed(1) + "," + ey.toFixed(1);
    }
    return '<path d="' + d + '" fill="' + fill + '" stroke="' + stroke + '" stroke-width="' + (sw || 1.2) + '"/>';
  }

  function sakuraFlower(cx, cy, s, petalFill, centerFill, strokeCol) {
    var petals = "";
    for (var i = 0; i < 5; i++) {
      var ang = i * 72;
      petals +=
        '<path d="M 0,0 C -6,-8 -7,-16 -2,-17 L 0,-14 L 2,-17 C 7,-16 6,-8 0,0 Z" transform="rotate(' + ang + ')" fill="' + petalFill + '" stroke="' + strokeCol + '" stroke-width="0.9"/>';
    }
    return (
      '<g transform="translate(' + cx + "," + cy + ") scale(" + s + ')">' +
        petals +
        '<circle cx="0" cy="0" r="3.4" fill="' + centerFill + '"/>' +
        '<circle cx="-1" cy="-1" r="1.2" fill="#ffffff" opacity="0.85"/>' +
      "</g>"
    );
  }

  // ===========================================================================
  // 12 GORGEOUS 2.5D ANIME / BARBIE PRINCESS BOTTOMS
  // ===========================================================================
  window.WARDROBE_BOTTOMS = [
    // 1. Váy Xòe Barbie 3 Tầng Kim Tuyến Hồng
    {
      id: "bot-01",
      name: "Váy Xòe Barbie 3 Tầng Kim Tuyến Hồng",
      icon: "👗",
      accentColor: "#ff3e9d",
      previewBox: "85 415 430 470",
      defs:
        '<linearGradient id="bot01-waist" x1="0%" y1="0%" x2="100%" y2="0%">' +
          '<stop offset="0%" stop-color="#c9126d"/>' +
          '<stop offset="30%" stop-color="#ff66b5"/>' +
          '<stop offset="50%" stop-color="#ffb8df"/>' +
          '<stop offset="72%" stop-color="#ff4da6"/>' +
          '<stop offset="100%" stop-color="#be1165"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot01-tier1" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffc2e2"/>' +
          '<stop offset="45%" stop-color="#ff66b5"/>' +
          '<stop offset="100%" stop-color="#e11d7c"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot01-tier2" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffa6d5"/>' +
          '<stop offset="50%" stop-color="#ff4da6"/>' +
          '<stop offset="100%" stop-color="#c8126b"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot01-tier3" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#ff8ec8"/>' +
          '<stop offset="48%" stop-color="#ff3396"/>' +
          '<stop offset="100%" stop-color="#ad0a59"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot01-back" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#9b0b50"/>' +
          '<stop offset="65%" stop-color="#d81b76"/>' +
          '<stop offset="100%" stop-color="#ff99cf"/>' +
        "</linearGradient>" +
        '<radialGradient id="bot01-tulle" cx="50%" cy="35%" r="65%">' +
          '<stop offset="0%" stop-color="#ffffff" stop-opacity="0.72"/>' +
          '<stop offset="60%" stop-color="#ffb8de" stop-opacity="0.35"/>' +
          '<stop offset="100%" stop-color="#ff4da6" stop-opacity="0.06"/>' +
        "</radialGradient>" +
        '<linearGradient id="bot01-hi" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffffff" stop-opacity="0.65"/>' +
          '<stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot01-fold" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#830642" stop-opacity="0.48"/>' +
          '<stop offset="100%" stop-color="#ff3e9d" stop-opacity="0"/>' +
        "</linearGradient>" +
        '<radialGradient id="bot01-pearl" cx="35%" cy="35%" r="65%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="65%" stop-color="#ffe6f5"/>' +
          '<stop offset="100%" stop-color="#e69dc5"/>' +
        "</radialGradient>" +
        '<radialGradient id="bot01-gem" cx="35%" cy="30%" r="70%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="40%" stop-color="#ff88c9"/>' +
          '<stop offset="100%" stop-color="#b80d62"/>' +
        "</radialGradient>",
      backSvg:
        '<g>' +
          '<path d="M 258,438 C 205,495 128,665 96,845 Q 195,882 300,866 Q 405,882 504,845 C 472,665 395,495 342,438 Z" fill="url(#bot01-back)" stroke="#880845" stroke-width="1.4"/>' +
          '<path d="M 102,844 Q 130,874 162,854 Q 198,878 232,856 Q 266,876 300,858 Q 334,876 368,856 Q 402,878 438,854 Q 470,874 498,844 L 486,820 L 114,820 Z" fill="#ffe6f3" opacity="0.65"/>' +
        "</g>",
      svg:
        '<g>' +
          // TIER 3 (Grand Floor-Sweeping Skirt)
          '<path d="M 164,672 C 138,735 112,795 102,844 Q 138,864 176,848 Q 214,864 252,844 Q 276,852 300,840 Q 324,852 348,844 Q 386,864 424,848 Q 462,864 498,844 C 488,795 462,735 436,672 Z" fill="url(#bot01-tier3)" stroke="#9e0952" stroke-width="1.6"/>' +
          // Tier 3 anime shadow folds & silk specular ribbons
          '<path d="M 178,688 C 164,748 152,798 148,845 L 172,846 C 176,796 186,748 194,690 Z" fill="url(#bot01-fold)"/>' +
          '<path d="M 232,688 C 228,748 224,798 224,845 L 246,844 C 246,796 248,748 250,690 Z" fill="url(#bot01-fold)"/>' +
          '<path d="M 350,690 C 352,748 354,796 354,844 L 376,845 C 376,798 372,748 368,688 Z" fill="url(#bot01-fold)"/>' +
          '<path d="M 406,690 C 414,748 424,796 428,846 L 452,845 C 448,798 436,748 422,688 Z" fill="url(#bot01-fold)"/>' +
          '<path d="M 200,695 C 192,750 185,795 184,840 L 210,842 C 212,795 218,750 222,695 Z" fill="url(#bot01-hi)"/>' +
          '<path d="M 282,692 C 280,750 278,795 280,836 L 320,836 C 322,795 320,750 318,692 Z" fill="url(#bot01-hi)"/>' +
          '<path d="M 378,695 C 382,750 388,795 390,842 L 416,840 C 415,795 408,750 400,695 Z" fill="url(#bot01-hi)"/>' +
          // Tier 3 lacy scalloped tulle trim
          '<path d="M 103,836 Q 124,864 146,842 Q 168,866 190,844 Q 214,866 238,844 Q 268,858 300,838 Q 332,858 362,844 Q 386,866 410,844 Q 432,866 454,842 Q 476,864 497,836 L 492,824 Q 465,838 438,828 Q 370,842 300,828 Q 230,842 162,828 Q 135,838 108,824 Z" fill="#fff0f8" stroke="#ff8cc8" stroke-width="1" opacity="0.92"/>' +
          // TIER 2 (Voluminous Mid Tier)
          '<path d="M 192,542 C 166,595 144,648 134,696 Q 170,718 206,698 Q 252,720 300,696 Q 348,720 394,698 Q 430,718 466,696 C 456,648 434,595 408,542 Z" fill="url(#bot01-tier2)" stroke="#a80d59" stroke-width="1.5"/>' +
          '<path d="M 205,555 C 194,605 184,650 180,695 L 204,696 C 208,650 216,605 224,555 Z" fill="url(#bot01-fold)"/>' +
          '<path d="M 376,555 C 384,605 392,650 396,696 L 420,695 C 416,650 406,605 395,555 Z" fill="url(#bot01-fold)"/>' +
          '<path d="M 278,555 C 276,605 275,650 278,694 L 322,694 C 325,650 324,605 322,555 Z" fill="url(#bot01-hi)"/>' +
          '<path d="M 136,688 Q 168,718 204,694 Q 250,722 300,692 Q 350,722 396,694 Q 432,718 464,688 L 458,674 Q 420,695 385,678 Q 342,696 300,676 Q 258,696 215,678 Q 180,695 142,674 Z" fill="url(#bot01-tulle)" stroke="#ffd6eb" stroke-width="1"/>' +
          // Pearl garland swags across Tier 2
          pearlArc(176, 630, 238, 675, 300, 636, 9, 3.1, "bot01-pearl") +
          pearlArc(300, 636, 362, 675, 424, 630, 9, 3.1, "bot01-pearl") +
          heartGem(176, 630, 0.65, "url(#bot01-gem)", "#ffffff") +
          heartGem(300, 636, 0.72, "url(#bot01-gem)", "#ffffff") +
          heartGem(424, 630, 0.65, "url(#bot01-gem)", "#ffffff") +
          // TIER 1 (Upper Hip Ruffle Tier)
          '<path d="M 258,438 C 228,472 195,512 176,558 Q 208,576 244,558 Q 272,575 300,556 Q 328,575 356,558 Q 392,576 424,558 C 405,512 372,472 342,438 Z" fill="url(#bot01-tier1)" stroke="#b81062" stroke-width="1.5"/>' +
          '<path d="M 258,450 C 238,485 218,520 212,556 L 232,558 C 238,522 252,485 268,450 Z" fill="url(#bot01-fold)"/>' +
          '<path d="M 332,450 C 348,485 362,522 368,558 L 388,556 C 382,520 362,485 342,450 Z" fill="url(#bot01-fold)"/>' +
          '<path d="M 278,450 C 274,485 270,520 272,552 L 328,552 C 330,520 326,485 322,450 Z" fill="url(#bot01-hi)"/>' +
          '<path d="M 178,550 Q 208,576 244,554 Q 272,576 300,552 Q 328,576 356,554 Q 392,576 422,550 L 417,538 Q 388,556 356,538 Q 328,558 300,538 Q 272,558 244,538 Q 212,556 183,538 Z" fill="#fff2f9" stroke="#ff9ed0" stroke-width="0.9" opacity="0.9"/>' +
          // Satin Waistband & Hero Waist Bow
          '<path d="M 258,426 Q 300,435 342,426 L 344,444 Q 300,453 256,444 Z" fill="url(#bot01-waist)" stroke="#9e0952" stroke-width="1.3"/>' +
          '<path d="M 264,430 Q 300,438 336,430" fill="none" stroke="#ffffff" stroke-width="1.3" opacity="0.7"/>' +
          bow25D(300, 441, 0.92, "url(#bot01-tier1)", "#c8126b", "#8a0746", 92) +
          heartGem(300, 441, 0.85, "url(#bot01-gem)", "#ffffff") +
          // Shimmering glitter dots & 4-point diamond stars
          sparkleCluster([
            [146, 780, 9, "#ffffff", 0.95], [452, 775, 9, "#ffffff", 0.95],
            [218, 760, 7, "#ffe6f5", 0.9], [385, 765, 7, "#ffe6f5", 0.9],
            [300, 785, 10, "#ffffff", 0.98], [176, 610, 6, "#ffffff", 0.88],
            [420, 608, 6, "#ffffff", 0.88], [248, 512, 6, "#ffffff", 0.9],
            [355, 510, 6, "#ffffff", 0.9], [260, 818, 6, "#fff7d6", 0.92],
            [342, 818, 6, "#fff7d6", 0.92], [190, 812, 5, "#ffffff", 0.85],
            [410, 812, 5, "#ffffff", 0.85]
          ]) +
          '<circle cx="160" cy="740" r="2.2" fill="#ffffff" opacity="0.8"/>' +
          '<circle cx="242" cy="795" r="2.5" fill="#fff7d6" opacity="0.85"/>' +
          '<circle cx="358" cy="795" r="2.5" fill="#fff7d6" opacity="0.85"/>' +
          '<circle cx="440" cy="740" r="2.2" fill="#ffffff" opacity="0.8"/>' +
          '<circle cx="300" cy="730" r="2.4" fill="#ffffff" opacity="0.85"/>' +
        "</g>"
    },

    // 2. Váy Dạ Hội Băng Tuyết Pha Lê
    {
      id: "bot-02",
      name: "Váy Dạ Hội Băng Tuyết Pha Lê",
      icon: "❄️",
      accentColor: "#38bdf8",
      previewBox: "68 415 464 485",
      defs:
        '<linearGradient id="bot02-train" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#e0f7ff" stop-opacity="0.82"/>' +
          '<stop offset="50%" stop-color="#7dd3fc" stop-opacity="0.58"/>' +
          '<stop offset="85%" stop-color="#a5b4fc" stop-opacity="0.42"/>' +
          '<stop offset="100%" stop-color="#ffffff" stop-opacity="0.22"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot02-gown" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#e0f7ff"/>' +
          '<stop offset="35%" stop-color="#7dd3fc"/>' +
          '<stop offset="75%" stop-color="#0ea5e9"/>' +
          '<stop offset="100%" stop-color="#0369a1"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot02-under" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="50%" stop-color="#bae6fd"/>' +
          '<stop offset="100%" stop-color="#38bdf8"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot02-fold" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#075985" stop-opacity="0.45"/>' +
          '<stop offset="100%" stop-color="#38bdf8" stop-opacity="0"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot02-sheen" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffffff" stop-opacity="0.78"/>' +
          '<stop offset="100%" stop-color="#e0f2fe" stop-opacity="0"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot02-belt" x1="0%" y1="0%" x2="100%" y2="0%">' +
          '<stop offset="0%" stop-color="#64748b"/>' +
          '<stop offset="28%" stop-color="#e0f2fe"/>' +
          '<stop offset="50%" stop-color="#ffffff"/>' +
          '<stop offset="72%" stop-color="#bae6fd"/>' +
          '<stop offset="100%" stop-color="#475569"/>' +
        "</linearGradient>" +
        '<radialGradient id="bot02-gem" cx="35%" cy="30%" r="70%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="45%" stop-color="#67e8f9"/>' +
          '<stop offset="100%" stop-color="#0284c7"/>' +
        "</radialGradient>",
      backSvg:
        '<g>' +
          '<path d="M 258,438 C 185,500 106,665 80,860 Q 178,895 300,878 Q 422,895 520,860 C 494,665 415,500 342,438 Z" fill="url(#bot02-train)" stroke="#7dd3fc" stroke-width="1.3"/>' +
          '<path d="M 250,468 C 195,550 142,690 118,864 M 350,468 C 405,550 458,690 482,864 M 225,525 C 190,635 162,750 156,870 M 375,525 C 410,635 438,750 444,870" fill="none" stroke="#ffffff" stroke-width="1.2" opacity="0.45"/>' +
          snowflake(136, 758, 17, "#ffffff", 0.85) +
          snowflake(464, 758, 17, "#ffffff", 0.85) +
          snowflake(172, 650, 12, "#e0f7ff", 0.78) +
          snowflake(428, 650, 12, "#e0f7ff", 0.78) +
          snowflake(120, 830, 14, "#ffffff", 0.88) +
          snowflake(480, 830, 14, "#ffffff", 0.88) +
        "</g>",
      svg:
        '<g>' +
          // Luminous frost under-gown
          '<path d="M 260,436 C 218,500 158,665 138,850 Q 218,872 300,852 Q 382,872 462,850 C 442,665 382,500 340,436 Z" fill="url(#bot02-under)" stroke="#0ea5e9" stroke-width="1.5"/>' +
          '<path d="M 278,448 C 258,565 245,705 242,852 L 358,852 C 355,705 342,565 322,448 Z" fill="url(#bot02-sheen)"/>' +
          // Ice-blue outer split overskirt drapery
          '<path d="M 258,438 C 208,495 144,655 128,840 Q 192,862 248,842 C 254,715 270,565 300,455 C 330,565 346,715 352,842 Q 408,862 472,840 C 456,655 392,495 342,438 Z" fill="url(#bot02-gown)" stroke="#0284c7" stroke-width="1.5" opacity="0.93"/>' +
          // 2.5D vertical ice drapery folds
          '<path d="M 244,458 C 206,545 174,695 166,844 L 190,848 C 198,698 225,550 258,458 Z" fill="url(#bot02-fold)"/>' +
          '<path d="M 356,458 C 394,545 426,695 434,844 L 410,848 C 402,698 375,550 342,458 Z" fill="url(#bot02-fold)"/>' +
          '<path d="M 262,462 C 234,560 212,700 206,845 L 228,845 C 234,700 250,562 276,462 Z" fill="url(#bot02-sheen)"/>' +
          '<path d="M 338,462 C 366,560 388,700 394,845 L 372,845 C 366,700 350,562 324,462 Z" fill="url(#bot02-sheen)"/>' +
          // Silver-crystal trim along the front split
          '<path d="M 300,455 C 272,565 254,715 248,842" fill="none" stroke="#ffffff" stroke-width="2.4" opacity="0.9"/>' +
          '<path d="M 300,455 C 328,565 346,715 352,842" fill="none" stroke="#ffffff" stroke-width="2.4" opacity="0.9"/>' +
          // Crystal diamond drops along bottom hem
          '<path d="M 130,836 Q 190,858 248,838 M 352,838 Q 410,858 470,836" fill="none" stroke="#e0f7ff" stroke-width="2" stroke-dasharray="4 4"/>' +
          // Pointed Crystal Tiara Waistband
          '<path d="M 258,426 Q 300,434 342,426 L 344,444 Q 320,448 300,458 Q 280,448 256,444 Z" fill="url(#bot02-belt)" stroke="#0284c7" stroke-width="1.3"/>' +
          '<polygon points="300,430 309,441 300,454 291,441" fill="url(#bot02-gem)" stroke="#ffffff" stroke-width="1.2"/>' +
          '<polygon points="274,433 279,439 274,445 269,439" fill="url(#bot02-gem)" stroke="#ffffff" stroke-width="0.9"/>' +
          '<polygon points="326,433 331,439 326,445 321,439" fill="url(#bot02-gem)" stroke="#ffffff" stroke-width="0.9"/>' +
          // Front Snowflakes & Crystal Sparkles
          snowflake(198, 725, 16, "#ffffff", 0.9) +
          snowflake(402, 725, 16, "#ffffff", 0.9) +
          snowflake(300, 770, 14, "#e0f7ff", 0.85) +
          snowflake(228, 605, 11, "#ffffff", 0.82) +
          snowflake(372, 605, 11, "#ffffff", 0.82) +
          sparkleCluster([
            [170, 795, 8, "#ffffff", 0.95], [430, 795, 8, "#ffffff", 0.95],
            [282, 680, 7, "#ffffff", 0.95], [318, 680, 7, "#ffffff", 0.95],
            [300, 560, 8, "#ffffff", 0.98], [260, 825, 6, "#e0f7ff", 0.9],
            [340, 825, 6, "#e0f7ff", 0.9], [165, 675, 5, "#ffffff", 0.85],
            [435, 675, 5, "#ffffff", 0.85]
          ]) +
        "</g>"
    },

    // 3. Chân Váy Xếp Ly Học Viện Dễ Thương
    {
      id: "bot-03",
      name: "Chân Váy Xếp Ly Học Viện Dễ Thương",
      icon: "🎀",
      accentColor: "#fb7185",
      previewBox: "185 412 230 180",
      defs:
        '<linearGradient id="bot03-skirt" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffd1df"/>' +
          '<stop offset="48%" stop-color="#ff85ad"/>' +
          '<stop offset="100%" stop-color="#f43f76"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot03-pleat" x1="0%" y1="0%" x2="100%" y2="0%">' +
          '<stop offset="0%" stop-color="#be185d" stop-opacity="0.52"/>' +
          '<stop offset="32%" stop-color="#ff85ad" stop-opacity="0"/>' +
          '<stop offset="100%" stop-color="#ffffff" stop-opacity="0.28"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot03-belt" x1="0%" y1="0%" x2="100%" y2="0%">' +
          '<stop offset="0%" stop-color="#e11d64"/>' +
          '<stop offset="35%" stop-color="#ff9ec0"/>' +
          '<stop offset="55%" stop-color="#ffe4ee"/>' +
          '<stop offset="100%" stop-color="#d81b60"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot03-gold" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#fef9c3"/>' +
          '<stop offset="50%" stop-color="#facc15"/>' +
          '<stop offset="100%" stop-color="#b45309"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot03-bow" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#fff1f5"/>' +
          '<stop offset="55%" stop-color="#fda4af"/>' +
          '<stop offset="100%" stop-color="#e11d48"/>' +
        "</linearGradient>" +
        '<radialGradient id="bot03-pearl" cx="35%" cy="35%" r="65%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="70%" stop-color="#ffe4ef"/>' +
          '<stop offset="100%" stop-color="#e59ab8"/>' +
        "</radialGradient>",
      backSvg:
        '<g>' +
          '<path d="M 222,520 L 378,520 L 386,564 Q 300,578 214,564 Z" fill="#9f1239" stroke="#881337" stroke-width="1.2"/>' +
        "</g>",
      svg:
        '<g>' +
          // Main A-line Pleated Mini Skirt Body
          '<path d="M 258,442 C 242,476 218,518 204,558 Q 300,575 396,558 C 382,518 358,476 342,442 Z" fill="url(#bot03-skirt)" stroke="#9f1239" stroke-width="1.5"/>' +
          // Pastel Tartan Plaid Cross-Stripes
          '<path d="M 244,475 Q 300,485 356,475 M 226,512 Q 300,524 374,512 M 212,544 Q 300,558 388,544" fill="none" stroke="#fff1f5" stroke-width="3" opacity="0.62"/>' +
          '<path d="M 236,494 Q 300,505 364,494 M 218,528 Q 300,541 382,528" fill="none" stroke="#be185d" stroke-width="1.4" opacity="0.35"/>' +
          // Crisp 2.5D Knife Pleats
          '<path d="M 264,444 L 222,560 L 236,562 L 272,444 Z" fill="url(#bot03-pleat)"/>' +
          '<path d="M 278,446 L 250,564 L 266,565 L 288,446 Z" fill="url(#bot03-pleat)"/>' +
          '<path d="M 294,447 L 282,566 L 298,566 L 302,447 Z" fill="url(#bot03-pleat)"/>' +
          '<path d="M 310,447 L 314,566 L 330,565 L 318,446 Z" fill="url(#bot03-pleat)"/>' +
          '<path d="M 326,445 L 344,563 L 360,561 L 334,444 Z" fill="url(#bot03-pleat)"/>' +
          '<path d="M 338,444 L 372,560 L 386,558 L 342,442 Z" fill="url(#bot03-pleat)"/>' +
          // Pleat fold crisp shadow lines
          '<path d="M 264,445 L 222,560 M 278,447 L 250,564 M 294,447 L 282,566 M 310,447 L 318,566 M 325,446 L 348,563 M 336,444 L 376,559" fill="none" stroke="#9f1239" stroke-width="1.2" opacity="0.72"/>' +
          // Anime Glossy Highlight Arc
          '<path d="M 236,490 Q 300,502 364,490 L 368,502 Q 300,514 232,502 Z" fill="#ffffff" opacity="0.28"/>' +
          // High-Waisted Belt + Belt Loops + Gold Heart Buckle
          '<path d="M 258,426 Q 300,433 342,426 L 344,446 Q 300,453 256,446 Z" fill="url(#bot03-belt)" stroke="#9f1239" stroke-width="1.3"/>' +
          '<rect x="266" y="427" width="5" height="19" rx="1.5" fill="#ffc2d6" stroke="#be185d" stroke-width="0.9"/>' +
          '<rect x="329" y="427" width="5" height="19" rx="1.5" fill="#ffc2d6" stroke="#be185d" stroke-width="0.9"/>' +
          heartGem(300, 439, 0.85, "url(#bot03-gold)", "#92400e") +
          // Gold & Pearl Draped Waist Chain on Left Hip
          '<path d="M 254,444 Q 252,482 288,488 Q 252,475 244,458" fill="none" stroke="url(#bot03-gold)" stroke-width="1.8"/>' +
          pearlArc(242, 456, 260, 492, 288, 482, 6, 2.5, "bot03-pearl", "#d97706") +
          '<circle cx="288" cy="487" r="3.4" fill="url(#bot03-gold)" stroke="#92400e" stroke-width="0.8"/>' +
          // Cute Hip Satin Bow on Right Hip
          bow25D(350, 456, 0.62, "url(#bot03-bow)", "#e11d48", "#881337", 48) +
          sparkleCluster([[235, 535, 5, "#ffffff", 0.9], [362, 530, 5, "#ffffff", 0.9], [300, 466, 4.5, "#fff7d6", 0.9]]) +
        "</g>"
    },

    // 4. Váy Tutu Ba-Lê Cánh Thiên Thần
    {
      id: "bot-04",
      name: "Váy Tutu Ba-Lê Cánh Thiên Thần",
      icon: "🩰",
      accentColor: "#f472b6",
      previewBox: "142 412 316 225",
      defs:
        '<radialGradient id="bot04-tulle1" cx="50%" cy="30%" r="70%">' +
          '<stop offset="0%" stop-color="#fff5f9" stop-opacity="0.95"/>' +
          '<stop offset="55%" stop-color="#fbcfe8" stop-opacity="0.82"/>' +
          '<stop offset="100%" stop-color="#f472b6" stop-opacity="0.58"/>' +
        "</radialGradient>" +
        '<radialGradient id="bot04-tulle2" cx="50%" cy="35%" r="68%">' +
          '<stop offset="0%" stop-color="#fffbeb" stop-opacity="0.92"/>' +
          '<stop offset="60%" stop-color="#fde68a" stop-opacity="0.62"/>' +
          '<stop offset="100%" stop-color="#f9a8d4" stop-opacity="0.48"/>' +
        "</radialGradient>" +
        '<linearGradient id="bot04-satin" x1="0%" y1="0%" x2="100%" y2="0%">' +
          '<stop offset="0%" stop-color="#db2777"/>' +
          '<stop offset="30%" stop-color="#f9a8d4"/>' +
          '<stop offset="50%" stop-color="#fff0f6"/>' +
          '<stop offset="70%" stop-color="#f9a8d4"/>' +
          '<stop offset="100%" stop-color="#be185d"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot04-gold" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#fef9c3"/>' +
          '<stop offset="50%" stop-color="#facc15"/>' +
          '<stop offset="100%" stop-color="#b45309"/>' +
        "</linearGradient>" +
        '<radialGradient id="bot04-pearl" cx="35%" cy="35%" r="65%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="65%" stop-color="#fdf2f8"/>' +
          '<stop offset="100%" stop-color="#e599c2"/>' +
        "</radialGradient>",
      backSvg:
        '<g>' +
          '<path d="M 244,454 C 194,484 158,538 164,590 Q 204,618 248,596 Q 300,620 352,596 Q 396,618 436,590 C 442,538 406,484 356,454 Z" fill="url(#bot04-tulle2)" stroke="#f9a8d4" stroke-width="1.2"/>' +
        "</g>",
      svg:
        '<g>' +
          // Bottom Cream-Gold Frothy Tutu Cloud
          '<path d="M 248,452 C 190,486 154,538 158,588 Q 186,616 218,598 Q 256,622 300,600 Q 344,622 382,598 Q 414,616 442,588 C 446,538 410,486 352,452 Z" fill="url(#bot04-tulle2)" stroke="#f472b6" stroke-width="1.2"/>' +
          // Mid Sakura-Pink Fluffy Tutu Layer
          '<path d="M 252,448 C 202,480 172,526 175,568 Q 206,592 238,572 Q 268,594 300,574 Q 332,594 362,572 Q 394,592 425,568 C 428,526 398,480 348,448 Z" fill="url(#bot04-tulle1)" stroke="#ec4899" stroke-width="1.2"/>' +
          // Tulle Radial Pleats & Rim Lights
          '<path d="M 256,460 L 188,568 M 272,462 L 235,576 M 290,464 L 278,578 M 310,464 L 322,578 M 328,462 L 365,576 M 344,460 L 412,568" fill="none" stroke="#ffffff" stroke-width="1.5" opacity="0.6"/>' +
          // Upper Petal Tutu Ruffle Layer
          '<path d="M 258,444 C 218,472 194,506 196,536 Q 226,556 260,538 Q 300,558 340,538 Q 374,556 404,536 C 406,506 382,472 342,444 Z" fill="url(#bot04-tulle1)" stroke="#f472b6" stroke-width="1.2"/>' +
          // Ballet Satin Basque Peplum with Golden Angel-Wing Filigree
          '<path d="M 258,438 Q 246,470 250,494 Q 278,486 300,504 Q 322,486 350,494 Q 354,470 342,438 Z" fill="url(#bot04-satin)" stroke="#be185d" stroke-width="1.3"/>' +
          '<path d="M 258,484 Q 278,478 300,496 Q 322,478 342,484" fill="none" stroke="url(#bot04-gold)" stroke-width="2.2"/>' +
          // Twin Gold Angel Wing Flourishes on Basque
          '<path d="M 294,458 C 280,452 266,456 260,468 C 272,468 282,468 292,465" fill="none" stroke="url(#bot04-gold)" stroke-width="1.8" stroke-linecap="round"/>' +
          '<path d="M 306,458 C 320,452 334,456 340,468 C 328,468 318,468 308,465" fill="none" stroke="url(#bot04-gold)" stroke-width="1.8" stroke-linecap="round"/>' +
          // Waistband + Gold Piping + Ballet Ribbon Rosette
          '<path d="M 258,426 Q 300,434 342,426 L 344,444 Q 300,452 256,444 Z" fill="url(#bot04-satin)" stroke="#be185d" stroke-width="1.3"/>' +
          '<path d="M 258,428 Q 300,436 342,428 M 257,442 Q 300,450 343,442" fill="none" stroke="url(#bot04-gold)" stroke-width="1.5"/>' +
          bow25D(300, 440, 0.7, "#ffe4f2", "#db2777", "#9d174d", 48) +
          pearlRow([[260, 488], [340, 488], [300, 504]], 2.6, "bot04-pearl") +
          // Golden Stardust on Tutu Clouds
          sparkleCluster([
            [196, 545, 7, "#fffbeb", 0.95], [404, 545, 7, "#fffbeb", 0.95],
            [246, 578, 6, "#ffffff", 0.92], [354, 578, 6, "#ffffff", 0.92],
            [300, 558, 7, "#fef08a", 0.95], [176, 580, 5, "#ffffff", 0.85],
            [424, 580, 5, "#ffffff", 0.85]
          ]) +
        "</g>"
    },

    // 5. Quần Jeans Ngôi Sao Lấp Lánh
    {
      id: "bot-05",
      name: "Quần Jeans Ngôi Sao Lấp Lánh",
      icon: "⭐",
      accentColor: "#60a5fa",
      previewBox: "202 412 196 440",
      defs:
        '<linearGradient id="bot05-denim" x1="0%" y1="0%" x2="100%" y2="0%">' +
          '<stop offset="0%" stop-color="#3b82f6"/>' +
          '<stop offset="28%" stop-color="#93c5fd"/>' +
          '<stop offset="50%" stop-color="#dbeafe"/>' +
          '<stop offset="72%" stop-color="#93c5fd"/>' +
          '<stop offset="100%" stop-color="#2563eb"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot05-wash" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#f0f9ff" stop-opacity="0.72"/>' +
          '<stop offset="55%" stop-color="#bae6fd" stop-opacity="0.32"/>' +
          '<stop offset="100%" stop-color="#93c5fd" stop-opacity="0.05"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot05-belt" x1="0%" y1="0%" x2="100%" y2="0%">' +
          '<stop offset="0%" stop-color="#be185d"/>' +
          '<stop offset="32%" stop-color="#ff66b2"/>' +
          '<stop offset="50%" stop-color="#ffcce6"/>' +
          '<stop offset="68%" stop-color="#ff4da6"/>' +
          '<stop offset="100%" stop-color="#9d174d"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot05-gold" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#fef9c3"/>' +
          '<stop offset="50%" stop-color="#facc15"/>' +
          '<stop offset="100%" stop-color="#ca8a04"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot05-pink" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffe4f2"/>' +
          '<stop offset="50%" stop-color="#ff66b2"/>' +
          '<stop offset="100%" stop-color="#db2777"/>' +
        "</linearGradient>",
      backSvg:
        '<g>' +
          '<path d="M 258,426 Q 300,420 342,426 L 342,442 L 258,442 Z" fill="#1d4ed8"/>' +
          '<path d="M 227,828 Q 262,820 298,828 L 296,837 Q 262,831 229,837 Z" fill="#1e40af"/>' +
          '<path d="M 302,828 Q 338,820 373,828 L 371,837 Q 338,831 304,837 Z" fill="#1e40af"/>' +
        "</g>",
      svg:
        '<g>' +
          // Main Sculpted Pastel Denim Flare Jeans (Waist -> Hips -> Knees -> Bell-Bottoms)
          '<path d="M 258,434 C 245,465 237,492 238,522 C 241,578 247,628 245,670 C 243,724 233,782 225,830 Q 262,842 298,830 C 296,775 294,720 293,670 C 294,615 298,555 300,532 C 302,555 306,615 307,670 C 306,720 304,775 302,830 Q 338,842 375,830 C 367,782 357,724 355,670 C 353,628 359,578 362,522 C 363,492 355,465 342,434 Z" fill="url(#bot05-denim)" stroke="#1d4ed8" stroke-width="1.5"/>' +
          // Vertical Bleach Wash Thigh & Calf Highlights
          '<path d="M 258,495 C 256,555 258,615 258,672 C 254,725 246,778 244,822 L 280,822 C 280,778 282,725 282,672 C 283,615 285,555 282,495 Z" fill="url(#bot05-wash)"/>' +
          '<path d="M 318,495 C 315,555 317,615 318,672 C 318,725 320,778 320,822 L 356,822 C 354,778 346,725 342,672 C 342,615 344,555 342,495 Z" fill="url(#bot05-wash)"/>' +
          // Denim Topstitching (Fly, Pockets, Outer & Inner Seams, Frayed Hem)
          '<path d="M 300,446 L 300,516 Q 308,516 310,502 L 310,446" fill="none" stroke="#fef08a" stroke-width="1.3" stroke-dasharray="3 2"/>' +
          '<path d="M 248,466 Q 272,475 278,448 M 352,466 Q 328,475 322,448" fill="none" stroke="#fef08a" stroke-width="1.3" stroke-dasharray="3 2"/>' +
          '<path d="M 244,472 C 246,540 249,608 248,670 C 245,725 237,778 231,826" fill="none" stroke="#fef08a" stroke-width="1.1" stroke-dasharray="3 3" opacity="0.8"/>' +
          '<path d="M 356,472 C 354,540 351,608 352,670 C 355,725 363,778 369,826" fill="none" stroke="#fef08a" stroke-width="1.1" stroke-dasharray="3 3" opacity="0.8"/>' +
          '<path d="M 252,664 Q 270,668 289,664 M 311,664 Q 330,668 348,664" fill="none" stroke="#3b82f6" stroke-width="1.1" opacity="0.55"/>' +
          // Cute Ruffled Light-Denim Flare Cuffs
          '<path d="M 226,820 Q 262,831 298,820 L 298,831 Q 262,842 225,831 Z" fill="#eff6ff" stroke="#60a5fa" stroke-width="1.1" opacity="0.88"/>' +
          '<path d="M 302,820 Q 338,831 374,820 L 375,831 Q 338,842 302,831 Z" fill="#eff6ff" stroke="#60a5fa" stroke-width="1.1" opacity="0.88"/>' +
          // Pink Belt + Belt Loops + Heart Buckle + Dangling Star Keychain
          '<path d="M 258,426 Q 300,433 342,426 L 344,444 Q 300,451 256,444 Z" fill="url(#bot05-belt)" stroke="#9d174d" stroke-width="1.3"/>' +
          '<rect x="266" y="426" width="5" height="19" rx="1.5" fill="#93c5fd" stroke="#1d4ed8" stroke-width="0.9"/>' +
          '<rect x="329" y="426" width="5" height="19" rx="1.5" fill="#93c5fd" stroke="#1d4ed8" stroke-width="0.9"/>' +
          heartGem(300, 437, 0.88, "url(#bot05-gold)", "#92400e") +
          '<path d="M 268,444 Q 260,468 256,482" fill="none" stroke="url(#bot05-gold)" stroke-width="1.6"/>' +
          star5(255, 488, 7.5, 3.3, "url(#bot05-gold)", "#92400e", 0.9) +
          // Embroidered Glitter Stars down the Denim Legs
          star5(265, 535, 9, 4, "url(#bot05-pink)", "#ffffff", 1) +
          star5(338, 565, 8, 3.6, "url(#bot05-gold)", "#ffffff", 1) +
          star5(276, 622, 6.5, 2.8, "url(#bot05-gold)", "#ffffff", 0.9) +
          star5(326, 695, 9.5, 4.2, "url(#bot05-pink)", "#ffffff", 1) +
          star5(256, 755, 11, 4.8, "url(#bot05-gold)", "#ffffff", 1) +
          star5(346, 775, 10, 4.4, "url(#bot05-pink)", "#ffffff", 1) +
          star5(278, 795, 6.5, 2.9, "url(#bot05-pink)", "#ffffff", 0.9) +
          star5(322, 745, 6, 2.7, "url(#bot05-gold)", "#ffffff", 0.9) +
          sparkleCluster([
            [260, 505, 5, "#ffffff", 0.92], [344, 530, 5, "#ffffff", 0.92],
            [244, 785, 6, "#ffffff", 0.95], [358, 800, 6, "#ffffff", 0.95],
            [284, 725, 5, "#fef08a", 0.9], [318, 635, 5, "#ffffff", 0.9]
          ]) +
        "</g>"
    },

    // 6. Váy Đuôi Cá Đại Dương Ngọc Trai
    {
      id: "bot-06",
      name: "Váy Đuôi Cá Đại Dương Ngọc Trai",
      icon: "🧜‍♀️",
      accentColor: "#2dd4bf",
      previewBox: "102 412 396 492",
      defs:
        '<linearGradient id="bot06-fin" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#a5f3fc" stop-opacity="0.9"/>' +
          '<stop offset="45%" stop-color="#2dd4bf" stop-opacity="0.78"/>' +
          '<stop offset="80%" stop-color="#a78bfa" stop-opacity="0.72"/>' +
          '<stop offset="100%" stop-color="#f472b6" stop-opacity="0.55"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot06-body" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#99f6e4"/>' +
          '<stop offset="38%" stop-color="#14b8a6"/>' +
          '<stop offset="72%" stop-color="#0ea5e9"/>' +
          '<stop offset="100%" stop-color="#7c3aed"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot06-ruffle" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#e0f2fe" stop-opacity="0.9"/>' +
          '<stop offset="55%" stop-color="#5eead4" stop-opacity="0.76"/>' +
          '<stop offset="100%" stop-color="#c084fc" stop-opacity="0.65"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot06-hi" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffffff" stop-opacity="0.62"/>' +
          '<stop offset="100%" stop-color="#a5f3fc" stop-opacity="0"/>' +
        "</linearGradient>" +
        '<radialGradient id="bot06-pearl" cx="35%" cy="35%" r="65%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="60%" stop-color="#f0fdfa"/>' +
          '<stop offset="100%" stop-color="#7dd3fc"/>' +
        "</radialGradient>" +
        '<radialGradient id="bot06-gem" cx="35%" cy="30%" r="70%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="45%" stop-color="#f0abfc"/>' +
          '<stop offset="100%" stop-color="#7e22ce"/>' +
        "</radialGradient>",
      backSvg:
        '<g>' +
          // Spectacular Translucent Left & Right Mermaid Tail Fins
          '<path d="M 262,705 C 218,745 148,795 118,868 Q 168,895 218,856 Q 246,882 282,845 L 296,745 Z" fill="url(#bot06-fin)" stroke="#2dd4bf" stroke-width="1.4"/>' +
          '<path d="M 338,705 C 382,745 452,795 482,868 Q 432,895 382,856 Q 354,882 318,845 L 304,745 Z" fill="url(#bot06-fin)" stroke="#2dd4bf" stroke-width="1.4"/>' +
          // Iridescent Fin Rib Lines
          '<path d="M 276,738 C 228,778 175,818 144,866 M 280,750 C 242,792 204,828 182,862 M 286,758 C 262,802 238,832 228,855" fill="none" stroke="#ffffff" stroke-width="1.3" opacity="0.65"/>' +
          '<path d="M 324,738 C 372,778 425,818 456,866 M 320,750 C 358,792 396,828 418,862 M 314,758 C 338,802 362,832 372,855" fill="none" stroke="#ffffff" stroke-width="1.3" opacity="0.65"/>' +
          '<circle cx="152" cy="805" r="4" fill="#ffffff" opacity="0.65"/>' +
          '<circle cx="448" cy="805" r="4" fill="#ffffff" opacity="0.65"/>' +
          '<circle cx="136" cy="772" r="2.5" fill="#e0f2fe" opacity="0.7"/>' +
          '<circle cx="464" cy="772" r="2.5" fill="#e0f2fe" opacity="0.7"/>' +
        "</g>",
      svg:
        '<g>' +
          // Sleek Figure-Hugging Mermaid Column -> Knee Flare
          '<path d="M 258,436 C 240,472 236,506 244,548 C 252,598 256,645 252,684 C 246,738 220,792 192,844 Q 246,866 300,842 Q 354,866 408,844 C 380,792 354,738 348,684 C 344,645 348,598 356,548 C 364,506 360,472 342,436 Z" fill="url(#bot06-body)" stroke="#0f766e" stroke-width="1.5"/>' +
          // 2.5D Specular Sheen Center Highlight
          '<path d="M 282,455 C 276,545 278,645 275,740 C 272,785 268,818 266,846 L 334,846 C 332,818 328,785 325,740 C 322,645 324,545 318,455 Z" fill="url(#bot06-hi)"/>' +
          // Iridescent Mermaid Scale Arcs
          '<path d="M 254,485 Q 268,496 282,485 Q 300,496 318,485 Q 332,496 346,485" fill="none" stroke="#ccfbf1" stroke-width="1.2" opacity="0.68"/>' +
          '<path d="M 248,512 Q 265,524 282,512 Q 300,524 318,512 Q 335,524 352,512" fill="none" stroke="#e9d5ff" stroke-width="1.2" opacity="0.65"/>' +
          '<path d="M 252,540 Q 268,552 285,540 Q 300,552 315,540 Q 332,552 348,540" fill="none" stroke="#ccfbf1" stroke-width="1.2" opacity="0.65"/>' +
          '<path d="M 256,568 Q 272,580 288,568 Q 300,580 312,568 Q 328,580 344,568" fill="none" stroke="#e9d5ff" stroke-width="1.2" opacity="0.62"/>' +
          '<path d="M 258,596 Q 274,608 290,596 Q 300,608 310,596 Q 326,608 342,596" fill="none" stroke="#ccfbf1" stroke-width="1.2" opacity="0.6"/>' +
          '<path d="M 258,624 Q 274,636 290,624 Q 300,636 310,624 Q 326,636 342,624" fill="none" stroke="#e9d5ff" stroke-width="1.2" opacity="0.58"/>' +
          '<path d="M 256,652 Q 274,664 290,652 Q 300,664 310,652 Q 326,664 344,652" fill="none" stroke="#ccfbf1" stroke-width="1.2" opacity="0.58"/>' +
          '<path d="M 252,680 Q 272,692 290,680 Q 300,692 310,680 Q 328,692 348,680" fill="none" stroke="#e9d5ff" stroke-width="1.2" opacity="0.58"/>' +
          // Translucent Seafoam & Orchid Petal Ruffles around Knees/Calves
          '<path d="M 250,696 C 232,732 208,772 192,812 Q 228,832 266,808 Q 300,832 334,808 Q 372,832 408,812 C 392,772 368,732 350,696 Q 324,718 300,698 Q 276,718 250,696 Z" fill="url(#bot06-ruffle)" stroke="#99f6e4" stroke-width="1.1"/>' +
          '<path d="M 224,782 C 208,808 194,832 188,852 Q 222,870 262,846 Q 300,868 338,846 Q 378,870 412,852 C 406,832 392,808 376,782 Q 340,806 300,786 Q 260,806 224,782 Z" fill="url(#bot06-ruffle)" stroke="#e9d5ff" stroke-width="1.1"/>' +
          // Scalloped Seashell Waistband + Draped Hip Pearl Swags
          '<path d="M 258,426 Q 300,435 342,426 L 344,444 Q 322,452 300,446 Q 278,452 256,444 Z" fill="url(#bot06-ruffle)" stroke="#0d9488" stroke-width="1.3"/>' +
          pearlArc(252, 444, 276, 474, 300, 448, 6, 3.0, "bot06-pearl") +
          pearlArc(300, 448, 324, 474, 348, 444, 6, 3.0, "bot06-pearl") +
          pearlArc(242, 468, 272, 504, 300, 476, 7, 2.7, "bot06-pearl") +
          pearlArc(300, 476, 328, 504, 358, 468, 7, 2.7, "bot06-pearl") +
          star5(300, 439, 9, 4, "url(#bot06-gem)", "#ffffff", 1.1) +
          '<circle cx="300" cy="439" r="3" fill="#ffffff" opacity="0.9"/>' +
          // Ocean Shimmer & Water Drops
          sparkleCluster([
            [225, 765, 7, "#ffffff", 0.95], [375, 765, 7, "#ffffff", 0.95],
            [300, 742, 8, "#f0fdfa", 0.95], [268, 550, 5, "#ffffff", 0.85],
            [332, 550, 5, "#ffffff", 0.85], [218, 835, 6, "#e9d5ff", 0.92],
            [382, 835, 6, "#e9d5ff", 0.92]
          ]) +
        "</g>"
    },

    // 7. Váy Bí Ngô Nhung Đỏ Hoàng Gia
    {
      id: "bot-07",
      name: "Váy Bí Ngô Nhung Đỏ Hoàng Gia",
      icon: "🎃",
      accentColor: "#e11d48",
      previewBox: "152 412 296 254",
      defs:
        '<radialGradient id="bot07-velvet" cx="50%" cy="38%" r="68%">' +
          '<stop offset="0%" stop-color="#ff4d6d"/>' +
          '<stop offset="48%" stop-color="#e11d48"/>' +
          '<stop offset="82%" stop-color="#9f1239"/>' +
          '<stop offset="100%" stop-color="#5c061d"/>' +
        "</radialGradient>" +
        '<linearGradient id="bot07-lobe" x1="0%" y1="0%" x2="100%" y2="0%">' +
          '<stop offset="0%" stop-color="#4c0519" stop-opacity="0.45"/>' +
          '<stop offset="48%" stop-color="#fda4af" stop-opacity="0.42"/>' +
          '<stop offset="100%" stop-color="#4c0519" stop-opacity="0.45"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot07-gold" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#fef9c3"/>' +
          '<stop offset="45%" stop-color="#fbbf24"/>' +
          '<stop offset="100%" stop-color="#92400e"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot07-lace" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="100%" stop-color="#fef3c7"/>' +
        "</linearGradient>" +
        '<radialGradient id="bot07-ruby" cx="35%" cy="30%" r="70%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="40%" stop-color="#fb7185"/>' +
          '<stop offset="100%" stop-color="#881337"/>' +
        "</radialGradient>",
      backSvg:
        '<g>' +
          '<path d="M 210,596 Q 300,635 390,596 L 378,632 Q 300,656 222,632 Z" fill="#5c061d" stroke="#4c0519" stroke-width="1.3"/>' +
          '<path d="M 248,465 C 218,525 198,595 194,650 L 220,640 L 236,652 C 242,595 256,525 270,465 Z" fill="#9f1239" stroke="#f59e0b" stroke-width="1"/>' +
          '<path d="M 352,465 C 382,525 402,595 406,650 L 380,640 L 364,652 C 358,595 344,525 330,465 Z" fill="#9f1239" stroke="#f59e0b" stroke-width="1"/>' +
        "</g>",
      svg:
        '<g>' +
          // Ivory Petticoat Lace Ruffle Peeking Underneath
          '<path d="M 206,608 Q 228,644 252,616 Q 276,646 300,618 Q 324,646 348,616 Q 372,644 394,608 L 386,592 L 214,592 Z" fill="url(#bot07-lace)" stroke="#eab308" stroke-width="1.1"/>' +
          // Plump Puffed Royal Velvet Pumpkin Skirt Body
          '<path d="M 258,438 C 194,468 164,515 168,554 C 172,588 188,610 206,618 Q 252,634 300,624 Q 348,634 394,618 C 412,610 428,588 432,554 C 436,515 406,468 342,438 Z" fill="url(#bot07-velvet)" stroke="#680723" stroke-width="1.6"/>' +
          // Sculpted 2.5D Pumpkin Velvet Lobes
          '<path d="M 264,442 C 218,478 194,520 198,560 C 202,590 218,612 232,622 L 266,626 C 254,595 250,552 260,505 C 266,478 272,455 278,442 Z" fill="url(#bot07-lobe)"/>' +
          '<path d="M 284,444 C 276,492 272,555 278,626 L 322,626 C 328,555 324,492 316,444 Z" fill="url(#bot07-lobe)"/>' +
          '<path d="M 322,442 C 328,455 334,478 340,505 C 350,552 346,595 334,626 L 368,622 C 382,612 398,590 402,560 C 406,520 382,478 336,442 Z" fill="url(#bot07-lobe)"/>' +
          // Velvet Crease Lines & Soft Rim Highlights
          '<path d="M 265,444 C 228,495 220,558 232,622 M 286,446 C 276,502 274,562 280,624 M 314,446 C 324,502 326,562 320,624 M 335,444 C 372,495 380,558 368,622" fill="none" stroke="#5c061d" stroke-width="1.5" opacity="0.68"/>' +
          '<path d="M 244,492 C 234,522 234,552 242,578 M 300,485 C 296,520 296,555 300,582 M 356,492 C 366,522 366,552 358,578" fill="none" stroke="#ffe4e6" stroke-width="2.4" stroke-linecap="round" opacity="0.35"/>' +
          // Scalloped Gold Bullion Trim + Swinging Tassels
          scallopedCurve(204, 616, 300, 636, 396, 616, 6, 8, "none", "url(#bot07-gold)", 2.6) +
          '<g>' +
            '<circle cx="220" cy="624" r="3.2" fill="url(#bot07-ruby)" stroke="#fef08a" stroke-width="0.9"/><path d="M 218,628 L 215,644 L 225,644 L 222,628 Z" fill="url(#bot07-gold)"/>' +
            '<circle cx="252" cy="629" r="3.2" fill="url(#bot07-ruby)" stroke="#fef08a" stroke-width="0.9"/><path d="M 250,633 L 247,649 L 257,649 L 254,633 Z" fill="url(#bot07-gold)"/>' +
            '<circle cx="284" cy="631" r="3.2" fill="url(#bot07-ruby)" stroke="#fef08a" stroke-width="0.9"/><path d="M 282,635 L 279,651 L 289,651 L 286,635 Z" fill="url(#bot07-gold)"/>' +
            '<circle cx="316" cy="631" r="3.2" fill="url(#bot07-ruby)" stroke="#fef08a" stroke-width="0.9"/><path d="M 314,635 L 311,651 L 321,651 L 318,635 Z" fill="url(#bot07-gold)"/>' +
            '<circle cx="348" cy="629" r="3.2" fill="url(#bot07-ruby)" stroke="#fef08a" stroke-width="0.9"/><path d="M 346,633 L 343,649 L 353,649 L 350,633 Z" fill="url(#bot07-gold)"/>' +
            '<circle cx="380" cy="624" r="3.2" fill="url(#bot07-ruby)" stroke="#fef08a" stroke-width="0.9"/><path d="M 378,628 L 375,644 L 385,644 L 382,628 Z" fill="url(#bot07-gold)"/>' +
          "</g>" +
          // Royal Gold-Brocade Waistband & Crest Clasp
          '<path d="M 258,426 Q 300,434 342,426 L 344,445 Q 300,453 256,445 Z" fill="url(#bot07-gold)" stroke="#78350f" stroke-width="1.3"/>' +
          '<ellipse cx="300" cy="439" rx="9" ry="7" fill="url(#bot07-ruby)" stroke="#fef9c3" stroke-width="1.4"/>' +
          sparkleCluster([
            [205, 540, 6, "#fef08a", 0.9], [395, 540, 6, "#fef08a", 0.9],
            [300, 520, 7, "#ffffff", 0.92], [250, 578, 5, "#fef08a", 0.85],
            [350, 578, 5, "#fef08a", 0.85]
          ]) +
        "</g>"
    },

    // 8. Quần Short Nơ Tiểu Thư Kẹo Ngọt
    {
      id: "bot-08",
      name: "Quần Short Nơ Tiểu Thư Kẹo Ngọt",
      icon: "🍬",
      accentColor: "#fb923c",
      previewBox: "202 412 196 165",
      defs:
        '<linearGradient id="bot08-cream" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="55%" stop-color="#fff4eb"/>' +
          '<stop offset="100%" stop-color="#fed7ba"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot08-pink" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffd1e3"/>' +
          '<stop offset="55%" stop-color="#ff78a8"/>' +
          '<stop offset="100%" stop-color="#e11d74"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot08-shadow" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#f59e7a" stop-opacity="0.32"/>' +
          '<stop offset="100%" stop-color="#fff4eb" stop-opacity="0"/>' +
        "</linearGradient>" +
        '<radialGradient id="bot08-pearl" cx="35%" cy="35%" r="65%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="65%" stop-color="#fff1f2"/>' +
          '<stop offset="100%" stop-color="#f9a8d4"/>' +
        "</radialGradient>",
      backSvg:
        '<g>' +
          '<path d="M 232,535 L 298,530 L 298,550 Q 265,556 232,548 Z" fill="#f9a8d4"/>' +
          '<path d="M 302,530 L 368,535 L 368,548 Q 335,556 302,550 Z" fill="#f9a8d4"/>' +
        "</g>",
      svg:
        '<g>' +
          // High-Waisted Flared Scalloped Culotte Shorts
          '<path d="M 258,434 C 242,462 232,492 227,544 Q 246,560 264,545 Q 282,560 298,544 L 300,532 L 302,544 Q 318,560 336,545 Q 354,560 373,544 C 368,492 358,462 342,434 Z" fill="url(#bot08-cream)" stroke="#ec6a9a" stroke-width="1.5"/>' +
          // Candy-Pink Vertical Ribbon Stripes
          '<path d="M 262,444 C 254,478 248,510 245,542 M 338,444 C 346,478 352,510 355,542" fill="none" stroke="#ff99c2" stroke-width="3" opacity="0.72"/>' +
          // Center Sailor Front Flap & Pearl Buttons
          '<path d="M 276,445 L 274,520 Q 300,527 326,520 L 324,445 Z" fill="#fff9f5" stroke="#f48fb1" stroke-width="1.2"/>' +
          '<path d="M 275,517 Q 300,525 325,517 L 324,527 Q 300,534 276,527 Z" fill="url(#bot08-shadow)"/>' +
          pearlRow([[284, 462], [284, 488], [316, 462], [316, 488]], 3.6, "bot08-pearl", "#ec4899") +
          // Scalloped Pink Lace Hem Cuffs
          '<path d="M 229,534 Q 246,554 264,536 Q 282,554 298,534 L 298,544 Q 282,560 264,545 Q 246,560 228,544 Z" fill="url(#bot08-pink)" stroke="#be185d" stroke-width="0.9"/>' +
          '<path d="M 302,534 Q 318,554 336,536 Q 354,554 371,534 L 372,544 Q 354,560 336,545 Q 318,560 302,544 Z" fill="url(#bot08-pink)" stroke="#be185d" stroke-width="0.9"/>' +
          // Strawberry-Pink Scalloped Waistband
          '<path d="M 258,426 Q 300,434 342,426 L 344,445 Q 300,453 256,445 Z" fill="url(#bot08-pink)" stroke="#be185d" stroke-width="1.3"/>' +
          '<path d="M 262,431 Q 300,439 338,431" fill="none" stroke="#ffffff" stroke-width="1.4" stroke-dasharray="4 3" opacity="0.8"/>' +
          // Big Plump Side Bows on Left & Right Hems
          bow25D(234, 514, 0.56, "url(#bot08-pink)", "#db2777", "#9d174d", 42) +
          bow25D(366, 514, 0.56, "url(#bot08-pink)", "#db2777", "#9d174d", 42) +
          sparkleCluster([[300, 475, 5, "#ff78a8", 0.85], [250, 505, 4.5, "#ffffff", 0.9], [350, 505, 4.5, "#ffffff", 0.9]]) +
        "</g>"
    },

    // 9. Váy Tiên Hoa Cánh Hồng Rực Rỡ
    {
      id: "bot-09",
      name: "Váy Tiên Hoa Cánh Hồng Rực Rỡ",
      icon: "🌸",
      accentColor: "#ec4899",
      previewBox: "138 412 324 336",
      defs:
        '<linearGradient id="bot09-mint" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#ecfdf5"/>' +
          '<stop offset="52%" stop-color="#6ee7b7"/>' +
          '<stop offset="100%" stop-color="#059669"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot09-peach" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#fff7ed"/>' +
          '<stop offset="48%" stop-color="#fdba74"/>' +
          '<stop offset="100%" stop-color="#f43f5e"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot09-pink" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#fff1f5"/>' +
          '<stop offset="48%" stop-color="#f9a8d4"/>' +
          '<stop offset="100%" stop-color="#db2777"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot09-vine" x1="0%" y1="0%" x2="100%" y2="0%">' +
          '<stop offset="0%" stop-color="#15803d"/>' +
          '<stop offset="50%" stop-color="#4ade80"/>' +
          '<stop offset="100%" stop-color="#15803d"/>' +
        "</linearGradient>" +
        '<radialGradient id="bot09-dew" cx="35%" cy="30%" r="70%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="50%" stop-color="#bae6fd"/>' +
          '<stop offset="100%" stop-color="#38bdf8"/>' +
        "</radialGradient>",
      backSvg:
        '<g>' +
          '<path d="M 254,446 C 204,502 158,605 152,695 Q 178,728 206,685 Q 250,742 300,705 Q 350,742 394,685 Q 422,728 448,695 C 442,605 396,502 346,446 Z" fill="url(#bot09-mint)" stroke="#059669" stroke-width="1.3" opacity="0.86"/>' +
        "</g>",
      svg:
        '<g>' +
          // Bottom Mint & Dewdrop Pointed Fairy Petals
          '<path d="M 248,472 C 204,545 174,638 176,710 Q 214,678 240,625 Q 248,688 265,718 Q 290,675 300,632 Q 310,675 335,718 Q 352,688 360,625 Q 386,678 424,710 C 426,638 396,545 352,472 Z" fill="url(#bot09-mint)" stroke="#047857" stroke-width="1.3"/>' +
          '<path d="M 235,540 Q 208,622 186,692 M 266,550 Q 266,635 268,704 M 334,550 Q 334,635 332,704 M 365,540 Q 392,622 414,692" fill="none" stroke="#ffffff" stroke-width="1.2" opacity="0.55"/>' +
          // Mid Sunlit Peach-Coral Curved Petals
          '<path d="M 252,452 C 204,495 178,568 182,632 Q 218,656 246,598 Q 272,658 300,645 Q 328,658 354,598 Q 382,656 418,632 C 422,568 396,495 348,452 Z" fill="url(#bot09-peach)" stroke="#e11d48" stroke-width="1.3" opacity="0.95"/>' +
          '<path d="M 238,510 Q 212,568 202,622 M 280,515 Q 285,578 292,634 M 320,515 Q 315,578 308,634 M 362,510 Q 388,568 398,622" fill="none" stroke="#fff7ed" stroke-width="1.3" opacity="0.55"/>' +
          // Top Vibrant Sakura-Pink Blossom Petals
          '<path d="M 258,438 C 216,468 192,515 198,562 Q 232,582 260,536 Q 282,584 300,564 Q 318,584 340,536 Q 368,582 402,562 C 408,515 384,468 342,438 Z" fill="url(#bot09-pink)" stroke="#be185d" stroke-width="1.4"/>' +
          '<path d="M 262,452 Q 235,500 222,550 M 300,455 L 300,552 M 338,452 Q 365,500 378,550" fill="none" stroke="#ffffff" stroke-width="1.4" opacity="0.6"/>' +
          // Dewdrop Gems at Petal Tips
          '<circle cx="184" cy="692" r="4" fill="url(#bot09-dew)" stroke="#ffffff" stroke-width="0.9"/>' +
          '<circle cx="268" cy="702" r="4.2" fill="url(#bot09-dew)" stroke="#ffffff" stroke-width="0.9"/>' +
          '<circle cx="332" cy="702" r="4.2" fill="url(#bot09-dew)" stroke="#ffffff" stroke-width="0.9"/>' +
          '<circle cx="416" cy="692" r="4" fill="url(#bot09-dew)" stroke="#ffffff" stroke-width="0.9"/>' +
          '<circle cx="204" cy="622" r="3.5" fill="url(#bot09-dew)" stroke="#ffffff" stroke-width="0.8"/>' +
          '<circle cx="396" cy="622" r="3.5" fill="url(#bot09-dew)" stroke="#ffffff" stroke-width="0.8"/>' +
          // Botanical Vine Waistband + 3D Sakura Flowers
          '<path d="M 258,426 Q 300,435 342,426 L 344,444 Q 300,453 256,444 Z" fill="url(#bot09-vine)" stroke="#14532d" stroke-width="1.2"/>' +
          sakuraFlower(274, 439, 0.72, "#ffe4f0", "#fde047", "#ec4899") +
          sakuraFlower(300, 441, 0.88, "#ffb3d9", "#facc15", "#db2777") +
          sakuraFlower(326, 439, 0.72, "#ffe4f0", "#fde047", "#ec4899") +
          sparkleCluster([
            [225, 530, 6, "#ffffff", 0.92], [375, 530, 6, "#ffffff", 0.92],
            [298, 608, 7, "#ffffff", 0.95], [218, 650, 5, "#e0f2fe", 0.9],
            [382, 650, 5, "#e0f2fe", 0.9]
          ]) +
        "</g>"
    },

    // 10. Váy Ngân Hà Ánh Sao Đêm
    {
      id: "bot-10",
      name: "Váy Ngân Hà Ánh Sao Đêm",
      icon: "🌌",
      accentColor: "#8b5cf6",
      previewBox: "76 415 448 482",
      defs:
        '<linearGradient id="bot10-train" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#312e81" stop-opacity="0.88"/>' +
          '<stop offset="55%" stop-color="#6d28d9" stop-opacity="0.72"/>' +
          '<stop offset="100%" stop-color="#c084fc" stop-opacity="0.4"/>' +
        "</linearGradient>" +
        '<radialGradient id="bot10-galaxy" cx="50%" cy="45%" r="65%">' +
          '<stop offset="0%" stop-color="#7c3aed"/>' +
          '<stop offset="45%" stop-color="#3730a3"/>' +
          '<stop offset="82%" stop-color="#1e1b4b"/>' +
          '<stop offset="100%" stop-color="#0f172a"/>' +
        "</radialGradient>" +
        '<radialGradient id="bot10-nebula1" cx="38%" cy="55%" r="45%">' +
          '<stop offset="0%" stop-color="#f472b6" stop-opacity="0.52"/>' +
          '<stop offset="55%" stop-color="#a855f7" stop-opacity="0.28"/>' +
          '<stop offset="100%" stop-color="#312e81" stop-opacity="0"/>' +
        "</radialGradient>" +
        '<radialGradient id="bot10-nebula2" cx="65%" cy="68%" r="42%">' +
          '<stop offset="0%" stop-color="#38bdf8" stop-opacity="0.48"/>' +
          '<stop offset="60%" stop-color="#818cf8" stop-opacity="0.22"/>' +
          '<stop offset="100%" stop-color="#1e1b4b" stop-opacity="0"/>' +
        "</radialGradient>" +
        '<linearGradient id="bot10-fold" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#070a1c" stop-opacity="0.62"/>' +
          '<stop offset="100%" stop-color="#312e81" stop-opacity="0"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot10-gold" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#fef9c3"/>' +
          '<stop offset="50%" stop-color="#facc15"/>' +
          '<stop offset="100%" stop-color="#b45309"/>' +
        "</linearGradient>",
      backSvg:
        '<g>' +
          '<path d="M 256,438 C 188,505 112,672 88,858 Q 186,892 300,874 Q 414,892 512,858 C 488,672 412,505 344,438 Z" fill="url(#bot10-train)" stroke="#8b5cf6" stroke-width="1.3"/>' +
          star5(126, 795, 7, 3, "#fef08a", "none", 0, 0.85) +
          star5(474, 795, 7, 3, "#fef08a", "none", 0, 0.85) +
          sparkleCluster([[118, 845, 7, "#fef9c3", 0.9], [482, 845, 7, "#fef9c3", 0.9]]) +
        "</g>",
      svg:
        '<g>' +
          // Grand Cosmic Galaxy Gown Base
          '<path d="M 258,438 C 210,498 134,668 108,846 Q 204,872 300,852 Q 396,872 492,846 C 466,668 390,498 342,438 Z" fill="url(#bot10-galaxy)" stroke="#312e81" stroke-width="1.6"/>' +
          // Glowing Nebula Haze Clouds
          '<path d="M 258,438 C 210,498 134,668 108,846 Q 204,872 300,852 Q 396,872 492,846 C 466,668 390,498 342,438 Z" fill="url(#bot10-nebula1)"/>' +
          '<path d="M 258,438 C 210,498 134,668 108,846 Q 204,872 300,852 Q 396,872 492,846 C 466,668 390,498 342,438 Z" fill="url(#bot10-nebula2)"/>' +
          // 2.5D Deep Indigo Velvet Drapery Folds
          '<path d="M 250,456 C 212,542 178,690 166,850 L 194,854 C 206,695 234,548 264,456 Z" fill="url(#bot10-fold)"/>' +
          '<path d="M 278,458 C 266,552 256,698 254,852 L 278,852 C 280,698 285,552 292,458 Z" fill="url(#bot10-fold)"/>' +
          '<path d="M 308,458 C 315,552 320,698 322,852 L 346,852 C 344,698 334,552 322,458 Z" fill="url(#bot10-fold)"/>' +
          '<path d="M 336,456 C 366,548 394,695 406,854 L 434,850 C 422,690 388,542 350,456 Z" fill="url(#bot10-fold)"/>' +
          // Sheer Starlight Hem Border + Golden Filigree Edge
          '<path d="M 116,805 Q 208,828 300,810 Q 392,828 484,805 L 492,846 Q 396,872 300,852 Q 204,872 108,846 Z" fill="#c084fc" opacity="0.22"/>' +
          '<path d="M 110,842 Q 204,868 300,848 Q 396,868 490,842" fill="none" stroke="url(#bot10-gold)" stroke-width="2.6"/>' +
          '<path d="M 118,832 Q 206,856 300,837 Q 394,856 482,832" fill="none" stroke="#fef9c3" stroke-width="1" stroke-dasharray="5 5" opacity="0.8"/>' +
          // Delicate Golden Constellation Lines
          '<polyline points="200,660 228,635 248,668 232,715 194,735" fill="none" stroke="#fef08a" stroke-width="1" opacity="0.72"/>' +
          '<polyline points="402,650 374,625 352,662 372,708 408,730" fill="none" stroke="#fef08a" stroke-width="1" opacity="0.72"/>' +
          '<polyline points="282,535 305,565 290,605 316,635" fill="none" stroke="#e0f2fe" stroke-width="1" opacity="0.65"/>' +
          // Stars, Crescent Moons & Stardust
          '<path d="M 294,768 A 14,14 0 1,0 314,782 A 11,11 0 1,1 294,768 Z" fill="url(#bot10-gold)"/>' +
          '<path d="M 168,788 A 11,11 0 1,0 184,798 A 8.5,8.5 0 1,1 168,788 Z" fill="url(#bot10-gold)"/>' +
          '<path d="M 432,788 A 11,11 0 1,1 416,798 A 8.5,8.5 0 1,0 432,788 Z" fill="url(#bot10-gold)"/>' +
          star5(228, 635, 6.5, 2.8, "#fef08a", "#ffffff", 0.6) +
          star5(374, 625, 6.5, 2.8, "#fef08a", "#ffffff", 0.6) +
          star5(248, 668, 5, 2.2, "#ffffff") +
          star5(352, 662, 5, 2.2, "#ffffff") +
          star5(232, 715, 7, 3, "#fef08a") +
          star5(372, 708, 7, 3, "#fef08a") +
          star5(305, 565, 6.5, 2.8, "#fef9c3") +
          sparkleCluster([
            [200, 660, 6, "#ffffff", 0.95], [402, 650, 6, "#ffffff", 0.95],
            [194, 735, 7, "#fef08a", 0.95], [408, 730, 7, "#fef08a", 0.95],
            [290, 605, 6, "#bae6fd", 0.9], [316, 635, 8, "#ffffff", 0.95],
            [240, 805, 7, "#ffffff", 0.92], [360, 805, 7, "#ffffff", 0.92],
            [264, 512, 5, "#ffffff", 0.88], [336, 512, 5, "#ffffff", 0.88]
          ]) +
          // Celestial Gold Waistband + Crescent Sapphire Brooch
          '<path d="M 258,426 Q 300,434 342,426 L 344,444 Q 300,452 256,444 Z" fill="url(#bot10-gold)" stroke="#78350f" stroke-width="1.3"/>' +
          '<circle cx="300" cy="439" r="7.5" fill="#1e1b4b" stroke="#fef9c3" stroke-width="1.3"/>' +
          '<path d="M 297,433 A 6,6 0 1,0 306,442 A 4.8,4.8 0 1,1 297,433 Z" fill="#fef08a"/>' +
          sparkle4(303, 437, 4, "#ffffff", 0.98) +
        "</g>"
    },

    // 11. Váy Cầu Vồng Macaron 5 Tầng
    {
      id: "bot-11",
      name: "Váy Cầu Vồng Macaron 5 Tầng",
      icon: "🌈",
      accentColor: "#f59e0b",
      previewBox: "126 412 348 368",
      defs:
        '<linearGradient id="bot11-t1" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffe4f0"/>' +
          '<stop offset="55%" stop-color="#ff9ec4"/>' +
          '<stop offset="100%" stop-color="#f472b6"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot11-t2" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#fff3e6"/>' +
          '<stop offset="55%" stop-color="#ffc08a"/>' +
          '<stop offset="100%" stop-color="#fb923c"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot11-t3" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#fefce8"/>' +
          '<stop offset="55%" stop-color="#fde047"/>' +
          '<stop offset="100%" stop-color="#facc15"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot11-t4" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#ecfdf5"/>' +
          '<stop offset="55%" stop-color="#6ee7b7"/>' +
          '<stop offset="100%" stop-color="#34d399"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot11-t5" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#f5f3ff"/>' +
          '<stop offset="55%" stop-color="#c4b5fd"/>' +
          '<stop offset="100%" stop-color="#a78bfa"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot11-belt" x1="0%" y1="0%" x2="100%" y2="0%">' +
          '<stop offset="0%" stop-color="#ff9ec4"/>' +
          '<stop offset="28%" stop-color="#ffc08a"/>' +
          '<stop offset="52%" stop-color="#fde047"/>' +
          '<stop offset="76%" stop-color="#6ee7b7"/>' +
          '<stop offset="100%" stop-color="#c4b5fd"/>' +
        "</linearGradient>",
      backSvg:
        '<g>' +
          '<path d="M 235,455 C 185,525 148,635 138,742 Q 190,775 245,752 Q 300,775 355,752 Q 410,775 462,742 C 452,635 415,525 365,455 Z" fill="#fff5fb" stroke="#f9a8d4" stroke-width="1.2" opacity="0.88"/>' +
        "</g>",
      svg:
        '<g>' +
          // Tier 5 (Lavender Blueberry Macaron Cloud)
          '<path d="M 188,655 C 166,685 152,718 145,744 Q 178,768 212,748 Q 256,770 300,746 Q 344,770 388,748 Q 422,768 455,744 C 448,718 434,685 412,655 Z" fill="url(#bot11-t5)" stroke="#7c3aed" stroke-width="1.3"/>' +
          // Tier 4 (Mint Pistachio Macaron Cloud)
          '<path d="M 200,600 C 178,632 164,662 158,688 Q 190,712 224,692 Q 262,714 300,690 Q 338,714 376,692 Q 410,712 442,688 C 436,662 422,632 400,600 Z" fill="url(#bot11-t4)" stroke="#059669" stroke-width="1.3"/>' +
          // Tier 3 (Lemon Vanilla Macaron Cloud)
          '<path d="M 215,546 C 194,578 180,608 174,634 Q 204,656 236,638 Q 268,658 300,636 Q 332,658 364,638 Q 396,656 426,634 C 420,608 406,578 385,546 Z" fill="url(#bot11-t3)" stroke="#ca8a04" stroke-width="1.3"/>' +
          // Tier 2 (Peach Apricot Macaron Cloud)
          '<path d="M 232,494 C 212,522 198,552 192,578 Q 222,598 250,582 Q 275,600 300,580 Q 325,600 350,582 Q 378,598 408,578 C 402,552 388,522 368,494 Z" fill="url(#bot11-t2)" stroke="#ea580c" stroke-width="1.3"/>' +
          // Tier 1 (Strawberry Macaron Cloud)
          '<path d="M 258,440 C 236,466 218,496 212,522 Q 238,540 264,524 Q 282,542 300,522 Q 318,542 336,524 Q 362,540 388,522 C 382,496 364,466 342,440 Z" fill="url(#bot11-t1)" stroke="#db2777" stroke-width="1.3"/>' +
          // Whipped-Cream Icing Specular Curves on Each Ruffle Cloud
          '<path d="M 228,505 Q 260,518 292,504 M 308,504 Q 340,518 372,505 M 208,562 Q 248,576 288,560 M 312,560 Q 352,576 392,562 M 190,618 Q 238,632 286,616 M 314,616 Q 362,632 410,618 M 174,672 Q 232,688 288,670 M 312,670 Q 368,688 426,672 M 162,728 Q 228,744 288,726 M 312,726 Q 372,744 438,728" fill="none" stroke="#ffffff" stroke-width="2.4" stroke-linecap="round" opacity="0.62"/>' +
          // Cute Sugar Sprinkles & Pastel Stars
          '<rect x="242" y="486" width="8" height="3.2" rx="1.6" transform="rotate(-24 242 486)" fill="#ffffff"/>' +
          '<rect x="348" y="486" width="8" height="3.2" rx="1.6" transform="rotate(22 348 486)" fill="#fde047"/>' +
          '<rect x="220" y="544" width="8" height="3.2" rx="1.6" transform="rotate(18 220 544)" fill="#ff66b2"/>' +
          '<rect x="372" y="546" width="8" height="3.2" rx="1.6" transform="rotate(-18 372 546)" fill="#6ee7b7"/>' +
          '<rect x="256" y="600" width="8" height="3.2" rx="1.6" transform="rotate(-15 256 600)" fill="#f472b6"/>' +
          '<rect x="340" y="600" width="8" height="3.2" rx="1.6" transform="rotate(24 340 600)" fill="#a78bfa"/>' +
          '<rect x="215" y="660" width="8" height="3.2" rx="1.6" transform="rotate(28 215 660)" fill="#ffffff"/>' +
          '<rect x="380" y="660" width="8" height="3.2" rx="1.6" transform="rotate(-28 380 660)" fill="#fb923c"/>' +
          '<rect x="250" y="718" width="8" height="3.2" rx="1.6" transform="rotate(-20 250 718)" fill="#fde047"/>' +
          '<rect x="345" y="718" width="8" height="3.2" rx="1.6" transform="rotate(20 345 718)" fill="#ff9ec4"/>' +
          // Rainbow Pastel Waistband + Heart Macaron Bow
          '<path d="M 258,426 Q 300,434 342,426 L 344,444 Q 300,452 256,444 Z" fill="url(#bot11-belt)" stroke="#db2777" stroke-width="1.3"/>' +
          bow25D(300, 440, 0.72, "url(#bot11-t1)", "#f472b6", "#be185d", 50) +
          heartGem(300, 440, 0.78, "url(#bot11-t3)", "#ffffff") +
          sparkleCluster([
            [180, 725, 7, "#ffffff", 0.95], [420, 725, 7, "#ffffff", 0.95],
            [300, 675, 7, "#ffffff", 0.95], [298, 560, 6, "#ffffff", 0.9],
            [232, 630, 5, "#ffffff", 0.9], [368, 630, 5, "#ffffff", 0.9]
          ]) +
        "</g>"
    },

    // 12. Váy Hoàng Hậu Ánh Vàng Lộng Lẫy
    {
      id: "bot-12",
      name: "Váy Hoàng Hậu Ánh Vàng Lộng Lẫy",
      icon: "👑",
      accentColor: "#eab308",
      previewBox: "64 415 472 490",
      defs:
        '<linearGradient id="bot12-train" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#fffbeb" stop-opacity="0.92"/>' +
          '<stop offset="55%" stop-color="#fde68a" stop-opacity="0.72"/>' +
          '<stop offset="100%" stop-color="#d97706" stop-opacity="0.48"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot12-ivory" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="48%" stop-color="#fffbeb"/>' +
          '<stop offset="100%" stop-color="#fde68a"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot12-gold" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#fef9c3"/>' +
          '<stop offset="38%" stop-color="#fcd34d"/>' +
          '<stop offset="78%" stop-color="#d97706"/>' +
          '<stop offset="100%" stop-color="#92400e"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot12-fold" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#78350f" stop-opacity="0.4"/>' +
          '<stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot12-hi" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffffff" stop-opacity="0.7"/>' +
          '<stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>' +
        "</linearGradient>" +
        '<radialGradient id="bot12-pearl" cx="35%" cy="35%" r="65%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="65%" stop-color="#fffbeb"/>' +
          '<stop offset="100%" stop-color="#d9b979"/>' +
        "</radialGradient>" +
        '<linearGradient id="bot12-rosegold" x1="0%" y1="0%" x2="100%" y2="0%">' +
          '<stop offset="0%" stop-color="#b45309"/>' +
          '<stop offset="35%" stop-color="#fde68a"/>' +
          '<stop offset="50%" stop-color="#ffffff"/>' +
          '<stop offset="65%" stop-color="#fcd34d"/>' +
          '<stop offset="100%" stop-color="#92400e"/>' +
        "</linearGradient>",
      backSvg:
        '<g>' +
          '<path d="M 255,440 C 178,505 102,672 76,858 Q 182,898 300,876 Q 418,898 524,858 C 498,672 422,505 345,440 Z" fill="url(#bot12-train)" stroke="#d97706" stroke-width="1.4"/>' +
          '<path d="M 80,856 Q 112,886 146,864 Q 182,890 218,866 Q 258,888 300,868 Q 342,888 382,866 Q 418,890 454,864 Q 488,886 520,856" fill="none" stroke="#ffffff" stroke-width="2.2" opacity="0.82"/>' +
        "</g>",
      svg:
        '<g>' +
          // Ivory Silk Undergown Center Panel + Lace Tiers
          '<path d="M 258,438 C 216,502 162,675 142,844 Q 220,866 300,848 Q 380,866 458,844 C 438,675 384,502 342,438 Z" fill="url(#bot12-ivory)" stroke="#d97706" stroke-width="1.5"/>' +
          // Gold Chantilly Lace Lattice & Scalloped Tiers on Center Panel
          '<path d="M 244,585 Q 272,608 300,588 Q 328,608 356,585 M 220,695 Q 260,722 300,698 Q 340,722 380,695 M 185,792 Q 242,824 300,798 Q 358,824 415,792" fill="none" stroke="url(#bot12-gold)" stroke-width="2.2" opacity="0.88"/>' +
          '<path d="M 206,742 L 236,772 L 266,742 L 300,776 L 334,742 L 364,772 L 394,742" fill="none" stroke="#f59e0b" stroke-width="1.2" opacity="0.6"/>' +
          // Royal Champagne-Gold Brocade Split Pannier Overskirts (Left & Right)
          '<path d="M 258,438 C 194,485 124,638 104,838 Q 148,856 186,834 C 196,742 222,638 258,548 C 272,512 286,476 300,452 L 274,438 Z" fill="url(#bot12-gold)" stroke="#92400e" stroke-width="1.5"/>' +
          '<path d="M 342,438 C 406,485 476,638 496,838 Q 452,856 414,834 C 404,742 378,638 342,548 C 328,512 314,476 300,452 L 326,438 Z" fill="url(#bot12-gold)" stroke="#92400e" stroke-width="1.5"/>' +
          // Overskirt 2.5D Folds & Specular Highlights
          '<path d="M 244,458 C 198,538 156,678 142,840 L 166,842 C 180,682 214,544 256,458 Z" fill="url(#bot12-fold)"/>' +
          '<path d="M 356,458 C 402,538 444,678 458,840 L 434,842 C 420,682 386,544 344,458 Z" fill="url(#bot12-fold)"/>' +
          '<path d="M 225,468 C 184,548 148,680 132,836 L 154,838 C 170,682 204,552 242,468 Z" fill="url(#bot12-hi)"/>' +
          '<path d="M 375,468 C 416,548 452,680 468,836 L 446,838 C 430,682 396,552 358,468 Z" fill="url(#bot12-hi)"/>' +
          // Ornate Lace Edge along Split Pannier Drapes
          '<path d="M 300,452 C 266,515 215,655 186,834 M 300,452 C 334,515 385,655 414,834" fill="none" stroke="#fffbeb" stroke-width="2.6"/>' +
          '<path d="M 106,834 Q 146,854 186,832 M 414,832 Q 454,854 494,834" fill="none" stroke="#ffffff" stroke-width="2.4"/>' +
          // Double-Strand Luminous Pearl Swags Across Front & Sides
          pearlArc(202, 565, 250, 622, 298, 578, 8, 3.2, "bot12-pearl", "#d97706") +
          pearlArc(302, 578, 350, 622, 398, 565, 8, 3.2, "bot12-pearl", "#d97706") +
          pearlArc(174, 665, 236, 730, 300, 678, 10, 3.3, "bot12-pearl", "#d97706") +
          pearlArc(300, 678, 364, 730, 426, 665, 10, 3.3, "bot12-pearl", "#d97706") +
          // Royal Gold Pannier Rosette Bows
          bow25D(202, 565, 0.56, "url(#bot12-gold)", "#b45309", "#78350f", 54) +
          bow25D(398, 565, 0.56, "url(#bot12-gold)", "#b45309", "#78350f", 54) +
          // Imperial Gold Filigree Waistband + Crown Pearl Crest
          '<path d="M 258,426 Q 300,435 342,426 L 344,445 Q 300,455 256,445 Z" fill="url(#bot12-rosegold)" stroke="#78350f" stroke-width="1.3"/>' +
          '<polygon points="300,430 308,440 300,452 292,440" fill="#ffffff" stroke="#d97706" stroke-width="1.3"/>' +
          '<circle cx="300" cy="455" r="4" fill="url(#bot12-pearl)" stroke="#d97706" stroke-width="0.9"/>' +
          sparkleCluster([
            [156, 755, 8, "#ffffff", 0.95], [444, 755, 8, "#ffffff", 0.95],
            [300, 742, 9, "#fef9c3", 0.95], [250, 665, 6, "#ffffff", 0.9],
            [350, 665, 6, "#ffffff", 0.9], [300, 520, 7, "#fef08a", 0.95],
            [218, 818, 6, "#ffffff", 0.9], [382, 818, 6, "#ffffff", 0.9]
          ]) +
        "</g>"
    }
  ];
})();
