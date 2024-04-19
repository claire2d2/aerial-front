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

const EntryExitForm: React.FC<{ currFigId: string }> = ({ currFigId }) => {
  const [search, setSearch] = useState<string>("");
  const [proposition, setProposition] = useState<string>("");
  const [figures, setFigures] = useState<figType[]>([]);
  //   const { currDisciplineRef } = useUser();

  const debouncedSearch = useDebouncedValue(search, 300);

  useEffect(() => {
    fetchAllFigures();
  }, [debouncedSearch]);

  function chooseProp(e: React.MouseEvent<HTMLElement>, id: string) {
    e.preventDefault();
    console.log(id);
    setProposition(id);
    console.log(proposition);
  }

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

  // only works for submitting an entry so far
  async function handleSubmit() {
    try {
      await aerialApi.post(`/entriesexits/entry/${currFigId}`, {
        entry: proposition,
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <form action="" className="group h-full" onSubmit={handleSubmit}>
        <label htmlFor="entry">Add a proposition:</label>
        <input
          id="entry"
          type="text"
          value={search}
          onChange={handleChange}
          className="relative"
        />
        <ul className="absolute bg-white w-full hidden group-focus-within:block">
          {figures?.length > 15 || search === ""
            ? "NO"
            : figures?.length === 0
            ? "No figure with that name"
            : figures?.map((fig) => {
                return (
                  <li>
                    <button
                      onClick={(e) => chooseProp(e, fig._id)}
                      className="hover:bg-main w-full text-left "
                    >
                      {fig.name}
                    </button>
                  </li>
                );
              })}
        </ul>
        <button>Add entry</button>
      </form>
      <span>{proposition}</span>
    </div>
  );
};

export default EntryExitForm;
