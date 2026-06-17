import { useState, useEffect } from "react";
import Breadcrumbs from "../components/layout/Breadcrumbs.jsx";
import { apiGet, apiPost } from "../utils/api.js";
import { siteConfig } from "../data/data.js";

export default function ContactPage() {
  const [settings, setSettings] = useState(siteConfig);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState(null);

  useEffect(() => {
    apiGet("settings")
      .then((data) => { if (data && !data.errors) setSettings((p) => ({ ...p, ...data })); })
      .catch(() => {});
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await apiPost("contact", form);
      setStatus("success");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const contactCards = [
    { icon: "📞", label: "Phone Number", value: settings.phone1 },
    { icon: "✉️", label: "Email Address", value: settings.email },
    { icon: "📸", label: "Instagram", value: settings.instagram },
    { icon: "🐦", label: "Twitter", value: settings.twitter },
    { icon: "👥", label: "Facebook", value: settings.facebook },
  ];

  return (
    <div className="container">
      <Breadcrumbs items={[{ label: "Home", path: "/" }, { label: "Contact Us" }]} />
      <div className="page-title">
        <h1>Contact Us</h1>
        <div className="page-title__line" />
      </div>

      <div className="contact-layout">
        <div className="contact-cards">
          {contactCards.map((card) => (
            <div key={card.label} className="contact-card">
              <div className="contact-card__icon">{card.icon}</div>
              <div>
                <p className="contact-card__label">{card.label}</p>
                <p className="contact-card__value">{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="contact-form-card">
          <h2>Send Message</h2>
          <p>
            If you have any questions, you can send us an SMS or contact us by phone.
            You can also contact us via social networks.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <input className="form-input" name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
              <input className="form-input" name="email" type="email" placeholder="Email address" value={form.email} onChange={handleChange} required />
              <input className="form-input" name="phone" placeholder="Phone number" value={form.phone} onChange={handleChange} />
              <input className="form-input" name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} required />
            </div>
            <textarea className="form-textarea" name="message" placeholder="Message" value={form.message} onChange={handleChange} required />
            <button type="submit" className="form-submit" disabled={status === "loading"}>
              {status === "loading" ? "Sending..." : "Send message"}
            </button>
            {status === "success" && <p className="form-msg form-msg--success">Message sent successfully!</p>}
            {status === "error" && <p className="form-msg form-msg--error">Failed to send. Please try again.</p>}
          </form>
        </div>
      </div>

      <div className="map-section">
        <h2>Find Us By Card</h2>
        <div className="map-container">
          <iframe
            title="Restaurant location"
            src={settings.mapEmbed || siteConfig.mapEmbed}
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
