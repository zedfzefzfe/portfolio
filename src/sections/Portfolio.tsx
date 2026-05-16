/**
 * RealisationsSection — editorial portfolio section
 *
 * Design tokens:
 *   --bg: #0E0E0E         near-black
 *   --text: #EFEAE0       warm off-white
 *   --accent: #D55A2C     rust orange
 *   --muted: rgba(239,234,224,0.65)
 *
 * Fonts: Anton (display), Inter (body) — loaded via Google Fonts <link> in <head>.
 * If running in Next.js, prefer next/font/google instead of the runtime <link>.
 *
 * TODO: replace picsum.photos placeholders with real project screenshots
 * under /projects/{slug}.jpg.
 */

import { useEffect, useRef } from 'react';

type CardSize = 'hero' | 'tall' | 'standard' | 'wide' | 'wide-sm';

type Project = {
  title: string;
  category: string;
  image: string;
  url: string;
  size?: CardSize;
};

// Bento rhythm repeats every 7 items so the layout cycles gracefully
// for any number of projects:
//   row A: hero (8c×2r) + tall (4c×2r)
//   row B: 3 standards (4c each)
//   row C: wide (7c) + wide-sm (5c)
const SIZE_CYCLE: CardSize[] = [
  'hero',
  'tall',
  'standard',
  'standard',
  'standard',
  'wide',
  'wide-sm',
];

const sizeAt = (i: number, explicit?: CardSize): CardSize =>
  explicit ?? SIZE_CYCLE[i % SIZE_CYCLE.length];

const projects: Project[] = [
  { title: 'ZETHNIKA',        category: 'E-COMMERCE · COSMÉTIQUE · 2025',  image: '/1.png', url: 'https://www.zethnika.com/', size: 'hero' },
  { title: 'ALAA PARFUM', category: 'SHOPIFY · E-COMMERCE · 2025',     image: '/2.png', url: 'https://finale-delta-ten.vercel.app/', size: 'tall' },
  { title: 'Royal Beverage',  category: 'SITE VITRINE · LUXE · 2025',      image: '/3.png', url: 'https://royalbev.com/', size: 'standard' },
  { title: 'Tilesuite',   category: 'BRANDING · RESTAURANT · 2025',    image: '/4.png', url: 'https://www.tilesuite.lu/en', size: 'standard' },
  { title: 'OUADDI LIVING',      category: 'PORTFOLIO · CRÉATIF · 2025',      image: '/5.png', url: 'https://ouaddiliving.com/', size: 'standard' },
  { title: 'BTOUCH INDUSTRY',             category: 'IDENTITÉ · CULTURE · 2025',       image: '/6.png', url: 'https://www.btouchindustry.ma/', size: 'wide' },
];

