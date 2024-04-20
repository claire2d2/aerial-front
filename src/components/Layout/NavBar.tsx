import DarkLightToggle from "./DarkLightToggle";
import { useNavigate, Link } from "react-router-dom";
import useUser from "../../context/useUser";

import { Avatar, Dropdown } from "flowbite-react";
import NavBarDiscDropDown from "./NavBarDiscDropDown";
import { HiOutlineAdjustments, HiLogout } from "react-icons/hi";
import { HiBars3 } from "react-icons/hi2";

//TODO : navbar for when user isn't logged in
// sign up
// log in

//TODO: navbar for when user is logged in
// on the right: profile picture in a small circle
// settings
// notifications?

//TODO: global search bar
// menu that opens sidebar on the left :
// homepage, combo generator, moves list, studio map,
// search bar to search a move

//TODO: styling, navbar that changes height when scrolling down and that appears when scrolling up

const dropDownTheme = {
  floating: {
    animation: "transition-opacity",
    base: "z-0 w-fit divide-y divide-gray-100 rounded shadow focus:outline-none",
    divider: "my-1 h-px dark:bg-bgmaindark",
    header: "block px-4 py-2 text-sm text-text dark:text-white",
    hidden: "invisible opacity-0",
    style: {
      auto: " bg-white text-text dark:border-textdark dark:bg-bgmaindark dark:text-textdark active:text-white",
    },
    target: "w-fit border-none",
  },
  inlineWrapper: "flex items-center",
};

const avatarTheme = {
  root: {
    base: "flex items-center justify-center space-x-4 rounded",
    bordered: "p-1 ring-2",
    rounded: "rounded-full",
    color: {
      dark: "ring-white",
    },
    img: {
      base: "rounded",
      off: "relative overflow-hidden bg-white",
      on: "",
      placeholder: "absolute -bottom-1 h-auto w-auto bg-white text-text",
    },
    size: {
      xs: "h-6 w-6",
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-20 w-20",
      xl: "h-36 w-36",
    },
    stacked: "ring-2 ring-gray-300 dark:ring-gray-500",
    statusPosition: {
      "bottom-left": "-bottom-1 -left-1",
      "bottom-center": "-bottom-1",
      "bottom-right": "-bottom-1 -right-1",
      "top-left": "-left-1 -top-1",
      "top-center": "-top-1",
      "top-right": "-right-1 -top-1",
      "center-right": "-right-1",
      center: "",
      "center-left": "-left-1",
    },
    status: {
      away: "bg-yellow-400",
      base: "absolute h-3.5 w-3.5 rounded-full border-2 border-white dark:border-gray-800",
      busy: "bg-red-400",
      offline: "bg-gray-400",
      online: "bg-green-400",
    },
    initials: {
      text: "font-medium text-text",
      base: "relative inline-flex items-center justify-center overflow-hidden bg-white",
    },
  },
};

const NavBar = () => {
  const { isLoggedIn, user, currDiscipline, currDisciplineRef, logOut } =
    useUser();
  const navigate = useNavigate();
  const currentLink = location.pathname.split("/")[1];

  const showWhenLoggedOut = (
    <div className="flex gap-6 w-full text-white font-semibold mr-10 h-full">
      <div
        onClick={() => navigate("/signup")}
        className={`hover:text-linkhover cursor-pointer ${
          currentLink === "signup" ? "text-linkhover" : "text-white"
        }`}
      >
        Sign up
      </div>
      <div
        onClick={() => navigate("/login")}
        className={`hover:text-linkhover cursor-pointer caret-none ${
          currentLink === "login" ? "text-linkhover" : "text-white"
        }`}
      >
        Log In
      </div>
    </div>
  );

  const showWhenLoggedIn = (
    <Dropdown
      arrowIcon={false}
      theme={dropDownTheme}
      inline
      label={
        <Avatar
          theme={avatarTheme}
          alt="User settings"
          placeholderInitials={`${user?.firstName[0]}${user?.lastName[0]}`}
          rounded
          color="dark"
          size="sm"
        />
      }
    >
      <Dropdown.Header>
        <span className="block text-sm font-medium">
          {`${user?.firstName} ${user?.lastName}`}
        </span>
        <span className="block truncate text-sm">{user?.email}</span>
      </Dropdown.Header>
      <Dropdown.Item>
        <button className="flex gap-2" onClick={() => navigate("/settings")}>
          <HiOutlineAdjustments /> Settings
        </button>
      </Dropdown.Item>
      <Dropdown.Item>
        <button className="flex gap-2" onClick={logOut}>
          <HiLogout />
          Log out
        </button>
      </Dropdown.Item>
    </Dropdown>
  );

  return (
    <nav className="flex items-center px-1 w-full justify-between">
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
        {isLoggedIn ? showWhenLoggedIn : showWhenLoggedOut}
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
              <Link to={`/${currDisciplineRef}/figures`}>Figures</Link>
            </Dropdown.Item>
            <Dropdown.Item>Generate Combo</Dropdown.Item>
            <Dropdown.Item>Combos</Dropdown.Item>
          </Dropdown>
        </div>
      </div>
      <div className="hidden xl:block xl:w-2/3">
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
