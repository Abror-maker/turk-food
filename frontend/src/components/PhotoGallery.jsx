import { useState, useEffect } from "react";
import { apiGet } from "../utils/api.js";
import { fallbackGallery } from "../data/data.js";

export default function PhotoGallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    apiGet("images")
      .then((data) => setImages(Array.isArray(data) && data.length ? data : fallbackGallery))
      .catch(() => setImages(fallbackGallery));
  }, []);

  return (
    <section className="gallery-section">
      <div className="container gallery-layout">
        <div>
          <p className="gallery-section__label">Instagram</p>
          <h2>Photo Gallery</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <a href="#gallery" className="gallery-section__btn">View More</a>
        </div>
        <div className="gallery-images" id="gallery">
          {images.slice(0, 3).map((img) => (
            <img key={img.id} src={img.rasmlar} alt={`Gallery ${img.id}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
