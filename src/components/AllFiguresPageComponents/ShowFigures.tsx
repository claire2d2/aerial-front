import React from "react";
import { Link } from "react-router-dom";
import { figType } from "../Types";

type ShowFiguresProps = {
  shownFigures: figType[];
};

const ShowFigures: React.FC<ShowFiguresProps> = ({ shownFigures }) => {
  return (
    <div className="AllFigs w-full px-2 overflow-scroll no-scrollbar grid grid-cols-2 lg:grid-cols-5 grid-flow-row gap-3">
      {shownFigures.map((fig, index) => {
        return (
          <div
            key={index}
            className="aspect-square h-full rounded-lg drop-shadow-xl"
          >
            <Link to={fig.ref}>
              <div
                style={{
                  backgroundImage: `url(${fig.image})`,
                }}
                className="relative h-full bg-cover bg-center aspect-square rounded-lg"
              >
                <div className="absolute uppercase flex items-center justify-center text-white text-xl inset-0 text-center font-bold bg-maindark bg-opacity-50 hover:bg-opacity-20 active:bg-opacity-20">
                  {fig.name}
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ShowFigures;
