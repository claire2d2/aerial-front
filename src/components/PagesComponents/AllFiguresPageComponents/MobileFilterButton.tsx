import React, { useState, useEffect } from "react";
import useUser from "../../../context/useUser";

const MobileFilterButton: React.FC<{
  children: React.ReactNode;
  status: string;
}> = ({ children, status }) => {
  const { activeFilters, setActiveFilters } = useUser();
  const [isActive, setIsActive] = useState<boolean>(false);

  // initial, when component loads, see if filter is already active or not
  useEffect(() => {
    if (activeFilters.includes(status)) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [activeFilters]);

  async function handleFilter(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault;
    // if filter already active, remove filter
    if (isActive) {
      setIsActive(false);
      const copy = activeFilters.filter((fil) => fil !== status);
      setActiveFilters(copy);
    }
    // if not, add filter
    else {
      setIsActive(true);
      setActiveFilters([...activeFilters, status]);
    }
  }
  return (
    <button
      onClick={(e) => handleFilter(e)}
      className={`w-full my-1 rounded-sm drop-shadow-sm ${
        isActive ? "bg-main text-white" : "bg-mainlight text-white"
      }`}
    >
      {children}
    </button>
  );
};

export default MobileFilterButton;
