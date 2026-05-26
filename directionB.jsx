// Direction B v2 — TOY WORKSHOP
// Cream paper, washi-tape, polaroid game cards, sticker peel, real artwork,
// animated counters, parallax sprites, marquee, draggable polaroids.

const B_COLORS = {
  paper: '#fef5d8',     // sunny cream
  paper2: '#fce4a8',    // golden hour
  ink: '#3a2417',       // warm dark brown
  red: '#e85a3c',       // tomato (Stardew barn red)
  peach: '#f4a261',     // juicy apricot
  sun: '#ffd24a',       // golden sun
  mint: '#9cd49b',      // fresh leaf
  sky: '#6cc0e2',       // clear sky
  bubble: '#f48aa1',    // cherry blossom
  grape: '#a682d8',     // vivid lilac
  forest: '#4f9d52',    // Stardew grass
  brown: '#9a5b3a',     // chestnut
  blue: '#3a8ec7'       // pond blue
};

const PALETTE = [B_COLORS.red, B_COLORS.peach, B_COLORS.sun, B_COLORS.mint, B_COLORS.sky, B_COLORS.bubble, B_COLORS.grape, B_COLORS.forest];

// ─────── decorations ───────
function PaperTexture() {
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
      backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.6 0 0 0 0 0.5 0 0 0 0 0.3 0 0 0 0.18 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`,
      mixBlendMode: 'multiply', opacity: 0.5
    }} />);

}

function GraphPaper() {
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      backgroundImage: `
        linear-gradient(${B_COLORS.brown}11 1px, transparent 1px),
        linear-gradient(90deg, ${B_COLORS.brown}11 1px, transparent 1px)
      `,
      backgroundSize: '24px 24px'
    }} />);

}

function WashiTape({ color = B_COLORS.bubble, width = 100, rotate = -8, top = -14, left = '50%', pattern = 'stripes', zIndex = 4 }) {
  const bg = pattern === 'stripes' ?
  `repeating-linear-gradient(45deg, ${color} 0 8px, ${color}cc 8px 14px)` :
  pattern === 'dots' ?
  `radial-gradient(${B_COLORS.ink}55 1px, ${color} 1.5px)` :
  color;
  return (
    <div style={{
      position: 'absolute', top, left, transform: `translateX(-50%) rotate(${rotate}deg)`,
      width, height: 28,
      background: bg, backgroundSize: pattern === 'dots' ? '6px 6px' : 'auto',
      boxShadow: '0 2px 4px rgba(0,0,0,0.12)',
      zIndex
    }} />);

}

function StickerBadge({ color, ring = '#fff', size = 64, children, rotate = 0, shadow = true }) {
  return (
    <div style={{ position: 'relative', width: size, height: size, transform: `rotate(${rotate}deg)` }}>
      <svg width={size} height={size} viewBox="0 0 100 100" style={{ filter: shadow ? 'drop-shadow(2px 3px 0 rgba(0,0,0,0.18))' : 'none' }}>
        <path d="M50 4 Q60 0 64 8 Q72 4 76 12 Q86 12 86 22 Q94 24 92 34 Q100 40 94 48 Q100 56 92 64 Q94 74 86 76 Q86 86 76 86 Q72 94 64 90 Q60 98 50 94 Q40 98 36 90 Q28 94 24 86 Q14 86 14 76 Q6 74 8 64 Q0 56 6 48 Q0 40 8 34 Q6 24 14 22 Q14 12 24 12 Q28 4 36 8 Q40 0 50 4 Z" fill={ring} />
        <circle cx="50" cy="50" r="36" fill={color} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: '#fff', fontFamily: "'Pixelify Sans', monospace", fontWeight: 700, textAlign: 'center' }}>
        {children}
      </div>
    </div>);

}

function HandSquiggle({ color = B_COLORS.ink, width = 200, height = 12 }) {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path d={`M 2 ${height / 2} Q ${width * 0.15} 2 ${width * 0.3} ${height / 2} T ${width * 0.6} ${height / 2} T ${width * 0.9} ${height / 2}`} stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>);

}

function StarBurst({ size = 80, color = B_COLORS.sun, rotate = 0 }) {
  // 8-pointed pixel-style star
  const pts = [];
  for (let i = 0; i < 16; i++) {
    const a = i / 16 * Math.PI * 2;
    const r = i % 2 === 0 ? 50 : 22;
    pts.push(`${50 + Math.cos(a) * r},${50 + Math.sin(a) * r}`);
  }
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ transform: `rotate(${rotate}deg)` }}>
      <polygon points={pts.join(' ')} fill={color} stroke={B_COLORS.ink} strokeWidth="3" strokeLinejoin="round" />
    </svg>);

}

// Gently drifting ambient particles (leaves / sparkles) — slow, low-opacity.
function CozyMotes({ count = 14, color = '#8b5a3c' }) {
  const t = useTick(20);
  const motes = React.useMemo(() => Array.from({ length: count }, (_, i) => ({
    x: Math.random() * 100, baseY: Math.random() * 100,
    drift: 6 + Math.random() * 8, speed: 0.4 + Math.random() * 0.6,
    size: 4 + Math.random() * 6, rot: Math.random() * 360,
    type: i % 3, hue: i % 2
  })), [count]);
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 2 }}>
      {motes.map((m, i) => {
        const y = (m.baseY + t * m.speed * 0.4) % 110;
        const x = m.x + Math.sin((t + i * 9) / 14) * m.drift;
        const rot = m.rot + t * 0.6;
        return (
          <svg key={i} width={m.size * 2} height={m.size * 2} viewBox="0 0 10 10"
            style={{
              position: 'absolute', top: `${y}%`, left: `${x}%`,
              transform: `rotate(${rot}deg)`, opacity: 0.35,
              color: m.hue ? '#9caf88' : color
            }}>
            {m.type === 0 ?
              /* leaf */
              <path d="M5 1 Q9 4 5 9 Q1 4 5 1 Z" fill="currentColor" /> :
            m.type === 1 ?
              /* tiny circle (dust mote) */
              <circle cx="5" cy="5" r="2" fill="currentColor" /> :
              /* sparkle */
              <path d="M5 1 L6 4 L9 5 L6 6 L5 9 L4 6 L1 5 L4 4 Z" fill="currentColor" />
            }
          </svg>);

      })}
    </div>);

}

// Steaming mug — sits in a corner as a cozy ambient anchor.
function TeaMug({ scale = 1 }) {
  const t = useTick(12);
  return (
    <div style={{ position: 'relative', width: 92 * scale, height: 110 * scale }}>
      {/* steam wisps */}
      <svg width={92 * scale} height={50 * scale} viewBox="0 0 92 50" style={{ position: 'absolute', top: -10 * scale, left: 0 }}>
        {[0, 1, 2].map((k) => {
          const phase = (t * 0.6 + k * 12) % 36;
          const o = phase < 8 ? phase / 8 : phase < 24 ? 0.55 : Math.max(0, 0.55 - (phase - 24) / 12 * 0.55);
          const dx = Math.sin((t + k * 5) / 6) * 4;
          return (
            <path key={k}
              d={`M ${30 + k * 14 + dx} ${48 - phase} q -6 -8 0 -14 q 6 -6 0 -12`}
              stroke={B_COLORS.brown} strokeWidth="2" fill="none" strokeLinecap="round"
              opacity={o} />);

        })}
      </svg>
      {/* mug */}
      <svg width={92 * scale} height={70 * scale} viewBox="0 0 92 70" style={{ position: 'absolute', bottom: 0, left: 0 }} shapeRendering="crispEdges">
        <rect x="10" y="16" width="60" height="44" fill={B_COLORS.bubble} stroke={B_COLORS.ink} strokeWidth="3" />
        {/* handle */}
        <rect x="70" y="24" width="12" height="4" fill={B_COLORS.ink} />
        <rect x="78" y="24" width="4" height="22" fill={B_COLORS.ink} />
        <rect x="70" y="44" width="12" height="4" fill={B_COLORS.ink} />
        {/* tea */}
        <rect x="13" y="19" width="54" height="6" fill={B_COLORS.brown} />
        {/* heart */}
        <path d="M 36 36 q -4 -6 -10 0 q 0 6 10 12 q 10 -6 10 -12 q -6 -6 -10 0 Z" fill={B_COLORS.red} />
        {/* saucer */}
        <rect x="4" y="60" width="72" height="4" fill={B_COLORS.ink} />
        <rect x="8" y="58" width="64" height="2" fill={B_COLORS.peach} />
      </svg>
    </div>);

}

// ─────── HERO ───────
function HeroB() {
  const ref = React.useRef(null);
  const [mouse, setMouse] = React.useState({ x: 640, y: 360 });
  const t = useTick(8);
  // Cozy palette: warm earth tones instead of rainbow neon.
  const pal = [B_COLORS.red, B_COLORS.peach, B_COLORS.sun, B_COLORS.forest, B_COLORS.sky, B_COLORS.grape, B_COLORS.bubble];

  return (
    <section
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect();
        setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      style={{
        position: 'relative', padding: '52px 80px 72px', minHeight: 760, overflow: 'hidden',
        background: `linear-gradient(180deg, ${B_COLORS.paper} 0%, ${B_COLORS.paper2} 100%)`
      }}>
      
      <GraphPaper />
      <PaperTexture />
      <CozyMotes count={18} />

      {/* parallax doodles — slowed, softened */}
      <div style={{ position: 'absolute', top: 100 + Math.sin(t / 5) * 4, left: 60, transform: `translate(${(mouse.x - 640) * 0.02}px, 0)`, zIndex: 2 }}>
        <StarBurst size={70} color={B_COLORS.bubble} rotate={t * 2} />
      </div>
      <div style={{ position: 'absolute', top: 220, right: 80, transform: `translate(${(mouse.x - 640) * -0.03}px, 0)`, zIndex: 2 }}>
        <StarBurst size={50} color={B_COLORS.sun} rotate={-t * 3} />
      </div>
      <div style={{ position: 'absolute', bottom: 80, left: '40%', transform: `translate(${(mouse.x - 640) * 0.04}px, ${Math.sin(t / 3) * 3}px)`, zIndex: 2 }}>
        <StickerBadge color={B_COLORS.mint} size={70} rotate={Math.sin(t / 6) * 6}><span style={{ fontSize: 11, lineHeight: 1.1 }}>HAND<br />MADE</span></StickerBadge>
      </div>
      {/* cozy steaming mug, bottom-left */}
      <div style={{ position: 'absolute', bottom: 60, left: 40, zIndex: 3, transform: 'rotate(-4deg)' }}>
        <TeaMug scale={0.9} />
      </div>

      {/* nav */}
      <div style={{ position: 'relative', zIndex: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: "'Pixelify Sans', monospace", fontWeight: 700, fontSize: 18, color: B_COLORS.ink }}>
          <span style={{ display: 'inline-block', width: 14, height: 14, background: B_COLORS.red, borderRadius: '50%', boxShadow: `0 0 0 4px ${B_COLORS.red}33` }} />
          azure231 · cozy corner ✿
        </div>
        <nav style={{ display: 'flex', gap: 22, fontFamily: "'Pixelify Sans', monospace", fontWeight: 600, fontSize: 18 }}>
          {[['#about', 'about'], ['#games', 'games'], ['#asap', 'asap'], ['#skills', 'skills'], ['CV/', 'cv'], ['#contact', 'say hi']].map(([h, l], i) =>
          <a key={l} href={h} style={{
            color: B_COLORS.ink, textDecoration: 'none',
            padding: '4px 10px', background: i % 2 ? '#fff' : 'transparent',
            border: i % 2 ? `2px solid ${B_COLORS.ink}` : 'none',
            transform: `rotate(${[-1, 1, -1, 1, -1, 1][i]}deg)`
          }}>{l}</a>
          )}
        </nav>
      </div>

      {/* HERO body */}
      <div style={{ position: 'relative', zIndex: 5, marginTop: 60, display: 'grid', gridTemplateColumns: '1fr 380px', gap: 40, alignItems: 'center' }}>
        <div>
          <div style={{ display: 'inline-block', background: B_COLORS.peach, color: B_COLORS.ink, padding: '6px 14px', fontFamily: "'Pixelify Sans', monospace", fontWeight: 700, fontSize: 16, letterSpacing: '0.18em', transform: 'rotate(-2deg)', border: `3px solid ${B_COLORS.ink}`, boxShadow: `3px 3px 0 ${B_COLORS.ink}` }}>
            ✿ hi, friend ✿
          </div>

          <div style={{ marginTop: 28, fontFamily: "'Press Start 2P', monospace", fontSize: 100, lineHeight: 1, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }} data-comment-anchor="2b05732457-div-159-11">
            {'azure231'.split('').map((ch, i) =>
            <span key={i} style={{
              color: pal[i % pal.length],
              display: 'inline-block',
              transform: `translateY(${Math.sin((t + i * 2) / 3) * 4}px) rotate(${Math.sin((t + i) / 4) * 2}deg)`,
              textShadow: `4px 4px 0 ${B_COLORS.ink}`
            }}>{ch}</span>
            )}
          </div>
          <HandSquiggle color={B_COLORS.peach} width={420} height={14} />

          <div style={{ marginTop: 32, fontFamily: "'Pixelify Sans', monospace", fontWeight: 500, fontSize: 28, lineHeight: 1.3, color: B_COLORS.ink, maxWidth: 580 }}>
            a <em style={{ background: B_COLORS.sun, padding: '0 6px', fontStyle: 'normal', boxShadow: `2px 2px 0 ${B_COLORS.ink}` }}>solo / lead game-developer</em> handcrafting cozy little worlds in <strong>Unity</strong> &amp; <strong>Roblox</strong> — slow afternoons, warm pixels, no rush.
          </div>

          <div style={{ marginTop: 28, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a href="#games" style={{
              fontFamily: "'Pixelify Sans', monospace", fontWeight: 700, fontSize: 22,
              background: B_COLORS.red, color: '#fff', border: `3px solid ${B_COLORS.ink}`,
              padding: '14px 22px', cursor: 'pointer', textDecoration: 'none',
              boxShadow: `5px 5px 0 ${B_COLORS.ink}`, transform: 'rotate(-2deg)'
            }}>↓ wander the shelf</a>
            <a href="#contact" style={{
              fontFamily: "'Pixelify Sans', monospace", fontWeight: 700, fontSize: 22,
              background: B_COLORS.bubble, color: B_COLORS.ink, border: `3px solid ${B_COLORS.ink}`,
              padding: '14px 22px', cursor: 'pointer', textDecoration: 'none',
              boxShadow: `5px 5px 0 ${B_COLORS.ink}`, transform: 'rotate(1deg)'
            }}>pour some tea ✿</a>
          </div>
        </div>

        {/* arcade screen with player + fishes following mouse */}
        <div style={{ position: 'relative', width: 360, height: 380 }}>
          <div style={{
            position: 'absolute', top: 30, left: 40, width: 280, height: 320,
            background: '#fff', border: `3px solid ${B_COLORS.ink}`,
            boxShadow: `10px 10px 0 ${B_COLORS.ink}`,
            transform: `rotate(${3 + Math.sin(t / 4) * 0.6}deg)`
          }}>
            <WashiTape color={B_COLORS.bubble} width={140} rotate={-6} top={-18} left="50%" />
            <div style={{ position: 'relative', height: 220, background: `linear-gradient(180deg, #87ceeb 0%, ${B_COLORS.sky} 50%, ${B_COLORS.blue} 100%)`, overflow: 'hidden' }}>
              {/* sun */}
              <div style={{ position: 'absolute', top: 14, right: 14, width: 36, height: 36, background: B_COLORS.sun, borderRadius: '50%', boxShadow: `0 0 0 6px ${B_COLORS.sun}55` }} />
              {/* clouds */}
              <div style={{ position: 'absolute', top: 28, left: t * 2 % 320 - 60, width: 50, height: 14, background: '#fff', borderRadius: 8 }} />
              <div style={{ position: 'absolute', top: 56, left: t * 1.4 % 340 - 80, width: 70, height: 18, background: '#fff', borderRadius: 10 }} />
              {/* waterline */}
              <div style={{ position: 'absolute', top: 130, left: 0, right: 0, height: 2, background: '#fff', opacity: 0.6 }} />
              {/* swimming fish */}
              <div style={{ position: 'absolute', top: 150, left: t * 3 % 320 - 50 }}>
                <PixelFish size={50} color={B_COLORS.sun} accent={B_COLORS.peach} />
              </div>
              <div style={{ position: 'absolute', top: 188, left: 280 - t * 2 % 320 }}>
                <PixelFish size={36} color={B_COLORS.bubble} accent={B_COLORS.red} />
              </div>
              {/* boat */}
              <div style={{ position: 'absolute', bottom: 50, left: 100 + Math.sin(t / 4) * 4 }}>
                <svg width="80" height="60" viewBox="0 0 80 60" shapeRendering="crispEdges">
                  <rect x="20" y="50" width="50" height="8" fill={B_COLORS.brown} />
                  <polygon points="20,50 10,58 70,58 70,50" fill={B_COLORS.brown} />
                  <rect x="42" y="20" width="3" height="32" fill={B_COLORS.ink} />
                  <rect x="44" y="40" width="2" height="20" fill="#fff" />
                  {/* hero on boat */}
                  <g transform="translate(30, 30)">
                    <PixelHero size={20} color={B_COLORS.red} frame={t} />
                  </g>
                </svg>
              </div>
            </div>
            <div style={{ padding: '14px 16px', textAlign: 'center', fontFamily: "'Pixelify Sans', monospace", fontWeight: 700, fontSize: 18, color: B_COLORS.ink }}>
              ★ now shipping ★
            </div>
          </div>

          <div style={{ position: 'absolute', top: -10, right: -20, zIndex: 2 }}>
            <StickerBadge color={B_COLORS.red} rotate={12 + Math.sin(t / 5) * 3} size={92}>
              <span style={{ fontSize: 11, lineHeight: 1.1, textAlign: 'center' }}>SLOW<br />MADE</span>
            </StickerBadge>
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: -20 }}>
            <StickerBadge color={B_COLORS.grape} rotate={-14} size={78}><span style={{ fontSize: 11 }}>cozy<br />v1.0</span></StickerBadge>
          </div>
        </div>
      </div>

      {/* ticker / marquee */}
      <Marquee />
    </section>);

}

