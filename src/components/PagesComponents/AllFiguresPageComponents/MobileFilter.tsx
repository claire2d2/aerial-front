import useUser from "../../../context/useUser";
// imports for styling
import MobileFilterButton from "./MobileFilterButton";
import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
} from "flowbite-react";

const panelTheme = {
  base: "bg-transparent w-full",
};
const customTheme = {
  root: {
    base: "bg-transparent border-transparent w-full",
    button: "bg-transparent hover:bg-transparent border-0 p-2 w-full",
  },
  base: "flex flex-col w-full items-center justify-between text-left font-medium border-transparent ",
};

const titleTheme = {
  arrow: {
    base: "h-6 w-6 shrink-0",
    open: {
      off: "",
      on: "rotate-180",
    },
  },
  base: "flex w-full items-center justify-between text-center",
};

const MobileFilter = () => {
  const { activeFilters, setActiveFilters } = useUser();

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
            <div className="flex justify-between w-full gap-2 px-2">
              <div className="basis-1/2">
                <MobileFilterButton status="Mastered">
                  Mastered
                </MobileFilterButton>
                <MobileFilterButton status="Left side">
                  Left side
                </MobileFilterButton>
                <MobileFilterButton status="Training">
                  Training
                </MobileFilterButton>

                <MobileFilterButton status="Favorites">
                  Favorites
                </MobileFilterButton>
              </div>
              <div className="basis-1/2">
                <MobileFilterButton status="Right side">
                  Right side
                </MobileFilterButton>
                <MobileFilterButton status="Wishlist">
                  Wishlist
                </MobileFilterButton>
                <MobileFilterButton status="Not seen yet">
                  Not seen yet
                </MobileFilterButton>
                <button
                  onClick={(e) => resetFilters(e)}
                  disabled={activeFilters.length === 0}
                  className="text-main w-full disabled:text-gray"
                >
                  Reset filters
                </button>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  );
};

export default MobileFilter;
