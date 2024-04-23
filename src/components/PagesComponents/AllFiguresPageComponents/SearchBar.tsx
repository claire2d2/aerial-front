import React, { useState, useEffect } from "react";
import { HiOutlineSearch, HiX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import useUser from "../../../context/useUser";

import { figType } from "../../Types";

type SearchBarProps = {
  placeholder: string;
  figures: figType[];
};
const SearchBar: React.FC<SearchBarProps> = ({ placeholder, figures }) => {
  const [searchedFigs, setSearchedFigs] = useState<figType[]>([]);
  const [searchWord, setSearchWord] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.currentTarget.value;
    setSearchWord(searchValue);
    console.log(searchWord);
  };

  // use effect hook to refresh figures search instantaneously
  useEffect(() => {
    if (searchWord === "") {
      setSearchedFigs([]);
    } else {
      const newFilter = figures.filter((fig) => {
        return fig.name.toLowerCase().includes(searchWord.toLowerCase());
      });
      setSearchedFigs(newFilter);
    }
  }, [searchWord]);

  function clearSearch() {
    setSearchedFigs([]);
    setSearchWord("");
  }

  const navigate = useNavigate();
  const { currDiscipline } = useUser();
  function goToFigPage(figureRef: string) {
    navigate(`/${currDiscipline?.ref}/figures/${figureRef}`);
  }

  return (
    <div>
      <div className="searchInput flex items-center gap-2 bg-white  drop-shadow-sm px-2 py-1">
        <input
          type="text"
          id="search"
          value={searchWord}
          placeholder={`${placeholder}`}
          onChange={handleSearch}
        />
        <label htmlFor="search" className="flex items-center gap-2 ">
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
        <div className="searchResults overflow-scroll no-scrollbar h-20 flex flex-col">
          {searchedFigs.map((fig, index) => {
            return (
              <button
                onClick={() => goToFigPage(fig.ref)}
                key={index}
                className="capitalize hover:bg-bgmainlight"
              >
                {fig.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
