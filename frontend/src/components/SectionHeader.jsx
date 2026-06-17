export default function SectionHeader({ subtitle, title, center = true }) {
  return (
    <div style={{ textAlign: center ? "center" : "left", marginBottom: 50 }}>
      <span style={{
        color: "#E63946", fontSize: 13, fontWeight: 700, letterSpacing: 3,
        textTransform: "uppercase", fontFamily: "'Lato', sans-serif",
        display: "block", marginBottom: 8,
      }}>{subtitle}</span>
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(28px, 4vw, 42px)",
        color: "#1a1a1a", fontWeight: 700, margin: 0,
      }}>{title}</h2>
      <div style={{
        width: 50, height: 3, background: "#E63946",
        margin: center ? "16px auto 0" : "16px 0 0",
        borderRadius: 2,
      }} />
    </div>
  );
}
