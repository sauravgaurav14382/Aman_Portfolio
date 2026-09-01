import { useEffect, useRef, useState } from "react";

// Generate fake OHLC data
function genCandles(n: number) {
  const candles = [];
  let price = 1820;
  for (let i = 0; i < n; i++) {
    const open  = price;
    const move  = (Math.random() - 0.46) * 28;
    const close = open + move;
    const high  = Math.max(open, close) + Math.random() * 14;
    const low   = Math.min(open, close) - Math.random() * 14;
    candles.push({ open, close, high, low });
    price = close;
  }
  return candles;
}

const CANDLES = genCandles(40);
const SKILLS  = [
  { label: "Price Action",     pct: 78 },
  { label: "Market Structure", pct: 65 },
  { label: "Risk Management",  pct: 72 },
  { label: "Discipline",       pct: 81 },
  { label: "Consistency",      pct: 69 },
];
const MINDSET = [
  { num: "01", title: "Patience",   body: "Wait for the right setup. Not every candle is a trade." },
  { num: "02", title: "Discipline", body: "Follow the plan, not emotions. Rules exist for a reason." },
  { num: "03", title: "Risk",       body: "Protect capital before chasing returns. Survive first." },
];
const TICKER = [
  "EUR/USD  1.0842 ▲", "GBP/USD  1.2634 ▼", "USD/JPY  149.21 ▲",
  "XAU/USD  2041.5 ▲", "BTC/USD  43,210 ▼", "NAS100  17,841 ▲",
  "EUR/USD  1.0842 ▲", "GBP/USD  1.2634 ▼", "USD/JPY  149.21 ▲",
  "XAU/USD  2041.5 ▲", "BTC/USD  43,210 ▼", "NAS100  17,841 ▲",
];

interface Mouse { x: number; y: number }

