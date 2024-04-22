import { Dispatch, SetStateAction } from "react";
import aerialApi from "../../service/aerialApi";
import { figType, statusType, faveType, zoneType } from "../Types";

type SetFigures = Dispatch<SetStateAction<figType[]>>;
type SetStatesData = Dispatch<SetStateAction<statusType[]>>;
type SetFaveData = Dispatch<SetStateAction<faveType[]>>;
type SetZoneData = Dispatch<SetStateAction<zoneType[]>>;

/* function to fetch all figures from a specific discipline
 ** 2 arguments :
 ** disciplineRef: currDisciplineRef
 ** setFigures: setFigures (from useContext)
 */

export async function fetchFigures(
  disciplineRef: string | null,
  setFigures: SetFigures,
  levelFilts: string[],
  zoneFilts: string[]
) {
  let queryParams;
  try {
    if (disciplineRef) {
      queryParams = new URLSearchParams({
        levels: levelFilts.join(","),
        zones: zoneFilts.join(","),
        discipline: disciplineRef,
      });
      // console.log("levelfitls", levelFilts);
      // console.log("discipline", disciplineRef);
    }
    const response = await aerialApi.get(`/figures/?${queryParams}`);
    setFigures(response.data);
  } catch (error) {
    console.log(error);
  }
}

/* function to fetch all figures from a specific discipline
 ** 2 arguments :
 ** activeFilters: all the filters activated by the user
 ** setStatesData: get all the states appliable with the filters related to current user
 */

export async function fetchFigStatus(
  setStatesData: SetStatesData,
  activeFilters: string[]
) {
  try {
    const queryParams = new URLSearchParams({
      filtersQuery: activeFilters.join(","),
    });
    console.log(queryParams);
    const response = await aerialApi.get(`/states?${queryParams}`);
    setStatesData(response.data);
  } catch (error) {
    console.log(error);
  }
}

/* function to fetch all figures from a specific discipline
 ** 1 argument :
 ** setFaveData: set to faveData all the figures that the user has favorited
 */

export async function fetchFaves(setFaveData: SetFaveData) {
  try {
    const response = await aerialApi.get("/favorites");
    setFaveData(response.data);
  } catch (error) {
    console.log(error);
  }
}

/* filter through the front end depending on the filters (states, favorites) chosen
 */
export function filterFigures(
  figures: figType[],
  activeFilters: string[],
  faveData: faveType[],
  statesData: statusType[]
) {
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
  return shownFigures;
}

/* Function to sort the moves alphabetically
** 3 arguments:
** sortBy: the sorting option the user has chosen
** figures : the figures that have been fetched from the backend (by default, sorted A to 
** associated to setFigures
** setFigures
)
*/

export const sortFiguresAlpha = (
  figures: figType[],
  sortBy: string,
  setFigures: SetFigures
) => {
  const sortedFigures = [...figures].sort((a, b) => {
    if (sortBy === "aToZ") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "zToA") {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });
  setFigures(sortedFigures);
};

/**
 * Fetch zones of focus
 */

export async function fetchZones(setZones: SetZoneData) {
  try {
    const response = await aerialApi.get("/zones");
    setZones(response.data);
  } catch (error) {
    console.log(error);
  }
}
