import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Index from "./pages";
const App = () => {
  return (
    <div className="min-h-screen bg-bgColorweb">
      <BrowserRouter>
        <Routes>
          {/* public route  */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Index />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
