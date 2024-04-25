import { useState, useEffect } from "react";
import useUser from "../../../context/useUser";
import aerialApi from "../../../service/aerialApi";

const UserPreferences = () => {
  const { darkMode, setDarkMode, setFilterHistPref, filterHistPref, user } =
    useUser();

  const [darkModePref, setDarkModePref] = useState<string>("");
  const [currentHistPref, setCurrentHistPref] = useState<string>("");

  useEffect(() => {
    if (user) {
      setDarkModePref(user?.darkModePref);
      setCurrentHistPref(user?.filterHistPref);
    }
  }, [user, darkMode, filterHistPref]);

  async function handleDarkMode(option: string) {
    try {
      const response = await aerialApi.put("/auth/preferences", {
        darkModePref: option,
        filterHistPref: filterHistPref,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    if (option === "light") {
      setDarkMode(false);
    } else {
      setDarkMode(true);
    }
    setDarkModePref(option);
  }

  async function handleHistoryPref(option: string) {
    try {
      const response = await aerialApi.put("/auth/preferences", {
        filterHistPref: option,
        darkModePref: darkModePref,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }

    if (option === "true") {
      setFilterHistPref(true);
    } else {
      setFilterHistPref(false);
    }
  }

  return (
    <div className="flex flex-col px-3">
      <div className="flex  flex-col lg:flex-row w-full justify-center gap-4 h-80">
        <div className="basis-1/2 h-full mx-6">
          <h3 className="font-semibold">Display preferences</h3>
          <div className="flex gap-2">
            <div>Dark mode:</div>
            <select
              name="darkMode"
              id="darkMode"
              onChange={(e) => handleDarkMode(e.target.value)}
              className="bg-transparent dark:border dark:border-textdark rounded-lg"
              value={darkModePref}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
        </div>
        <div className="basis-1/2 h-full mx-6 flex flex-col gap-2">
          <h3 className="font-semibold">Navigation preferences</h3>
          <div className="flex gap-2">
            <div>Keep filter history for figures search:</div>
            <select
              name="history"
              id="history"
              className="bg-transparent dark:border dark:border-textdark rounded-lg"
              onChange={(e) => handleHistoryPref(e.target.value)}
              value={JSON.stringify(currentHistPref)}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="italic text-sm">
            Please note that we will store your filter preferences in your local
            storage, so you will lose them if you clear your cache!
          </div>
          <div>
            <div className="flex gap-2">
              Redirect to my favorite discipline when logging in:{" "}
              <span className="bg-bgmainlight text-white dark:bg-gray px-2 rounded-lg font-medium">
                Coming soon!
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full text-center">
        <p>
          These are the only preferences you can tweak for now, but more will be
          coming soon!
        </p>{" "}
        <p>
          Any ideas for future developments? Feel free to contact us via the
          contact form!
        </p>
      </div>
    </div>
  );
};

export default UserPreferences;
