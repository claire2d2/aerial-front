import useUser from "../context/useUser";

import WebsiteIntro from "../components/PagesComponents/HomePageComponents/WebsiteIntro";
import Features from "../components/PagesComponents/HomePageComponents/Features";
import Discipline from "../components/PagesComponents/HomePageComponents/Discipline";

//TODO change curr discipline when navigating between pages
const HomePage = () => {
  const { isLoggedIn } = useUser();

  return (
    <div
      className="h-full w-full flex flex-col flex-1 bg-cover"
      style={{
        backgroundImage: "url('cloudsBG.jpg')",
      }}
    >
      <div className="flex flex-col p-2 h-96 lg:flex-row lg:justify-center  text-center gap-2 items-center justify-center">
        <div
          className={`z-9 gap-3 h-1/2 lg:h-full flex flex-col justify-center lg:py-20  font-display lg:w-1/2`}
        >
          <h1 className=" text-4xl lg:text-6xl   font-bold w-full text-white  drop-shadow-md">
            Welcome {isLoggedIn ? "back" : ""} to Air2D2!
          </h1>
        </div>
      </div>
      <div>
        <WebsiteIntro />
      </div>
      <div className="bg-cover">
        <Features />
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
