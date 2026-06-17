import { useState, useEffect } from "react";
import { siteConfig } from "../data/data.js";
import { backendUrl } from "../utils/api.js";

export default function RestaurantBanner() {
  const [siteInfo, setSiteInfo] = useState(null);

  useEffect(() => {
    fetch(`${backendUrl}/index.php?r=api/site`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setSiteInfo(data.data);
        }
      })
      .catch(() => {
        setSiteInfo(null);
      });
  }, []);

  const bannerText = siteInfo?.information?.[0]?.malumotl || siteConfig.workingHours;

  return (
    <section style={{
      height: 400, position: "relative", overflow: "hidden",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <img
        src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=80"
        alt="Restaurant"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(0,0,0,0.55)",
      }} />
      <div style={{ position: "relative", textAlign: "center", padding: "0 5%" }}>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          color: "#fff", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700,
          margin: "0 0 16px",
        }}>
          Ajoyib kechani biz bilan o'tkazing
        </h2>
        <p style={{
          color: "rgba(255,255,255,0.85)", fontSize: 16,
          fontFamily: "'Lato', sans-serif", margin: "0 0 28px",
        }}>{bannerText}</p>
        <a href={`tel:${siteConfig.phone}`} style={{
          background: "#E63946", color: "#fff", padding: "14px 36px",
          borderRadius: 4, fontWeight: 700, textDecoration: "none",
          fontSize: 15, fontFamily: "'Lato', sans-serif",
        }}>Bron qilish: {siteConfig.phone}</a>
      </div>
    </section>
  );
}
