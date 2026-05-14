/**
 * ServicesSection — editorial accordion of services as a "hand of cards"
 *
 * Shares design tokens with RealisationsSection.tsx — keep in sync:
 *   --bg: #0E0E0E
 *   --text: #EFEAE0
 *   --accent: #D55A2C
 *   --ink: #1A1A1A
 *   --muted-light: rgba(239, 234, 224, 0.25)
 *   --muted-dark: rgba(26, 26, 26, 0.65)
 *
 * Fonts: Anton (display) + Inter (body), loaded by RealisationsSection's <link>.
 * If this section renders without RealisationsSection on the page, also import
 * the Google Fonts stylesheet here.
 */

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';

const services = [
  {
    num: '01',
    title: 'CRÉATION DE\nSITES WEB',
    desc: 'Nous transformons vos processus métier et vos idées innovantes en applications web sur-mesure. Des outils performants, sécurisés et évolutifs pour accélérer votre croissance.',
    rotation: -3.5,
  },
  {
    num: '02',
    title: 'PUBLICITÉ\nDIGITALE (ADS)',
    desc: 'Atteignez précisément vos clients cibles sur Google et les réseaux sociaux. Nous gérons vos campagnes publicitaires de A à Z pour maximiser votre visibilité et votre ROI.',
    rotation: -1.2,
  },
  {
    num: '03',
    title: 'RÉFÉRENCEMENT\nNATUREL (SEO)',
    desc: 'Améliorez votre position sur Google et générez du trafic qualifié durablement. Nous optimisons la structure technique et le contenu de votre site pour vous positionner dans les premiers résultats.',
    rotation: 0.8,
  },
  {
    num: '04',
    title: 'SÉCURITÉ &\nMAINTENANCE',
    desc: 'Votre site web est un actif précieux. Nous assurons sa protection continue contre les menaces, effectuons les mises à jour critiques et garantissons sa disponibilité permanente.',
    rotation: 2.4,
  },
  {
    num: '05',
    title: "DÉVELOPPEMENT\nD'APPLICATIONS",
    desc: 'Nous créons des applications web et mobiles sur-mesure. Des solutions performantes, sécurisées et évolutives pour accélérer votre transformation digitale.',
    rotation: 4.3,
  },
];

