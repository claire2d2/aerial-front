import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  const linkStyle = "hover:cursor-pointer hover:text-golden transition-all";
  return (
    <footer className="h-full flex justify-between px-10 font-semibold items-center ">
      <div className={linkStyle} onClick={() => navigate("/about")}>
        About
      </div>
      <div className={linkStyle} onClick={() => navigate("/contact")}>
        Contact
      </div>
      <div className={linkStyle} onClick={() => navigate("/site")}>
        Site Map
      </div>
    </footer>
  );
};

export default Footer;
