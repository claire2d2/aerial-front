import { useState, useEffect, SetStateAction } from "react";
import aerialApi from "../../../service/aerialApi";
import { figType, comboType } from "../../Types";
import SearchBar from "../../GlobalComponents/SearchBar";
import SaveButton from "../../GlobalComponents/SaveButton";
import { HiOutlineX } from "react-icons/hi";

type formStateType = {
  name: string;
  figures: figType[];
  comment: string;
};

type EditComboFormProps = {
  shownCombo: comboType;
  setEditMode: React.Dispatch<SetStateAction<boolean>>;
};
const EditComboForm: React.FC<EditComboFormProps> = ({
  shownCombo,
  setEditMode,
}) => {
  // setting the state for the form
  const [formState, setFormState] = useState<formStateType>({
    name: "",
    figures: [],
    comment: "",
  });

  // set initial state of form to the shown combo initial state
  useEffect(() => {
    if (shownCombo) {
      setFormState({
        ...formState,
        name: shownCombo.name,
        figures: shownCombo.figures,
        comment: shownCombo.comment,
      });
    }
  }, [shownCombo]);

  // change function for the name input field
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const key = e.currentTarget.id;
    const value = e.currentTarget.value;
    setFormState({ ...formState, [key]: value });
  };

  // handle figure changes individually
  function handleFigureChange(index: number, newFig: figType) {
    const newFigures = formState.figures.map((fig, i) =>
      i === index ? newFig : fig
    );
    setFormState({ ...formState, figures: newFigures });
  }

  // possibility to add a figure:
  const [addFigure, setAddFigure] = useState<boolean>(false);

  function handleShowAddFigure() {
    setAddFigure(!addFigure);
  }

  function handleAddFigure(newFig: figType) {
    if (formState.figures.length < 7) {
      const copy = formState.figures;
      copy.push(newFig);
      setFormState({ ...formState, figures: copy });
    }
  }

  // possibility to remove a figure:
  function removeFigure(fig: figType, index: number) {
    console.log("click");
    if (formState.figures.length > 1) {
      const copy = formState.figures;
      copy.splice(index, 1);
      setFormState({ ...formState, figures: copy });
    }
    console.log(formState.figures);
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
            onChange={(e) => handleChange(e)}
          />
        </h2>

        <div className="flex flex-col gap-2 w-full">
          {shownCombo.figures.map((fig, index) => {
            return (
              <div
                key={index}
                className="relative group pl-3 py-2 drop-shadow-md rounded-lg capitalize bg-white text-center pr-10"
              >
                <SearchBar
                  placeholder={fig.name}
                  searchAction="chose"
                  onFigureSelect={(figure) => handleFigureChange(index, figure)}
                  setFigure={null}
                />
                <button
                  onClick={() => removeFigure(fig, index)}
                  className="hidden absolute group-hover:block group-focus:block hover:text-isFave active:text-isFave top-4 right-3 text-gray"
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
                placeholder="Add a new figure"
                searchAction="chose"
                onFigureSelect={(figure) => handleAddFigure(figure)}
                setFigure={null}
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
            className="border border-gray w-full h-52 rounded-lg resize-none drop-shadow-sm"
            value={formState.comment}
            onChange={(e) => handleChange(e)}
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