function Marquee() {
  const items = [
  '✿ now playing: lo-fi beats & hunt giant fish',
  '✿ 13.7M+ visits, one fish at a time',
  '✿ pixels glued by hand · vietnam → ∞',
  '✿ tea on · open for cozy jams',
  '✿ no two pixels alike',
  '✿ unity · roblox · aseprite · catnaps'];

  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      background: B_COLORS.ink, color: B_COLORS.sun,
      borderTop: `4px solid ${B_COLORS.peach}`,
      overflow: 'hidden',
      fontFamily: "'Press Start 2P', monospace", fontSize: 14, letterSpacing: '0.1em',
      zIndex: 6
    }}>
      <style>{`
        @keyframes scroll-marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .marquee-track { display: inline-flex; gap: 56px; padding: 14px 0; animation: scroll-marquee 48s linear infinite; white-space: nowrap; }
      `}</style>
      <div className="marquee-track">
        {items.concat(items).map((it, i) => <span key={i}>{it}</span>)}
      </div>
    </div>);

}

// ─────── ABOUT ───────
function AboutB() {
  return (
    <section id="about" style={{ position: 'relative', padding: '90px 80px 100px', background: B_COLORS.paper2 }}>
      <PaperTexture />
      <div style={{ position: 'relative', zIndex: 5, display: 'grid', gridTemplateColumns: '420px 1fr', gap: 60, alignItems: 'start' }}>
        {/* polaroid self portrait */}
        <div style={{
          background: '#fff', padding: 14, paddingBottom: 50,
          border: `3px solid ${B_COLORS.ink}`,
          boxShadow: `10px 12px 0 ${B_COLORS.ink}`,
          transform: 'rotate(-3deg)',
          position: 'relative'
        }}>
          <WashiTape color={B_COLORS.sun} pattern="stripes" width={140} rotate={-3} top={-18} left="50%" />
          <div style={{
            width: '100%', height: 360, background: `linear-gradient(180deg, ${B_COLORS.peach} 0%, ${B_COLORS.sun} 100%)`,
            position: 'relative', overflow: 'hidden',
            border: `2px solid ${B_COLORS.ink}`
          }}>
            <img
              src="assets/azure-portrait.jpg"
              alt="azure231 IRL"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }} />
            <div style={{ position: 'absolute', top: 12, left: 12, fontFamily: "'VT323', monospace", fontSize: 22, color: '#fff', textShadow: `2px 2px 0 ${B_COLORS.ink}` }}>
              IRL.JPG
            </div>
            <div style={{ position: 'absolute', bottom: 8, right: 12, fontFamily: "'VT323', monospace", fontSize: 18, color: '#fff', textShadow: `2px 2px 0 ${B_COLORS.ink}` }}>
              📷 03 / 2026
            </div>
          </div>
          <div style={{ marginTop: 16, fontFamily: "'Pixelify Sans', monospace", fontWeight: 700, fontSize: 22, color: B_COLORS.ink, textAlign: 'center' }}>
            azure231 — toymaker
          </div>
        </div>

        <div>
          <div style={{ display: 'inline-block', background: B_COLORS.sun, padding: '4px 14px', transform: 'rotate(-1deg)', fontFamily: "'Pixelify Sans', monospace", fontWeight: 700, fontSize: 14, letterSpacing: '0.15em', border: `2px solid ${B_COLORS.ink}` }}>
            ABOUT THIS GUY
          </div>
          <div style={{ marginTop: 20, fontFamily: "'Press Start 2P', monospace", fontSize: 44, lineHeight: 1.2, color: B_COLORS.ink }}>
            i make games <span style={{ color: B_COLORS.red }}>by hand.</span>
          </div>
          <div style={{ marginTop: 28, fontFamily: "'Pixelify Sans', monospace", fontWeight: 500, fontSize: 26, lineHeight: 1.45, color: B_COLORS.ink }}>
            {AZURE_BIO}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 36 }}>
            {[
            { k: 'role', v: 'tech lead · solo dev', c: B_COLORS.red },
            { k: 'engines', v: 'unity · roblox', c: B_COLORS.sky },
            { k: 'mood', v: 'cozy & chaotic', c: B_COLORS.bubble }].
            map(({ k, v, c }, i) =>
            <div key={k} style={{
              background: '#fff', padding: '16px 18px',
              border: `3px solid ${B_COLORS.ink}`,
              boxShadow: `4px 4px 0 ${B_COLORS.ink}`,
              transform: `rotate(${[-1, 0.5, -0.5][i]}deg)`
            }}>
                <div style={{ display: 'inline-block', background: c, padding: '2px 8px', fontFamily: "'Pixelify Sans', monospace", fontWeight: 700, fontSize: 12, letterSpacing: '0.1em', border: `2px solid ${B_COLORS.ink}` }}>
                  {k.toUpperCase()}
                </div>
                <div style={{ marginTop: 8, fontFamily: "'Pixelify Sans', monospace", fontWeight: 600, fontSize: 22, color: B_COLORS.ink }}>
                  {v}
                </div>
              </div>
            )}
          </div>

          {/* gallery of pixel-art doodles */}
          <div style={{ marginTop: 36, display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: "'Pixelify Sans', monospace", fontWeight: 600, fontSize: 18, color: B_COLORS.brown }}>
              workshop scraps →
            </span>
            {[B_COLORS.red, B_COLORS.peach, B_COLORS.sun, B_COLORS.mint, B_COLORS.bubble].map((c, i) =>
            <div key={i} style={{
              width: 64, height: 64, background: '#fff', border: `2px solid ${B_COLORS.ink}`,
              boxShadow: `3px 3px 0 ${B_COLORS.ink}`, display: 'grid', placeItems: 'center',
              transform: `rotate(${[-3, 2, -1, 3, -2][i]}deg)`
            }}>
                {i === 0 ? <PixelFish size={48} color={c} accent={B_COLORS.peach} /> :
              i === 1 ? <PixelHero size={44} color={c} /> :
              i === 2 ? <StarBurst size={44} color={c} /> :
              i === 3 ? <PixelIcon kind="aseprite" fg={c} size={44} /> :
              <PixelIcon kind="unity" fg={c} size={44} />}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}

// ─────── STATS ROW (Hunt Giant Fish) ───────
function StatsBanner() {
  const [ref, vis] = useInView(0.3);
  const visits = useCountUp(13_700_000, vis, 1500);
  const favorites = useCountUp(55_800, vis, 1500);
  const concurrent = useCountUp(10_000, vis, 1600);

  const fmt = (n) => {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    return n.toLocaleString();
  };

  const items = [
  { v: fmt(visits), l: 'visits', c: B_COLORS.sun },
  { v: fmt(favorites), l: 'favorites', c: B_COLORS.bubble },
  { v: fmt(concurrent), l: 'peak concurrent', c: B_COLORS.mint }];


  return (
    <div ref={ref} style={{
      position: 'relative', background: B_COLORS.ink, color: '#fff',
      padding: '36px 80px 40px', overflow: 'hidden',
      borderTop: `4px solid ${B_COLORS.sun}`, borderBottom: `4px solid ${B_COLORS.red}`
    }}>
      <div style={{ position: 'absolute', top: 8, left: 80, fontFamily: "'Pixelify Sans', monospace", fontWeight: 700, fontSize: 14, color: B_COLORS.sun, letterSpacing: '0.2em' }}>
        ★ HUNT GIANT FISH · LIVE NUMBERS ★
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 36, marginTop: 22 }}>
        {items.map((it, i) =>
        <div key={it.l} style={{ borderLeft: i ? `2px dashed ${B_COLORS.brown}` : 'none', paddingLeft: i ? 28 : 0 }}>
            <div style={{
            fontFamily: "'Press Start 2P', monospace", fontSize: 44, color: it.c,
            textShadow: `3px 3px 0 ${B_COLORS.brown}`
          }}>{it.v}</div>
            <div style={{ marginTop: 10, fontFamily: "'Pixelify Sans', monospace", fontWeight: 600, fontSize: 18, color: '#fff', opacity: 0.9, letterSpacing: '0.05em' }}>
              {it.l}
            </div>
          </div>
        )}
      </div>
    </div>);

}

