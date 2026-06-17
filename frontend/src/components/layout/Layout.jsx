import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import Newsletter from "./Newsletter.jsx";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <div style={{ padding: "60px 0 0", background: "#f5f5f5" }}>
        <Newsletter />
      </div>
      <Footer />
    </>
  );
}
