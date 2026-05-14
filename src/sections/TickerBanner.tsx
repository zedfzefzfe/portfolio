export function TickerBanner() {
  const items = Array.from({ length: 8 }, () => "OFFRE LIMITÉE : DEMANDEZ UN DEVIS GRATUIT AUJOURD'HUI");

  return (
    <section className="relative overflow-hidden py-3" style={{ backgroundColor: '#111111' }}>
      <div className="flex animate-ticker whitespace-nowrap">
        {items.map((text, i) => (
          <span key={i} className="flex items-center gap-4 mx-4 shrink-0">
            <span className="text-sm font-medium tracking-wide" style={{ color: '#C4591A' }}>
              {text}
            </span>
            <span className="text-xs px-2 py-1 rounded font-mono" style={{ backgroundColor: 'rgba(196, 89, 26, 0.15)', color: '#C4591A' }}>
              {new Date().getHours().toString().padStart(2, '0')}:{new Date().getMinutes().toString().padStart(2, '0')}
            </span>
          </span>
        ))}
        {items.map((text, i) => (
          <span key={`dup-${i}`} className="flex items-center gap-4 mx-4 shrink-0">
            <span className="text-sm font-medium tracking-wide" style={{ color: '#C4591A' }}>
              {text}
            </span>
            <span className="text-xs px-2 py-1 rounded font-mono" style={{ backgroundColor: 'rgba(196, 89, 26, 0.15)', color: '#C4591A' }}>
              {new Date().getHours().toString().padStart(2, '0')}:{new Date().getMinutes().toString().padStart(2, '0')}
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
