import { Dropdown, Avatar } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { dropDownTheme, avatarTheme } from "./Style/NavBarStyle";
import { HiOutlineAdjustments, HiLogout } from "react-icons/hi";
import useUser from "../../context/useUser";

const NavBarLoggedIn = () => {
  const { user, logOut, isAdmin, isMod } = useUser();
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-end pr-3">
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
        {!isAdmin ? <Dropdown.Item> Admin Dashboard</Dropdown.Item> : ""}
        {isAdmin || isMod ? (
          <Dropdown.Item> Mod View Toggle</Dropdown.Item>
        ) : (
          ""
        )}
        <Dropdown.Item>
          <button className="flex gap-2" onClick={logOut}>
            <HiLogout />
            Log out
          </button>
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default NavBarLoggedIn;
