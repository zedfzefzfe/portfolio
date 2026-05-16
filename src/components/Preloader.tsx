import { useEffect, useRef, useState } from 'react';

type State =
  | { phase: 'initial' }
  | { phase: 'idle' }
  | { phase: 'navigating'; url: string };

export function Preloader() {
  const [state, setState] = useState<State>({ phase: 'initial' });
  const [contentVisible, setContentVisible] = useState(false);
  const [curtainsMoved, setCurtainsMoved] = useState(false);
  const stateRef = useRef(state);
  stateRef.current = state;

  // ── Initial load animation ────────────────────────────────
  useEffect(() => {
    if (state.phase !== 'initial') return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const t1 = window.setTimeout(() => setContentVisible(true), 50);
    const t2 = window.setTimeout(() => {
      setContentVisible(false);
      setCurtainsMoved(true); // curtains open out
    }, 2050);
    const t3 = window.setTimeout(() => {
      document.body.style.overflow = prevOverflow;
      setContentVisible(false);
      setCurtainsMoved(false);
      setState({ phase: 'idle' });
    }, 3100);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      document.body.style.overflow = prevOverflow;
    };
  }, [state.phase]);

  // ── Listen for navigation requests ────────────────────────
  useEffect(() => {
    const handler = (e: Event) => {
      if (stateRef.current.phase !== 'idle') return;
      const url = (e as CustomEvent<{ url: string }>).detail?.url;
      if (typeof url !== 'string' || !url) return;
      // Reset to start of navigation animation
      setContentVisible(false);
      setCurtainsMoved(false); // curtains begin off-screen (mode swaps the default)
      setState({ phase: 'navigating', url });
    };
    window.addEventListener('devmaroc:navigate', handler as EventListener);
    return () => window.removeEventListener('devmaroc:navigate', handler as EventListener);
  }, []);

  // ── Navigation animation ──────────────────────────────────
  useEffect(() => {
    if (state.phase !== 'navigating') return;
    document.body.style.overflow = 'hidden';

    // Wait two frames so the off-screen starting position paints first,
    // then trigger the transition by setting curtainsMoved=true.
    let raf2 = 0;
    const raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(() => setCurtainsMoved(true));
    });

    // After curtains close (~0.6s) → fade in logo
    const t1 = window.setTimeout(() => setContentVisible(true), 620);
    // Hold then navigate (curtain 0.6 + fade 0.3 + hold 0.5 = ~1.4s)
    const t2 = window.setTimeout(() => {
      window.location.href = state.url;
    }, 1500);

    return () => {
      window.cancelAnimationFrame(raf1);
      window.cancelAnimationFrame(raf2);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [state]);

  if (state.phase === 'idle') return null;

  const mode = state.phase === 'initial' ? 'initial' : 'navigating';

  return (
    <div className="preloader-root" data-mode={mode} aria-hidden="true">
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
        }
        .preloader-curtain.top    { top: 0; }
        .preloader-curtain.bottom { bottom: 0; }

        /* ── Mode: initial ─── start at center, .moved opens them out ─── */
        .preloader-root[data-mode="initial"] .preloader-curtain {
          transition: transform 1s cubic-bezier(0.77, 0, 0.175, 1);
        }
        .preloader-root[data-mode="initial"] .preloader-curtain.top    { transform: translateY(0); }
        .preloader-root[data-mode="initial"] .preloader-curtain.bottom { transform: translateY(0); }
        .preloader-root[data-mode="initial"] .preloader-curtain.top.moved    { transform: translateY(-100%); }
        .preloader-root[data-mode="initial"] .preloader-curtain.bottom.moved { transform: translateY(100%); }

        /* ── Mode: navigating ─── start off-screen, .moved closes them in ─── */
        .preloader-root[data-mode="navigating"] .preloader-curtain {
          transition: transform 0.6s cubic-bezier(0.77, 0, 0.175, 1);
        }
        .preloader-root[data-mode="navigating"] .preloader-curtain.top    { transform: translateY(-100%); }
        .preloader-root[data-mode="navigating"] .preloader-curtain.bottom { transform: translateY(100%); }
        .preloader-root[data-mode="navigating"] .preloader-curtain.top.moved    { transform: translateY(0); }
        .preloader-root[data-mode="navigating"] .preloader-curtain.bottom.moved { transform: translateY(0); }

        @media (max-width: 767px) {
          .preloader-root[data-mode="initial"] .preloader-curtain { transition-duration: 0.7s; }
          .preloader-root[data-mode="navigating"] .preloader-curtain { transition-duration: 0.45s; }
        }

        /* ── Centered content ────────────────────────────────────────── */
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
        .preloader-root[data-mode="navigating"] .preloader-content {
          transition:
            opacity 0.4s ease-out,
            transform 0.4s ease-out;
        }

        .preloader-mark {
          width: clamp(72px, 10vw, 120px);
          height: auto;
          display: block;
          margin-bottom: 24px;
          user-select: none;
          -webkit-user-drag: none;
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
          font-size: clamp(32px, 8vw, 80px);
          line-height: 1;
          letter-spacing: -0.02em;
          color: #f5f0e8;
          white-space: nowrap;
        }
        .preloader-dot {
          display: inline-block;
          width: 0.18em;
          height: 0.18em;
          background: #e85d26;
          border-radius: 50%;
          vertical-align: baseline;
          margin-left: 0.04em;
        }

        @media (max-width: 767px) {
          .preloader-label { font-size: 10px; margin-bottom: 22px; }
          .preloader-mark { margin-bottom: 18px; }
        }

        .preloader-bar-track {
          width: 200px;
          height: 1px;
          background: #222;
          margin-top: 36px;
          overflow: hidden;
        }
        .preloader-bar-fill {
          height: 100%;
          width: 0;
          background: #e85d26;
        }
        /* Bar fills only during initial-mode hold phase */
        .preloader-root[data-mode="initial"] .preloader-content.visible .preloader-bar-fill {
          animation: preloader-bar-fill 1.2s linear 0.75s forwards;
        }
        /* Hide the bar entirely in navigating mode */
        .preloader-root[data-mode="navigating"] .preloader-bar-track {
          display: none;
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

      <div className={`preloader-curtain top ${curtainsMoved ? 'moved' : ''}`} />
      <div className={`preloader-curtain bottom ${curtainsMoved ? 'moved' : ''}`} />

      <div className={`preloader-content ${contentVisible ? 'visible' : ''}`}>
        <img
          src="/DEVWEB-removebg-preview.png"
          alt=""
          className="preloader-mark"
          draggable={false}
        />
        <div className="preloader-label">BÂTISSEURS DU DIGITAL</div>
        <div className="preloader-logo">
          DEV-MAROC<span className="preloader-dot" aria-hidden="true" />
        </div>
        <div className="preloader-bar-track">
          <div className="preloader-bar-fill" />
        </div>
      </div>
    </div>
  );
}
