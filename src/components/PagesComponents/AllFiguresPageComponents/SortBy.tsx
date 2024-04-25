import { ChangeEvent } from "react";
import useUser from "../../../context/useUser";

const SortBy = () => {
  const { sortBy, setSortBy } = useUser();

  const sortOptions = [
    ["level", "Level"],
    ["aToZ", "Alphabetically A - Z"],
    ["zToA", "Alphabetically Z - A"],
    ["popularity", "By popularity"],
  ];

  const handleChangeSortBy = (e: ChangeEvent<HTMLSelectElement>) => {
    // sets the sort by criteria
    const selectedFilter = e.target.value;
    setSortBy(selectedFilter);
  };
  return (
    <div>
      <div className="font-semibold text-main dark:text-textdark">Sort by:</div>
      <select
        name="sortBy"
        id="sortBy"
        onChange={handleChangeSortBy}
        className="text-text dark:text-textdark dark:bg-bgmaindark border border-inputfield rounded-lg dark:border-textdark p-1"
      >
        {sortOptions.map((el, index) => {
          return (
            <option
              key={index}
              value={el[0]}
              defaultValue={sortBy}
              className="text-text"
            >
              {el[1]}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SortBy;
