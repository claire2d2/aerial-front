import { useState, SetStateAction } from "react";
import { comboType } from "../../Types";
import EditButton from "../../GlobalComponents/EditButton";
import EditComboDrag from "./EditComboDrag";

type EditComboProps = {
  allCombos: comboType[];
  shownCombo: comboType | null;
  setShownCombo: React.Dispatch<SetStateAction<comboType | null>>;
};

const EditCombo: React.FC<EditComboProps> = ({ shownCombo }) => {
  const [editMode, setEditMode] = useState<boolean>(false);

  const turnEditOn = () => {
    setEditMode(!editMode);
  };
  return (
    <div>
      {shownCombo && (
        <div>
          <EditButton handleEditFunction={turnEditOn} editOn={editMode} />
        </div>
      )}

      <h2 className="font-romantic text-2xl">
        {shownCombo ? shownCombo.name : "No combo chosen"}
      </h2>
      {shownCombo ? (
        <div>
          <EditComboDrag
            comboKey={shownCombo._id}
            combo={shownCombo}
            figures={shownCombo.figures}
          />
        </div>
      ) : (
        <div>Please choose a combo to show</div>
      )}
    </div>
  );
};

export default EditCombo;
