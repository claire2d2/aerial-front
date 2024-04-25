import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div className="Layout relative max-h-screen flex flex-col overflow-scroll no-scrollbar text-text bg-bgmain dark:bg-bgmaindark dark:text-textdark font-display">
      <div className="sticky top-0 z-10 h-nav w-full bg-gradient-to-r from-main dark:from-maindark via-mainvariant to-main dark:to-maindark shadow-md">
        <NavBar />
      </div>
      <div className="h-outlet overflow-y-auto no-scrollbar">
        <Outlet />
      </div>
      <div className="sticky bottom-0 z-0 h-footer w-full bg-gradient-to-r from-main dark:from-maindark via-mainvariant to-main dark:to-maindark text-white">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
