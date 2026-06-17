import { useState, useEffect } from "react";
import SectionHeader from "./SectionHeader.jsx";

export default function NewArrivals() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://backend/backend/news")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setItems(data);
        } else {
          setError("Yangiliklar topilmadi.");
        }
      })
      .catch((fetchError) => {
        setError(fetchError.message || "Backend bilan ulanishda muammo bor.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section style={{ padding: "80px 5%", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader subtitle="Yangiliklar" title="New Gift Updates" />

        {loading && <p>Yuklanmoqda...</p>}
        {error && <p style={{ color: "#E63946" }}>{error}</p>}

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 32,
        }}>
          {items.map((item) => (
            <div key={item.id} style={{
              borderRadius: 12, overflow: "hidden", position: "relative",
              boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
              cursor: "pointer", height: 280,
            }}
            onMouseEnter={e => {
              const img = e.currentTarget.querySelector("img");
              if (img) img.style.transform = "scale(1.08)";
            }}
            onMouseLeave={e => {
              const img = e.currentTarget.querySelector("img");
              if (img) img.style.transform = "scale(1)";
            }}
            >
              <img src={item.img} alt={item.title} style={{
                width: "100%", height: "100%", objectFit: "cover",
                transition: "transform 0.4s ease",
              }} />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
              }} />
              <span style={{
                position: "absolute", top: 16, right: 16,
                background: "#E63946", color: "#fff", fontSize: 11,
                fontWeight: 700, padding: "5px 12px", borderRadius: 20,
                letterSpacing: 1, fontFamily: "'Lato', sans-serif",
              }}>{item.kuni}</span>
              <div style={{ position: "absolute", bottom: 20, left: 20, right: 20 }}>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#fff", fontSize: 22, margin: "0 0 6px", fontWeight: 600,
                }}>{item.title}</h3>
                <span style={{ color: "#ffcc00", fontWeight: 700, fontSize: 18, fontFamily: "'Lato', sans-serif" }}>
                  {item.text}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
