import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../Hooks/useAuth.js";
const RequiredAuth = () => {
  const { isAuth } = useAuth();
  const location = useLocation();

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to={{ pathname: "/login", state: { from: location } }} replace />
  );
};

export default RequiredAuth;
