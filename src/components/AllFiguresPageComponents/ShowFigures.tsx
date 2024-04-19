import React from "react";
import { figType } from "../Types";

import FigureCard from "./FigureCard";

type ShowFiguresProps = {
  shownFigures: figType[];
};

const ShowFigures: React.FC<ShowFiguresProps> = ({ shownFigures }) => {
  return (
    <div className="AllFigs w-full px-2 overflow-scroll no-scrollbar grid grid-cols-2 lg:grid-cols-5 grid-flow-row gap-3">
      {shownFigures.map((fig, index) => {
        return <FigureCard key={index} fig={fig} />;
      })}
    </div>
  );
};

export default ShowFigures;
