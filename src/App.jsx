import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import Neighborhoods from "./pages/Neighborhoods";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/vecindarios" element={<Neighborhoods />} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
