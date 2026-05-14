export function AngledMarquee() {
  const text = "PLUS DE 8 ANS D'EXPÉRIENCE";
  const arrows = ["→", "←"];

  return (
    <section className="relative py-8 md:py-12 overflow-hidden" style={{ backgroundColor: '#111111' }}>
      <div className="relative" style={{ transform: 'rotate(-3deg)', marginLeft: '-5%', marginRight: '-5%', width: '110%' }}>
        {/* First strip */}
        <div className="flex animate-ticker whitespace-nowrap py-3" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="flex items-center gap-6 mx-6 shrink-0">
              <span className="font-display text-white" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
                {text}
              </span>
              <span className="text-white text-2xl">{arrows[i % 2]}</span>
            </span>
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={`dup-${i}`} className="flex items-center gap-6 mx-6 shrink-0">
              <span className="font-display text-white" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
                {text}
              </span>
              <span className="text-white text-2xl">{arrows[i % 2]}</span>
            </span>
          ))}
        </div>

        {/* Second strip - opposite direction */}
        <div className="flex animate-ticker whitespace-nowrap py-3 mt-2" style={{ backgroundColor: 'rgba(255,255,255,0.03)', animationDirection: 'reverse' }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="flex items-center gap-6 mx-6 shrink-0">
              <span className="text-white text-2xl">{arrows[(i + 1) % 2]}</span>
              <span className="font-display" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'rgba(255,255,255,0.5)' }}>
                {text}
              </span>
            </span>
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={`dup-${i}`} className="flex items-center gap-6 mx-6 shrink-0">
              <span className="text-white text-2xl">{arrows[(i + 1) % 2]}</span>
              <span className="font-display" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'rgba(255,255,255,0.5)' }}>
                {text}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