// ─────── GAME CARDS (real artwork) ───────
function HuntGiantFishCard() {
  const game = GAMES[0];
  const t = useTick(8);
  const [hover, setHover] = React.useState(false);
  const slotIds = ['hgf-shot-a', 'hgf-shot-b', 'hgf-shot-c', 'hgf-shot-d'];
  const slotSrcs = ['assets/hgf-1.webp', 'assets/hgf-2.webp', 'assets/hgf-3.webp', 'assets/hgf-4.webp'];
  const [shotIdx, setShotIdx] = React.useState(0);
  const tSlow = useTick(2);
  React.useEffect(() => {
    setShotIdx((i) => (i + 1) % slotIds.length);
  }, [Math.floor(tSlow / 3)]);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative', background: '#fff',
        border: `3px solid ${B_COLORS.ink}`,
        boxShadow: hover ? `12px 14px 0 ${B_COLORS.ink}` : `8px 10px 0 ${B_COLORS.ink}`,
        transform: `rotate(${hover ? 0 : -1.5}deg) translateY(${hover ? -6 : 0}px)`,
        transition: 'all 200ms ease',
        padding: 14, paddingBottom: 28
      }} data-comment-anchor="1d7c55ac4a-div-426-5">

      <WashiTape color={B_COLORS.sky} pattern="stripes" width={180} rotate={-4} top={-20} left="32%" />
      <WashiTape color={B_COLORS.bubble} pattern="dots" width={120} rotate={6} top={-18} left="78%" />

      {/* Carousel of drop-zones — same auto-slide treatment as Sơn Tinh card.
             Each slot keeps a stable id so dropped screenshots persist independently.
             Only the active slot receives pointer events so drops always land on
             the visible one. Click a dot below to pin a different slot. */}
      <div style={{ position: 'relative', height: 280, overflow: 'hidden', border: `2px solid ${B_COLORS.ink}`, background: '#0284c7' }}>
        {/* pixel-art fallback behind everything until anything is dropped */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <HGFFallback t={t} />
        </div>
        {slotIds.map((id, i) =>
        <div key={id} style={{
          position: 'absolute', inset: 0,
          opacity: i === shotIdx ? 1 : 0,
          pointerEvents: i === shotIdx ? 'auto' : 'none',
          transition: 'opacity 600ms ease',
          zIndex: i === shotIdx ? 2 : 1
        }}>
            <image-slot
            id={id}
            src={slotSrcs[i]}
            shape="rect"
            placeholder={i === 0 ? game.coverSlotPlaceholder : `drop screenshot ${i + 1}`}
            style={{ width: '100%', height: '100%', display: 'block' }}>
            </image-slot>
          </div>
        )}

        {/* Roblox tag */}
        <div style={{ position: 'absolute', top: 10, left: 10, padding: '4px 10px', background: '#fff', border: `2px solid ${B_COLORS.ink}`, fontFamily: "'Pixelify Sans', monospace", fontWeight: 700, fontSize: 12, zIndex: 5 }}>
          ROBLOX
        </div>
        <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 5 }}>
          <StickerBadge color={B_COLORS.red} size={64} rotate={hover ? 14 : -8}>
            <span style={{ fontSize: 10, lineHeight: 1.1 }}>TECH<br />LEAD</span>
          </StickerBadge>
        </div>

        {/* gallery dots — click to pin a slot */}
        <div style={{ position: 'absolute', bottom: 10, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 6, zIndex: 5 }}>
          {slotIds.map((_, i) =>
          <button key={i}
          onClick={(e) => {e.stopPropagation();setShotIdx(i);}}
          style={{
            width: 12, height: 12, padding: 0, cursor: 'pointer',
            background: i === shotIdx ? B_COLORS.sun : 'rgba(255,255,255,0.55)',
            border: `2px solid ${B_COLORS.ink}`,
            borderRadius: 0
          }} />
          )}
        </div>
      </div>

      <div style={{ marginTop: 18, padding: '0 6px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 22, color: B_COLORS.ink }}>
            {game.title}
          </div>
          <div style={{ fontFamily: "'VT323', monospace", fontSize: 24, color: B_COLORS.brown }}>
            ↳ {game.year}
          </div>
        </div>
        <div style={{ marginTop: 4, fontFamily: "'Pixelify Sans', monospace", fontWeight: 600, fontSize: 18, color: B_COLORS.blue }} data-comment-anchor="8f57393de4-div-508-9">
          {game.platform} · {game.role} · @ ASAP Studio
        </div>
        <div style={{ marginTop: 14, fontFamily: "'Pixelify Sans', monospace", fontSize: 20, lineHeight: 1.35, color: B_COLORS.ink }}>
          {game.blurb}
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 18, flexWrap: 'wrap' }}>
          {game.tags.map((tag, ti) =>
          <span key={tag} style={{
            fontFamily: "'Pixelify Sans', monospace", fontWeight: 600, fontSize: 14,
            padding: '4px 10px',
            background: [B_COLORS.sun, B_COLORS.bubble, B_COLORS.mint][ti % 3],
            border: `2px solid ${B_COLORS.ink}`,
            transform: `rotate(${ti % 2 ? -2 : 2}deg)`
          }}>#{tag}</span>
          )}
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 22 }}>
          <a href={game.url} target="_top" rel="noreferrer" style={{
            fontFamily: "'Pixelify Sans', monospace", fontWeight: 700, fontSize: 18,
            background: B_COLORS.blue, color: '#fff', padding: '12px 22px',
            border: `3px solid ${B_COLORS.ink}`, textDecoration: 'none',
            boxShadow: `4px 4px 0 ${B_COLORS.ink}`
          }}>▶ play on roblox</a>
          <a href={LINKS.roblox.url} target="_blank" rel="noreferrer" style={{
            fontFamily: "'Pixelify Sans', monospace", fontWeight: 700, fontSize: 18,
            background: '#fff', color: B_COLORS.ink, padding: '12px 22px',
            border: `3px solid ${B_COLORS.ink}`, textDecoration: 'none',
            boxShadow: `4px 4px 0 ${B_COLORS.ink}`
          }}>my roblox profile →</a>
        </div>
      </div>
    </div>);

}

