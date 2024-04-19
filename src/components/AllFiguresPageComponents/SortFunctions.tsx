import { figType } from "../Types";

export const sortFiguresAlpha = (figuresArray: figType[], sortBy: string) => {
  const sortedFigures = [...figuresArray].sort((a, b) => {
    if (sortBy === "aToZ") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "zToA") {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });
  return sortedFigures;
};
