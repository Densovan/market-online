// import { useContext } from "react";
// import { useLocation, Navigate, Outlet } from "react-router-dom";
// import AuthContext from "../context/authProvider";

// const RequireAuth = ({ allowedRoles }) => {
//   const { auth, setAuth } = useContext(AuthContext);
//   const location = useLocation();
//   // console.log(auth, "autututu");
//   // return !auth ? (
//   //   <Navigate to="/login" state={{ from: location }} replace />
//   // ) : (
//   //   <Outlet />
//   // );
//   return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
//     <Outlet />
//   ) : auth?.user ? (
//     <Navigate to="/unauthorized" state={{ from: location }} replace />
//   ) : (
//     <Navigate to="/login" state={{ from: location }} replace />
//   );
// };

// export default RequireAuth;

import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  // return auth?.role ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to="/login" state={{ from: location }} replace />
  // );
  return auth?.role === allowedRoles ? (
    <Outlet />
  ) : auth?.accessToken ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
