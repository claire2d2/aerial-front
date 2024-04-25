import { useState } from "react";
import { comboType } from "../../Types";
import EditButton from "../../GlobalComponents/EditButton";
import EditComboForm from "./EditComboForm";
import ShowCombo from "./ShowCombo";

type EditComboProps = {
  shownCombo: comboType | null;
};

const EditCombo: React.FC<EditComboProps> = ({ shownCombo }) => {
  const [editMode, setEditMode] = useState<boolean>(false);

  const turnEditOn = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="h-full w-full overflow-scroll lg:py-6">
      {shownCombo && (
        <div>
          <EditButton handleEditFunction={turnEditOn} editOn={editMode} />
        </div>
      )}
      {shownCombo && !editMode && <ShowCombo shownCombo={shownCombo} />}
      {shownCombo && editMode && (
        <EditComboForm shownCombo={shownCombo} setEditMode={setEditMode} />
      )}

      {!shownCombo && (
        <div className="flex flex-col items-center">
          <h2 className="font-romantic text-2xl">No combo chosen</h2>
          <div>Please choose a combo</div>to show
        </div>
      )}
    </div>
  );
};

export default EditCombo;
