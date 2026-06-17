import { useState, useEffect } from "react";
import SectionHeader from "./SectionHeader.jsx";
import Stars from "./Stars.jsx";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://backend/backend/feedback")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data);
        } else {
          setError("Fikrlar topilmadi.");
        }
      })
      .catch((fetchError) => {
        setError(fetchError.message || "Backend bilan ulanishda muammo bor.");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!testimonials.length) return;
    const t = setInterval(() => setActive((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, [testimonials]);

  const activeTestimonial = testimonials[active] || {};
  const avatar = activeTestimonial.id ? `https://i.pravatar.cc/150?img=${Math.min(70, activeTestimonial.id + 10)}` : "";

  return (
    <section style={{ padding: "80px 5%", background: "#f9f9f9" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <SectionHeader subtitle="Mijozlar fikri" title="Happy Customers" />

        {loading && <p>Yuklanmoqda...</p>}
        {error && <p style={{ color: "#E63946" }}>{error}</p>}

        {!loading && !error && testimonials.length > 0 && (
          <>
            <div style={{
              background: "#fff", borderRadius: 16, padding: "48px 52px",
              boxShadow: "0 8px 40px rgba(0,0,0,0.06)", minHeight: 220,
              transition: "all 0.3s",
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%", overflow: "hidden",
                margin: "0 auto 16px", border: "3px solid #E63946",
              }}>
                <img src={avatar} alt={activeTestimonial.ismi}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <Stars count={activeTestimonial.rating || 5} />
              <p style={{
                fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#333",
                lineHeight: 1.7, margin: "20px 0 20px", fontStyle: "italic",
              }}>
                "{activeTestimonial.text || activeTestimonial.comment || "Fikr mavjud emas."}"
              </p>
              <strong style={{ fontFamily: "'Lato', sans-serif", color: "#1a1a1a", fontSize: 15 }}>
                — {activeTestimonial.ismi || "Mijoz"}
              </strong>
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} style={{
                  width: i === active ? 24 : 8, height: 8, borderRadius: 4,
                  border: "none", background: i === active ? "#E63946" : "#ddd",
                  cursor: "pointer", transition: "all 0.3s", padding: 0,
                }} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
