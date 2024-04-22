import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div className="Layout relative h-screen overflow-scroll no-scrollbar text-text bg-bgmain dark:bg-bgmaindark dark:text-textdark font-display">
      <div className="sticky top-0 z-10 h-nav w-full bg-gradient-to-r from-main via-mainvariant to-main shadow-md">
        <NavBar />
      </div>
      <div className="h-outlet overflow-y-auto no-scrollbar">
        <Outlet />
      </div>
      <div className="sticky bottom-0 z-0 h-footer w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
