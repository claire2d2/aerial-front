import { useState, useEffect } from "react";
import { figType } from "../../Types";

type ComboSectionProps = {
  generatedCombo: figType[];
};
const ComboSection: React.FC<ComboSectionProps> = ({ generatedCombo }) => {
  const [displayedCombo, setDisplayedCombo] = useState<figType[]>([]);
  useEffect(() => {
    const timeoutIds: number[] = [];
    generatedCombo.forEach((fig, index) => {
      const timeoutId = setTimeout(() => {
        setDisplayedCombo((prevCombo) => [...prevCombo, fig]);
      }, (index + 1) * 1000); // Delay each element by one second
      timeoutIds.push(timeoutId);
    });

    // Cleanup function to clear timeouts on component unmount
    return () => {
      timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
    };
  }, [generatedCombo]);

  const figureStyle =
    "capitalize bg-white px-4 py-2 text-xl text-text font-semibold w-64 text-center transition-transform transform-gpu delay-1000";
  return (
    <div className="flex flex-col justify-center items-center lg:gap-10 text-gray h-full w-full">
      {displayedCombo.map((fig, index) => {
        return (
          <div key={index} className={figureStyle}>
            {fig.name}
          </div>
        );
      })}
    </div>
  );
};

export default ComboSection;
