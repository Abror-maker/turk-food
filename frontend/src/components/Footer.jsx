import { useState, useEffect } from "react";
import { navLinks as defaultNavLinks, siteConfig } from "../data/data.js";

export default function Footer() {
  const [navLinks, setNavLinks] = useState(defaultNavLinks);
  const [footerInfo, setFooterInfo] = useState("");
  const [footerLogo, setFooterLogo] = useState(null);

  useEffect(() => {
    fetch("http://backend/backend/navbar")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setNavLinks(data.map((item) => ({
            label: item.Name || item.name || "Menu",
            href: item.linki || item.link || "#",
          })));
        }
      })
      .catch(() => {
        setNavLinks(defaultNavLinks);
      });
  }, []);

  useEffect(() => {
    fetch("http://backend/backend/information")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setFooterInfo(data[0].malumotl || "");
          setFooterLogo(data[0].logo || null);
        }
      })
      .catch(() => {
        setFooterInfo("");
      });
  }, []);

  return (
    <footer id="contact" style={{ background: "#1a1a1a", color: "#ccc", padding: "60px 5% 30px" }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 40, marginBottom: 40,
      }}>
        <div>
          <h3 style={{
            fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: 24, margin: "0 0 16px",
          }}>{siteConfig.restaurantName}</h3>
          {footerLogo && (
            <img src={footerLogo} alt="Footer logo" style={{ maxWidth: 140, marginBottom: 12, display: "block" }} />
          )}
          <p style={{ fontSize: 14, lineHeight: 1.8, fontFamily: "'Lato', sans-serif", color: "#999" }}>
            {siteConfig.description}
          </p>
          {footerInfo && (
            <p style={{ fontSize: 14, lineHeight: 1.8, fontFamily: "'Lato', sans-serif", color: "#999", marginTop: 12 }}>
              {footerInfo}
            </p>
          )}
        </div>

        <div>
          <h4 style={{ color: "#fff", fontFamily: "'Playfair', serif", margin: "0 0 18px", fontSize: 17 }}>Sahifalar</h4>
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} style={{
              display: "block", color: "#999", textDecoration: "none",
              fontFamily: "'Lato', sans-serif", fontSize: 14, marginBottom: 10,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = "#E63946"}
            onMouseLeave={(e) => e.currentTarget.style.color = "#999"}
            >{l.label}</a>
          ))}
        </div>

        <div>
          <h4 style={{ color: "#fff", fontFamily: "'Playfair', serif", margin: "0 0 18px", fontSize: 17 }}>Aloqa</h4>
          {[
            { icon: "📍", text: siteConfig.address },
            { icon: "📞", text: siteConfig.phone },
            { icon: "✉️", text: siteConfig.email },
            { icon: "🕐", text: siteConfig.workingHours },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "flex-start" }}>
              <span style={{ fontSize: 14 }}>{item.icon}</span>
              <span style={{ fontSize: 14, fontFamily: "'Lato', sans-serif", color: "#999", lineHeight: 1.6 }}>{item.text}</span>
            </div>
          ))}
        </div>

        <div>
          <h4 style={{ color: "#fff", fontFamily: "'Playfair', serif", margin: "0 0 18px", fontSize: 17 }}>Ijtimoiy tarmoqlar</h4>
          <div style={{ display: "flex", gap: 12 }}>
            {[
              { name: "Instagram", href: siteConfig.socialLinks.instagram, emoji: "📸" },
              { name: "Facebook", href: siteConfig.socialLinks.facebook, emoji: "👥" },
              { name: "Twitter", href: siteConfig.socialLinks.twitter, emoji: "🐦" },
            ].map((s) => (
              <a key={s.name} href={s.href} style={{
                width: 44, height: 44, background: "#2a2a2a",
                borderRadius: "50%", display: "flex", alignItems: "center",
                justifyContent: "center", textDecoration: "none", fontSize: 18,
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#E63946"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#2a2a2a"}
              title={s.name}
              >{s.emoji}</a>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        borderTop: "1px solid #2a2a2a", paddingTop: 24, textAlign: "center",
        fontSize: 13, color: "#666", fontFamily: "'Lato', sans-serif",
      }}>
        © {new Date().getFullYear()} {siteConfig.restaurantName}. Barcha huquqlar himoyalangan.
      </div>
    </footer>
  );
}
