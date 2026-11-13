// アプリのアイコン（icon-192.png・icon-512.png）を作る。生成りの紙に、虫めがねと朱の「？」。
// 使い方: node tools/make-icons.cjs（qa/ の playwright を使う）
const path = require("path");
const { chromium } = require(path.join(__dirname, "..", "qa", "node_modules", "playwright"));
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const s of [192, 512]) {
    const p = await b.newPage({ viewport: { width: s, height: s } });
    await p.setContent(`<body style="margin:0"><svg width="${s}" height="${s}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#f3efe4"/>
      <path d="M10 86 L40 30 L50 36 L60 30 L90 86 Z" fill="#6b4a3a" stroke="#1d2a3f" stroke-width="2.4" stroke-linejoin="round"/>
      <path d="M40 30 L50 36 L60 30 L56 22 L44 22 Z" fill="#b23a24"/>
      <circle cx="44" cy="16" r="6" fill="#9aa3b2"/><circle cx="54" cy="12" r="7" fill="#9aa3b2"/>
      <rect x="58" y="52" width="30" height="30" rx="6" fill="#fffdf7" stroke="#123554" stroke-width="3"/>
      <text x="73" y="76" font-size="24" text-anchor="middle" fill="#123554" font-family="sans-serif" font-weight="900">3</text></svg></body>`);
    await p.screenshot({ path: path.join(__dirname, "..", `icon-${s}.png`), clip: { x: 0, y: 0, width: s, height: s } });
  }
  await b.close();
})();
