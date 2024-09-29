import { useState } from 'react';
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from '../Config/firebase';
import './Questionnaire.css';
import { useNavigate } from 'react-router-dom';

const Questionnaire = () => {
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [showProjectQuestion, setShowProjectQuestion] = useState(false);
  const [showTeamQuestion, setShowTeamQuestion] = useState(false);
  const [projectAnswer, setProjectAnswer] = useState('');
  const [teamAnswer, setTeamAnswer] = useState('');
  const [docId, setDocId] = useState(null); // Store document ID after first Firestore write

  const navigate = useNavigate();

  const roles = ['Data Analyst', 'Project Manager', 'Database Admin', 'Business Analyst', 'Software Engineer'];

  // Create a new user entry in Firestore
  const onSubmitUser = async () => {
    try {
      const userId = auth?.currentUser?.uid;

      // Create the document with a specific ID (use setDoc to control the document ID)
      const newDocRef = doc(db, "Users", userId);
      
      // Store user name and role in Firestore (initial data)
      await setDoc(newDocRef, {
        name: newName,
        role: newRole,
        userId: userId,
      });
      
      // Save the document ID for later updates
      setDocId(userId);

      setConfirmationMessage('User has been created!');
      setTimeout(() => {
        setConfirmationMessage('');
        setShowProjectQuestion(true);
      }, 2000);
    } catch (err) {
      console.error("Error creating user: ", err);
    }
  };

  const selectRole = (role) => {
    setNewRole(role);
  };

  const onSubmitProject = () => {
    setShowTeamQuestion(true);
  };

  // Update the existing user document with project and team details
  const onSubmitTeam = async () => {
    try {
      if (!docId) return;

      const userRef = doc(db, "Users", docId);

      // Update the Firestore document with project and team details
      await setDoc(userRef, {
        project_query: projectAnswer,
        team_query: teamAnswer,
      }, { merge: true }); // Merge the new fields into the existing document

      alert('Questionnaire data has been stored in Firestore!');
      navigate('/user');
    } catch (err) {
      console.error("Error storing data: ", err);
    }
  };

  return (
    <div className="questionnaire-container">
      <h1>Create New User</h1>
      <p>Fill out the form to create a new user.</p>

      <div className="form-section">
        <input
          placeholder="Name..."
          onChange={(e) => setNewName(e.target.value)}
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

      {confirmationMessage && (
        <div className="confirmation-message">
          <h2>{confirmationMessage}</h2>
        </div>
      )}

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
