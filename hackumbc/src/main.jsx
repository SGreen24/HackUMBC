import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from './components/Login/Auth'; // Import Auth component
import Home from './components/Home/Home'; // Import Home component
import Questionnaire from './components/Questionnaire/Questionnaire'; // Import Questionnaire component
import Project from './components/Project/Project'; // Import Project component
import User from './components/UserQuestions/User'; // Import User component
import './index.css'; // Import global styles

/* The new Router */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router> {/* Add Router component here */}
      <Routes> {/* Ensure correct Route setup */}
        <Route path="/" element={<Auth />} /> 
        <Route path="/home" element={<Home />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/user" element={<User />} /> {/* Route for User component */}
        <Route path="/project" element={<Project />} />
        
      </Routes>
    </Router>
  </StrictMode>
);