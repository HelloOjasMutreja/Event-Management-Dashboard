/**
 * Generate a 1200×630 OG image for social link previews.
 * Uses pure SVG → sharp (or canvas) to produce a PNG.
 * Run: node scripts/generate-og-image.cjs
 */

const fs = require('fs');
const path = require('path');

// ── Build the SVG (1200 × 630) ──────────────────────────────────────────────
const WIDTH = 1200;
const HEIGHT = 630;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <!-- Background gradient -->
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f1117"/>
      <stop offset="50%" stop-color="#141720"/>
      <stop offset="100%" stop-color="#111318"/>
    </linearGradient>

    <!-- Accent glow -->
    <radialGradient id="glow" cx="70%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#A5FF9D" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#A5FF9D" stop-opacity="0"/>
    </radialGradient>

    <!-- Subtle grid pattern -->
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#ffffff" stroke-opacity="0.03" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#grid)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)"/>

  <!-- Top border accent line -->
  <rect x="0" y="0" width="${WIDTH}" height="4" fill="#A5FF9D" opacity="0.8"/>

  <!-- Decorative circles -->
  <circle cx="950" cy="120" r="180" fill="none" stroke="#A5FF9D" stroke-opacity="0.06" stroke-width="1.5"/>
  <circle cx="950" cy="120" r="120" fill="none" stroke="#A5FF9D" stroke-opacity="0.04" stroke-width="1"/>
  <circle cx="150" cy="520" r="240" fill="none" stroke="#A5FF9D" stroke-opacity="0.04" stroke-width="1"/>

  <!-- Small decorative dots -->
  <circle cx="1050" cy="450" r="4" fill="#A5FF9D" opacity="0.3"/>
  <circle cx="1080" cy="480" r="3" fill="#A5FF9D" opacity="0.2"/>
  <circle cx="1020" cy="420" r="2.5" fill="#A5FF9D" opacity="0.25"/>
  <circle cx="200" cy="100" r="3" fill="#A5FF9D" opacity="0.2"/>
  <circle cx="230" cy="130" r="2" fill="#A5FF9D" opacity="0.15"/>

  <!-- Calendar icon -->
  <g transform="translate(80, 150)">
    <rect x="0" y="8" width="56" height="52" rx="8" fill="none" stroke="#A5FF9D" stroke-width="2.5" opacity="0.7"/>
    <line x1="16" y1="0" x2="16" y2="16" stroke="#A5FF9D" stroke-width="2.5" stroke-linecap="round" opacity="0.7"/>
    <line x1="40" y1="0" x2="40" y2="16" stroke="#A5FF9D" stroke-width="2.5" stroke-linecap="round" opacity="0.7"/>
    <line x1="0" y1="28" x2="56" y2="28" stroke="#A5FF9D" stroke-width="2" opacity="0.5"/>
    <circle cx="20" cy="42" r="4" fill="#A5FF9D" opacity="0.6"/>
    <circle cx="36" cy="42" r="4" fill="#A5FF9D" opacity="0.4"/>
  </g>

  <!-- Brand name "ClubEvents" -->
  <text x="80" y="280" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="72" font-weight="800" letter-spacing="-2">
    <tspan fill="#ebe8e2">Club</tspan><tspan fill="#A5FF9D">Events</tspan>
  </text>

  <!-- Tagline -->
  <text x="84" y="340" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="28" font-weight="400" fill="#ebe8e2" opacity="0.7" letter-spacing="0.5">
    Event Management Dashboard
  </text>

  <!-- Description -->
  <text x="84" y="410" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="20" fill="#ebe8e2" opacity="0.45" letter-spacing="0.3">
    Create, manage &amp; showcase club events.
  </text>
  <text x="84" y="440" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="20" fill="#ebe8e2" opacity="0.45" letter-spacing="0.3">
    Track registrations &amp; keep your community engaged.
  </text>

  <!-- Feature pills -->
  <g transform="translate(80, 480)">
    <!-- Pill 1 -->
    <rect x="0" y="0" width="160" height="40" rx="20" fill="#A5FF9D" fill-opacity="0.1" stroke="#A5FF9D" stroke-opacity="0.25" stroke-width="1"/>
    <text x="80" y="26" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="15" fill="#A5FF9D" text-anchor="middle" font-weight="500">Event Tracking</text>

    <!-- Pill 2 -->
    <rect x="175" y="0" width="160" height="40" rx="20" fill="#A5FF9D" fill-opacity="0.1" stroke="#A5FF9D" stroke-opacity="0.25" stroke-width="1"/>
    <text x="255" y="26" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="15" fill="#A5FF9D" text-anchor="middle" font-weight="500">Registrations</text>

    <!-- Pill 3 -->
    <rect x="350" y="0" width="160" height="40" rx="20" fill="#A5FF9D" fill-opacity="0.1" stroke="#A5FF9D" stroke-opacity="0.25" stroke-width="1"/>
    <text x="430" y="26" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="15" fill="#A5FF9D" text-anchor="middle" font-weight="500">CSV Export</text>
  </g>

  <!-- Right side: mock dashboard card -->
  <g transform="translate(720, 200)">
    <rect x="0" y="0" width="400" height="340" rx="16" fill="#1a1d26" stroke="#ffffff" stroke-opacity="0.06" stroke-width="1"/>

    <!-- Card header -->
    <rect x="0" y="0" width="400" height="56" rx="16" fill="#1e2130"/>
    <rect x="0" y="40" width="400" height="16" fill="#1e2130"/>
    <circle cx="30" cy="28" r="6" fill="#ff5f57"/>
    <circle cx="52" cy="28" r="6" fill="#febc2e"/>
    <circle cx="74" cy="28" r="6" fill="#28c840"/>
    <text x="200" y="34" font-family="system-ui, sans-serif" font-size="13" fill="#ebe8e2" opacity="0.5" text-anchor="middle" font-weight="500">Dashboard</text>

    <!-- Stats row -->
    <g transform="translate(20, 75)">
      <rect x="0" y="0" width="110" height="60" rx="8" fill="#A5FF9D" fill-opacity="0.08"/>
      <text x="55" y="24" font-family="system-ui, sans-serif" font-size="11" fill="#A5FF9D" opacity="0.7" text-anchor="middle">EVENTS</text>
      <text x="55" y="48" font-family="system-ui, sans-serif" font-size="22" fill="#A5FF9D" text-anchor="middle" font-weight="700">12</text>

      <rect x="125" y="0" width="110" height="60" rx="8" fill="#A5FF9D" fill-opacity="0.08"/>
      <text x="180" y="24" font-family="system-ui, sans-serif" font-size="11" fill="#A5FF9D" opacity="0.7" text-anchor="middle">REGISTERED</text>
      <text x="180" y="48" font-family="system-ui, sans-serif" font-size="22" fill="#A5FF9D" text-anchor="middle" font-weight="700">538</text>

      <rect x="250" y="0" width="110" height="60" rx="8" fill="#A5FF9D" fill-opacity="0.08"/>
      <text x="305" y="24" font-family="system-ui, sans-serif" font-size="11" fill="#A5FF9D" opacity="0.7" text-anchor="middle">CAPACITY</text>
      <text x="305" y="48" font-family="system-ui, sans-serif" font-size="22" fill="#A5FF9D" text-anchor="middle" font-weight="700">1K+</text>
    </g>

    <!-- Mock table rows -->
    <g transform="translate(20, 160)">
      <rect x="0" y="0" width="360" height="1" fill="#ffffff" opacity="0.06"/>

      <circle cx="12" cy="24" r="8" fill="#A5FF9D" opacity="0.2"/>
      <rect x="30" y="18" width="120" height="12" rx="3" fill="#ffffff" opacity="0.08"/>
      <rect x="260" y="18" width="50" height="12" rx="3" fill="#A5FF9D" opacity="0.15"/>
      <rect x="320" y="18" width="40" height="12" rx="3" fill="#ffffff" opacity="0.05"/>

      <rect x="0" y="44" width="360" height="1" fill="#ffffff" opacity="0.04"/>

      <circle cx="12" cy="66" r="8" fill="#A5FF9D" opacity="0.15"/>
      <rect x="30" y="60" width="100" height="12" rx="3" fill="#ffffff" opacity="0.06"/>
      <rect x="260" y="60" width="60" height="12" rx="3" fill="#A5FF9D" opacity="0.12"/>
      <rect x="330" y="60" width="30" height="12" rx="3" fill="#ffffff" opacity="0.04"/>

      <rect x="0" y="86" width="360" height="1" fill="#ffffff" opacity="0.04"/>

      <circle cx="12" cy="108" r="8" fill="#A5FF9D" opacity="0.12"/>
      <rect x="30" y="102" width="140" height="12" rx="3" fill="#ffffff" opacity="0.05"/>
      <rect x="260" y="102" width="45" height="12" rx="3" fill="#A5FF9D" opacity="0.1"/>
      <rect x="315" y="102" width="45" height="12" rx="3" fill="#ffffff" opacity="0.04"/>

      <rect x="0" y="128" width="360" height="1" fill="#ffffff" opacity="0.03"/>

      <circle cx="12" cy="150" r="8" fill="#A5FF9D" opacity="0.1"/>
      <rect x="30" y="144" width="110" height="12" rx="3" fill="#ffffff" opacity="0.04"/>
      <rect x="260" y="144" width="55" height="12" rx="3" fill="#A5FF9D" opacity="0.08"/>
    </g>
  </g>

  <!-- Bottom bar -->
  <rect x="0" y="626" width="${WIDTH}" height="4" fill="#A5FF9D" opacity="0.4"/>

  <!-- URL watermark -->
  <text x="${WIDTH - 40}" y="${HEIGHT - 20}" font-family="system-ui, sans-serif" font-size="14" fill="#ebe8e2" opacity="0.25" text-anchor="end" font-weight="400">
    clubevents-dashboard.vercel.app
  </text>
