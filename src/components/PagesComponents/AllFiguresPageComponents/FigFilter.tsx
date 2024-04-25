import useUser from "../../../context/useUser";
// imports for styling
import FigFilterButton from "./FigFilterButton";
import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
} from "flowbite-react";

import { customTheme, titleTheme, panelTheme } from "../../Styles";

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
              <div className="lg:flex lg:w-full lg:justify-between lg:gap-2">
                {availableFilters.map((filt) => {
                  return (
                    <FigFilterButton status={filt}>{filt}</FigFilterButton>
                  );
                })}
              </div>
              <button
                onClick={(e) => resetFilters(e)}
                disabled={activeFilters.length === 0}
                className="text-title w-full disabled:text-gray"
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
