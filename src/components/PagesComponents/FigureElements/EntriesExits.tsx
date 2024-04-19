import { useState, useEffect } from "react";
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

const EntriesExits: React.FC<{ currFigId: string }> = ({ currFigId }) => {
  const [allEntries, setAllEntries] = useState<entryExit[]>([]);
  const [allExits, setAllExits] = useState<entryExit[]>([]);

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
      <div className="h-1/2 bg-inputfield">
        <h3 className="font-semibold h-1/6">Entries</h3>
        <div className="overflow-scroll no-scrollbar h-4/6 bg-mainlight">
          {allEntries.length > 0 ? (
            allEntries.map((entry, index) => {
              return <div key={index}>{entry.figureFrom?.name}</div>;
            })
          ) : (
            <div className="max-h-full">No entries yet ...</div>
          )}
        </div>
        <div className="h-1/6">
          <EntryExitForm currFigId={currFigId} />
        </div>
      </div>
      <div className="h-1/2 bg-green">
        <h3 className="h-1/6 font-semibold">Exits</h3>
        <div className="overflow-scroll no-scrollbar h-4/6">
          {allExits.length > 0 ? (
            allExits.map((exit, index) => {
              return <div key={index}>{exit.figureFrom.name}</div>;
            })
          ) : (
            <div className="max-h-full">No exits yet ...</div>
          )}
        </div>
        <div className="h-1/6">
          <EntryExitForm currFigId={currFigId} />
        </div>
      </div>
    </div>
  );
};

export default EntriesExits;