function HGFFallback({ t }) {
  // Pixel-art lake with a giant fish breaching
  const wave = Math.sin(t / 3) * 3;
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #87ceeb 0%, #0284c7 60%, #1e3a8a 100%)' }}>
      <div style={{ position: 'absolute', top: 18, right: 24, width: 50, height: 50, background: B_COLORS.sun, borderRadius: '50%', boxShadow: `0 0 0 8px ${B_COLORS.sun}55` }} />
      <div style={{ position: 'absolute', top: 36, left: t * 1.5 % 500 - 80, width: 70, height: 18, background: '#fff', borderRadius: 10, opacity: 0.85 }} />
      <div style={{ position: 'absolute', top: 70, left: t * 0.8 % 600 - 100, width: 100, height: 22, background: '#fff', borderRadius: 12, opacity: 0.7 }} />
      {/* giant fish breaching */}
      <div style={{ position: 'absolute', top: 110 + wave, left: '34%' }}>
        <PixelFish size={180} color="#fbbf24" accent="#f97316" />
      </div>
      {/* boat */}
      <div style={{ position: 'absolute', bottom: 40, left: 60, transform: `translateY(${wave}px)` }}>
        <svg width="120" height="80" viewBox="0 0 120 80" shapeRendering="crispEdges">
          <rect x="20" y="60" width="80" height="12" fill={B_COLORS.brown} />
          <polygon points="20,60 6,72 114,72 100,60" fill={B_COLORS.brown} />
          <rect x="58" y="14" width="4" height="48" fill={B_COLORS.ink} />
          <rect x="62" y="40" width="36" height="2" fill="#fff" />
        </svg>
      </div>
      <div style={{ position: 'absolute', bottom: 16, left: 16, fontFamily: "'Press Start 2P', monospace", fontSize: 11, color: '#fff' }}>
        DROP YOUR HGF SCREENSHOT HERE →
      </div>
    </div>);

}

function SonTinhCard() {
  const game = GAMES[1];
  const [hover, setHover] = React.useState(false);
  const [shotIdx, setShotIdx] = React.useState(0);
  const t = useTick(2);
  React.useEffect(() => {
    setShotIdx((i) => (i + 1) % game.gallery.length);
  }, [Math.floor(t / 3)]); // change every 1.5s
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative', background: '#fff',
        border: `3px solid ${B_COLORS.ink}`,
        boxShadow: hover ? `12px 14px 0 ${B_COLORS.ink}` : `8px 10px 0 ${B_COLORS.ink}`,
        transform: `rotate(${hover ? 0 : 2}deg) translateY(${hover ? -6 : 0}px)`,
        transition: 'all 200ms ease',
        padding: 14, paddingBottom: 28
      }}>
      
      <WashiTape color={B_COLORS.mint} pattern="stripes" width={180} rotate={-3} top={-20} left="62%" />
      <WashiTape color={B_COLORS.peach} pattern="dots" width={110} rotate={-12} top={-16} left="22%" />

      {/* Real artwork carousel */}
      <div style={{ position: 'relative', height: 280, overflow: 'hidden', border: `2px solid ${B_COLORS.ink}`, background: '#1f2937' }}>
        {game.gallery.map((src, i) =>
        <ArtImg key={i} src={src} alt={`Son Tinh ${i}`}
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
          opacity: i === shotIdx ? 1 : 0,
          transition: 'opacity 600ms ease',
          imageRendering: 'pixelated'
        }}
        fallback={null} />

        )}
        <div style={{ position: 'absolute', top: 10, left: 10, padding: '4px 10px', background: '#fff', border: `2px solid ${B_COLORS.ink}`, fontFamily: "'Pixelify Sans', monospace", fontWeight: 700, fontSize: 12 }}>
          UNITY · ITCH.IO
        </div>
        <div style={{ position: 'absolute', top: 10, right: 10 }}>
          <StickerBadge color={B_COLORS.forest} size={64} rotate={hover ? 14 : -8}>
            <span style={{ fontSize: 9, lineHeight: 1.1 }}>DEV +<br />ARTIST</span>
          </StickerBadge>
        </div>
        {/* gallery dots */}
        <div style={{ position: 'absolute', bottom: 10, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 6 }}>
          {game.gallery.map((_, i) =>
          <div key={i} style={{
            width: 10, height: 10,
            background: i === shotIdx ? '#fff' : 'rgba(255,255,255,0.4)',
            border: '2px solid #000'
          }} />
          )}
        </div>
      </div>

      <div style={{ marginTop: 18, padding: '0 6px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 22, color: B_COLORS.ink }}>
            Son Tinh
          </div>
          <div style={{ fontFamily: "'VT323', monospace", fontSize: 24, color: B_COLORS.brown }}>
            ↳ {game.year}
          </div>
        </div>
        <div style={{ marginTop: 4, fontFamily: "'Pixelify Sans', monospace", fontWeight: 600, fontSize: 18, color: B_COLORS.forest }}>
          {game.platform} · {game.role}
        </div>
        <div style={{ marginTop: 14, fontFamily: "'Pixelify Sans', monospace", fontSize: 20, lineHeight: 1.35, color: B_COLORS.ink }}>
          {game.blurb}
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 18, flexWrap: 'wrap' }}>
          {game.tags.map((tag, ti) =>
          <span key={tag} style={{
            fontFamily: "'Pixelify Sans', monospace", fontWeight: 600, fontSize: 14,
            padding: '4px 10px',
            background: [B_COLORS.mint, B_COLORS.sun, B_COLORS.peach][ti % 3],
            border: `2px solid ${B_COLORS.ink}`,
            transform: `rotate(${ti % 2 ? -2 : 2}deg)`
          }}>#{tag}</span>
          )}
        </div>

        <a href={game.url} target="_blank" rel="noreferrer" style={{
          display: 'inline-block', marginTop: 22,
          fontFamily: "'Pixelify Sans', monospace", fontWeight: 700, fontSize: 18,
          background: B_COLORS.forest, color: '#fff', padding: '12px 22px',
          border: `3px solid ${B_COLORS.ink}`, textDecoration: 'none',
          boxShadow: `4px 4px 0 ${B_COLORS.ink}`
        }}>▶ play on itch.io</a>
      </div>
    </div>);

}

function GamesB() {
  return (
    <section id="games" style={{ position: 'relative', padding: '80px 80px 100px', background: B_COLORS.paper }}>
      <PaperTexture />
      <div style={{ position: 'relative', zIndex: 5 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginBottom: 8 }}>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 48, color: B_COLORS.ink }}>
            my <span style={{ color: B_COLORS.red }}>toys</span>.
          </div>
          <div style={{ fontFamily: "'Pixelify Sans', monospace", fontWeight: 600, fontSize: 22, color: B_COLORS.brown }}>
            (the ones I&apos;m proudest of so far)
          </div>
        </div>
        <HandSquiggle color={B_COLORS.peach} width={300} height={14} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, marginTop: 56 }}>
          <HuntGiantFishCard />
          <SonTinhCard />
        </div>

        <div style={{
          marginTop: 70, padding: '20px 28px', background: '#fff',
          border: `3px dashed ${B_COLORS.ink}`,
          fontFamily: "'Pixelify Sans', monospace", fontWeight: 500, fontSize: 22, color: B_COLORS.ink,
          textAlign: 'center', maxWidth: 720, marginLeft: 'auto', marginRight: 'auto',
          transform: 'rotate(-0.5deg)'
        }}>
          ✦ more on <a href={LINKS.itch.url} target="_blank" rel="noreferrer" style={{ color: B_COLORS.red, textDecorationStyle: 'wavy' }}>itch.io/azure231</a> · prototypes, jams, weird experiments ✦
        </div>
      </div>
    </section>);

}

// ─────── ARTWORK GALLERY (Sơn Tinh + Cat & Dungeon dev art) ───────
function ArtworkSection() {
  const t = useTick(8);
  const items = [
  { src: ART.sonTinhCover, caption: 'son tinh · cover', tilt: -3, game: 'son tinh' },
  { src: ART.catDungeonCover, caption: 'cat & dungeon · cover', tilt: 2.5, game: 'cat & dungeon' },
  { src: ART.sonTinhAbout, caption: 'son tinh · world', tilt: -2, game: 'son tinh' },
  { src: ART.catDungeonShot1, caption: 'cat & dungeon · level', tilt: 1.5, game: 'cat & dungeon' },
  { src: ART.sonTinhQuest, caption: 'son tinh · quest items', tilt: -1.5, game: 'son tinh' },
  { src: ART.catBubShot1, caption: 'cat bub II · ocean depths', tilt: 3, game: 'cat bub' },
  { src: ART.sonTinhFeature, caption: 'son tinh · features', tilt: -2.5, game: 'son tinh' },
  { src: ART.catUpShot1, caption: 'cat up · the storm', tilt: 2, game: 'cat up' }];

  const [drags, setDrags] = React.useState({});
  const onDrag = (i, dx, dy) => setDrags((d) => ({ ...d, [i]: { dx, dy } }));

  return (
    <section style={{
      position: 'relative', padding: '80px 80px 100px',
      background: B_COLORS.paper2,
      borderTop: `4px dashed ${B_COLORS.ink}`
    }}>
      <PaperTexture />
      <div style={{ position: 'relative', zIndex: 5 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 40, color: B_COLORS.ink }}>
            <span style={{ color: B_COLORS.peach }}>artwork</span> · sketchbook
          </div>
          <div style={{ fontFamily: "'Pixelify Sans', monospace", fontWeight: 600, fontSize: 20, color: B_COLORS.brown }}>
            (drag the polaroids around — they remember where you put them)
          </div>
        </div>
        <HandSquiggle color={B_COLORS.peach} width={260} height={12} />

        <div style={{
          marginTop: 48, position: 'relative', height: 920,
          background: `repeating-linear-gradient(45deg, ${B_COLORS.brown}11 0 12px, transparent 12px 24px), ${B_COLORS.paper}`,
          border: `4px dashed ${B_COLORS.brown}66`, padding: 24
        }} data-comment-anchor="98ba7122ed-div-709-9">
          {items.map((it, i) =>
          <DraggablePolaroid
            key={i}
            i={i}
            src={it.src}
            caption={it.caption}
            tilt={it.tilt}
            t={t}
            drag={drags[i]}
            onDrag={(dx, dy) => onDrag(i, dx, dy)} />

          )}
        </div>

        <div style={{ marginTop: 24, fontFamily: "'Pixelify Sans', monospace", fontSize: 18, color: B_COLORS.brown, textAlign: 'center' }}>
          ✦ all pixel-art hand-drawn in <strong>Aseprite</strong> · sourced from <a href={LINKS.itch.url} target="_blank" rel="noreferrer" style={{ color: B_COLORS.red }}>itch.io/azure231</a> ✦
        </div>
      </div>
    </section>);

}

