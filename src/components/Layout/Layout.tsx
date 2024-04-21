import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div className="Layout h-full overflow-scroll no-scrollbar text-text bg-bgmain dark:bg-bgmaindark dark:text-textdark">
      <div className="sticky top-0 z-10 h-nav w-full bg-gradient-to-r from-main via-mainvariant to-main shadow-md">
        <NavBar />
      </div>
      <div className="flex-1 relative overflow-y-auto no-scrollbar">
        <Outlet />

        <div className="sticky bottom-0 h-footer">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
