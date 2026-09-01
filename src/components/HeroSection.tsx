import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number; z: number;
  vx: number; vy: number;
  size: number; opacity: number;
  type: "dot" | "cross" | "digit";
  char?: string;
}

const DIGITS = ["0.382", "1.618", "▲", "▼", "+2.4%", "−1.8%", "◆", "⊕", "27.3°N", "89.6°E"];

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Init particles
    const count = Math.min(120, Math.floor(window.innerWidth / 12));
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    particlesRef.current = Array.from({ length: count }, (_, i) => {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 180 + Math.random() * 140;
      const typeRoll = Math.random();
      return {
        x: cx + r * Math.sin(phi) * Math.cos(theta),
        y: cy + r * Math.sin(phi) * Math.sin(theta),
        z: Math.random(),
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        size: 1 + Math.random() * 2,
        opacity: 0.15 + Math.random() * 0.45,
        type: typeRoll < 0.6 ? "dot" : typeRoll < 0.82 ? "cross" : "digit",
        char: DIGITS[i % DIGITS.length],
      };
    });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouseRef.current.x / canvas.width  - 0.5;
      const my = mouseRef.current.y / canvas.height - 0.5;

      // Central sphere glow
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 260);
      gradient.addColorStop(0,   "rgba(201,169,110,0.06)");
      gradient.addColorStop(0.5, "rgba(34,197,94,0.02)");
      gradient.addColorStop(1,   "transparent");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(cx + mx * 30, cy + my * 20, 260, 0, Math.PI * 2);
      ctx.fill();

      // Grid lines (subtle)
      ctx.strokeStyle = "rgba(242,239,233,0.025)";
      ctx.lineWidth = 1;
      for (let gx = 0; gx < canvas.width; gx += 80) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, canvas.height); ctx.stroke();
      }
      for (let gy = 0; gy < canvas.height; gy += 80) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(canvas.width, gy); ctx.stroke();
      }

      // Particles
      particlesRef.current.forEach((p) => {
        p.x += p.vx + mx * 0.6;
        p.y += p.vy + my * 0.4;

        // Wrap
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.y < -20) p.y = canvas.height + 20;
        if (p.y > canvas.height + 20) p.y = -20;

        const alpha = p.opacity * p.z;

        if (p.type === "dot") {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.z, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(242,239,233,${alpha})`;
          ctx.fill();
        } else if (p.type === "cross") {
          const s = p.size * p.z * 4;
          ctx.strokeStyle = `rgba(34,197,94,${alpha * 0.7})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p.x - s, p.y); ctx.lineTo(p.x + s, p.y);
          ctx.moveTo(p.x, p.y - s); ctx.lineTo(p.x, p.y + s);
          ctx.stroke();
        } else {
          ctx.font = `${Math.floor(7 * p.z + 6)}px "JetBrains Mono"`;
          ctx.fillStyle = `rgba(201,169,110,${alpha * 0.6})`;
          ctx.fillText(p.char ?? "", p.x, p.y);
        }
      });

      // Central orb ring
      ctx.beginPath();
      ctx.arc(cx + mx * 20, cy + my * 14, 200, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(242,239,233,0.04)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx + mx * 20, cy + my * 14, 300, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(242,239,233,0.02)";
      ctx.stroke();

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--black)" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Pre-label */}
        <div className="section-label mb-8 reveal visible" style={{ color: "rgba(201,169,110,0.7)" }}>
          ⌖ Patna / Indo-Bhutan &nbsp;·&nbsp; Est. 2004
        </div>

        {/* Big name */}
        <h1
          className="display-xl"
          style={{ fontSize: "clamp(5rem, 20vw, 18rem)", color: "var(--white)" }}
        >
          AMAN
        </h1>
        <h1
          className="display-xl"
          style={{
            fontSize: "clamp(5rem, 20vw, 18rem)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(242,239,233,0.35)",
            marginTop: "-0.15em",
          }}
        >
          ROY
        </h1>

        {/* Tagline */}
        <div className="mt-10 flex flex-col items-center gap-2">
          <p
            className="display-serif"
            style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)", color: "rgba(242,239,233,0.75)", letterSpacing: "0.04em" }}
          >
            Trader by skill. Traveller by heart.
          </p>
          <p
            className="mono-label mt-2"
            style={{ color: "rgba(242,239,233,0.35)", maxWidth: 460, lineHeight: 1.7 }}
          >
            Exploring markets, learning every day and collecting<br />
            experiences beyond the chart.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 mt-12 justify-center">
          <a href="#trading" className="mag-btn">
            Explore Trading ↓
          </a>
          <a href="#travel" className="mag-btn mag-btn-gold">
            Explore Travel ↓
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0.35 }}
      >
        <div
          className="mono-label"
          style={{ fontSize: "0.6rem", color: "var(--white)", letterSpacing: "0.2em" }}
        >
          Scroll
        </div>
        <div
          style={{
            width: 1,
            height: 48,
            background: "linear-gradient(to bottom, rgba(242,239,233,0.4), transparent)",
          }}
        />
      </div>
    </section>
  );
}
