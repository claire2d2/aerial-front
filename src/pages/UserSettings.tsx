import { Tabs } from "flowbite-react";
import { HiOutlineAdjustments } from "react-icons/hi";

const UserSettings = () => {
  return (
    <Tabs aria-label="Default tabs" style="default">
      <Tabs.Item active title="Profile" icon={HiOutlineAdjustments}>
        This is{" "}
        <span className="font-medium text-gray-800 dark:text-white">
          Profile tab's associated content
        </span>
        . Clicking another tab will toggle the visibility of this one for the
        next. The tab JavaScript swaps classes to control the content visibility
        and styling.
      </Tabs.Item>
      <Tabs.Item title="Dashboard" icon={HiOutlineAdjustments}>
        This is{" "}
        <span className="font-medium text-gray-800 dark:text-white">
          Dashboard tab's associated content
        </span>
        . Clicking another tab will toggle the visibility of this one for the
        next. The tab JavaScript swaps classes to control the content visibility
        and styling.
      </Tabs.Item>
      <Tabs.Item title="Settings" icon={HiOutlineAdjustments}>
        This is{" "}
        <span className="font-medium text-gray-800 dark:text-white">
          Settings tab's associated content
        </span>
        . Clicking another tab will toggle the visibility of this one for the
        next. The tab JavaScript swaps classes to control the content visibility
        and styling.
      </Tabs.Item>

      <Tabs.Item disabled title="Disabled">
        Admin
      </Tabs.Item>
    </Tabs>
  );
};

export default UserSettings;
