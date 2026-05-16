import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CardData {
  client: string;
  screenshot: string;
  url?: string;
  rotation: number;
  backRotation: number;
}

// Drop real Meta Ads screenshots into /public/results/ matching these names.
// Extend this array to add more clients — the marquee will pick them up.
const cards: CardData[] = [
  {
    client: 'Ouaddi Living',
    screenshot: '/results/1.png',
    rotation: -2.5,
    backRotation: 1.8,
  },
  {
    client: 'Zouaoui Immobilier',
    screenshot: '/results/2.png',
    rotation: 1.8,
    backRotation: -2.2,
  },
  {
    client: 'Zethnika',
    screenshot: '/results/3.png',
    rotation: -1.5,
    backRotation: 2.3,
  },
  {
    client: 'Alaa Parfum',
    screenshot: '/results/4.png',
    rotation: 2.4,
    backRotation: -1.6,
  },
  {
    client: 'Royal Beverage',
    screenshot: '/results/5.png',
    rotation: -2.1,
    backRotation: 1.5,
  },
];

// Repeat cards to fill viewport before duplicating for seamless loop
const track = [...cards, ...cards, ...cards, ...cards];

function PolaroidCard({ card, onOpen }: { card: CardData; onOpen: () => void }) {
  return (
    <div
      className="cr-card-wrap"
      style={{ transform: `rotate(${card.rotation}deg)` }}
    >
      {/* Shadow card behind */}
      <div
        className="cr-card-back"
        style={{ transform: `rotate(${card.backRotation - card.rotation}deg) translate(6px, 5px)` }}
      />

      {/* Main polaroid */}
      <div
        className="cr-polaroid"
        role="button"
        tabIndex={0}
        aria-label={`Voir le résultat complet de ${card.client}`}
        onClick={onOpen}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpen();
          }
        }}
      >

        {/* ── Screen ── */}
        <div className="cr-screen">

          {/* Browser bar */}
          <div className="cr-browser-bar">
            <div className="cr-dots">
              <span className="cr-dot" style={{ background: '#ff5f57' }} />
              <span className="cr-dot" style={{ background: '#ffbd2e' }} />
              <span className="cr-dot" style={{ background: '#28c840' }} />
            </div>
            <div className="cr-url-bar">ads.facebook.com</div>
          </div>

          {/* Real Meta Ads dashboard screenshot */}
          <img
            src={card.screenshot}
            alt={`${card.client} - résultats Meta Ads`}
            className="cr-screenshot"
            loading="lazy"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.visibility = 'hidden';
            }}
          />

        </div>

        {/* Polaroid footer */}
        <div className="cr-footer">
          <span className="cr-logo">DEV-MAROC<span className="cr-logo-dot">.</span></span>
          <span className="cr-footer-label">résultat client · meta ads</span>
        </div>

      </div>
    </div>
  );
}

