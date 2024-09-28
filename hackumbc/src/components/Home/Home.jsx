// components/Home/Home.jsx
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Home.css'; // Import CSS for styling
import HomeButton from '../HomeButton';

const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to navigate to the Questionnaire page
  const handleNavigateToQuestionnaire = () => {
    navigate("/questionnaire"); // Navigate to the /questionnaire route
  };

  return (
    <div className="home-container">
      <h1>Welcome to the Home Page!</h1>
      <p>You have successfully logged in.</p>

      {/* Button to redirect to the Questionnaire page */}
      <button className="questionnaire-btn" onClick={handleNavigateToQuestionnaire}>
        Go to Questionnaire
      </button>
      <HomeButton/>
    </div>
  );
};

export default Home;
