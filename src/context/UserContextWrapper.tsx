import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import aerialApi from "../service/aerialApi";

type userType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
};

type disciplType = {
  id: string;
  ref: string;
  name: string;
};

type figType = {
  id: string;
  name: string;
  ref: string;
  image: string;
  discipline: string;
  difficulty: string;
  imgArtist: string;
  imgArtistUrl: string;
};

type favoriteType = {
  id: string;
  figure: string;
  user: string;
};
// define beforehand the types for the states
type UserContextProps = {
  user: userType | null;
  setUser: React.Dispatch<React.SetStateAction<userType | null>>;
  storeToken: (token: string) => void;
  removeToken: () => void;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  logOut: () => void;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  authenticateUser: () => void;
  allFigures: figType[];
  setAllFigures: React.Dispatch<React.SetStateAction<figType[]>>;
  allDisciplines: disciplType[] | null;
  setAllDisciplines: React.Dispatch<React.SetStateAction<disciplType[] | null>>;
  currDiscipline: string | null;
  setCurrDiscipline: React.Dispatch<React.SetStateAction<string | null>>;
  currDisciplineRef: string | null;
  setCurrDisciplineRef: React.Dispatch<React.SetStateAction<string | null>>;
  favorites: favoriteType[];
  setFavorites: React.Dispatch<React.SetStateAction<favoriteType[]>>;
};

export const UserContext = createContext<UserContextProps | null>(null);

function UserContextWrapper({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<userType | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  // use state to avoid front end errors if data is still being fetched
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // call authenticate function when loading page
  useEffect(() => {
    authenticateUser();
    fetchAllDisciplines();
    fetchFigures();
    fetchFavorites();
  }, []);

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
  const [currDiscipline, setCurrDiscipline] = useState<string | null>(null);
  const [currDisciplineRef, setCurrDisciplineRef] = useState<string | null>(
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
  function fetchCurrDiscipline() {
    const getDiscipline = location.pathname.split("/")[1];
    if (getDiscipline !== "") {
      const found = allDisciplines?.find((disc) => disc.ref === getDiscipline);
      if (found) {
        setCurrDiscipline(found.name);
        setCurrDisciplineRef(found.ref);
      }
    }
  }

  // fetch all the figures
  const [allFigures, setAllFigures] = useState<figType[]>([]);

  async function fetchFigures() {
    try {
      const response = await aerialApi.get(`/figures/`);
      setAllFigures(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  // fetch the favorites for logged in user
  const [favorites, setFavorites] = useState<favoriteType[]>([]);

  async function fetchFavorites() {
    try {
      const response = await aerialApi.get("/favorites");
      setFavorites(response.data);
    } catch (error) {
      console.log(error);
    }
  }

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
        logOut,
        isLoading,
        setIsLoading,
        allFigures,
        setAllFigures,
        allDisciplines,
        setAllDisciplines,
        currDiscipline,
        setCurrDiscipline,
        currDisciplineRef,
        setCurrDisciplineRef,
        favorites,
        setFavorites,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContextWrapper;
