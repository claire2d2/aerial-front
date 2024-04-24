import React, { useState, useEffect, SetStateAction } from "react";
import { HiOutlineSearch, HiX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import useUser from "../../context/useUser";
import { fetchFigures } from "../PagesComponents/FiguresFunctions";

import { figType } from "../Types";

type SearchBarProps = {
  placeholder: string;
  searchAction: string;
  onFigureSelect: ((figure: figType) => void) | null;
  setFigure: React.Dispatch<SetStateAction<string>> | null;
};
const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  searchAction,
  onFigureSelect,
  setFigure,
}) => {
  const { currDiscipline } = useUser();
  const [figures, setFigures] = useState<figType[]>([]);
  const [searchedFigs, setSearchedFigs] = useState<figType[]>([]);
  const [searchWord, setSearchWord] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.currentTarget.value;
    setSearchWord(searchValue);
  };

  // fetch figures when component renders
  useEffect(() => {
    if (currDiscipline) {
      fetchFigures(currDiscipline._id, setFigures, [], []);
    }
  }, [currDiscipline]);

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

  //

  const navigate = useNavigate();

  /* Search bar can be used to either
   ** - navigate to a chosen page
   ** - choose a figure
   */
  function action(e: React.MouseEvent, figure: figType) {
    e.preventDefault();
    if (searchAction === "navigate") {
      navigate(`/${currDiscipline?.ref}/figures/${figure.ref}`);
    }
    if (searchAction === "chose" && onFigureSelect) {
      setSearchWord(figure.name);
      onFigureSelect(figure);
    }
    if (searchAction === "entryExit" && setFigure) {
      setSearchWord(figure.name);
      setFigure(figure._id);
    }
  }

  // clear out results if search result is chosen
  useEffect(() => {
    setSearchedFigs([]);
  }, [onFigureSelect]);

  return (
    <div className="w-full">
      <div className="searchInput flex justify-between items-center gap-2 bg-white  drop-shadow-sm pr-3 pl-1 py-1 relative w-full">
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
        <div className="searchResults overflow-scroll no-scrollbar h-20 flex flex-col absolute bg-white w-full text-text">
          {searchedFigs.map((fig, index) => {
            return (
              <button
                onClick={(e) => action(e, fig)}
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
