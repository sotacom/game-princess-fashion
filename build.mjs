import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_FILES = [
  'src/doll-makeup.js',
  'src/wardrobe-hair.js',
  'src/wardrobe-tops.js',
  'src/wardrobe-bottoms.js',
  'src/nails-stage.js',
  'src/app-shell.js'
];

function escapeInlineScript(code) {
  return code.replace(/<\/(script)/gi, '<\\/$1');
}

function escapeInlineStyle(css) {
  return css.replace(/<\/(style)/gi, '<\\/$1');
}

function main() {
  const sources = SOURCE_FILES.map((relPath) => {
    const absPath = path.join(__dirname, relPath);
    if (!fs.existsSync(absPath)) {
      throw new Error(`Missing required source module: ${relPath}`);
    }
    return {
      relPath,
      code: fs.readFileSync(absPath, 'utf8')
    };
  });

  // Evaluate in a headless VM context to extract bundled CSS constants & sanity-check datasets
  const sandbox = {
    window: null,
    globalThis: null,
    document: undefined,
    console
  };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;

  for (const src of sources) {
    vm.runInNewContext(src.code, sandbox, { filename: src.relPath });
  }

  const dollRigCss = sandbox.DOLL_RIG_CSS || '';
  const nailsStageCss = sandbox.NAILS_STAGE_CSS || '';
  const appShellCss = sandbox.APP_SHELL_CSS || '';

  const fallbackSvgIcon =
    'data:image/svg+xml;charset=utf-8,' +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192">' +
        '<rect width="192" height="192" rx="42" fill="#ff58aa"/>' +
        '<path d="M42,130 L32,68 L68,96 L96,48 L124,96 L160,68 L150,130 Z" fill="#fde047" stroke="#fff" stroke-width="5" stroke-linejoin="round"/>' +
        '<rect x="40" y="126" width="112" height="20" rx="8" fill="#fbbf24" stroke="#fff" stroke-width="4"/>' +
      '</svg>'
    );

  const initialManifest = {
    name: 'Công Chúa 2.5D - Thời Trang & Trang Điểm',
    short_name: 'Công Chúa 2.5D',
    description: 'Game Thời Trang, Trang Điểm, Làm Móng & Biểu Diễn Công Chúa 2.5D',
    start_url: './',
    scope: './',
    display: 'standalone',
    orientation: 'any',
    background_color: '#ebd6ff',
    theme_color: '#ffe8f6',
    icons: [
      {
        src: fallbackSvgIcon,
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any maskable'
      }
    ]
  };

  const manifestOutPath = path.join(__dirname, 'manifest.json');
  fs.writeFileSync(manifestOutPath, JSON.stringify(initialManifest, null, 2) + '\n', 'utf8');

  const inlineScripts = sources
    .map((src) => `  <!-- Module: ${src.relPath} -->\n  <script>\n${escapeInlineScript(src.code)}\n  </script>`)
    .join('\n\n');

  const earlyViewportScript =
    '(function(){try{var w=innerWidth||document.documentElement.clientWidth||0,h=innerHeight||document.documentElement.clientHeight||0;' +
    'var s=navigator.standalone===true||(typeof matchMedia==="function"&&(matchMedia("(display-mode: standalone)").matches||matchMedia("(display-mode: fullscreen)").matches));' +
    'if(s&&screen&&screen.width&&screen.height){var l=w>=h,eh=l?Math.min(screen.width,screen.height):Math.max(screen.width,screen.height),' +
    'ew=l?Math.max(screen.width,screen.height):Math.min(screen.width,screen.height);if(eh>h&&eh-h<=44&&Math.abs(w-ew)<=16)h=eh;}' +
    'if(h)document.documentElement.style.setProperty("--app-height",h+"px");}catch(e){}})();';

  const html = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="Công Chúa 2.5D">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="theme-color" content="#ffe8f6">
  <title>Công Chúa 2.5D - Thời Trang &amp; Trang Điểm</title>
  <link id="apple-touch-icon" rel="apple-touch-icon" sizes="192x192" href="${fallbackSvgIcon}">
  <link id="app-favicon" rel="icon" type="image/svg+xml" href="${fallbackSvgIcon}">
  <link id="app-manifest" rel="manifest" href="manifest.json">
  <script>${earlyViewportScript}</script>
  <style id="doll-rig-styles">${escapeInlineStyle(dollRigCss)}</style>
  <style id="nails-stage-styles">${escapeInlineStyle(nailsStageCss)}</style>
  <style id="app-shell-styles">${escapeInlineStyle(appShellCss)}</style>
</head>
<body>
  <div id="app"></div>

${inlineScripts}
</body>
</html>
`;

  const outPath = path.join(__dirname, 'index.html');
  fs.writeFileSync(outPath, html, 'utf8');

  // Verify self-contained single-file invariants
  const withoutW3Xmlns = html.replace(/http:\/\/www\.w3\.org\/2000\/svg/g, '');
  const externalMatches = withoutW3Xmlns.match(/https?:\/\/[^\s"'<>)]+/gi) || [];
  const hasExternalScript = /<script\b[^>]*\bsrc\s*=/i.test(html);
  const hasExternalCss = /<link\b[^>]*\brel\s*=\s*["']?stylesheet["']?/i.test(html);

  if (externalMatches.length > 0 || hasExternalScript || hasExternalCss) {
    throw new Error(
      `Self-contained check failed! externalUrls=${JSON.stringify(externalMatches)}, externalScript=${hasExternalScript}, externalCss=${hasExternalCss}`
    );
  }

  const kb = (Buffer.byteLength(html, 'utf8') / 1024).toFixed(1);
  console.log(`Built index.html successfully (${kb} KB)`);
  console.log(
    `Datasets: hair=${sandbox.WARDROBE_HAIR_HATS?.length}, tops=${sandbox.WARDROBE_TOPS?.length}, bottoms=${sandbox.WARDROBE_BOTTOMS?.length}, ` +
    `lipstick=${sandbox.MAKEUP_DATA?.lipsticks?.length}, eyeshadow=${sandbox.MAKEUP_DATA?.eyeshadows?.length}, ` +
    `eyeColor=${sandbox.MAKEUP_DATA?.eyeColors?.length}, blush=${sandbox.MAKEUP_DATA?.blushes?.length}`
  );
}

main();
