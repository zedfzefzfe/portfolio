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

const projects = [
  { name: 'PURETOI',        img: '/projects/puretoi.jpg',     url: '#' },
  { name: 'MOMENTUM WATCH', img: '/projects/momentum.jpg',    url: '#' },
  { name: 'AWRESTAURANTS',  img: '/projects/aw.jpg',          url: '#' },
  { name: 'HUNGRY TIGER',   img: '/projects/hungrytiger.jpg', url: '#' },
  { name: 'STUDIO BO',      img: '/projects/studiobo.jpg',    url: '#' },
  { name: 'LA',             img: '/projects/la.jpg',          url: '#' },
];

// TODO: replace with real project screenshots
const placeholderFor = (name: string) =>
  `https://picsum.photos/seed/${encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-'))}/800/1000`;

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

        /* ── Grid ─────────────────────────────────────────── */
        .r-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
          width: 100%;
        }
        @media (min-width: 640px) { .r-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .r-grid { grid-template-columns: repeat(3, 1fr); } }

        .r-card {
          position: relative;
          display: block;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          background: #1a1a1a;
          color: inherit;
          text-decoration: none;
          border: 0;
          border-radius: 0;
          margin: 0;
          isolation: isolate;
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
          filter: saturate(0.92);
          transform: scale(1);
          transition: transform 700ms cubic-bezier(0.22, 1, 0.36, 1),
                      filter   500ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform;
        }

        .r-card:hover .r-card-img {
          transform: scale(1.04);
          filter: saturate(1);
        }

        .r-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 45%);
          transition: background 500ms cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
        }

        .r-card:hover .r-card-overlay {
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%);
        }

        .r-card-meta {
          position: absolute;
          bottom: 24px;
          left: 24px;
          right: 24px;
          display: flex;
          align-items: baseline;
          gap: 12px;
        }

        .r-card-name {
          font-family: 'Anton', 'Oswald', Impact, sans-serif;
          font-weight: 400;
          text-transform: uppercase;
          font-size: 22px;
          letter-spacing: -0.01em;
          color: var(--text);
          line-height: 1;
          position: relative;
          display: inline-block;
        }
        @media (min-width: 768px) {
          .r-card-name { font-size: 28px; }
        }

        .r-card-name::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -6px;
          height: 1px;
          background: var(--accent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 500ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .r-card:hover .r-card-name::after {
          transform: scaleX(1);
        }

        .r-card-arrow {
          font-family: 'Inter', sans-serif;
          font-size: 22px;
          line-height: 1;
          color: var(--accent);
          opacity: 0;
          transform: translateX(-8px);
          transition: opacity 400ms cubic-bezier(0.22, 1, 0.36, 1),
                      transform 400ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .r-card:hover .r-card-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .r-circle { animation: none !important; }
          .r-card:hover .r-card-img { transform: none; }
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

      {/* ── GRID ───────────────────────────────────────────── */}
      <div ref={gridRef} className="r-grid">
        {projects.map((p) => (
          <a
            key={p.name}
            href={p.url}
            className="r-card"
            aria-label={`Voir le projet ${p.name}`}
          >
            <div className="r-card-img-wrap">
              <img
                src={placeholderFor(p.name) /* TODO: replace with real project screenshots → p.img */}
                alt={`Aperçu du projet ${p.name}`}
                className="r-card-img"
                loading="lazy"
              />
            </div>
            <div className="r-card-overlay" />
            <div className="r-card-meta">
              <span className="r-card-name display">{p.name}</span>
              <span className="r-card-arrow" aria-hidden="true">→</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
