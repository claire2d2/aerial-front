import { useNavigate } from "react-router-dom";

const NavBarLoggedOut = () => {
  const navigate = useNavigate();
  const currentLink = location.pathname.split("/")[1];
  return (
    <div className="flex gap-6 w-full text-white font-semibold mr-10 h-full">
      <div
        onClick={() => navigate("/signup")}
        className={`hover:text-linkhover cursor-pointer ${
          currentLink === "signup" ? "text-linkhover" : "text-white"
        }`}
      >
        Sign up
      </div>
      <div
        onClick={() => navigate("/login")}
        className={`hover:text-linkhover cursor-pointer caret-none ${
          currentLink === "login" ? "text-linkhover" : "text-white"
        }`}
      >
        Log In
      </div>
    </div>
  );
};

export default NavBarLoggedOut;
