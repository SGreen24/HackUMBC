import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from './components/Login/Auth'; // Import Auth component
import Home from './components/Home/Home'; // Import Home component
import Questionnaire from './components/Questionnaire/Questionnaire'; // Import Questionnaire component
import Project from './components/Project/Project'; // Import Project component
import User from './components/UserQuestions/User'; // Import User component
import Ideas from './components/Ideas/Ideas'; // Import Ideas component
import Register from "./components/Register/Register";
import './index.css'; // Import global styles

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} /> 
        <Route path="/home" element={<Home />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/user" element={<User />} />
        <Route path="/project" element={<Project />} />
        <Route path="/ideas" element={<Ideas />} /> {/* New Ideas route */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  </StrictMode>
);
