import React, { useState, useEffect } from "react";
import aerialApi from "../../service/aerialApi";
// import useUser from "../../context/useUser";

import { figType } from "../Types";
// use debouncing to avoid handling too many requests at the same time

const useDebouncedValue = (inputValue: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, delay]);

  return debouncedValue;
};

const EntryExitForm = () => {
  const [search, setSearch] = useState<string>("");
  //   const [proposition, setProposition] = useState<string>("");
  const [figures, setFigures] = useState<figType[]>([]);
  //   const { currDisciplineRef } = useUser();

  const debouncedSearch = useDebouncedValue(search, 300);

  useEffect(() => {
    fetchAllFigures();
  }, [debouncedSearch]);

  async function fetchAllFigures() {
    try {
      const response = await aerialApi.get(`/figures/search/${search}`);
      setFigures(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  // change search result dynamically
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };
  return (
    <div>
      <form action="">
        <label htmlFor="entry">Figure Name</label>
        <input id="entry" type="text" onChange={handleChange} />
        <button>Add entry</button>
      </form>
      <div>
        {figures?.map((fig) => {
          return <div>{fig.name}</div>;
        })}
      </div>
    </div>
  );
};

export default EntryExitForm;
