import { useState, useEffect, useRef } from "react";
import useUser from "../../../context/useUser";
import { figType } from "../../Types";
import { Link } from "react-router-dom";
import aerialApi from "../../../service/aerialApi";

// styling
import { HiX } from "react-icons/hi";
const figureStyle =
  "capitalize bg-white px-4 py-2 text-xl text-text font-semibold w-64 text-center rounded-lg animate-fade bg-opacity-90 hover:text-mainlight";

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
        figures: generatedCombo,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    closeComboModal();
  }
  // toast that shows when combo has been succesfully added (or not)

  return (
    <div className="flex flex-col gap-2 justify-center text-gray h-full w-full relative">
      <div className="flex flex-col justify-center items-center lg:gap-10">
        {displayedCombo.map((fig, index) => {
          return (
            <Link
              to={`/${currDiscipline?.ref}/figures/${fig.ref}`}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={figureStyle}>{fig.name}</div>
            </Link>
          );
        })}
      </div>
      {displayedCombo.length === generatedCombo.length ? (
        <button
          onClick={openComboModal}
          className="absolute top-0 right-0 py-5 px-5"
        >
          Save Combo
        </button>
      ) : (
        ""
      )}

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
    </div>
  );
};

export default ComboSection;
