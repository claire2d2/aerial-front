import React from "react";
import { Accordion } from "flowbite-react";
import {
  customTheme,
  titleTheme,
  contentTheme,
} from "../../Layout/Style/AccordionStyle";

type FilterAccordionProps = {
  children: React.ReactNode;
  filterTitle: string;
};

const FilterAccordion: React.FC<FilterAccordionProps> = ({
  children,
  filterTitle,
}) => {
  return (
    <Accordion theme={customTheme}>
      <Accordion.Panel theme={customTheme}>
        <Accordion.Title theme={titleTheme}>{filterTitle}</Accordion.Title>
        <Accordion.Content theme={contentTheme}>{children}</Accordion.Content>
      </Accordion.Panel>
    </Accordion>
  );
};

export default FilterAccordion;
