export function TickerBanner() {
  const items = Array.from({ length: 8 }, () => ({
    label: "OFFRE LIMITÉE :",
    text: "DEMANDEZ UN DEVIS GRATUIT AUJOURD'HUI",
  }));

  const time = `${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')}`;

  return (
    <>
      {/* Spacer so content below isn't hidden behind the fixed bar */}
      <div className="h-10" />

      <section
        className="fixed top-0 left-0 right-0 z-50 overflow-hidden py-2.5 border-b"
        style={{ backgroundColor: '#0e0e0e', borderColor: 'rgba(255,255,255,0.08)' }}
      >
        <div className="flex animate-ticker whitespace-nowrap">
          {[...items, ...items].map((item, i) => (
            <span key={i} className="flex items-center gap-3 mx-6 shrink-0">
              <span className="text-xs font-bold tracking-widest" style={{ color: '#C4591A' }}>
                {item.label}
              </span>
              <span className="text-xs font-medium tracking-widest text-white">
                {item.text}
              </span>
              <span
                className="text-xs px-2 py-0.5 rounded font-mono font-semibold text-white"
                style={{ backgroundColor: '#C4591A' }}
              >
                {time}
              </span>
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
