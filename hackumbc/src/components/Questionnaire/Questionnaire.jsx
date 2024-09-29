import { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from '../Config/firebase'; // Firestore configuration
import './Questionnaire.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Questionnaire = () => {
  const [newName, setNewName] = useState(''); // User name input
  const [newRole, setNewRole] = useState(''); // User role input
  const [confirmationMessage, setConfirmationMessage] = useState(''); // Message after user creation

  const [showProjectQuestion, setShowProjectQuestion] = useState(false); // Toggle project question
  const [showTeamQuestion, setShowTeamQuestion] = useState(false); // Toggle team question
  const [showConfirmationPage, setShowConfirmationPage] = useState(false); // Toggle confirmation page

  const [projectAnswer, setProjectAnswer] = useState(''); // Project description input
  const [teamAnswer, setTeamAnswer] = useState(''); // Team size input

  const usersCollectionRef = collection(db, "Users");
  const geminiCollectionRef = collection(db, "Gemini");

  const navigate = useNavigate(); // Create navigate object for redirection

  // List of roles with buttons
  const roles = ['Data Analyst', 'Project Manager', 'Database Admin', 'Business Analyst', 'Software Engineer'];

  // Create a new user entry in Firestore
  const onSubmitUser = async () => {
    try {
      await addDoc(usersCollectionRef, {
        name: newName,
        role: newRole,
        userId: auth?.currentUser?.uid, // Links user to currently authenticated user
      });
      setConfirmationMessage('User has been created!'); // Show confirmation message
      setTimeout(() => {
        setConfirmationMessage(''); // Clear message after 3 seconds
        setShowProjectQuestion(true); // Show the project question
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  // Function to handle role selection
  const selectRole = (role) => {
    setNewRole(role);
  };

  // Submits the project questionnaire
  const onSubmitProject = async () => {
    setShowTeamQuestion(true); // Show the team question
  };

  // Displays the confirmation page
  const onSubmitTeam = () => {
    setShowConfirmationPage(true);
  };

  // Final submission of all the data to Firestore and redirection to User page
  const onConfirmSubmit = async () => {
    try {
      await addDoc(geminiCollectionRef, {
        name: newName,
        role: newRole,
        project_query: projectAnswer,
        team_query: teamAnswer,
      });
      alert('Questionnaire data has been stored in Firestore!');
      // Redirect to the User page after storing data
      navigate('/user');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="questionnaire-container">
      <h1>Create New User</h1>
      <p>Fill out the form to create a new user.</p>

      {/* Form for creating a new user */}
      <div className="form-section">
        <input
          placeholder="Name..."
          onChange={(e) => setNewName(e.target.value)} // Set the new user's name
        />

        <h2>What is your role?</h2>
        <div className="role-buttons">
          {roles.map((role) => (
            <button
              key={role}
              className={`role-btn ${newRole === role ? 'selected' : ''}`}
              onClick={() => selectRole(role)}
            >
              {role}
            </button>
          ))}
        </div>
        <button className="submit-btn" onClick={onSubmitUser}>Submit User</button>
      </div>

      {/* Confirmation message with a smooth animation */}
      {confirmationMessage && (
        <div className="confirmation-message">
          <h2>{confirmationMessage}</h2>
        </div>
      )}

      {/* Project Question Section */}
      {showProjectQuestion && (
        <div className="fade-in">
          <h2>What do you want for your project?</h2>
          <textarea
            placeholder="Describe your project..."
            value={projectAnswer}
            onChange={(e) => setProjectAnswer(e.target.value)}
          />
          <button className="submit-btn" onClick={onSubmitProject}>
            Submit Project Answer
          </button>
        </div>
      )}

      {/* Team Question Section */}
      {showTeamQuestion && (
        <div className="fade-in">
          <h2>How many team members?</h2>
          <textarea
            placeholder="Number of team members..."
            value={teamAnswer}
            onChange={(e) => setTeamAnswer(e.target.value)}
          />
          <button className="submit-btn" onClick={onSubmitTeam}>
            Submit Team Answer
          </button>
        </div>
      )}

      {/* Confirmation Page */}
      {showConfirmationPage && (
        <div className="confirmation-page fade-in">
          <h2>Confirm Your Information</h2>
          <p><strong>Name:</strong> {newName}</p>
          <p><strong>Role:</strong> {newRole}</p>
          <p><strong>Project:</strong> {projectAnswer}</p>
          <p><strong>Team Members:</strong> {teamAnswer}</p>
          <button className="submit-btn" onClick={onConfirmSubmit}>
            Confirm and Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Questionnaire;
