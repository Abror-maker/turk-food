import { useState, useEffect } from "react";
import SectionHeader from "./SectionHeader.jsx";

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://backend/backend/images")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setImages(data.map((item) => ({ id: item.id, image: item.rasmlar, alt: `Image ${item.id}` })));
        } else {
          setError("Rasmlar topilmadi.");
        }
      })
      .catch((fetchError) => {
        setError(fetchError.message || "Backend bilan ulanishda muammo bor.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="gallery" style={{ padding: "80px 5%", background: "#fafafa" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader subtitle="Fotolar" title="Photo Gallery" />

        {loading && <p>Yuklanmoqda...</p>}
        {error && <p style={{ color: "#E63946" }}>{error}</p>}

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
        }}>
          {images.map((img) => (
            <div key={img.id} onClick={() => setLightbox(img)}
              style={{
                borderRadius: 10, overflow: "hidden", cursor: "pointer",
                height: 220, position: "relative",
              }}
              onMouseEnter={e => {
                const image = e.currentTarget.querySelector("img");
                if (image) image.style.transform = "scale(1.07)";
              }}
              onMouseLeave={e => {
                const image = e.currentTarget.querySelector("img");
                if (image) image.style.transform = "scale(1)";
              }}
            >
              <img src={img.image} alt={img.alt} style={{
                width: "100%", height: "100%", objectFit: "cover",
                transition: "transform 0.4s ease",
              }} />
            </div>
          ))}
        </div>
      </div>

      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 9999, cursor: "pointer",
        }}>
          <img src={lightbox.image} alt={lightbox.alt}
            style={{ maxWidth: "90vw", maxHeight: "90vh", borderRadius: 8, objectFit: "contain" }} />
        </div>
      )}
    </section>
  );
}
