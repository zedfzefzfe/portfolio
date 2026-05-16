import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Campaign {
  name: string;
  active: boolean;
  results: string;
  cost: string;
  spent: string;
}

interface CardData {
  client: string;
  period: string;
  rotation: number;
  backRotation: number;
  resultLabel: string;
  campaigns: Campaign[];
  totals: { value: string; avgCost: string; spent: string };
}

const cards: CardData[] = [
  {
    client: 'Ouaddi Living',
    period: '1 Avr 2026 — 7 Mai 2026',
    rotation: -2.5,
    backRotation: 1.8,
    resultLabel: 'conversations',
    campaigns: [
      { name: 'Rideaux',     active: true,  results: '91 conv.', cost: '0.54$', spent: '49.52$' },
      { name: 'WA Messages', active: false, results: '52 conv.', cost: '0.89$', spent: '46.25$' },
    ],
    totals: { value: '143', avgCost: '0.67$', spent: '95.77$' },
  },
  {
    client: 'Zouaoui Immobilier',
    period: '3 Mar 2026 — 12 Avr 2026',
    rotation: 1.8,
    backRotation: -2.2,
    resultLabel: 'leads',
    campaigns: [
      { name: 'Appart. Casa', active: true, results: '67 leads', cost: '1.24$', spent: '83.08$' },
      { name: 'Villas Rabat', active: true, results: '38 leads', cost: '1.87$', spent: '71.06$' },
    ],
    totals: { value: '105', avgCost: '1.47$', spent: '154.14$' },
  },
];

// Repeat cards to fill viewport before duplicating for seamless loop
const track = [...cards, ...cards, ...cards, ...cards];

function PolaroidCard({ card }: { card: CardData }) {
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
      <div className="cr-polaroid">

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

          {/* Header */}
          <div className="cr-screen-header">
            <span className="cr-client-name">{card.client.toUpperCase()}</span>
            <span className="cr-period">{card.period}</span>
          </div>

          <div className="cr-divider" />

          {/* Campaign table */}
          <table className="cr-table">
            <thead>
              <tr>
                <th>Campagne</th>
                <th>Résultats</th>
                <th>Coût/rés.</th>
                <th>Dépensé</th>
              </tr>
            </thead>
            <tbody>
              {card.campaigns.map((c, i) => (
                <tr key={i}>
                  <td>
                    <span
                      className="cr-status-dot"
                      style={{ background: c.active ? '#e85d26' : '#555' }}
                    />
                    {c.name}
                  </td>
                  <td>{c.results}</td>
                  <td>{c.cost}</td>
                  <td>{c.spent}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="cr-totals">
            <div className="cr-total-box">
              <span className="cr-total-value">{card.totals.value}</span>
              <span className="cr-total-label">{card.resultLabel}</span>
            </div>
            <div className="cr-total-box">
              <span className="cr-total-value">{card.totals.avgCost}</span>
              <span className="cr-total-label">coût moyen</span>
            </div>
            <div className="cr-total-box">
              <span className="cr-total-value">{card.totals.spent}</span>
              <span className="cr-total-label">dépensé</span>
            </div>
          </div>

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
          animation: cr-scroll 40s linear infinite;
          will-change: transform;
          align-items: center;
        }
        .cr-marquee-wrap:hover .cr-marquee-inner {
          animation-play-state: paused;
        }

        /* ── Card wrapper ─────────────────────────────────── */
        .cr-card-wrap {
          position: relative;
          flex-shrink: 0;
          width: 400px;
        }
        @media (max-width: 767px) { .cr-card-wrap { width: 260px; } }

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
          box-shadow:
            0 2px 4px rgba(0,0,0,0.12),
            0 8px 24px rgba(0,0,0,0.28),
            0 32px 80px rgba(0,0,0,0.5);
        }

        /* ── Screen ───────────────────────────────────────── */
        .cr-screen {
          background: #161616;
          border-radius: 2px;
          overflow: hidden;
          padding-bottom: 12px;
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
        .cr-screen-header {
          padding: 10px 12px 6px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .cr-client-name {
          font-family: 'Barlow Condensed', 'Anton', sans-serif;
          font-weight: 800;
          font-size: 13px;
          letter-spacing: 0.14em;
          color: #EFEAE0;
        }
        .cr-period {
          font-family: 'Barlow', 'Inter', sans-serif;
          font-size: 8.5px;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.04em;
        }
        .cr-divider {
          height: 1px;
          background: rgba(255,255,255,0.07);
          margin: 0 12px 6px;
        }

        /* ── Table ────────────────────────────────────────── */
        .cr-table {
          width: 100%;
          border-collapse: collapse;
          font-family: 'Barlow', 'Inter', sans-serif;
        }
        .cr-table th {
          color: rgba(255,255,255,0.35);
          font-weight: 400;
          font-size: 7.5px;
          text-transform: uppercase;
          letter-spacing: 0.09em;
          padding: 4px 12px;
          text-align: left;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .cr-table td {
          font-size: 9.5px;
          color: rgba(255,255,255,0.8);
          padding: 5px 12px;
          vertical-align: middle;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          white-space: nowrap;
        }
        .cr-table td:first-child {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .cr-status-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* ── Totals ───────────────────────────────────────── */
        .cr-totals {
          display: flex;
          gap: 5px;
          margin: 10px 12px 0;
        }
        .cr-total-box {
          flex: 1;
          background: rgba(232,93,38,0.08);
          border: 1px solid rgba(232,93,38,0.18);
          border-radius: 4px;
          padding: 7px 4px;
          text-align: center;
        }
        .cr-total-value {
          display: block;
          font-family: 'Barlow Condensed', 'Anton', sans-serif;
          font-weight: 800;
          font-size: 15px;
          color: #e85d26;
          letter-spacing: 0.01em;
          line-height: 1;
        }
        .cr-total-label {
          display: block;
          font-family: 'Barlow', 'Inter', sans-serif;
          font-size: 7px;
          color: rgba(255,255,255,0.35);
          text-transform: uppercase;
          letter-spacing: 0.07em;
          margin-top: 3px;
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
          .cr-screen-header { padding: 13px 16px 7px; gap: 3px; }
          .cr-client-name { font-size: 17px; }
          .cr-period { font-size: 11px; }
          .cr-divider { margin: 0 16px 8px; }
          .cr-table th { font-size: 9.5px; padding: 5px 16px; }
          .cr-table td { font-size: 12px; padding: 6px 16px; }
          .cr-totals { gap: 7px; margin: 12px 16px 0; }
          .cr-total-box { padding: 9px 6px; }
          .cr-total-value { font-size: 20px; }
          .cr-total-label { font-size: 9px; margin-top: 4px; }
          .cr-screen { padding-bottom: 16px; }
          .cr-footer { padding: 10px 10px 12px; }
          .cr-logo { font-size: 22px; }
          .cr-footer-label { font-size: 10px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .cr-marquee-inner { animation: none; }
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
        <div className="cr-marquee-inner">
          {/* Original set */}
          {track.map((card, i) => (
            <PolaroidCard key={`a-${i}`} card={card} />
          ))}
          {/* Duplicate set for seamless loop */}
          {track.map((card, i) => (
            <PolaroidCard key={`b-${i}`} card={card} />
          ))}
        </div>
      </div>

    </section>
  );
}
