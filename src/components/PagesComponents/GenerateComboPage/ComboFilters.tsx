import React, { SetStateAction, useState, useEffect } from "react";

// styling
import FilterAccordion from "./FilterAccordion";

type ComboFiltersProps = {
  activeFilts: string[];
  setAllActiveFilts: React.Dispatch<SetStateAction<string[]>>;
  activeLevelFilts: string[];
  setActiveLevelFilts: React.Dispatch<SetStateAction<string[]>>;
  initialZoneFilts: string[];
  zoneFilts: string[];
  setZoneFilts: React.Dispatch<SetStateAction<string[]>>;
  activeZoneFilts: string[];
  setActiveZoneFilts: React.Dispatch<SetStateAction<string[]>>;
  activeStatusFilts: string[];
  setActiveStatusFilts: React.Dispatch<SetStateAction<string[]>>;
};

const ComboFilters: React.FC<ComboFiltersProps> = ({
  activeFilts,
  setAllActiveFilts,
  activeLevelFilts,
  setActiveLevelFilts,
  initialZoneFilts,
  zoneFilts,
  setZoneFilts,
  activeZoneFilts,
  setActiveZoneFilts,
  activeStatusFilts,
  setActiveStatusFilts,
}) => {
  // styling
  const filtButtonStyle =
    "rounded-lg bg-white drop-shadow-sm py-1 px-2 capitalize dark:bg-main dark:text-white dark:hover:bg-maindark hover:bg-bgmainlight active:bg-main active:text-white";
  // initial state for filters array
  const difficulties = ["beginner", "intermediate", "advanced"];

  const statuses = [
    "Not seen yet",
    "Wishlist",
    "Training",
    "Left Side",
    "Right Side",
  ];

  const [levelFilts, setLevelFilts] = useState<string[]>(difficulties);
  const [statusFilts, setStatusFilts] = useState<string[]>(statuses);

  useEffect(() => {
    setAllActiveFilts(activeFilts);
    setActiveLevelFilts(activeLevelFilts);
    setActiveZoneFilts(activeZoneFilts);
    setActiveStatusFilts(activeStatusFilts);
  }, [activeFilts, activeLevelFilts, activeZoneFilts, activeStatusFilts]);

  // when clicking on a filter
  function handleClickFilter(
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

  function handleRemoveActiveFilter(
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
    if (
      statuses.includes(clickedFilterToRemove) ||
      clickedFilterToRemove === "Mastered"
    ) {
      const copy = activeStatusFilts.filter(
        (filt) => filt !== clickedFilterToRemove
      );
      setActiveStatusFilts(copy);
      setStatusFilts([...statusFilts, clickedFilterToRemove]);
    }
  }

  function resetFilters(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    setAllActiveFilts(["Mastered"]);
    setStatusFilts(statuses);
    setActiveStatusFilts(["Mastered"]);
    setZoneFilts(initialZoneFilts);
    setActiveZoneFilts([]);
    setLevelFilts(difficulties);
    setActiveLevelFilts([]);
  }

  return (
    <div className="AllFilters w-full py-4">
      <div>
        <h3 className="text-xl font-semibold text-main flex justify-between">
          Active filters{" "}
          <button
            onClick={(e) => resetFilters(e)}
            className="text-sm text-darkgray disabled:text-gray hover:font-normal font-light underline decoration-0 underline-offset-1"
          >
            Reset all filters
          </button>
        </h3>
        {activeFilts.length !== 0 ? (
          <div className="flex flex-wrap gap-2">
            {" "}
            {activeFilts.map((filt, index) => {
              return (
                <div key={index} className={`flex gap-2 ${filtButtonStyle}`}>
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
  );
};

export default ComboFilters;
