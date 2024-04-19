import { Link } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import useUser from "../../context/useUser";

const dropDownTheme = {
  arrowIcon: "ml-1 h-6 w-4",
  floating: {
    arrow: {
      base: "absolute z-10 h-2 w-2 rotate-45",
      auto: "bg-white dark:bg-textdark",
      placement: "-4px",
    },

    animation: "transition-opacity",
    base: "z-10 w-fit divide-y divide-gray-100 rounded shadow focus:outline-none",
    divider: "my-1 dark:bg-bgmaindark",
    header: "block text-sm text-text dark:text-white",
    hidden: "invisible opacity-0",
    style: {
      auto: " bg-white text-text dark:border-textdark dark:bg-bgmaindark dark:text-textdark active:text-white",
    },
    target: "w-fit border-none",
  },
  inlineWrapper: "flex items-center",
};

const NavBarDiscDropDown = () => {
  const { currDiscipline, currDisciplineRef, allDisciplines } = useUser();
  let restOfPath = "";
  const isSpecificPage = location.pathname.split("/")[2];
  if (isSpecificPage) {
    restOfPath = `/${isSpecificPage}`;
  }
  return (
    <Dropdown
      theme={dropDownTheme}
      label={
        currDiscipline ? (
          <span className="capitalize font-bold text-lg hover:text-linkhover">
            {currDiscipline}
          </span>
        ) : (
          <span className="capitalize font-bold text-lg hover:text-linkhover">
            Aerial Arts
          </span>
        )
      }
    >
      {/* {currDiscipline ? (
        <Dropdown.Item>
          <span className="capitalize font-semibold">{currDiscipline}</span>
        </Dropdown.Item>
      ) : (
        ""
      )} */}

      {allDisciplines
        ? allDisciplines.map((disc, index) => (
            <Dropdown.Item key={index}>
              <Link
                to={`/${
                  disc.ref === currDisciplineRef
                    ? `${disc.ref}`
                    : `${disc.ref}${restOfPath}`
                }`}
              >
                <span className="capitalize">{disc.name}</span>
              </Link>
            </Dropdown.Item>
          ))
        : "Loading"}
    </Dropdown>
  );
};

export default NavBarDiscDropDown;
