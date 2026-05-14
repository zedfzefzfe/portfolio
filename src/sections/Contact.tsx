import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(section.querySelector('.contact-title'), { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 80%' } });
      gsap.fromTo(section.querySelector('.contact-form'), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 75%' } });
      gsap.fromTo(section.querySelector('.contact-info'), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.1, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 75%' } });
    }, section);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setFormData({ name: '', email: '', phone: '', message: '' }); setSubmitted(false); }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
  };

  return (
    <section ref={sectionRef} id="contact" className="relative py-20 md:py-32" style={{ backgroundColor: '#111111' }}>
      <div className="container-site">
        {/* Giant title */}
        <div className="contact-title mb-16 md:mb-24 overflow-hidden">
          <h2 className="font-display text-white" style={{ fontSize: 'clamp(4rem, 14vw, 14rem)', lineHeight: 0.85 }}>
            TRAVAILLONS<br />ENSEMBLE
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Form */}
          <form className="contact-form space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="text-label block mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>Votre nom *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="input-masolide" placeholder="Ex: Jean Dupont" />
            </div>
            <div>
              <label className="text-label block mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>Votre e-mail *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="input-masolide" placeholder="Ex: salim.saad@email.com" />
            </div>
            <div>
              <label className="text-label block mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>Votre téléphone *</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="input-masolide" placeholder="Ex: 06 XX XX XX XX" />
            </div>
            <div>
              <label className="text-label block mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>Votre message *</label>
              <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} className="input-masolide resize-none" placeholder="Bonjour, j'aimerais discuter de la création d'un site web pour mon entreprise..." />
            </div>
            <button
              type="submit"
              disabled={submitted}
              className="px-8 py-3 rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: '#C4591A', color: '#fff' }}
            >
              {submitted ? 'MESSAGE ENVOYÉ ✓' : 'CLIQUEZ-ICI'}
            </button>
          </form>

          {/* Contact info */}
          <div className="contact-info">
            <span className="text-label block mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>PARLONS-EN</span>
            <p className="text-lg mb-12" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '400px' }}>
              Vous êtes à un clic de concrétiser votre projet. Remplissez le formulaire pour nous donner plus de détails et nous vous répondrons rapidement.
            </p>

            <span className="text-label block mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>NOS COORDONNÉES</span>
            <div className="space-y-4 mb-10">
              <a href="#" className="flex items-center gap-3 text-white hover:opacity-70 transition-opacity">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>Casablanca, Maroc</span>
              </a>
              <a href="tel:+212600000000" className="flex items-center gap-3 text-white hover:opacity-70 transition-opacity">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span>+212 6 00 00 00 00</span>
              </a>
              <a href="mailto:contact@lumiatechnologie.com" className="flex items-center gap-3 text-white hover:opacity-70 transition-opacity">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span>contact@lumiatechnologie.com</span>
              </a>
            </div>

            <span className="text-label block mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>SOCIAL</span>
            <div className="flex gap-4">
              <a href="https://instagram.com/devweb.maroc" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center border rounded-full transition-all duration-300 hover:border-opacity-100" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>
              <a href="https://wa.me/212600000000" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center border rounded-full transition-all duration-300 hover:border-opacity-100" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.134 1.585 5.929L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
