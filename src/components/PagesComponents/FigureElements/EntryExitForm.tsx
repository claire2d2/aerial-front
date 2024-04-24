import React, { useState } from "react";
import aerialApi from "../../../service/aerialApi";
import { AxiosError } from "axios";
import { like } from "../FiguresFunctions";

import SearchBar from "../../GlobalComponents/SearchBar";

type EntryExitFormProps = {
  currFigId: string;
  entryOrExit: string;
};

const EntryExitForm: React.FC<EntryExitFormProps> = ({
  currFigId,
  entryOrExit,
}) => {
  const [chosenFig, setChosenFig] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  // depends on whether is entry or exit
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (entryOrExit === "entry") {
      try {
        const response = await aerialApi.post(
          `/entriesexits/entry/${currFigId}`,
          {
            entry: chosenFig,
          }
        );
        like(response.data._id);
      } catch (error) {
        if (error instanceof AxiosError) {
          // Handle error if it is an instance of Error
          console.error(error);
          setErrorMsg(error.response?.data.message); // Use type assertion to access message property
        } else {
          // Handle other types of errors
          console.error(error);
          setErrorMsg("An unknown error occurred. Please try again.");
        }
        setTimeout(() => {
          setErrorMsg("");
        }, 3000);
      }
    } else {
      try {
        const response = await aerialApi.post(
          `/entriesexits/exit/${currFigId}`,
          {
            exit: chosenFig,
          }
        );
        like(response.data._id);
      } catch (error) {
        if (error instanceof AxiosError) {
          // Handle error if it is an instance of Error
          console.error(error);
          setErrorMsg(error.response?.data.message); // Use type assertion to access message property
        } else {
          // Handle other types of errors
          setErrorMsg("An unknown error occurred. Please try again.");
        }
        setTimeout(() => {
          setErrorMsg("");
        }, 3000);
      }
    }
  }
  return (
    <div className="w-full relative">
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
        <div className="absolute bg-white bg-opacity-95 text-error rounded-lg drop-shadow-sm">
          {errorMsg}
        </div>
      </form>
    </div>
  );
};

export default EntryExitForm;