export function Portfolio() {
  const gridRef = useRef<HTMLDivElement>(null);

  const scrollToGrid = () => {
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const id = 'realisations-fonts';
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500&display=swap';
    document.head.appendChild(link);
  }, []);

  return (
    <section id="realisations" className="realisations-root no-reveal">
      {/* Scoped tokens, fonts, noise filter, motion rules */}
      <style>{`
        .realisations-root {
          --bg: #0E0E0E;
          --text: #EFEAE0;
          --accent: #D55A2C;
          --muted: rgba(239, 234, 224, 0.65);
          background: var(--bg);
          color: var(--text);
          font-family: 'Inter', system-ui, sans-serif;
        }

        .realisations-root .display { font-family: 'Anton', 'Oswald', Impact, sans-serif; font-weight: 400; }

        /* ── Hero ─────────────────────────────────────────── */
        .r-hero {
          position: relative;
          min-height: 90vh;
          padding: 80px 24px 64px;
          isolation: isolate;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .r-hero { padding: 96px 48px 72px; }
        }

        .r-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='320'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          opacity: 0.06;
          mix-blend-mode: overlay;
          pointer-events: none;
          z-index: 0;
        }

        .r-eyebrow {
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text);
          display: inline-block;
        }

        .r-headline {
          font-family: 'Anton', 'Oswald', Impact, sans-serif;
          font-weight: 400;
          font-size: clamp(64px, 13vw, 180px);
          line-height: 0.9;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          color: var(--text);
          margin: 28px 0 32px;
        }

        .r-subtitle {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: 13px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);
          max-width: 360px;
          line-height: 1.7;
        }

        /* ── Spinning circle button ───────────────────────── */
        .r-circle-wrap {
          position: absolute;
          right: 32px;
          top: 50%;
          transform: translateY(-50%);
          width: 220px;
          height: 220px;
          cursor: pointer;
          z-index: 2;
          background: transparent;
          border: 0;
          padding: 0;
        }
        @media (min-width: 1024px) {
          .r-circle-wrap { right: 80px; }
        }
        @media (max-width: 767px) {
          .r-circle-wrap {
            position: static;
            transform: none;
            margin-top: 48px;
            width: 160px;
            height: 160px;
          }
        }

        .r-circle {
          width: 100%;
          height: 100%;
          animation: r-spin 18s linear infinite;
          transition: animation-duration 600ms ease;
          will-change: transform;
        }

        .r-circle-wrap:hover .r-circle {
          animation-duration: 6s;
        }

        @keyframes r-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .r-circle-wrap:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 4px;
          border-radius: 50%;
        }

        /* ── Bottom-right scroll dot ──────────────────────── */
        .r-scroll-indicator {
          position: absolute;
          right: 32px;
          bottom: 32px;
          z-index: 2;
          pointer-events: none;
        }

        /* ── Bento Grid ───────────────────────────────────── */
        .r-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 6px;
          width: 100%;
          max-width: 100%;
          padding: 24px 16px 56px;
          box-sizing: border-box;
          margin: 0 auto;
        }
        @media (min-width: 768px) {
          .r-grid {
            grid-template-columns: repeat(6, 1fr);
            gap: 8px;
            padding: 32px 32px 72px;
          }
        }
        @media (min-width: 1024px) {
          .r-grid {
            grid-template-columns: repeat(12, 1fr);
            grid-auto-rows: minmax(260px, auto);
            gap: 10px;
            max-width: 90vw;
            padding: 40px 0 96px;
          }
        }

        .r-card {
          position: relative;
          display: block;
          overflow: hidden;
          background: #1a1a1a;
          color: inherit;
          text-decoration: none;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 0;
          margin: 0;
          isolation: isolate;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
          transition: border-color 500ms cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow   500ms cubic-bezier(0.22, 1, 0.36, 1);
          min-height: 320px;
        }

        /* Mobile — alternate min-heights for rhythm */
        .r-card.is-hero      { min-height: 380px; }
        .r-card.is-tall      { min-height: 460px; }
        .r-card.is-standard  { min-height: 460px; }
        .r-card.is-wide      { min-height: 300px; }
        .r-card.is-wide-sm   { min-height: 360px; }

        /* Tablet — 6-col grid, hero takes full width */
        @media (min-width: 768px) and (max-width: 1023px) {
          .r-card.is-hero     { grid-column: span 6; min-height: 460px; }
          .r-card.is-tall     { grid-column: span 3; min-height: 420px; }
          .r-card.is-standard { grid-column: span 3; min-height: 420px; }
          .r-card.is-wide     { grid-column: span 4; min-height: 320px; }
          .r-card.is-wide-sm  { grid-column: span 2; min-height: 320px; }
        }

        /* Desktop — full 12-col bento */
        @media (min-width: 1024px) {
          .r-card { min-height: 0; }
          .r-card.is-hero     { grid-column: span 8; grid-row: span 2; min-height: 620px; }
          .r-card.is-tall     { grid-column: span 4; grid-row: span 2; min-height: 620px; }
          .r-card.is-standard { grid-column: span 4; grid-row: span 1; min-height: 620px; }
          .r-card.is-wide     { grid-column: span 7; grid-row: span 1; min-height: 420px; }
          .r-card.is-wide-sm  { grid-column: span 5; grid-row: span 1; min-height: 420px; }
        }

        .r-card:hover {
          border-color: rgba(255, 255, 255, 0.22);
          box-shadow: 0 24px 56px rgba(0, 0, 0, 0.55);
        }

        .r-card:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 4px;
        }

        .r-card-img-wrap {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .r-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          transform: scale(1);
          transition: transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform;
        }

        .r-card:hover .r-card-img {
          transform: scale(1.06);
        }

        /* Faint index number — top-left */
        .r-card-index {
          position: absolute;
          top: 18px;
          left: 22px;
          z-index: 2;
          font-family: 'Anton', 'Oswald', Impact, sans-serif;
          font-weight: 400;
          font-size: 64px;
          line-height: 1;
          letter-spacing: -0.02em;
          color: rgba(255, 255, 255, 0.14);
          pointer-events: none;
          user-select: none;
        }
        @media (min-width: 1024px) {
          .r-card-index { font-size: 88px; top: 22px; left: 28px; }
          .r-card.is-hero .r-card-index { font-size: 120px; }
        }

        .r-card-meta {
          position: absolute;
          bottom: 26px;
          left: 28px;
          right: 28px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
          z-index: 2;
        }

        .r-card-title {
          font-family: 'Anton', 'Oswald', Impact, sans-serif;
          font-weight: 900;
          text-transform: uppercase;
          font-size: 22px;
          letter-spacing: -0.01em;
          color: var(--text);
          line-height: 1;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.6);
          transform: translateY(0);
          transition: transform 400ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        @media (min-width: 768px) {
          .r-card-title { font-size: 28px; }
        }
        @media (min-width: 1024px) {
          .r-card.is-hero .r-card-title { font-size: 44px; }
          .r-card.is-tall .r-card-title { font-size: 32px; }
          .r-card.is-wide .r-card-title { font-size: 36px; }
        }

        .r-card:hover .r-card-title {
          transform: translateY(-6px);
        }

        .r-card-category {
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #999;
          line-height: 1.2;
          transform: translateY(0);
          transition: transform 400ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .r-card:hover .r-card-category {
          transform: translateY(-6px);
        }

        .r-card-cta {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #e85d26;
          line-height: 1;
          margin-top: 4px;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 350ms cubic-bezier(0.22, 1, 0.36, 1) 60ms,
                      transform 350ms cubic-bezier(0.22, 1, 0.36, 1) 60ms;
        }

        .r-card:hover .r-card-cta {
          opacity: 1;
          transform: translateY(0);
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .r-circle { animation: none !important; }
          .r-card:hover .r-card-img { transform: none; }
          .r-card:hover .r-card-title,
          .r-card:hover .r-card-category { transform: none; }
        }
      `}</style>

      {/* ── HERO ───────────────────────────────────────────── */}
      <div className="r-hero">
        <span className="r-eyebrow">NOS RÉALISATIONS</span>

        <h2 className="r-headline">
          NOS RÉALISATIONS<br />WEB &amp; SEO.
        </h2>

        <p className="r-subtitle">
          Découvrez une sélection de nos projets. Cliquez sur une réalisation pour en savoir plus.
        </p>

        {/* Circle CTA */}
        <button
          type="button"
          className="r-circle-wrap"
          onClick={scrollToGrid}
          aria-label="Voir la liste des projets"
        >
          <svg className="r-circle" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
              <path id="r-circle-path" d="M 110, 110 m -88, 0 a 88,88 0 1,1 176,0 a 88,88 0 1,1 -176,0" />
            </defs>
            {/* Slightly imperfect stroke — two arcs offset for a hand-drawn feel */}
            <circle cx="110" cy="110" r="88" fill="none" stroke="#D55A2C" strokeWidth="1.5" />
            <text fill="#D55A2C" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              <textPath href="#r-circle-path" startOffset="0">
                PLUS DE PROJETS · PLUS DE PROJETS · PLUS DE PROJETS ·
              </textPath>
            </text>
            {/* Center arrow accent */}
            <g transform="translate(110 110)" fill="none" stroke="#D55A2C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="-10" y1="10" x2="10" y2="-10" />
              <polyline points="2,-10 10,-10 10,-2" />
            </g>
          </svg>
        </button>

        {/* Decorative scroll indicator */}
        <svg className="r-scroll-indicator" width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
          <circle cx="18" cy="18" r="11.25" fill="none" stroke="#D55A2C" strokeWidth="1.5" />
          <circle cx="24" cy="24" r="3" fill="#D55A2C" />
        </svg>
      </div>

      {/* ── BENTO GRID ─────────────────────────────────────── */}
      <div ref={gridRef} className="r-grid">
        {projects.map((p, i) => {
          const size = sizeAt(i, p.size);
          return (
            <a
              key={`${p.title}-${i}`}
              href={p.url}
              className={`r-card is-${size}`}
              aria-label={`Voir le projet ${p.title}`}
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(
                  new CustomEvent('devmaroc:navigate', { detail: { url: p.url } })
                );
              }}
            >
              <div className="r-card-img-wrap">
                <img
                  src={p.image}
                  alt={`Aperçu du projet ${p.title}`}
                  className="r-card-img"
                  loading="lazy"
                />
              </div>
              <div className="r-card-meta">
                <span className="r-card-title display">{p.title}</span>
                <span className="r-card-cta">VOIR LE PROJET →</span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
