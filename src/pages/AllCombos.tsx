import { useState, useEffect } from "react";
import useUser from "../context/useUser";
import aerialApi from "../service/aerialApi";
import { figType, comboType } from "../components/Types";

import EditCombo from "../components/PagesComponents/AllCombosPageComponents/EditCombo";

const AllCombos = () => {
  // get the data from existing combos
  const { currDiscipline } = useUser();
  const [allCombos, setAllCombos] = useState<comboType[]>([]);

  useEffect(() => {
    fetchCombos();
  }, []);

  async function fetchCombos() {
    try {
      const response = await aerialApi.get(
        `/combos?discipline=${currDiscipline?.ref}`
      );
      setAllCombos(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  /* handle showing only the first two figures, and when clicking :
   ** - the concerned combo will appear in the designated area
   ** - the full list of figures will show in a flex-col instead of flex-row in the button
   */

  const [shownCombo, setShownCombo] = useState<comboType | null>(null);

  function choseCombo(combo: comboType) {
    if (combo === shownCombo) {
      setShownCombo(null);
      return;
    }
    setShownCombo(combo);
  }

  function showFirstTwoFigs(figArray: figType[]) {
    if (figArray.length < 3) {
      return figArray;
    }
    const slicedFigArray = figArray.slice(0, 2);
    return slicedFigArray;
  }

  return (
    <div className="w-full flex flex-col lg:flex-row lg:h-full overflow-scroll no-scrollbar">
      <div className="w-full h-72 py-3 lg:h-full lg:w-1/3 bg-main py-2 flex flex-col">
        <h2 className="text-white font-romantic text-4xl text-center">
          All combos
        </h2>
        <div className="text-white px-3 py-2 text-center">
          <p>Click on a combo in the list below to view its details.</p>
          <p>
            If you wish to edit its content, please click on the edit button
          </p>
        </div>
        <div className="overflow-y-scroll bg-white my-2 mx-3">
          {allCombos
            ? allCombos.map((combo, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => choseCombo(combo)}
                    className="w-full flex flex-col"
                  >
                    <h5>{combo.name}</h5>

                    {shownCombo === combo ? (
                      <div className="flex flex-col">
                        {combo.figures.map((fig, index) => {
                          return <div key={index}>{fig.name}</div>;
                        })}
                      </div>
                    ) : (
                      <div className="flex flex-row">
                        {showFirstTwoFigs(combo.figures).map((fig, index) => {
                          return (
                            <div key={index} className="text-text">
                              {fig.name}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </button>
                );
              })
            : "Loading"}
        </div>
      </div>
      <div className="relative lg:w-2/3 lg:h-full">
        <EditCombo
          shownCombo={shownCombo}
          allCombos={allCombos}
          setShownCombo={setShownCombo}
        />
      </div>
    </div>
  );
};

export default AllCombos;
