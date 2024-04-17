import { Dropdown } from "flowbite-react";
import useUser from "../../context/useUser";

const NavBarDiscDropDown = () => {
  const { currDiscipline, allDisciplines } = useUser();
  return (
    <Dropdown
      label={
        currDiscipline ? (
          <span className="capitalize">{currDiscipline}</span>
        ) : (
          "Aerial arts"
        )
      }
    >
      {currDiscipline ? (
        <Dropdown.Item>
          <span className="capitalize font-semibold">{currDiscipline}</span>
        </Dropdown.Item>
      ) : (
        ""
      )}

      {allDisciplines
        ? allDisciplines
            .filter((disc) => disc.name !== currDiscipline)
            .map((disc) => (
              <Dropdown.Item>
                <span className="capitalize">{disc.name}</span>
              </Dropdown.Item>
            ))
        : "Loading"}
    </Dropdown>
  );
};

export default NavBarDiscDropDown;
