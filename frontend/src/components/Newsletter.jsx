import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email.includes("@")) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section style={{ background: "#E63946", padding: "60px 5%" }}>
      <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          color: "#fff", fontSize: 32, fontWeight: 700, margin: "0 0 10px",
        }}>Yangiliklarga obuna bo'ling</h2>
        <p style={{
          color: "rgba(255,255,255,0.85)", fontSize: 15,
          fontFamily: "'Lato', sans-serif", margin: "0 0 28px",
        }}>Subscribe To Our Newsletter</p>
        {submitted ? (
          <div style={{
            background: "rgba(255,255,255,0.2)", borderRadius: 8, padding: "16px 24px",
            color: "#fff", fontSize: 16, fontFamily: "'Lato', sans-serif",
          }}>
            ✓ Obuna bo'ldingiz! Rahmat.
          </div>
        ) : (
          <div style={{ display: "flex", gap: 0, maxWidth: 480, margin: "0 auto", borderRadius: 4, overflow: "hidden" }}>
            <input
              type="email" value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email manzilingizni kiriting..."
              style={{
                flex: 1, padding: "14px 20px", border: "none", outline: "none",
                fontSize: 14, fontFamily: "'Lato', sans-serif",
              }}
            />
            <button onClick={handleSubmit} style={{
              background: "#1a1a1a", color: "#fff", border: "none",
              padding: "14px 24px", cursor: "pointer",
              fontWeight: 600, fontSize: 13, fontFamily: "'Lato', sans-serif", whiteSpace: "nowrap",
            }}>Obuna bo'lish</button>
          </div>
        )}
      </div>
    </section>
  );
}