function DraggablePolaroid({ i, src, caption, tilt, t, drag, onDrag }) {
  const positions = [
  { left: '2%', top: 10 },
  { left: '24%', top: 90 },
  { left: '48%', top: 0 },
  { left: '70%', top: 110 },
  { left: '6%', top: 320 },
  { left: '32%', top: 380 },
  { left: '56%', top: 320 },
  { left: '78%', top: 410 }];

  const pos = positions[i % positions.length];
  const startRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);

  const onDown = (e) => {
    e.preventDefault();
    startRef.current = { x: e.clientX - (drag?.dx || 0), y: e.clientY - (drag?.dy || 0) };
    setDragging(true);
  };
  React.useEffect(() => {
    if (!dragging) return;
    const move = (e) => {
      onDrag(e.clientX - startRef.current.x, e.clientY - startRef.current.y);
    };
    const up = () => setDragging(false);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
  }, [dragging]);

  const wobble = Math.sin((t + i * 7) / 6) * 1.2;

  return (
    <div
      onMouseDown={onDown}
      style={{
        position: 'absolute',
        left: pos.left, top: pos.top,
        transform: `translate(${drag?.dx || 0}px, ${drag?.dy || 0}px) rotate(${tilt + (dragging ? 0 : wobble)}deg)`,
        cursor: dragging ? 'grabbing' : 'grab',
        zIndex: dragging ? 20 : 1,
        userSelect: 'none',
        transition: dragging ? 'none' : 'transform 200ms'
      }}>
      
      <div style={{
        background: '#fff', padding: 12, paddingBottom: 38,
        border: `3px solid ${B_COLORS.ink}`,
        boxShadow: dragging ? `12px 14px 0 ${B_COLORS.ink}` : `6px 8px 0 ${B_COLORS.ink}`,
        width: 240
      }}>
        <WashiTape
          color={[B_COLORS.bubble, B_COLORS.sun, B_COLORS.mint, B_COLORS.peach][i % 4]}
          pattern="stripes" width={120} rotate={-3 + i % 3} top={-16} left="50%" />
        
        <div style={{ width: '100%', height: 160, background: '#0a0a0a', overflow: 'hidden', border: `2px solid ${B_COLORS.ink}` }}>
          <ArtImg src={src} alt={caption}
          style={{ width: '100%', height: '100%', objectFit: 'cover', imageRendering: 'pixelated' }}
          fallback={
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center', color: '#fff', fontFamily: "'Pixelify Sans', monospace", fontSize: 14, padding: 12, textAlign: 'center' }}>
                pixel art<br />loading…
              </div>
          } />
          
        </div>
        <div style={{ marginTop: 10, fontFamily: "'Pixelify Sans', monospace", fontWeight: 600, fontSize: 16, color: B_COLORS.ink, textAlign: 'center' }}>
          {caption}
        </div>
      </div>
    </div>);

}

// ─────── SKILLS (collectible stickers + confetti) ───────
function SkillsB() {
  const colors = [B_COLORS.red, B_COLORS.sky, B_COLORS.bubble, B_COLORS.mint, B_COLORS.grape];
  const [unlocked, setUnlocked] = React.useState({});
  const [confetti, setConfetti] = React.useState(null);

  const onPeel = (e, name) => {
    setUnlocked((u) => ({ ...u, [name]: !u[name] }));
    if (!unlocked[name]) {
      const r = e.currentTarget.getBoundingClientRect();
      const parent = e.currentTarget.closest('section').getBoundingClientRect();
      setConfetti({ x: r.left + r.width / 2 - parent.left, y: r.top + 40 - parent.top, key: Math.random() });
    }
  };

  return (
    <section id="skills" style={{ position: 'relative', padding: '80px 80px 100px', background: B_COLORS.paper, overflow: 'hidden' }}>
      <PaperTexture />
      <div style={{ position: 'relative', zIndex: 5 }}>
        <div style={{ display: 'inline-block', background: B_COLORS.mint, padding: '4px 14px', transform: 'rotate(-1deg)', fontFamily: "'Pixelify Sans', monospace", fontWeight: 700, fontSize: 14, letterSpacing: '0.15em', border: `2px solid ${B_COLORS.ink}` }}>
          STICKER COLLECTION
        </div>
        <div style={{ marginTop: 16, fontFamily: "'Press Start 2P', monospace", fontSize: 44, color: B_COLORS.ink }}>
          things i&apos;m good at <span style={{ color: B_COLORS.red }}>(badges)</span>
        </div>
        <div style={{ marginTop: 12, fontFamily: "'Pixelify Sans', monospace", fontWeight: 500, fontSize: 22, color: B_COLORS.brown }}>
          tap to peel · <strong>{Object.values(unlocked).filter(Boolean).length}/{SKILLS.length}</strong> unlocked
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 24, marginTop: 48 }}>
          {SKILLS.map((s, i) => {
            const c = colors[i % colors.length];
            const peeled = !!unlocked[s.name];
            return (
              <div
                key={s.name}
                onClick={(e) => onPeel(e, s.name)}
                style={{
                  position: 'relative', background: '#fff',
                  border: `3px solid ${B_COLORS.ink}`,
                  boxShadow: `6px 8px 0 ${B_COLORS.ink}`,
                  padding: '24px 16px 20px', textAlign: 'center', cursor: 'pointer',
                  transform: `rotate(${[-2, 1, -1, 2, -1.5][i]}deg) translateY(${peeled ? -10 : 0}px)`,
                  transition: 'transform 200ms'
                }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                  <StickerBadge color={c} size={92} rotate={peeled ? 8 : 0}>
                    <PixelIcon kind={s.icon} fg="#fff" size={50} />
                  </StickerBadge>
                </div>
                <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 13, color: B_COLORS.ink }}>
                  {s.name.toUpperCase()}
                </div>
                <div style={{ marginTop: 10, fontFamily: "'Pixelify Sans', monospace", fontWeight: 700, fontSize: 16, color: c }}>
                  ★ LV {s.level}
                </div>
                {peeled &&
                <div style={{
                  position: 'absolute', top: -12, right: -12,
                  fontFamily: "'Pixelify Sans', monospace", fontWeight: 700, fontSize: 14,
                  background: B_COLORS.sun, color: B_COLORS.ink, padding: '4px 8px',
                  border: `2px solid ${B_COLORS.ink}`, transform: 'rotate(8deg)'
                }}>NEW!</div>
                }
              </div>);

          })}
        </div>

        {confetti && <Confetti key={confetti.key} at={confetti} palette={[B_COLORS.red, B_COLORS.sun, B_COLORS.bubble, B_COLORS.mint, B_COLORS.sky]} onDone={() => setConfetti(null)} />}
      </div>
    </section>);

}

// ─────── CONTACT ───────
function ContactB() {
  return (
    <section id="contact" style={{ position: 'relative', padding: '90px 80px 110px', background: B_COLORS.paper2 }}>
      <PaperTexture />
      <div style={{ position: 'relative', zIndex: 5, display: 'grid', gridTemplateColumns: '1fr 380px', gap: 80, alignItems: 'center' }}>
        <div>
          <div style={{ display: 'inline-block', background: B_COLORS.bubble, padding: '4px 14px', transform: 'rotate(1deg)', fontFamily: "'Pixelify Sans', monospace", fontWeight: 700, fontSize: 14, letterSpacing: '0.15em', border: `2px solid ${B_COLORS.ink}` }}>
            LET&apos;S BUILD
          </div>
          <div style={{ marginTop: 18, fontFamily: "'Press Start 2P', monospace", fontSize: 56, lineHeight: 1.1, color: B_COLORS.ink }}>
            wanna make a <span style={{ color: B_COLORS.red }}>weird</span><br /> little game <span style={{ color: B_COLORS.peach }}>together?</span>
          </div>
          <div style={{ marginTop: 24, fontFamily: "'Pixelify Sans', monospace", fontWeight: 500, fontSize: 24, color: B_COLORS.ink, maxWidth: 560 }}>
            i&apos;m always down for jams, collabs, or just talking pixels. drop me a line —
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 36 }}>
            {[LINKS.email, LINKS.linkedin, LINKS.itch, LINKS.roblox, LINKS.game].map((row, i) =>
            <a key={row.label} href={row.url} target="_blank" rel="noreferrer" style={{
              display: 'flex', alignItems: 'center', gap: 18,
              background: '#fff', border: `3px solid ${B_COLORS.ink}`,
              boxShadow: `5px 5px 0 ${B_COLORS.ink}`,
              padding: '14px 18px', textDecoration: 'none', color: B_COLORS.ink,
              transform: `rotate(${[-0.5, -0.6, 0.4, -0.3, 0.5][i]}deg)`,
              maxWidth: 580
            }}>
                <div style={{
                width: 48, height: 48, background: row.c, color: '#fff',
                border: `2px solid ${B_COLORS.ink}`,
                display: 'grid', placeItems: 'center',
                fontFamily: "'Pixelify Sans', monospace", fontWeight: 700, fontSize: 22
              }}>
                  {row.label[0]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 14 }}>{row.label}</div>
                  <div style={{ fontFamily: "'Pixelify Sans', monospace", fontWeight: 500, fontSize: 18, color: B_COLORS.brown, marginTop: 4 }}>
                    {row.handle} →
                  </div>
                </div>
              </a>
            )}
          </div>
        </div>

        <div style={{
          background: B_COLORS.sun, padding: 24,
          border: `3px solid ${B_COLORS.ink}`,
          boxShadow: `8px 10px 0 ${B_COLORS.ink}`,
          transform: 'rotate(3deg)',
          textAlign: 'center'
        }}>
          <div style={{ border: `3px dashed ${B_COLORS.ink}`, padding: 18 }}>
            <div style={{ fontFamily: "'Pixelify Sans', monospace", fontWeight: 700, fontSize: 14, letterSpacing: '0.2em', color: B_COLORS.brown }}>
              ★ HANDCRAFTED ★
            </div>
            <div style={{ marginTop: 18, display: 'flex', justifyContent: 'center' }}>
              <PixelHero size={100} color={B_COLORS.ink} frame={0} />
            </div>
            <div style={{ marginTop: 18, fontFamily: "'Press Start 2P', monospace", fontSize: 18, color: B_COLORS.ink }}>
              azure231
            </div>
            <div style={{ marginTop: 8, fontFamily: "'VT323', monospace", fontSize: 22, color: B_COLORS.brown }}>
              made w/ ♥, coffee &amp; aseprite
            </div>
            <div style={{ marginTop: 14, fontFamily: "'Pixelify Sans', monospace", fontWeight: 600, fontSize: 14, color: B_COLORS.ink, opacity: 0.7 }}>
              © {new Date().getFullYear()} no two pixels alike
            </div>
          </div>
        </div>
      </div>
    </section>);

}

