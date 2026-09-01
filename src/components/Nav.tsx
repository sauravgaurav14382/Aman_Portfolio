import { useEffect, useRef, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setScrolled(window.scrollY > 60);
      setProgress(pct * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dotRef.current) return;
      dotRef.current.style.left = e.clientX + "px";
      dotRef.current.style.top = e.clientY + "px";
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <div id="scroll-progress" style={{ width: `${progress}%` }} />
      <div ref={dotRef} id="cursor-dot" />

      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(7,7,10,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(242,239,233,0.06)" : "none",
        }}
      >
        <a
          href="#top"
          style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.6rem", letterSpacing: "0.02em", color: "var(--white)", textDecoration: "none" }}
        >
          AR.
        </a>

        <div className="hidden md:flex items-center gap-8">
          {["About", "Trading", "Travel", "Journey", "Contact"].map((s) => (
            <a key={s} href={`#${s.toLowerCase()}`} className="nav-link">
              {s}
            </a>
          ))}
        </div>

        <a
          href="https://www.instagram.com/amanroy8751/"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link"
          style={{ color: "rgba(201,169,110,0.8)" }}
        >
          Instagram ↗
        </a>
      </nav>
    </>
  );
}
