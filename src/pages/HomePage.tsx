import useUser from "../context/useUser";

import Discipline from "../components/HomePageComponents/Discipline";
import PoleDanceImg from "./../assets/poleDanceBg.jpg";
import AerialHoopImg from "./../assets/aerialHoopBg.jpg";

//TODO change curr discipline when navigating between pages
const HomePage = () => {
  const { isLoggedIn } = useUser();

  const showIfLoggedOut = (
    <div className="flex flex-col lg:justify-center gap-1 h-1/2  w-5/6  lg:py-40 lg:px-20 lg:w-1/3 text-center z-9 bg-bgmain rounded-lg ">
      <div>
        <p className="font-semibold">New to the website?</p>
        <button className="bg-main px-4 py-2 text-white font-bold rounded-lg">
          Join now
        </button>
      </div>
      <div>
        <p className="font-semibold">Or get back to where you left off!</p>
        <button className="bg-main px-4 py-2 text-white font-bold rounded-lg">
          Log in
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-full w-full flex flex-col bg-main">
      <div
        style={{
          backgroundImage: "url('./../../public/cloudsBG.jpg')",
        }}
        className="flex flex-col bg-cover lg:flex-row lg:justify-center  text-center gap-2 items-center justify-center"
      >
        <div
          className={`z-9 h-1/2 lg:h-full flex flex-col justify-center lg:py-40 ${
            isLoggedIn ? "w-full" : "w-1/2"
          }`}
        >
          <h1 className="text-3xl text-white">
            Welcome {isLoggedIn ? "back" : ""}!
          </h1>
          <div className="text-white">
            Let us help you fly away to reach your highest dreams (or at least
            your aerial goals)
          </div>
        </div>
        {isLoggedIn ? "" : showIfLoggedOut}
      </div>

      <Discipline
        name="Pole Dance"
        image={PoleDanceImg}
        active={true}
        link="pole"
      />
      <Discipline
        name="Aerial Hoop"
        image={AerialHoopImg}
        active={false}
        link="aerial-hoop"
      />
      <Discipline
        name="Contorsion"
        image={PoleDanceImg}
        active={false}
        link="contorsion"
      />
    </div>
  );
};

export default HomePage;
