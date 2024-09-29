import { useEffect, useState } from "react";
import { getDocs, collection, doc, updateDoc } from "firebase/firestore";
import { db } from '../Config/firebase';
import './User.css';

const User = () => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [taskAnswers, setTaskAnswers] = useState({
    task1: 1,
    task2: 1,
    task3: 1,
    task4: 1,
    task5: 1,
  });
  const [submitted, setSubmitted] = useState(false);

  // **Read**: Fetches the list of users from Firestore
  const getUserList = async () => {
    try {
      const usersCollectionRef = collection(db, "Users");
      const data = await getDocs(usersCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUserList(filteredData);
    } catch (err) {
      console.error("Error fetching user list:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserList();
  }, []);

  // Helper functions to generate task questions based on the user's role
  const getTask1Text = (role) => {
    switch (role) {
      case "Software Engineer":
        return "Data Structures";
      case "Product Manager":
        return "Project Management";
      case "Database Administrator":
        return "Database Performance";
      case "Data Analyst":
        return "Data Visualization";
      case "Cybersecurity Specialist":
        return "Security Protocols";
      default:
        return "Unknown Task";
    }
  };

  const getTask2Text = (role) => {
    switch (role) {
      case "Software Engineer":
        return "Algorithms";
      case "Product Manager":
        return "Stakeholder Communication";
      case "Database Administrator":
        return "Backup and Recovery";
      case "Data Analyst":
        return "Statistical Analysis";
      case "Cybersecurity Specialist":
        return "Threat Detection";
      default:
        return "Unknown Task";
    }
  };

  const getTask3Text = (role) => {
    switch (role) {
      case "Software Engineer":
        return "System Design";
      case "Product Manager":
        return "Risk Management";
      case "Database Administrator":
        return "Query Optimization";
      case "Data Analyst":
        return "Data Cleaning";
      case "Cybersecurity Specialist":
        return "Incident Response";
      default:
        return "Unknown Task";
    }
  };

  const getTask4Text = (role) => {
    switch (role) {
      case "Software Engineer":
        return "Version Control";
      case "Product Manager":
        return "Product Roadmaps";
      case "Database Administrator":
        return "User Access Control";
      case "Data Analyst":
        return "Data Reporting";
      case "Cybersecurity Specialist":
        return "Vulnerability Assessment";
      default:
        return "Unknown Task";
    }
  };

  const getTask5Text = (role) => {
    switch (role) {
      case "Software Engineer":
        return "Testing and Debugging";
      case "Product Manager":
        return "Market Research";
      case "Database Administrator":
        return "Data Integrity";
      case "Data Analyst":
        return "Predictive Modeling";
      case "Cybersecurity Specialist":
        return "Firewall Configuration";
      default:
        return "Unknown Task";
    }
  };

  const handleRatingChange = (task, value) => {
    setTaskAnswers((prevState) => ({ ...prevState, [task]: value }));
  };

  // Update Firestore with task answers for each user
  const handleTaskSubmit = async (user) => {
    try {
      const userRef = doc(db, "Users", user.id);
      await updateDoc(userRef, {
        task1: `Task 1: Rate your proficiency in ${getTask1Text(user.role)}. Value: ${taskAnswers.task1}`,
        task2: `Task 2: Rate your proficiency in ${getTask2Text(user.role)}. Value: ${taskAnswers.task2}`,
        task3: `Task 3: Rate your proficiency in ${getTask3Text(user.role)}. Value: ${taskAnswers.task3}`,
        task4: `Task 4: Rate your proficiency in ${getTask4Text(user.role)}. Value: ${taskAnswers.task4}`,
        task5: `Task 5: Rate your proficiency in ${getTask5Text(user.role)}. Value: ${taskAnswers.task5}`,
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Error updating user tasks:", err);
    }
  };

  return (
    <div className="user-list-container">
      <h1 className="profile-header">All Users</h1>
      
      {loading ? (
        <p>Loading user data...</p>
      ) : (
        <div className="user-list">
          {userList.length === 0 ? (
            <p>No users found in Firestore.</p>
          ) : (
            userList.map((user) => (
              <div key={user.id} className="user-card fade-in">
                <h2>Name: {user.name}</h2>
                <h3>Role: {user.role}</h3>
                <h3>Project: {user.project_query}</h3>
                <h3>Team Members: {user.team_query}</h3>

                {/* Questions based on the role */}
                {!submitted ? (
                  <div className="questions-container">
                    <h3>Please rate your proficiency on the following tasks as a {user.role}:</h3>

                    {/* Task 1 */}
                    <div className="task">
                      <p>{getTask1Text(user.role)}:</p>
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
                      <p>{getTask2Text(user.role)}:</p>
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
                      <p>{getTask3Text(user.role)}:</p>
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
                      <p>{getTask4Text(user.role)}:</p>
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
                      <p>{getTask5Text(user.role)}:</p>
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

                    <button className="submit-btn" onClick={() => handleTaskSubmit(user)}>
                      Submit Answers
                    </button>
                  </div>
                ) : (
                  <h3>Your answers have been submitted successfully!</h3>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default User;
