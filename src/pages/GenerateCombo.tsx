import { useState, useEffect, SetStateAction } from "react";
import useUser from "../context/useUser";
import { figType, zoneType, statusType } from "../components/Types";
import {
  fetchFigures,
  fetchZones,
  fetchFigStatus,
} from "../components/PagesComponents/FiguresFunctions";

// elements for styling
import FilterAccordion from "../components/PagesComponents/GenerateComboPage/FilterAccordion";
import { Tooltip } from "flowbite-react";
import FiguresCounter from "../components/PagesComponents/GenerateComboPage/FiguresCounter";
import ComboSection from "../components/PagesComponents/GenerateComboPage/ComboSection";
const filtButtonStyle =
  "rounded-lg bg-white drop-shadow-sm py-1 px-2 capitalize dark:bg-main dark:text-white dark:hover:bg-maindark hover:bg-bgmainlight active:bg-main active:text-white";
const toolTipTheme = {
  target: "w-fit",
  animation: "transition-opacity",
  base: "absolute z-10 inline-block rounded-lg px-3 py-2 text-sm font-medium shadow-sm",
  hidden: "invisible opacity-0",
  style: {
    auto: "border border-text bg-main text-main ",
  },
  content:
    "relative z-20 bg-white text-text dark:bg-main dark:text-white p-1 rounded-lg",
};

