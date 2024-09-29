import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db, auth } from "../Config/firebase";
import { useNavigate } from "react-router-dom";
import "./Ideas.css";

const Ideas = () => {
  const [role, setRole] = useState(""); // Store user's role
  const [teamSize, setTeamSize] = useState(0); // Store team size from Firestore
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  // Fetch the user's role and team size from Firestore
  const fetchUserDetails = async () => {
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
        setTeamSize(Number(userData.team_query) || 0); // Store the user's team size (from previous questionnaire)
      } else {
        setError("No user data found");
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
      setError("Error fetching user details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails(); // Fetch user role and team size when the component mounts
  }, []);

  // Navigate to the project page
  const goToProject = (projectName) => {
    navigate(`/project?name=${projectName}`);
  };

  // Generate unique teammates based on the project and team size
  const getTeammatesForProject = (project) => {
    const teammates = [];

    switch (project) {
      case "Blockchain Payment Gateway":
        teammates.push("Blockchain Developer", "Security Analyst", "Payment Systems Architect");
        break;
      case "AI-driven Risk Analysis":
        teammates.push("Data Scientist", "Quantitative Analyst", "Risk Manager");
        break;
      case "Personal Finance Tracker":
        teammates.push("UI/UX Developer", "Full Stack Developer", "Data Analyst");
        break;
      case "High-Frequency Trading Algorithm":
        teammates.push("Algorithm Engineer", "Data Scientist", "Trading Strategist");
        break;
      case "Cryptocurrency Wallet":
        teammates.push("Blockchain Developer", "Security Specialist", "Frontend Developer");
        break;
      case "Robo-Advisor for Investments":
        teammates.push("AI/ML Engineer", "Financial Planner", "Software Engineer");
        break;
      default:
        teammates.push("General Developer", "QA Engineer", "Business Analyst");
    }

    return teammates.slice(0, teamSize).join(", ") || "No teammates needed";
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  // Render hoverable, animated project buttons with unique teammate details
  const renderProjectsForRole = () => {
    const projects = [];

    switch (role) {
      case "Software Engineer":
        projects.push(
          { name: "Blockchain Payment Gateway", teammates: getTeammatesForProject("Blockchain Payment Gateway") },
          { name: "AI-driven Risk Analysis", teammates: getTeammatesForProject("AI-driven Risk Analysis") },
          { name: "Personal Finance Tracker", teammates: getTeammatesForProject("Personal Finance Tracker") }
        );
        break;
      case "Project Manager":
        projects.push(
          { name: "High-Frequency Trading Algorithm", teammates: getTeammatesForProject("High-Frequency Trading Algorithm") },
          { name: "Robo-Advisor for Investments", teammates: getTeammatesForProject("Robo-Advisor for Investments") },
          { name: "Cryptocurrency Wallet", teammates: getTeammatesForProject("Cryptocurrency Wallet") }
        );
        break;
      default:
        return <h2>No specific projects available for your role.</h2>;
    }

    return (
      <div className="projects-container">
        {projects.map((project, index) => (
          <div
            key={index}
            className="project-card glowing-card"
            onMouseEnter={(e) => e.currentTarget.classList.add("hover")}
            onMouseLeave={(e) => e.currentTarget.classList.remove("hover")}
            onClick={() => goToProject(project.name)}
          >
            <div className="project-info">
              <h3>{project.name}</h3>
              <p className="fade-in-teammates">Potential Teammates: {project.teammates}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="ideas-page">
      <h1 className="ideas-title">Recommended Fintech Project Ideas</h1>
      <p className="ideas-subtitle">Hover over a project to see potential teammates:</p>

      {renderProjectsForRole()}

      <footer className="footer">
        <p>Explore your potential with these tailored projects. Click on any to get started!</p>
      </footer>
    </div>
  );
};

export default Ideas;
