import { useEffect, useRef } from "react";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll(".reveal, .reveal-left").forEach((el) => el.classList.add("visible"));
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
      id="contact"
      ref={sectionRef}
      className="relative w-full py-40 px-8"
      style={{
        background: "linear-gradient(180deg, var(--black) 0%, #050508 100%)",
        borderTop: "1px solid rgba(242,239,233,0.05)",
      }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="section-label reveal mb-10" style={{ color: "rgba(242,239,233,0.25)" }}>
          05 — Contact
        </div>

        <h2
          className="display-xl reveal reveal-delay-1"
          style={{ fontSize: "clamp(4rem, 14vw, 12rem)", color: "var(--white)", lineHeight: 1 }}
        >
          SAY
          <br />
          HELLO.
        </h2>

        <p
          className="reveal reveal-delay-2"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1.05rem",
            color: "rgba(242,239,233,0.45)",
            lineHeight: 1.85,
            maxWidth: 480,
            marginTop: "2rem",
            marginBottom: "3rem",
          }}
        >
          Whether it&apos;s markets, travel or simply a good conversation — let&apos;s connect.
        </p>

        <div className="flex flex-wrap gap-4 reveal reveal-delay-3">
          <a
            href="https://www.instagram.com/amanroy8751/"
            target="_blank"
            rel="noopener noreferrer"
            className="mag-btn mag-btn-gold"
          >
            Let&apos;s Connect ↗
          </a>
        </div>

        {/* Info row */}
        <div
          className="reveal reveal-delay-4 flex flex-wrap gap-12 mt-16"
          style={{ borderTop: "1px solid rgba(242,239,233,0.07)", paddingTop: "2rem" }}
        >
          <div>
            <div className="mono-label mb-2" style={{ color: "rgba(242,239,233,0.25)", fontSize: "0.58rem" }}>Instagram</div>
            <a
              href="https://www.instagram.com/amanroy8751/"
              target="_blank"
              rel="noopener noreferrer"
              className="mono-label"
              style={{ color: "var(--travel-gold)", letterSpacing: "0.1em", textDecoration: "none" }}
            >
              @amanroy8751
            </a>
          </div>
          <div>
            <div className="mono-label mb-2" style={{ color: "rgba(242,239,233,0.25)", fontSize: "0.58rem" }}>Location</div>
            <div className="mono-label" style={{ color: "rgba(242,239,233,0.5)", letterSpacing: "0.1em" }}>
              ⌖ Patna / Indo-Bhutan
            </div>
          </div>
          <div>
            <div className="mono-label mb-2" style={{ color: "rgba(242,239,233,0.25)", fontSize: "0.58rem" }}>Status</div>
            <div className="mono-label flex items-center gap-2" style={{ color: "var(--trade-green)", letterSpacing: "0.1em" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--trade-green)", boxShadow: "0 0 6px var(--trade-green)", display: "inline-block" }} />
              Available
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