</svg>`;

// ── Try sharp first, fall back to writing raw SVG ────────────────────────────
const outPath = path.join(__dirname, '..', 'public', 'og-image.png');

async function generate() {
  try {
    const sharp = require('sharp');
    await sharp(Buffer.from(svg))
      .png({ quality: 90 })
      .toFile(outPath);
    console.log(`✅  OG image generated → ${outPath} (${WIDTH}×${HEIGHT})`);
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      console.log('sharp not found — installing...');
      require('child_process').execSync('npm install sharp --save-dev', {
        cwd: path.join(__dirname, '..'),
        stdio: 'inherit',
      });
      const sharp = require('sharp');
      await sharp(Buffer.from(svg))
        .png({ quality: 90 })
        .toFile(outPath);
      console.log(`✅  OG image generated → ${outPath} (${WIDTH}×${HEIGHT})`);
    } else {
      throw e;
    }
  }
}

generate().catch((err) => {
  console.error('❌  Failed to generate OG image:', err.message);
  // Fallback: save as SVG so the user can convert manually
  const svgPath = path.join(__dirname, '..', 'public', 'og-image.svg');
  fs.writeFileSync(svgPath, svg, 'utf-8');
  console.log(`⚠️  Saved SVG fallback → ${svgPath} — convert to PNG (1200×630) for best social previews.`);
});
