import { useState, useEffect } from "react";
import useUser from "../context/useUser";
import { figType, statusType } from "../components/Types";
import {
  fetchFigures,
  fetchFigStatus,
} from "../components/PagesComponents/FiguresFunctions";

// elements for styling
import { Tooltip } from "flowbite-react";
import FiguresCounter from "../components/PagesComponents/GenerateComboPage/FiguresCounter";
import ComboFilters from "../components/PagesComponents/GenerateComboPage/ComboFilters";
import ComboSection from "../components/PagesComponents/GenerateComboPage/ComboSection";
const h2Style =
  "font-display text-2xl font-semibold bg-gradient-to-r from-main via-mainvar to-main text-white dark:text-textdark py-2 text-center w-full dark:from-maindark dark:to-maindark";

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
  const { currDiscipline, zones, isLoggedIn } = useUser();

  const [initialZoneFilts, setInitialZoneFilts] = useState<string[]>([]);
  const [statesData, setStatesData] = useState<statusType[]>([]);

  // states for filters
  const [activeFilts, setAllActiveFilts] = useState<string[]>(["Mastered"]);
  const [zoneFilts, setZoneFilts] = useState<string[]>([]);
  const [activeZoneFilts, setActiveZoneFilts] = useState<string[]>([]);

  const [activeLevelFilts, setActiveLevelFilts] = useState<string[]>([]);

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
    // fetch all figures that match the discipline + active level and zone filts
    if (currDiscipline) {
      fetchFigures(
        currDiscipline._id,
        setComboFigs,
        activeLevelFilts,
        activeZoneFilts
      );
    }

    // set initial zone filter names (none selected by default)
    const zoneFiltNames: string[] = [];
    zones.forEach((zone) => zoneFiltNames.push(zone.name));
    setInitialZoneFilts(zoneFiltNames);
    setZoneFilts(zoneFiltNames);
    // fetch all the active states related to the user (by default "mastered")
    fetchFigStatus(setStatesData, activeStatusFilts);
  }, [currDiscipline]);

  /*
   ** function to find the matches between the fetched figures by zone/level filters and the figures that have the corresponding filters
   */

  // update combo figures when active filts are changed
  useEffect(() => {
    // refetch active statuses
    fetchFigStatus(setStatesData, activeStatusFilts);
    if (currDiscipline) {
      fetchFigures(
        currDiscipline?._id,
        setComboFigs,
        activeLevelFilts,
        activeZoneFilts
      );
    }
    console.log("curr combo figures", comboFigsWithStates);
  }, [activeFilts, activeLevelFilts, activeZoneFilts, activeStatusFilts]);

  useEffect(() => {
    const filterComboFigs = () => {
      const figsWithStates = statesData.map((state) => state.figure);
      // Filter out the common figures between comboFigs and figsWithStates
      const filteredFigs = comboFigs.filter((fig) =>
        figsWithStates.some((stateFig) => stateFig && stateFig._id === fig._id)
      );
      setComboFigsWithStates(filteredFigs);
    };

    filterComboFigs();
  }, [comboFigs, statesData]);
  return (
    <div className="GenerateCombo w-full flex flex-col lg:flex-row lg:h-full">
      <div className="ComboExplanations relative flex flex-col bg-bgmainlight dark:bg-bgmaindark items-center lg:h-full lg:basis-1/2 overflow-scroll no-scrollbar">
        <h1 className="w-full text-center font-romantic  text-white bg-gradient-to-r from-main via-mainvar to-main dark:from-maindark dark:to-maindark dark:text-textdark font-bold text-5xl py-6">
          Combo Generator
        </h1>

        <div className="flex flex-col text-left">
          <h2 className={h2Style}>How it works</h2>
          <div className="flex flex-col gap-2 px-3">
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
        <div className="w-full lg:py-2">
          <h2 className={h2Style}>Number of figures</h2>

          <FiguresCounter nbOfMoves={nbOfMoves} setNbOfMoves={setNbOfMoves} />
        </div>
        {/*
         ** Filters for generating combo
         */}
        <h2 className={h2Style}>Filters</h2>

        <ComboFilters
          activeFilts={activeFilts}
          setAllActiveFilts={setAllActiveFilts}
          activeLevelFilts={activeLevelFilts}
          setActiveLevelFilts={setActiveLevelFilts}
          initialZoneFilts={initialZoneFilts}
          zoneFilts={zoneFilts}
          setZoneFilts={setZoneFilts}
          activeZoneFilts={activeZoneFilts}
          setActiveZoneFilts={setActiveZoneFilts}
          activeStatusFilts={activeStatusFilts}
          setActiveStatusFilts={setActiveStatusFilts}
        />
        {/*
         ** Button to submit form for generating combo
         */}

        <Tooltip
          content={
            !isLoggedIn
              ? "Please log in to be able to generate a combo"
              : comboFigsWithStates.length < nbOfMoves
              ? "Not enough moves match the criteria you have given."
              : "❤️"
          }
          placement="top"
          arrow={false}
          theme={toolTipTheme}
        >
          <button
            onClick={(e) => generateRandomCombo(e, nbOfMoves)}
            disabled={!isLoggedIn || comboFigsWithStates.length < nbOfMoves}
            className="bg-main dark:bg-maindark text-white px-5 py-2 rounded-xl my-5 disabled:bg-disabled transition-all "
          >
            Let's go !
          </button>
        </Tooltip>
      </div>
      <div
        className="bg-cover relative lg:h-full h-96 lg:basis-1/2 flex justify-center items-center overflow-scroll no-scrollbar"
        style={{
          backgroundImage: "url('/comboSky.jpg')",
        }}
      >
        {generatedCombo.length !== 0 ? (
          <ComboSection generatedCombo={generatedCombo} />
        ) : (
          <div className="flex flex-col justify-center items-center lg:gap-10 text-white h-full w-full text-3xl z-10 relative">
            No combo yet ...
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateCombo;
