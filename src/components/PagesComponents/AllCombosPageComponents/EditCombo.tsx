import { useState, useEffect, SetStateAction } from "react";
import useUser from "../../../context/useUser";
import { figType, comboType } from "../../Types";
import { fetchFigures } from "../FiguresFunctions";
import SaveButton from "../../GlobalComponents/SaveButton";
import EditButton from "../../GlobalComponents/EditButton";
import EditComboForm from "./EditComboForm";
import ShowCombo from "./ShowCombo";
import CreateCombo from "./CreateCombo";

type EditComboProps = {
  shownCombo: comboType | null;
  createMode: boolean;
  setCreateMode: React.Dispatch<SetStateAction<boolean>>;
};

const EditCombo: React.FC<EditComboProps> = ({
  shownCombo,
  createMode,
  setCreateMode,
}) => {
  // fetch all the figures for the current discipline (for the searchbar components)
  const [figures, setFigures] = useState<figType[]>([]);
  const { currDiscipline } = useUser();

  useEffect(() => {
    if (currDiscipline) {
      fetchFigures(currDiscipline._id, setFigures, [], []);
    }
  }, [currDiscipline]);

  // turn edit mode on (show form) or off (just show combo)
  const [editMode, setEditMode] = useState<boolean>(false);

  const turnEditOn = () => {
    setEditMode(!editMode);
  };

  const turnCreateOn = () => {
    setCreateMode(!createMode);
    if (editMode) {
      setEditMode(false);
    }
  };
  return (
    <div className="h-full w-full overflow-scroll lg:py-6">
      {shownCombo && !createMode && (
        <div>
          <EditButton handleEditFunction={turnEditOn} editOn={editMode} />
        </div>
      )}
      {shownCombo && !editMode && !createMode && (
        <ShowCombo shownCombo={shownCombo} />
      )}
      {shownCombo && editMode && !createMode && (
        <EditComboForm
          figures={figures}
          shownCombo={shownCombo}
          setEditMode={setEditMode}
        />
      )}

      {!shownCombo && !createMode && (
        <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
          <div>
            <h2 className="font-romantic text-3xl text-center">
              No combo chosen
            </h2>
            <div>Please choose a combo to show</div>
          </div>
          <div>or </div>
          <SaveButton disabled={false} onClickFunction={turnCreateOn}>
            Create a new combo
          </SaveButton>
          <div>No inspiration ? Generate a combo randomly!</div>
        </div>
      )}

      {createMode && (
        <CreateCombo
          figures={figures}
          createMode={createMode}
          setCreateMode={setCreateMode}
        />
      )}
    </div>
  );
};

export default EditCombo;
