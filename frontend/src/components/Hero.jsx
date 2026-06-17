import { useState, useEffect } from "react";
import { siteConfig, heroSlides } from "../data/data.js";

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [heroText, setHeroText] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((p) => (p + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetch("http://backend/backend/main")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setHeroText(data[0].Malumotlar || "");
        }
      })
      .catch(() => {
        setHeroText("");
      });
  }, []);

  const slide = heroSlides[current];
  const title = siteConfig.tagline;
  const description = heroText || siteConfig.description;

  return (
    <section id="home" style={{
      background: "#C0182A",
      minHeight: "90vh",
      display: "flex",
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, #B01020 0%, #E63946 50%, #C0182A 100%)",
      }} />

      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "100px 5% 60px",
        display: "flex", alignItems: "center", gap: 60,
        width: "100%", position: "relative", zIndex: 2,
      }}>
        <div style={{ flex: 1 }}>
          <span style={{
            background: "rgba(255,255,255,0.15)", color: "#fff",
            padding: "6px 16px", borderRadius: 20, fontSize: 12,
            fontFamily: "'Lato', sans-serif", fontWeight: 600, letterSpacing: 2,
            textTransform: "uppercase",
          }}>{slide.badge}</span>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(42px, 6vw, 72px)",
            color: "#fff", fontWeight: 700, lineHeight: 1.15,
            margin: "20px 0 24px",
          }}>
            {title}
          </h1>

          <p style={{
            color: "rgba(255,255,255,0.85)", fontSize: 16, lineHeight: 1.7,
            maxWidth: 420, fontFamily: "'Lato', sans-serif", marginBottom: 36,
          }}>{description}</p>

          <div style={{ display: "flex", gap: 16 }}>
            <a href="#menu" style={{
              background: "#fff", color: "#E63946", padding: "14px 32px",
              borderRadius: 4, fontWeight: 700, textDecoration: "none",
              fontSize: 14, fontFamily: "'Lato', sans-serif",
            }}>Menyuni ko'rish</a>
            <a href="#contact" style={{
              border: "2px solid #fff", color: "#fff", padding: "14px 32px",
              borderRadius: 4, fontWeight: 600, textDecoration: "none",
              fontSize: 14, fontFamily: "'Lato', sans-serif",
            }}>Bron qilish</a>
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 40 }}>
            {heroSlides.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} style={{
                width: i === current ? 24 : 8, height: 8,
                borderRadius: 4, border: "none",
                background: i === current ? "#fff" : "rgba(255,255,255,0.4)",
                cursor: "pointer", transition: "all 0.3s",
                padding: 0,
              }} />
            ))}
          </div>
        </div>

        <div style={{
          flex: 1, display: "flex", justifyContent: "center", alignItems: "center",
        }}>
          <div style={{
            width: "min(420px, 90%)", aspectRatio: "1/1",
            borderRadius: "50%",
            overflow: "hidden",
            border: "8px solid rgba(255,255,255,0.2)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.3)",
            transition: "all 0.5s ease",
          }}>
            <img src={slide.image} alt="Hero dish"
              style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
