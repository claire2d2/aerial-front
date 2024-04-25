import { SetStateAction } from "react";

type CreateComboProps = {
  createMode: boolean;
  setCreateMode: React.Dispatch<SetStateAction<boolean>>;
};

const CreateCombo: React.FC<CreateComboProps> = ({
  createMode,
  setCreateMode,
}) => {
  return (
    <div>
      Page to create your own comboooo
      <button onClick={() => setCreateMode(!createMode)}>Never mind</button>
    </div>
  );
};

export default CreateCombo;
