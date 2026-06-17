export default function Stars({ count }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ color: s <= count ? "#E63946" : "#ddd", fontSize: 14 }}>★</span>
      ))}
    </div>
  );
}
