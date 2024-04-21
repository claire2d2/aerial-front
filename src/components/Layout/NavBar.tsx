import DarkLightToggle from "./DarkLightToggle";
import { useNavigate, Link } from "react-router-dom";
import useUser from "../../context/useUser";

import { Avatar, Dropdown } from "flowbite-react";
import { avatarTheme, dropDownTheme } from "./Style/NavBarStyle";
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
  const { isLoggedIn, currDiscipline, currDisciplineRef } = useUser();
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
      <div className="flex md:order-2 basis-1/6">
        {isLoggedIn ? <NavBarLoggedIn /> : <NavBarLoggedOut />}
        <div className="lg:hidden">
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
              <span className="capitalize">{currDiscipline}</span>
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
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>
      <div className="hidden lg:block xl:w-2/3">
        <ul className="flex gap-4 items-center font-semibold w-full text-white">
          <li>
            <NavBarDiscDropDown />
          </li>
          {currDiscipline ? (
            <div className="flex gap-4">
              <li>
                <button
                  className="hover:text-linkhover"
                  onClick={() => navigate(`/${currDisciplineRef}/figures`)}
                >
                  Figures
                </button>
              </li>
              <li>
                <button
                  className="hover:text-linkhover"
                  onClick={() =>
                    navigate(`/${currDisciplineRef}/combo-generator`)
                  }
                >
                  Generate Combo
                </button>
              </li>
              <li>
                <button
                  className="hover:text-linkhover"
                  onClick={() => navigate(`/${currDisciplineRef}/combos`)}
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
