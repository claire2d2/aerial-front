import { useState, useEffect, useRef } from "react";
import useUser from "../../../context/useUser";
import { figType } from "../../Types";
import { Link } from "react-router-dom";
import aerialApi from "../../../service/aerialApi";
import { AxiosError } from "axios";

// styling
import { Toast } from "flowbite-react";
import {
  HiX,
  HiFire,
  HiExclamation,
  HiChevronUp,
  HiChevronDown,
} from "react-icons/hi";

import { toastTheme } from "../../Styles";
const figureStyle =
  "capitalize bg-white px-4 py-2 text-xl text-text font-semibold w-64 text-center rounded-lg animate-fade bg-opacity-90 hover:text-mainlight flex justify-between";

type ComboSectionProps = {
  generatedCombo: figType[];
};

const ComboSection: React.FC<ComboSectionProps> = ({ generatedCombo }) => {
  // get current discipline to enable user to open figure page in a new window when clicking on figure
  const { currDiscipline } = useUser();
  // use state + use effect to get to display combo figure by figure
  const [displayedCombo, setDisplayedCombo] = useState<figType[]>([]);
  useEffect(() => {
    setDisplayedCombo([]);
    const timeoutIds: number[] = [];
    generatedCombo.forEach((fig, index) => {
      const timeoutId = setTimeout(() => {
        setDisplayedCombo((prevCombo) => [...prevCombo, fig]);
      }, (index + 1) * 200); // Delay each element by one second
      timeoutIds.push(timeoutId);
    });

    // cleanup function to clear timeouts on component unmount
    return () => {
      timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
    };
  }, [generatedCombo]);

  // user can click on arrow to move figure up and down in the combo list
  function switchFigures(index: number, toSwitch: number) {
    // Make a copy of the array
    const copy = [...displayedCombo];

    // Check if the index is within the array bounds
    if (index < 0 || index >= copy.length) {
      return; // Return if index is out of bounds
    }

    // Determine the index of the element to switch with
    const targetIndex = index + toSwitch;

    // Check if the target index is within the array bounds
    if (targetIndex < 0 || targetIndex >= copy.length) {
      return; // Return if target index is out of bounds
    }

    // Swap the elements at the given index and target index
    [copy[index], copy[targetIndex]] = [copy[targetIndex], copy[index]];

    // Update the displayedCombo with the modified array
    setDisplayedCombo(copy);
  }
  // save combo to your combos list
  const [comboName, setComboName] = useState<string>("");

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const givenName = e.currentTarget.value;
    setComboName(givenName);
  }
  // dialog that opens when clicking on save combo
  const comboModal = useRef<HTMLDialogElement | null>(null);

  function openComboModal() {
    comboModal.current?.showModal();
  }
  function closeComboModal() {
    comboModal.current?.close();
  }
  async function saveCombo() {
    try {
      const response = await aerialApi.post("/combos", {
        name: comboName,
        discipline: currDiscipline?._id,
        figures: displayedCombo,
        comment: "",
      });
      console.log(response.data);
      setToastMessage("Combo successfully saved!");
    } catch (error) {
      if (error instanceof AxiosError) {
        // Handle error if it is an instance of Error
        console.error(error);
        setToastMessage(error.response?.data.message); // Use type assertion to access message property
      } else {
        // Handle other types of errors
        console.error(error);
        setToastMessage("An unknown error occurred. Please try again.");
      }
    }
    // show toast with message
    setShowToast(true);
    // hide toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
    closeComboModal();
  }
  // toast that shows when combo has been succesfully added (or not)
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  return (
    <div className="flex flex-col gap-2 justify-center text-gray h-full w-full relative">
      <div className="flex flex-col justify-center items-center gap-5 lg:gap-10">
        {displayedCombo.map((fig, index) => {
          return (
            <div key={index} className={figureStyle}>
              <Link
                to={`/${currDiscipline?.ref}/figures/${fig.ref}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div>{fig.name}</div>
              </Link>
              <div className="flex flex-col">
                {index !== 0 && (
                  <button onClick={() => switchFigures(index, -1)}>
                    <HiChevronUp />
                  </button>
                )}
                {index !== displayedCombo.length - 1 && (
                  <button onClick={() => switchFigures(index, 1)}>
                    <HiChevronDown />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {displayedCombo.length === generatedCombo.length ? (
        <button
          onClick={openComboModal}
          className="lg:absolute lg:top-0 lg:right-2 lg:py-2 lg:px-4 bg-main w-1/2 lg:w-40 mx-auto rounded-lg drop-shadow-sm py-2 px-4 font-semibold mt-3 hover:bg-mainvar"
        >
          Save Combo
        </button>
      ) : (
        ""
      )}

      {/*
       ** Dialog that opens when user clicks on save combo
       */}

      <dialog ref={comboModal} className="rounded-lg drop-shadow-lg">
        <div className="h-64 w-80  lg:h-64 flex flex-col items-center gap-4 py-5 pt-10">
          <button
            onClick={closeComboModal}
            className="absolute top-1 right-2 hover:text-isFave transition-all"
          >
            <HiX />
          </button>
          <h3 className="font-bold text-xl">
            New {currDiscipline?.name} combo:{" "}
          </h3>
          <label htmlFor="comboName" className="font-semibold">
            Give a name to your combo :
          </label>
          <input
            type="text"
            id="comboName"
            name="comboName"
            placeholder="Name..."
            value={comboName}
            onChange={handleNameChange}
            className="rounded-lg drop-shadow-md py-1 px-3"
          />
          <button
            onClick={saveCombo}
            className="bg-main text-white px-4 py-2 rounded-lg drop-shadow-sm"
          >
            Save combo
          </button>
        </div>
      </dialog>

      {/*
       ** toast that shows when user has submitted save combo
       */}

      {showToast && (
        <Toast theme={toastTheme}>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
            {toastMessage === "Combo successfully saved!" ? (
              <HiFire className="h-5 w-5" />
            ) : (
              <HiExclamation className="h-5 w-5" />
            )}
          </div>
          <div className="ml-3 text-sm font-normal">{toastMessage}</div>
          <Toast.Toggle />
        </Toast>
      )}
    </div>
  );
};

export default ComboSection;
