import { useState } from "react";
import { apiPost, isStaticMode } from "../../utils/api.js";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setStatus("loading");
    try {
      await apiPost("newsletter", { email });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="container">
      <div className="newsletter">
        <div className="newsletter__inner">
          <div>
            <p className="newsletter__label">Newsletter</p>
            <h2>Subscribe To Our Newsletter</h2>
            <p className="newsletter__sub">And never miss latest Updates!</p>
          </div>
          <form className="newsletter__form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="newsletter__input"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="newsletter__btn" disabled={status === "loading"}>
              {status === "loading" ? "..." : "Subscribe"}
            </button>
          </form>
        </div>
        {status === "success" && (
          <p style={{ color: "#fff", marginTop: 12, fontSize: 14, textAlign: "center" }}>
            {isStaticMode ? "✓ Demo: obuna qabul qilindi (backend ulanmagan)." : "✓ Successfully subscribed!"}
          </p>
        )}
      </div>
    </div>
  );
}
