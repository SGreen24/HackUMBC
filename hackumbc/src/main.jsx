import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import React Router components
import Auth from './components/Login/Auth';
import Home from './components/Home/Home';
import Questionnaire from './components/Questionnaire/Questionnaire';
import User from './components/UserQuestions/User'; // Import the User component
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/user" element={<User />} /> {/* Route for User.jsx */}
      </Routes>
    </Router>
  </StrictMode>
);