// ─────── ASAP STUDIO ROBLOX SHELF ───────
// Three cards for the other Roblox titles Azure ships at ASAP Studio.
// Each card: image-slot for a dropped screenshot + themed pixel-art fallback,
// title block, tags, and a "play on roblox" CTA.
function ASAPStudioSection() {
  const t = useTick(8);
  return (
    <section id="asap" style={{ position: 'relative', padding: '70px 80px 90px', background: B_COLORS.paper2, borderTop: `4px dashed ${B_COLORS.ink}` }}>
      <PaperTexture />
      <div style={{ position: 'relative', zIndex: 5 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginBottom: 8, flexWrap: 'wrap' }}>
          <div style={{ display: 'inline-block', background: B_COLORS.sky, padding: '4px 14px', transform: 'rotate(-1deg)', fontFamily: "'Pixelify Sans', monospace", fontWeight: 700, fontSize: 14, letterSpacing: '0.15em', border: `2px solid ${B_COLORS.ink}` }}>
            ASAP STUDIO · ROBLOX
          </div>
        </div>
        <div style={{ marginTop: 14, fontFamily: "'Press Start 2P', monospace", fontSize: 40, color: B_COLORS.ink }}>
          day-job <span style={{ color: B_COLORS.blue }}>shipments</span>.
        </div>
        <div style={{ marginTop: 8, fontFamily: "'Pixelify Sans', monospace", fontWeight: 600, fontSize: 20, color: B_COLORS.brown, maxWidth: 740 }}>
          (more Roblox games I help build at <strong>ASAP Studio</strong> as a game developer — gameplay, systems &amp; scripting)
        </div>
        <HandSquiggle color={B_COLORS.blue} width={240} height={12} />

        <div style={{ marginTop: 44, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {ASAP_GAMES.map((g, i) => <ASAPCard key={g.id} g={g} i={i} t={t} />)}
        </div>
      </div>
    </section>);

}

function ASAPCard({ g, i, t }) {
  const [hover, setHover] = React.useState(false);
  const tilt = (i % 2 === 0 ? -1.5 : 1.5);
  const slotId = `asap-${g.id}`;
  const tapeColor = [B_COLORS.bubble, B_COLORS.sun, B_COLORS.mint][i % 3];
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative', background: '#fff',
        border: `3px solid ${B_COLORS.ink}`,
        boxShadow: hover ? `10px 12px 0 ${B_COLORS.ink}` : `6px 8px 0 ${B_COLORS.ink}`,
        transform: `rotate(${hover ? 0 : tilt}deg) translateY(${hover ? -6 : 0}px)`,
        transition: 'transform 200ms ease, box-shadow 200ms ease',
        padding: 12, paddingBottom: 22
      }}>

      <WashiTape color={tapeColor} pattern={i % 2 ? 'dots' : 'stripes'} width={120} rotate={i % 2 ? 6 : -6} top={-16} left={i % 2 ? '70%' : '30%'} zIndex={6} />

      {/* Hero image area: drop-zone over themed pixel-art fallback */}
      <div style={{ position: 'relative', height: 220, overflow: 'hidden', border: `2px solid ${B_COLORS.ink}`, background: g.accent }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <ASAPFallback kind={g.art} accent={g.accent} accent2={g.accent2} t={t} />
        </div>
        <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
          <image-slot
            id={slotId}
            shape="rect"
            placeholder={`drop a ${g.title} screenshot`}
            style={{ width: '100%', height: '100%', display: 'block' }}>
          </image-slot>
        </div>

        <div style={{ position: 'absolute', top: 10, left: 10, padding: '3px 8px', background: '#fff', border: `2px solid ${B_COLORS.ink}`, fontFamily: "'Pixelify Sans', monospace", fontWeight: 700, fontSize: 11, zIndex: 5 }}>
          ROBLOX
        </div>
        <div style={{ position: 'absolute', top: 10, right: 10, padding: '2px 10px', background: B_COLORS.ink, color: B_COLORS.sun, fontFamily: "'VT323', monospace", fontWeight: 400, fontSize: 20, zIndex: 5, letterSpacing: '0.1em', lineHeight: 1.1 }}>
          {g.year}
        </div>
      </div>

      <div style={{ marginTop: 14, padding: '0 4px' }}>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 16, color: B_COLORS.ink, lineHeight: 1.3 }}>
          {g.title}
        </div>
        <div style={{ marginTop: 6, fontFamily: "'Pixelify Sans', monospace", fontWeight: 600, fontSize: 15, color: B_COLORS.blue }}>
          {g.type} · {g.role} @ ASAP
        </div>
        <div style={{ marginTop: 10, fontFamily: "'Pixelify Sans', monospace", fontSize: 16, lineHeight: 1.35, color: B_COLORS.ink }}>
          {g.blurb}
        </div>

        <div style={{ display: 'flex', gap: 6, marginTop: 14, flexWrap: 'wrap' }}>
          {g.tags.map((tag, ti) =>
          <span key={tag} style={{
            fontFamily: "'Pixelify Sans', monospace", fontWeight: 600, fontSize: 12,
            padding: '2px 8px',
            background: [B_COLORS.sun, B_COLORS.mint, B_COLORS.bubble][ti % 3],
            border: `2px solid ${B_COLORS.ink}`,
            transform: `rotate(${ti % 2 ? -1.5 : 1.5}deg)`
          }}>#{tag}</span>
          )}
        </div>

        <a href={g.url} target="_blank" rel="noreferrer" style={{
          display: 'inline-block', marginTop: 18,
          fontFamily: "'Pixelify Sans', monospace", fontWeight: 700, fontSize: 16,
          background: B_COLORS.blue, color: '#fff', padding: '10px 16px',
          border: `3px solid ${B_COLORS.ink}`, textDecoration: 'none',
          boxShadow: `4px 4px 0 ${B_COLORS.ink}`
        }}>▶ play on roblox</a>
      </div>
    </div>);

}

