import { useState, useEffect } from "react";
import SectionHeader from "./SectionHeader.jsx";

export default function PopularBiffes() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://backend/backend/foods")
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
          setError("Backenddan ma'lumot olishda xatolik yuz berdi.");
        }
      })
      .catch((fetchError) => {
        setError(fetchError.message || "Backend bilan ulanishda muammo bor.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section style={{ padding: "80px 5%", background: "#fafafa" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader subtitle="Mashhur tanlovlar" title="Popular Biffes" />

        {loading && <p>Yuklanmoqda...</p>}
        {error && <p style={{ color: "#E63946" }}>{error}</p>}

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 28,
        }}>
          {items.map((item) => (
            <div key={item.id} style={{
              background: "#fff", borderRadius: 12, overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
              transition: "transform 0.2s, box-shadow 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.13)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.07)"; }}
            >
              <div style={{ height: 180, overflow: "hidden" }}>
                <img src={item.rasmi} alt={item.Name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s" }} />
              </div>
              <div style={{ padding: "16px 20px 20px" }}>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 17, color: "#1a1a1a", margin: "0 0 10px", fontWeight: 600,
                }}>{item.Name}</h3>
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <span style={{ color: "#E63946", fontWeight: 700, fontSize: 16, fontFamily: "'Lato', sans-serif" }}>
                    {item.Narxi}
                  </span>
                  <button style={{
                    background: "#E63946", border: "none", color: "#fff",
                    width: 32, height: 32, borderRadius: "50%", cursor: "pointer",
                    fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 300,
                  }}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
