import useUser from "../../../context/useUser";
import { Navigate, Outlet } from "react-router-dom";

function IsLoggedOut() {
  const { isLoggedIn, isLoading } = useUser();
  if (isLoading) {
    return <p>Loading</p>;
  }
  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  }
  return <Outlet />;
}

export default IsLoggedOut;