// Themed pixel-art covers for the ASAP cards (until real screenshots are dropped).
function ASAPFallback({ kind, accent, accent2, t }) {
  if (kind === 'fishtank') {
    // Aquarium with bubbles + giant fish hatching from egg + smaller fish
    const eggBob = Math.sin(t / 4) * 2;
    const giantBob = Math.sin(t / 3) * 4;
    return (
      <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: `linear-gradient(180deg, ${accent2} 0%, ${accent} 100%)` }}>
        {/* tank lid */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 14, background: B_COLORS.brown }} />
        {/* gravel */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 24, background: '#a16207', borderTop: `3px solid ${B_COLORS.brown}` }} />
        {/* seaweed */}
        {[30, 110, 220, 320].map((x, k) =>
          <div key={k} style={{
            position: 'absolute', bottom: 22, left: x,
            width: 8, height: 38 + (k % 3) * 10,
            background: B_COLORS.forest,
            transform: `skewX(${Math.sin((t + k * 7) / 5) * 8}deg)`,
            transformOrigin: 'bottom'
          }} />
        )}

        {/* hatching egg in gravel — cracks animate */}
        <div style={{ position: 'absolute', bottom: 24, left: 165 }}>
          <svg width="46" height="56" viewBox="0 0 46 56" shapeRendering="crispEdges">
            {/* egg body */}
            <ellipse cx="23" cy="32" rx="18" ry="22" fill="#fff" stroke={B_COLORS.ink} strokeWidth="2" />
            {/* spots */}
            <circle cx="14" cy="24" r="3" fill={B_COLORS.bubble} />
            <circle cx="30" cy="28" r="4" fill={B_COLORS.sun} />
            <circle cx="18" cy="40" r="3" fill={B_COLORS.mint} />
            <circle cx="30" cy="44" r="2.5" fill={B_COLORS.peach} />
            {/* cracks (pulse opacity) */}
            <g stroke={B_COLORS.ink} strokeWidth="1.5" fill="none" opacity={0.4 + Math.abs(Math.sin(t / 3)) * 0.6}>
              <polyline points="14,14 18,18 16,22 20,26" />
              <polyline points="32,16 28,20 32,24" />
            </g>
            {/* sparkle on top */}
            <rect x="22" y="6" width="2" height="2" fill="#fff" style={{ opacity: 0.5 + Math.abs(Math.sin(t / 2)) * 0.5 }} />
          </svg>
        </div>

        {/* giant fish (the prize) */}
        <div style={{ position: 'absolute', top: 60 + giantBob, left: t * 1.4 % 480 - 90 }}>
          <PixelFish size={84} color={B_COLORS.sun} accent={B_COLORS.peach} />
        </div>
        {/* smaller fish */}
        <div style={{ position: 'absolute', top: 130 + Math.sin(t / 4) * 5, left: 360 - t * 1.6 % 480 }}>
          <PixelFish size={40} color={B_COLORS.bubble} accent={B_COLORS.red} />
        </div>
        <div style={{ position: 'absolute', top: 40 + Math.sin(t / 5) * 3, left: 220 - t * 1.2 % 440 }}>
          <PixelFish size={32} color={B_COLORS.mint} accent={B_COLORS.forest} />
        </div>

        {/* coin bursts above egg */}
        {[0, 1, 2].map((k) => {
          const phase = (t * 0.5 + k * 20) % 60;
          const o = phase < 20 ? phase / 20 : phase < 40 ? 1 : 1 - (phase - 40) / 20;
          return (
            <div key={k} style={{
              position: 'absolute', bottom: 70 + phase * 1.2,
              left: 180 + (k - 1) * 14 + Math.sin((t + k * 8) / 4) * 2,
              width: 10, height: 10,
              background: B_COLORS.sun, borderRadius: '50%',
              border: `2px solid ${B_COLORS.brown}`,
              opacity: o
            }} />
          );
        })}

        {/* bubbles */}
        {[50, 90, 150, 240, 300, 360].map((x, k) =>
          <div key={k} style={{
            position: 'absolute', left: x,
            bottom: ((t * 1.2 + k * 30) % 220),
            width: 6 + (k % 3) * 2, height: 6 + (k % 3) * 2,
            background: '#fff', opacity: 0.75, borderRadius: '50%',
            border: `1px solid ${B_COLORS.ink}33`
          }} />
        )}
      </div>);

  }
  if (kind === 'playtopia') {
    // Underwater hangout: avatar on hoverboard + octopus + fish + bubbles
    return (
      <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: `linear-gradient(180deg, ${accent2} 0%, ${accent} 60%, #164e63 100%)` }}>
        {/* light shafts */}
        <div style={{ position: 'absolute', top: 0, left: '20%', width: 40, height: '100%', background: 'linear-gradient(180deg, rgba(255,255,255,0.35), rgba(255,255,255,0))', transform: 'skewX(-10deg)' }} />
        <div style={{ position: 'absolute', top: 0, left: '55%', width: 26, height: '100%', background: 'linear-gradient(180deg, rgba(255,255,255,0.25), rgba(255,255,255,0))', transform: 'skewX(-12deg)' }} />
        {/* sea floor */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 28, background: '#7c2d12' }} />
        {/* corals */}
        {[30, 130, 230, 340].map((x, k) =>
          <div key={k} style={{ position: 'absolute', bottom: 22, left: x, width: 16, height: 22 + (k % 3) * 8, background: [B_COLORS.bubble, B_COLORS.peach, B_COLORS.sun, B_COLORS.red][k % 4], borderRadius: '50% 50% 4px 4px', border: `2px solid ${B_COLORS.ink}` }} />
        )}
        {/* octopus */}
        <div style={{ position: 'absolute', bottom: 50 + Math.sin(t / 3) * 4, right: 30 }}>
          <svg width="74" height="74" viewBox="0 0 74 74" shapeRendering="crispEdges">
            {/* head */}
            <ellipse cx="37" cy="28" rx="22" ry="18" fill="#a855f7" stroke={B_COLORS.ink} strokeWidth="2" />
            {/* eyes */}
            <circle cx="29" cy="26" r="4" fill="#fff" /><circle cx="29" cy="27" r="2" fill="#000" />
            <circle cx="45" cy="26" r="4" fill="#fff" /><circle cx="45" cy="27" r="2" fill="#000" />
            {/* tentacles */}
            {[0, 1, 2, 3, 4].map((k) => {
              const baseX = 18 + k * 9.5;
              const wob = Math.sin((t + k * 6) / 3) * 4;
              return <path key={k} d={`M ${baseX} 44 Q ${baseX + wob} 56 ${baseX + wob * 0.6} 68`} stroke="#a855f7" strokeWidth="5" fill="none" strokeLinecap="round" />;
            })}
          </svg>
        </div>
        {/* fish swimming */}
        <div style={{ position: 'absolute', top: 50 + Math.sin(t / 4) * 4, left: t * 1.8 % 480 - 50 }}>
          <PixelFish size={36} color={B_COLORS.sun} accent={B_COLORS.peach} />
        </div>
        <div style={{ position: 'absolute', top: 110 + Math.sin(t / 5) * 5, left: 360 - t * 1.4 % 480 }}>
          <PixelFish size={28} color={B_COLORS.bubble} accent={B_COLORS.red} />
        </div>
        {/* avatar on hoverboard */}
        <div style={{ position: 'absolute', top: 78 + Math.sin(t / 2) * 6, left: 86 + Math.cos(t / 4) * 10 }}>
          <svg width="64" height="56" viewBox="0 0 64 56" shapeRendering="crispEdges">
            {/* hoverboard */}
            <ellipse cx="32" cy="44" rx="26" ry="5" fill={B_COLORS.ink} />
            <ellipse cx="32" cy="42" rx="24" ry="4" fill={B_COLORS.sun} stroke={B_COLORS.ink} strokeWidth="1.5" />
            {/* hover glow */}
            <ellipse cx="32" cy="50" rx="22" ry="3" fill={B_COLORS.bubble} opacity="0.6" />
            {/* legs */}
            <rect x="26" y="32" width="4" height="8" fill="#1d4ed8" />
            <rect x="34" y="32" width="4" height="8" fill="#1d4ed8" />
            {/* body */}
            <rect x="24" y="20" width="16" height="14" fill={B_COLORS.red} stroke={B_COLORS.ink} strokeWidth="1.5" />
            {/* head */}
            <rect x="26" y="8" width="12" height="12" fill="#fcd34d" stroke={B_COLORS.ink} strokeWidth="1.5" />
            <rect x="28" y="12" width="2" height="2" fill="#000" />
            <rect x="34" y="12" width="2" height="2" fill="#000" />
            {/* arms out */}
            <rect x="18" y="22" width="6" height="3" fill={B_COLORS.red} />
            <rect x="40" y="22" width="6" height="3" fill={B_COLORS.red} />
          </svg>
        </div>
        {/* bubbles */}
        {[50, 100, 180, 260, 330, 400].map((x, k) =>
          <div key={k} style={{
            position: 'absolute', left: x,
            bottom: ((t * 1.4 + k * 28) % 220),
            width: 5 + (k % 3) * 2, height: 5 + (k % 3) * 2,
            background: '#fff', opacity: 0.7, borderRadius: '50%',
            border: `1px solid ${B_COLORS.ink}33`
          }} />
        )}
      </div>);

  }
  if (kind === 'doggoland') {
    // Sky fishing: floating island + doggo with rod + cloud-fish (doggo mermaids)
    const bob = Math.sin(t / 3) * 3;
    return (
      <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: `linear-gradient(180deg, #fde68a 0%, ${accent2} 35%, ${accent} 100%)` }}>
        {/* far clouds */}
        <div style={{ position: 'absolute', top: 18, left: t * 1.0 % 520 - 90, width: 90, height: 20, background: '#fff', borderRadius: 14, opacity: 0.85, border: `2px solid ${B_COLORS.ink}22` }} />
        <div style={{ position: 'absolute', top: 50, left: t * 0.6 % 540 - 120, width: 120, height: 24, background: '#fff', borderRadius: 16, opacity: 0.8, border: `2px solid ${B_COLORS.ink}22` }} />
        <div style={{ position: 'absolute', top: 90, right: -t * 0.8 % 500 + 200, width: 80, height: 18, background: '#fff', borderRadius: 12, opacity: 0.75, border: `2px solid ${B_COLORS.ink}22` }} />

        {/* sun */}
        <div style={{ position: 'absolute', top: 14, right: 18, width: 32, height: 32, background: '#fff', borderRadius: '50%', boxShadow: `0 0 0 6px #ffffff66` }} />

        {/* floating island */}
        <div style={{ position: 'absolute', bottom: 16 + bob, left: 24 }}>
          <svg width="180" height="110" viewBox="0 0 180 110" shapeRendering="crispEdges">
            {/* grass top */}
            <ellipse cx="90" cy="34" rx="78" ry="20" fill={B_COLORS.mint} stroke={B_COLORS.ink} strokeWidth="2" />
            <rect x="12" y="34" width="156" height="14" fill={B_COLORS.forest} />
            {/* rocky underside */}
            <path d="M 14 48 Q 30 90 60 80 Q 75 100 100 84 Q 130 100 150 78 Q 165 92 166 48 Z" fill="#7c2d12" stroke={B_COLORS.ink} strokeWidth="2" />
            {/* tufts */}
            <rect x="30" y="28" width="3" height="6" fill={B_COLORS.forest} />
            <rect x="48" y="26" width="3" height="8" fill={B_COLORS.forest} />
            <rect x="120" y="28" width="3" height="6" fill={B_COLORS.forest} />
            {/* sign */}
            <rect x="76" y="20" width="22" height="10" fill="#fff" stroke={B_COLORS.ink} strokeWidth="1.5" />
            <rect x="85" y="14" width="2" height="14" fill={B_COLORS.brown} />
          </svg>
        </div>

        {/* doggo fisher on island */}
        <div style={{ position: 'absolute', bottom: 50 + bob, left: 78 }}>
          <PixelDog color="#fcd34d" spotColor="#7c2d12" size={48} />
        </div>
        {/* fishing rod */}
        <svg width="180" height="180" viewBox="0 0 180 180" style={{ position: 'absolute', bottom: 70 + bob, left: 110, pointerEvents: 'none' }}>
          <line x1="0" y1="20" x2="80" y2="-30" stroke={B_COLORS.brown} strokeWidth="3" />
          <line x1="80" y1="-30" x2="100" y2={50 + Math.sin(t / 2) * 4} stroke={B_COLORS.ink} strokeWidth="1" />
          {/* bobber */}
          <circle cx="100" cy={50 + Math.sin(t / 2) * 4} r="4" fill={B_COLORS.red} stroke={B_COLORS.ink} strokeWidth="1" />
        </svg>

        {/* doggo mermaid fish #1 — pink, with doggo ears */}
        <div style={{ position: 'absolute', top: 70 + Math.sin(t / 3) * 6, right: 80 }}>
          <DoggoMermaid color={B_COLORS.bubble} accent={B_COLORS.red} size={56} />
        </div>
        {/* doggo mermaid fish #2 — small, mint */}
        <div style={{ position: 'absolute', top: 130 + Math.sin((t + 8) / 4) * 5, right: 30 }}>
          <DoggoMermaid color={B_COLORS.mint} accent={B_COLORS.forest} size={40} />
        </div>

        {/* sparkles */}
        {[120, 200, 300, 380, 250].map((x, k) =>
          <div key={k} style={{
            position: 'absolute', top: 30 + ((t * 0.6 + k * 22) % 160), left: x,
            width: 4, height: 4, background: '#fff',
            transform: `rotate(45deg) scale(${0.5 + Math.abs(Math.sin((t + k * 5) / 4))})`,
            opacity: 0.85
          }} />
        )}
      </div>);

  }
  return null;
}

// Doggo mermaid: dog head + fish tail (Doggo Land's signature catch).
function DoggoMermaid({ color = '#f9a8d4', accent = '#ef4444', size = 56 }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 16 11" shapeRendering="crispEdges">
      {/* tail */}
      <polygon points="13,3 16,1 16,9 13,7" fill={accent} stroke={B_COLORS.ink} strokeWidth="0.4" />
      {/* body */}
      <rect x="6" y="3" width="7" height="5" fill={color} stroke={B_COLORS.ink} strokeWidth="0.4" />
      {/* scales hint */}
      <rect x="9" y="4" width="1" height="1" fill={accent} opacity="0.5" />
      <rect x="11" y="5" width="1" height="1" fill={accent} opacity="0.5" />
      {/* head (dog) */}
      <rect x="2" y="3" width="5" height="5" fill={color} stroke={B_COLORS.ink} strokeWidth="0.4" />
      {/* ears */}
      <rect x="2" y="1" width="2" height="2" fill={accent} stroke={B_COLORS.ink} strokeWidth="0.3" />
      <rect x="5" y="1" width="2" height="2" fill={accent} stroke={B_COLORS.ink} strokeWidth="0.3" />
      {/* eye */}
      <rect x="4" y="5" width="1" height="1" fill="#000" />
      {/* nose */}
      <rect x="1" y="5" width="1" height="1" fill="#000" />
      {/* fin */}
      <polygon points="8,2 10,0 10,3" fill={accent} stroke={B_COLORS.ink} strokeWidth="0.3" />
    </svg>
  );
}

