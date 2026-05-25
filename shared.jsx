// Shared content for Azure231 portfolio (Direction B – Toy Workshop).

const AZURE_BIO =
  "I make games people love coming back to. No AI-slop, no shortcuts — just patient, hand-crafted experiences built one detail at a time. I think of myself as a toymaker: every game a small world, glued together by hand.";

// Real images.  Son Tinh screenshots come from itch.io (Legend of Sơn Tinh page).
// Hunt Giant Fish thumbnail uses Roblox's public asset-thumbnail endpoint, which
// 302-redirects to a public rbxcdn URL; <img> works fine even though sandboxed
// fetch() does not.  When an image fails to load we surface an <image-slot> the
// user can drop their own art onto.
const ART = {
  sonTinhCover:    'https://img.itch.zone/aW1nLzEzMzEwNjI1LnBuZw==/original/isOEaM.png',
  sonTinhAbout:    'https://img.itch.zone/aW1nLzEzMzIxOTQzLnBuZw==/original/75jPQj.png',
  sonTinhQuest:    'https://img.itch.zone/aW1nLzEzMzIxOTQ4LnBuZw==/original/H8jVh%2B.png',
  sonTinhFeature:  'https://img.itch.zone/aW1nLzEzMzMxMTE2LnBuZw==/original/0kQtfV.png',
  sonTinhUpdate:   'https://img.itch.zone/aW1nLzEzMzIxOTUwLnBuZw==/original/vJWNbo.png',
  sonTinhShot1:    'https://img.itch.zone/aW1hZ2UvMjI0NjMwNi8xMzMxMjczNy5wbmc=/original/e9PA21.png',
  sonTinhShot2:    'https://img.itch.zone/aW1hZ2UvMjI0NjMwNi8xMzQxODkzOS5wbmc=/original/DphZi6.png',
  catDungeonCover: 'https://img.itch.zone/aW1nLzE5OTkwMjU4LnBuZw==/original/37SDG0.png',
  catDungeonShot1: 'https://img.itch.zone/aW1hZ2UvMzM0NjQyMS8xOTk3ODM4OC5wbmc=/original/36EJj7.png',
  catDungeonShot2: 'https://img.itch.zone/aW1hZ2UvMzM0NjQyMS8xOTk5MDEyNy5wbmc=/original/pAahCj.png',
  catDungeonShot3: 'https://img.itch.zone/aW1hZ2UvMzM0NjQyMS8xOTk5MDEyNi5wbmc=/original/w9Aak1.png',
  gameoflifeCover: 'https://img.itch.zone/aW1nLzE5MzE4ODI0LnBuZw==/original/4K%2BP%2BU.png',
  magicpianoCover: 'https://img.itch.zone/aW1nLzE3OTA1ODU3LnBuZw==/original/HheclU.png',
  tdarCover:       'https://img.itch.zone/aW1nLzE3OTE2NjI3LnBuZw==/original/qBRmKj.png',
  catBubCover:     'https://img.itch.zone/aW1nLzE5NDI0MDkxLnBuZw==/original/nbxfcW.png',
  catBubShot1:     'https://img.itch.zone/aW1hZ2UvMzI1MzI2NC8xOTQyNDE5NS5wbmc=/original/DZsrV8.png',
  catUpCover:      'https://img.itch.zone/aW1nLzE3Nzg1OTA3LnBuZw==/original/vAYuny.png',
  catUpShot1:      'https://img.itch.zone/aW1hZ2UvMjk2ODcwNy8xNzc4NjE0Ni5wbmc=/original/A9ugDu.png',
};

// Roblox titles shipped with ASAP Studio (Azure as game developer, not lead).
const ASAP_GAMES = [
  {
    id: 'fishtank',
    title: 'Build a Fish Tank',
    type: 'idle fishing · collect',
    blurb: 'Fish for rare eggs, hatch giant fish, and build a one-of-a-kind tank. AFK fishing, premium rods, a trade shop for exclusive eggs — and you can swim freely with your favorites.',
    role: 'game developer',
    year: '2025',
    url: 'https://www.roblox.com/games/123030671939700/Build-a-Fish-Tank',
    accent: '#0ea5e9',
    accent2: '#7dd3fc',
    tags: ['idle', 'fishing', 'trade'],
    art: 'fishtank',
  },
  {
    id: 'playtopia',
    title: 'Playtopia',
    type: 'underwater hangout',
    blurb: 'Dive into an underwater social hub — cruise on a hoverboard, dress up at the Alice-in-Wonderland avatar store, dance with friends, and meet playful fish & octopi beneath the waves. New UGC drops regularly.',
    role: 'game developer',
    year: '2025',
    url: 'https://www.roblox.com/games/83802745417940/Playtopia',
    accent: '#0891b2',
    accent2: '#67e8f9',
    tags: ['hangout', 'avatar', 'UGC'],
    art: 'playtopia',
  },
  {
    id: 'doggoland',
    title: 'Doggo Land',
    type: 'sky fishing · adventure',
    blurb: 'A whimsical fishing adventure above the clouds — reel in mystical Doggo Mermaids, explore 4 islands (Heart of Doggo, Watermelon, Candy, Hotpot), upgrade your rod, and earn limited UGC in the Alpha.',
    role: 'game developer',
    year: '2025',
    url: 'https://www.roblox.com/games/113877682701504/Doggo-Land',
    accent: '#f97316',
    accent2: '#fcd34d',
    tags: ['fishing', 'adventure', 'UGC'],
    art: 'doggoland',
  },
];

