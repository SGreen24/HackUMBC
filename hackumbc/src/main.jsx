// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import Login from "./components/Login/Login"; // Ensure correct import path
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>
);
