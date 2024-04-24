import { useState, useEffect, SetStateAction } from "react";
import aerialApi from "../../../service/aerialApi";
import EntryExitForm from "./EntryExitForm";

type entryExit = {
  owner: string;
  figureTo: {
    id: string;
    name: string;
  };
  figureFrom: {
    id: string;
    name: string;
  };
};

// styling the forms
import { HiOutlineThumbUp } from "react-icons/hi";

const sectionStyle = "h-1/2 flex flex-col px-";
const titleStyle =
  "font-semibold font-romantic text-4xl bg-main text-white text-center";
const listStyle =
  "overflow-y-scroll w-full overflow-x-hidden no-scrollbar h-4/6 flex flex-col gap-3 my-2 mr-4  pr-5";
const toggleTextStyle = "flex  gap-2 py-1 ml-2 font-semibold";
const toggleStyle = "px-2  bg-main text-white font-bold rounded-lg";
const figurePropStyle =
  "flex w-full justify-between bg-bgmainlight mx-3 text-center py-1 px-3 rounded-lg";

const EntriesExits: React.FC<{ currFigId: string }> = ({ currFigId }) => {
  const [allEntries, setAllEntries] = useState<entryExit[]>([]);
  const [allExits, setAllExits] = useState<entryExit[]>([]);
  // states for showing or hiding entry exit forms
  const [showEntryForm, setShowEntryForm] = useState<boolean>(false);
  const [showExitForm, setShowExitForm] = useState<boolean>(false);

  const handleShowForm = (
    form: boolean,
    setForm: React.Dispatch<SetStateAction<boolean>>
  ) => {
    setForm(!form);
  };

  useEffect(() => {
    fetchEntries();
    fetchExits();
  }, [currFigId]);

  async function fetchEntries() {
    try {
      const response = await aerialApi.get(
        `/entriesexits/entries/${currFigId}`
      );
      setAllEntries(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchExits() {
    try {
      const response = await aerialApi.get(`/entriesexits/exits/${currFigId}`);
      setAllExits(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  if (!allEntries || !allExits) {
    return <div>Loading</div>;
  }

  return (
    <div className="w-full h-full">
      <div className={sectionStyle}>
        <h3 className={titleStyle}>Entries</h3>
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
            <EntryExitForm currFigId={currFigId} entryOrExit="entry" />
          )}
        </div>
        <div className={listStyle}>
          {allEntries.length > 0 ? (
            allEntries.map((entry, index) => {
              return (
                <div key={index} className={figurePropStyle}>
                  <h6 className="capitalize font-semibold italic text-mainvar">
                    {entry.figureFrom.name}
                  </h6>
                  <div className="flex gap-2">
                    <div>1 </div>
                    <button className="hover:text-isFave">
                      <HiOutlineThumbUp />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="max-h-full">No entries yet ...</div>
          )}
        </div>
      </div>
      <div className={sectionStyle}>
        <h3 className={titleStyle}>Exits</h3>
        <div className="">
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
            <EntryExitForm currFigId={currFigId} entryOrExit="exit" />
          )}
        </div>
        <div className={listStyle}>
          {allExits.length > 0 ? (
            allExits.map((exit, index) => {
              return (
                <div key={index} className={figurePropStyle}>
                  <h6 className="capitalize font-semibold italic text-mainvar">
                    {exit.figureTo.name}
                  </h6>
                  <div className="flex gap-2">
                    <div>1 </div>
                    <button className="hover:text-isFave">
                      <HiOutlineThumbUp />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="max-h-full">No exits yet ...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EntriesExits;