const GenerateCombo = () => {
  const { currDisciplineRef } = useUser();
  const [zones, setZones] = useState<zoneType[]>([]);
  // initial state for filters array
  const difficulties = ["beginner", "intermediate", "advanced"];

  const statuses = [
    "Not seen yet",
    "Wishlist",
    "Training",
    "Left Side",
    "Right Side",
  ];
  const [initialZoneFilts, setInitialZoneFilts] = useState<string[]>([]);
  const [statesData, setStatesData] = useState<statusType[]>([]);

  // states for filters
  const [activeFilts, setAllActiveFilts] = useState<string[]>(["Mastered"]);
  const [zoneFilts, setZoneFilts] = useState<string[]>([]);
  const [activeZoneFilts, setActiveZoneFilts] = useState<string[]>([]);
  const [levelFilts, setLevelFilts] = useState<string[]>(difficulties);
  const [activeLevelFilts, setActiveLevelFilts] = useState<string[]>([]);
  const [statusFilts, setStatusFilts] = useState<string[]>(statuses);
  const [activeStatusFilts, setActiveStatusFilts] = useState<string[]>([
    "Mastered",
  ]);
  const [comboFigs, setComboFigs] = useState<figType[]>([]);
  const [comboFigsWithStates, setComboFigsWithStates] = useState<figType[]>([]);

  // determine how many moves the combo generator should generate (state lifted to FiguresCounter)
  const [nbOfMoves, setNbOfMoves] = useState<number>(3);

  // generate a random combo
  const [generatedCombo, setGeneratedCombo] = useState<figType[]>([]);

  function generateRandomCombo(
    e: React.MouseEvent<HTMLElement>,
    nbOfMoves: number
  ) {
    e.preventDefault();
    const comboArray: figType[] = [];

    for (let i = 0; i < nbOfMoves; i++) {
      findRandomFigure(comboArray);
    }
    setGeneratedCombo(comboArray);
  }

  async function findRandomFigure(comboArray: figType[]) {
    const randomIndex = Math.floor(Math.random() * comboFigsWithStates.length);
    const randomFigure = comboFigsWithStates[randomIndex];
    if (comboArray.includes(randomFigure)) {
      findRandomFigure(comboArray);
    } else {
      comboArray.push(randomFigure);
    }
  }

  // fetch initial data for figures data and available zones
  useEffect(() => {
    fetchFigures(
      currDisciplineRef,
      setComboFigs,
      activeLevelFilts,
      activeZoneFilts
    );
    fetchZones(setZones);
    const zoneFiltNames: string[] = [];
    zones.forEach((zone) => zoneFiltNames.push(zone.name));
    setInitialZoneFilts(zoneFiltNames);
    setZoneFilts(zoneFiltNames);
    fetchFigStatus(setStatesData, activeFilts);
  }, []);

  useEffect(() => {
    fetchFigStatus(setStatesData, activeFilts);
    const figsWithStates = statesData.map((state) => state.figure);
    console.log(figsWithStates);
    setComboFigsWithStates(figsWithStates);
    console.log(comboFigs);
  }, [statesData, activeStatusFilts]);

  // update combo figures when level and zone filts are selected
  useEffect(() => {
    if (activeFilts.length !== 0) {
      fetchFigures(
        currDisciplineRef,
        setComboFigs,
        activeLevelFilts,
        activeZoneFilts
      );
    } else {
      fetchFigures(currDisciplineRef, setComboFigs, [], []);
    }
  }, [levelFilts, zoneFilts, statusFilts]);

  // when clicking on a filter
  async function handleClickFilter(
    e: React.MouseEvent<HTMLElement>,
    filtersArray: string[],
    setFiltersArray: React.Dispatch<SetStateAction<string[]>>,
    activeFiltersArray: string[],
    setActiveFiltersArray: React.Dispatch<SetStateAction<string[]>>,
    clickedFilter: string
  ) {
    e.preventDefault();
    // when clicking on a filter, add it to the active filters array
    setAllActiveFilts([...activeFilts, clickedFilter]);
    // add if to the concerned active filter array
    setActiveFiltersArray([...activeFiltersArray, clickedFilter]);
    // and remove it from the concerned filter array (filters that are still shown to the user=)
    const copy = filtersArray.filter((filt) => filt !== clickedFilter);
    setFiltersArray(copy);
  }

  async function handleRemoveActiveFilter(
    e: React.MouseEvent<HTMLElement>,
    clickedFilterToRemove: string
  ) {
    e.preventDefault();
    // remove filter from all active filters array
    const copy = activeFilts.filter((filt) => filt !== clickedFilterToRemove);
    setAllActiveFilts(copy);
    // remove filter from the concerned active filters array
    // put filter back into the shown filters array
    if (difficulties.includes(clickedFilterToRemove)) {
      const copy = activeLevelFilts.filter(
        (filt) => filt !== clickedFilterToRemove
      );
      setActiveLevelFilts(copy);
      setLevelFilts([...levelFilts, clickedFilterToRemove]);
    }
    if (initialZoneFilts.includes(clickedFilterToRemove)) {
      const copy = activeZoneFilts.filter(
        (filt) => filt !== clickedFilterToRemove
      );
      setActiveZoneFilts(copy);
      setZoneFilts([...zoneFilts, clickedFilterToRemove]);
    }
    if (statuses.includes(clickedFilterToRemove)) {
      const copy = activeStatusFilts.filter(
        (filt) => filt !== clickedFilterToRemove
      );
      setActiveStatusFilts(copy);
      setStatusFilts([...statusFilts, clickedFilterToRemove]);
    }
  }

  //TEST
  const comboTest = comboFigsWithStates;
  return (
    <div className="GenerateCombo w-full flex flex-col lg:flex-row lg:h-full">
      <div className="ComboExplanations flex flex-col lg:h-full lg:basis-1/2 overflow-scroll no-scrollbar">
        <h1 className="w-full text-center text-main dark:text-textdark font-bold text-3xl font-display py-4">
          Combo Generator
        </h1>
        <div>
          Test{" "}
          {comboTest.map((fig) => {
            return <div>{fig.name}</div>;
          })}
        </div>
        <div className="flex flex-col text-left">
          <h2 className="font-display text-2xl font-semibold text-main dark:text-textdark py-2 text-center">
            How it works
          </h2>
          <div className="flex flex-col gap-2">
            <div className="flex">
              {comboFigs.map((fig) => {
                return <div>{fig.name}</div>;
              })}
            </div>
            <p>
              Start by setting the number of figures you want in your combo
              (limited to 8)
            </p>
            <p>Then select the filters for the figures you want.</p>{" "}
            <p>
              By default, we only select figures that are set to "Mastered".
              Please note that if there aren't enough figures for a combo, it
              won't work!
            </p>
          </div>
        </div>
        {/*
         ** Section to determine how many figures you want
         */}
        <div>
          <h2 className="font-display text-2xl font-semibold text-main dark:text-textdark py-2">
            Number of figures
          </h2>

          <FiguresCounter nbOfMoves={nbOfMoves} setNbOfMoves={setNbOfMoves} />
        </div>
        {/*
         ** Filters for generating combo
         */}
        <h2 className="text-2xl font-display text-main font-semibold">
          Filters
        </h2>
        <div className="AllFilters w-full py-4">
          <div>
            <h3>Active filters</h3>
            {activeFilts.length !== 0 ? (
              <div className="flex flex-wrap gap-2">
                {" "}
                {activeFilts.map((filt, index) => {
                  return (
                    <div
                      key={index}
                      className={`flex gap-2 ${filtButtonStyle}`}
                    >
                      <div>{filt}</div>
                      <button
                        onClick={(e) => handleRemoveActiveFilter(e, filt)}
                        className="lowercase font-bold hover:text-isFave active:text-isFave"
                      >
                        x
                      </button>
                    </div>
                  );
                })}{" "}
              </div>
            ) : (
              <div>No active filters</div>
            )}
          </div>
          <div>
            <FilterAccordion filterTitle="By level">
              <div className="flex flex-wrap lg:gap-4">
                {levelFilts?.map((level, index) => {
                  return (
                    <button
                      key={index}
                      onClick={(e) =>
                        handleClickFilter(
                          e,
                          levelFilts,
                          setLevelFilts,
                          activeLevelFilts,
                          setActiveLevelFilts,
                          level
                        )
                      }
                      className={filtButtonStyle}
                    >
                      {level}
                    </button>
                  );
                })}
              </div>
            </FilterAccordion>
          </div>
          <div>
            <FilterAccordion filterTitle="By status">
              <div className="flex flex-wrap lg:gap-4">
                {statusFilts.map((stat, index) => {
                  return (
                    <button
                      key={index}
                      onClick={(e) =>
                        handleClickFilter(
                          e,
                          statusFilts,
                          setStatusFilts,
                          activeStatusFilts,
                          setActiveStatusFilts,
                          stat
                        )
                      }
                      className={filtButtonStyle}
                    >
                      {stat}
                    </button>
                  );
                })}
              </div>
            </FilterAccordion>
          </div>
          <div>
            <FilterAccordion filterTitle="By zone of focus">
              <div className="flex flex-wrap lg:gap-4">
                {zoneFilts?.map((zone, index) => {
                  return (
                    <button
                      key={index}
                      onClick={(e) =>
                        handleClickFilter(
                          e,
                          zoneFilts,
                          setZoneFilts,
                          activeZoneFilts,
                          setActiveZoneFilts,
                          zone
                        )
                      }
                      className={filtButtonStyle}
                    >
                      {zone}
                    </button>
                  );
                })}
              </div>
            </FilterAccordion>
          </div>
        </div>
        {/*
         ** Button to submit form for generating combo
         */}

        <Tooltip
          content={
            comboFigs.length < nbOfMoves
              ? "Not enough moves match the criteria you have given."
              : ""
          }
          placement="right"
          arrow={false}
          theme={toolTipTheme}
        >
          <button
            onClick={(e) => generateRandomCombo(e, nbOfMoves)}
            disabled={comboFigsWithStates.length < nbOfMoves}
            className="bg-main text-white px-5 py-2 rounded-xl my-5 disabled:bg-disabled hover:animate-bounce transition-all disabled:animate-none"
          >
            Let's go !
          </button>
        </Tooltip>
      </div>
      <div className="bg-bgmainlight lg:h-full basis-1/5 lg:basis-1/2 flex justify-center items-center rounded-lg">
        <ComboSection generatedCombo={generatedCombo} />
      </div>
    </div>
  );
};

export default GenerateCombo;
