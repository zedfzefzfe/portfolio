import { useEffect, useState } from 'react';

export function Preloader() {
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(false); // content fade-in
  const [exiting, setExiting] = useState(false); // curtain split

  useEffect(() => {
    // Lock body scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Tiny delay so initial (hidden) state can paint before transitioning.
    const t1 = window.setTimeout(() => setVisible(true), 50);

    // Fade-in 0.8s + hold 1.2s = 2.0s → start curtain split.
    const t2 = window.setTimeout(() => setExiting(true), 2050);

    // After curtain split (1.0s) → unmount.
    const t3 = window.setTimeout(() => {
      document.body.style.overflow = prevOverflow;
      setDone(true);
    }, 3100);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (done) return null;

  return (
    <div className="preloader-root" aria-hidden="true">
      <style>{`
        .preloader-root {
          position: fixed;
          inset: 0;
          z-index: 9999;
          pointer-events: none;
        }

        .preloader-curtain {
          position: absolute;
          left: 0;
          right: 0;
          height: 50vh;
          background: #0d0d0d;
          pointer-events: auto;
          will-change: transform;
          transition: transform 1s cubic-bezier(0.77, 0, 0.175, 1);
        }
        .preloader-curtain.top    { top: 0; }
        .preloader-curtain.bottom { bottom: 0; }
        .preloader-curtain.top.exit    { transform: translateY(-100%); }
        .preloader-curtain.bottom.exit { transform: translateY(100%); }

        @media (max-width: 767px) {
          .preloader-curtain { transition-duration: 0.7s; }
        }

        .preloader-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0.9);
          opacity: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          pointer-events: none;
          z-index: 1;
          transition:
            opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .preloader-content.visible {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
        .preloader-content.exit {
          opacity: 0;
          transition: opacity 0.4s ease-out;
        }

        .preloader-label {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #555;
          margin-bottom: 28px;
        }

        .preloader-logo {
          font-family: 'Barlow Condensed', 'Anton', Impact, sans-serif;
          font-weight: 900;
          font-size: 80px;
          line-height: 1;
          letter-spacing: -0.02em;
          color: #ffffff;
          text-transform: lowercase;
        }
        .preloader-dot { color: #e85d26; }

        @media (max-width: 767px) {
          .preloader-logo { font-size: 56px; }
          .preloader-label { font-size: 10px; margin-bottom: 22px; }
        }

        .preloader-bar-track {
          width: 200px;
          height: 1px;
          background: #2a2a2a;
          margin-top: 36px;
          overflow: hidden;
        }
        .preloader-bar-fill {
          height: 100%;
          width: 0;
          background: #f5f0e8;
        }
        /* Bar fills only during the hold phase: starts after fade-in (~0.8s
           after .visible is added) and runs for the 1.2s hold. */
        .preloader-content.visible .preloader-bar-fill {
          animation: preloader-bar-fill 1.2s linear 0.75s forwards;
        }
        @keyframes preloader-bar-fill {
          from { width: 0;    }
          to   { width: 100%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .preloader-curtain,
          .preloader-content,
          .preloader-bar-fill { transition: none; animation: none; }
        }
      `}</style>

      <div className={`preloader-curtain top ${exiting ? 'exit' : ''}`} />
      <div className={`preloader-curtain bottom ${exiting ? 'exit' : ''}`} />

      <div className={`preloader-content ${visible ? 'visible' : ''} ${exiting ? 'exit' : ''}`}>
        <div className="preloader-label">BÂTISSEURS DU DIGITAL</div>
        <div className="preloader-logo">
          Lumia<span className="preloader-dot">.</span>
        </div>
        <div className="preloader-bar-track">
          <div className="preloader-bar-fill" />
        </div>
      </div>
    </div>
  );
}