export function ClientResults() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isOpen = activeIndex !== null;

  const close = useCallback(() => setActiveIndex(null), []);
  const prev = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i - 1 + cards.length) % cards.length)),
    []
  );
  const next = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i + 1) % cards.length)),
    []
  );

  // Keyboard navigation while lightbox is open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, close, prev, next]);

  useEffect(() => {
    const id = 'cr-fonts';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href =
        'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@800;900&family=Barlow:ital,wght@0,300;0,400;1,300;1,400&display=swap';
      document.head.appendChild(link);
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ['.cr-eyebrow', '.cr-headline', '.cr-subline'],
        { y: 32, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: '.cr-hero', start: 'top 80%', once: true },
        }
      );
      gsap.fromTo(
        '.cr-marquee-wrap',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.cr-marquee-wrap', start: 'top 85%', once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="resultats" className="cr-root no-reveal">
      <style>{`
        @keyframes cr-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .cr-root {
          background: #0E0E0E;
          color: #EFEAE0;
          font-family: 'Barlow', 'Inter', system-ui, sans-serif;
        }

        /* ── Section header ───────────────────────────────── */
        .cr-hero {
          padding: 80px 24px 64px;
        }
        @media (min-width: 768px) { .cr-hero { padding: 96px 48px 72px; } }

        .cr-eyebrow {
          display: inline-block;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #EFEAE0;
        }
        .cr-headline {
          font-family: 'Anton', 'Oswald', Impact, sans-serif;
          font-weight: 400;
          font-size: clamp(48px, 9vw, 140px);
          line-height: 0.9;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          color: #EFEAE0;
          margin: 24px 0 32px;
        }
        .cr-subline {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: 13px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(239,234,224,0.65);
          max-width: 480px;
          line-height: 1.7;
        }

        /* ── Marquee ──────────────────────────────────────── */
        .cr-marquee-wrap {
          overflow: hidden;
          width: 100%;
          padding: 48px 0 96px;
        }
        .cr-marquee-inner {
          display: flex;
          flex-wrap: nowrap;
          gap: 64px;
          width: max-content;
          animation: cr-scroll 60s linear infinite;
          will-change: transform;
          align-items: center;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        .cr-marquee-wrap:hover .cr-marquee-inner,
        .cr-marquee-inner.is-paused {
          animation-play-state: paused;
        }

        /* ── Card wrapper ─────────────────────────────────── */
        .cr-card-wrap {
          position: relative;
          flex-shrink: 0;
          width: 480px;
        }
        @media (max-width: 767px) { .cr-card-wrap { width: 300px; } }

        /* ── Shadow card ──────────────────────────────────── */
        .cr-card-back {
          position: absolute;
          inset: 0;
          background: #e2ddd0;
          border-radius: 3px;
          box-shadow: 0 28px 64px rgba(0,0,0,0.5);
          z-index: 0;
        }

        /* ── Polaroid ─────────────────────────────────────── */
        .cr-polaroid {
          position: relative;
          z-index: 1;
          background: #f5f0e8;
          border-radius: 3px;
          padding: 10px 10px 0 10px;
          cursor: pointer;
          box-shadow:
            0 2px 4px rgba(0,0,0,0.12),
            0 8px 24px rgba(0,0,0,0.28),
            0 32px 80px rgba(0,0,0,0.5);
          transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .cr-polaroid:hover { transform: translateY(-4px); }
        .cr-polaroid:focus-visible {
          outline: 2px solid #e85d26;
          outline-offset: 4px;
        }

        /* ── Screen ───────────────────────────────────────── */
        .cr-screen {
          background: #1a1a1a;
          border-radius: 2px;
          overflow: hidden;
          font-size: 0;
        }
        .cr-browser-bar {
          background: #252525;
          padding: 7px 10px;
          display: flex;
          align-items: center;
          gap: 8px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .cr-dots { display: flex; gap: 5px; align-items: center; }
        .cr-dot { width: 7px; height: 7px; border-radius: 50%; display: block; }
        .cr-url-bar {
          font-family: 'Barlow', monospace;
          font-size: 8.5px;
          color: rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.06);
          padding: 2px 9px;
          border-radius: 20px;
          flex: 1;
          text-align: center;
          letter-spacing: 0.03em;
        }

        /* ── Real screenshot ──────────────────────────────── */
        .cr-screenshot {
          display: block;
          width: 100%;
          height: auto;
          object-fit: cover;
          object-position: top center;
          background: #1a1a1a;
        }

        /* ── Footer ───────────────────────────────────────── */
        .cr-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 8px 10px;
        }
        .cr-logo {
          font-family: 'Barlow Condensed', 'Anton', sans-serif;
          font-weight: 900;
          font-size: 17px;
          letter-spacing: -0.01em;
          color: #1a1a1a;
          text-transform: uppercase;
          line-height: 1;
        }
        .cr-logo-dot { color: #e85d26; }
        .cr-footer-label {
          font-family: 'Barlow', 'Inter', sans-serif;
          font-style: italic;
          font-weight: 300;
          font-size: 7.5px;
          color: rgba(26,26,26,0.45);
          letter-spacing: 0.05em;
        }

        /* ── Dividers ─────────────────────────────────────── */
        .cr-top-divider { height: 1px; background: rgba(255,255,255,0.08); }

        /* ── Desktop-only size scale-up ──────────────────── */
        @media (min-width: 768px) {
          .cr-browser-bar { padding: 9px 14px; }
          .cr-dot { width: 9px; height: 9px; }
          .cr-url-bar { font-size: 11px; padding: 3px 12px; }
          .cr-footer { padding: 10px 10px 12px; }
          .cr-logo { font-size: 22px; }
          .cr-footer-label { font-size: 10px; }
        }

        /* ── Lightbox ─────────────────────────────────────── */
        @keyframes cr-lb-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes cr-lb-pop {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }

        .cr-lightbox {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(0, 0, 0, 0.92);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: cr-lb-fade 220ms ease-out;
        }

        .cr-lb-figure {
          position: relative;
          margin: 0;
          max-width: min(1100px, 92vw);
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          animation: cr-lb-pop 260ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .cr-lb-img {
          display: block;
          max-width: 100%;
          max-height: 82vh;
          width: auto;
          height: auto;
          object-fit: contain;
          border-radius: 4px;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
          background: #1a1a1a;
        }

        .cr-lb-caption {
          font-family: 'Barlow Condensed', 'Anton', sans-serif;
          font-weight: 800;
          font-size: 14px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(239, 234, 224, 0.85);
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .cr-lb-counter {
          font-family: 'Barlow', 'Inter', sans-serif;
          font-weight: 400;
          font-size: 11px;
          letter-spacing: 0.12em;
          color: rgba(239, 234, 224, 0.45);
        }

        .cr-lb-close,
        .cr-lb-arrow {
          position: absolute;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #EFEAE0;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          line-height: 1;
          transition: background 200ms ease, border-color 200ms ease, transform 200ms ease;
        }
        .cr-lb-close:hover,
        .cr-lb-arrow:hover {
          background: rgba(232, 93, 38, 0.18);
          border-color: rgba(232, 93, 38, 0.5);
        }
        .cr-lb-close:focus-visible,
        .cr-lb-arrow:focus-visible {
          outline: 2px solid #e85d26;
          outline-offset: 3px;
        }

        .cr-lb-close {
          top: 20px;
          right: 24px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          font-size: 28px;
          font-weight: 300;
        }

        .cr-lb-arrow {
          top: 50%;
          transform: translateY(-50%);
          width: 56px;
          height: 56px;
          border-radius: 50%;
          font-size: 36px;
          font-weight: 300;
        }
        .cr-lb-arrow:hover { transform: translateY(-50%) scale(1.05); }
        .cr-lb-prev { left: 24px; }
        .cr-lb-next { right: 24px; }

        @media (max-width: 767px) {
          .cr-lightbox { padding: 12px; }
          .cr-lb-close { top: 12px; right: 12px; width: 38px; height: 38px; font-size: 24px; }
          .cr-lb-arrow { width: 44px; height: 44px; font-size: 28px; }
          .cr-lb-prev { left: 8px; }
          .cr-lb-next { right: 8px; }
          .cr-lb-img { max-height: 75vh; }
          .cr-lb-caption { font-size: 12px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .cr-marquee-inner { animation: none; }
          .cr-lightbox,
          .cr-lb-figure { animation: none; }
          .cr-polaroid { transition: none; }
          .cr-polaroid:hover { transform: none; }
        }
      `}</style>

      <div className="cr-top-divider" />

      {/* ── Header ── */}
      <div className="cr-hero">
        <span className="cr-eyebrow">NOS RÉSULTATS</span>
        <h2 className="cr-headline">
          ON NE PROMET PAS,<br />ON PROUVE.
        </h2>
        <p className="cr-subline">Des campagnes Meta Ads rentables — des chiffres réels, des clients réels.</p>
      </div>

      {/* ── Auto-scrolling cards ── */}
      <div className="cr-marquee-wrap">
        <div className={`cr-marquee-inner${isOpen ? ' is-paused' : ''}`}>
          {/* Original set */}
          {track.map((card, i) => (
            <PolaroidCard
              key={`a-${i}`}
              card={card}
              onOpen={() => setActiveIndex(i % cards.length)}
            />
          ))}
          {/* Duplicate set for seamless loop */}
          {track.map((card, i) => (
            <PolaroidCard
              key={`b-${i}`}
              card={card}
              onOpen={() => setActiveIndex(i % cards.length)}
            />
          ))}
        </div>
      </div>

      {/* ── Lightbox ── */}
      {isOpen && (
        <div
          className="cr-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Résultat ${cards[activeIndex!].client}`}
          onClick={close}
        >
          <button
            type="button"
            className="cr-lb-close"
            onClick={(e) => { e.stopPropagation(); close(); }}
            aria-label="Fermer"
          >
            ×
          </button>

          <button
            type="button"
            className="cr-lb-arrow cr-lb-prev"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Résultat précédent"
          >
            ‹
          </button>

          <figure className="cr-lb-figure" onClick={(e) => e.stopPropagation()}>
            <img
              src={cards[activeIndex!].screenshot}
              alt={`${cards[activeIndex!].client} - résultats Meta Ads`}
              className="cr-lb-img"
            />
            <figcaption className="cr-lb-caption">
              {cards[activeIndex!].client}
              <span className="cr-lb-counter">
                {activeIndex! + 1} / {cards.length}
              </span>
            </figcaption>
          </figure>

          <button
            type="button"
            className="cr-lb-arrow cr-lb-next"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Résultat suivant"
          >
            ›
          </button>
        </div>
      )}

    </section>
  );
}
