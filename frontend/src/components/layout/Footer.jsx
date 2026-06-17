import { useState, useEffect } from "react";
import Logo from "../Logo.jsx";
import { siteConfig } from "../../data/data.js";
import { apiGet } from "../../utils/api.js";

export default function Footer() {
  const [settings, setSettings] = useState(siteConfig);

  useEffect(() => {
    apiGet("settings")
      .then((data) => {
        if (data && !data.errors) setSettings((prev) => ({ ...prev, ...data }));
      })
      .catch(() => {});
  }, []);

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <h4>Contact Us</h4>
          <p>{settings.address}</p>
          <p>{settings.phone1}</p>
          <p>{settings.phone2}</p>
        </div>
        <div className="footer__center">
          <Logo />
          <p className="footer__quote">"{settings.tagline || settings.quote}"</p>
          <div className="footer__social">
            <a href={`https://facebook.com/${settings.facebook}`} title="Facebook">f</a>
            <a href={`https://twitter.com/${settings.twitter}`} title="Twitter">t</a>
            <a href={`https://instagram.com/${settings.instagram}`} title="Instagram">in</a>
          </div>
        </div>
        <div>
          <h4>Working Hours</h4>
          <p>{settings.weekdayHours}</p>
          <p>{settings.weekendHours}</p>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container">
          © {new Date().getFullYear()} {siteConfig.name}. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
