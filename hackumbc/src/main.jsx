// src/main.jsx
import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import React Router components
import Login from "./components/Login/Login";
import Home from "./components/Home/Home"; // Import Home component

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router> {/* Wrap the app in the Router component */}
      <Routes> {/* Define the routes for your app */}
        <Route path="/" element={<Login />} /> {/* Login page is the default route */}
        <Route path="/home" element={<Home />} /> {/* Home page route */}
      </Routes>
    </Router>
  </React.StrictMode>
);
