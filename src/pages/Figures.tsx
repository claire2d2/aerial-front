import { useState, useEffect } from "react";
import useUser from "../context/useUser";
import { figType, statusType, faveType } from "../components/Types";
import { toastTheme } from "../components/Styles";

// import external functions
import {
  fetchFigures,
  fetchFigStatus,
  fetchFaves,
  filterFigures,
  sortFiguresAlpha,
  fetchAllFaves,
  sortFiguresPopularity,
} from "../components/PagesComponents/FiguresFunctions";

// imports for styling
import SortBy from "../components/PagesComponents/AllFiguresPageComponents/SortBy";
import SearchBar from "../components/GlobalComponents/SearchBar";
import FigFilter from "../components/PagesComponents/AllFiguresPageComponents/FigFilter";
import ShowFigures from "../components/PagesComponents/AllFiguresPageComponents/ShowFigures";
import LevelAccordion from "../components/PagesComponents/AllFiguresPageComponents/LevelAccordion";
import AddFigure from "../components/PagesComponents/AllFiguresPageComponents/AddFigure";
import { Toast } from "flowbite-react";
import { HiFire, HiExclamation } from "react-icons/hi";

//! Component starts here
const Figures = () => {
  const { currDiscipline, activeFilters, sortBy, modViewOn } = useUser();
  const [figures, setFigures] = useState<figType[]>([]);
  const [statesData, setStatesData] = useState<statusType[]>([]);
  // for the user's personal favorites
  const [faveData, setFaveData] = useState<faveType[]>([]);
  // for all the favorites
  const [allFaves, setAllFaves] = useState<faveType[]>([]);
  // use state, if mod mode is on, user can add a figure
  const [showFigForm, setShowFigForm] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  // fetch all faves when page renders
  useEffect(() => {
    fetchAllFaves(setAllFaves);
  }, [currDiscipline]);

  // when filters are chosen and unchosen, set the "states" to fetch the figures that are concerned by the statuses
  useEffect(() => {
    if (currDiscipline) {
      // set condition bc fetching doesn't work if filters are empty
      if (activeFilters.length !== 0) {
        fetchFigures(currDiscipline._id, setFigures, [], []);
        fetchFigStatus(setStatesData, activeFilters);
        fetchFaves(setFaveData);
      } else {
        fetchFigures(currDiscipline._id, setFigures, [], []);
      }
    }
  }, [activeFilters, currDiscipline]);

  // filture figures based on filters
  const shownFigures: figType[] = filterFigures(
    figures,
    activeFilters,
    faveData,
    statesData
  );

  // sort filters based on sorting choice
  useEffect(() => {
    if (sortBy === "aToZ" || sortBy === "zToA") {
      sortFiguresAlpha(figures, sortBy, setFigures);
    } else if (sortBy === "popularity") {
      sortFiguresPopularity(allFaves, figures, setFigures);
    }
  }, [sortBy]);

  // show or collapse form
  const handleShowForm = () => {
    if (showFigForm) {
      setShowFigForm(false);
    } else {
      setShowFigForm(true);
    }
  };

  if (figures.length === 0) {
    return <p>Loading!</p>;
  }
  return (
    <div className="flex flex-col items-center relative lg:px-4">
      <div className="flex justify-between w-full items-center">
        <h1 className="text-5xl py-5 text-title dark:text-textdark font-romantic w-full lg:text-center">
          <span>🕊️</span>{" "}
          <span className="capitalize ">{currDiscipline?.name}</span> figures
        </h1>

        <div className="lg:hidden">
          <SortBy />
        </div>
      </div>
      {modViewOn && currDiscipline ? (
        <div>
          <div className="flex gap-1 justify-start w-full px-2">
            <button
              onClick={handleShowForm}
              className="bg-main px-2 rounded-lg text-white"
            >
              {showFigForm ? "-" : "+"}
            </button>
            {showFigForm ? "Hide form" : "Add a new figure"}
          </div>
          <div className={showFigForm ? "block" : "hidden"}>
            <AddFigure
              currDiscipline={currDiscipline}
              setFigures={setFigures}
              setShowFigForm={setShowFigForm}
              setShowToast={setShowToast}
              setToastMessage={setToastMessage}
            />
          </div>
          {showToast && (
            <Toast theme={toastTheme}>
              <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                {toastMessage === "Figure has been successfully added!" ? (
                  <HiFire className="h-5 w-5" />
                ) : (
                  <HiExclamation className="h-5 w-5" />
                )}
              </div>
              <div className="ml-3 text-sm font-normal">{toastMessage}</div>
              <Toast.Toggle />
            </Toast>
          )}
        </div>
      ) : (
        ""
      )}
      {/*
       **Filters: show different for mobile and PC users
       */}
      <div className="w-full lg:hidden">
        <FigFilter />
      </div>

      <div className="hidden lg:flex lg:justify-between lg:w-full lg:gap-10">
        <div className="basis-1/4">
          <div className="font-semibold text-main dark:text-textdark">
            Go to figure page:
          </div>
          <SearchBar
            figures={figures}
            placeholder="..."
            searchAction="navigate"
            onFigureSelect={null}
            setFigure={null}
          />
        </div>
        <FigFilter />
        <div>
          <SortBy />
        </div>
      </div>

      {sortBy === "level" ? (
        <LevelAccordion figures={shownFigures} />
      ) : shownFigures.length === 0 ? (
        <div>There are no figures to display with the given filters</div>
      ) : (
        <ShowFigures shownFigures={shownFigures} />
      )}
    </div>
  );
};

export default Figures;
