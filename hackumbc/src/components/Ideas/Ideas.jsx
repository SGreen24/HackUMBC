import { useEffect, useState } from "react";
import { collection, getDoc, doc } from "firebase/firestore"; // Firestore imports
import { db, auth } from "../Config/firebase"; // Firebase configuration
import { useNavigate } from "react-router-dom";
import "./Ideas.css"; // Custom CSS for futuristic design

const Ideas = () => {
  const [role, setRole] = useState(""); // Store user's role
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  // Function to get the user's role from Firestore
  const fetchUserRole = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        setError("User not logged in");
        setLoading(false);
        return;
      }

      // Fetch the user document from Firestore
      const userDoc = await getDoc(doc(db, "Users", userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setRole(userData.role); // Store the user's role
      } else {
        setError("No user data found");
      }
    } catch (err) {
      console.error("Error fetching user role:", err);
      setError("Error fetching user role");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserRole(); // Fetch user role when the component mounts
  }, []);

  // Function to handle navigation to a project page
  const goToProject = (projectName) => {
    navigate(`/project?name=${projectName}`);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  // Hard-coded project buttons based on the user's role
  const renderProjectsForRole = () => {
    switch (role) {
      case "Software Engineer":
        return (
          <div className="projects-container">
            <div
              className="project-button glowing-button"
              onClick={() => goToProject("Data Structures Mastery")}
            >
              Data Structures Mastery
            </div>
            <div
              className="project-button glowing-button"
              onClick={() => goToProject("Algorithm Optimization")}
            >
              Algorithm Optimization
            </div>
            <div
              className="project-button glowing-button"
              onClick={() => goToProject("System Design Blueprint")}
            >
              System Design Blueprint
            </div>
          </div>
        );
      case "Project Manager":
        return (
          <div className="projects-container">
            <div
              className="project-button glowing-button"
              onClick={() => goToProject("Agile Sprint Planner")}
            >
              Agile Sprint Planner
            </div>
            <div
              className="project-button glowing-button"
              onClick={() => goToProject("Risk Mitigation Strategy")}
            >
              Risk Mitigation Strategy
            </div>
            <div
              className="project-button glowing-button"
              onClick={() => goToProject("Stakeholder Communication Hub")}
            >
              Stakeholder Communication Hub
            </div>
          </div>
        );
      case "Database Admin":
        return (
          <div className="projects-container">
            <div
              className="project-button glowing-button"
              onClick={() => goToProject("Performance Tuning")}
            >
              Performance Tuning
            </div>
            <div
              className="project-button glowing-button"
              onClick={() => goToProject("Backup Recovery Simulation")}
            >
              Backup Recovery Simulation
            </div>
            <div
              className="project-button glowing-button"
              onClick={() => goToProject("Access Management System")}
            >
              Access Management System
            </div>
          </div>
        );
      case "Data Analyst":
        return (
          <div className="projects-container">
            <div
              className="project-button glowing-button"
              onClick={() => goToProject("Data Visualization Tool")}
            >
              Data Visualization Tool
            </div>
            <div
              className="project-button glowing-button"
              onClick={() => goToProject("Predictive Modeling Dashboard")}
            >
              Predictive Modeling Dashboard
            </div>
            <div
              className="project-button glowing-button"
              onClick={() => goToProject("Statistical Analysis Platform")}
            >
              Statistical Analysis Platform
            </div>
          </div>
        );
      case "Business Analyst":
        return (
          <div className="projects-container">
            <div
              className="project-button glowing-button"
              onClick={() => goToProject("Market Research Tool")}
            >
              Market Research Tool
            </div>
            <div
              className="project-button glowing-button"
              onClick={() => goToProject("Strategic Planning App")}
            >
              Strategic Planning App
            </div>
            <div
              className="project-button glowing-button"
              onClick={() => goToProject("Business Process Analysis")}
            >
              Business Process Analysis
            </div>
          </div>
        );
      default:
        return <h2>No specific projects available for your role.</h2>;
    }
  };

  return (
    <div className="ideas-page">
      <h1 className="ideas-title">Recommended Project Ideas</h1>
      <p className="ideas-subtitle">Here are 3 projects tailored to your role:</p>

      {renderProjectsForRole()} {/* Dynamically render projects based on role */}

      <footer className="footer">
        <p>Explore your potential with these tailored projects. Click on any to get started!</p>
      </footer>
    </div>
  );
};

export default Ideas;
