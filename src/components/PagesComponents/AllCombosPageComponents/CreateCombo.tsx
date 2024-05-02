import { useState, useEffect, SetStateAction } from "react";
import { figType } from "../../Types";
import aerialApi from "../../../service/aerialApi";
import useUser from "../../../context/useUser";
import {
  formStateType,
  handleChange,
  handleAddFigure,
  removeFigure,
  handleFigureChange,
} from "./ComboFormTypes";

// styling components
import { HiOutlineX, HiChevronUp, HiChevronDown } from "react-icons/hi";
import SearchBar from "../../GlobalComponents/SearchBar";
import SaveButton from "../../GlobalComponents/SaveButton";

// props
type CreateComboProps = {
  figures: figType[];
  createMode: boolean;
  setCreateMode: React.Dispatch<SetStateAction<boolean>>;
};

const CreateCombo: React.FC<CreateComboProps> = ({
  figures,
  createMode,
  setCreateMode,
}) => {
  // setting the state for the form
  const { currDiscipline } = useUser();
  const [formState, setFormState] = useState<formStateType>({
    name: "",
    discipline: "",
    figures: [],
    comment: "",
  });

  const { name } = formState;

  useEffect(() => {
    if (currDiscipline) {
      setFormState({ ...formState, discipline: currDiscipline._id });
    }
  }, [currDiscipline]);

  // save combo when clicking on submit button
  async function handleSaveCombo(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await aerialApi.post(`/combos`, formState);
      if (response.status === 200) {
        console.log("combo updated", response.data);
      }
    } catch (error) {
      console.log(error);
    }
    setCreateMode(false);
  }

  function switchFigures(
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
    toSwitch: number
  ) {
    e.preventDefault();
    const copy = [...formState.figures];

    if (index < 0 || index >= copy.length) {
      return; // Return if index is out of bounds
    }

    const targetIndex = index + toSwitch;

    if (targetIndex < 0 || targetIndex >= copy.length) {
      return; // Return if target index is out of bounds
    }

    [copy[index], copy[targetIndex]] = [copy[targetIndex], copy[index]];

    setFormState({ ...formState, figures: copy });
  }

  return (
    <div className="w-full h-full flex flex-col items-center gap-3">
      <h2 className="font-romantic text-4xl text-mainvar dark:text-white">
        Create your own combo
      </h2>
      <form className="flex flex-col gap-3">
        <label htmlFor="name" className="font-semibold">
          Combo name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          placeholder="Set a name for your combo"
          onChange={(e) => handleChange(e, formState, setFormState)}
          className="outline-none focus:ring-2 bg-transparent border border-disabled dark:border-textdark p-1 rounded-lg focus:ring-bgmainlight"
        />
        <div className="font-semibold">
          Add figures to your combo (up to 8 max):{" "}
        </div>
        {formState.figures.map((fig, index) => {
          return (
            <div
              key={index}
              className="relative group pl-3 py-2 drop-shadow-md rounded-lg capitalize bg-white dark:bg-transparent dark:border dark:border-textdark text-center pr-10 flex gap-3"
            >
              <SearchBar
                figures={figures}
                placeholder={fig.name}
                searchAction="chose"
                onFigureSelect={(figure) =>
                  handleFigureChange(index, figure, formState, setFormState)
                }
                setFigure={null}
                chosenFigure={null}
              />
              <div className="flex flex-col">
                {index > 0 && (
                  <button onClick={(e) => switchFigures(e, index, -1)}>
                    <HiChevronUp />
                  </button>
                )}
                {index < formState.figures.length - 1 && (
                  <button onClick={(e) => switchFigures(e, index, 1)}>
                    <HiChevronDown />
                  </button>
                )}
              </div>
              <button
                onClick={() => removeFigure(index, formState, setFormState)}
                disabled={formState.figures.length < 2}
                className="hidden absolute group-hover:block group-focus:block hover:text-isFave active:text-isFave top-4 right-3 text-gray disabled:text-transparent"
                type="button"
              >
                <HiOutlineX />
              </button>
            </div>
          );
        })}
        <div className="font-medium">Add a figure: </div>
        {formState.figures.length < 8 && (
          <SearchBar
            figures={figures}
            placeholder="..."
            searchAction="chose"
            onFigureSelect={(figure) =>
              handleAddFigure(figure, formState, setFormState)
            }
            setFigure={null}
            chosenFigure={null}
          />
        )}

        <label htmlFor="comment" className="font-semibold">
          Add comment :{" "}
        </label>
        <textarea
          id="comment"
          name="comment"
          className="border border-disabled w-full h-32 rounded-lg resize-none drop-shadow-sm outline-none focus:ring-2 focus:ring-bgmainlight p-2 bg-transparent"
          value={formState.comment}
          placeholder="Comment here"
          onChange={(e) => handleChange(e, formState, setFormState)}
        />

        <SaveButton disabled={false} onClickFunction={handleSaveCombo}>
          Save Combo
        </SaveButton>
      </form>

      <button
        onClick={() => setCreateMode(!createMode)}
        className="underline text-darkgray dark:text-textdark"
      >
        Never mind
      </button>
    </div>
  );
};

export default CreateCombo;
