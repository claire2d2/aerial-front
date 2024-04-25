import { useState, useEffect } from "react";
import useUser from "../context/useUser";
import { fetchFigures } from "../components/PagesComponents/FiguresFunctions";
import { figType } from "../components/Types";
const Contorsion = () => {
  const { currDiscipline } = useUser();
  const [contorsionFigs, setContorsionFigs] = useState<figType[]>([]);
  useEffect(() => {
    if (currDiscipline) {
      fetchFigures(currDiscipline._id, setContorsionFigs, [], []);
    }
  }, [currDiscipline]);
  return (
    <div className="flex flex-col w-full h-auto items-center text-center overflow-scroll no-scrollbar">
      <div className="Header relative w-full flex flex-col gap-5 h-64 lg:h-80  items-center justify-center">
        <img
          src="/aerialHoopBg.jpg"
          alt=""
          className="object-cover h-full w-full brightness-50"
        />
        <h1 className="PageTitle absolute text-6xl text-white font-display bg-contain font-extrabold">
          Contorsion
        </h1>
      </div>
      <div className="AerialHoopDescr flex flex-col  w-full h-96 gap-5  bg-main dark:bg-maindark text-white py-10 px-10 lg:text-xl font-medium bg-cover">
        Contorsion under construction! There{" "}
        {contorsionFigs.length > 1 ? "are " : "is "} only{" "}
        {contorsionFigs.length} figure
        {contorsionFigs.length > 1 ? "s " : " "}
        for the moment.
      </div>
    </div>
  );
};

export default Contorsion;
