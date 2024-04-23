import React, { useState, useEffect } from "react";
import useUser from "../../../context/useUser";

type FigFilterButtonProps = {
  children: React.ReactNode;
  status: string;
};

const FigFilterButton: React.FC<FigFilterButtonProps> = ({
  children,
  status,
}) => {
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
      className={`w-full lg:w-1/2 lg:mx-5 my-1 rounded-sm drop-shadow-sm lg:drop-shadow-none hover:text-main ${
        isActive
          ? "bg-main text-white lg:text-main lg:bg-bgmainlight lg:font-semibold"
          : "bg-mainlight lg:bg-transparent  text-white lg:text-main "
      }`}
    >
      {children}
    </button>
  );
};

export default FigFilterButton;
