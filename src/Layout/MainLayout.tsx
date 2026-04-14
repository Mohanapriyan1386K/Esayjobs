import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function MainLayout() {
  return (
    <div style={{ backgroundColor: "transparent" }}>
      <Navbar />
      <div style={{ minHeight: "80vh", margin: " 0 auto" }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
