import { useNavigate } from "react-router-dom";

const InviteToJoin = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col px-3 py-1 mb-5 lg:justify-center gap-1 h-1/2  w-5/6  lg:py-20 lg:px-10 lg:mx-10 lg:w-1/3 text-center z-9 bg-white bg-opacity-70 lg:bg-opacity-50 rounded-lg text-text">
      <div className="py-2">
        <p className="font-semibold">New to the website?</p>
        <button
          onClick={() => navigate("/signup")}
          className="bg-main px-4 py-2 text-white font-bold rounded-lg"
        >
          Join now
        </button>
      </div>
      <div className="pb-10 lg:pb-1">
        <p className="font-semibold">Or get back to where you left off!</p>
        <button
          onClick={() => navigate("/login")}
          className="bg-main px-4 py-2 text-white font-bold rounded-lg mb-5 lg:mb-1"
        >
          Log in
        </button>
      </div>
    </div>
  );
};

export default InviteToJoin;
