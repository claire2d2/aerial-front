import { useContext } from "react";
import { UserContext } from "./UserContextWrapper";
const useUser = () => useContext(UserContext);

export default useUser;
