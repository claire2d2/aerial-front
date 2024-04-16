import DarkLightToggle from "./DarkLightToggle";
import useUser from "../../context/useUser";
import { Dropdown } from "flowbite-react";
import { HiOutlineAdjustments, HiLogout } from "react-icons/hi";

import { useNavigate } from "react-router-dom";

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

const NavBar = () => {
  const { isLoggedIn, user } = useUser();
  const navigate = useNavigate();
  const showWhenLoggedOut = (
    <div className="flex gap-2 w-full">
      <div onClick={() => navigate("/signup")}>Sign up</div>
      <div onClick={() => navigate("/login")}>Log In</div>
    </div>
  );

  const showWhenLoggedIn = (
    <div className="h-full flex w-full">
      <Dropdown
        arrowIcon={false}
        label={
          <div className="h-full p-1 flex justify-center items-center gap-2">
            <div>{user?.username}</div>
            <img src={user?.image} alt="" className="h-full object-cover" />
          </div>
        }
        inline
      >
        <Dropdown.Item icon={HiOutlineAdjustments}>
          User preferences
        </Dropdown.Item>
        <Dropdown.Item icon={HiLogout}>Log out</Dropdown.Item>
      </Dropdown>
    </div>
  );

  return (
    <nav className="flex h-full w-full justify-between text-white">
      <div>Air2D2</div>
      <div>
        <Dropdown label="Pole Dance">
          <Dropdown.Item>Aerial Hoop</Dropdown.Item>
          <Dropdown.Item>Pole Dance</Dropdown.Item>
          <Dropdown.Item>Contorsion</Dropdown.Item>
        </Dropdown>
      </div>
      <div>
        <ul className="flex">
          <li>Figures</li>
          <li>Generate a combo</li>
          <li>Combos</li>
        </ul>
      </div>
      <div className="basis-1/6">
        {isLoggedIn ? showWhenLoggedIn : showWhenLoggedOut}
      </div>
      <div className="absolute">
        <DarkLightToggle />
      </div>
    </nav>
  );
};

export default NavBar;
