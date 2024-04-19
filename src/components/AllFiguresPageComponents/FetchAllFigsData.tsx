import { Dispatch, SetStateAction } from "react";
import aerialApi from "../../service/aerialApi";
import { figType } from "../Types";

type SetFigures = Dispatch<SetStateAction<figType[]>>;

/* function to fetch all figures from a specific discipline
 ** 2 arguments :
 ** disciplineRef: currDisciplineRef
 ** setFigures: setFigures (from useContext)
 */

export async function fetchFigures(
  disciplineRef: string | null,
  setFigures: SetFigures
) {
  try {
    const response = await aerialApi.get(`/figures/by/${disciplineRef}`);
    setFigures(response.data);
  } catch (error) {
    console.log(error);
  }
}
