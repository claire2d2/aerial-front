import { useState, useEffect } from "react";
import aerialApi from "../../service/aerialApi";
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
    <div className="RightSide lg:basis-1/3">
      <div>
        <h3>Entries</h3>
        <div>
          {allEntries.map((entry, index) => {
            return <div key={index}>{entry.figureFrom.name}</div>;
          })}
        </div>
        <EntryExitForm />
      </div>
      <div>
        <h3>Exits</h3>
        <div>
          {allExits.map((entry, index) => {
            return <div key={index}>{entry.figureTo.name}</div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default EntriesExits;
