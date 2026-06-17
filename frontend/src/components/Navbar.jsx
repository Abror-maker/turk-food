import { useState, useEffect } from "react";
import { navLinks, siteConfig } from "../data/data.js";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [navItems, setNavItems] = useState(navLinks);
  const [logoUrl, setLogoUrl] = useState(null);
  const [loadingLinks, setLoadingLinks] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const url = "http://backend/backend/navbar";

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setNavItems(
            data.map((item) => ({
              label: item.Name || item.name || "Menu",
              href: item.linki || item.link || "#",
            }))
          );
        }
      })
      .catch(() => {
        // Silently fall back to default nav links
      })
      .finally(() => setLoadingLinks(false));
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
          setLogoUrl(data[0].logo || null);
        }
      })
      .catch(() => {
        setLogoUrl(null);
      });
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? "#fff" : "transparent",
      boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.1)" : "none",
      transition: "all 0.3s ease",
      padding: "0 5%",
    }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        maxWidth: 1200, margin: "0 auto", height: 70,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a href="#home" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
              <img
                src={logoUrl || siteConfig.logo}
                alt={`${siteConfig.restaurantName} logo`}
                style={{
                  height: scrolled ? 36 : 48,
                  width: "auto",
                  transition: "height 0.18s ease",
                  display: "block",
                }}
              />
          </a>
          <h1 style={{ color: scrolled ? "#333" : "#fff", fontFamily: "sans-serif", fontSize: 32, fontWeight: 700, margin: 0 }}>Turk Kebab</h1>
        </div>

        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {(loadingLinks ? navLinks : navItems).map((link) => (
            <a key={link.label} href={link.href} style={{
              color: scrolled ? "#333" : "#fff", textDecoration: "none",
              fontSize: 14, fontWeight: 500, fontFamily: "'Lato', sans-serif",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => e.target.style.color = "#E63946"}
            onMouseLeave={e => e.target.style.color = scrolled ? "#333" : "#fff"}
            >{link.label}</a>
          ))}
          <a href="#contact" style={{
            background: "#E63946", color: "#fff", padding: "10px 24px",
            borderRadius: 4, fontSize: 13, fontWeight: 600, textDecoration: "none",
            fontFamily: "'Lato', sans-serif",
          }}>Bron qilish</a>
        </div>
      </div>
    </nav>
  );
}
