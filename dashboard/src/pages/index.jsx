import React from "react";
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
const Index = () => {
  const navigate = useNavigate();
  const logout = useLogout();
  const signOut = async () => {
    await logout();
    navigate("/login");
  };
  return (
    <>
      <div className="text-center">
        Home Page <button onClick={signOut}>Logout</button>
      </div>
    </>
  );
};

export default Index;
