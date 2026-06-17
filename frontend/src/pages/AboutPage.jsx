import { useState, useEffect } from "react";
import Breadcrumbs from "../components/layout/Breadcrumbs.jsx";
import { apiGet } from "../utils/api.js";
import { siteConfig } from "../data/data.js";

export default function AboutPage() {
  const [about, setAbout] = useState({
    text1: siteConfig.aboutText1,
    text2: siteConfig.aboutText2,
    image: siteConfig.aboutImage,
  });

  useEffect(() => {
    apiGet("settings")
      .then((data) => {
        if (data && !data.errors) {
          setAbout({
            text1: data.aboutText1 || data.about_text || siteConfig.aboutText1,
            text2: data.aboutText2 || data.about_text2 || siteConfig.aboutText2,
            image: data.aboutImage || data.about_image || siteConfig.aboutImage,
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="container">
      <Breadcrumbs items={[{ label: "Home", path: "/" }, { label: "About Us" }]} />
      <div className="page-title">
        <h1>About Us</h1>
        <div className="page-title__line" />
      </div>
      <div className="about-content">
        <p>{about.text1}</p>
        <img className="about-content__img" src={about.image} alt="EATURKISH Restaurant" />
        <p>{about.text2}</p>
      </div>
    </div>
  );
}
