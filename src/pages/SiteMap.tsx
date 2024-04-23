import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchFigures } from "../components/PagesComponents/FiguresFunctions";
import { figType } from "../components/Types";

import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
} from "flowbite-react";
import { customTheme, titleTheme, panelTheme } from "../components/Styles";

const SiteMap = () => {
  const [allFigs, setAllFigs] = useState<figType[]>([]);
  const [poleFigs, setPoleFigs] = useState<figType[]>([]);
  const [hoopFigs, setHoopFigs] = useState<figType[]>([]);
  const [contorsionFigs, setContorsionFigs] = useState<figType[]>([]);

  useEffect(() => {
    fetchFigures("", setAllFigs, [], []);
  }, []);

  useEffect(() => {
    const onlyPoleFigs = allFigs.filter((fig) => fig.discipline.ref === "pole");
    setPoleFigs(onlyPoleFigs);
    const onlyHoopFigs = allFigs.filter(
      (fig) => fig.discipline.ref === "aerial-hoop"
    );
    setHoopFigs(onlyHoopFigs);
    const onlyContorsionFigs = allFigs.filter(
      (fig) => fig.discipline.ref === "contorsion"
    );
    setContorsionFigs(onlyContorsionFigs);
  }, [allFigs]);

  // styling
  const section = "flex flex-col gap-2";
  const h2Style = "font-semibold";
  const discHomePage = "pl-3";
  const discList = "pl-6";
  const FigLink = "capitalize font-light hover:font-normal";
  return (
    <div className="flex flex-col px-5">
      <h1 className="text-center text-4xl font-romantic text-main py-5">
        Site Map
      </h1>
      <div className="flex flex-col gap-3">
        <section className={section}>
          <h2 className={h2Style}>Pole</h2>
          <p className={discHomePage}>
            <Link to="/pole">Homepage</Link>
          </p>
          <ul className={discList}>
            <li>
              <Link to="/pole/figures">Figures</Link>
              <div className="pl-9">
                <Accordion theme={customTheme} collapseAll>
                  <AccordionPanel theme={customTheme}>
                    <AccordionTitle theme={titleTheme}>
                      <div>List of all pole figures pages :</div>
                    </AccordionTitle>
                    <AccordionContent theme={panelTheme}>
                      <ul className="flex flex-col w-full flex-wrap h-64">
                        {allFigs
                          ? poleFigs?.map((fig) => {
                              return (
                                <Link to={`/pole/figures/${fig.ref}`}>
                                  <div className={FigLink}>{fig.name}</div>
                                </Link>
                              );
                            })
                          : "Loading"}
                      </ul>
                    </AccordionContent>
                  </AccordionPanel>
                </Accordion>
              </div>
            </li>
            <li>
              <Link to="/pole/combo-generator">Generate Combo</Link>
            </li>
            <li>
              <Link to="/pole/combos">Create / edit combos</Link>
            </li>
          </ul>
        </section>
        <section className={section}>
          <h2 className={h2Style}>Aerial Hoop</h2>
          <div>
            <p className="pl-3">
              Please note that the content for these pages are still under
              construction ...
            </p>
            <p className={discHomePage}>Homepage</p>
          </div>
          <ul className={discList}>
            <li>
              <Link to="/aerial-hoop/figures">Figures</Link>
              <div className="pl-9">
                <Accordion theme={customTheme} collapseAll>
                  <AccordionPanel theme={customTheme}>
                    <AccordionTitle theme={titleTheme}>
                      <div>List of all aerial hoop figures pages :</div>
                    </AccordionTitle>
                    <AccordionContent theme={panelTheme}>
                      <ul className="flex flex-col w-full flex-wrap h-64">
                        {allFigs
                          ? hoopFigs?.map((fig) => {
                              return (
                                <Link to={`/aerial-hoop/figures/${fig.ref}`}>
                                  <div className={FigLink}>{fig.name}</div>
                                </Link>
                              );
                            })
                          : "Loading"}
                      </ul>
                    </AccordionContent>
                  </AccordionPanel>
                </Accordion>
              </div>
            </li>
            <li>
              <Link to="/aerial-hoop/combo-generator">Generate Combo</Link>
            </li>
            <li>
              <Link to="/aerial-hoop/combos">Create / edit combos</Link>
            </li>
          </ul>
        </section>
        <section className={section}>
          <h2 className={h2Style}>Contorsion</h2>
          <div className="pl-3">
            Please note that the content for these pages are still under
            construction ...
          </div>
          <p className={discHomePage}>Homepage</p>
          <ul className={discList}>
            <li>
              <Link to="/contorsion/figures">Figures</Link>
              <div className="pl-9">
                <Accordion theme={customTheme} collapseAll>
                  <AccordionPanel theme={customTheme}>
                    <AccordionTitle theme={titleTheme}>
                      <div>List of all contorsion figures pages :</div>
                    </AccordionTitle>
                    <AccordionContent theme={panelTheme}>
                      <ul className="flex flex-col w-full flex-wrap h-64">
                        {allFigs
                          ? contorsionFigs?.map((fig) => {
                              return (
                                <Link to={`/contorsion/figures/${fig.ref}`}>
                                  <div className={FigLink}>{fig.name}</div>
                                </Link>
                              );
                            })
                          : "Loading"}
                      </ul>
                    </AccordionContent>
                  </AccordionPanel>
                </Accordion>
              </div>
            </li>
            <li>
              <Link to="/contorsion/combo-generator">Generate Combo</Link>
            </li>
            <li>
              <Link to="/contorsion/combos">Create / edit combos</Link>
            </li>
          </ul>
        </section>
        <section className={section}>
          <h2 className={h2Style}>Global site pages</h2>
          <ul className="pl-3">
            <li>
              <Link to="/settings">User settings</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default SiteMap;
