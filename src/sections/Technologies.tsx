import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── Tech data ─────────────────────────────────────────────
const technologies = [
  { name: 'WordPress',  label: 'CMS',            src: '/wordpress-light.png'  },
  { name: 'Drupal',     label: 'CMS',            src: '/drupal-light.png'     },
  { name: 'Shopify',    label: 'E-commerce',     src: '/shopify-light.png'    },
  { name: 'React',      label: 'Frontend',       src: '/react-light.png'      },
  { name: 'Node.js',    label: 'Backend',        src: '/nodejs-light.png'     },
  { name: 'Meta Ads',   label: 'Publicité',      src: '/meta-light.png'       },
  { name: 'Google Ads', label: 'Publicité',      src: '/google-ads-light.png' },
  { name: 'SEO',        label: 'Référencement',  src: '/seo-light.png'        },
  { name: 'Sécurité',   label: 'Protection',     src: '/security-light.png'   },
  { name: 'Maintenance',label: 'Support',        src: '/maintenance-light.png'},
];

// ── Component ─────────────────────────────────────────────
export function Technologies() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelector('.t-header'),
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%' },
        }
      );
      gsap.fromTo(
        section.querySelectorAll('.t-card'),
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.55, stagger: 0.055, ease: 'power2.out',
          scrollTrigger: { trigger: section.querySelector('.t-grid'), start: 'top 85%' },
        }
      );
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="technologies" className="t-root no-reveal">
      <style>{`
        .t-root {
          background: #0E0E0E;
          color: #EFEAE0;
          font-family: 'Inter', system-ui, sans-serif;
        }

        /* ── Header ─────────────────────────────────────── */
        .t-header {
          text-align: center;
          padding: 72px 24px 56px;
        }
        @media (min-width: 1024px) {
          .t-header { padding: 96px 48px 72px; }
        }

        .t-eyebrow {
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(239, 234, 224, 0.45);
          display: block;
          margin-bottom: 20px;
        }

        .t-title {
          font-family: 'Anton', 'Oswald', Impact, sans-serif;
          font-weight: 400;
          font-size: clamp(34px, 5.5vw, 86px);
          line-height: 0.95;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          color: #EFEAE0;
          margin: 0 0 28px;
        }

        .t-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: clamp(14px, 1.5vw, 16px);
          line-height: 1.75;
          color: rgba(239, 234, 224, 0.5);
          max-width: 560px;
          margin: 0 auto;
        }

        /* ── Grid ───────────────────────────────────────── */
        .t-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          padding: 0 20px 60px;
        }
        @media (min-width: 640px) {
          .t-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 14px;
            padding: 0 32px 60px;
          }
        }
        @media (min-width: 1024px) {
          .t-grid {
            grid-template-columns: repeat(5, 1fr);
            gap: 14px;
            padding: 0 60px 80px;
          }
        }

        /* ── Card ───────────────────────────────────────── */
        .t-card {
          background: #1A1A1A;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 18px;
          aspect-ratio: 1;
          padding: 24px 16px;
          position: relative;
          overflow: hidden;
          border-radius: 16px;
          transition: background 400ms ease;
        }
        .t-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(239, 234, 224, 0.04);
          opacity: 0;
          transition: opacity 400ms ease;
          pointer-events: none;
        }
        .t-card:hover { background: #202020; }
        .t-card:hover::after { opacity: 1; }

        /* ── Icon ───────────────────────────────────────── */
        .t-icon {
          width: 72px;
          height: 72px;
          flex-shrink: 0;
          transition: transform 400ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .t-card:hover .t-icon { transform: scale(1.1); }
        @media (min-width: 1024px) {
          .t-icon { width: 96px; height: 96px; }
        }

        /* ── Label ──────────────────────────────────────── */
        .t-name {
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(239, 234, 224, 0.35);
          text-align: center;
          transition: color 400ms ease;
        }
        .t-card:hover .t-name { color: rgba(239, 234, 224, 0.65); }
        @media (min-width: 1024px) {
          .t-name { font-size: 11px; }
        }
      `}</style>

      {/* ── Header ──────────────────────────────────────── */}
      <div className="t-header">
        <span className="t-eyebrow">Notre stack</span>
        <h2 className="t-title">
          UNE FONDATION<br />TECHNOLOGIQUE SOLIDE
        </h2>
        <p className="t-subtitle">
          Nous maîtrisons les technologies les plus performantes et reconnues de l'industrie
          pour bâtir des solutions digitales robustes, sécurisées et prêtes pour l'avenir.
        </p>
      </div>

      {/* ── Grid ────────────────────────────────────────── */}
      <div className="t-grid">
        {technologies.map((tech) => (
          <div key={tech.name} className="t-card" aria-label={tech.name}>
            <img src={tech.src} alt={tech.name} className="t-icon" />
            <span className="t-name">{tech.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
