import { useState, useEffect, SetStateAction } from "react";
import useUser from "../context/useUser";
import { figType, zoneType } from "../components/Types";
import {
  fetchFigures,
  fetchZones,
} from "../components/PagesComponents/FiguresFunctions";

const GenerateCombo = () => {
  const { currDisciplineRef } = useUser();
  const [zones, setZones] = useState<zoneType[]>([]);
  const [zoneFilts, setZoneFilts] = useState<string[]>([]);
  const [levelFilts, setLevelFilts] = useState<string[]>([]);
  const [statusFilts, setStatusFilts] = useState<string[]>([]);
  const [comboFigs, setComboFigs] = useState<figType[]>([]);

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
    console.log(comboFigs);
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
        <h1 className="w-full text-center text-2xl">Combo Generator</h1>
        <div>
          Choose the filters for the figures you want. By default, we only
          select figures that are set to "Mastered". If there aren't enough
          figures for a combo, it won't work so please be sure about your
          filters!
        </div>
        <div>Filters</div>
        <div>
          <h3>By level</h3>
          <div className="flex">
            {difficulties?.map((level) => {
              return (
                <button
                  onClick={(e) =>
                    handleClickFilter(e, levelFilts, setLevelFilts, level)
                  }
                >
                  {level}
                </button>
              );
            })}
            <div>
              Test :{" "}
              {statusFilts.map((test) => {
                return <span>{test}</span>;
              })}
            </div>
          </div>
        </div>
        <div>
          <h3>By status</h3>
          <div className="flex">
            {statuses.map((stat) => {
              return (
                <button
                  onClick={(e) =>
                    handleClickFilter(e, statusFilts, setStatusFilts, stat)
                  }
                >
                  {stat}
                </button>
              );
            })}
            <div>
              Test :{" "}
              {levelFilts.map((test) => {
                return <span>{test}</span>;
              })}
            </div>
          </div>
        </div>
        <div>
          <h3>By zone of focus</h3>
          <div className="flex">
            {zones?.map((zone) => {
              return (
                <button
                  onClick={(e) =>
                    handleClickFilter(e, zoneFilts, setZoneFilts, zone.name)
                  }
                >
                  {zone.name}
                </button>
              );
            })}
            <div>
              Test :{" "}
              {zoneFilts.map((test) => {
                return <span>{test}</span>;
              })}
            </div>
          </div>
        </div>
        <button>Let's go !</button>
      </div>
      <div className="bg-bgmainlight basis-1/5 lg:basis-1/2 flex justify-center items-center rounded-lg">
        <div className="text-gray">
          {comboFigs ? (
            comboFigs.map((fig) => {
              return (
                <div>
                  {fig.name} + {fig.difficulty} +{" "}
                  {fig.focus.map((foc) => {
                    return <p>{foc.name}</p>;
                  })}
                </div>
              );
            })
          ) : (
            <div>Loading</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerateCombo;
