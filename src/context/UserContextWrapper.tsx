import { createContext, useState, useEffect, ReactNode } from "react";
import aerialApi from "../service/aerialApi";

type userType = {
  id: number;
  username: string;
  email: string;
  image: string;
};

// define beforehand the types for the states
type UserContextProps = {
  user: userType | null;
  setUser: React.Dispatch<React.SetStateAction<userType | null>>;
  storeToken: (token: string) => void;
  removeToken: () => void;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  authenticateUser: () => void;
  currDiscipline: string | null;
  setCurrDiscipline: React.Dispatch<React.SetStateAction<string | null>>;
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
    fetchDiscipline();
  }, []);

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

  // check and store in local storage the discipline being used (by default, none and just default homepage)
  const [currDiscipline, setCurrDiscipline] = useState<string | null>(null);

  const fetchDiscipline = () => {
    const getDiscipline = location.pathname.split("/")[1];
    if (getDiscipline) {
      switch (getDiscipline) {
        case "pole":
          setCurrDiscipline("Pole Dance");
          break;
        case "aerial-hoop":
          setCurrDiscipline("Aerial Hoop");
          break;
        case "contorsion":
          setCurrDiscipline("Contorsion");
          break;
        default:
          setCurrDiscipline(null);
          break;
      }
    } else {
      setCurrDiscipline(null);
    }
  };

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
        isLoading,
        setIsLoading,
        currDiscipline,
        setCurrDiscipline,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContextWrapper;
