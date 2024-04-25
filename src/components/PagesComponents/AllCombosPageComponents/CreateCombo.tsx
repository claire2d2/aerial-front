import { SetStateAction } from "react";
import SearchBar from "../../GlobalComponents/SearchBar";
import { figType } from "../../Types";

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
  return (
    <div>
      <h2>Create your own combo</h2>
      <SearchBar figures={figures} />
      <button onClick={() => setCreateMode(!createMode)}>Never mind</button>
    </div>
  );
};

export default CreateCombo;
