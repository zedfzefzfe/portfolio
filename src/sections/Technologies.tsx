import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Framework' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Tailwind', category: 'CSS' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'AWS', category: 'Cloud' },
  { name: 'Docker', category: 'DevOps' },
];

export function Technologies() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(section.querySelector('.tech-title'), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 80%' } });
      const items = section.querySelectorAll('.tech-item');
      gsap.fromTo(items, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out', scrollTrigger: { trigger: section.querySelector('.tech-grid'), start: 'top 85%' } });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="technologies" className="relative py-20 md:py-32" style={{ backgroundColor: '#111111' }}>
      <div className="container-site">
        <h2 className="tech-title font-display text-center mb-16 md:mb-24" style={{ fontSize: 'clamp(2rem, 6vw, 5rem)', color: 'rgba(255,255,255,0.15)', lineHeight: 1 }}>
          UNE FONDATION TECHNOLOGIQUE SOLIDE
        </h2>

        {/* App mockup visual */}
        <div className="relative mb-16 overflow-hidden rounded-2xl" style={{ backgroundColor: '#1A1A1A', aspectRatio: '21/9' }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-3 gap-6 md:gap-12 opacity-60">
              <div className="w-48 md:w-64 rounded-xl overflow-hidden shadow-2xl" style={{ aspectRatio: '9/19', backgroundColor: '#222' }}>
                <img src="/images/about-2.jpg" alt="App mockup" className="w-full h-full object-cover" />
              </div>
              <div className="w-48 md:w-64 rounded-xl overflow-hidden shadow-2xl -mt-8" style={{ aspectRatio: '9/19', backgroundColor: '#222' }}>
                <img src="/images/about-3.jpg" alt="App mockup" className="w-full h-full object-cover" />
              </div>
              <div className="w-48 md:w-64 rounded-xl overflow-hidden shadow-2xl mt-8" style={{ aspectRatio: '9/19', backgroundColor: '#222' }}>
                <img src="/images/about-4.jpg" alt="App mockup" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* Tech stack */}
        <div className="tech-grid grid grid-cols-2 md:grid-cols-4 gap-4">
          {techStack.map((tech, i) => (
            <div
              key={i}
              className="tech-item p-6 rounded-xl border transition-all duration-300 hover:border-opacity-50"
              style={{ borderColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.02)' }}
            >
              <span className="text-label block mb-2" style={{ color: 'rgba(255,255,255,0.3)' }}>{tech.category}</span>
              <span className="text-lg font-medium text-white">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
