import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div className="Layout h-full overflow-scroll no-scrollbar">
      <div className="text-text bg-bgmain dark:bg-bgmaindark dark:text-textdark h-full overscroll-auto no-scrollbar">
        <div className="sticky top-0 z-10 h-nav w-full bg-gradient-to-r from-main via-mainvariant to-main shadow-md">
          <NavBar />
        </div>
        <div className="overflow-scroll no-scrollbar ">
          <div className="h-outlet">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
