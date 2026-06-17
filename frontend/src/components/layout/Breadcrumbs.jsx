import { Link } from "react-router-dom";

export default function Breadcrumbs({ items }) {
  return (
    <div className="container breadcrumbs">
      {items.map((item, i) => (
        <span key={item.label}>
          {i > 0 && " > "}
          {item.path ? <Link to={item.path}>{item.label}</Link> : item.label}
        </span>
      ))}
    </div>
  );
}
