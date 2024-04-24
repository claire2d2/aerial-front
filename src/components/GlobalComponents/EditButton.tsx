import { HiOutlinePencil } from "react-icons/hi";

type EditButtonProps = {
  handleEditFunction: () => void;
  editOn: boolean;
};

const EditButton: React.FC<EditButtonProps> = ({
  handleEditFunction,
  editOn,
}) => {
  return (
    <button
      onClick={handleEditFunction}
      className={`absolute top-2 right-2 rounded-full ${
        editOn ? "bg-main" : "bg-mainlight"
      } hover:bg-mainvar active:bg-main p-2`}
    >
      <HiOutlinePencil className="text-white text-xl " />
    </button>
  );
};

export default EditButton;
