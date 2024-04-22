import useUser from "../context/useUser";
import { useNavigate } from "react-router-dom";

import Discipline from "../components/PagesComponents/HomePageComponents/Discipline";

//TODO change curr discipline when navigating between pages
const HomePage = () => {
  const { isLoggedIn } = useUser();
  const navigate = useNavigate();

  const showIfLoggedOut = (
    <div className="flex flex-col px-3 py-1 mb-5 lg:justify-center gap-1 h-1/2  w-5/6  lg:py-20 lg:px-10 lg:mx-10 lg:w-1/3 text-center z-9 bg-bgmain rounded-lg ">
      <div className="py-2">
        <p className="font-semibold">New to the website?</p>
        <button
          onClick={() => navigate("/signup")}
          className="bg-main px-4 py-2 text-white font-bold rounded-lg"
        >
          Join now
        </button>
      </div>
      <div className="pb-10 lg:pb-1">
        <p className="font-semibold">Or get back to where you left off!</p>
        <button
          onClick={() => navigate("/login")}
          className="bg-main px-4 py-2 text-white font-bold rounded-lg mb-5 lg:mb-1"
        >
          Log in
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-full w-full flex flex-col">
      <div
        style={{
          backgroundImage: "url('cloudsBG.jpg')",
        }}
        className="flex flex-col p-2 h-80 bg-cover lg:flex-row lg:justify-center  text-center gap-2 items-center justify-center"
      >
        <div
          className={`z-9 gap-3 h-1/2 lg:h-full flex flex-col justify-center lg:py-20  font-display`}
        >
          <h1 className="text-4xl   font-extrabold w-full text-white  drop-shadow-md">
            Welcome {isLoggedIn ? "back" : ""}!
          </h1>
          <div className="text-white">
            Let us help you fly away to reach your highest dreams (or at least
            your aerial goals)
          </div>
        </div>
        {isLoggedIn ? "" : showIfLoggedOut}
      </div>
      <div className="bg-main text-white">
        <h2 className="font-display">Website features:</h2>
        <div>List website features here</div>
      </div>
      <Discipline
        name="Pole Dance"
        image="/poleDanceBg.jpg"
        active={true}
        link="pole"
      />
      <Discipline
        name="Aerial Hoop"
        image="/aerialHoopBg.jpg"
        active={false}
        link="aerial-hoop"
      />
      <Discipline
        name="Contorsion"
        image="/contorsionBG.jpg"
        active={false}
        link="contorsion"
      />
    </div>
  );
};

export default HomePage;
