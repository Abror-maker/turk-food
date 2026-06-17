import { NavLink, Link } from "react-router-dom";
import Logo from "../Logo.jsx";
import { navLinks } from "../../data/data.js";

export default function Navbar() {
  return (
    <header className="header">
      <div className="container header__inner">
        <NavLink to="/">
          <Logo />
        </NavLink>
        <nav className="header__nav">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) => `header__link${isActive ? " header__link--active" : ""}`}
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/contact" className="header__login">Book</Link>
        </nav>
      </div>
    </header>
  );
}
