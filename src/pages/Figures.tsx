import { useState, useEffect } from "react";
import useUser from "../context/useUser";
import { figType, statusType, faveType } from "../components/Types";

// import external functions
import {
  fetchFigures,
  fetchFigStatus,
  fetchFaves,
  filterFigures,
  sortFiguresAlpha,
} from "../components/AllFiguresPageComponents/AllFiguresFunctions";

// imports for styling
import SortBy from "../components/AllFiguresPageComponents/SortBy";
import MobileFilter from "../components/AllFiguresPageComponents/MobileFilter";
import ShowFigures from "../components/AllFiguresPageComponents/ShowFigures";

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
      fetchFigStatus(setStatesData, activeFilters);
      fetchFaves(setFaveData);
    } else {
      fetchFigures(currDisciplineRef, setFigures);
    }
  }, [activeFilters]);

  // filture figures based on filters
  const shownFigures: figType[] = filterFigures(
    figures,
    activeFilters,
    faveData,
    statesData
  );

  // sort filters based on sorting choice
  useEffect(() => {
    sortFiguresAlpha(figures, sortBy, setFigures);
  }, [sortBy]);

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
        <ShowFigures shownFigures={shownFigures} />
      )}
    </div>
  );
};

export default Figures;
