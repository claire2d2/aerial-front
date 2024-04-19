import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import aerialApi from "../service/aerialApi";
import useUser from "../context/useUser";
import { figType } from "../components/Types";

// imports for styling
import MobileFilter from "../components/AllFiguresPageComponents/MobileFilter";

const Figures = () => {
  const { currDiscipline, currDisciplineRef } = useUser();

  const [figures, setFigures] = useState<figType[]>([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function fetchFigures() {
    try {
      const response = await aerialApi.get(`/figures/by/${currDisciplineRef}`);
      console.log(response.data);
      setFigures(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchFigures();
  }, [currDiscipline]);

  if (figures.length === 0) {
    return <p>Loading!</p>;
  }
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-full">
        <h1 className="text-2xl">
          <span className="capitalize">{currDiscipline}</span> figures
        </h1>
        <div>Sort by</div>
      </div>
      <div className="hidden">Search bar (drop down when mobile)</div>
      <div className="w-full">
        <MobileFilter />
      </div>

      <div className="AllFigs w-full px-2 overflow-scroll no-scrollbar grid grid-cols-2 lg:grid-cols-5 grid-flow-row gap-3">
        {figures.map((fig, index) => {
          return (
            <div
              key={index}
              className="aspect-square h-full rounded-lg drop-shadow-xl"
            >
              <Link to={fig.ref}>
                <div
                  style={{
                    backgroundImage: `url(${fig.image})`,
                  }}
                  className="relative h-full bg-cover bg-center aspect-square rounded-lg"
                >
                  <div className="absolute uppercase flex items-center justify-center text-white text-xl inset-0 text-center font-bold bg-maindark bg-opacity-50 hover:bg-opacity-20 active:bg-opacity-20">
                    {fig.name}
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Figures;
