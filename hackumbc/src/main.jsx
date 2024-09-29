// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from './components/Login/Auth'; // Import Auth component
import Home from './components/Home/Home'; // Import Home component
import Questionnaire from './components/Questionnaire/Questionnaire'; // Import Questionnaire component
import Register from "./components/Register/Register";
import './index.css'; // Import global styles

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router> {/* Wrap the app in Router for routing */}
      <Routes> {/* Define the routes */}
        <Route path="/" element={<Auth />} /> {/* Default path renders the Auth component */}
        <Route path="/home" element={<Home />} /> {/* /home path renders the Home component */}
        <Route path="/questionnaire" element={<Questionnaire />} /> {/* /questionnaire path renders the Questionnaire component */}
        <Route path="/register" element={<Register />} /> {/* register path renders the Register component*/}
      </Routes>
    </Router>
  </StrictMode>
);