// Other games on Azure231's itch.io profile.  These get a tile in the
// "More toys" grid; each links out to its real itch page.
const MORE_GAMES = [
  { id: 'catdungeon',   title: 'Cat & Dungeon',  type: 'puzzle',    role: 'developer',         year: '2025', url: 'https://azure231.itch.io/catdungeon',          accent: '#fb923c', emoji: '🐈‍⬛', cover: 'https://img.itch.zone/aW1nLzE5OTkwMjU4LnBuZw==/original/37SDG0.png' },
  { id: 'gameoflife',   title: 'Game of Life',   type: 'simulation',role: 'solo',              year: '2024', url: 'https://azure231.itch.io/game-of-life',        accent: '#7dd3fc', emoji: '◾', cover: 'https://img.itch.zone/aW1nLzE5MzE4ODI0LnBuZw==/original/4K%2BP%2BU.png' },
  { id: 'magicpiano',   title: 'Magic Piano',    type: 'rhythm',    role: 'solo',              year: '2023', url: 'https://azure231.itch.io/magic-piano',         accent: '#a78bfa', emoji: '♪', cover: 'https://img.itch.zone/aW1nLzE3OTA1ODU3LnBuZw==/original/HheclU.png' },
  { id: 'tdar',         title: 'Tower Defend AR',type: 'AR strategy',role: 'solo',             year: '2023', url: 'https://azure231.itch.io/tower-defend-ar',     accent: '#16a34a', emoji: '⛩', cover: 'https://img.itch.zone/aW1nLzE3OTE2NjI3LnBuZw==/original/qBRmKj.png' },
  { id: 'muscle',       title: 'Muscle Training',type: 'sports',    role: 'solo',              year: '2023', url: 'https://azure231.itch.io/muscle-training',     accent: '#ef4444', emoji: '💪', cover: 'https://img.itch.zone/aW1nLzE3ODc1MDg4LmpwZw==/original/CvQO8I.jpg' },
  { id: '2pshowdown',   title: '2-Player Showdown',type: 'strategy',role: 'solo',              year: '2023', url: 'https://azure231.itch.io/2-player-showdown',   accent: '#fcd34d', emoji: '⚔', cover: 'https://img.itch.zone/aW1nLzE3OTQwNzY0LnBuZw==/original/SNBb7l.png' },
  { id: 'catbub',       title: 'Cat Bub II',     type: 'platformer',role: 'team',              year: '2024', url: 'https://windyfeng.itch.io/cat-bub-ii',         accent: '#f9a8d4', emoji: '🫧', cover: 'https://img.itch.zone/aW1nLzE5NDI0MDkxLnBuZw==/original/nbxfcW.png' },
  { id: 'catup',        title: 'Cat Up',         type: 'strategy',  role: 'team',              year: '2024', url: 'https://windyfeng.itch.io/cat-up',             accent: '#a7f3d0', emoji: '🌧', cover: 'https://img.itch.zone/aW1nLzE3Nzg1OTA3LnBuZw==/original/vAYuny.png' },
];

