import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div className="relative h-screen w-full overflow-scroll no-scrollbar bg-blue-50 dark:bg-slate-800">
      <div className="sticky top-0 h-32 bg-main object-fill w-full">
        <div className="absolute bg-white bg-opacity-35 h-full w-full inset-0 text-white flex flex-col items-center justify-center">
          <h1 className="text-3xl">AIR2D2</h1>
          <h2>Your aerial buddy</h2>
        </div>
      </div>

      <div className="sticky Outlet text-text bg-bgmain dark:bg-bgmaindark dark:text-textdark flex flex-col">
        <div className="sticky top-0 z-10 h-12 w-full bg-main dark:bg-maindark">
          <NavBar />
        </div>
        <div className="h-full overscroll-auto">
          <Outlet />
        </div>
      </div>
      <div className="h-12 text-text dark:bg-bgmaindark dark:text-white">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
