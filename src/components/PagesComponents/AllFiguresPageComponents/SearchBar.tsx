import React, { useState } from "react";
import { HiOutlineSearch, HiX } from "react-icons/hi";

import { figType } from "../../Types";

type SearchBarProps = {
  placeholder: string;
  figures: figType[];
};
const SearchBar: React.FC<SearchBarProps> = ({ placeholder, figures }) => {
  const [searchedFigs, setSearchedFigs] = useState<figType[]>([]);
  const [searchWord, setSearchWord] = useState<string>("");

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchWord(e.currentTarget.value);
    if (searchWord === "") {
      setSearchedFigs([]);
    } else {
      const newFilter = figures.filter((fig) => {
        return fig.name.toLowerCase().includes(searchWord.toLowerCase());
      });
      setSearchedFigs(newFilter);
    }
  }

  function clearSearch() {
    setSearchedFigs([]);
    setSearchWord("");
  }

  return (
    <div>
      <div className="searchInput flex items-center gap-2 bg-white">
        <input
          type="text"
          id="search"
          value={searchWord}
          placeholder={`${placeholder}`}
          onChange={handleSearch}
        />
        <label htmlFor="search" className="flex items-center gap-2">
          {searchedFigs.length === 0 ? (
            <div className="hover:cursor-pointer">
              <HiOutlineSearch />
            </div>
          ) : (
            <button onClick={clearSearch}>
              <HiX />
            </button>
          )}
        </label>
      </div>
      {searchedFigs.length !== 0 && (
        <div className="searchResults overflow-scroll no-scrollbar h-20">
          {searchedFigs.map((fig, index) => {
            return <div key={index}>{fig.name}</div>;
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