const GAMES = [
  {
    id: 'hgf',
    title: 'Hunt Giant Fish',
    platform: 'Roblox',
    year: '2025',
    role: 'Tech Lead',
    blurb: 'A relaxing-yet-competitive fishing adventure on Roblox. Reel in giants from a dozen biomes, upgrade your rod, trade trophies. I lead the engineering — gameplay systems, replication, live-ops pipeline.',
    teamRole: 'tech lead · gameplay, systems, multiplayer, live-ops',
    tags: ['multiplayer', 'live-ops', 'idle-action'],
    url: 'https://www.roblox.com/games/115511501544785/Hunt-Giant-Fish',
    coverArt: null, // Roblox CDN hot-links break behind referer policy.
                     // Renders an <image-slot> so Azure can drop in a real screenshot.
    coverSlotId: 'hgf-cover',
    coverSlotPlaceholder: 'drop a Hunt Giant Fish screenshot',
    palette: ['#1d4ed8', '#22d3ee', '#fde047', '#0ea5e9'],
    accent: '#0284c7',
    stats: [
      { label: 'visits',         value: 4_600_000, suffix: '+', display: '4.6M' },
      { label: 'favorites',      value: 55_800,    suffix: '+', display: '55.8K' },
      { label: 'peak concurrent', value: 10_000,   suffix: '',  display: '10K' },
      { label: 'release',        value: '2025-11', display: 'NOV ’25' },
    ],
  },
  {
    id: 'lst',
    title: 'Legend of Son Tinh',
    platform: 'Unity · itch.io',
    year: '2023',
    role: 'Developer & Artist',
    teamRole: 'team of 4 · all code, all pixel art',
    blurb: 'A pixel-art retelling of the Vietnamese myth: the Mountain god vs the Water god. Build dykes, hurl boulders, save Princess Mỵ Nương. Inspired by Ori, Celeste, Terraria.',
    tags: ['platformer', 'mythic', 'pixel-art'],
    url: 'https://windyfeng.itch.io/legend-of-son-tinh',
    coverArt: ART.sonTinhCover,
    gallery: [ART.sonTinhShot1, ART.sonTinhShot2, ART.sonTinhAbout, ART.sonTinhFeature, ART.sonTinhQuest],
    palette: ['#84cc16', '#f97316', '#fbbf24', '#16a34a'],
    accent: '#16a34a',
    stats: [
      { label: 'rating',     display: '5.0/5' },
      { label: 'platforms',  display: 'WEB · MAC · ANDROID' },
      { label: 'session',    display: '~45 min' },
      { label: 'team size',  display: '4 devs' },
    ],
  },
];

const SKILLS = [
  { name: 'Unity',         level: 92, icon: 'unity'    },
  { name: 'C#',            level: 88, icon: 'csharp'   },
  { name: 'Roblox Studio', level: 95, icon: 'roblox'   },
  { name: 'Aseprite',      level: 85, icon: 'aseprite' },
  { name: 'Cocos 2D',      level: 70, icon: 'cocos'    },
];

const LINKS = {
  itch:     { label: 'itch.io',   url: 'https://azure231.itch.io',                                 handle: '@azure231',          c: '#ef4444' },
  roblox:   { label: 'Roblox',    url: 'https://www.roblox.com/users/8082026447/profile',          handle: 'azure231',           c: '#16a34a' },
  game:     { label: 'play HGF',  url: 'https://www.roblox.com/games/115511501544785/Hunt-Giant-Fish', handle: 'Hunt Giant Fish',c: '#0284c7' },
  linkedin: { label: 'LinkedIn',  url: 'https://www.linkedin.com/in/tuan-huynh-vo-8b7917174/',     handle: 'tuan-huynh-vo',      c: '#7dd3fc' },
  email:    { label: 'email',     url: 'mailto:huynhvotuan231@gmail.com',                          handle: 'huynhvotuan231@gmail.com', c: '#f59e0b' },
};

// ─────────── shared mini hooks ───────────
function useTick(fps = 30) {
  const [t, setT] = React.useState(0);
  React.useEffect(() => {
    let raf, last = performance.now(), step = 1000 / fps;
    const loop = (now) => {
      if (now - last >= step) { setT((x) => x + 1); last = now; }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [fps]);
  return t;
}

// Counts up to a target when `start` becomes true.
function useCountUp(target, start, ms = 1400) {
  const [n, setN] = React.useState(0);
  React.useEffect(() => {
    if (!start) return;
    let raf, t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / ms);
      // easeOutCubic
      const e = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * e));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, ms]);
  return n;
}

function useInView(threshold = 0.2) {
  const ref = React.useRef(null);
  const [vis, setVis] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setVis(true), { threshold });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, vis];
}

