// components/Questionnaire/Questionnaire.jsx
import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from '../Config/firebase'; // Firestore configuration
import './Questionnaire.css';

const Questionnaire = () => {
  const [userList, setUserList] = useState([]); // Stores the list of users
  const [newName, setNewName] = useState(''); // User name input
  const [newRole, setNewRole] = useState(''); // User role input
  const [newSkills, setNewSkills] = useState(''); // User skills input
  const [updatedName, setUpdatedName] = useState(''); // Updated name for editing

  const [projectAnswer, setProjectAnswer] = useState(''); // Project description input
  const [teamAnswer, setTeamAnswer] = useState(''); // Team size input

  // Reference to the "Users" collection in Firestore
  const usersCollectionRef = collection(db, "Users");
  const geminiCollectionRef = collection(db, "Gemini");

  // Fetches the list of users from Firestore (Read operation)
  const getUserList = async () => {
    try {
      const data = await getDocs(usersCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUserList(filteredData); // Store the list of users in state
    } catch (err) {
      console.error(err);
    }
  };

  // Create a new user entry in Firestore
  const onSubmitUser = async () => {
    try {
      await addDoc(usersCollectionRef, {
        name: newName,
        role: newRole,
        skills: newSkills,
        userId: auth?.currentUser?.uid, // Links user to currently authenticated user
      });
      getUserList(); // Refresh list after submission
    } catch (err) {
      console.error(err);
    }
  };

  // Update the user's name in Firestore
  const updateUser = async (id) => {
    const userDoc = doc(db, "Users", id); // Reference the specific user by ID
    await updateDoc(userDoc, { name: updatedName }); // Update the user's name
    getUserList(); // Refresh list after updating
  };

  // Delete a user entry in Firestore
  const deleteUser = async (id) => {
    const userDoc = doc(db, "Users", id); // Reference the specific user by ID
    await deleteDoc(userDoc); // Delete the user document
    getUserList(); // Refresh list after deletion
  };

  // Create a new project questionnaire entry in Firestore
  const onSubmitQuestionnaire = async () => {
    try {
      await addDoc(geminiCollectionRef, {
        project_query: projectAnswer,
        team_query: teamAnswer,
      });
      alert('Project questionnaire submitted successfully!');
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch the list of users when the component loads
  useEffect(() => {
    getUserList();
  }, []);

  return (
    <div className="questionnaire-container">
      <h1>Questionnaire and User Management</h1>
      <p>Fill out the form to create or update user data, or answer project-related questions.</p>

      {/* Form for creating a new user */}
      <div className="form-section">
        <h2>Create New User</h2>
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

      {/* Displaying list of users with options to delete or update */}
      <div className="scroll-container">
        <h2>User List</h2>
        {userList.map((user) => (
          <div key={user.id} className="user-card">
            <h1>{user.name}</h1>
            <p>Role: {user.role}</p>
            <p>Skills: {user.skills}</p>

            {/* Delete button */}
            <button className="delete-btn" onClick={() => deleteUser(user.id)}>Delete User</button>

            {/* Update name */}
            <input
              placeholder="Update name..."
              onChange={(e) => setUpdatedName(e.target.value)} // Set the updated name input
            />
            <button className="update-btn" onClick={() => updateUser(user.id)}>Update Name</button>
          </div>
        ))}
      </div>

      {/* Project Questionnaire Section */}
      <div className="form-section">
        <h2>Project Questionnaire</h2>
        <div className="question">
          <label>What do you want for your project?</label>
          <textarea
            placeholder="Describe your project..."
            value={projectAnswer}
            onChange={(e) => setProjectAnswer(e.target.value)}
          />
        </div>

        <div className="question">
          <label>How many team members?</label>
          <textarea
            placeholder="Number of team members..."
            value={teamAnswer}
            onChange={(e) => setTeamAnswer(e.target.value)}
          />
        </div>

        <button className="submit-btn" onClick={onSubmitQuestionnaire}>
          Submit Project Questionnaire
        </button>
      </div>
    </div>
  );
};

export default Questionnaire;
