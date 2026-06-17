import { useState, useEffect } from "react";
import { apiGet } from "../utils/api.js";
import { fallbackFoods, menuCategories } from "../data/data.js";
import PhotoGallery from "../components/PhotoGallery.jsx";

export default function MenuPage() {
  const [activeCat, setActiveCat] = useState("ALL");
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState(menuCategories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiGet("foods").catch(() => fallbackFoods),
      apiGet("category").catch(() => []),
    ]).then(([foodsData, catsData]) => {
      setFoods(Array.isArray(foodsData) && foodsData.length ? foodsData : fallbackFoods);
      if (Array.isArray(catsData) && catsData.length) {
        setCategories(["ALL", ...catsData.map((c) => c.Name)]);
      }
    }).finally(() => setLoading(false));
  }, []);

  const filtered = activeCat === "ALL"
    ? foods
    : foods.filter((f) => (f.category || f.category_name || "").toLowerCase() === activeCat.toLowerCase());

  return (
    <>
      <div className="container">
        <div className="page-title" style={{ paddingTop: 32 }}>
          <h1>Menu</h1>
          <div className="page-title__line" />
        </div>
      </div>
      <div className="container menu-layout">
        <aside className="menu-sidebar">
          <h3>Our Regular Menu Pack</h3>
          <div className="menu-sidebar__cats">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`menu-cat-btn${activeCat === cat ? " menu-cat-btn--active" : ""}`}
                onClick={() => setActiveCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </aside>

        <div>
          {loading && <p className="loading-text">Loading menu...</p>}
          <div className="menu-grid">
            {filtered.map((item) => (
              <div key={item.id} className="menu-card">
                <img className="menu-card__img" src={item.rasmi} alt={item.Name} />
                <h3 className="menu-card__name">{item.Name}</h3>
                <p className="menu-card__price">{item.Narxi}</p>
              </div>
            ))}
          </div>
          {!loading && filtered.length === 0 && (
            <p className="empty-text">No items in this category.</p>
          )}
        </div>
      </div>
      <PhotoGallery />
    </>
  );
}
