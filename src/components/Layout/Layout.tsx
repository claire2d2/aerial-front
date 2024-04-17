import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div className="relative h-screen w-full overflow-scroll no-scrollbar bg-blue-50 dark:bg-slate-800">
      <div className="sticky top-0 z-10 h-12 w-full bg-gradient-to-r from-main via-mainvariant to-main shadow-md">
        <NavBar />
      </div>
      <div className="Outlet text-text bg-bgmain dark:bg-bgmaindark dark:text-textdark flex flex-col">
        <div className="h-full overscroll-auto">
          <Outlet />
        </div>
      </div>
      <div className="h-8 bg-main text-white">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
