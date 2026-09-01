import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    num: "01",
    title: "TRADING",
    year: "2023",
    body: "Studying price action, market structure and risk management.",
    color: "var(--trade-green)",
  },
  {
    num: "02",
    title: "EDUCATION",
    year: "2024",
    body: "Currently pursuing graduation — 2nd Year.",
    color: "var(--white)",
  },
  {
    num: "03",
    title: "TRAVEL",
    year: "2025",
    body: "Discovering new places, people and perspectives.",
    color: "var(--travel-gold)",
  },
  {
    num: "04",
    title: "LEARN",
    year: "2026 →",
    body: "Continuously building knowledge through experience.",
    color: "rgba(242,239,233,0.4)",
  },
];

export default function JourneySection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [drawn, setDrawn]     = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            setTimeout(() => setDrawn(true), 300);
            e.target.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative w-full py-32 px-8"
      style={{ background: "var(--black)" }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="section-label reveal mb-8" style={{ color: "rgba(242,239,233,0.3)" }}>
          04 — Journey
        </div>

        <h2
          className="display-lg reveal reveal-delay-1 mb-20"
          style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", color: "var(--white)" }}
        >
          Still in the
          <br />
          <span className="display-serif" style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", color: "var(--travel-gold)" }}>
            making.
          </span>
        </h2>

        {/* Timeline */}
        <div className="relative pl-10">
          {/* Vertical line */}
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: "rgba(242,239,233,0.06)" }}>
            <div
              ref={lineRef}
              className={`timeline-line ${drawn ? "drawn" : ""}`}
              style={{ background: "linear-gradient(to bottom, var(--trade-green), var(--travel-gold))" }}
            />
          </div>

          <div className="flex flex-col gap-16">
            {STEPS.map((s, i) => (
              <div
                key={s.num}
                className="reveal"
                style={{
                  transitionDelay: `${0.15 + i * 0.18}s`,
                  position: "relative",
                  opacity: visible ? 1 : 0,
                }}
              >
                {/* Dot */}
                <div
                  style={{
                    position: "absolute",
                    left: -43,
                    top: 6,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: s.color,
                    boxShadow: `0 0 12px ${s.color}`,
                    transition: `all 0.4s ease ${0.3 + i * 0.18}s`,
                    opacity: drawn ? 1 : 0,
                    transform: drawn ? "scale(1)" : "scale(0)",
                  }}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                  <div>
                    <div className="mono-label" style={{ color: s.color, marginBottom: 4 }}>{s.num}</div>
                    <div className="mono-label" style={{ color: "rgba(242,239,233,0.2)", fontSize: "0.58rem" }}>{s.year}</div>
                  </div>
                  <div className="md:col-span-2">
                    <h3
                      className="display-lg"
                      style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--white)", marginBottom: "0.5rem" }}
                    >
                      {s.title}
                    </h3>
                    <p style={{ fontFamily: "var(--font-body)", color: "rgba(242,239,233,0.45)", lineHeight: 1.75 }}>
                      {s.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
