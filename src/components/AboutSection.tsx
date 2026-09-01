import { useEffect, useRef } from "react";

const TAGS = [
  { label: "TRADER",   delay: "0s",   dur: "3.8s" },
  { label: "TRAVELLER",delay: "0.6s",  dur: "4.2s" },
  { label: "LEARNER",  delay: "1.1s",  dur: "3.5s" },
  { label: "EXPLORER", delay: "0.3s",  dur: "4.6s" },
];

export default function AboutSection() {
  const imgRef    = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      el.style.transform = `perspective(800px) rotateY(${dx * 8}deg) rotateX(${-dy * 6}deg) scale(1.02)`;
    };
    const onLeave = () => {
      el.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) => {
              el.classList.add("visible");
            });
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
      id="about"
      ref={sectionRef}
      className="relative w-full py-32 px-8"
      style={{ background: "var(--black)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <div className="section-label reveal mb-16">01 — About</div>

        {/* Headline */}
        <h2
          className="display-lg reveal reveal-delay-1"
          style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", color: "var(--white)", marginBottom: "4rem" }}
        >
          Learning the market.
          <br />
          <span style={{ color: "transparent", WebkitTextStroke: "1px rgba(242,239,233,0.3)" }}>
            Living the moment.
          </span>
        </h2>

        {/* Split layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <div className="flex flex-col gap-8">
            <p
              className="reveal reveal-left reveal-delay-2"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1.05rem",
                lineHeight: 1.85,
                color: "rgba(242,239,233,0.65)",
              }}
            >
              I&apos;m Aman Roy, a second-year graduation student with a strong
              interest in trading and a love for travelling.
            </p>
            <p
              className="reveal reveal-left reveal-delay-3"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1.05rem",
                lineHeight: 1.85,
                color: "rgba(242,239,233,0.65)",
              }}
            >
              I enjoy understanding price movement, improving my discipline
              and turning every experience into something I can learn from.
            </p>

            {/* Location */}
            <div
              className="reveal reveal-left reveal-delay-4 flex items-center gap-3"
              style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}
            >
              <span style={{ color: "var(--travel-gold)", fontSize: "1rem" }}>⌖</span>
              <span
                className="mono-label"
                style={{ color: "rgba(242,239,233,0.5)", letterSpacing: "0.18em" }}
              >
                Patna / Indo-Bhutan
              </span>
            </div>

            {/* Floating tags */}
            <div className="flex flex-wrap gap-3 mt-2 reveal reveal-delay-4">
              {TAGS.map((t) => (
                <span
                  key={t.label}
                  className="float-tag"
                  style={{ animationDuration: t.dur, animationDelay: t.delay }}
                >
                  {t.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right — photo card */}
          <div className="relative flex justify-center reveal reveal-right reveal-delay-2">
            {/* Decorative border offset */}
            <div
              style={{
                position: "absolute",
                top: -12,
                right: -12,
                width: "100%",
                maxWidth: 420,
                height: "100%",
                border: "1px solid rgba(201,169,110,0.15)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />

            <div
              ref={imgRef}
              style={{
                position: "relative",
                width: "100%",
                maxWidth: 420,
                transition: "transform 0.15s ease-out",
                transformStyle: "preserve-3d",
                zIndex: 1,
                cursor: "none",
              }}
            >
              <img
                src="/aman-profile.png"
                alt="Aman Roy — trader and traveller on a yacht with trading charts and city landmarks in background"
                style={{
                  width: "100%",
                  aspectRatio: "3/4",
                  objectFit: "cover",
                  objectPosition: "top center",
                  display: "block",
                  filter: "contrast(1.05) saturate(0.9)",
                }}
              />

              {/* Overlay gradient */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(7,7,10,0.6) 0%, transparent 50%)",
                  pointerEvents: "none",
                }}
              />

              {/* Metadata chip */}
              <div
                style={{
                  position: "absolute",
                  bottom: 20,
                  left: 20,
                }}
              >
                <div className="mono-label" style={{ color: "var(--travel-gold)", marginBottom: 4 }}>
                  Aman Roy
                </div>
                <div className="mono-label" style={{ color: "rgba(242,239,233,0.4)", fontSize: "0.58rem" }}>
                  Trader · Traveller · 2nd Year
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
