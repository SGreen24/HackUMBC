// components/Home/Home.jsx
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Home.css'; // Import CSS for styling
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useCallback } from "react";

const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to navigate to the Questionnaire page
  const handleNavigateToQuestionnaire = () => {
    navigate("/questionnaire"); // Navigate to the /questionnaire route
  };

  const handleNavigateToProject = () => {
    navigate("/project"); // Navigate to the /project route
  };

  const handleNavigateLogout = () => {
    navigate("/");
  }

  return (
    <div className="home-container">
      <h1>Fintech Project Idea Manager</h1>
      <p>You have successfully logged in.</p>

      {/* Button to redirect to the Questionnaire page */}
      <button className="questionnaire-btn" onClick={handleNavigateToQuestionnaire}>
        Go to Questionnaire
      </button>

      {/* Button to redirect to the Project page */}
      <button className="project-btn" onClick={handleNavigateToProject}>
        Go to Projects
      </button>

      {/* Button to redirect to Login page*/}
      <button className="logout-btn" onClick={handleNavigateLogout}
    >
      <FaArrowAltCircleLeft style={{ marginRight: '8px' }}/>
      Log Out
      </button>

    </div>
  );
};

export default Home;
