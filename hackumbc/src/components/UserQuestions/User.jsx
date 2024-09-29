import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../Config/firebase";
import './User.css';

const User = () => {
  const [userData, setUserData] = useState(null); // Store user data from Firestore
  const [loading, setLoading] = useState(true); // Loading state for fetching data
  const [error, setError] = useState(null); // Error state for handling failures
  const [taskAnswers, setTaskAnswers] = useState({
    task1: 0,
    task2: 0,
    task3: 0,
    task4: 0,
    task5: 0,
  });
  const [submitted, setSubmitted] = useState(false); // Submission state

  // Fetch user data based on the currently logged-in user
  const fetchUserData = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        setError("User ID not found");
        setLoading(false);
        return;
      }

      // Query the Users collection for the specific user ID
      const userRef = doc(db, "Users", userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUserData(userSnap.data());
      } else {
        setError("No such user data found");
      }
    } catch (err) {
      setError("Error fetching user data");
      console.error("Error fetching user data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Helper function to update Firestore with answers to the tasks/questions
  const handleTaskSubmit = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId || !userData) return;

      // Update user's document with task answers in Firestore
      const userRef = doc(db, "Users", userId);
      await updateDoc(userRef, {
        task1: `Task 1: Rate your proficiency in ${getTask1Text(userData.role)}. Value: ${taskAnswers.task1}`,
        task2: `Task 2: Rate your proficiency in ${getTask2Text(userData.role)}. Value: ${taskAnswers.task2}`,
        task3: `Task 3: Rate your proficiency in ${getTask3Text(userData.role)}. Value: ${taskAnswers.task3}`,
        task4: `Task 4: Rate your proficiency in ${getTask4Text(userData.role)}. Value: ${taskAnswers.task4}`,
        task5: `Task 5: Rate your proficiency in ${getTask5Text(userData.role)}. Value: ${taskAnswers.task5}`,
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Error updating user tasks:", err);
    }
  };

// Helper functions to generate task questions based on the user's role
const getTask1Text = (role) => {
  const tasks = {
    "Software Engineer": "Data Structures",
    "Project Manager": "Project Planning",
    "Database Admin": "Database Performance Optimization",
    "Data Analyst": "Data Visualization",
    "Business Analyst": "Business Process Analysis",
  };
  return tasks[role] || "Unknown Task";
};

const getTask2Text = (role) => {
  const tasks = {
    "Software Engineer": "Algorithms",
    "Project Manager": "Stakeholder Communication",
    "Database Admin": "Backup and Recovery Strategies",
    "Data Analyst": "Statistical Data Analysis",
    "Business Analyst": "Market Research and Analysis",
  };
  return tasks[role] || "Unknown Task";
};

const getTask3Text = (role) => {
  const tasks = {
    "Software Engineer": "System Design",
    "Project Manager": "Risk Management",
    "Database Admin": "Query Optimization",
    "Data Analyst": "Data Cleaning",
    "Business Analyst": "Data Reporting",
  };
  return tasks[role] || "Unknown Task";
};

const getTask4Text = (role) => {
  const tasks = {
    "Software Engineer": "Version Control (Git)",
    "Project Manager": "Product Roadmaps",
    "Database Admin": "User Access Management",
    "Data Analyst": "Data Reporting",
    "Business Analyst": "Business Strategy Development",
  };
  return tasks[role] || "Unknown Task";
};

const getTask5Text = (role) => {
  const tasks = {
    "Software Engineer": "Testing and Debugging",
    "Project Manager": "Market Research",
    "Database Admin": "Data Integrity Maintenance",
    "Data Analyst": "Predictive Modeling",
    "Business Analyst": "Strategic Planning",
  };
  return tasks[role] || "Unknown Task";
};


  // Handle response changes from buttons
  const handleRatingChange = (task, value) => {
    setTaskAnswers((prevState) => ({ ...prevState, [task]: value }));
  };

  // Render a loading state if data is still being fetched
  if (loading) {
    return <h2>Loading user data...</h2>;
  }

  // Render an error message if there's an issue with fetching data
  if (error) {
    return <h2>Error: {error}</h2>;
  }

  // Render no user data message if no user data is found
  if (!userData) {
    return <h2>No user data available</h2>;
  }

  return (
    <div className="user-container">
      <h1>Welcome, {userData.name}!</h1>
      <h2>Role: {userData.role}</h2>

      {!submitted ? (
        <div className="questions-container">
          <h3>Please rate your proficiency on the following tasks as a {userData.role}:</h3>

          {/* Task 1 */}
          <div className="task">
            <p>{getTask1Text(userData.role)}:</p>
            {[1, 2, 3, 4, 5].map((val) => (
              <button
                key={`task1-${val}`}
                className={taskAnswers.task1 === val ? "selected" : ""}
                onClick={() => handleRatingChange("task1", val)}
              >
                {val}
              </button>
            ))}
          </div>

          {/* Task 2 */}
          <div className="task">
            <p>{getTask2Text(userData.role)}:</p>
            {[1, 2, 3, 4, 5].map((val) => (
              <button
                key={`task2-${val}`}
                className={taskAnswers.task2 === val ? "selected" : ""}
                onClick={() => handleRatingChange("task2", val)}
              >
                {val}
              </button>
            ))}
          </div>

          {/* Task 3 */}
          <div className="task">
            <p>{getTask3Text(userData.role)}:</p>
            {[1, 2, 3, 4, 5].map((val) => (
              <button
                key={`task3-${val}`}
                className={taskAnswers.task3 === val ? "selected" : ""}
                onClick={() => handleRatingChange("task3", val)}
              >
                {val}
              </button>
            ))}
          </div>

          {/* Task 4 */}
          <div className="task">
            <p>{getTask4Text(userData.role)}:</p>
            {[1, 2, 3, 4, 5].map((val) => (
              <button
                key={`task4-${val}`}
                className={taskAnswers.task4 === val ? "selected" : ""}
                onClick={() => handleRatingChange("task4", val)}
              >
                {val}
              </button>
            ))}
          </div>

          {/* Task 5 */}
          <div className="task">
            <p>{getTask5Text(userData.role)}:</p>
            {[1, 2, 3, 4, 5].map((val) => (
              <button
                key={`task5-${val}`}
                className={taskAnswers.task5 === val ? "selected" : ""}
                onClick={() => handleRatingChange("task5", val)}
              >
                {val}
              </button>
            ))}
          </div>

          <button className="submit-btn" onClick={handleTaskSubmit}>
            Submit Answers
          </button>
        </div>
      ) : (
        <h3>Your answers have been submitted successfully!</h3>
      )}
    </div>
  );
};

export default User;
