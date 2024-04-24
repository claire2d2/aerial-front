import { useState, useEffect } from "react";
import { figType, comboType } from "../../Types";
import EditButton from "../../GlobalComponents/EditButton";
import SaveButton from "../../GlobalComponents/SaveButton";
import SearchBar from "../../GlobalComponents/SearchBar";

type EditComboProps = {
  shownCombo: comboType | null;
};
type formStateType = {
  name: string;
  figures: figType[];
};

const EditCombo: React.FC<EditComboProps> = ({ shownCombo }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [formState, setFormState] = useState<formStateType>({
    name: "",
    figures: [],
  });

  const turnEditOn = () => {
    setEditMode(!editMode);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.currentTarget.id;
    const value = e.currentTarget.value;
    setFormState({ ...formState, [key]: value });
  };

  const handleFigureChange = (index: number, newFig: figType) => {
    const newFigures = formState.figures.map((fig, i) =>
      i === index ? newFig : fig
    );
    setFormState({ ...formState, figures: newFigures });
  };

  useEffect(() => {
    console.log(formState.figures);
  }, [formState]);

  const handleSaveCombo = () => {
    setEditMode(false);
  };

  const { name } = formState;

  // set initial state of form to the shown combo initial state
  useEffect(() => {
    if (shownCombo) {
      setFormState({
        ...formState,
        name: shownCombo?.name,
        figures: shownCombo.figures,
      });
    }
  }, [shownCombo]);

  return (
    <div className="h-full w-full overflow-scroll">
      {shownCombo && (
        <div>
          <EditButton handleEditFunction={turnEditOn} editOn={editMode} />
        </div>
      )}

      {shownCombo ? (
        <form className="flex flex-col items-center gap-2 px-5">
          <h2 className="font-romantic text-2xl">
            {editMode ? (
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => handleChange(e)}
              />
            ) : (
              <span>{shownCombo.name}</span>
            )}
          </h2>

          <div className="flex flex-col gap-2 w-full">
            {shownCombo.figures.map((fig, index) => {
              return (
                <div
                  key={index}
                  className="px-3 py-2 drop-shadow-md rounded-lg capitalize bg-white text-center"
                >
                  {editMode ? (
                    <SearchBar
                      placeholder={formState.figures[index].name}
                      searchAction="chose"
                      onFigureSelect={(figure) =>
                        handleFigureChange(index, figure)
                      }
                    />
                  ) : (
                    <div className="w-full h-full">{fig.name}</div>
                  )}
                </div>
              );
            })}
          </div>
          {editMode && (
            <div className="w-full flex flex-col items-center py-4 gap-2">
              <label htmlFor="comment">Add a comment</label>
              <textarea
                id="comment"
                className="border border-gray w-full h-52 rounded-lg resize-none drop-shadow-sm"
              />
              <SaveButton disabled={false} onClickFunction={handleSaveCombo}>
                Save combo
              </SaveButton>
            </div>
          )}
        </form>
      ) : (
        <div className="flex flex-col items-center">
          <h2 className="font-romantic text-2xl">No combo chosen</h2>
          <div>Please choose a combo</div>to show
        </div>
      )}
    </div>
  );
};

export default EditCombo;