// Tiny pixel-art skill icons drawn as SVG (12-wide grids).
function PixelIcon({ kind, size = 32, fg = '#fff' }) {
  const grids = {
    // Unity — isometric cube outline with a small play triangle inside.
    unity: [
      '.....##.....',
      '....####....',
      '...##..##...',
      '..##.##.##..',
      '.##.####.##.',
      '..##.##.##..',
      '...##..##...',
      '....####....',
      '.....##.....',
    ],
    // C# — the letter C beside two crosshatches.
    csharp: [
      '.####...#.#.',
      '##..##.#####',
      '##......#.#.',
      '##.....#####',
      '##......#.#.',
      '##.....#####',
      '##......#.#.',
      '##..##.#####',
      '.####...#.#.',
    ],
    // Roblox — tilted rounded square outline (the studio mark).
    roblox: [
      '.....##.....',
      '....####....',
      '...##..##...',
      '..##....##..',
      '.##......##.',
      '..##....##..',
      '...##..##...',
      '....####....',
      '.....##.....',
    ],
    // Aseprite — pixel-art pencil drawing a dot.
    aseprite: [
      '.........###',
      '........####',
      '.......####.',
      '......####..',
      '.....####...',
      '....####....',
      '...####.....',
      '..####......',
      '.##.........',
    ],
    // Cocos 2D — palm tree with a coconut.
    cocos: [
      '..##.####...',
      '.####.####..',
      '######.####.',
      '...####.....',
      '....##......',
      '....##......',
      '....##......',
      '...####.....',
      '..######....',
    ],
  };
  const rows = grids[kind] || grids.unity;
  const cols = rows[0].length;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${cols} ${rows.length}`} shapeRendering="crispEdges" style={{ imageRendering: 'pixelated' }}>
      {rows.map((row, y) =>
        [...row].map((c, x) =>
          c === '#' ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={fg} /> : null
        )
      )}
    </svg>
  );
}

// A tiny walking sprite (4-frame loop).
function PixelHero({ size = 64, color = '#22d3ee', frame = 0 }) {
  const a = [
    '....####....',
    '...#....#...',
    '...#.##.#...',
    '...#....#...',
    '....####....',
    '...######...',
    '..########..',
    '.##.####.##.',
    '##..####..##',
    '....####....',
    '...##..##...',
    '..##....##..',
  ];
  const b = [
    '....####....',
    '...#....#...',
    '...#.##.#...',
    '...#....#...',
    '....####....',
    '...######...',
    '..########..',
    '.##.####.##.',
    '##..####..##',
    '....####....',
    '....####....',
    '...##..##...',
  ];
  const rows = (frame % 2 === 0) ? a : b;
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" shapeRendering="crispEdges">
      {rows.map((row, y) =>
        [...row].map((c, x) =>
          c === '#' ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={color} /> : null
        )
      )}
    </svg>
  );
}

// A pixel fish for the Hunt Giant Fish hero panel.
function PixelFish({ size = 96, color = '#fbbf24', accent = '#f97316' }) {
  const grid = [
    '...........',
    '...#####...',
    '..#.....#..',
    '.#..###..##',
    '#..######.#',
    '##.#####...',
    '#..######.#',
    '.#..###..##',
    '..#.....#..',
    '...#####...',
    '...........',
  ];
  return (
    <svg width={size} height={size} viewBox="0 0 11 11" shapeRendering="crispEdges">
      {grid.map((row, y) =>
        [...row].map((c, x) =>
          c === '#' ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={(x === 8 && y === 4) ? '#000' : (x > 6 ? accent : color)} /> : null
        )
      )}
    </svg>
  );
}

// Simple confetti burst spawned at (x, y) in parent's coords.
function Confetti({ at, palette, onDone }) {
  const t = useTick(30);
  const [bits] = React.useState(() => Array.from({ length: 18 }, () => ({
    angle: Math.random() * Math.PI * 2,
    speed: 80 + Math.random() * 100,
    spin:  (Math.random() - 0.5) * 720,
    color: palette[Math.floor(Math.random() * palette.length)],
    size:  6 + Math.random() * 6,
  })));
  const ms = (t / 30) * 1000;
  React.useEffect(() => { if (ms > 1000 && onDone) onDone(); }, [ms, onDone]);
  if (!at) return null;
  return (
    <div style={{ position: 'absolute', left: at.x, top: at.y, pointerEvents: 'none', zIndex: 30 }}>
      {bits.map((b, i) => {
        const sec = ms / 1000;
        const x = Math.cos(b.angle) * b.speed * sec;
        const y = Math.sin(b.angle) * b.speed * sec + 0.5 * 220 * sec * sec; // gravity
        return (
          <div key={i} style={{
            position: 'absolute', width: b.size, height: b.size, background: b.color,
            transform: `translate(${x}px, ${y}px) rotate(${b.spin * sec}deg)`,
            opacity: Math.max(0, 1 - sec),
          }} />
        );
      })}
    </div>
  );
}

// Image with fallback: if the URL fails, it reveals the children below.
function ArtImg({ src, alt = '', style = {}, fallback = null }) {
  const [failed, setFailed] = React.useState(false);
  if (failed) return fallback;
  return <img src={src} alt={alt} onError={() => setFailed(true)} style={{ display: 'block', ...style }} />;
}

Object.assign(window, {
  AZURE_BIO, GAMES, SKILLS, LINKS, ART, MORE_GAMES, ASAP_GAMES,
  useTick, useCountUp, useInView,
  PixelIcon, PixelHero, PixelFish, Confetti, ArtImg,
});
