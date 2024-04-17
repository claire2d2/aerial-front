import { Link } from "react-router-dom";
import Discipline from "../components/HomePageComponents/Discipline";
import PoleDanceImg from "../assets/poleDanceBg.jpg";
import AerialHoopImg from "../assets/aerialHoopBg.jpg";

//TODO change curr discipline when navigating between pages
const HomePage = () => {
  return (
    <div className="h-full w-full flex flex-col gap-2">
      <div>
        <h1>Welcome to Air2d2</h1>
      </div>
      <Discipline
        name="Pole Dance"
        image={PoleDanceImg}
        active={true}
        link="/pole"
      />
      <Discipline
        name="Aerial Hoop"
        image={AerialHoopImg}
        active={false}
        link="/comingsoon"
      />
      <Discipline
        name="Contorsion"
        image={PoleDanceImg}
        active={false}
        link="/comingsoon"
      />
      <Discipline
        name="Aerial Hammock"
        image={PoleDanceImg}
        active={false}
        link="/comingsoon"
      />
    </div>
  );
};

export default HomePage;
