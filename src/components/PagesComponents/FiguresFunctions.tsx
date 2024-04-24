import { Dispatch, SetStateAction } from "react";
import aerialApi from "../../service/aerialApi";
import { figType, statusType, faveType } from "../Types";

type SetFigures = Dispatch<SetStateAction<figType[]>>;
type SetStatesData = Dispatch<SetStateAction<statusType[]>>;
type SetFaveData = Dispatch<SetStateAction<faveType[]>>;

/* function to fetch all figures from a specific discipline
 ** 2 arguments :
 ** discipline: currDiscipline id
 ** setFigures: setFigures (from useContext)
 */

export async function fetchFigures(
  disciplineId: string | null,
  setFigures: SetFigures,
  levelFilts: string[],
  zoneFilts: string[]
) {
  let queryParams = {};
  try {
    if (disciplineId) {
      queryParams = new URLSearchParams({
        levels: levelFilts.join(","),
        zones: zoneFilts.join(","),
        discipline: disciplineId,
      });
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
    let queryParams: string | URLSearchParams;
    if (activeFilters.length !== 0) {
      queryParams = new URLSearchParams({
        filtersQuery: activeFilters.join(","),
      });
    } else {
      queryParams = "";
    }
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

export const sortFiguresPopularity = (
  allFaves: faveType[],
  figures: figType[],
  setFigures: SetFigures
) => {
  const favoriteCounts: { [key: string]: number } = {};
  allFaves.forEach((favorite) => {
    const figureId = favorite.figure._id; // Assuming the key for the figure ID in the favorite object is `figureId`
    favoriteCounts[figureId] = (favoriteCounts[figureId] || 0) + 1;
  });

  // sort figure ids by order of popularity (descending)
  const sortedFigureIds = Object.keys(favoriteCounts).sort(
    (a, b) => favoriteCounts[b] - favoriteCounts[a]
  );

  // Map out the sorted Figure ids and fetch the figure data
  const sortedFigures: (figType | undefined)[] = sortedFigureIds.map(
    (figureId) => figures.find((fig) => fig._id === figureId)
  );

  // Filter out undefined values from the sorted figures
  const filteredSortedFigures: figType[] = sortedFigures.filter(
    (fig) => fig !== undefined
  ) as figType[];

  // Create an array of favorited figures
  const favoritedFigures: figType[] = filteredSortedFigures.filter((fig) =>
    allFaves.some((favorite) => favorite.figure._id === fig._id)
  );

  // Create an array of non-favorited figures
  const nonFavoritedFigures: figType[] = filteredSortedFigures.filter(
    (fig) => !allFaves.some((favorite) => favorite.figure._id === fig._id)
  );

  // Concatenate the arrays of favorited and non-favorited figures
  const result: figType[] = [...favoritedFigures, ...nonFavoritedFigures];

  // Set the sorted figures in state
  setFigures(result);
};

export async function fetchAllFaves(setAllFaves: SetFaveData) {
  try {
    const response = await aerialApi.get("/favorites/all");
    console.log(response.data);
    setAllFaves(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return 1;
  }
}
