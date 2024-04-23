import { Dropdown, Avatar } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { dropDownTheme, avatarTheme } from "./Style/NavBarStyle";
import { HiOutlineAdjustments, HiLogout } from "react-icons/hi";
import useUser from "../../context/useUser";

const NavBarLoggedIn = () => {
  const { user, logOut, isAdmin, isMod, modViewOn, setModViewOn } = useUser();
  function handleModView() {
    setModViewOn(!modViewOn);
  }

  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-end pr-3 text-white items-center">
      {isAdmin || isMod ? (
        <div className="basis-2/3 hidden lg:flex">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={modViewOn}
              className="sr-only peer"
              onChange={handleModView}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none ring-2 ring-mainlight rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Mod View {modViewOn ? "on" : "off"}
            </span>
          </label>
        </div>
      ) : (
        ""
      )}
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
          <div className="flex gap-2" onClick={() => navigate("/settings")}>
            <HiOutlineAdjustments /> Settings
          </div>
        </Dropdown.Item>
        {isAdmin ? (
          <Dropdown.Item>
            {" "}
            <div onClick={() => navigate("/admin")}>Admin Dashboard</div>
          </Dropdown.Item>
        ) : (
          ""
        )}

        <Dropdown.Item>
          <div className="flex gap-2" onClick={logOut}>
            <HiLogout />
            Log out
          </div>
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default NavBarLoggedIn;
