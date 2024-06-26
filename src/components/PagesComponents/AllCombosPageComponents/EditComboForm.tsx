import { useState, useEffect, SetStateAction } from "react";
import aerialApi from "../../../service/aerialApi";
import { figType, comboType } from "../../Types";
import {
  formStateType,
  handleChange,
  handleAddFigure,
  removeFigure,
  handleFigureChange,
} from "./ComboFormTypes";
import SearchBar from "../../GlobalComponents/SearchBar";
import SaveButton from "../../GlobalComponents/SaveButton";
import { HiOutlineX, HiChevronUp, HiChevronDown } from "react-icons/hi";

type EditComboFormProps = {
  figures: figType[];
  shownCombo: comboType;
  setEditMode: React.Dispatch<SetStateAction<boolean>>;
};
const EditComboForm: React.FC<EditComboFormProps> = ({
  figures,
  shownCombo,
  setEditMode,
}) => {
  // setting the state for the form
  const [formState, setFormState] = useState<formStateType>({
    name: "",
    discipline: "",
    figures: [],
    comment: "",
  });

  // set initial state of form to the shown combo initial state
  useEffect(() => {
    if (shownCombo) {
      setFormState({
        ...formState,
        name: shownCombo.name,
        discipline: shownCombo.discipline,
        figures: shownCombo.figures,
        comment: shownCombo.comment,
      });
    }
  }, [shownCombo]);

  // toggle possibility to add a figure:
  const [addFigure, setAddFigure] = useState<boolean>(false);

  function handleShowAddFigure() {
    setAddFigure(!addFigure);
  }

  // save combo when clicking on submit button
  async function handleSaveCombo(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await aerialApi.put(
        `/combos/${shownCombo?._id}`,
        formState
      );
      if (response.status === 200) {
        console.log("combo updated", response.data);
      }
    } catch (error) {
      console.log(error);
    }
    setEditMode(false);
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

  const { name } = formState;

  return (
    <div>
      <form className="flex flex-col items-center gap-2 px-5">
        <h2 className="font-romantic text-3xl">
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => handleChange(e, formState, setFormState)}
            className="dark:bg-transparent dark:border dark:border-textdark dark:rounded-lg"
          />
        </h2>

        <div className="flex flex-col gap-2 w-full">
          {shownCombo.figures.map((fig, index) => {
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
                  chosenFigure={null}
                  setFigure={null}
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
          {addFigure && (
            <div className="px-3 py-2 drop-shadow-md rounded-lg capitalize bg-white text-center pr-10">
              <SearchBar
                figures={figures}
                placeholder="Add a new figure"
                searchAction="chose"
                onFigureSelect={(figure) =>
                  handleAddFigure(figure, formState, setFormState)
                }
                setFigure={null}
                chosenFigure={null}
              />
            </div>
          )}
          <div>
            Add figure{" "}
            <button
              type="button"
              onClick={handleShowAddFigure}
              className="px-2  bg-main text-white font-bold rounded-lg"
            >
              {addFigure ? "-" : "+"}
            </button>{" "}
          </div>
        </div>

        <div className="w-full flex flex-col items-center py-4 gap-2">
          <label htmlFor="comment" className="font-romantic text-xl">
            Edit comment :{" "}
          </label>
          <textarea
            id="comment"
            name="comment"
            className="border border-gray w-full h-52 rounded-lg resize-none drop-shadow-sm p-2"
            value={formState.comment}
            onChange={(e) => handleChange(e, formState, setFormState)}
          />
          <SaveButton
            disabled={false}
            onClickFunction={(e) => handleSaveCombo(e)}
          >
            Save combo
          </SaveButton>
        </div>
      </form>
    </div>
  );
};

export default EditComboForm;
