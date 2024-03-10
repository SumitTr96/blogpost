import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="d-flex flex-column vh-100">
      <Header />
      <main className="flex-grow-1 container-fluid">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
