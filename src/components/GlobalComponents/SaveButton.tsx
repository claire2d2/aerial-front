type SaveButtonProps = {
  disabled: boolean;
  onClickFunction: (e: React.FormEvent) => void;
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
      className="bg-main dark:bg-maindark px-3 rounded-lg py-1 text-white disabled:bg-disabled hover:bg-mainlight active:bg-black font-semibold"
    >
      {children}
    </button>
  );
};

export default SaveButton;
