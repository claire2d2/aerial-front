import { useContext } from "react";
import { UserContext } from "./UserContextWrapper";
const useUser = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUser must be used within a UserContextProvider");
  }
  return context;
};

export default useUser;
