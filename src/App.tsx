import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import TradingSection from "./components/TradingSection";
import TravelSection from "./components/TravelSection";
import JourneySection from "./components/JourneySection";
import TwoWorldsSection from "./components/TwoWorldsSection";
import PhilosophySection from "./components/PhilosophySection";
import SocialSection from "./components/SocialSection";
import ContactSection from "./components/ContactSection";
import FooterSection from "./components/FooterSection";

function Loader({ done }: { done: boolean }) {
  return (
    <div
      className={done ? "loader-out" : ""}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9000,
        background: "var(--black)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
        pointerEvents: done ? "none" : "all",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 900,
          fontSize: "4rem",
          color: "var(--white)",
          letterSpacing: "0.02em",
        }}
      >
        AR.
      </div>
      <div
        style={{
          width: 160,
          height: 1,
          background: "rgba(242,239,233,0.1)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className="loader-bar"
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, var(--trade-green), var(--travel-gold))",
          }}
        />
      </div>
      <div
        className="mono-label"
        style={{ color: "rgba(242,239,233,0.3)", fontSize: "0.6rem", letterSpacing: "0.2em" }}
      >
        Trader by skill. Traveller by heart.
      </div>
    </div>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="grain" style={{ background: "var(--black)", minHeight: "100vh" }}>
      <Loader done={loaded} />
      <Nav />
      <HeroSection />
      <AboutSection />
      <TradingSection />
      <TravelSection />
      <JourneySection />
      <TwoWorldsSection />
      <PhilosophySection />
      <SocialSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}
