import useUser from "../../../context/useUser";
// imports for styling
import FigFilterButton from "./FigFilterButton";
import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
} from "flowbite-react";

const panelTheme = {
  base: "bg-transparent w-full focus:ring-transparent",
};
const customTheme = {
  root: {
    base: "bg-transparent border-transparent w-full focus:ring-transparent",
    button:
      "bg-transparent hover:bg-transparent border-0 p-2 w-full focus:ring-transparent",
  },
  flush: {
    off: "hover:bg-transparent focus:ring-0 focus:ring-transparent dark:hover:bg-transparent dark:focus:ring-transparent",
    on: "bg-transparent dark:bg-transparent",
  },
  base: "flex flex-col w-full items-center justify-between text-left font-medium border-transparent focus:ring-transparent focus:ring-0",
};

const titleTheme = {
  arrow: {
    base: "h-6 w-6 shrink-0",
    open: {
      off: "",
      on: "rotate-180",
    },
  },
  flush: {
    off: "hover:bg-transparent  focus:ring-0 focus:ring-transparent dark:hover:bg-transparent dark:focus:ring-transparent",
    on: "bg-transparent dark:bg-transparent",
  },
  root: "focus:ring-transparent",
  base: "flex w-full items-center justify-between text-center focus:ring-transparent",
};

const FigFilter = () => {
  const { activeFilters, setActiveFilters } = useUser();
  const availableFilters = [
    "Mastered",
    "Right Side",
    "Left Side",
    "Wishlist",
    "Training",
    "Not seen yet",
    "Favorites",
  ];
  async function resetFilters(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault;
    setActiveFilters([]);
  }

  return (
    <Accordion theme={customTheme}>
      <AccordionPanel theme={customTheme}>
        <AccordionTitle theme={titleTheme}>Show filters</AccordionTitle>
        <AccordionContent theme={panelTheme}>
          <div className="flex flex-col items-center w-full">
            {/*
             **MOBILE VIEW
             */}
            <div className="flex justify-between w-full gap-2 px-2 lg:hidden">
              <div className="basis-1/2">
                <FigFilterButton status="Mastered">Mastered</FigFilterButton>
                <FigFilterButton status="Left Side">Left side</FigFilterButton>
                <FigFilterButton status="Training">Training</FigFilterButton>

                <FigFilterButton status="Favorites">Favorites</FigFilterButton>
              </div>
              <div className="basis-1/2">
                <FigFilterButton status="Right Side">
                  Right side
                </FigFilterButton>
                <FigFilterButton status="Wishlist">Wishlist</FigFilterButton>
                <FigFilterButton status="Not seen yet">
                  Not seen yet
                </FigFilterButton>
                <button
                  onClick={(e) => resetFilters(e)}
                  disabled={activeFilters.length === 0}
                  className="text-main w-full disabled:text-gray"
                >
                  Reset filters
                </button>
              </div>
            </div>

            {/*
             ** PC VIEW
             */}

            <div className="hidden lg:w-full lg:flex lg:flex-col">
              <div className="flex w-full justify-between">
                {availableFilters.map((filt) => {
                  return (
                    <FigFilterButton status={filt}>{filt}</FigFilterButton>
                  );
                })}
              </div>
              <button
                onClick={(e) => resetFilters(e)}
                disabled={activeFilters.length === 0}
                className="text-main w-full disabled:text-gray"
              >
                Reset filters
              </button>
            </div>
          </div>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  );
};

export default FigFilter;
