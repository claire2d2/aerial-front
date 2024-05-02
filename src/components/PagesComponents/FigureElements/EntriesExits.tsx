import { useState, useEffect, SetStateAction } from "react";
import useUser from "../../../context/useUser";
import EntryExitForm from "./EntryExitForm";
import EntryExitLike from "./EntryExitLike";
import { entryExitType } from "../../Types";
import { fetchEntries, fetchExits } from "./EntryExitFunctions";
import { fetchFigures } from "../FiguresFunctions";
import { figType } from "../../Types";

// styling the forms

const sectionStyle = "h-1/2 flex flex-col shadow-xl";
const titleStyle =
  "font-semibold font-romantic text-4xl bg-main dark:bg-maindark text-white text-center";
const listStyle =
  "overflow-y-auto overflow-x-hidden max-w-full max-h-auto py-7 bg-white bg-opacity-5 h-1/2 no-scrollbar h-1/2 lg:h-5/6 flex flex-col gap-3 my-2 mr-4  pr-5";
const toggleTextStyle = "flex  gap-2 py-1 ml-2 font-semibold";
const toggleStyle =
  "px-2  bg-main dark:bg-maindark text-white font-bold rounded-lg";
const figurePropStyle =
  "flex w-full justify-between bg-bgmainlight dark:bg-bgmaindark dark:border dark:border-textdark dark:text-textdark mx-3 text-center py-1 px-3 rounded-lg";

const EntriesExits: React.FC<{ currFigId: string }> = ({ currFigId }) => {
  const [figures, setFigures] = useState<figType[]>([]);
  const [allEntries, setAllEntries] = useState<entryExitType[]>([]);
  const [allExits, setAllExits] = useState<entryExitType[]>([]);
  // states for showing or hiding entry exit forms
  const { isLoggedIn, currDiscipline } = useUser();
  const [showEntryForm, setShowEntryForm] = useState<boolean>(false);
  const [showExitForm, setShowExitForm] = useState<boolean>(false);

  const handleShowForm = (
    form: boolean,
    setForm: React.Dispatch<SetStateAction<boolean>>
  ) => {
    setForm(!form);
  };

  useEffect(() => {
    if (currDiscipline) {
      fetchEntries(currFigId, setAllEntries);
      fetchExits(currFigId, setAllExits);
      fetchFigures(currDiscipline._id, setFigures, [], []);
    }
  }, [currFigId, currDiscipline]);

  if (!allEntries || !allExits) {
    return <div>Loading</div>;
  }

  return (
    <div className="w-full h-full">
      <div className={sectionStyle}>
        <h3 className={titleStyle}>Entries</h3>
        {isLoggedIn ? (
          <div className="h-full w-full flex flex-col">
            <div>
              <button
                onClick={() => handleShowForm(showEntryForm, setShowEntryForm)}
                className={toggleTextStyle}
              >
                Add an entry{" "}
                {showEntryForm ? (
                  <div className={toggleStyle}>-</div>
                ) : (
                  <div className={toggleStyle}>+</div>
                )}
              </button>
              {showEntryForm && (
                <EntryExitForm
                  currFigId={currFigId}
                  entryOrExit="entry"
                  setAllEntries={setAllEntries}
                  setAllExits={setAllExits}
                  figures={figures}
                  setShowEntryForm={setShowEntryForm}
                  setShowExitForm={setShowExitForm}
                />
              )}
            </div>
            <div className={listStyle}>
              {allEntries.length > 0 ? (
                allEntries.map((entry, index) => {
                  return (
                    <div key={index} className={figurePropStyle}>
                      <h6 className="capitalize font-semibold italic text-white dark:text-textdark">
                        {entry.figureFrom.name}
                      </h6>
                      <EntryExitLike propId={entry._id} />
                    </div>
                  );
                })
              ) : (
                <div className="max-h-full">No entries yet ...</div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center">
            Please log in to see possible entries
          </div>
        )}
      </div>
      <div className={sectionStyle}>
        <h3 className={titleStyle}>Exits</h3>
        {isLoggedIn ? (
          <div className="h-full w-full flex flex-col">
            <div>
              <button
                onClick={() => handleShowForm(showExitForm, setShowExitForm)}
                className={toggleTextStyle}
              >
                Add an exit{" "}
                {showExitForm ? (
                  <div className={toggleStyle}>-</div>
                ) : (
                  <div className={toggleStyle}>+</div>
                )}
              </button>
              {showExitForm && (
                <EntryExitForm
                  currFigId={currFigId}
                  entryOrExit="exit"
                  setAllEntries={setAllEntries}
                  setAllExits={setAllExits}
                  figures={figures}
                  setShowEntryForm={setShowEntryForm}
                  setShowExitForm={setShowExitForm}
                />
              )}
            </div>
            <div className={listStyle}>
              {allExits.length > 0 ? (
                allExits.map((exit, index) => {
                  return (
                    <div key={index} className={figurePropStyle}>
                      <h6 className="capitalize font-semibold italic text-white dark:text-textdark">
                        {exit.figureTo.name}
                      </h6>
                      <EntryExitLike propId={exit._id} />
                    </div>
                  );
                })
              ) : (
                <div className="max-h-full">No exits yet ...</div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center">Please log in to see possible exits</div>
        )}
      </div>
    </div>
  );
};

export default EntriesExits;
