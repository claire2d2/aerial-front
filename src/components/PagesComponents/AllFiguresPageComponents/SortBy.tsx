import { ChangeEvent } from "react";
import useUser from "../../../context/useUser";

const SortBy = () => {
  const { sortBy, setSortBy } = useUser();

  const sortOptions = [
    ["level", "By level"],
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
    <select name="sortBy" id="sortBy" onChange={handleChangeSortBy}>
      {sortOptions.map((el, index) => {
        return (
          <option key={index} value={el[0]} defaultValue={sortBy}>
            {el[1]}
          </option>
        );
      })}
    </select>
  );
};

export default SortBy;
