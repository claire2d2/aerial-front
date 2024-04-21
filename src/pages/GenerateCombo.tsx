import { useState, useEffect, SetStateAction } from "react";
import useUser from "../context/useUser";
import { figType, zoneType } from "../components/Types";
import {
  fetchFigures,
  fetchZones,
} from "../components/PagesComponents/FiguresFunctions";

// elements for styling
import FilterAccordion from "../components/PagesComponents/GenerateComboPage/FilterAccordion";
const filtButtonStyle =
  "rounded-lg bg-white drop-shadow-sm py-1 px-2 capitalize hover:bg-bgmainlight active:bg-main active:text-white";
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

  // states for filters
  const [activeFilts, setAllActiveFilts] = useState<string[]>(["Mastered"]);
  const [zoneFilts, setZoneFilts] = useState<string[]>([]);
  const [levelFilts, setLevelFilts] = useState<string[]>(difficulties);
  const [statusFilts, setStatusFilts] = useState<string[]>(statuses);
  const [comboFigs, setComboFigs] = useState<figType[]>([]);

  // determine how many moves the combo generator should generate
  const [nbOfMoves, setNbOfMoves] = useState<number>(3);

  function addNbMoves() {
    if (nbOfMoves < 8) {
      const newNb = nbOfMoves + 1;
      setNbOfMoves(newNb);
    }
    return 0;
  }

  function subNbMoves() {
    if (nbOfMoves > 1) {
      const newNb = nbOfMoves - 1;
      setNbOfMoves(newNb);
    }
    return 0;
  }

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
    const randomIndex = Math.floor(Math.random() * comboFigs.length);
    const randomFigure = comboFigs[randomIndex];
    if (comboArray.includes(randomFigure)) {
      findRandomFigure(comboArray);
    } else {
      comboArray.push(randomFigure);
    }
  }

  // fetch initial data for figures data and available zones
  useEffect(() => {
    fetchFigures(currDisciplineRef, setComboFigs, levelFilts, zoneFilts);
    fetchZones(setZones);
    const zoneFiltNames: string[] = [];
    zones.forEach((zone) => zoneFiltNames.push(zone.name));
    setInitialZoneFilts(zoneFiltNames);
    setZoneFilts(zoneFiltNames);
  }, [currDisciplineRef]);

  useEffect(() => {
    if (levelFilts.length !== 0 || zoneFilts.length !== 0) {
      fetchFigures(currDisciplineRef, setComboFigs, levelFilts, zoneFilts);
    } else {
      fetchFigures(currDisciplineRef, setComboFigs, [], []);
    }
  }, [levelFilts, zoneFilts]);

  async function handleClickFilter(
    e: React.MouseEvent<HTMLElement>,
    filtersArray: string[],
    setFiltersArray: React.Dispatch<SetStateAction<string[]>>,
    clickedFilter: string
  ) {
    e.preventDefault();
    // when clicking on a filter, add it to the active filters array
    setAllActiveFilts([...activeFilts, clickedFilter]);
    // and remove it from the concerned filter array
    const copy = filtersArray.filter((filt) => filt !== clickedFilter);
    setFiltersArray(copy);
  }

  async function handleRemoveActiveFilter(
    e: React.MouseEvent<HTMLElement>,
    clickedFilterToRemove: string
  ) {
    const copy = activeFilts.filter((filt) => filt !== clickedFilterToRemove);
    setAllActiveFilts(copy);
    if (difficulties.includes(clickedFilterToRemove)) {
      setLevelFilts([...levelFilts, clickedFilterToRemove]);
    }
    if (initialZoneFilts.includes(clickedFilterToRemove)) {
      setZoneFilts([...zoneFilts, clickedFilterToRemove]);
    }
    if (statuses.includes(clickedFilterToRemove)) {
      setStatusFilts([...statusFilts, clickedFilterToRemove]);
    }
  }
  return (
    <div className="GenerateCombo flex flex-col lg:flex-row h-full w-full justify-center items-center">
      <div className="ComboExplanations lg:h-full flex flex-col justify-center items-center lg:px-10">
        <h1 className="w-full text-center text-main font-bold text-3xl font-display py-4">
          Combo Generator
        </h1>
        <div className="flex flex-col text-left">
          <h2 className="font-display text-2xl font-semibold text-main py-2 text-center">
            How it works
          </h2>
          <div className="flex flex-col gap-2">
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
          <h2 className="font-display text-2xl font-semibold text-main py-2">
            Number of figures
          </h2>

          <div className="flex w-20 h-10 justify-center items-center px-5 mx-auto drop-shadow">
            <button
              onClick={subNbMoves}
              className=" bg-white rounded-l-lg px-2 border border-gray font-bold text-xl text-main transition-all hover:bg-bgmainlight active:bg-main active:text-white disabled:bg-disabled disabled:text-white"
              disabled={nbOfMoves === 1}
            >
              -
            </button>
            <div className=" bg-white basis-1/2 border border-gray px-3 text-xl font-bold text-main">
              {nbOfMoves}
            </div>
            <button
              onClick={addNbMoves}
              className=" bg-white rounded-r-lg px-2 border border-gray font-bold text-xl text-main transition-all hover:bg-bgmainlight active:bg-main active:text-white disabled:bg-disabled disabled:text-white"
              disabled={nbOfMoves === 8}
            >
              +
            </button>
          </div>
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
                        handleClickFilter(e, levelFilts, setLevelFilts, level)
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
                        handleClickFilter(e, statusFilts, setStatusFilts, stat)
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
                        handleClickFilter(e, zoneFilts, setZoneFilts, zone)
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

        <button
          onClick={(e) => generateRandomCombo(e, nbOfMoves)}
          className="bg-main text-white px-5 py-2 rounded-xl my-5"
        >
          Let's go !
        </button>
      </div>
      <div className="bg-bgmainlight lg:h-full basis-1/5 lg:basis-1/2 flex justify-center items-center rounded-lg">
        <div className="text-gray h-full">
          {generatedCombo.map((fig, index) => {
            return <div key={index}>{fig.name}</div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default GenerateCombo;
