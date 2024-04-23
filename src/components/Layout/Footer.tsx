import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  const linkStyle = "hover:cursor-pointer hover:text-golden transition-all";
  return (
    <footer className="h-full bg-main text-white flex justify-between px-10 font-semibold items-center">
      <div className={linkStyle} onClick={() => navigate("/about")}>
        About
      </div>
      <div className={linkStyle} onClick={() => navigate("/privacy")}>
        Privacy Policy
      </div>
      <div className={linkStyle} onClick={() => navigate("/site")}>
        Site Map
      </div>
    </footer>
  );
};

export default Footer;
