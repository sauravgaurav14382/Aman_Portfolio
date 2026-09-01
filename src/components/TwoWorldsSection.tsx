import { useEffect, useRef, useState } from "react";

export default function TwoWorldsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mouse, setMouse] = useState(0.5); // 0 = full trading, 1 = full travel
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setVisible(true); });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current!.getBoundingClientRect();
    setMouse((e.clientX - rect.left) / rect.width);
  };
  const onLeave = () => setMouse(0.5);

  const split = `${mouse * 100}%`;

  const tradeOpacity  = Math.max(0.15, 1 - mouse * 1.4);
  const travelOpacity = Math.max(0.15, (mouse - 0.2) * 1.4);

  return (
    <section
      id="two-worlds"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: "90vh", cursor: "none" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* Trading side */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--terminal)",
          opacity: 1,
        }}
        className="terminal-grid"
      />

      {/* Travel side revealed by mouse */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, #1a0f05 0%, #0d0805 100%)",
          clipPath: `inset(0 0 0 ${split})`,
          transition: "clip-path 0.05s linear",
        }}
      />

      {/* Center divider line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: split,
          width: 1,
          background: "rgba(242,239,233,0.2)",
          transform: "translateX(-50%)",
          transition: "left 0.05s linear",
          zIndex: 10,
          boxShadow: "0 0 20px rgba(242,239,233,0.1)",
        }}
      />

      {/* Content container */}
      <div
        className="relative z-20 h-full flex items-center justify-center"
        style={{ pointerEvents: "none" }}
      >
        <div
          className="w-full max-w-5xl mx-auto px-8"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            gap: "3rem",
            alignItems: "center",
          }}
        >
          {/* Trading column */}
          <div
            style={{
              opacity: visible ? tradeOpacity + 0.3 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            <div className="mono-label mb-6" style={{ color: "rgba(34,197,94,0.7)" }}>TRADING</div>
            <div className="flex flex-col gap-4">
              {["Candlesticks", "Charts", "Risk", "Discipline", "Patience"].map((w, i) => (
                <div
                  key={w}
                  className="display-lg"
                  style={{
                    fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
                    color: "var(--white)",
                    opacity: 0.6 - i * 0.08,
                  }}
                >
                  {w}
                </div>
              ))}
            </div>
            {/* Mini chart */}
            <svg viewBox="0 0 120 40" width="120" style={{ marginTop: "2rem", display: "block" }}>
              <polyline
                points="0,32 15,28 25,20 35,24 50,12 65,18 80,8 95,14 110,6 120,10"
                fill="none"
                stroke="var(--trade-green)"
                strokeWidth="1.5"
                opacity="0.7"
              />
            </svg>
          </div>

          {/* Center — AMAN */}
          <div style={{ textAlign: "center", opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 0.2s" }}>
            <h2
              className="display-xl"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 5rem)",
                color: "var(--white)",
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                transform: "rotate(180deg)",
                letterSpacing: "0.1em",
              }}
            >
              AMAN
            </h2>
          </div>

          {/* Travel column */}
          <div
            style={{
              opacity: visible ? travelOpacity + 0.3 : 0,
              transition: "opacity 0.3s ease",
              textAlign: "right",
            }}
          >
            <div className="mono-label mb-6" style={{ color: "rgba(201,169,110,0.7)" }}>TRAVEL</div>
            <div className="flex flex-col gap-4 items-end">
              {["Roads", "Mountains", "Maps", "People", "Experience"].map((w, i) => (
                <div
                  key={w}
                  className="display-lg"
                  style={{
                    fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
                    color: "var(--white)",
                    opacity: 0.6 - i * 0.08,
                  }}
                >
                  {w}
                </div>
              ))}
            </div>
            {/* Mini map dots */}
            <svg viewBox="0 0 120 40" width="120" style={{ marginTop: "2rem", marginLeft: "auto", display: "block" }}>
              {[[15, 28], [40, 18], [65, 25], [90, 12], [112, 20]].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="3" fill="var(--travel-gold)" opacity="0.6" />
              ))}
              <polyline
                points="15,28 40,18 65,25 90,12 112,20"
                fill="none"
                stroke="var(--travel-gold)"
                strokeWidth="1"
                strokeDasharray="4 3"
                opacity="0.4"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Label */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: 0.25,
          zIndex: 20,
          textAlign: "center",
        }}
      >
        <div className="mono-label" style={{ color: "var(--white)", letterSpacing: "0.2em" }}>
          Move cursor left ← → right
        </div>
      </div>
    </section>
  );
}
