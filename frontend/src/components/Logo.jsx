export default function Logo({ light = true }) {
  const color = light ? "#fff" : "#be1e2d";
  return (
    <div className="logo">
      <svg className="logo__icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 6C18 6 14 12 14 18C14 22 16 26 18 28V32H30V28C32 26 34 22 34 18C34 12 30 6 24 6Z" fill={color} opacity="0.9"/>
        <path d="M12 28C10 30 8 34 8 38C8 42 12 44 16 44H32C36 44 40 42 40 38C40 34 38 30 36 28" stroke={color} strokeWidth="2" fill="none"/>
        <circle cx="18" cy="16" r="2" fill={light ? "#be1e2d" : "#fff"}/>
        <circle cx="30" cy="16" r="2" fill={light ? "#be1e2d" : "#fff"}/>
        <path d="M20 22C22 24 26 24 28 22" stroke={light ? "#be1e2d" : "#fff"} strokeWidth="1.5" fill="none"/>
      </svg>
      <span className="logo__text" style={!light ? { color: "#be1e2d" } : undefined}>EATURKISH</span>
    </div>
  );
}
