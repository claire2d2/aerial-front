import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div className="flex flex-col h-full w-full overflow-scroll no-scrollbar bg-blue-50 dark:bg-slate-800">
      <div className="h-12 w-full bg-cyan-700 dark:bg-cyan-950 dark:text-white">
        <NavBar />
      </div>

      <div className="Outlet overflow-auto no-scrollbar h-full">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
