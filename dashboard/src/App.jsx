import React from "react";
import RequireAuth from "./components/requireAuth";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Index from "./pages";
import PersistLogin from "./components/persistLogin";
const App = () => {
  const ROLES = {
    User: "user",
    Editor: "editor",
    Admin: "admin",
  };
  return (
    <div className="min-h-screen bg-bgColorweb">
      <BrowserRouter>
        <Routes>
          {/* public route  */}
          <Route path="/login" element={<Login />} />
          {/* private route */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={ROLES.Admin} />}>
              <Route path="/" element={<Index />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
