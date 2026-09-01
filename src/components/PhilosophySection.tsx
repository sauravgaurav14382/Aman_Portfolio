import { useEffect, useRef, useState } from "react";

const WORDS = [
  "\"Don't", "chase", "the", "market.", "Build", "the", "mindset.\""
];

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setVisible(true); });
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-40 px-8 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, var(--black) 0%, #080610 50%, var(--black) 100%)",
        minHeight: "70vh",
      }}
    >
      {/* Floating particles BG */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(59,130,246,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="relative z-10 max-w-4xl text-center">
        <div className="section-label mb-12" style={{ color: "rgba(242,239,233,0.25)" }}>
          Philosophy
        </div>

        {/* Quote words animate in */}
        <h2
          className="display-lg"
          style={{
            fontSize: "clamp(2.5rem, 7vw, 6.5rem)",
            color: "var(--white)",
            lineHeight: 1.05,
          }}
        >
          {WORDS.map((word, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                marginRight: word === "market." ? "0.3em" : "0.22em",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
                color: word === "mindset.\"" ? "var(--travel-gold)" : "var(--white)",
              }}
            >
              {word}
              {word === "market." ? <br /> : null}
            </span>
          ))}
        </h2>

        <div
          style={{
            marginTop: "2.5rem",
            opacity: visible ? 0.45 : 0,
            transition: "opacity 0.8s ease 0.9s",
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--white)",
          }}
        >
          — Aman Roy
        </div>

        <div
          style={{
            marginTop: "1rem",
            width: 1,
            height: 60,
            background: "linear-gradient(to bottom, rgba(201,169,110,0.4), transparent)",
            margin: "2rem auto 0",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease 1.1s",
          }}
        />
      </div>
    </section>
  );
}
