import { useState, useEffect } from "react";
import Breadcrumbs from "../components/layout/Breadcrumbs.jsx";
import { apiGet } from "../utils/api.js";
import { fallbackNews } from "../data/data.js";

const PER_PAGE = 9;

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [visible, setVisible] = useState(PER_PAGE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet("news")
      .then((data) => setNews(Array.isArray(data) && data.length ? data : fallbackNews))
      .catch(() => setNews(fallbackNews))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <Breadcrumbs items={[{ label: "Home", path: "/" }, { label: "News" }]} />
      <div className="page-title">
        <h1>News</h1>
        <div className="page-title__line" />
      </div>

      {loading && <p className="loading-text">Loading news...</p>}

      <div className="news-grid">
        {news.slice(0, visible).map((item) => (
          <article key={item.id} className="news-card">
            <img className="news-card__img" src={item.img} alt={item.title} />
            <h3 className="news-card__title">{item.title}</h3>
            <p className="news-card__text">{item.text}</p>
            <div className="news-card__footer">
              <span className="news-card__link">Read More</span>
              <span className="news-card__date">{item.kuni}</span>
            </div>
          </article>
        ))}
      </div>

      {visible < news.length && (
        <button className="view-more-btn" onClick={() => setVisible((v) => v + PER_PAGE)}>
          View More
        </button>
      )}
    </div>
  );
}
