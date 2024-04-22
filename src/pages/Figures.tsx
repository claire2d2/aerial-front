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
} from "../components/PagesComponents/FiguresFunctions";

// imports for styling
import SortBy from "../components/PagesComponents/AllFiguresPageComponents/SortBy";
import MobileFilter from "../components/PagesComponents/AllFiguresPageComponents/MobileFilter";
import ShowFigures from "../components/PagesComponents/AllFiguresPageComponents/ShowFigures";
import LevelAccordion from "../components/PagesComponents/AllFiguresPageComponents/LevelAccordion";
import AddFigure from "../components/PagesComponents/FigureElements/AddFigure";
import { Modal } from "flowbite-react";

const Figures = () => {
  const { currDiscipline, activeFilters, sortBy, modViewOn } = useUser();
  const [figures, setFigures] = useState<figType[]>([]);
  const [statesData, setStatesData] = useState<statusType[]>([]);
  const [faveData, setFaveData] = useState<faveType[]>([]);

  // fetch figures when page renders
  useEffect(() => {
    if (currDiscipline) {
      fetchFigures(currDiscipline._id, setFigures, [], []);
    }
  }, [currDiscipline]);

  // when filters are chosen and unchosen, set the "states" to fetch the figures that are concerned by the statuses
  useEffect(() => {
    if (currDiscipline) {
      if (activeFilters.length !== 0) {
        fetchFigures(currDiscipline._id, setFigures, [], []);
        fetchFigStatus(setStatesData, activeFilters);
        fetchFaves(setFaveData);
      } else {
        fetchFigures(currDiscipline._id, setFigures, [], []);
      }
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

  // open form to create new figure (mods only)
  const [openModal, setOpenModal] = useState(false);

  if (figures.length === 0) {
    return <p>Loading!</p>;
  }
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-full items-center">
        <h1 className="text-2xl">
          <span className="capitalize">{currDiscipline?.name}</span> figures
        </h1>
        {modViewOn ? (
          <div className="flex gap-1">
            <button
              onClick={() => setOpenModal(true)}
              className="bg-main px-2 rounded-lg text-white"
            >
              {" "}
              +{" "}
            </button>
            Add new figure
          </div>
        ) : (
          ""
        )}
        <div>
          <SortBy />
        </div>
      </div>
      <div className="hidden">Search bar (drop down when mobile)</div>
      <div className="w-full">
        <MobileFilter />
      </div>

      {sortBy === "level" ? (
        <LevelAccordion figures={shownFigures} />
      ) : shownFigures.length === 0 ? (
        <div>There are no figures to display with the given filters</div>
      ) : (
        <ShowFigures shownFigures={shownFigures} />
      )}
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <AddFigure />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Figures;
