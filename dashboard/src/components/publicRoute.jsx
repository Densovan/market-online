import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Navbar from "./navbar";

const PublicRoute = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  return auth?.accessToken || auth?.role === allowedRoles ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default PublicRoute;
