import { SetStateAction } from "react";

type FiguresCounterProps = {
  nbOfMoves: number;
  setNbOfMoves: React.Dispatch<SetStateAction<number>>;
};
const FiguresCounter: React.FC<FiguresCounterProps> = ({
  nbOfMoves,
  setNbOfMoves,
}) => {
  function addNbMoves() {
    if (nbOfMoves < 8) {
      const newNb = nbOfMoves + 1;
      setNbOfMoves(newNb);
    }
    return 0;
  }

  function subNbMoves() {
    if (nbOfMoves > 1) {
      const newNb = nbOfMoves - 1;
      setNbOfMoves(newNb);
    }
    return 0;
  }
  return (
    <div className="flex z-1 w-20 h-10 justify-center items-center px-5 mx-auto drop-shadow text-main dark:text-white">
      <button
        onClick={subNbMoves}
        className=" bg-white  dark:bg-bgmaindark rounded-l-lg px-2 border border-gray font-bold text-xl transition-all hover:bg-bgmainlight active:bg-main active:text-white disabled:bg-disabled disabled:text-white"
        disabled={nbOfMoves === 1}
      >
        -
      </button>
      <div className=" bg-white dark:bg-bgmaindark basis-1/2 border border-gray px-3 text-xl font-bold ">
        {nbOfMoves}
      </div>
      <button
        onClick={addNbMoves}
        className=" bg-white   dark:bg-bgmaindark rounded-r-lg px-2 border border-gray font-bold text-xl transition-all hover:bg-bgmainlight active:bg-main active:text-white disabled:bg-disabled disabled:text-white"
        disabled={nbOfMoves === 8}
      >
        +
      </button>
    </div>
  );
};

export default FiguresCounter;
