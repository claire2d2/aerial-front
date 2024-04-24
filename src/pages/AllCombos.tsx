import { useState, useEffect } from "react";
import useUser from "../context/useUser";
import aerialApi from "../service/aerialApi";
import { figType } from "../components/Types";

type comboType = {
  _id: string;
  name: string;
  figures: figType[];
  owner: string;
  comment: string;
};
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
    setShownCombo(combo);
  }

  return (
    <div className="w-full flex flex-col lg:flex-row lg:h-full">
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
                    <div className="flex">
                      {combo.figures.map((fig, index) => {
                        return (
                          <div key={index} className="text-text">
                            {fig.name}
                          </div>
                        );
                      })}
                    </div>
                  </button>
                );
              })
            : "Loading"}
        </div>
      </div>
      <div className="lg:w-2/3 h-full flex flex-col items-center">
        <h2 className="font-romantic text-2xl">
          {shownCombo ? shownCombo.name : "No combo chosen"}
        </h2>
        {shownCombo ? (
          <div>
            {shownCombo.figures.map((fig) => {
              return <div>{fig.name}</div>;
            })}
          </div>
        ) : (
          <div>Please choose a combo to show</div>
        )}
      </div>
    </div>
  );
};

export default AllCombos;
