import { useEffect, useRef } from "react";

export default function SocialSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
          }
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-32 px-8"
      style={{ background: "var(--black)" }}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <div className="section-label reveal mb-8" style={{ color: "rgba(201,169,110,0.6)" }}>
          Follow the Journey
        </div>

        <h2
          className="display-lg reveal reveal-delay-1 mb-16"
          style={{ fontSize: "clamp(2rem, 6vw, 5rem)", color: "var(--white)" }}
        >
          The story continues
          <br />
          <span style={{ color: "var(--travel-gold)" }}>on Instagram.</span>
        </h2>

        {/* Instagram card */}
        <a
          href="https://www.instagram.com/amanroy8751/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-card reveal reveal-delay-2"
          style={{
            display: "block",
            width: "100%",
            maxWidth: 520,
            textDecoration: "none",
            position: "relative",
          }}
        >
          {/* BG */}
          <div
            style={{
              height: 300,
              background: "linear-gradient(135deg, #1a0d00 0%, #0d0810 50%, #001a0d 100%)",
              position: "relative",
              overflow: "hidden",
            }}
            className="social-card-img"
          >
            {/* Grid decoration */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "linear-gradient(rgba(201,169,110,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.04) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            {/* Center content */}
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
              {/* IG icon */}
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="rgba(201,169,110,0.6)" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="5" stroke="rgba(201,169,110,0.6)" strokeWidth="1.5" />
                <circle cx="17.5" cy="6.5" r="1" fill="rgba(201,169,110,0.6)" />
              </svg>

              <div
                className="display-lg"
                style={{ fontSize: "2rem", color: "var(--white)", letterSpacing: "0.05em" }}
              >
                @amanroy8751
              </div>

              <div className="mono-label" style={{ color: "rgba(242,239,233,0.3)" }}>
                Trading · Travel · Life
              </div>
            </div>

            {/* Floating FOLLOW badge */}
            <div
              style={{
                position: "absolute",
                bottom: 20,
                right: 20,
                background: "var(--travel-gold)",
                color: "var(--black)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                padding: "8px 18px",
                fontWeight: 600,
              }}
            >
              Follow ↗
            </div>
          </div>

          {/* Bottom strip */}
          <div
            style={{
              padding: "1rem 1.5rem",
              borderTop: "1px solid rgba(201,169,110,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span className="mono-label" style={{ color: "rgba(242,239,233,0.4)" }}>
              instagram.com/amanroy8751
            </span>
            <span style={{ color: "var(--travel-gold)", fontSize: "1rem" }}>↗</span>
          </div>
        </a>
      </div>
    </section>
  );
}
