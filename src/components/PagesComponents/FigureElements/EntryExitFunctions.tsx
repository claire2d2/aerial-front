import { SetStateAction } from "react";
import aerialApi from "../../../service/aerialApi";
import { entryExitType } from "../../Types";

type SetPropositions = React.Dispatch<SetStateAction<entryExitType[]>>;

export async function fetchEntries(
  currFigId: string,
  setAllEntries: SetPropositions
) {
  try {
    const response = await aerialApi.get(`/entriesexits/entries/${currFigId}`);
    setAllEntries(response.data);
  } catch (error) {
    console.log(error);
  }
}

export async function fetchExits(
  currFigId: string,
  setAllExits: SetPropositions
) {
  try {
    const response = await aerialApi.get(`/entriesexits/exits/${currFigId}`);
    setAllExits(response.data);
  } catch (error) {
    console.log(error);
  }
}
