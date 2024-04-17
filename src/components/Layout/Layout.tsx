import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div className="flex flex-col h-full w-full overflow-scroll no-scrollbar bg-blue-50 dark:bg-slate-800">
      <div className="h-12 w-full bg-main dark:bg-maindark text-white">
        <NavBar />
      </div>

      <div className="Outlet overflow-auto no-scrollbar h-full text-text bg-bgmain dark:bg-bgmaindark dark:text-textdark">
        <Outlet />
      </div>

      <div className="dark:bg-bgmaindark text-white">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
