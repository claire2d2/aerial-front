type SaveButtonProps = {
  disabled: boolean;
  onClickFunction: () => void;
  children: React.ReactNode;
};

const SaveButton: React.FC<SaveButtonProps> = ({
  disabled,
  onClickFunction,
  children,
}) => {
  return (
    <button
      onClick={onClickFunction}
      disabled={disabled}
      className="bg-main px-3 rounded-lg py-1 text-white disabled:bg-disabled hover:bg-mainlight active:bg-black"
    >
      {children}
    </button>
  );
};

export default SaveButton;
