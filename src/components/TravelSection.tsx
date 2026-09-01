import { useEffect, useRef } from "react";

const DESTINATIONS = [
  {
    name: "BHUTAN",
    tagline: "Mountains. Roads. Quiet moments.",
    coords: "27.5142° N, 90.4336° E",
    altitude: "2,320 m",
    memory: "The roads that talk back.",
    next: "Sikkim →",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop&auto=format",
    color: "rgba(201,169,110,0.7)",
  },
  {
    name: "PATNA",
    tagline: "Where the journey begins.",
    coords: "25.5941° N, 85.1376° E",
    altitude: "53 m",
    memory: "Home. Origin. Base camp.",
    next: "Bhutan →",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=800&fit=crop&auto=format",
    color: "rgba(242,239,233,0.7)",
  },
  {
    name: "BEYOND",
    tagline: "The route ahead is unwritten.",
    coords: "??° N, ??° E",
    altitude: "∞",
    memory: "Still collecting.",
    next: "??? →",
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=800&fit=crop&auto=format",
    color: "rgba(201,169,110,0.5)",
  },
];

const MOMENTS = [
  {
    img: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=400&h=500&fit=crop&auto=format",
    cap: "Mountain fog",
    coords: "27.4°N, 89.6°E",
    rotate: -4,
    left: "5%",
    top: "5%",
    scale: 1,
  },
  {
    img: "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=360&h=460&fit=crop&auto=format",
    cap: "Open road",
    coords: "26.1°N, 87.2°E",
    rotate: 3,
    left: "30%",
    top: "15%",
    scale: 0.95,
  },
  {
    img: "https://images.unsplash.com/photo-1570458436416-b8fcccfe883f?w=380&h=480&fit=crop&auto=format",
    cap: "Valley light",
    coords: "27.5°N, 90.4°E",
    rotate: -2,
    left: "58%",
    top: "3%",
    scale: 1.05,
  },
  {
    img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=340&h=440&fit=crop&auto=format",
    cap: "Horizon",
    coords: "28.0°N, 88.5°E",
    rotate: 5,
    left: "18%",
    top: "50%",
    scale: 0.9,
  },
  {
    img: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=380&h=480&fit=crop&auto=format",
    cap: "Winding path",
    coords: "26.8°N, 90.1°E",
    rotate: -6,
    left: "50%",
    top: "45%",
    scale: 1,
  },
];

