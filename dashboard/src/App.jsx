import React from "react";
import RequireAuth from "./components/requireAuth";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Index from "./pages";
import PersistLogin from "./components/persistLogin";
import Navbar from "./components/navbar";
import PublicRoute from "./components/publicRoute";
const App = () => {
  const ROLES = {
    NotLogin: "",
    User: "user",
    Editor: "editor",
    Admin: "admin",
  };
  return (
    <div className="min-h-screen bg-bgColorweb">
      <BrowserRouter>
        <Routes>
          {/* public route  */}
          <Route element={<PublicRoute allowedRoles={ROLES.Admin} />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/* private route */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={ROLES.Admin} />}>
              <Route path="/" element={<Index />} />
            </Route>
            {/* <Route element={<RequireAuth />}>
              <Route path="/" element={<Index />} />
            </Route> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
