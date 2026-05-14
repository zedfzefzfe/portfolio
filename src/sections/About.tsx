import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function splitIntoWordSpans(text: string): React.ReactElement[] {
  return text.split(' ').map((word, i) => (
    <span
      key={i}
      className="reveal-word"
      style={{ color: '#333', display: 'inline-block', marginRight: '0.25em' }}
    >
      {word}
    </span>
  ));
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // Image reveal
      gsap.fromTo(
        section.querySelector('.about-img'),
        { clipPath: 'inset(100% 0 0 0)', scale: 1.08 },
        { clipPath: 'inset(0% 0 0 0)', scale: 1, duration: 1.4, ease: 'power3.inOut', scrollTrigger: { trigger: section, start: 'top 80%' } }
      );

      // Button reveal
      gsap.fromTo(
        section.querySelector('.about-btn'),
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: section.querySelector('.about-btn'), start: 'top 90%' } }
      );

      // Divider line
      gsap.fromTo(
        section.querySelector('.about-divider'),
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: 'power3.inOut', transformOrigin: 'left center', scrollTrigger: { trigger: section, start: 'top 75%' } }
      );

      if (prefersReducedMotion) {
        section.querySelectorAll<HTMLElement>('.reveal-word').forEach(el => { el.style.color = '#ffffff'; });
        return;
      }

      // Word-by-word color reveal
      section.querySelectorAll<HTMLElement>('.reveal-word').forEach((word) => {
        gsap.to(word, {
          color: '#ffffff',
          ease: 'none',
          scrollTrigger: {
            trigger: word,
            start: 'top 88%',
            end: 'top 58%',
            scrub: true,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const labelLine1 = 'BÂTISSEURS DU DIGITAL';
  const labelLine2 = 'BASÉE AU MAROC';

  return (
    <section ref={sectionRef} id="about" className="relative overflow-hidden" style={{ backgroundColor: '#111111' }}>

      {/* Top divider */}
      <div className="about-divider h-px w-full origin-left" style={{ background: 'rgba(255,255,255,0.12)' }} />

      <div className="container-site py-24 md:py-36">

        {/* Label row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-12 md:mb-16">
          <span className="text-label" style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.18em' }}>
            {splitIntoWordSpans(labelLine1)}
          </span>
          <span className="text-label" style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.18em' }}>
            {splitIntoWordSpans(labelLine2)}
          </span>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">

          {/* Left — image + stat */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="about-img relative overflow-hidden rounded-2xl" style={{ aspectRatio: '3/4' }}>
              <img
                src="/images/about-1.jpg"
                alt="Lumia Technologie"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Overlay badge */}
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div
                  className="rounded-xl px-4 py-3 backdrop-blur-sm"
                  style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.12)' }}
                >
                  <p className="text-white font-semibold text-2xl leading-none">+150</p>
                  <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Projets livrés</p>
                </div>
                <div
                  className="rounded-xl px-4 py-3 backdrop-blur-sm"
                  style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.12)' }}
                >
                  <p className="text-white font-semibold text-2xl leading-none">5★</p>
                  <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Satisfaction client</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — big text */}
          <div className="lg:col-span-8 flex flex-col justify-between gap-12">

            {/* Massive headline */}
            <h2
              className="font-display leading-none"
              style={{
                fontSize: 'clamp(3.5rem, 8vw, 9rem)',
                letterSpacing: '-0.01em',
                lineHeight: 0.92,
              }}
            >
              {splitIntoWordSpans('Nous bâtissons des expériences digitales')}
            </h2>

            {/* Body + CTA row */}
            <div className="flex flex-col md:flex-row md:items-end gap-10 md:gap-16">
              <p
                className="about-text text-xl md:text-2xl leading-relaxed flex-1"
                style={{ maxWidth: '540px' }}
              >
                {splitIntoWordSpans(
                  'performantes et des solutions sur-mesure. Notre engagement : dépasser vos attentes et assurer la solidité de votre présence en ligne.'
                )}
              </p>

              <div className="shrink-0">
                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="about-btn group relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-medium tracking-widest uppercase transition-all duration-300 overflow-hidden"
                  style={{ border: '1px solid rgba(255,255,255,0.25)', color: '#fff' }}
                >
                  <span className="relative z-10">EN SAVOIR PLUS</span>
                  {/* Arrow */}
                  <svg
                    className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {/* Hover fill */}
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.08)' }}
                  />
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="h-px w-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
    </section>
  );
}
