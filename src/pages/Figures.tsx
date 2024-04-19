import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import aerialApi from "../service/aerialApi";
import useUser from "../context/useUser";
import { figType, statusType, faveType } from "../components/Types";

// import external functions
import { fetchFigures } from "../components/AllFiguresPageComponents/FetchAllFigsData";

// imports for styling
import SortBy from "../components/AllFiguresPageComponents/SortBy";
import MobileFilter from "../components/AllFiguresPageComponents/MobileFilter";

const Figures = () => {
  const { currDiscipline, currDisciplineRef, activeFilters, sortBy } =
    useUser();
  const [figures, setFigures] = useState<figType[]>([]);
  const [statesData, setStatesData] = useState<statusType[]>([]);
  const [faveData, setFaveData] = useState<faveType[]>([]);

  // fetch figures when page renders
  useEffect(() => {
    fetchFigures(currDisciplineRef, setFigures);
  }, [currDiscipline]);

  // when filters are chosen and unchosen, set the "states" to fetch the figures that are concerned by the statuses
  useEffect(() => {
    if (activeFilters.length !== 0) {
      fetchFigures(currDisciplineRef, setFigures);
      fetchFigStatus();
      fetchFaves();
    } else {
      fetchFigures(currDisciplineRef, setFigures);
    }
  }, [activeFilters]);

  async function fetchFigStatus() {
    try {
      const queryParams = new URLSearchParams({
        filtersQuery: activeFilters.join(","),
      });
      const response = await aerialApi.get(`/states?${queryParams}`);
      setStatesData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  // fetch the favorites
  async function fetchFaves() {
    try {
      const response = await aerialApi.get("/favorites");
      setFaveData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  // filter through the front end depending on the filters chosen

  let shownFigures;
  if (activeFilters.length === 0) {
    shownFigures = figures;
  } else {
    const figsWithFaves = faveData.map((fave) => fave.figure);
    const figsWithStates = statesData.map((state) => state.figure);
    if (activeFilters.includes("Favorites")) {
      // only the favorites button is selected
      if (activeFilters.length === 1) {
        shownFigures = figsWithFaves;
        console.log("shown", shownFigures);
      }
      // favorite and another filter button is selected
      else {
        // find the ids in common between the favorites and the states filters
        const idsInCommon = figsWithStates
          .map((stateFig) => stateFig._id)
          .filter((stateFig) =>
            figsWithFaves.map((faveFig) => faveFig._id).includes(stateFig)
          );
        const result = figures.filter((fig) => idsInCommon.includes(fig._id));
        shownFigures = result;
      }
    }
    // other filters than favorites are selected
    else {
      shownFigures = figsWithStates;
    }
  }

  if (figures.length === 0) {
    return <p>Loading!</p>;
  }
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-full">
        <h1 className="text-2xl">
          <span className="capitalize">{currDiscipline}</span> figures
        </h1>
        <div>
          <SortBy />
        </div>
      </div>
      <div className="hidden">Search bar (drop down when mobile)</div>
      <div className="w-full">
        <MobileFilter />
      </div>

      {shownFigures.length === 0 ? (
        <div>There are no figures to display with the given filters</div>
      ) : (
        <div className="AllFigs w-full px-2 overflow-scroll no-scrollbar grid grid-cols-2 lg:grid-cols-5 grid-flow-row gap-3">
          {shownFigures.map((fig, index) => {
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
      )}
    </div>
  );
};

export default Figures;
