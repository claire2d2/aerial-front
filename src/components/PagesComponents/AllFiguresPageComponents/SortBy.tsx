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
      {sortOptions.map((el) => {
        return (
          <option value={el[0]} selected={el[0] === sortBy ? true : false}>
            {el[1]}
          </option>
        );
      })}
    </select>
  );
};

export default SortBy;
