import DarkLightToggle from "./DarkLightToggle";
import { useNavigate, Link } from "react-router-dom";
import useUser from "../../context/useUser";

import { Dropdown } from "flowbite-react";
import { dropDownTheme } from "./Style/NavBarStyle";
import NavBarDiscDropDown from "./NavBarDiscDropDown";
import NavBarLoggedIn from "./NavBarLoggedIn";
import NavBarLoggedOut from "./NavBarLoggedOut";
import NavMenuLink from "./NavMenuLink";
import { HiBars3 } from "react-icons/hi2";

//TODO: navbar for when user is logged in
// on the right: profile picture in a small circle
// settings
// notifications?

//TODO: global search bar
// menu that opens sidebar on the left :
// homepage, combo generator, moves list, studio map,
// search bar to search a move

//TODO: styling, navbar that changes height when scrolling down and that appears when scrolling up

const NavBar = () => {
  const { isLoggedIn, currDiscipline } = useUser();
  const navigate = useNavigate();

  return (
    <nav className="flex items-center px-1 w-full justify-between h-full">
      <div className="w-1/6 flex">
        <Link to="/">
          <div className="flex w-full items-center">
            <img src="/cloud.png" className="mr-3 h-6" alt="site logo" />
            <span className="text-xl text-white font-bold">Air2d2</span>
          </div>
        </Link>
      </div>

      <DarkLightToggle />

      <div className="flex md:order-2 basis-1/5">
        {isLoggedIn ? <NavBarLoggedIn /> : <NavBarLoggedOut />}
        <div className="lg:hidden">
          {currDiscipline ? (
            <Dropdown
              arrowIcon={false}
              theme={dropDownTheme}
              label={
                <span className="text-2xl flex">
                  <HiBars3 />
                </span>
              }
            >
              <Dropdown.Header>
                <span className="capitalize">{currDiscipline.name}</span>
              </Dropdown.Header>
              <Dropdown.Item>
                <NavMenuLink pageRef="figures">Figures</NavMenuLink>
              </Dropdown.Item>
              <Dropdown.Item>
                <NavMenuLink pageRef="combo-generator">
                  Generate combo
                </NavMenuLink>
              </Dropdown.Item>
              <Dropdown.Item>
                <NavMenuLink pageRef="combos">Combos</NavMenuLink>
              </Dropdown.Item>{" "}
            </Dropdown>
          ) : (
            <Dropdown
              arrowIcon={false}
              theme={dropDownTheme}
              label={
                <span className="text-2xl flex">
                  <HiBars3 />
                </span>
              }
            >
              <Dropdown.Header>Choose a discipline</Dropdown.Header>
              <Dropdown.Item>
                <Link to="/pole">Pole</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="/aerial-hoop">Aerial Hoop</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="/contorsion">Contorsion</Link>
              </Dropdown.Item>
            </Dropdown>
          )}
        </div>
      </div>
      <div className="hidden lg:block xl:w-2/3">
        <ul className="flex gap-4 items-center font-semibold w-full">
          <li>
            <NavBarDiscDropDown />
          </li>
          {currDiscipline ? (
            <div className="flex gap-4 text-white dark:text-textdark">
              <li>
                <button
                  className="hover:text-linkhover"
                  onClick={() => navigate(`/${currDiscipline.ref}/figures`)}
                >
                  Figures
                </button>
              </li>
              <li>
                <button
                  className="hover:text-linkhover"
                  onClick={() =>
                    navigate(`/${currDiscipline.ref}/combo-generator`)
                  }
                >
                  Generate Combo
                </button>
              </li>
              <li>
                <button
                  className="hover:text-linkhover"
                  onClick={() => navigate(`/${currDiscipline.ref}/combos`)}
                >
                  Combos
                </button>
              </li>
            </div>
          ) : (
            ""
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
