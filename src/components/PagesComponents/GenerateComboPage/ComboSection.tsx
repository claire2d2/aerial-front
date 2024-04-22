import { useState, useEffect } from "react";
import useUser from "../../../context/useUser";
import { figType } from "../../Types";
import { Link } from "react-router-dom";

type ComboSectionProps = {
  generatedCombo: figType[];
};
const ComboSection: React.FC<ComboSectionProps> = ({ generatedCombo }) => {
  const [displayedCombo, setDisplayedCombo] = useState<figType[]>([]);
  const { currDiscipline } = useUser();
  useEffect(() => {
    setDisplayedCombo([]);
    const timeoutIds: number[] = [];
    generatedCombo.forEach((fig, index) => {
      const timeoutId = setTimeout(() => {
        setDisplayedCombo((prevCombo) => [...prevCombo, fig]);
      }, (index + 1) * 200); // Delay each element by one second
      timeoutIds.push(timeoutId);
    });

    // Cleanup function to clear timeouts on component unmount
    return () => {
      timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
    };
  }, [generatedCombo]);

  const figureStyle =
    "capitalize bg-white px-4 py-2 text-xl text-text font-semibold w-64 text-center rounded-lg animate-fade bg-opacity-90 hover:text-mainlight";
  return (
    <div className="flex flex-col gap-2 justify-center text-gray h-full w-full relative">
      <div className="flex flex-col justify-center items-center lg:gap-10">
        {displayedCombo.map((fig, index) => {
          return (
            <Link
              to={`/${currDiscipline?.ref}/figures/${fig.ref}`}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={figureStyle}>{fig.name}</div>
            </Link>
          );
        })}
      </div>
      {displayedCombo.length === generatedCombo.length ? (
        <button className="absolute top-0 right-0 py-5 px-5">Save Combo</button>
      ) : (
        ""
      )}
    </div>
  );
};

export default ComboSection;
