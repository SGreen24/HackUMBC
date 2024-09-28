// components/Home/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Home.css'; // Import CSS for styling
import { FaArrowAltCircleLeft } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to navigate to the Questionnaire page
  const handleNavigateToQuestionnaire = () => {
    navigate("/questionnaire"); // Navigate to the /questionnaire route
  };

  const handleNavigateLogout = () => {
    navigate("/");
  }

  return (
    <div className="home-container">
      <h1>Welcome to the Home Page!</h1>
      <p>You have successfully logged in.</p>

      {/* Button to redirect to the Questionnaire page */}
      <button className="questionnaire-btn" onClick={handleNavigateToQuestionnaire}>
        Go to Questionnaire
      </button>

      {/* Button to redirect to Login page*/}
      <button className="" onClick={handleNavigateLogout}
    >
      <FaArrowAltCircleLeft size="24" className="mr-6" />
      Log Out
      </button>

    </div>
  );
};

export default Home;