// Compact pixel-art dog: blocky body, head, tail.
function PixelDog({ color = '#fff', spotColor = '#7c2d12', size = 56 }) {
  const grid = [
    '..........',
    '.##......#',
    '.####...##',
    '.######.##',
    '.########.',
    '.########.',
    '.##....##.',
    '.##....##.',
  ];
  return (
    <svg width={size} height={size * 0.8} viewBox="0 0 10 8" shapeRendering="crispEdges">
      {grid.map((row, y) =>
        [...row].map((c, x) => {
          if (c !== '#') return null;
          // ear and back patch use spot color
          const isSpot = (x === 1 && y === 1) || (x === 2 && y === 2) || (x === 7 && y === 4) || (x === 8 && y === 4);
          return <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={isSpot ? spotColor : color} />;
        })
      )}
      {/* eye */}
      <rect x="2" y="3" width="1" height="1" fill="#000" />
      {/* nose */}
      <rect x="1" y="4" width="1" height="1" fill="#000" />
    </svg>);

}

// ─────── MORE TOYS (tile grid for the rest of the itch.io shelf) ───────
function MoreToys() {
  const t = useTick(10);
  return (
    <section style={{ position: 'relative', padding: '80px 80px 100px', background: B_COLORS.paper, borderTop: `4px dashed ${B_COLORS.ink}` }}>
      <PaperTexture />
      <div style={{ position: 'relative', zIndex: 5 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginBottom: 8 }}>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 40, color: B_COLORS.ink }}>
            <span style={{ color: B_COLORS.grape }}>more</span> toys
          </div>
          <div style={{ fontFamily: "'Pixelify Sans', monospace", fontWeight: 600, fontSize: 20, color: B_COLORS.brown }}>
            (the rest of the workshop shelf · click any tile to play on itch.io)
          </div>
        </div>
        <HandSquiggle color={B_COLORS.grape} width={220} height={12} />

        <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 22 }}>
          {MORE_GAMES.map((g, i) => <ToyTile key={g.id} g={g} i={i} t={t} />)}
        </div>
      </div>
    </section>);

}

function ToyTile({ g, i, t }) {
  const [hover, setHover] = React.useState(false);
  const tilt = (i % 2 === 0 ? -1 : 1) * (1.5 + i % 3 * 0.4);
  const bob = Math.sin((t + i * 8) / 6) * 2;

  return (
    <a
      href={g.url}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative', textDecoration: 'none',
        background: '#fff', border: `3px solid ${B_COLORS.ink}`,
        boxShadow: hover ? `8px 10px 0 ${B_COLORS.ink}` : `5px 6px 0 ${B_COLORS.ink}`,
        transform: `rotate(${hover ? 0 : tilt}deg) translateY(${hover ? -4 : bob}px)`,
        transition: 'transform 200ms ease, box-shadow 200ms ease',
        padding: 10, paddingBottom: 18,
        display: 'block'
      }}>
      <WashiTape color={g.accent} pattern={i % 2 ? 'dots' : 'stripes'} width={70} rotate={i % 2 ? 6 : -6} top={-12} left="50%" zIndex={6} />

      {/* Real itch.io cover when we have one; pixel-art fallback otherwise. */}
      <div style={{ position: 'relative', height: 130, background: g.accent, border: `2px solid ${B_COLORS.ink}`, overflow: 'hidden' }}>
        {g.cover ?
        <ArtImg
          src={g.cover}
          alt={g.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          fallback={<ToyTileArt id={g.id} accent={g.accent} t={t} />} /> :
        <ToyTileArt id={g.id} accent={g.accent} t={t} />
        }
        <div style={{
          position: 'absolute', bottom: 6, left: 6, padding: '2px 6px',
          background: B_COLORS.ink, color: '#fff',
          fontFamily: "'Pixelify Sans', monospace", fontWeight: 700, fontSize: 11
        }}>
          {g.year}
        </div>
        <div style={{
          position: 'absolute', top: 6, right: 6,
          width: 24, height: 24, lineHeight: '22px', textAlign: 'center',
          background: '#fff', border: `2px solid ${B_COLORS.ink}`,
          fontSize: 14
        }}>{g.emoji}</div>
      </div>

      <div style={{ marginTop: 12, fontFamily: "'Press Start 2P', monospace", fontSize: 13, color: B_COLORS.ink, lineHeight: 1.3 }}>
        {g.title}
      </div>
      <div style={{ marginTop: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: "'Pixelify Sans', monospace", fontWeight: 600, fontSize: 13, color: B_COLORS.brown }}>
        <span>{g.type}</span>
        <span style={{ color: g.accent === '#fcd34d' || g.accent === '#7dd3fc' || g.accent === '#a7f3d0' ? B_COLORS.ink : g.accent }}>· {g.role}</span>
      </div>
      {hover &&
      <div style={{
        position: 'absolute', bottom: -10, right: -10,
        padding: '4px 8px', background: B_COLORS.ink, color: B_COLORS.sun,
        fontFamily: "'Press Start 2P', monospace", fontSize: 10,
        border: `2px solid ${B_COLORS.sun}`, transform: 'rotate(-3deg)'
      }}>PLAY ↗</div>
      }
    </a>);

}

// Tiny themed pixel-art per game.  Each is a 16-cell block sprite over the
// accent background — fast, distinct, no external assets.
function ToyTileArt({ id, accent, t }) {
  const fish = (color = '#fff') =>
  <g fill={color}>
      <rect x="6" y="3" width="6" height="2" /><rect x="5" y="4" width="8" height="3" />
      <rect x="3" y="5" width="2" height="2" /><rect x="13" y="4" width="2" height="3" />
      <rect x="14" y="3" width="1" height="1" /><rect x="14" y="7" width="1" height="1" />
    </g>;

  const cat = (color = '#fff') =>
  <g fill={color}>
      <rect x="4" y="3" width="1" height="2" /><rect x="7" y="3" width="1" height="2" />
      <rect x="4" y="4" width="5" height="3" /><rect x="3" y="5" width="1" height="2" />
      <rect x="9" y="5" width="1" height="2" />
      <rect x="2" y="7" width="9" height="3" /><rect x="11" y="7" width="2" height="2" />
    </g>;

  const piano = () =>
  <g>
      <rect x="2" y="6" width="12" height="4" fill="#fff" />
      <rect x="3" y="6" width="1" height="3" fill="#000" /><rect x="6" y="6" width="1" height="3" fill="#000" /><rect x="9" y="6" width="1" height="3" fill="#000" /><rect x="12" y="6" width="1" height="3" fill="#000" />
      <rect x="5" y="3" width="2" height="2" fill="#fff" />
    </g>;

  const cells = () =>
  <g fill="#fff">
      <rect x="2" y="2" width="2" height="2" /><rect x="6" y="2" width="2" height="2" /><rect x="10" y="2" width="2" height="2" />
      <rect x="4" y="6" width="2" height="2" /><rect x="8" y="6" width="2" height="2" /><rect x="12" y="6" width="2" height="2" />
      <rect x="2" y="10" width="2" height="2" /><rect x="6" y="10" width="2" height="2" /><rect x="10" y="10" width="2" height="2" />
    </g>;

  const tower = () =>
  <g fill="#fff">
      <rect x="6" y="2" width="4" height="2" /><rect x="5" y="4" width="6" height="2" />
      <rect x="6" y="6" width="4" height="6" /><rect x="4" y="12" width="8" height="1" />
    </g>;

  const muscle = () =>
  <g fill="#fff">
      <rect x="3" y="6" width="2" height="3" /><rect x="11" y="6" width="2" height="3" />
      <rect x="5" y="5" width="2" height="5" /><rect x="9" y="5" width="2" height="5" />
      <rect x="7" y="6" width="2" height="3" />
    </g>;

  const sword = () =>
  <g fill="#fff">
      <rect x="3" y="11" width="4" height="2" /><rect x="9" y="11" width="4" height="2" />
      <rect x="4" y="3" width="1" height="9" /><rect x="11" y="3" width="1" height="9" />
      <rect x="3" y="9" width="3" height="1" /><rect x="10" y="9" width="3" height="1" />
    </g>;

  const bubbles = () =>
  <g fill="#fff" opacity="0.85">
      <circle cx="4" cy="6" r="2" /><circle cx="9" cy="9" r="3" /><circle cx="13" cy="4" r="1.5" />
      <circle cx="6" cy="12" r="1" />
    </g>;

  const rain = () =>
  <g stroke="#fff" strokeWidth="1.2" opacity="0.9">
      <line x1="3" y1="2" x2="2" y2="6" /><line x1="6" y1="2" x2="5" y2="6" />
      <line x1="9" y1="2" x2="8" y2="6" /><line x1="12" y1="2" x2="11" y2="6" />
      <line x1="4" y1="8" x2="3" y2="12" /><line x1="10" y1="8" x2="9" y2="12" />
    </g>;

  const map = {
    catdungeon: cat('#fff'), catbub: bubbles(), catup: rain(),
    gameoflife: cells(), magicpiano: piano(), tdar: tower(),
    muscle: muscle(), '2pshowdown': sword()
  };

  const wobble = Math.sin(t / 4) * 1;

  return (
    <svg viewBox="0 0 16 14" preserveAspectRatio="xMidYMid meet" width="100%" height="100%" style={{ imageRendering: 'pixelated', transform: `translateY(${wobble}px)` }}>
      {/* faint stippled ground */}
      <rect x="0" y="13" width="16" height="1" fill="rgba(0,0,0,0.15)" />
      {map[id] || fish('#fff')}
    </svg>);

}

// ─────── ROOT ───────
function DirectionB() {
  return (
    <div style={{
      width: '100%',
      background: B_COLORS.paper,
      color: B_COLORS.ink,
      fontFamily: "'Pixelify Sans', monospace"
    }}>
      <HeroB />
      <StatsBanner />
      <AboutB />
      <GamesB />
      <ASAPStudioSection />
      <ArtworkSection />
      <MoreToys />
      <SkillsB />
      <ContactB />
    </div>);

}

window.DirectionB = DirectionB;