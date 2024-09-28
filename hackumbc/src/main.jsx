import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
<<<<<<< HEAD
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
=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from './components/Login/Auth'; // Import Auth component
import Home from './components/Home/Home'; // Import Home component
import Questionnaire from './components/Questionnaire/Questionnaire'; // Import Questionnaire component
import Project from './components/Project/Project'; // Import Questionnaire component
import './index.css'; // Import global styles

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router> {/* Wrap the app in Router for routing */}
      <Routes> {/* Define the routes */}
        <Route path="/" element={<Auth />} /> {/* Default path renders the Auth component */}
        <Route path="/home" element={<Home />} /> {/* /home path renders the Home component */}
        <Route path="/questionnaire" element={<Questionnaire />} /> {/* /questionnaire path renders the Questionnaire component */}
        <Route path="/project" element={<Project />} /> {/* /questionnaire path renders the Questionnaire component */}
>>>>>>> 2de9020538a92779c73ffe47e82d7311d937cffc
      </Routes>
    </Router>
  </StrictMode>
);
