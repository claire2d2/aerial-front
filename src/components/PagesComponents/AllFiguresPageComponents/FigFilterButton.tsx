import React, { useState, useEffect, useRef } from "react";
import useUser from "../../../context/useUser";
import LogInModal from "../../GlobalComponents/LogInModal";

type FigFilterButtonProps = {
  children: React.ReactNode;
  status: string;
};

const FigFilterButton: React.FC<FigFilterButtonProps> = ({
  children,
  status,
}) => {
  const { isLoggedIn, activeFilters, setActiveFilters } = useUser();
  const [isActive, setIsActive] = useState<boolean>(false);

  // initial, when component loads, see if filter is already active or not
  useEffect(() => {
    if (isLoggedIn) {
      if (activeFilters.includes(status)) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    }
  }, [activeFilters]);

  async function handleFilter(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault;
    // open modal if user isn't logged in
    if (!isLoggedIn) {
      return;
    }
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
      disabled={!isLoggedIn}
      className={`w-full my-1 rounded-sm drop-shadow-sm lg:drop-shadow-none hover:text-linkhover lg:text-sm lg:py-2 hover:bg-bghover disabled:text-white disabled:bg-disabled disabled:hover:text-white ${
        isActive
          ? "bg-main text-white  lg:font-semibold "
          : "bg-bgmainlight text-main dark:text-textdark dark:bg-darkgray "
      }`}
    >
      {children}
    </button>
  );
};

export default FigFilterButton;
