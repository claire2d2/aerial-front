import { useState } from "react";
import { comboType } from "../../Types";
import EditButton from "../../GlobalComponents/EditButton";

type EditComboProps = {
  shownCombo: comboType | null;
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
          {shownCombo.figures.map((fig) => {
            return <div>{fig.name}</div>;
          })}
        </div>
      ) : (
        <div>Please choose a combo to show</div>
      )}
    </div>
  );
};

export default EditCombo;
