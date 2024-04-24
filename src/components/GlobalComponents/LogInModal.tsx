import { useNavigate } from "react-router-dom";
import { HiOutlineX } from "react-icons/hi";

type LogInModalProps = {
  closeModal: () => void;
};

const LogInModal: React.FC<LogInModalProps> = ({ closeModal }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-64 w-96 items-center py-5 px-3 text-center gap-3 relative">
      <button
        onClick={closeModal}
        className="absolute top-2 right-2 hover:text-error"
      >
        <HiOutlineX />
      </button>
      <div className="font-bold text-xl">Log in to Air2D2:</div>
      <div>Some features aren't available if you don't have an account!</div>
      <button
        onClick={() => navigate("/signup")}
        className="w-64 bg-main px-4 py-2 text-white font-bold rounded-lg mb-5 lg:mb-1"
      >
        Sign up
      </button>
      <div>
        Already have an account?{" "}
        <span
          className="underline hover:pointer-cursor"
          onClick={() => navigate("/login")}
        >
          Log in
        </span>
      </div>
    </div>
  );
};

export default LogInModal;
