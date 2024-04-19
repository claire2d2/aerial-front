import React from "react";
import { figType } from "../../Types";

import { Accordion } from "flowbite-react";
import FigureCard from "./FigureCard";
//styling
const customTheme = {
  root: {
    base: "border-transaprent",
    flush: {
      off: "",
      on: "",
    },
  },
  base: "border-transparent w-full",
  content: {
    base: "border-transparent",
  },
  flush: {
    off: "hover:border-transparent",
  },
  open: {
    off: "",
    on: "border-transparent",
  },
};

const titleTheme = {
  arrow: {
    base: "h-6 w-6 shrink-0",
    open: {
      off: "",
      on: "rotate-180",
    },
  },
  base: "flex w-full items-center justify-between border-transparent text-left font-medium",
  flush: {
    off: "hover:bg-transparent",
    on: "bg-transparent dark:bg-transparent",
  },
  heading: "",
  open: {
    off: "",
    on: "",
  },
};

const contentTheme = {
  base: "border-transparent px-2",
};

const levelTheme =
  "grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-5 grid-flow-row lg:gap-5 py-3";

type LevelAccordionProps = {
  figures: figType[];
};

const LevelAccordion: React.FC<LevelAccordionProps> = ({ figures }) => {
  return (
    <div className="w-full">
      <Accordion theme={customTheme}>
        <Accordion.Panel theme={customTheme}>
          <Accordion.Title theme={titleTheme}>Beginner</Accordion.Title>
          <Accordion.Content theme={contentTheme}>
            {!figures.find((fig) => fig.difficulty === "beginner") ? (
              <div className="w-full">
                There are no beginner figures with the given filters{" "}
              </div>
            ) : (
              <div className={levelTheme}>
                {figures
                  .filter((fig) => fig.difficulty === "beginner")
                  .map((fig, index) => {
                    return <FigureCard key={index} fig={fig} />;
                  })}
              </div>
            )}
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
      <Accordion theme={customTheme}>
        <Accordion.Panel>
          <Accordion.Title theme={titleTheme}>Intermediate</Accordion.Title>
          <Accordion.Content theme={contentTheme}>
            {!figures.find((fig) => fig.difficulty === "intermediate") ? (
              <div className="w-full">
                There are no intermediate figures with the given filters{" "}
              </div>
            ) : (
              <div className={levelTheme}>
                {figures
                  .filter((fig) => fig.difficulty === "intermediate")
                  .map((fig, index) => {
                    return <FigureCard key={index} fig={fig} />;
                  })}
              </div>
            )}
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
      <Accordion theme={customTheme}>
        <Accordion.Panel>
          <Accordion.Title theme={titleTheme}>Advanced</Accordion.Title>
          <Accordion.Content theme={contentTheme}>
            {!figures.find((fig) => fig.difficulty === "advanced") ? (
              <div className="w-full">
                There are no advanced figures with the given filters{" "}
              </div>
            ) : (
              <div className={levelTheme}>
                {figures
                  .filter((fig) => fig.difficulty === "advanced")
                  .map((fig, index) => {
                    return <FigureCard key={index} fig={fig} />;
                  })}
              </div>
            )}
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </div>
  );
};

export default LevelAccordion;