const ARROW = (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Ensure Google Fonts loaded even if rendered standalone
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

  const handleKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = services.length - 1;
    let next = activeIndex;
    if (e.key === 'ArrowRight') next = Math.min(last, activeIndex + 1);
    else if (e.key === 'ArrowLeft') next = Math.max(0, activeIndex - 1);
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    else return;
    e.preventDefault();
    setActiveIndex(next);
    cardRefs.current[next]?.focus();
  };

  return (
    <section id="services" className="services-root no-reveal">
      <style>{`
        .services-root {
          --bg: #0E0E0E;
          --text: #EFEAE0;
          --accent: #D55A2C;
          --ink: #1A1A1A;
          --muted-light: rgba(239, 234, 224, 0.25);
          --muted-dark: rgba(26, 26, 26, 0.65);
          background: var(--bg);
          color: var(--text);
          font-family: 'Inter', system-ui, sans-serif;
        }

        /* ── Header ─────────────────────────────────────────── */
        .s-header {
          position: relative;
          padding: 60px 24px 40px;
          isolation: isolate;
          overflow: hidden;
        }
        @media (min-width: 1024px) {
          .s-header { padding: 80px 48px 60px; }
        }

        .s-header::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='320'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.5 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
          opacity: 0.06;
          mix-blend-mode: overlay;
          pointer-events: none;
          z-index: 0;
        }

        .s-eyebrow {
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text);
          display: inline-block;
          position: relative;
          z-index: 1;
        }

        .s-headline {
          font-family: 'Anton', 'Oswald', Impact, sans-serif;
          font-weight: 400;
          font-size: clamp(48px, 9vw, 140px);
          line-height: 0.9;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          color: var(--text);
          margin: 24px 0 0;
          position: relative;
          z-index: 1;
        }

        /* ── Desktop stack ──────────────────────────────────── */
        .s-stack {
          display: none;
        }
        @media (min-width: 1024px) {
          .s-stack {
            display: flex;
            justify-content: center;
            align-items: flex-end;
            padding: 60px 40px 120px;
            perspective: 1200px;
          }
        }

        .s-card {
          width: 340px;
          height: 520px;
          border-radius: 28px;
          padding: 36px;
          position: relative;
          flex-shrink: 0;
          transform-origin: bottom center;
          transition:
            transform 600ms cubic-bezier(0.22, 1, 0.36, 1),
            background-color 500ms cubic-bezier(0.22, 1, 0.36, 1),
            color 500ms cubic-bezier(0.22, 1, 0.36, 1),
            width 600ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 500ms cubic-bezier(0.22, 1, 0.36, 1);
          cursor: pointer;
          background: var(--bg);
          color: var(--text);
          border: 1px solid rgba(239, 234, 224, 0.08);
          display: flex;
          flex-direction: column;
          text-align: left;
          font-family: inherit;
          appearance: none;
        }

        .s-card + .s-card { margin-left: -85px; }

        .s-card:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 4px;
        }

        .s-card:hover:not([data-active="true"]) {
          transform: translateY(-6px) rotate(var(--rot));
        }

        .s-card[data-active="true"] {
          background: var(--text);
          color: var(--ink);
          border-color: rgba(0, 0, 0, 0.06);
          width: 420px;
          z-index: 50;
          transform: rotate(0deg) translateY(-12px) scale(1.04);
          cursor: default;
        }

        @media (min-width: 1024px) and (max-width: 1279px) {
          .s-card { width: 280px; }
          .s-card + .s-card { margin-left: -70px; }
          .s-card[data-active="true"] { width: 360px; }
        }

        .s-num {
          position: absolute;
          top: 28px;
          right: 32px;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 14px;
          letter-spacing: 0.1em;
          color: var(--muted-light);
          transition: color 500ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .s-card[data-active="true"] .s-num { color: rgba(26, 26, 26, 0.3); }

        .s-title {
          font-family: 'Anton', 'Oswald', Impact, sans-serif;
          font-weight: 400;
          font-size: 36px;
          line-height: 0.95;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          color: var(--text);
          margin: 0;
          white-space: pre-line;
          transition: color 500ms cubic-bezier(0.22, 1, 0.36, 1), font-size 600ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .s-card[data-active="true"] .s-title { color: var(--ink); font-size: 38px; }

        .s-extras {
          display: flex;
          flex-direction: column;
          margin-top: auto;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0ms, transform 0ms;
          pointer-events: none;
        }
        .s-card[data-active="true"] .s-extras {
          opacity: 1;
          transform: translateY(0);
          transition:
            opacity 400ms cubic-bezier(0.22, 1, 0.36, 1) 200ms,
            transform 500ms cubic-bezier(0.22, 1, 0.36, 1) 200ms;
          pointer-events: auto;
        }

        .s-desc {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: 14px;
          line-height: 1.6;
          color: var(--muted-dark);
          margin: 0 0 28px;
        }

        .s-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          align-self: flex-start;
          padding: 14px 26px;
          border-radius: 9999px;
          background: transparent;
          border: 1.5px solid var(--ink);
          color: var(--ink);
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          transition:
            background-color 400ms cubic-bezier(0.22, 1, 0.36, 1),
            color 400ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .s-cta:hover { background: var(--ink); color: var(--text); }
        .s-cta:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; }

        /* ── Mobile / tablet stack ─────────────────────────── */
        .s-mobile {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 32px 20px;
        }
        @media (min-width: 1024px) {
          .s-mobile { display: none; }
        }

        .s-mcard {
          width: 100%;
          background: var(--bg);
          border: 1px solid rgba(239, 234, 224, 0.1);
          border-radius: 24px;
          padding: 32px 28px;
          position: relative;
          color: var(--text);
        }

        .s-mtitle {
          font-family: 'Anton', 'Oswald', Impact, sans-serif;
          font-weight: 400;
          font-size: 30px;
          line-height: 0.95;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          color: var(--text);
          margin: 0;
          white-space: pre-line;
          padding-right: 56px;
        }

        .s-mdesc {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          line-height: 1.6;
          color: rgba(239, 234, 224, 0.7);
          margin: 24px 0 0;
        }

        .s-mcta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 26px;
          border-radius: 9999px;
          background: transparent;
          border: 1.5px solid var(--text);
          color: var(--text);
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          margin-top: 32px;
          cursor: pointer;
          transition:
            background-color 400ms cubic-bezier(0.22, 1, 0.36, 1),
            color 400ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .s-mcta:hover, .s-mcta:focus-visible {
          background: var(--text);
          color: var(--ink);
        }
        .s-mcta:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; }

        .s-divider {
          align-self: center;
          width: 12px;
          height: 12px;
          border-radius: 9999px;
          border: 1.5px solid var(--accent);
          margin: 4px 0;
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .s-card,
          .s-card[data-active="true"],
          .s-card:hover:not([data-active="true"]) {
            transform: none !important;
          }
        }
      `}</style>

      {/* ── Header ───────────────────────────────────────── */}
      <div className="s-header">
        <span className="s-eyebrow">NOS SERVICES</span>
        <h2 className="s-headline">NOS SERVICES DIGITAUX AU MAROC.</h2>
      </div>

      {/* ── Desktop stack ─────────────────────────────────── */}
      <div className="s-stack" role="tablist" aria-label="Nos services">
        {services.map((s, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={s.num}
              type="button"
              role="tab"
              ref={el => { cardRefs.current[i] = el; }}
              className="s-card"
              data-active={isActive}
              aria-pressed={isActive}
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              style={{
                ['--rot' as string]: `${s.rotation}deg`,
                transform: isActive
                  ? 'rotate(0deg) translateY(-12px) scale(1.04)'
                  : `rotate(${s.rotation}deg)`,
                zIndex: isActive ? 50 : i + 1,
              }}
              onMouseEnter={() => setActiveIndex(i)}
              onClick={() => setActiveIndex(i)}
              onFocus={() => setActiveIndex(i)}
              onKeyDown={handleKey}
            >
              <span className="s-num">{s.num}</span>
              <h3 className="s-title">{s.title}</h3>

              <div className="s-extras">
                <p className="s-desc">{s.desc}</p>
                <a
                  href="#contact"
                  className="s-cta"
                  onClick={e => e.stopPropagation()}
                  tabIndex={isActive ? 0 : -1}
                  aria-hidden={!isActive}
                >
                  EN SAVOIR PLUS {ARROW}
                </a>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Mobile stack ──────────────────────────────────── */}
      <div className="s-mobile">
        {services.map((s, i) => (
          <div key={s.num}>
            <article className="s-mcard">
              <span className="s-num">{s.num}</span>
              <h3 className="s-mtitle">{s.title}</h3>
              <p className="s-mdesc">{s.desc}</p>
              <a href="#contact" className="s-mcta">EN SAVOIR PLUS {ARROW}</a>
            </article>
            {i < services.length - 1 && <div className="s-divider" aria-hidden="true" />}
          </div>
        ))}
      </div>
    </section>
  );
}
