import React from "react";
import { Link } from "react-router-dom";
import { figType } from "../../Types";

type FigureCardProps = {
  fig: figType;
};

const FigureCard: React.FC<FigureCardProps> = ({ fig }) => {
  return (
    <div className="aspect-square h-full rounded-lg drop-shadow-xl">
      <Link to={fig.ref}>
        <div
          style={{
            backgroundImage: `url(${fig.image})`,
          }}
          className="relative h-full bg-cover bg-center aspect-square rounded-lg"
        >
          <div className="absolute uppercase flex items-center justify-center text-white text-xl inset-0 text-center font-bold bg-maindark bg-opacity-50 hover:bg-opacity-20 active:bg-opacity-20 rounded-lg">
            {fig.name}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FigureCard;
