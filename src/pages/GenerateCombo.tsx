import { useState, useEffect, SetStateAction } from "react";
import useUser from "../context/useUser";
import { figType, zoneType } from "../components/Types";
import {
  fetchFigures,
  fetchZones,
} from "../components/PagesComponents/FiguresFunctions";

// import elements for styling
import FilterAccordion from "../components/PagesComponents/GenerateComboPage/FilterAccordion";

const GenerateCombo = () => {
  const { currDisciplineRef } = useUser();
  const [zones, setZones] = useState<zoneType[]>([]);

  // states for filters
  const [activeFilts, setAllActiveFilts] = useState<string[]>(["Mastered"]);
  const [zoneFilts, setZoneFilts] = useState<string[]>([]);
  const [levelFilts, setLevelFilts] = useState<string[]>([]);
  const [statusFilts, setStatusFilts] = useState<string[]>(["Mastered"]);
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
  }, [currDisciplineRef]);

  useEffect(() => {
    if (levelFilts.length !== 0 || zoneFilts.length !== 0) {
      fetchFigures(currDisciplineRef, setComboFigs, levelFilts, zoneFilts);
    } else {
      fetchFigures(currDisciplineRef, setComboFigs, [], []);
    }
  }, [levelFilts, zoneFilts]);

  const difficulties = ["beginner", "intermediate", "advanced"];
  const statuses = [
    "Not seen yet",
    "Wishlist",
    "Training",
    "Left Side",
    "Right Side",
    "Mastered",
  ];

  async function handleClickFilter(
    e: React.MouseEvent<HTMLElement>,
    filtersArray: string[],
    setFiltersArray: React.Dispatch<SetStateAction<string[]>>,
    clickedFilter: string
  ) {
    e.preventDefault();
    const isSelected = filtersArray.find((filt) => filt === clickedFilter);
    if (isSelected) {
      const copy = filtersArray.filter((filt) => filt !== clickedFilter);
      setFiltersArray(copy);
    } else {
      setFiltersArray([...filtersArray, clickedFilter]);
    }
  }

  // when filters are chosen and unchosen, set the "states" to fetch the figures that are concerned by the statuses
  //   useEffect(() => {
  //     if (levelFilts.length !== 0) {
  //       fetchFigures(currDisciplineRef, setComboFigs, levelFilts, []);
  //     } else {
  //       fetchFigures(currDisciplineRef, setComboFigs, [], []);
  //     }
  //   }, [levelFilts]);

  return (
    <div className="flex flex-col lg:flex-row w-full h-full">
      <div className="lg:basis-1/2">
        <h1 className="w-full text-center text-main font-bold text-3xl font-display">
          Combo Generator
        </h1>
        <h2 className="font-display text-2xl font-semibold text-main">
          How it works
        </h2>
        <div>
          <p>Choose the filters for the figures you want.</p>{" "}
          <p>
            By default, we only select figures that are set to "Mastered".
            Please note that if there aren't enough figures for a combo, it
            won't work!
          </p>
        </div>
        {/*
         ** Section to determine how many figures you want
         */}
        <div>
          <h2>Combo parameters</h2>
          <div>Set how many figures you want in your combo (max 8):</div>
          <div className="flex">
            <button onClick={subNbMoves}>-</button>
            <div>{nbOfMoves}</div>
            <button onClick={addNbMoves}>+</button>
          </div>
        </div>
        {/*
         ** Filters for generating combo
         */}
        <h2 className="text-2xl font-display text-main font-semibold">
          Filters
        </h2>
        <div>
          <h3>Active filters</h3>
          {activeFilts.length !== 0 ? (
            <div>
              {" "}
              {activeFilts.map((filt) => {
                return <div>{filt}</div>;
              })}{" "}
            </div>
          ) : (
            <div>No filters selected</div>
          )}
        </div>
        <div>
          <FilterAccordion filterTitle="By level">
            <div className="flex">
              {difficulties?.map((level, index) => {
                return (
                  <button
                    key={index}
                    onClick={(e) =>
                      handleClickFilter(e, levelFilts, setLevelFilts, level)
                    }
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
            <div className="flex">
              {statuses.map((stat, index) => {
                return (
                  <button
                    key={index}
                    onClick={(e) =>
                      handleClickFilter(e, statusFilts, setStatusFilts, stat)
                    }
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
            <div className="flex">
              {zones?.map((zone, index) => {
                return (
                  <button
                    key={index}
                    onClick={(e) =>
                      handleClickFilter(e, zoneFilts, setZoneFilts, zone.name)
                    }
                  >
                    {zone.name}
                  </button>
                );
              })}
            </div>
          </FilterAccordion>
        </div>
        {/*
         ** Button to submit form for generating combo
         */}

        <form action="">
          <button
            onClick={(e) => generateRandomCombo(e, nbOfMoves)}
            className="bg-main text-white"
          >
            Let's go !
          </button>
        </form>
      </div>
      <div className="bg-bgmainlight basis-1/5 lg:basis-1/2 flex justify-center items-center rounded-lg">
        <div className="text-gray">
          {generatedCombo.map((fig, index) => {
            return <div key={index}>{fig.name}</div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default GenerateCombo;