export default function TradingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef     = useRef<SVGSVGElement>(null);
  const [mouse, setMouse]   = useState<Mouse | null>(null);
  const [visible, setVisible] = useState(false);
  const [skillsAnim, setSkillsAnim] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            setTimeout(() => setSkillsAnim(true), 600);
            e.target.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) => {
              el.classList.add("visible");
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  // Chart dimensions
  const W = 700, H = 280;
  const PADDING = { l: 40, r: 20, t: 20, b: 30 };
  const allPrices = CANDLES.flatMap((c) => [c.high, c.low]);
  const minP = Math.min(...allPrices) - 10;
  const maxP = Math.max(...allPrices) + 10;
  const toY  = (p: number) => PADDING.t + ((maxP - p) / (maxP - minP)) * (H - PADDING.t - PADDING.b);
  const colW  = (W - PADDING.l - PADDING.r) / CANDLES.length;

  // Line path (close prices)
  const linePts = CANDLES.map((c, i) => {
    const x = PADDING.l + i * colW + colW / 2;
    const y = toY(c.close);
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");

  // Price at cursor
  const cursorPrice = mouse
    ? (maxP - ((mouse.y - PADDING.t) / (H - PADDING.t - PADDING.b)) * (maxP - minP)).toFixed(2)
    : null;

  return (
    <section
      id="trading"
      ref={sectionRef}
      className="relative w-full py-32 overflow-hidden terminal-grid"
      style={{ background: "var(--terminal)" }}
    >
      {/* Top ticker */}
      <div
        className="w-full overflow-hidden border-b border-t"
        style={{
          borderColor: "rgba(34,197,94,0.15)",
          background: "rgba(34,197,94,0.03)",
          padding: "8px 0",
        }}
      >
        <div className="ticker-inner flex gap-12 whitespace-nowrap">
          {TICKER.map((t, i) => (
            <span
              key={i}
              className="mono-label"
              style={{
                color: t.includes("▲") ? "var(--trade-green)" : "var(--trade-red)",
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 mt-20">
        {/* Label + Heading */}
        <div className="section-label reveal mb-8" style={{ color: "rgba(34,197,94,0.6)" }}>
          02 — Trading
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end mb-20">
          <div>
            <h2
              className="display-lg reveal reveal-delay-1"
              style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)", color: "var(--white)" }}
            >
              Read the market.
              <br />
              <span style={{ color: "var(--trade-green)" }}>Build the mindset.</span>
            </h2>
          </div>
          <p
            className="reveal reveal-right reveal-delay-2"
            style={{ color: "rgba(242,239,233,0.5)", lineHeight: 1.8, fontFamily: "var(--font-body)" }}
          >
            Studying price action, market structure and risk management
            while building consistency one trade at a time.
          </p>
        </div>

        {/* Chart + Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* Chart (spans 2 cols) */}
          <div
            className="lg:col-span-2 reveal"
            style={{
              border: "1px solid rgba(34,197,94,0.12)",
              background: "rgba(0,0,0,0.4)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Chart header */}
            <div
              className="flex items-center justify-between px-4 py-2"
              style={{ borderBottom: "1px solid rgba(34,197,94,0.1)" }}
            >
              <span className="mono-label" style={{ color: "var(--trade-green)" }}>
                EUR/USD · 1H · PRICE ACTION
              </span>
              <span className="mono-label" style={{ color: "rgba(242,239,233,0.3)" }}>
                LIVE SIMULATION
              </span>
            </div>

            <svg
              ref={svgRef}
              viewBox={`0 0 ${W} ${H}`}
              width="100%"
              style={{ display: "block", cursor: "crosshair" }}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setMouse(null)}
            >
              {/* Horizontal grid */}
              {[0, 0.25, 0.5, 0.75, 1].map((t) => {
                const y = PADDING.t + t * (H - PADDING.t - PADDING.b);
                const price = maxP - t * (maxP - minP);
                return (
                  <g key={t}>
                    <line x1={PADDING.l} y1={y} x2={W - PADDING.r} y2={y} stroke="rgba(34,197,94,0.06)" strokeWidth="1" />
                    <text x={PADDING.l - 4} y={y + 4} textAnchor="end" fontSize="8" fill="rgba(242,239,233,0.25)" fontFamily="JetBrains Mono">
                      {price.toFixed(0)}
                    </text>
                  </g>
                );
              })}

              {/* Candlesticks */}
              {visible && CANDLES.map((c, i) => {
                const x  = PADDING.l + i * colW + colW / 2;
                const up = c.close >= c.open;
                const bodyTop    = toY(Math.max(c.open, c.close));
                const bodyBot    = toY(Math.min(c.open, c.close));
                const bodyHeight = Math.max(1, bodyBot - bodyTop);
                return (
                  <g key={i}>
                    <line
                      x1={x} y1={toY(c.high)} x2={x} y2={toY(c.low)}
                      stroke={up ? "#22c55e" : "#ef4444"}
                      strokeWidth="1"
                      opacity="0.7"
                    />
                    <rect
                      x={x - colW * 0.32}
                      y={bodyTop}
                      width={colW * 0.64}
                      height={bodyHeight}
                      fill={up ? "#22c55e" : "#ef4444"}
                      opacity="0.85"
                    />
                  </g>
                );
              })}

              {/* Close price line */}
              {visible && (
                <path
                  d={linePts}
                  fill="none"
                  stroke="rgba(59,130,246,0.5)"
                  strokeWidth="1.5"
                  className="glow-line"
                  style={{ filter: "drop-shadow(0 0 4px rgba(59,130,246,0.5))" }}
                />
              )}

              {/* Mouse crosshair */}
              {mouse && (
                <g>
                  <line x1={mouse.x} y1={PADDING.t} x2={mouse.x} y2={H - PADDING.b} stroke="rgba(242,239,233,0.2)" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1={PADDING.l} y1={mouse.y} x2={W - PADDING.r} y2={mouse.y} stroke="rgba(242,239,233,0.2)" strokeWidth="1" strokeDasharray="4 4" />
                  {/* Price badge */}
                  <rect x={W - PADDING.r - 54} y={mouse.y - 9} width={52} height={18} fill="#1a4a3a" rx="2" />
                  <text x={W - PADDING.r - 28} y={mouse.y + 4} textAnchor="middle" fontSize="9" fill="var(--trade-green)" fontFamily="JetBrains Mono">
                    {cursorPrice}
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Skills card */}
          <div
            className="reveal reveal-right reveal-delay-2"
            style={{
              border: "1px solid rgba(242,239,233,0.07)",
              background: "rgba(255,255,255,0.02)",
              padding: "1.5rem",
            }}
          >
            <div className="mono-label mb-6" style={{ color: "var(--trade-green)" }}>
              TRADING / 01
            </div>
            <div className="flex flex-col gap-5">
              {SKILLS.map((s) => (
                <div key={s.label}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="mono-label" style={{ color: "rgba(242,239,233,0.55)", fontSize: "0.62rem" }}>
                      {s.label}
                    </span>
                    <span className="mono-label" style={{ color: "var(--trade-green)", fontSize: "0.62rem" }}>
                      {skillsAnim ? s.pct : 0}%
                    </span>
                  </div>
                  <div style={{ height: 2, background: "rgba(255,255,255,0.07)", position: "relative" }}>
                    <div
                      style={{
                        height: "100%",
                        background: "var(--trade-green)",
                        width: skillsAnim ? `${s.pct}%` : "0%",
                        transition: "width 1.2s cubic-bezier(0.16,1,0.3,1)",
                        boxShadow: "0 0 6px rgba(34,197,94,0.4)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* The Trading Mindset */}
        <div className="reveal mb-8">
          <h3
            className="display-lg"
            style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)", color: "var(--white)" }}
          >
            The Trading Mindset
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MINDSET.map((m, i) => (
            <MindsetCard key={m.num} {...m} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MindsetCard({ num, title, body, delay }: { num: string; title: string; body: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
    const dy = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
    el.style.transform = `perspective(600px) rotateY(${dx * 12}deg) rotateX(${-dy * 8}deg) translateZ(8px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div
      ref={ref}
      className="mindset-card reveal"
      style={{ padding: "2rem", transitionDelay: `${delay}s` }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="mono-label mb-4" style={{ color: "rgba(34,197,94,0.5)" }}>{num}</div>
      <h4
        className="display-serif"
        style={{ fontSize: "1.6rem", color: "var(--white)", marginBottom: "0.75rem" }}
      >
        {title}
      </h4>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "rgba(242,239,233,0.45)", lineHeight: 1.75 }}>
        {body}
      </p>
    </div>
  );
}
