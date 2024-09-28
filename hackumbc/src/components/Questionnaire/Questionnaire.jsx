import { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from '../Config/firebase'; // Firestore configuration
import './Questionnaire.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Questionnaire = () => {
  const [newName, setNewName] = useState(''); // User name input
  const [newRole, setNewRole] = useState(''); // User role input
  const [newSkills, setNewSkills] = useState(''); // User skills input
  const [confirmationMessage, setConfirmationMessage] = useState(''); // Message after user creation

  const [showProjectQuestion, setShowProjectQuestion] = useState(false); // Toggle project question
  const [showTeamQuestion, setShowTeamQuestion] = useState(false); // Toggle team question

  const [projectAnswer, setProjectAnswer] = useState(''); // Project description input
  const [teamAnswer, setTeamAnswer] = useState(''); // Team size input

  const usersCollectionRef = collection(db, "Users");
  const geminiCollectionRef = collection(db, "Gemini");

  const navigate = useNavigate(); // Create navigate object for redirection

  // Create a new user entry in Firestore
  const onSubmitUser = async () => {
    try {
      await addDoc(usersCollectionRef, {
        name: newName,
        role: newRole,
        skills: newSkills,
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

  // Submits the project questionnaire
  const onSubmitProject = async () => {
    setShowTeamQuestion(true); // Show the team question
  };

  // Submits the team answer, stores it in Firestore, and redirects to the User page
  const onSubmitTeam = async () => {
    try {
      await addDoc(geminiCollectionRef, {
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
        <input
          placeholder="Role..."
          onChange={(e) => setNewRole(e.target.value)} // Set the new user's role
        />
        <input
          placeholder="Skills (comma separated)..."
          onChange={(e) => setNewSkills(e.target.value)} // Set the new user's skills
        />
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
    </div>
  );
};

export default Questionnaire;
