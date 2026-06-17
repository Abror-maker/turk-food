import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiGet } from "../utils/api.js";
import {
  siteConfig,
  fallbackFoods,
  fallbackNews,
  fallbackGallery,
  fallbackTestimonials,
  menuCategories,
} from "../data/data.js";
import Stars from "../components/Stars.jsx";
import PhotoGallery from "../components/PhotoGallery.jsx";

export default function HomePage() {
  const [hero, setHero] = useState({
    badge: siteConfig.heroBadge,
    title: siteConfig.heroTitle,
    description: siteConfig.heroDescription,
    image: siteConfig.heroImage,
  });
  const [foods, setFoods] = useState([]);
  const [news, setNews] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [activeCat, setActiveCat] = useState("ALL");
  const [categories, setCategories] = useState(menuCategories);

  useEffect(() => {
    apiGet("main")
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setHero((h) => ({ ...h, description: data[0].Malumotlar || h.description }));
        }
      })
      .catch(() => {});

    apiGet("foods")
      .then((data) => setFoods(Array.isArray(data) && data.length ? data : fallbackFoods))
      .catch(() => setFoods(fallbackFoods));

    apiGet("category")
      .then((data) => {
        if (Array.isArray(data) && data.length) {
          setCategories(["ALL", ...data.map((c) => c.Name)]);
        }
      })
      .catch(() => {});

    apiGet("news")
      .then((data) => setNews(Array.isArray(data) && data.length ? data : fallbackNews))
      .catch(() => setNews(fallbackNews));

    apiGet("feedback")
      .then((data) => setTestimonials(Array.isArray(data) && data.length ? data : fallbackTestimonials))
      .catch(() => setTestimonials(fallbackTestimonials));
  }, []);

  const popular = foods.slice(0, 4);
  const filtered = activeCat === "ALL"
    ? foods
    : foods.filter((f) => (f.category || "").toLowerCase() === activeCat.toLowerCase());
  const menuGrid = filtered.slice(0, 12);

  return (
    <>
      {/* Hero */}
      <section className="home-hero">
        <div className="container home-hero__inner">
          <div className="home-hero__text">
            <span className="home-hero__badge">{hero.badge}</span>
            <h1 className="home-hero__title">{hero.title}</h1>
            <p className="home-hero__desc">{hero.description}</p>
            <Link to="/menu" className="home-hero__btn">Explore Menu</Link>
          </div>
          <div className="home-hero__image-wrap">
            <img src={hero.image} alt="Featured dish" className="home-hero__image" />
          </div>
        </div>
      </section>

      {/* Popular Dishes */}
      <section className="home-section">
        <div className="container">
          <div className="home-section__header">
            <h2 className="home-section__title">Popular Dishes</h2>
            <Link to="/menu" className="home-section__link">See All</Link>
          </div>
          <div className="popular-grid">
            {popular.map((item) => (
              <div key={item.id} className="dish-card">
                <img className="dish-card__img" src={item.rasmi} alt={item.Name} />
                <h3 className="dish-card__name">{item.Name}</h3>
                <Stars count={item.rating || 5} />
                <p className="dish-card__price">{item.Narxi}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regular Menu Pack */}
      <section className="home-section home-section--gray" id="menu">
        <div className="container">
          <h2 className="home-section__title home-section__title--center">Our Regular Menu Pack</h2>
          <div className="home-cats">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`home-cat-btn${activeCat === cat ? " home-cat-btn--active" : ""}`}
                onClick={() => setActiveCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="home-menu-grid">
            {menuGrid.map((item) => (
              <div key={item.id} className="dish-card">
                <img className="dish-card__img" src={item.rasmi} alt={item.Name} />
                <h3 className="dish-card__name">{item.Name}</h3>
                <Stars count={item.rating || 5} />
                <p className="dish-card__price">{item.Narxi}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="home-section">
        <div className="container">
          <div className="section-label-wrap">
            <span className="section-label">Testimonials</span>
            <h2 className="home-section__title">Happy Customers</h2>
            <div className="page-title__line" />
          </div>
          <div className="testimonials-grid">
            {testimonials.slice(0, 3).map((t) => (
              <div key={t.id} className="testimonial-card">
                <p className="testimonial-card__text">"{t.text}"</p>
                <strong className="testimonial-card__name">— {t.ismi}</strong>
                <div className="testimonial-card__social">
                  <span>f</span><span>t</span><span>in</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Updates */}
      <section className="home-section home-section--gray">
        <div className="container">
          <div className="section-label-wrap">
            <span className="section-label">Blogs</span>
            <h2 className="home-section__title">Recent Updates</h2>
            <div className="page-title__line" />
          </div>
          <div className="news-grid">
            {news.slice(0, 3).map((item) => (
              <article key={item.id} className="news-card">
                <img className="news-card__img" src={item.img} alt={item.title} />
                <h3 className="news-card__title">{item.title}</h3>
                <p className="news-card__text">{item.text}</p>
                <div className="news-card__footer">
                  <Link to="/news" className="news-card__link">Read More</Link>
                  <span className="news-card__date">{item.kuni}</span>
                </div>
              </article>
            ))}
          </div>
          <Link to="/news" className="view-more-btn" style={{ display: "block", textAlign: "center", width: "fit-content" }}>
            View More
          </Link>
        </div>
      </section>

      {/* Video Section */}
      <section className="home-video">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&q=80"
          alt="Restaurant interior"
          className="home-video__bg"
        />
        <button className="home-video__play" aria-label="Play video">
          <span>▶</span>
        </button>
      </section>

      <PhotoGallery />
    </>
  );
}
