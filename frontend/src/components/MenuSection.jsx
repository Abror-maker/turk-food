import { useState, useEffect } from "react";
import SectionHeader from "./SectionHeader.jsx";

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState("Barchasi");
  const [categories, setCategories] = useState(["Barchasi"]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch("http://backend/backend/category").then((r) => r.ok ? r.json() : Promise.reject(r.status)),
      fetch("http://backend/backend/foods").then((r) => r.ok ? r.json() : Promise.reject(r.status)),
    ])
      .then(([categoriesRes, foodsRes]) => {
        if (Array.isArray(categoriesRes)) {
          setCategories(["Barchasi", ...categoriesRes.map((item) => item.Name)]);
        }
        if (Array.isArray(foodsRes)) {
          setMenuItems(foodsRes);
        }
      })
      .catch(() => {
        setError("Menu ma'lumotlarini yuklashda xatolik yuz berdi.");
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeCategory === "Barchasi"
    ? menuItems
    : menuItems.filter((m) => m.category === activeCategory || !m.category);

  return (
    <section id="menu" style={{ padding: "80px 5%", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader subtitle="Bizning taomlar" title="Our Regular Menu Items" />

        {loading && <p>Yuklanmoqda...</p>}
        {error && <p style={{ color: "#E63946" }}>{error}</p>}

        <div style={{
          display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center",
          marginBottom: 48,
        }}>
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              padding: "10px 24px", borderRadius: 25,
              border: activeCategory === cat ? "none" : "2px solid #e0e0e0",
              background: activeCategory === cat ? "#E63946" : "transparent",
              color: activeCategory === cat ? "#fff" : "#555",
              fontWeight: 600, fontSize: 13, cursor: "pointer",
              fontFamily: "'Lato', sans-serif", transition: "all 0.2s",
              letterSpacing: 0.5,
            }}>
              {cat}
            </button>
          ))}
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 28,
        }}>
          {filtered.map((item) => (
            <div key={item.id} style={{
              background: "#fafafa", borderRadius: 12, overflow: "hidden",
              border: "1px solid #f0f0f0",
              transition: "transform 0.2s, box-shadow 0.2s",
              cursor: "pointer", position: "relative",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
            >
              <div style={{ height: 190, overflow: "hidden" }}>
                <img src={item.rasmi} alt={item.Name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: "16px 18px 20px" }}>
                <span style={{
                  fontSize: 11, color: "#E63946", fontWeight: 600,
                  letterSpacing: 1, textTransform: "uppercase", fontFamily: "'Lato', sans-serif",
                }}>{item.category || "Taom"}</span>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 18, color: "#1a1a1a", margin: "6px 0 6px", fontWeight: 600,
                }}>{item.Name}</h3>
                <p style={{ color: "#888", fontSize: 13, margin: "0 0 14px", fontFamily: "'Lato', sans-serif", lineHeight: 1.5 }}>
                  {item.description || item.text || "Ta'rif mavjud emas."}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#E63946", fontWeight: 700, fontSize: 17, fontFamily: "'Lato', sans-serif" }}>
                    {item.Narxi}
                  </span>
                  <button style={{
                    background: "#E63946", border: "none", color: "#fff",
                    padding: "8px 18px", borderRadius: 20, cursor: "pointer",
                    fontSize: 12, fontWeight: 600, fontFamily: "'Lato', sans-serif",
                  }}>Buyurtma</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
