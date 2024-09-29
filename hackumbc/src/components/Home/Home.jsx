import { useNavigate } from 'react-router-dom';
import './Home.css';
import { FaArrowAltCircleLeft } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  // Functions to handle navigation
  const handleNavigateToQuestionnaire = () => navigate("/questionnaire");
  const handleNavigateToProject = () => navigate("/project");
  const handleNavigateLogout = () => navigate("/");

  return (
    <div className="home-container">
      <h1>Fintech Project Idea Manager</h1>
      <p>You have successfully logged in.</p>

      {/* Questionnaire button */}
      <div className="form-section">
        <button className="questionnaire-btn" onClick={handleNavigateToQuestionnaire}>
          Go to Questionnaire
        </button>
      </div>

      {/* Projects button */}
      <div className="form-section">
        <button className="project-btn" onClick={handleNavigateToProject}>
          Go to Projects
        </button>
      </div>

      {/* Logout button */}
      <div className="form-section">
        <button className="logout-btn" onClick={handleNavigateLogout}>
          <FaArrowAltCircleLeft style={{ marginRight: '8px' }} />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Home;
