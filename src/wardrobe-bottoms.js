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

  function strawberryMotif(cx, cy, s) {
    return (
      '<g transform="translate(' + cx + "," + cy + ") scale(" + s + ')">' +
        '<path d="M -8,-5 C -10,3 -5,12 0,14 C 5,12 10,3 8,-5 C 6,-9 -6,-9 -8,-5 Z" fill="#f43f5e" stroke="#9f1239" stroke-width="1"/>' +
        '<path d="M -5,-4 C -6,2 -3,8 0,10 C -1,4 -1,-1 -3,-5 Z" fill="#fda4af" opacity="0.5"/>' +
        '<circle cx="-3" cy="-1" r="0.8" fill="#fef08a"/>' +
        '<circle cx="3" cy="-1" r="0.8" fill="#fef08a"/>' +
        '<circle cx="0" cy="3" r="0.8" fill="#fef08a"/>' +
        '<circle cx="-2.5" cy="6.5" r="0.8" fill="#fef08a"/>' +
        '<circle cx="2.5" cy="6.5" r="0.8" fill="#fef08a"/>' +
        '<path d="M -6,-7 Q -2,-3 0,-7 Q 2,-3 6,-7 Q 3,-11 0,-9 Q -3,-11 -6,-7 Z" fill="#22c55e" stroke="#15803d" stroke-width="0.8"/>' +
        '<path d="M 0,-9 L 0,-12" stroke="#15803d" stroke-width="1.2" stroke-linecap="round"/>' +
        '<ellipse cx="3" cy="1" rx="1.6" ry="3.2" transform="rotate(15 3 1)" fill="#ffffff" opacity="0.6"/>' +
      "</g>"
    );
  }

  function butterflyMotif(cx, cy, s, rot, fillMain, fillAccent, strokeCol) {
    var r = rot || 0;
    return (
      '<g transform="translate(' + cx + "," + cy + ") rotate(" + r + ") scale(" + s + ')">' +
        '<path d="M -1,-2 C -12,-18 -26,-16 -22,-2 C -20,5 -8,6 -1,2 Z" fill="' + fillMain + '" stroke="' + strokeCol + '" stroke-width="1"/>' +
        '<path d="M 1,-2 C 12,-18 26,-16 22,-2 C 20,5 8,6 1,2 Z" fill="' + fillMain + '" stroke="' + strokeCol + '" stroke-width="1"/>' +
        '<path d="M -1,2 C -10,4 -18,12 -14,18 C -9,22 -2,14 -1,5 Z" fill="' + fillAccent + '" stroke="' + strokeCol + '" stroke-width="0.95"/>' +
        '<path d="M 1,2 C 10,4 18,12 14,18 C 9,22 2,14 1,5 Z" fill="' + fillAccent + '" stroke="' + strokeCol + '" stroke-width="0.95"/>' +
        '<ellipse cx="-12" cy="-5" rx="4.2" ry="2.4" transform="rotate(-22 -12 -5)" fill="#ffffff" opacity="0.55"/>' +
        '<ellipse cx="12" cy="-5" rx="4.2" ry="2.4" transform="rotate(22 12 -5)" fill="#ffffff" opacity="0.55"/>' +
        '<ellipse cx="0" cy="2" rx="2" ry="8" fill="#f8fafc" stroke="' + strokeCol + '" stroke-width="0.8"/>' +
        '<path d="M -1,-6 Q -5,-13 -8,-14 M 1,-6 Q 5,-13 8,-14" fill="none" stroke="' + strokeCol + '" stroke-width="0.85" stroke-linecap="round"/>' +
      "</g>"
    );
  }

  function ovalGem(cx, cy, rx, ry, fillGrad, strokeCol) {
    return (
      '<g transform="translate(' + cx + "," + cy + ')">' +
        '<ellipse cx="0" cy="0" rx="' + rx + '" ry="' + ry + '" fill="' + fillGrad + '" stroke="' + strokeCol + '" stroke-width="1.3"/>' +
        '<polygon points="0,' + (-ry * 0.65).toFixed(1) + " " + (rx * 0.55).toFixed(1) + ",0 0," + (ry * 0.65).toFixed(1) + " " + (-rx * 0.55).toFixed(1) + ',0" fill="#ffffff" opacity="0.28"/>' +
        '<ellipse cx="' + (-rx * 0.3).toFixed(1) + '" cy="' + (-ry * 0.34).toFixed(1) + '" rx="' + (rx * 0.28).toFixed(1) + '" ry="' + (ry * 0.18).toFixed(1) + '" transform="rotate(-25)" fill="#ffffff" opacity="0.88"/>' +
      "</g>"
    );
  }

  function featherPlume(cx, cy, len, w, angle, fillGrad, strokeCol, veinCol) {
    return (
      '<g transform="translate(' + cx + "," + cy + ") rotate(" + angle + ')">' +
        '<path d="M 0,0 C ' + (-w).toFixed(1) + "," + (len * 0.32).toFixed(1) + " " + (-w * 0.9).toFixed(1) + "," + (len * 0.78).toFixed(1) + " 0," + len.toFixed(1) +
        " C " + (w * 0.9).toFixed(1) + "," + (len * 0.78).toFixed(1) + " " + w.toFixed(1) + "," + (len * 0.32).toFixed(1) + ' 0,0 Z" fill="' + fillGrad + '" stroke="' + strokeCol + '" stroke-width="1.1"/>' +
        '<path d="M 0,3 Q 1,' + (len * 0.5).toFixed(1) + " 0," + (len * 0.92).toFixed(1) + '" fill="none" stroke="' + (veinCol || "#ffffff") + '" stroke-width="1.1" opacity="0.72"/>' +
      "</g>"
    );
  }

  // ===========================================================================
  // 22 GORGEOUS 2.5D ANIME / BARBIE PRINCESS BOTTOMS
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
    },

    // 13. Chân Váy Lolita Dâu Tây Kem Tươi
    {
      id: "bot-13",
      name: "Chân Váy Lolita Dâu Tây Kem Tươi",
      icon: "🍓",
      accentColor: "#fb7185",
      previewBox: "148 412 304 242",
      defs:
        '<linearGradient id="bot13-skirt" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffe4e8"/>' +
          '<stop offset="42%" stop-color="#ff8fa8"/>' +
          '<stop offset="100%" stop-color="#fb7185"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot13-cream" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="68%" stop-color="#fff5f7"/>' +
          '<stop offset="100%" stop-color="#ffe0e8"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot13-ribbon" x1="0%" y1="0%" x2="100%" y2="0%">' +
          '<stop offset="0%" stop-color="#e11d48"/>' +
          '<stop offset="32%" stop-color="#fb7185"/>' +
          '<stop offset="50%" stop-color="#fecdd3"/>' +
          '<stop offset="70%" stop-color="#fb7185"/>' +
          '<stop offset="100%" stop-color="#be123c"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot13-fold" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#9f1239" stop-opacity="0.38"/>' +
          '<stop offset="100%" stop-color="#fb7185" stop-opacity="0"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot13-hi" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffffff" stop-opacity="0.65"/>' +
          '<stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>' +
        "</linearGradient>" +
        '<radialGradient id="bot13-pearl" cx="35%" cy="35%" r="65%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="65%" stop-color="#fff1f2"/>' +
          '<stop offset="100%" stop-color="#fda4af"/>' +
        "</radialGradient>" +
        '<radialGradient id="bot13-ruby" cx="35%" cy="30%" r="70%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="38%" stop-color="#fb7185"/>' +
          '<stop offset="100%" stop-color="#be123c"/>' +
        "</radialGradient>",
      backSvg:
        '<g>' +
          // Frothy Whipped-Cream Petticoat Lining Peeking Underneath
          '<path d="M 164,592 Q 186,634 210,602 Q 238,638 268,604 Q 300,640 332,604 Q 362,638 390,602 Q 414,634 436,592 L 422,566 L 178,566 Z" fill="url(#bot13-cream)" stroke="#fda4af" stroke-width="1.2"/>' +
          '<path d="M 178,606 Q 300,626 422,606" fill="none" stroke="#ffe4e8" stroke-width="2" stroke-dasharray="3 4"/>' +
        "</g>",
      svg:
        '<g>' +
          // Puffed Lolita Bell Skirt Body
          '<path d="M 258,438 C 216,466 176,516 166,595 Q 212,616 256,600 Q 300,618 344,600 Q 388,616 434,595 C 424,516 384,466 342,438 Z" fill="url(#bot13-skirt)" stroke="#be123c" stroke-width="1.5"/>' +
          // Soft Gingham & Cream Polka Plaid Pattern on Skirt
          '<path d="M 192,554 Q 300,572 408,554 M 176,584 Q 300,604 424,584" fill="none" stroke="#fff1f2" stroke-width="2.4" opacity="0.72"/>' +
          // 2.5D Anime Box-Pleat Shadows & Specular Sheen
          '<path d="M 244,454 C 222,498 206,545 200,596 L 222,598 C 228,546 240,500 256,454 Z" fill="url(#bot13-fold)"/>' +
          '<path d="M 356,454 C 378,498 394,545 400,596 L 378,598 C 372,546 360,500 344,454 Z" fill="url(#bot13-fold)"/>' +
          '<path d="M 278,456 C 272,504 268,552 268,602 L 332,602 C 332,552 328,504 322,456 Z" fill="url(#bot13-hi)"/>' +
          // Scalloped Whipped-Cream Frosting Apron Overlay
          '<path d="M 258,440 C 236,468 214,498 208,524 Q 238,546 268,524 Q 300,548 332,524 Q 362,546 392,524 C 386,498 364,468 342,440 Z" fill="url(#bot13-cream)" stroke="#fb7185" stroke-width="1.3"/>' +
          scallopedCurve(208, 524, 300, 546, 392, 524, 8, 6, "#ffffff", "#fda4af", 1.1) +
          // Whipped Cream Piping & Pearl Garland on Apron
          pearlArc(218, 498, 258, 526, 300, 502, 7, 2.8, "bot13-pearl", "#fb7185") +
          pearlArc(300, 502, 342, 526, 382, 498, 7, 2.8, "bot13-pearl", "#fb7185") +
          // Strawberry Print Border Around Lower Skirt
          strawberryMotif(196, 574, 0.9) +
          strawberryMotif(248, 582, 0.95) +
          strawberryMotif(300, 585, 1.0) +
          strawberryMotif(352, 582, 0.95) +
          strawberryMotif(404, 574, 0.9) +
          // Cream Blossoms Between Strawberries
          sakuraFlower(222, 579, 0.45, "#ffffff", "#fda4af", "#fb7185") +
          sakuraFlower(274, 584, 0.45, "#ffffff", "#fda4af", "#fb7185") +
          sakuraFlower(326, 584, 0.45, "#ffffff", "#fda4af", "#fb7185") +
          sakuraFlower(378, 579, 0.45, "#ffffff", "#fda4af", "#fb7185") +
          // Twin Side Mini Bows & Dangling Strawberry Charms
          bow25D(214, 518, 0.52, "url(#bot13-ribbon)", "#be123c", "#881337", 40) +
          bow25D(386, 518, 0.52, "url(#bot13-ribbon)", "#be123c", "#881337", 40) +
          // Satin Strawberry-Cream Waistband + Hero Center Bow
          '<path d="M 258,426 Q 300,434 342,426 L 344,445 Q 300,453 256,445 Z" fill="url(#bot13-ribbon)" stroke="#9f1239" stroke-width="1.3"/>' +
          '<path d="M 262,431 Q 300,439 338,431" fill="none" stroke="#ffffff" stroke-width="1.3" stroke-dasharray="4 3" opacity="0.85"/>' +
          bow25D(300, 441, 0.85, "url(#bot13-skirt)", "#e11d48", "#881337", 68) +
          heartGem(300, 441, 0.82, "url(#bot13-ruby)", "#ffffff") +
          sparkleCluster([
            [184, 545, 6, "#ffffff", 0.92], [416, 545, 6, "#ffffff", 0.92],
            [300, 558, 7, "#ffffff", 0.95], [235, 610, 5, "#fff1f2", 0.9],
            [365, 610, 5, "#fff1f2", 0.9]
          ]) +
        "</g>"
    },

    // 14. Váy High-Low Cánh Bướm Pha Lê Tím
    {
      id: "bot-14",
      name: "Váy High-Low Cánh Bướm Pha Lê Tím",
      icon: "🦋",
      accentColor: "#a855f7",
      previewBox: "74 415 452 470",
      defs:
        '<linearGradient id="bot14-wing" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#f3e8ff" stop-opacity="0.92"/>' +
          '<stop offset="40%" stop-color="#c084fc" stop-opacity="0.82"/>' +
          '<stop offset="76%" stop-color="#7e22ce" stop-opacity="0.86"/>' +
          '<stop offset="100%" stop-color="#38bdf8" stop-opacity="0.72"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot14-wing2" x1="100%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#fae8ff" stop-opacity="0.88"/>' +
          '<stop offset="50%" stop-color="#a855f7" stop-opacity="0.78"/>' +
          '<stop offset="100%" stop-color="#67e8f9" stop-opacity="0.68"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot14-skirt" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#e9d5ff"/>' +
          '<stop offset="48%" stop-color="#a855f7"/>' +
          '<stop offset="100%" stop-color="#581c87"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot14-tulle" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffffff" stop-opacity="0.85"/>' +
          '<stop offset="60%" stop-color="#d8b4fe" stop-opacity="0.6"/>' +
          '<stop offset="100%" stop-color="#a855f7" stop-opacity="0.32"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot14-fold" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#3b0764" stop-opacity="0.5"/>' +
          '<stop offset="100%" stop-color="#7e22ce" stop-opacity="0"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot14-hi" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffffff" stop-opacity="0.68"/>' +
          '<stop offset="100%" stop-color="#f3e8ff" stop-opacity="0"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot14-silver" x1="0%" y1="0%" x2="100%" y2="0%">' +
          '<stop offset="0%" stop-color="#6b21a8"/>' +
          '<stop offset="30%" stop-color="#e9d5ff"/>' +
          '<stop offset="50%" stop-color="#ffffff"/>' +
          '<stop offset="70%" stop-color="#d8b4fe"/>' +
          '<stop offset="100%" stop-color="#581c87"/>' +
        "</linearGradient>" +
        '<radialGradient id="bot14-gem" cx="35%" cy="30%" r="70%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="42%" stop-color="#e879f9"/>' +
          '<stop offset="100%" stop-color="#6b21a8"/>' +
        "</radialGradient>" +
        '<radialGradient id="bot14-pearl" cx="35%" cy="35%" r="65%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="65%" stop-color="#f5f3ff"/>' +
          '<stop offset="100%" stop-color="#c084fc"/>' +
        "</radialGradient>",
      backSvg:
        '<g>' +
          // Sweeping Translucent Iridescent Butterfly-Wing Train (Flanking Legs & Shoes Cleanly)
          '<path d="M 258,444 C 194,458 112,506 94,598 C 84,650 112,692 162,704 C 192,711 224,686 248,648 Z" fill="url(#bot14-wing)" stroke="#581c87" stroke-width="1.4"/>' +
          '<path d="M 342,444 C 406,458 488,506 506,598 C 516,650 488,692 438,704 C 408,711 376,686 352,648 Z" fill="url(#bot14-wing2)" stroke="#581c87" stroke-width="1.4"/>' +
          '<path d="M 244,625 C 188,655 124,724 114,812 C 110,842 128,864 150,862 C 176,860 202,808 228,744 C 242,710 250,676 254,644 Z" fill="url(#bot14-wing)" stroke="#6b21a8" stroke-width="1.4"/>' +
          '<path d="M 356,625 C 412,655 476,724 486,812 C 490,842 472,864 450,862 C 424,860 398,808 372,744 C 358,710 350,676 346,644 Z" fill="url(#bot14-wing2)" stroke="#6b21a8" stroke-width="1.4"/>' +
          // Stained-Glass Butterfly Wing Veins & Luminous Eye Spots
          '<path d="M 245,480 C 192,504 134,548 112,608 M 242,518 C 198,556 154,604 140,664 M 234,658 C 192,708 158,768 144,838 M 238,675 C 210,725 186,778 172,824" fill="none" stroke="#ffffff" stroke-width="1.4" opacity="0.65"/>' +
          '<path d="M 355,480 C 408,504 466,548 488,608 M 358,518 C 402,556 446,604 460,664 M 366,658 C 408,708 442,768 456,838 M 362,675 C 390,725 414,778 428,824" fill="none" stroke="#ffffff" stroke-width="1.4" opacity="0.65"/>' +
          '<ellipse cx="142" cy="634" rx="13" ry="18" transform="rotate(-18 142 634)" fill="#67e8f9" stroke="#ffffff" stroke-width="1.1" opacity="0.52"/>' +
          '<ellipse cx="458" cy="634" rx="13" ry="18" transform="rotate(18 458 634)" fill="#67e8f9" stroke="#ffffff" stroke-width="1.1" opacity="0.52"/>' +
          '<circle cx="152" cy="798" r="8" fill="#fae8ff" opacity="0.68"/>' +
          '<circle cx="448" cy="798" r="8" fill="#fae8ff" opacity="0.68"/>' +
          sparkleCluster([[126, 560, 6, "#ffffff", 0.9], [474, 560, 6, "#ffffff", 0.9], [146, 845, 7, "#e0f2fe", 0.95], [454, 845, 7, "#e0f2fe", 0.95]]) +
        "</g>",
      svg:
        '<g>' +
          // Arched High-Low Royal Violet Satin Skirt (Exposing Legs & Shoes)
          '<path d="M 258,438 C 216,472 178,532 166,625 Q 202,652 238,616 Q 268,584 300,578 Q 332,584 362,616 Q 398,652 434,625 C 422,532 384,472 342,438 Z" fill="url(#bot14-skirt)" stroke="#4c1d95" stroke-width="1.5"/>' +
          // 2.5D Satin Folds & Specular Highlights
          '<path d="M 244,454 C 222,505 204,562 198,622 L 220,622 C 226,562 240,508 258,454 Z" fill="url(#bot14-fold)"/>' +
          '<path d="M 356,454 C 378,505 396,562 402,622 L 380,622 C 374,562 360,508 342,454 Z" fill="url(#bot14-fold)"/>' +
          '<path d="M 282,454 C 276,496 274,538 276,574 L 324,574 C 326,538 324,496 318,454 Z" fill="url(#bot14-hi)"/>' +
          // Upper Lilac Tulle Butterfly Hip Peplum
          '<path d="M 258,440 C 220,458 192,494 188,535 Q 222,554 256,526 Q 280,505 300,518 Q 320,505 344,526 Q 378,554 412,535 C 408,494 380,458 342,440 Z" fill="url(#bot14-tulle)" stroke="#e9d5ff" stroke-width="1.1"/>' +
          // Silver-Pearl Garland Along High-Low Arch
          '<path d="M 168,620 Q 204,648 238,612 Q 268,582 300,576 Q 332,582 362,612 Q 396,648 432,620" fill="none" stroke="#f5f3ff" stroke-width="2.4" opacity="0.9"/>' +
          pearlArc(206, 545, 252, 588, 300, 560, 8, 2.8, "bot14-pearl", "#7e22ce") +
          pearlArc(300, 560, 348, 588, 394, 545, 8, 2.8, "bot14-pearl", "#7e22ce") +
          // Fluttering Crystal Butterflies Perched on Skirt Drapes
          butterflyMotif(214, 545, 0.72, -18, "url(#bot14-wing)", "#67e8f9", "#581c87") +
          butterflyMotif(386, 545, 0.72, 18, "url(#bot14-wing2)", "#67e8f9", "#581c87") +
          // Silver-Amethyst Waist Belt + Hero Crystal Butterfly Brooch
          '<path d="M 258,426 Q 300,434 342,426 L 344,444 Q 300,452 256,444 Z" fill="url(#bot14-silver)" stroke="#581c87" stroke-width="1.3"/>' +
          butterflyMotif(300, 440, 0.96, 0, "url(#bot14-gem)", "#a855f7", "#ffffff") +
          sparkleCluster([
            [248, 500, 6, "#ffffff", 0.92], [352, 500, 6, "#ffffff", 0.92],
            [300, 542, 7, "#e0f2fe", 0.96], [190, 595, 6, "#ffffff", 0.9],
            [410, 595, 6, "#ffffff", 0.9]
          ]) +
        "</g>"
    },

    // 15. Quần Dài Ống Loe Thần Tượng Ánh Kim
    {
      id: "bot-15",
      name: "Quần Dài Ống Loe Thần Tượng Ánh Kim",
      icon: "🌟",
      accentColor: "#ec4899",
      previewBox: "194 412 212 448",
      defs:
        '<linearGradient id="bot15-vinyl" x1="0%" y1="0%" x2="100%" y2="0%">' +
          '<stop offset="0%" stop-color="#9d174d"/>' +
          '<stop offset="28%" stop-color="#ec4899"/>' +
          '<stop offset="50%" stop-color="#fbcfe8"/>' +
          '<stop offset="72%" stop-color="#db2777"/>' +
          '<stop offset="100%" stop-color="#831843"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot15-shine" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffffff" stop-opacity="0.72"/>' +
          '<stop offset="55%" stop-color="#f9a8d4" stop-opacity="0.32"/>' +
          '<stop offset="100%" stop-color="#ec4899" stop-opacity="0.06"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot15-holo" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="35%" stop-color="#f0abfc"/>' +
          '<stop offset="70%" stop-color="#67e8f9"/>' +
          '<stop offset="100%" stop-color="#fde047"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot15-gold" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#fef9c3"/>' +
          '<stop offset="50%" stop-color="#facc15"/>' +
          '<stop offset="100%" stop-color="#b45309"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot15-belt" x1="0%" y1="0%" x2="100%" y2="0%">' +
          '<stop offset="0%" stop-color="#475569"/>' +
          '<stop offset="32%" stop-color="#f8fafc"/>' +
          '<stop offset="52%" stop-color="#ffffff"/>' +
          '<stop offset="72%" stop-color="#cbd5e1"/>' +
          '<stop offset="100%" stop-color="#334155"/>' +
        "</linearGradient>" +
        '<radialGradient id="bot15-gem" cx="35%" cy="30%" r="70%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="45%" stop-color="#f472b6"/>' +
          '<stop offset="100%" stop-color="#9d174d"/>' +
        "</radialGradient>",
      backSvg:
        '<g>' +
          '<path d="M 258,426 Q 300,420 342,426 L 342,442 L 258,442 Z" fill="#831843"/>' +
          '<path d="M 214,832 Q 255,824 297,832 L 296,842 Q 255,836 216,842 Z" fill="#831843"/>' +
          '<path d="M 303,832 Q 345,824 386,832 L 384,842 Q 345,836 304,842 Z" fill="#831843"/>' +
        "</g>",
      svg:
        '<g>' +
          // Metallic Stage-Idol Bell-Bottom Flare Pants (Stops Cleanly at y 834..842 Above Shoes)
          '<path d="M 258,434 C 244,466 236,494 238,524 C 241,580 247,628 245,670 C 239,726 226,784 212,834 Q 255,846 298,834 C 296,778 294,720 293,670 C 294,615 298,556 300,535 C 302,556 306,615 307,670 C 306,720 304,778 302,834 Q 345,846 388,834 C 374,784 361,726 355,670 C 353,628 359,580 362,524 C 364,494 356,466 342,434 Z" fill="url(#bot15-vinyl)" stroke="#831843" stroke-width="1.5"/>' +
          // High-Gloss Vinyl Specular Streaks on Thighs & Flares
          '<path d="M 258,488 C 254,552 256,614 256,672 C 250,726 240,778 235,828 L 274,828 C 276,778 278,726 278,672 C 280,614 282,552 280,488 Z" fill="url(#bot15-shine)"/>' +
          '<path d="M 320,488 C 318,552 320,614 322,672 C 322,726 324,778 326,828 L 365,828 C 360,778 350,726 344,672 C 344,614 346,552 342,488 Z" fill="url(#bot15-shine)"/>' +
          // Holographic Metallic Racing Side Stripes
          '<path d="M 244,462 C 242,530 247,604 247,670 C 241,726 229,780 218,832 L 226,833 C 237,780 248,726 254,670 C 254,604 249,530 250,462 Z" fill="url(#bot15-holo)" opacity="0.92"/>' +
          '<path d="M 356,462 C 358,530 353,604 353,670 C 359,726 371,780 382,833 L 374,832 C 363,780 352,726 346,670 C 346,604 351,530 350,462 Z" fill="url(#bot15-holo)" opacity="0.92"/>' +
          // Diagonal Metallic V-Flare Knee Seams & Fly Topstitching
          '<path d="M 246,672 L 270,694 L 293,672 M 307,672 L 330,694 L 354,672" fill="none" stroke="url(#bot15-gold)" stroke-width="2.2"/>' +
          '<path d="M 300,446 L 300,520" fill="none" stroke="#fbcfe8" stroke-width="1.4" opacity="0.8"/>' +
          // Holographic Metallic Cuff Piping
          '<path d="M 213,828 Q 255,840 297,828 L 298,835 Q 255,847 212,835 Z" fill="url(#bot15-holo)" stroke="#be185d" stroke-width="0.9"/>' +
          '<path d="M 303,828 Q 345,840 387,828 L 388,835 Q 345,847 302,835 Z" fill="url(#bot15-holo)" stroke="#be185d" stroke-width="0.9"/>' +
          // Idol Silver Metallic Waist Belt + Star Gem Buckle + Draped Hip Chain
          '<path d="M 258,426 Q 300,434 342,426 L 344,445 Q 300,453 256,445 Z" fill="url(#bot15-belt)" stroke="#334155" stroke-width="1.3"/>' +
          '<path d="M 244,452 Q 266,498 300,478" fill="none" stroke="url(#bot15-gold)" stroke-width="2"/>' +
          '<path d="M 246,464 Q 272,516 306,488" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="3 3"/>' +
          star5(300, 439, 10, 4.4, "url(#bot15-gold)", "#92400e", 1) +
          '<circle cx="300" cy="439" r="3.5" fill="url(#bot15-gem)"/>' +
          star5(254, 492, 6.5, 2.8, "url(#bot15-gold)", "#ffffff", 0.7) +
          // Glittering Idol Stars Down Both Flared Legs
          star5(268, 558, 7.5, 3.3, "url(#bot15-holo)", "#ffffff", 0.8) +
          star5(334, 592, 7.5, 3.3, "url(#bot15-gold)", "#ffffff", 0.8) +
          star5(258, 742, 9.5, 4.2, "url(#bot15-gold)", "#ffffff", 0.9) +
          star5(344, 762, 9.5, 4.2, "url(#bot15-holo)", "#ffffff", 0.9) +
          star5(276, 796, 6.5, 2.9, "#ffffff", "#f472b6", 0.7) +
          star5(324, 718, 6.5, 2.9, "#ffffff", "#f472b6", 0.7) +
          sparkleCluster([
            [262, 515, 5, "#ffffff", 0.92], [338, 535, 5, "#ffffff", 0.92],
            [236, 792, 6, "#ffffff", 0.95], [364, 804, 6, "#ffffff", 0.95],
            [280, 650, 5, "#fef9c3", 0.9], [320, 650, 5, "#fef9c3", 0.9]
          ]) +
        "</g>"
    },

    // 16. Váy Hoa Anh Đào Xếp Tầng Nhật Bản
    {
      id: "bot-16",
      name: "Váy Hoa Anh Đào Xếp Tầng Nhật Bản",
      icon: "🌸",
      accentColor: "#f472b6",
      previewBox: "126 410 348 372",
      defs:
        '<linearGradient id="bot16-t1" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#fff5f9"/>' +
          '<stop offset="55%" stop-color="#fbcfe8"/>' +
          '<stop offset="100%" stop-color="#f472b6"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot16-t2" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffe4f2"/>' +
          '<stop offset="50%" stop-color="#f9a8d4"/>' +
          '<stop offset="100%" stop-color="#ec4899"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot16-t3" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffd6eb"/>' +
          '<stop offset="48%" stop-color="#f472b6"/>' +
          '<stop offset="100%" stop-color="#be185d"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot16-obi" x1="0%" y1="0%" x2="100%" y2="0%">' +
          '<stop offset="0%" stop-color="#be185d"/>' +
          '<stop offset="28%" stop-color="#fb7185"/>' +
          '<stop offset="50%" stop-color="#fef3c7"/>' +
          '<stop offset="72%" stop-color="#fb7185"/>' +
          '<stop offset="100%" stop-color="#9f1239"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot16-gold" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#fef9c3"/>' +
          '<stop offset="50%" stop-color="#facc15"/>' +
          '<stop offset="100%" stop-color="#b45309"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot16-fold" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#831843" stop-opacity="0.38"/>' +
          '<stop offset="100%" stop-color="#f472b6" stop-opacity="0"/>' +
        "</linearGradient>" +
        '<radialGradient id="bot16-pearl" cx="35%" cy="35%" r="65%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="65%" stop-color="#fff1f2"/>' +
          '<stop offset="100%" stop-color="#f9a8d4"/>' +
        "</radialGradient>",
      backSvg:
        '<g>' +
          '<path d="M 244,448 C 192,508 150,624 140,746 Q 194,774 246,748 Q 300,776 354,748 Q 406,774 460,746 C 450,624 408,508 356,448 Z" fill="#fff1f5" stroke="#f9a8d4" stroke-width="1.2" opacity="0.9"/>' +
          // Trailing Kimono Ribbon Tails Behind Left & Right
          '<path d="M 246,456 C 216,526 196,608 190,692 L 214,678 L 228,696 C 234,616 250,536 266,460 Z" fill="#fbcfe8" stroke="#db2777" stroke-width="1"/>' +
          '<path d="M 354,456 C 384,526 404,608 410,692 L 386,678 L 372,696 C 366,616 350,536 334,460 Z" fill="#fbcfe8" stroke="#db2777" stroke-width="1"/>' +
        "</g>",
      svg:
        '<g>' +
          // Tier 3 (Mid-Calf Sakura Blossom Petal Tier)
          '<path d="M 190,602 C 166,648 150,698 148,744 Q 178,766 206,738 L 214,724 L 222,740 Q 258,768 292,740 L 300,722 L 308,740 Q 342,768 378,740 L 386,724 L 394,738 Q 422,766 452,744 C 450,698 434,648 410,602 Z" fill="url(#bot16-t3)" stroke="#9d174d" stroke-width="1.4"/>' +
          '<path d="M 218,622 L 204,738 L 228,740 L 238,622 Z" fill="url(#bot16-fold)"/>' +
          '<path d="M 362,622 L 372,740 L 396,738 L 382,622 Z" fill="url(#bot16-fold)"/>' +
          '<path d="M 150,740 Q 178,762 206,734 L 214,720 L 222,736 Q 258,764 292,736 L 300,718 L 308,736 Q 342,764 378,736 L 386,720 L 394,734 Q 422,762 450,740" fill="none" stroke="url(#bot16-gold)" stroke-width="2"/>' +
          // Tier 2 (Mid-Length Notched Cherry Petal Tier)
          '<path d="M 214,508 C 190,550 174,598 168,644 Q 198,666 226,640 L 234,626 L 242,642 Q 268,666 294,640 L 300,625 L 306,640 Q 332,666 358,642 L 366,626 L 374,640 Q 402,666 432,644 C 426,598 410,550 386,508 Z" fill="url(#bot16-t2)" stroke="#be185d" stroke-width="1.4"/>' +
          '<path d="M 170,640 Q 198,662 226,636 L 234,622 L 242,638 Q 268,662 294,636 L 300,621 L 306,636 Q 332,662 358,638 L 366,622 L 374,636 Q 402,662 430,640" fill="none" stroke="#fff5f9" stroke-width="2"/>' +
          // Tier 1 (Upper Hip Sakura Petal Peplum)
          '<path d="M 258,440 C 230,468 206,502 198,542 Q 226,562 252,538 L 260,526 L 268,540 Q 284,556 300,536 Q 316,556 332,540 L 340,526 L 348,538 Q 374,562 402,542 C 394,502 370,468 342,440 Z" fill="url(#bot16-t1)" stroke="#db2777" stroke-width="1.3"/>' +
          '<path d="M 200,538 Q 226,558 252,534 L 260,522 L 268,536 Q 284,552 300,532 Q 316,552 332,536 L 340,522 L 348,534 Q 374,558 400,538" fill="none" stroke="url(#bot16-gold)" stroke-width="1.6"/>' +
          // Embroidered Sakura Blossom Clusters & Pearl Garlands
          pearlArc(218, 590, 260, 622, 300, 594, 7, 2.5, "bot16-pearl", "#db2777") +
          pearlArc(300, 594, 340, 622, 382, 590, 7, 2.5, "bot16-pearl", "#db2777") +
          sakuraFlower(242, 596, 0.85, "#fff5f9", "#fde047", "#db2777") +
          sakuraFlower(358, 596, 0.85, "#fff5f9", "#fde047", "#db2777") +
          sakuraFlower(196, 686, 0.95, "#ffe4f2", "#fde047", "#be185d") +
          sakuraFlower(404, 686, 0.95, "#ffe4f2", "#fde047", "#be185d") +
          sakuraFlower(300, 696, 0.82, "#ffffff", "#facc15", "#ec4899") +
          sakuraFlower(262, 650, 0.56, "#ffffff", "#fde047", "#ec4899") +
          sakuraFlower(338, 650, 0.56, "#ffffff", "#fde047", "#ec4899") +
          // Traditional Gold-Brocade Kimono Obi Sash + Hanging Front Sash Tails + Obijime Clasp
          '<path d="M 262,452 C 254,492 246,538 242,584 L 258,574 L 270,588 C 274,540 278,494 282,452 Z" fill="url(#bot16-obi)" stroke="#9f1239" stroke-width="1.2"/>' +
          '<path d="M 258,424 Q 300,434 342,424 L 345,454 Q 300,464 255,454 Z" fill="url(#bot16-obi)" stroke="#9f1239" stroke-width="1.3"/>' +
          '<path d="M 256,439 Q 300,449 344,439" fill="none" stroke="url(#bot16-gold)" stroke-width="2.6"/>' +
          '<path d="M 256,439 Q 300,449 344,439" fill="none" stroke="#ffffff" stroke-width="1" stroke-dasharray="3 3"/>' +
          sakuraFlower(300, 441, 0.92, "#ffe4f2", "#facc15", "#be185d") +
          sparkleCluster([
            [180, 640, 6, "#ffffff", 0.92], [420, 640, 6, "#ffffff", 0.92],
            [300, 636, 7, "#fef9c3", 0.95], [228, 725, 6, "#ffffff", 0.9],
            [372, 725, 6, "#ffffff", 0.9]
          ]) +
        "</g>"
    },

    // 17. Váy Dạ Hội Hồng Ngọc Hoàng Gia
    {
      id: "bot-17",
      name: "Váy Dạ Hội Hồng Ngọc Hoàng Gia",
      icon: "💎",
      accentColor: "#e11d48",
      previewBox: "66 414 468 468",
      defs:
        '<linearGradient id="bot17-train" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#881337"/>' +
          '<stop offset="55%" stop-color="#be123c"/>' +
          '<stop offset="100%" stop-color="#fda4af"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot17-ivory" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="52%" stop-color="#fffbeb"/>' +
          '<stop offset="100%" stop-color="#fde68a"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot17-ruby" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#fb7185"/>' +
          '<stop offset="35%" stop-color="#e11d48"/>' +
          '<stop offset="78%" stop-color="#9f1239"/>' +
          '<stop offset="100%" stop-color="#4c0519"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot17-fold" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#4c0519" stop-opacity="0.58"/>' +
          '<stop offset="100%" stop-color="#9f1239" stop-opacity="0"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot17-hi" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffe4e6" stop-opacity="0.65"/>' +
          '<stop offset="100%" stop-color="#fb7185" stop-opacity="0"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot17-gold" x1="0%" y1="0%" x2="100%" y2="0%">' +
          '<stop offset="0%" stop-color="#92400e"/>' +
          '<stop offset="28%" stop-color="#fcd34d"/>' +
          '<stop offset="50%" stop-color="#fef9c3"/>' +
          '<stop offset="72%" stop-color="#fbbf24"/>' +
          '<stop offset="100%" stop-color="#78350f"/>' +
        "</linearGradient>" +
        '<radialGradient id="bot17-gem" cx="35%" cy="30%" r="70%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="38%" stop-color="#ff4d6d"/>' +
          '<stop offset="100%" stop-color="#881337"/>' +
        "</radialGradient>" +
        '<radialGradient id="bot17-pearl" cx="35%" cy="35%" r="65%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="65%" stop-color="#fffbeb"/>' +
          '<stop offset="100%" stop-color="#e5c185"/>' +
        "</radialGradient>",
      backSvg:
        '<g>' +
          '<path d="M 255,440 C 178,505 102,670 78,856 Q 186,888 300,858 Q 414,888 522,856 C 498,670 422,505 345,440 Z" fill="url(#bot17-train)" stroke="#4c0519" stroke-width="1.4"/>' +
          '<path d="M 82,854 Q 114,880 148,860 Q 184,884 220,860 Q 260,876 300,856 Q 340,876 380,860 Q 416,884 452,860 Q 486,880 518,854" fill="none" stroke="url(#bot17-gold)" stroke-width="2.4"/>' +
        "</g>",
      svg:
        '<g>' +
          // Champagne-Gold Quilted Undergown Arched Gently at Center Front so Shoes Remain Visible
          '<path d="M 258,438 C 218,504 166,670 150,828 Q 225,808 300,782 Q 375,808 450,828 C 434,670 382,504 342,438 Z" fill="url(#bot17-ivory)" stroke="#d97706" stroke-width="1.4"/>' +
          '<path d="M 234,630 L 268,668 L 300,630 L 332,668 L 366,630 M 212,718 L 256,758 L 300,718 L 344,758 L 388,718" fill="none" stroke="#f59e0b" stroke-width="1.3" opacity="0.68"/>' +
          '<path d="M 152,824 Q 188,808 224,798 Q 262,786 300,778 Q 338,786 376,798 Q 412,808 448,824" fill="none" stroke="url(#bot17-gold)" stroke-width="2.8"/>' +
          // Royal Ruby Velvet Split Pannier Overskirts (Left & Right)
          '<path d="M 258,438 C 194,486 122,638 102,840 Q 148,858 190,836 C 202,740 226,635 260,545 C 274,508 288,474 300,452 L 274,438 Z" fill="url(#bot17-ruby)" stroke="#4c0519" stroke-width="1.5"/>' +
          '<path d="M 342,438 C 406,486 478,638 498,840 Q 452,858 410,836 C 398,740 374,635 340,545 C 326,508 312,474 300,452 L 326,438 Z" fill="url(#bot17-ruby)" stroke="#4c0519" stroke-width="1.5"/>' +
          // Velvet Drapery Shadows & Silk Specular Streaks
          '<path d="M 244,458 C 196,540 156,678 140,842 L 166,844 C 180,682 214,544 256,458 Z" fill="url(#bot17-fold)"/>' +
          '<path d="M 356,458 C 404,540 444,678 460,842 L 434,844 C 420,682 386,544 344,458 Z" fill="url(#bot17-fold)"/>' +
          '<path d="M 224,468 C 184,548 146,680 128,836 L 150,838 C 168,682 204,552 240,468 Z" fill="url(#bot17-hi)"/>' +
          '<path d="M 376,468 C 416,548 454,680 472,836 L 450,838 C 432,682 396,552 360,468 Z" fill="url(#bot17-hi)"/>' +
          // Gold Bullion Piping Along Split Panniers + Pearl Swags
          '<path d="M 300,452 C 266,518 216,655 190,836 M 300,452 C 334,518 384,655 410,836" fill="none" stroke="url(#bot17-gold)" stroke-width="2.8"/>' +
          '<path d="M 104,836 Q 146,856 190,834 M 410,834 Q 454,856 496,836" fill="none" stroke="#fef3c7" stroke-width="2.2"/>' +
          pearlArc(206, 565, 252, 618, 298, 578, 8, 3.0, "bot17-pearl", "#b45309") +
          pearlArc(302, 578, 348, 618, 394, 565, 8, 3.0, "bot17-pearl", "#b45309") +
          bow25D(206, 565, 0.56, "url(#bot17-gold)", "#b45309", "#78350f", 54) +
          bow25D(394, 565, 0.56, "url(#bot17-gold)", "#b45309", "#78350f", 54) +
          // Pointed Royal Basque Waistband + Giant Faceted Ruby Crest
          '<path d="M 258,426 Q 300,434 342,426 L 344,444 Q 320,448 300,458 Q 280,448 256,444 Z" fill="url(#bot17-gold)" stroke="#78350f" stroke-width="1.3"/>' +
          ovalGem(300, 442, 9.5, 11.5, "url(#bot17-gem)", "#fef9c3") +
          ovalGem(274, 438, 4.2, 5.2, "url(#bot17-gem)", "#fef9c3") +
          ovalGem(326, 438, 4.2, 5.2, "url(#bot17-gem)", "#fef9c3") +
          sparkleCluster([
            [156, 755, 8, "#ffffff", 0.95], [444, 755, 8, "#ffffff", 0.95],
            [300, 680, 8, "#fef08a", 0.95], [248, 615, 6, "#ffffff", 0.9],
            [352, 615, 6, "#ffffff", 0.9], [300, 442, 6, "#ffffff", 0.96]
          ]) +
        "</g>"
    },

    // 18. Quần Short Yếm Hồng Kẹo Ngọt
    {
      id: "bot-18",
      name: "Quần Short Yếm Hồng Kẹo Ngọt",
      icon: "🎀",
      accentColor: "#f9a8d4",
      previewBox: "188 320 224 264",
      defs:
        '<linearGradient id="bot18-candy" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffe4f2"/>' +
          '<stop offset="48%" stop-color="#f9a8d4"/>' +
          '<stop offset="100%" stop-color="#ec4899"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot18-bib" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#fff5fa"/>' +
          '<stop offset="60%" stop-color="#fbcfe8"/>' +
          '<stop offset="100%" stop-color="#f472b6"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot18-ribbon" x1="0%" y1="0%" x2="100%" y2="0%">' +
          '<stop offset="0%" stop-color="#db2777"/>' +
          '<stop offset="35%" stop-color="#ff85c2"/>' +
          '<stop offset="55%" stop-color="#ffe4f2"/>' +
          '<stop offset="100%" stop-color="#be185d"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot18-lace" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="100%" stop-color="#fff1f5"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot18-gold" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#fef9c3"/>' +
          '<stop offset="50%" stop-color="#facc15"/>' +
          '<stop offset="100%" stop-color="#ca8a04"/>' +
        "</linearGradient>" +
        '<radialGradient id="bot18-pearl" cx="35%" cy="35%" r="65%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="65%" stop-color="#fff1f5"/>' +
          '<stop offset="100%" stop-color="#f472b6"/>' +
        "</radialGradient>",
      backSvg:
        '<g>' +
          '<path d="M 263,332 L 274,332 L 276,374 L 265,374 Z" fill="#f472b6" stroke="#be185d" stroke-width="1"/>' +
          '<path d="M 337,332 L 326,332 L 324,374 L 335,374 Z" fill="#f472b6" stroke="#be185d" stroke-width="1"/>' +
          '<path d="M 222,538 L 298,534 L 298,560 Q 260,568 220,556 Z" fill="#f472b6" stroke="#be185d" stroke-width="1"/>' +
          '<path d="M 378,538 L 302,534 L 302,560 Q 340,568 380,556 Z" fill="#f472b6" stroke="#be185d" stroke-width="1"/>' +
        "</g>",
      svg:
        '<g>' +
          // Pinafore Overall Straps & Quilted Candy Bib
          '<path d="M 263,330 L 275,330 L 278,376 L 266,376 Z" fill="url(#bot18-bib)" stroke="#db2777" stroke-width="1.2"/>' +
          '<path d="M 337,330 L 325,330 L 322,376 L 334,376 Z" fill="url(#bot18-bib)" stroke="#db2777" stroke-width="1.2"/>' +
          '<path d="M 268,368 Q 300,378 332,368 L 336,434 L 264,434 Z" fill="url(#bot18-bib)" stroke="#db2777" stroke-width="1.3"/>' +
          '<path d="M 268,368 Q 284,375 300,373 Q 316,375 332,368" fill="none" stroke="#ffffff" stroke-width="2.4" stroke-linecap="round"/>' +
          '<path d="M 284,388 C 284,382 294,380 300,387 C 306,380 316,382 316,388 C 316,400 300,412 300,412 C 300,412 284,400 284,388 Z" fill="#ffffff" stroke="#f472b6" stroke-width="1.1"/>' +
          heartGem(272, 372, 0.58, "url(#bot18-gold)", "#92400e") +
          heartGem(328, 372, 0.58, "url(#bot18-gold)", "#92400e") +
          // High-Waisted Candy-Pink Overall Culotte Shorts
          '<path d="M 258,434 C 240,462 225,495 218,546 Q 240,562 260,547 Q 280,562 298,546 L 300,534 L 302,546 Q 320,562 340,547 Q 360,562 382,546 C 375,495 360,462 342,434 Z" fill="url(#bot18-candy)" stroke="#be185d" stroke-width="1.5"/>' +
          // 2.5D Satin Gloss Curves & Fly Topstitching
          '<path d="M 256,454 C 246,484 240,512 238,540 L 262,540 C 264,512 268,484 274,454 Z" fill="#ffffff" opacity="0.28"/>' +
          '<path d="M 344,454 C 354,484 360,512 362,540 L 338,540 C 336,512 332,484 326,454 Z" fill="#ffffff" opacity="0.24"/>' +
          '<path d="M 300,446 L 300,532" fill="none" stroke="#9d174d" stroke-width="1.3" opacity="0.55"/>' +
          // Ruffled Heart Front Pockets with Pearl Trim
          '<path d="M 244,468 C 244,461 254,459 260,466 C 266,459 276,461 276,468 C 276,482 260,494 260,494 C 260,494 244,482 244,468 Z" fill="#fff1f5" stroke="#ec4899" stroke-width="1.1"/>' +
          '<path d="M 324,468 C 324,461 334,459 340,466 C 346,459 356,461 356,468 C 356,482 340,494 340,494 C 340,494 324,482 324,468 Z" fill="#fff1f5" stroke="#ec4899" stroke-width="1.1"/>' +
          // Cream-Lace Scalloped Shorts Leg Cuffs
          '<path d="M 218,536 Q 238,556 258,538 Q 278,556 298,536 L 298,548 Q 278,564 258,548 Q 238,564 218,548 Z" fill="url(#bot18-lace)" stroke="#ec4899" stroke-width="1"/>' +
          '<path d="M 302,536 Q 322,556 342,538 Q 362,556 382,536 L 382,548 Q 362,564 342,548 Q 322,564 302,548 Z" fill="url(#bot18-lace)" stroke="#ec4899" stroke-width="1"/>' +
          // Prominent Candy Waistband + Suspender Buckle Tabs (Visible Under Tops Too!)
          '<path d="M 258,426 Q 300,434 342,426 L 344,445 Q 300,453 256,445 Z" fill="url(#bot18-ribbon)" stroke="#9d174d" stroke-width="1.3"/>' +
          '<rect x="266" y="427" width="11" height="32" rx="4" fill="url(#bot18-bib)" stroke="#db2777" stroke-width="1.1"/>' +
          '<rect x="323" y="427" width="11" height="32" rx="4" fill="url(#bot18-bib)" stroke="#db2777" stroke-width="1.1"/>' +
          heartGem(271.5, 450, 0.56, "url(#bot18-gold)", "#92400e") +
          heartGem(328.5, 450, 0.56, "url(#bot18-gold)", "#92400e") +
          pearlRow([[288, 454], [300, 456], [312, 454]], 2.6, "bot18-pearl", "#db2777") +
          // Plump Candy Bows on Outer Shorts Hems
          bow25D(226, 520, 0.58, "url(#bot18-ribbon)", "#db2777", "#831843", 44) +
          bow25D(374, 520, 0.58, "url(#bot18-ribbon)", "#db2777", "#831843", 44) +
          sparkleCluster([[300, 488, 5, "#ffffff", 0.92], [250, 514, 5, "#ffffff", 0.9], [350, 514, 5, "#ffffff", 0.9]]) +
        "</g>"
    },

    // 19. Váy Tiên Rừng Lá Ngọc Lục Bảo
    {
      id: "bot-19",
      name: "Váy Tiên Rừng Lá Ngọc Lục Bảo",
      icon: "🍃",
      accentColor: "#10b981",
      previewBox: "132 412 336 360",
      defs:
        '<linearGradient id="bot19-dark" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#34d399"/>' +
          '<stop offset="52%" stop-color="#059669"/>' +
          '<stop offset="100%" stop-color="#064e3b"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot19-mid" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#a7f3d0"/>' +
          '<stop offset="48%" stop-color="#10b981"/>' +
          '<stop offset="100%" stop-color="#047857"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot19-light" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#ecfccb"/>' +
          '<stop offset="50%" stop-color="#6ee7b7"/>' +
          '<stop offset="100%" stop-color="#059669"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot19-vine" x1="0%" y1="0%" x2="100%" y2="0%">' +
          '<stop offset="0%" stop-color="#065f46"/>' +
          '<stop offset="32%" stop-color="#34d399"/>' +
          '<stop offset="50%" stop-color="#fef9c3"/>' +
          '<stop offset="70%" stop-color="#34d399"/>' +
          '<stop offset="100%" stop-color="#064e3b"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot19-gold" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#fef9c3"/>' +
          '<stop offset="50%" stop-color="#facc15"/>' +
          '<stop offset="100%" stop-color="#b45309"/>' +
        "</linearGradient>" +
        '<radialGradient id="bot19-dew" cx="35%" cy="30%" r="70%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="50%" stop-color="#d9f99d"/>' +
          '<stop offset="100%" stop-color="#10b981"/>' +
        "</radialGradient>" +
        '<radialGradient id="bot19-gem" cx="35%" cy="30%" r="70%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="42%" stop-color="#6ee7b7"/>' +
          '<stop offset="100%" stop-color="#065f46"/>' +
        "</radialGradient>",
      backSvg:
        '<g>' +
          '<path d="M 250,450 C 194,515 152,625 148,722 Q 186,700 220,645 Q 238,718 262,748 Q 290,695 300,648 Q 310,695 338,748 Q 362,718 380,645 Q 414,700 452,722 C 448,625 406,515 350,450 Z" fill="url(#bot19-dark)" stroke="#064e3b" stroke-width="1.3" opacity="0.9"/>' +
          '<circle cx="164" cy="686" r="5" fill="#d9f99d" opacity="0.55"/>' +
          '<circle cx="436" cy="686" r="5" fill="#d9f99d" opacity="0.55"/>' +
        "</g>",
      svg:
        '<g>' +
          // Bottom Emerald Leaf Blade Tier
          '<path d="M 244,475 C 198,552 170,648 168,735 Q 208,698 236,635 Q 248,708 268,744 Q 292,690 300,640 Q 308,690 332,744 Q 352,708 364,635 Q 392,698 432,735 C 430,648 402,552 356,475 Z" fill="url(#bot19-dark)" stroke="#064e3b" stroke-width="1.4"/>' +
          '<path d="M 228,550 Q 200,636 178,718 M 266,562 Q 266,646 268,728 M 334,562 Q 334,646 332,728 M 372,550 Q 400,636 422,718" fill="none" stroke="#a7f3d0" stroke-width="1.3" opacity="0.65"/>' +
          // Mid Jade-Mint Pointed Botanical Leaves
          '<path d="M 250,452 C 202,502 178,582 180,656 Q 218,672 246,608 Q 272,672 300,658 Q 328,672 354,608 Q 382,672 420,656 C 422,582 398,502 350,452 Z" fill="url(#bot19-mid)" stroke="#065f46" stroke-width="1.4"/>' +
          '<path d="M 234,515 Q 210,582 194,644 M 278,522 Q 288,588 298,648 M 322,522 Q 312,588 302,648 M 366,515 Q 390,582 406,644" fill="none" stroke="#fef9c3" stroke-width="1.3" opacity="0.65"/>' +
          // Top Spring-Chartreuse & Emerald Leaf Petals
          '<path d="M 258,438 C 216,470 194,518 196,568 Q 230,584 258,542 Q 282,586 300,568 Q 318,586 342,542 Q 370,584 404,568 C 406,518 384,470 342,438 Z" fill="url(#bot19-light)" stroke="#047857" stroke-width="1.4"/>' +
          '<path d="M 258,452 Q 232,502 214,556 M 300,455 L 300,558 M 342,452 Q 368,502 386,556" fill="none" stroke="#ffffff" stroke-width="1.4" opacity="0.7"/>' +
          // Golden Forest Vine Garlands & Dewdrop Gems
          '<path d="M 220,542 Q 260,574 300,552 Q 340,574 380,542" fill="none" stroke="url(#bot19-gold)" stroke-width="1.8" opacity="0.9"/>' +
          pearlArc(206, 512, 252, 542, 300, 518, 6, 2.7, "bot19-dew", "#047857") +
          pearlArc(300, 518, 348, 542, 394, 512, 6, 2.7, "bot19-dew", "#047857") +
          '<circle cx="176" cy="722" r="4" fill="url(#bot19-dew)" stroke="#ffffff" stroke-width="0.9"/>' +
          '<circle cx="268" cy="732" r="4.2" fill="url(#bot19-dew)" stroke="#ffffff" stroke-width="0.9"/>' +
          '<circle cx="332" cy="732" r="4.2" fill="url(#bot19-dew)" stroke="#ffffff" stroke-width="0.9"/>' +
          '<circle cx="424" cy="722" r="4" fill="url(#bot19-dew)" stroke="#ffffff" stroke-width="0.9"/>' +
          // Braided Forest Vine Waistband + Emerald Leaf Jewel Brooch
          '<path d="M 258,426 Q 300,435 342,426 L 344,445 Q 300,454 256,445 Z" fill="url(#bot19-vine)" stroke="#064e3b" stroke-width="1.3"/>' +
          ovalGem(300, 441, 7.5, 9.5, "url(#bot19-gem)", "#fef9c3") +
          sakuraFlower(274, 439, 0.56, "#ecfccb", "#facc15", "#059669") +
          sakuraFlower(326, 439, 0.56, "#ecfccb", "#facc15", "#059669") +
          // Glowing Forest Fairy Firefly Motes
          sparkleCluster([
            [225, 588, 6, "#fef9c3", 0.95], [375, 588, 6, "#fef9c3", 0.95],
            [300, 622, 8, "#d9f99d", 0.98], [198, 668, 6, "#ffffff", 0.9],
            [402, 668, 6, "#ffffff", 0.9]
          ]) +
        "</g>"
    },

    // 20. Váy Thiên Nga Bạc Ánh Trăng
    {
      id: "bot-20",
      name: "Váy Thiên Nga Bạc Ánh Trăng",
      icon: "🦢",
      accentColor: "#38bdf8",
      previewBox: "76 414 448 456",
      defs:
        '<linearGradient id="bot20-wing" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="52%" stop-color="#e0f2fe"/>' +
          '<stop offset="100%" stop-color="#7dd3fc"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot20-feather" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="58%" stop-color="#bae6fd"/>' +
          '<stop offset="100%" stop-color="#64748b"/>' +
        "</linearGradient>" +
        '<radialGradient id="bot20-tulle" cx="50%" cy="32%" r="68%">' +
          '<stop offset="0%" stop-color="#ffffff" stop-opacity="0.94"/>' +
          '<stop offset="55%" stop-color="#bae6fd" stop-opacity="0.72"/>' +
          '<stop offset="100%" stop-color="#38bdf8" stop-opacity="0.48"/>' +
        "</radialGradient>" +
        '<linearGradient id="bot20-silver" x1="0%" y1="0%" x2="100%" y2="0%">' +
          '<stop offset="0%" stop-color="#475569"/>' +
          '<stop offset="28%" stop-color="#e2e8f0"/>' +
          '<stop offset="50%" stop-color="#ffffff"/>' +
          '<stop offset="72%" stop-color="#bae6fd"/>' +
          '<stop offset="100%" stop-color="#334155"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot20-hi" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffffff" stop-opacity="0.75"/>' +
          '<stop offset="100%" stop-color="#e0f2fe" stop-opacity="0"/>' +
        "</linearGradient>" +
        '<radialGradient id="bot20-gem" cx="35%" cy="30%" r="70%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="45%" stop-color="#38bdf8"/>' +
          '<stop offset="100%" stop-color="#0369a1"/>' +
        "</radialGradient>" +
        '<radialGradient id="bot20-pearl" cx="35%" cy="35%" r="65%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="65%" stop-color="#f1f5f9"/>' +
          '<stop offset="100%" stop-color="#94a3b8"/>' +
        "</radialGradient>",
      backSvg:
        '<g>' +
          // Sweeping Moonlit Feathered Swan Wing Train Behind Left & Right (Legs & Shoes Stay Open)
          '<path d="M 256,444 C 188,488 106,612 90,828 Q 134,854 176,812 Q 204,836 226,776 C 234,695 248,572 268,468 Z" fill="url(#bot20-wing)" stroke="#64748b" stroke-width="1.3"/>' +
          '<path d="M 344,444 C 412,488 494,612 510,828 Q 466,854 424,812 Q 396,836 374,776 C 366,695 352,572 332,468 Z" fill="url(#bot20-wing)" stroke="#64748b" stroke-width="1.3"/>' +
          featherPlume(202, 578, 175, 18, 22, "url(#bot20-feather)", "#64748b", "#ffffff") +
          featherPlume(172, 622, 185, 18, 16, "url(#bot20-wing)", "#64748b", "#ffffff") +
          featherPlume(398, 578, 175, 18, -22, "url(#bot20-feather)", "#64748b", "#ffffff") +
          featherPlume(428, 622, 185, 18, -16, "url(#bot20-wing)", "#64748b", "#ffffff") +
          sparkleCluster([[126, 775, 7, "#ffffff", 0.95], [474, 775, 7, "#ffffff", 0.95]]) +
        "</g>",
      svg:
        '<g>' +
          // Frothy Moonlit Silver-Blue Tulle Ballet Tiers (Arched Up at Center Front)
          '<path d="M 244,458 C 192,500 156,568 158,644 Q 198,668 238,638 Q 272,616 300,602 Q 328,616 362,638 Q 402,668 442,644 C 444,568 408,500 356,458 Z" fill="url(#bot20-tulle)" stroke="#38bdf8" stroke-width="1.2"/>' +
          '<path d="M 250,450 C 204,486 176,542 178,602 Q 214,624 252,598 Q 280,582 300,574 Q 320,582 348,598 Q 386,624 422,602 C 424,542 396,486 350,450 Z" fill="url(#bot20-tulle)" stroke="#bae6fd" stroke-width="1.1"/>' +
          '<path d="M 278,458 L 238,616 M 294,458 L 284,588 M 306,458 L 316,588 M 322,458 L 362,616" fill="none" stroke="#ffffff" stroke-width="1.5" opacity="0.68"/>' +
          // 2.5D Sculpted Layered Swan-Wing Plumage Peplum Over Hips
          featherPlume(258, 444, 118, 19, 34, "url(#bot20-feather)", "#64748b", "#ffffff") +
          featherPlume(272, 446, 124, 18, 22, "url(#bot20-wing)", "#64748b", "#ffffff") +
          featherPlume(288, 448, 112, 16, 10, "url(#bot20-wing)", "#94a3b8", "#ffffff") +
          featherPlume(342, 444, 118, 19, -34, "url(#bot20-feather)", "#64748b", "#ffffff") +
          featherPlume(328, 446, 124, 18, -22, "url(#bot20-wing)", "#64748b", "#ffffff") +
          featherPlume(312, 448, 112, 16, -10, "url(#bot20-wing)", "#94a3b8", "#ffffff") +
          // Silver Pearl Swags & Moonlit Tiara Waistband
          pearlArc(206, 555, 252, 594, 300, 566, 7, 2.8, "bot20-pearl", "#64748b") +
          pearlArc(300, 566, 348, 594, 394, 555, 7, 2.8, "bot20-pearl", "#64748b") +
          '<path d="M 258,426 Q 300,434 342,426 L 344,444 Q 320,448 300,456 Q 280,448 256,444 Z" fill="url(#bot20-silver)" stroke="#334155" stroke-width="1.3"/>' +
          // Crescent Moon + Ice Sapphire Center Brooch
          '<path d="M 294,432 A 9.5,9.5 0 1,0 307,445 A 7.5,7.5 0 1,1 294,432 Z" fill="#ffffff" stroke="#0284c7" stroke-width="0.9"/>' +
          ovalGem(301, 441, 5.2, 6.4, "url(#bot20-gem)", "#ffffff") +
          sparkleCluster([
            [196, 520, 6, "#ffffff", 0.95], [404, 520, 6, "#ffffff", 0.95],
            [300, 548, 8, "#ffffff", 0.98], [218, 608, 6, "#e0f2fe", 0.92],
            [382, 608, 6, "#e0f2fe", 0.92]
          ]) +
        "</g>"
    },

    // 21. Chân Váy Cyber Idol Phối Dây Đai
    {
      id: "bot-21",
      name: "Chân Váy Cyber Idol Phối Dây Đai",
      icon: "⚡",
      accentColor: "#06b6d4",
      previewBox: "176 410 248 258",
      defs:
        '<linearGradient id="bot21-base" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#1e293b"/>' +
          '<stop offset="52%" stop-color="#0f172a"/>' +
          '<stop offset="100%" stop-color="#020617"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot21-pleat" x1="0%" y1="0%" x2="100%" y2="0%">' +
          '<stop offset="0%" stop-color="#06b6d4" stop-opacity="0.35"/>' +
          '<stop offset="48%" stop-color="#0f172a" stop-opacity="0"/>' +
          '<stop offset="100%" stop-color="#ffffff" stop-opacity="0.24"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot21-holo" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#67e8f9" stop-opacity="0.82"/>' +
          '<stop offset="48%" stop-color="#a855f7" stop-opacity="0.68"/>' +
          '<stop offset="100%" stop-color="#ec4899" stop-opacity="0.78"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot21-strap" x1="0%" y1="0%" x2="100%" y2="0%">' +
          '<stop offset="0%" stop-color="#0f172a"/>' +
          '<stop offset="40%" stop-color="#334155"/>' +
          '<stop offset="100%" stop-color="#020617"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot21-neon" x1="0%" y1="0%" x2="100%" y2="0%">' +
          '<stop offset="0%" stop-color="#06b6d4"/>' +
          '<stop offset="50%" stop-color="#a5f3fc"/>' +
          '<stop offset="100%" stop-color="#ec4899"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot21-silver" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#f8fafc"/>' +
          '<stop offset="50%" stop-color="#94a3b8"/>' +
          '<stop offset="100%" stop-color="#334155"/>' +
        "</linearGradient>",
      backSvg:
        '<g>' +
          '<path d="M 222,520 L 378,520 L 388,572 Q 300,586 212,572 Z" fill="#020617" stroke="#06b6d4" stroke-width="1"/>' +
          // Trailing Neon-Cyan & Holographic Cyber Harness Ribbons
          '<path d="M 226,456 C 204,518 192,586 186,650 L 204,638 L 214,654 C 220,592 230,524 244,462 Z" fill="url(#bot21-holo)" stroke="#22d3ee" stroke-width="1"/>' +
          '<path d="M 374,456 C 396,518 408,586 414,650 L 396,638 L 386,654 C 380,592 370,524 356,462 Z" fill="url(#bot21-holo)" stroke="#ec4899" stroke-width="1"/>' +
        "</g>",
      svg:
        '<g>' +
          // Pleated Cyber-Navy Tech Mini-Skirt Base (Covering Shorts Fully)
          '<path d="M 258,436 C 238,472 216,518 206,566 Q 300,584 394,566 C 384,518 362,472 342,436 Z" fill="url(#bot21-base)" stroke="#06b6d4" stroke-width="1.4"/>' +
          // Sharp Cyber Knife Pleats (Left & Center)
          '<path d="M 264,442 L 218,566 L 236,569 L 274,442 Z" fill="url(#bot21-pleat)"/>' +
          '<path d="M 282,444 L 252,572 L 270,573 L 292,444 Z" fill="url(#bot21-pleat)"/>' +
          '<path d="M 300,445 L 288,574 L 306,574 L 310,445 Z" fill="url(#bot21-pleat)"/>' +
          '<path d="M 264,443 L 218,566 M 282,444 L 252,572 M 300,445 L 288,574" fill="none" stroke="#22d3ee" stroke-width="1.1" opacity="0.72"/>' +
          // Neon Cyan & Magenta Circuit Hem Piping
          '<path d="M 207,560 Q 300,578 393,560" fill="none" stroke="url(#bot21-neon)" stroke-width="2.6"/>' +
          '<path d="M 212,550 Q 300,568 388,550" fill="none" stroke="#22d3ee" stroke-width="1" stroke-dasharray="6 4" opacity="0.75"/>' +
          // Asymmetrical Translucent Holographic Side Wrap Panel
          '<path d="M 294,444 C 316,482 332,526 322,576 Q 360,576 394,562 C 384,518 364,474 342,440 Z" fill="url(#bot21-holo)" stroke="#a5f3fc" stroke-width="1.3"/>' +
          '<path d="M 326,480 L 352,480 L 360,492 L 376,492 M 332,522 L 354,522 L 364,536" fill="none" stroke="#ffffff" stroke-width="1.2" opacity="0.82"/>' +
          // Neon Lightning Emblem on Wrap Flap
          '<polygon points="354,498 344,515 352,515 346,532 364,511 355,511" fill="#fef08a" stroke="#06b6d4" stroke-width="0.9"/>' +
          // Tactical Cyber Waist Belt + Metal D-Rings + Crossed Hip Utility Straps
          '<path d="M 256,424 Q 300,433 344,424 L 346,446 Q 300,455 254,446 Z" fill="url(#bot21-strap)" stroke="#22d3ee" stroke-width="1.3"/>' +
          '<path d="M 256,431 Q 300,440 344,431" fill="none" stroke="url(#bot21-neon)" stroke-width="1.8"/>' +
          '<path d="M 258,444 Q 242,488 228,536" fill="none" stroke="url(#bot21-strap)" stroke-width="5.2" stroke-linecap="round"/>' +
          '<path d="M 258,444 Q 242,488 228,536" fill="none" stroke="#22d3ee" stroke-width="1.1" stroke-linecap="round"/>' +
          '<path d="M 342,444 Q 358,488 372,536" fill="none" stroke="url(#bot21-strap)" stroke-width="5.2" stroke-linecap="round"/>' +
          '<path d="M 342,444 Q 358,488 372,536" fill="none" stroke="#ec4899" stroke-width="1.1" stroke-linecap="round"/>' +
          '<circle cx="258" cy="444" r="4.5" fill="none" stroke="url(#bot21-silver)" stroke-width="2"/>' +
          '<circle cx="342" cy="444" r="4.5" fill="none" stroke="url(#bot21-silver)" stroke-width="2"/>' +
          '<rect x="234" y="486" width="11" height="8" rx="2" transform="rotate(18 234 486)" fill="url(#bot21-silver)" stroke="#0f172a" stroke-width="0.8"/>' +
          '<rect x="355" y="486" width="11" height="8" rx="2" transform="rotate(-18 355 486)" fill="url(#bot21-silver)" stroke="#0f172a" stroke-width="0.8"/>' +
          // Glowing Hexagonal Cyber Core Belt Buckle
          '<polygon points="300,429 311,435 311,445 300,451 289,445 289,435" fill="url(#bot21-silver)" stroke="#0f172a" stroke-width="1.1"/>' +
          '<polygon points="300,432 307,436 307,444 300,448 293,444 293,436" fill="#22d3ee" stroke="#ffffff" stroke-width="0.8"/>' +
          // Cyber Thigh-Garter Harness Strap Hugging Left Leg (x: 249..296, y: 576..592)
          '<path d="M 248,576 Q 272,586 296,576 L 296,586 Q 272,596 249,586 Z" fill="url(#bot21-strap)" stroke="#22d3ee" stroke-width="1.1"/>' +
          '<path d="M 250,581 Q 272,591 295,581" fill="none" stroke="#22d3ee" stroke-width="1.2"/>' +
          '<rect x="267" y="578" width="9" height="9" rx="2" fill="url(#bot21-silver)" stroke="#22d3ee" stroke-width="0.8"/>' +
          sparkleCluster([
            [236, 540, 6, "#67e8f9", 0.95], [372, 474, 6, "#ffffff", 0.95],
            [300, 440, 5, "#ffffff", 0.95], [272, 583, 5, "#a5f3fc", 0.95]
          ]) +
        "</g>"
    },

    // 22. Váy Phượng Hoàng Lửa Đuôi Dài
    {
      id: "bot-22",
      name: "Váy Phượng Hoàng Lửa Đuôi Dài",
      icon: "🔥",
      accentColor: "#f97316",
      previewBox: "64 414 472 470",
      defs:
        '<linearGradient id="bot22-tail" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#991b1b"/>' +
          '<stop offset="45%" stop-color="#ea580c"/>' +
          '<stop offset="80%" stop-color="#f59e0b"/>' +
          '<stop offset="100%" stop-color="#fef08a"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot22-flame" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#fef08a"/>' +
          '<stop offset="48%" stop-color="#f97316"/>' +
          '<stop offset="100%" stop-color="#b91c1c"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot22-crimson" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#fb923c"/>' +
          '<stop offset="35%" stop-color="#dc2626"/>' +
          '<stop offset="78%" stop-color="#991b1b"/>' +
          '<stop offset="100%" stop-color="#450a0a"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot22-gold" x1="0%" y1="0%" x2="100%" y2="0%">' +
          '<stop offset="0%" stop-color="#b45309"/>' +
          '<stop offset="30%" stop-color="#fcd34d"/>' +
          '<stop offset="50%" stop-color="#fef9c3"/>' +
          '<stop offset="70%" stop-color="#fbbf24"/>' +
          '<stop offset="100%" stop-color="#92400e"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot22-fold" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#450a0a" stop-opacity="0.56"/>' +
          '<stop offset="100%" stop-color="#b91c1c" stop-opacity="0"/>' +
        "</linearGradient>" +
        '<linearGradient id="bot22-hi" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#fef08a" stop-opacity="0.65"/>' +
          '<stop offset="100%" stop-color="#f97316" stop-opacity="0"/>' +
        "</linearGradient>" +
        '<radialGradient id="bot22-gem" cx="35%" cy="30%" r="70%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="40%" stop-color="#fb923c"/>' +
          '<stop offset="100%" stop-color="#991b1b"/>' +
        "</radialGradient>",
      backSvg:
        '<g>' +
          // Majestic Fire-Phoenix Long Tail Train Flanking Left & Right (Legs & Shoes Stay Open)
          '<path d="M 256,442 C 178,496 98,638 78,842 Q 112,876 146,844 Q 178,874 206,826 C 220,735 238,595 268,468 Z" fill="url(#bot22-tail)" stroke="#7c2d12" stroke-width="1.4"/>' +
          '<path d="M 344,442 C 422,496 502,638 522,842 Q 488,876 454,844 Q 422,874 394,826 C 380,735 362,595 332,468 Z" fill="url(#bot22-tail)" stroke="#7c2d12" stroke-width="1.4"/>' +
          // Overlapping Phoenix Tail Eye-Plumes
          featherPlume(192, 565, 228, 22, 22, "url(#bot22-flame)", "#7c2d12", "#fef08a") +
          featherPlume(156, 610, 225, 20, 14, "url(#bot22-tail)", "#991b1b", "#fde047") +
          featherPlume(408, 565, 228, 22, -22, "url(#bot22-flame)", "#7c2d12", "#fef08a") +
          featherPlume(444, 610, 225, 20, -14, "url(#bot22-tail)", "#991b1b", "#fde047") +
          // Glowing Phoenix Eye-Spot Medallions Near Tail Tips
          '<ellipse cx="114" cy="804" rx="10" ry="15" transform="rotate(16 114 804)" fill="#fef08a" stroke="#b91c1c" stroke-width="1.2"/>' +
          '<ellipse cx="114" cy="804" rx="5" ry="8" transform="rotate(16 114 804)" fill="#dc2626"/>' +
          '<ellipse cx="174" cy="792" rx="9" ry="14" transform="rotate(12 174 792)" fill="#fef08a" stroke="#b91c1c" stroke-width="1.2"/>' +
          '<ellipse cx="174" cy="792" rx="4.5" ry="7.5" transform="rotate(12 174 792)" fill="#dc2626"/>' +
          '<ellipse cx="486" cy="804" rx="10" ry="15" transform="rotate(-16 486 804)" fill="#fef08a" stroke="#b91c1c" stroke-width="1.2"/>' +
          '<ellipse cx="486" cy="804" rx="5" ry="8" transform="rotate(-16 486 804)" fill="#dc2626"/>' +
          '<ellipse cx="426" cy="792" rx="9" ry="14" transform="rotate(-12 426 792)" fill="#fef08a" stroke="#b91c1c" stroke-width="1.2"/>' +
          '<ellipse cx="426" cy="792" rx="4.5" ry="7.5" transform="rotate(-12 426 792)" fill="#dc2626"/>' +
          sparkleCluster([[104, 742, 7, "#fef08a", 0.95], [496, 742, 7, "#fef08a", 0.95]]) +
        "</g>",
      svg:
        '<g>' +
          // Sculpted Crimson-Flame Phoenix Wing Overskirt (Open Center Arch Framing Legs & Shoes)
          '<path d="M 258,438 C 206,482 162,585 152,756 Q 194,774 222,705 Q 248,638 274,606 Q 288,592 300,584 Q 312,592 326,606 Q 352,638 378,705 Q 406,774 448,756 C 438,585 394,482 342,438 Z" fill="url(#bot22-crimson)" stroke="#7c2d12" stroke-width="1.5"/>' +
          // Deep Ruby Fold Shading & Molten-Gold Specular Streaks
          '<path d="M 244,458 C 212,526 186,625 174,748 L 198,742 C 210,624 230,528 258,458 Z" fill="url(#bot22-fold)"/>' +
          '<path d="M 356,458 C 388,526 414,625 426,748 L 402,742 C 390,624 370,528 342,458 Z" fill="url(#bot22-fold)"/>' +
          '<path d="M 278,456 C 270,500 268,544 274,588 L 326,588 C 332,544 330,500 322,456 Z" fill="url(#bot22-hi)"/>' +
          // Blazing Gold Flame Scrollwork Along Center Split & Wing Tips
          '<path d="M 154,752 Q 194,770 222,702 Q 248,636 274,604 Q 288,590 300,582 Q 312,590 326,604 Q 352,636 378,702 Q 406,770 446,752" fill="none" stroke="url(#bot22-gold)" stroke-width="3"/>' +
          // Twin Layered Golden-Flame Phoenix Hip Wing Plates
          featherPlume(258, 444, 108, 18, 36, "url(#bot22-flame)", "#991b1b", "#fef08a") +
          featherPlume(272, 448, 102, 16, 22, "url(#bot22-gold)", "#92400e", "#ffffff") +
          featherPlume(342, 444, 108, 18, -36, "url(#bot22-flame)", "#991b1b", "#fef08a") +
          featherPlume(328, 448, 102, 16, -22, "url(#bot22-gold)", "#92400e", "#ffffff") +
          // Imperial Sun-Phoenix Waist Belt + Fire-Ruby Crest
          '<path d="M 258,426 Q 300,434 342,426 L 344,445 Q 320,450 300,458 Q 280,450 256,445 Z" fill="url(#bot22-gold)" stroke="#78350f" stroke-width="1.3"/>' +
          '<path d="M 284,436 C 290,428 296,426 300,434 C 304,426 310,428 316,436" fill="none" stroke="#fef9c3" stroke-width="1.6" stroke-linecap="round"/>' +
          ovalGem(300, 442, 8.5, 10.5, "url(#bot22-gem)", "#fef9c3") +
          ovalGem(236, 488, 4.5, 5.8, "url(#bot22-gem)", "#fef08a") +
          ovalGem(364, 488, 4.5, 5.8, "url(#bot22-gem)", "#fef08a") +
          // Rising Ember Sparks & Shimmering Fire Stars
          sparkleCluster([
            [190, 625, 7, "#fef08a", 0.95], [410, 625, 7, "#fef08a", 0.95],
            [300, 560, 8, "#ffffff", 0.96], [238, 636, 6, "#fb923c", 0.92],
            [362, 636, 6, "#fb923c", 0.92], [174, 718, 6, "#fef9c3", 0.94],
            [426, 718, 6, "#fef9c3", 0.94]
          ]) +
        "</g>"
    }
  ];
})();
