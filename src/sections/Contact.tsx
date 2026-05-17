import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

type Status = 'idle' | 'sending' | 'success' | 'error';

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submittedName, setSubmittedName] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const firstName = (submittedName.trim().split(/\s+/)[0] || '').toLowerCase();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

    if (!serviceId || !templateId || !publicKey || !formRef.current) {
      setStatus('error');
      setErrorMsg('Configuration manquante. Veuillez réessayer plus tard.');
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, { publicKey });
      setSubmittedName(formData.name);
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err instanceof Error && err.message
          ? err.message
          : "Une erreur est survenue. Veuillez réessayer ou nous contacter directement."
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
    if (status === 'error') setStatus('idle');
  };

  const resetForm = () => {
    setSubmittedName('');
    setStatus('idle');
    setErrorMsg('');
  };

  return (
    <section ref={sectionRef} id="contact" className="relative py-20 md:py-32" style={{ backgroundColor: '#111111' }}>
      <style>{`
        .contact-success {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 24px;
          padding: 8px 0;
          animation: contact-success-in 600ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes contact-success-in {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .contact-success-icon {
          width: 72px;
          height: 72px;
          display: block;
        }
        .contact-success-icon circle {
          stroke-dasharray: 240;
          stroke-dashoffset: 240;
          animation: contact-success-circle 700ms cubic-bezier(0.22, 1, 0.36, 1) 100ms forwards;
        }
        .contact-success-icon path {
          stroke-dasharray: 60;
          stroke-dashoffset: 60;
          animation: contact-success-check 500ms cubic-bezier(0.22, 1, 0.36, 1) 700ms forwards;
        }
        @keyframes contact-success-circle {
          to { stroke-dashoffset: 0; }
        }
        @keyframes contact-success-check {
          to { stroke-dashoffset: 0; }
        }

        .contact-success-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          line-height: 1;
          font-weight: 400;
          color: #fff;
          font-family: Georgia, 'Times New Roman', 'Cormorant Garamond', serif;
          margin: 0;
          letter-spacing: -0.01em;
        }
        .contact-success-name {
          font-style: italic;
          color: #C4591A;
        }

        .contact-success-body {
          font-size: 1rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.7);
          max-width: 440px;
          margin: 0;
        }

        .contact-success-link {
          background: transparent;
          border: 0;
          padding: 0;
          margin-top: 8px;
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #C4591A;
          cursor: pointer;
          position: relative;
          line-height: 1.4;
        }
        .contact-success-link::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -4px;
          height: 1px;
          background: currentColor;
          opacity: 0.5;
          transition: opacity 200ms ease;
        }
        .contact-success-link:hover::after {
          opacity: 1;
        }
        .contact-success-link:focus-visible {
          outline: 2px solid #C4591A;
          outline-offset: 4px;
          border-radius: 2px;
        }

        @media (prefers-reduced-motion: reduce) {
          .contact-success,
          .contact-success-icon circle,
          .contact-success-icon path { animation: none; }
          .contact-success-icon circle { stroke-dashoffset: 0; }
          .contact-success-icon path { stroke-dashoffset: 0; }
        }
      `}</style>
      <div className="container-site">
        {/* Giant title */}
        <div className="contact-title mb-16 md:mb-24 overflow-hidden">
          <h2 className="font-display text-white" style={{ fontSize: 'clamp(4rem, 14vw, 14rem)', lineHeight: 0.85 }}>
            TRAVAILLONS<br />ENSEMBLE
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Form / Success card */}
          {status === 'success' ? (
            <div className="contact-form contact-success" role="status" aria-live="polite">
              <svg
                className="contact-success-icon"
                viewBox="0 0 80 80"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle cx="40" cy="40" r="38" fill="none" stroke="#C4591A" strokeWidth="1" />
                <path
                  d="M28 41 L37 50 L54 32"
                  fill="none"
                  stroke="#C4591A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <h3 className="contact-success-title">
                Merci{firstName ? ',' : ''}
                {firstName && (
                  <>
                    {' '}
                    <span className="contact-success-name">{firstName}</span>
                  </>
                )}
                .
              </h3>

              <p className="contact-success-body">
                Votre demande a bien été reçue. Un membre de l'équipe DEV-MAROC
                vous contactera dans les prochaines vingt-quatre heures.
              </p>

              <button
                type="button"
                onClick={resetForm}
                className="contact-success-link"
              >
                ENVOYER UNE AUTRE DEMANDE
              </button>
            </div>
          ) : (
          <form ref={formRef} className="contact-form space-y-6" onSubmit={handleSubmit} noValidate>
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
            <div className="flex flex-col gap-3">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="px-8 py-3 rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed self-start"
                style={{ backgroundColor: '#C4591A', color: '#fff' }}
              >
                {status === 'sending' ? 'ENVOI EN COURS...' : 'CLIQUEZ-ICI'}
              </button>

              {status === 'error' && (
                <p className="text-sm" style={{ color: '#ff8170' }}>
                  {errorMsg}
                </p>
              )}
            </div>
          </form>
          )}

          {/* Contact info */}
          <div className="contact-info">
            <span className="text-label block mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>PARLONS-EN</span>
            <p className="text-lg mb-12" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '400px' }}>
              Vous êtes à un clic de concrétiser votre projet. Remplissez le formulaire pour nous donner plus de détails et nous vous répondrons rapidement.
            </p>

            <span className="text-label block mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>NOS COORDONNÉES</span>
            <div className="space-y-4 mb-10">
              <a href="#" className="flex items-center gap-3 text-white transition-colors duration-300 hover:text-[#e85d26]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>Casablanca, Maroc</span>
              </a>
              <a href="tel:+212625869380" className="flex items-center gap-3 text-white transition-colors duration-300 hover:text-[#e85d26]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span>+212 6 25 86 93 80</span>
              </a>
              <a href="mailto:contact.devmaroc@gmail.com" className="flex items-center gap-3 text-white transition-colors duration-300 hover:text-[#e85d26]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span>contact.devmaroc@gmail.com</span>
              </a>
            </div>

            <span className="text-label block mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>SOCIAL</span>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/devweb.maroc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram DEV-MAROC"
                className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-full text-white transition-colors duration-300 hover:border-[#e85d26] hover:text-[#e85d26]"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>
              <a
                href="https://wa.me/212625869380"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp DEV-MAROC"
                className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-full text-white transition-colors duration-300 hover:border-[#e85d26] hover:text-[#e85d26]"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.134 1.585 5.929L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
