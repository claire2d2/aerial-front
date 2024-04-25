import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import aerialApi from "../service/aerialApi";
import { zoneType } from "../components/Types";

type userType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  roles: string[];
  darkModePref: string;
  filterHistPref: string;
};

type disciplType = {
  _id: string;
  ref: string;
  name: string;
};

// define beforehand the types for the states
type UserContextProps = {
  user: userType | null;
  setUser: React.Dispatch<React.SetStateAction<userType | null>>;
  storeToken: (token: string) => void;
  removeToken: () => void;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isAdmin: boolean;
  isMod: boolean;
  modViewOn: boolean;
  setModViewOn: React.Dispatch<React.SetStateAction<boolean>>;
  logOut: () => void;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  authenticateUser: () => void;
  allDisciplines: disciplType[] | null;
  setAllDisciplines: React.Dispatch<React.SetStateAction<disciplType[] | null>>;
  currDiscipline: disciplType | null;
  setCurrDiscipline: React.Dispatch<React.SetStateAction<disciplType | null>>;
  zones: zoneType[];
  setZones: React.Dispatch<React.SetStateAction<zoneType[]>>;
  // favorites: faveType[];
  // setFavorites: React.Dispatch<React.SetStateAction<faveType[]>>;
  // fetchFavorites: () => void;
  activeFilters: string[];
  setActiveFilters: React.Dispatch<React.SetStateAction<string[]>>;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  filterHistPref: boolean;
  setFilterHistPref: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserContext = createContext<UserContextProps | null>(null);

function UserContextWrapper({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<userType | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isMod, setIsMod] = useState<boolean>(false);
  const [modViewOn, setModViewOn] = useState<boolean>(false);
  // use state to avoid front end errors if data is still being fetched
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // call authenticate function when loading page
  useEffect(() => {
    authenticateUser();
    fetchAllDisciplines();
    fetchZones();
    // fetchFavorites();
  }, []);

  // determine if user has admin role or not
  useEffect(() => {
    if (user?.roles.includes("admin")) {
      setIsAdmin(true);
    }
    if (user?.roles.includes("mod")) {
      setIsMod(true);
    }
  }, [user]);

  useEffect(() => {
    fetchCurrDiscipline();
  }, [fetchCurrDiscipline]);

  const storeToken = (token: string) => localStorage.setItem("token", token);
  const removeToken = () => localStorage.removeItem("token");

  const authenticateUser = async () => {
    try {
      // get token from local storage, token exists if user is logged in
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        setIsLoading(false);
        setIsLoggedIn(false);
        return;
      }
      // if token exists, send request with the bearer token to verify its validity
      const response = await aerialApi.get("/auth/verify", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // request should send a response with the user data if successful
      setUser(response.data);
      setIsLoggedIn(true);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setUser(null);
      setIsLoggedIn(false);
      setIsLoading(false);
    }
  };

  // function to log out

  const navigate = useNavigate();
  const logOut = () => {
    removeToken();
    setUser(null);
    setIsLoggedIn(false);
    setCurrDiscipline(null);
    navigate("/");
  };

  // check the discipline being used (by default, none and just default homepage)
  const [currDiscipline, setCurrDiscipline] = useState<disciplType | null>(
    null
  );
  const [allDisciplines, setAllDisciplines] = useState<disciplType[] | null>(
    null
  );

  async function fetchAllDisciplines() {
    try {
      const response = await aerialApi.get("/disciplines");
      setAllDisciplines(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function fetchCurrDiscipline() {
    const getDiscipline = location.pathname.split("/")[1];
    if (getDiscipline !== "") {
      const found = allDisciplines?.find((disc) => disc.ref === getDiscipline);
      if (found) {
        setCurrDiscipline(found);
      }
    }
  }

  // fetch all the figures
  // const [allFigures, setAllFigures] = useState<figType[]>([]);

  // async function fetchFigures() {
  //   try {
  //     const response = await aerialApi.get(`/figures/`);
  //     setAllFigures(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // fetch all the available zones
  const [zones, setZones] = useState<zoneType[]>([]);

  async function fetchZones() {
    try {
      const response = await aerialApi.get("/zones");
      setZones(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  // global state for dark mode, to store in the user preferences

  const [darkMode, setDarkMode] = useState<boolean>(false);

  const [filterHistPref, setFilterHistPref] = useState<boolean>(false);

  useEffect(() => {
    if (user?.darkModePref === "system") {
      const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (prefersDarkMode) {
        setDarkMode(true);
      } else {
        setDarkMode(false);
      }
    }
    if (user?.darkModePref === "dark") {
      setDarkMode(true);
    }
    if (user?.darkModePref === "light") {
      setDarkMode(false);
    }
    if (user?.filterHistPref === "true") {
      setFilterHistPref(true);
    } else if (user?.filterHistPref === "false") {
      setFilterHistPref(false);
    }
  }, [user]);

  useEffect(() => {
    authenticateUser();
    setDarkModePreference(darkMode);
  }, [darkMode, filterHistPref]);

  function setDarkModePreference(prefersDarkMode: boolean) {
    const html = document.documentElement;
    if (prefersDarkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }

  // if preferences are stored in local storage and user has chosen to keep history, get them
  let initialActiveFilters: string[] = [];
  if (localStorage.getItem("activeFilters") && filterHistPref) {
    const history = localStorage.getItem("activeFilters");
    if (history !== null) {
      initialActiveFilters = JSON.parse(history);
    }
  }

  let initialSortBy: string = "level";
  if (localStorage.getItem("sortBy") && filterHistPref) {
    const history = localStorage.getItem("sortBy");
    if (history !== null) {
      initialSortBy = JSON.parse(history);
    }
  }
  // global states for the active filters and sort preferences, in case user wants to save them
  const [activeFilters, setActiveFilters] =
    useState<string[]>(initialActiveFilters);
  const [sortBy, setSortBy] = useState<string>(initialSortBy);

  // update local storage to store the current team and team status every time it is changed
  useEffect(() => {
    if (filterHistPref) {
      localStorage.setItem("activeFilters", JSON.stringify(activeFilters));
    }
  }, [activeFilters]);

  useEffect(() => {
    if (filterHistPref) {
      localStorage.setItem("sortBy", JSON.stringify(sortBy));
    }
  }, [sortBy]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        storeToken,
        removeToken,
        authenticateUser,
        isLoggedIn,
        setIsLoggedIn,
        isAdmin,
        isMod,
        modViewOn,
        setModViewOn,
        logOut,
        isLoading,
        setIsLoading,
        allDisciplines,
        setAllDisciplines,
        currDiscipline,
        setCurrDiscipline,
        zones,
        setZones,
        activeFilters,
        setActiveFilters,
        sortBy,
        setSortBy,
        darkMode,
        setDarkMode,
        filterHistPref,
        setFilterHistPref,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContextWrapper;