export default function TravelSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const photosRef  = useRef<HTMLDivElement>(null);

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
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Parallax scatter photos on mouse move
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const photos = photosRef.current?.querySelectorAll<HTMLElement>(".scatter-photo");
      if (!photos) return;
      const mx = (e.clientX / window.innerWidth  - 0.5) * 2;
      const my = (e.clientY / window.innerHeight - 0.5) * 2;
      photos.forEach((el, i) => {
        const depth = 0.5 + (i % 3) * 0.3;
        const rotate = parseFloat(el.dataset.rotate ?? "0");
        el.style.transform = `
          translate(${mx * depth * 18}px, ${my * depth * 12}px)
          rotate(${rotate + mx * 2}deg)
        `;
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="travel"
      ref={sectionRef}
      className="relative w-full py-32 overflow-hidden travel-noise"
      style={{
        background: "linear-gradient(180deg, var(--travel-earth) 0%, #0e0b05 30%, var(--black) 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-8">
        {/* Label + Heading */}
        <div className="section-label reveal mb-8" style={{ color: "rgba(201,169,110,0.6)" }}>
          03 — Travel
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end mb-20">
          <h2
            className="display-lg reveal reveal-delay-1"
            style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)", color: "var(--white)" }}
          >
            Beyond the chart.
            <br />
            <span style={{ color: "var(--travel-gold)" }}>Into the world.</span>
          </h2>
          <div className="reveal reveal-right reveal-delay-2">
            <p style={{ color: "rgba(242,239,233,0.5)", lineHeight: 1.8, fontFamily: "var(--font-body)" }}>
              Always curious about new places, people and views.
              The next destination is always somewhere ahead.
            </p>

            {/* Route */}
            <div className="flex items-center gap-3 mt-6">
              {["PATNA", "BHUTAN", "???"].map((loc, i) => (
                <span key={loc} className="flex items-center gap-3">
                  <span
                    className="mono-label"
                    style={{
                      color: i === 2 ? "rgba(201,169,110,0.35)" : "var(--travel-gold)",
                      fontSize: "0.62rem",
                    }}
                  >
                    {loc}
                  </span>
                  {i < 2 && (
                    <svg width="24" height="8" viewBox="0 0 24 8" fill="none">
                      <path d="M0 4H22M18 1L22 4L18 7" stroke="rgba(201,169,110,0.4)" strokeWidth="1" />
                    </svg>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Destination cards — horizontal scroll */}
        <div className="h-scroll-track pb-6 mb-24">
          {DESTINATIONS.map((d) => (
            <DestCard key={d.name} {...d} />
          ))}
        </div>

        {/* Collecting Moments */}
        <div className="section-label reveal mb-10" style={{ color: "rgba(201,169,110,0.6)" }}>
          Collecting Moments
        </div>
        <h3
          className="display-lg reveal reveal-delay-1 mb-16"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "var(--white)" }}
        >
          Frames from the road.
        </h3>

        {/* Scatter gallery */}
        <div
          ref={photosRef}
          style={{
            position: "relative",
            width: "100%",
            height: 640,
          }}
        >
          {MOMENTS.map((m, i) => (
            <div
              key={i}
              className="scatter-photo"
              data-rotate={m.rotate}
              style={{
                position: "absolute",
                left: m.left,
                top: m.top,
                transform: `rotate(${m.rotate}deg) scale(${m.scale})`,
                transition: "transform 0.25s ease-out",
                zIndex: i,
                cursor: "pointer",
                width: "clamp(140px, 20vw, 240px)",
              }}
            >
              <img
                src={m.img}
                alt={m.cap}
                style={{
                  width: "100%",
                  aspectRatio: "4/5",
                  objectFit: "cover",
                  display: "block",
                  border: "1px solid rgba(201,169,110,0.12)",
                  filter: "saturate(0.85) contrast(1.05)",
                }}
              />
              <div
                style={{
                  background: "var(--black)",
                  padding: "8px 10px",
                  borderTop: "1px solid rgba(201,169,110,0.08)",
                }}
              >
                <div className="mono-label" style={{ color: "rgba(242,239,233,0.55)", fontSize: "0.58rem" }}>
                  {m.cap}
                </div>
                <div className="mono-label" style={{ color: "rgba(201,169,110,0.45)", fontSize: "0.52rem", marginTop: 2 }}>
                  {m.coords}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DestCard({
  name, tagline, coords, altitude, memory, next, img, color,
}: (typeof DESTINATIONS)[0]) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
    const dy = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
    el.style.transform = `perspective(800px) rotateY(${dx * 6}deg) rotateX(${-dy * 4}deg)`;
  };
  const onLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "";
  };

  return (
    <div
      ref={cardRef}
      className="dest-card"
      style={{
        width: "clamp(260px, 35vw, 380px)",
        height: "520px",
        transition: "transform 0.2s ease-out",
        background: "#111",
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <img
        src={img}
        alt={`${name} — ${tagline}`}
        className="dest-card-img absolute inset-0 w-full h-full object-cover"
        style={{ filter: "saturate(0.7) contrast(1.1)" }}
      />
      <div className="dest-card-overlay" />

      <div style={{ position: "absolute", inset: 0, padding: "1.5rem", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <div className="dest-card-coords mono-label" style={{ marginBottom: 8 }}>{coords}</div>
        <h3
          className="display-lg"
          style={{ fontSize: "2.8rem", color: "var(--white)", lineHeight: 1, marginBottom: "0.5rem" }}
        >
          {name}
        </h3>
        <p
          className="display-serif"
          style={{ fontSize: "0.95rem", color: "rgba(242,239,233,0.6)", marginBottom: "1.2rem" }}
        >
          {tagline}
        </p>
        <div style={{ borderTop: "1px solid rgba(242,239,233,0.1)", paddingTop: "1rem" }} className="flex flex-col gap-1.5">
          {[
            ["ALTITUDE", altitude],
            ["MEMORY",   memory],
            ["NEXT",     next],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between items-center">
              <span className="mono-label" style={{ color: "rgba(242,239,233,0.3)", fontSize: "0.55rem" }}>{k}</span>
              <span className="mono-label" style={{ color, fontSize: "0.6rem" }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
