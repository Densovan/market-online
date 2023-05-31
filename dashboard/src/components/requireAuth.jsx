import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Navbar from "./navbar";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  console.log(auth, "authPublic");
  return auth?.accessToken || auth?.role === allowedRoles ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <>
      <Navigate to="/login" state={{ from: location }} replace />
    </>
  );
  //   return auth?.role === allowedRoles ? (
  //     <>
  //       <Navbar />
  //       <Outlet />
  //     </>
  //   ) : auth?.accessToken ? (
  //     <Navigate to="/" state={{ from: location }} replace />
  //   ) : (
  //     <Navigate to="/login" state={{ from: location }} replace />
  //   );
};

export default RequireAuth;
