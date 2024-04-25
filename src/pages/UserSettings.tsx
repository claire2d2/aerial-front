import { Tabs } from "flowbite-react";
import { HiOutlineAdjustments } from "react-icons/hi";
import UserData from "../components/PagesComponents/UserSettingsComponents/UserData";
import UserPreferences from "../components/PagesComponents/UserSettingsComponents/UserPreferences";

const UserSettings = () => {
  return (
    <Tabs aria-label="Default tabs" style="default">
      <Tabs.Item active title="User Data" icon={HiOutlineAdjustments}>
        <UserData />
      </Tabs.Item>
      <Tabs.Item title="User preferences" icon={HiOutlineAdjustments}>
        <UserPreferences />
      </Tabs.Item>
    </Tabs>
  );
};

export default UserSettings;
