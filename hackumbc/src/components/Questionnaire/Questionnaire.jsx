import { useState } from 'react';
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from '../Config/firebase';
import './Questionnaire.css';
import { useNavigate } from 'react-router-dom';

const Questionnaire = () => {
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [showTeamQuestion, setShowTeamQuestion] = useState(false);
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
        setShowTeamQuestion(true); // Move to the team member question
      }, 1500);
    } catch (err) {
      console.error("Error creating user: ", err);
    }
  };

  const selectRole = (role) => {
    setNewRole(role);
  };

  // Update the existing user document with team details
  const onSubmitTeam = async () => {
    try {
      if (!docId) return;

      const userRef = doc(db, "Users", docId);

      // Update the Firestore document with team details
      await setDoc(userRef, {
        team_query: teamAnswer,
      }, { merge: true }); // Merge the new fields into the existing document

      alert('Questionnaire data has been stored in Firestore!');
      navigate('/ideas'); // Navigate to Ideas page after submission
    } catch (err) {
      console.error("Error storing data: ", err);
    }
  };

  return (
    <div className="questionnaire-container">
      <h1 className="fade-in">Create Your Profile</h1>
      <p className="fade-in">Tell us a bit about yourself to get started.</p>

      <div className="form-section fade-in">
        <input
          className="input-field"
          placeholder="Enter your name..."
          onChange={(e) => setNewName(e.target.value)}
        />
        <h2 className="fade-in">What is your role?</h2>
        <div className="role-buttons fade-in">
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
        <button className="submit-btn fade-in" onClick={onSubmitUser}>Submit Role</button>
      </div>

      {confirmationMessage && (
        <div className="confirmation-message">
          <h2>{confirmationMessage}</h2>
        </div>
      )}

      {showTeamQuestion && (
        <div className="fade-in">
          <h2>How many team members will be in your group?</h2>
          <input
            className="input-field"
            placeholder="Enter the number of team members..."
            value={teamAnswer}
            onChange={(e) => setTeamAnswer(e.target.value)}
          />
          <button className="submit-btn fade-in" onClick={onSubmitTeam}>
            Submit Team Info
          </button>
        </div>
      )}
    </div>
  );
};

export default Questionnaire;
