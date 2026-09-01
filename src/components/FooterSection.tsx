export default function FooterSection() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      style={{
        background: "var(--black)",
        borderTop: "1px solid rgba(242,239,233,0.07)",
        padding: "3rem 2rem",
      }}
    >
      <div
        className="max-w-6xl mx-auto"
        style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.5rem" }}
      >
        {/* Logo */}
        <div
          style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "2rem", color: "var(--white)", letterSpacing: "0.02em" }}
        >
          AR.
        </div>

        {/* Center */}
        <div style={{ textAlign: "center" }}>
          <div className="mono-label" style={{ color: "rgba(242,239,233,0.25)", letterSpacing: "0.2em" }}>
            Trading × Travel × Learning
          </div>
          <div className="mono-label mt-2" style={{ color: "rgba(242,239,233,0.15)", fontSize: "0.58rem" }}>
            © 2026 Aman Roy · Patna / Indo-Bhutan
          </div>
        </div>

        {/* Back to top */}
        <button
          onClick={scrollTop}
          style={{
            background: "transparent",
            border: "1px solid rgba(242,239,233,0.15)",
            color: "rgba(242,239,233,0.45)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            padding: "8px 20px",
            cursor: "pointer",
            transition: "all 0.2s ease",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "var(--white)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(242,239,233,0.4)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(242,239,233,0.45)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(242,239,233,0.15)";
          }}
        >
          ↑ Back to top
        </button>
      </div>
    </footer>
  );
}
