import React, { useState } from "react";
import aerialApi from "../../../service/aerialApi";
// import useUser from "../../../context/useUser";
// import { fetchFigures } from "../FiguresFunctions";
// import { figType } from "../../Types";

import SearchBar from "../../GlobalComponents/SearchBar";

type EntryExitFormProps = {
  currFigId: string;
  entryOrExit: string;
};

const EntryExitForm: React.FC<EntryExitFormProps> = ({
  currFigId,
  entryOrExit,
}) => {
  // const { currDiscipline } = useUser();
  // const [figures, setFigures] = useState<figType[]>([]);
  const [chosenFig, setChosenFig] = useState<string>("");

  // useEffect(() => {
  //   if (currDiscipline) {
  //     fetchFigures(currDiscipline._id, setFigures, [], []);
  //   }
  // }, [currFigId]);

  // depends on whether is entry or exit
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (entryOrExit === "entry") {
      try {
        await aerialApi.post(`/entriesexits/entry/${currFigId}`, {
          entry: chosenFig,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await aerialApi.post(`/entriesexits/exit/${currFigId}`, {
          exit: chosenFig,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="w-full">
      <form
        className="w-full h-full flex flex-col px-3 gap-4 items-center"
        onSubmit={handleSubmit}
      >
        <SearchBar
          placeholder="Figure name"
          searchAction="entryExit"
          onFigureSelect={null}
          setFigure={setChosenFig}
        />
        <button className="bg-main py-2 px-2 w-32 mx-auto text-white rounded-xl drop-shadow-md font-bold">
          Add {entryOrExit}
        </button>
      </form>
    </div>
  );
};

export default EntryExitForm;
