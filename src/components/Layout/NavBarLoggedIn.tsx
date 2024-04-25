import { Dropdown, Avatar } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { dropDownTheme, avatarTheme } from "./Style/NavBarStyle";
import { HiOutlineAdjustments, HiDatabase } from "react-icons/hi";
import useUser from "../../context/useUser";

const NavBarLoggedIn = () => {
  const { user, isAdmin, isMod, modViewOn, setModViewOn } = useUser();
  function handleModView() {
    setModViewOn(!modViewOn);
  }

  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-end pr-3 text-white items-center z-11">
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
          <span className="block text-sm font-medium z-11">
            {`${user?.firstName} ${user?.lastName}`}
          </span>
          <span className="block truncate text-sm">{user?.email}</span>
        </Dropdown.Header>
        <Dropdown.Item>
          <div className="flex gap-2" onClick={() => navigate("/settings")}>
            <HiOutlineAdjustments /> Settings
          </div>
        </Dropdown.Item>
        {isAdmin ? (
          <Dropdown.Item>
            <div onClick={() => navigate("/admin")} className="flex gap-2">
              <HiDatabase /> Admin Dashboard
            </div>
          </Dropdown.Item>
        ) : (
          ""
        )}
        {isMod || isAdmin ? (
          <Dropdown.Item>
            <div onClick={handleModView} className="hidden lg:block">
              Turn mod view{" "}
              <span className="font-bold">{modViewOn ? "off" : "on"}</span>
            </div>
          </Dropdown.Item>
        ) : (
          ""
        )}
      </Dropdown>
    </div>
  );
};

export default NavBarLoggedIn;
