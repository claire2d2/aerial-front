import React from "react";
import { figType } from "../../Types";

import { Accordion } from "flowbite-react";
import {
  customTheme,
  titleTheme,
  contentTheme,
  levelTheme,
} from "../../Layout/Style/AccordionStyle";
import FigureCard from "./FigureCard";

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
