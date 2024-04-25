import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../context/useUser";
import aerialApi from "../service/aerialApi";
import { figType, comboType } from "../components/Types";

import EditCombo from "../components/PagesComponents/AllCombosPageComponents/EditCombo";

const AllCombos = () => {
  const navigate = useNavigate();
  // get the data from existing combos
  const { currDiscipline, isLoggedIn } = useUser();
  const [allCombos, setAllCombos] = useState<comboType[]>([]);

  useEffect(() => {
    if (currDiscipline) {
      fetchCombos();
    }
  }, [currDiscipline]);

  async function fetchCombos() {
    try {
      const response = await aerialApi.get(
        `/combos?discipline=${currDiscipline?._id}`
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
  const [createMode, setCreateMode] = useState<boolean>(false);

  function choseCombo(combo: comboType) {
    if (shownCombo && shownCombo._id === combo._id) {
      setShownCombo(null);
      return;
    }
    setShownCombo(combo);
    if (createMode) {
      setCreateMode(false);
    }
  }

  useEffect(() => {
    fetchCombos();
  }, [createMode, shownCombo]);

  function showFirstTwoFigs(figArray: figType[]) {
    if (figArray.length < 3) {
      return figArray;
    }
    const slicedFigArray = figArray.slice(0, 2);
    return slicedFigArray;
  }

  return (
    <div className="w-full flex flex-col lg:flex-row lg:h-full overflow-scroll no-scrollbar">
      <div className="w-full h-96  lg:h-full lg:w-1/3 bg-main dark:bg-maindark py-3 flex flex-col">
        <h2 className="text-white font-romantic text-4xl text-center">
          All combos
        </h2>
        <div className="text-white px-3 py-2 text-center">
          <p>Click on a combo in the list below to view its details.</p>
          <p>
            If you wish to edit its content, please click on the edit button
          </p>
        </div>
        <div className="overflow-y-scroll no-scrollbar items-center my-2 px-2 flex flex-col gap-4">
          {allCombos?.length > 0 ? (
            allCombos.map((combo, index) => {
              return (
                <button
                  key={index}
                  onClick={() => choseCombo(combo)}
                  className="w-5/6 flex flex-col bg-bgmainlight dark:bg-bgmaindark py-1 px-2 rounded-lg"
                >
                  <h5 className="font-romantic text-2xl text-main dark:text-white capitalize py-1">
                    {combo.name}
                  </h5>

                  {shownCombo && shownCombo._id === combo._id ? (
                    <div className="flex flex-col gap-1 rounded-lg">
                      {combo.figures.map((fig, index) => {
                        return (
                          <div
                            key={index}
                            className="capitalize text-darkgray dark:text-white pl-3 rounded-lg"
                          >
                            {fig.name}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex flex-row gap-2 items-center rounded-lg ">
                      {showFirstTwoFigs(combo.figures).map((fig, index) => {
                        return (
                          <div
                            key={index}
                            className="capitalize text-darkgray dark:text-white pl-3 rounded-lg"
                          >
                            {fig.name}
                            {combo.figures.length > 2 ? "," : ""}
                          </div>
                        );
                      })}
                      {combo.figures.length > 2 ? (
                        <div className="mx-3 border rounded-lg border-disabled flex items-center justify-center h-3 pb-2 px-1 text-disabled">
                          <span>...</span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                </button>
              );
            })
          ) : (
            <div className="h-80 flex flex-col gap-5 justify-center items-center text-center py-2 ">
              <div>🥹🥹🥹</div>
              <div>There are no combos to show yet...</div>

              {isLoggedIn ? (
                <div>
                  You can{" "}
                  <span
                    onClick={() => setCreateMode(true)}
                    className="underline hover:cursor-pointer hover:text-link"
                  >
                    create a combo
                  </span>{" "}
                  on this page here or{" "}
                  <span
                    onClick={() =>
                      navigate(`/${currDiscipline?.ref}/combo-generator`)
                    }
                    className="underline hover:cursor-pointer hover:text-link"
                  >
                    generate a random combo
                  </span>
                </div>
              ) : (
                <div>
                  You need to log in to be able to use this functionnality
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="relative basis-1/2 lg:basis-2/3 lg:h-full">
        <EditCombo
          shownCombo={shownCombo}
          createMode={createMode}
          setCreateMode={setCreateMode}
        />
      </div>
    </div>
  );
};

export default AllCombos;
