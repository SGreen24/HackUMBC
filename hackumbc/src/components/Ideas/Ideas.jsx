import { useEffect, useState } from "react";
import { getDoc, doc, setDoc } from "firebase/firestore"; // Firestore imports
import { db, auth, storage } from "../Config/firebase"; // Firebase and storage
import { ref, uploadBytes } from "firebase/storage"; // Firebase storage
import { useNavigate } from "react-router-dom";
import "./Ideas.css";
import jsPDF from 'jspdf'; // Adobe js for PDF generation

const Ideas = () => {
  const [role, setRole] = useState(""); 
  const [teamSize, setTeamSize] = useState(0); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [selectedProject, setSelectedProject] = useState(null); 
  const [projectDetails, setProjectDetails] = useState({}); 
  const [userName, setUserName] = useState(""); // Add user name
  const navigate = useNavigate();

  const fetchUserDetails = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        setError("User not logged in");
        setLoading(false);
        return;
      }

      const userDoc = await getDoc(doc(db, "Users", userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setRole(userData.role); 
        setTeamSize(Number(userData.team_query) || 0);
        setUserName(userData.name); // Set user name from Firestore
      } else {
        setError("No user data found");
      }
    } catch (err) {
      setError("Error fetching user details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const goToProject = async (projectName) => {
    setSelectedProject(projectName);
    const teammates = getTeammatesForProject(projectName);
    const stories = getUserStories(projectName);

    setProjectDetails({
      projectName,
      teammates,
      stories,
    });

    // Save project details in Firestore, including the user's name
    const userId = auth.currentUser?.uid;
    await setDoc(doc(db, "Projects", projectName), {
      userName, // Save user name
      projectName,
      teammates,
      stories,
    });

    // Automatically generate a PDF of project details and store it in Firebase
    generateAndSavePDF(projectName, teammates, stories);
  };

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
      default:
        teammates.push("General Developer", "QA Engineer", "Business Analyst");
    }

    return teammates.slice(0, teamSize).join(", ") || "No teammates needed";
  };

  const getUserStories = (project) => {
    switch (project) {
      case "Blockchain Payment Gateway":
        return [
          "As a Blockchain Developer, I want to build a secure payment infrastructure using Ethereum.",
          "As a Security Analyst, I want to implement SSL for secure transactions.",
          "As a Payment Systems Architect, I want to ensure scalability for high transaction volumes.",
        ];
      case "AI-driven Risk Analysis":
        return [
          "As a Data Scientist, I want to build predictive models using historical financial data.",
          "As a Quantitative Analyst, I want to ensure accurate risk predictions using statistical models.",
          "As a Risk Manager, I want to integrate the AI system into current risk management tools.",
        ];
      case "Personal Finance Tracker":
        return [
          "As a UI/UX Developer, I want to create an intuitive dashboard for tracking expenses.",
          "As a Full Stack Developer, I want to integrate APIs to fetch real-time financial data.",
          "As a Data Analyst, I want to analyze users' financial behavior to provide recommendations.",
        ];
      default:
        return [];
    }
  };

  const generateAndSavePDF = async (projectName, teammates, stories) => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text(`${projectName}`, 10, 10);
    doc.setFontSize(12);
    doc.text(`User: ${userName}`, 10, 30); // Add user name in PDF
    doc.text(`Teammates: ${teammates}`, 10, 40);
    doc.text("User Stories:", 10, 50);
    stories.forEach((story, index) => {
      doc.text(`${index + 1}. ${story}`, 10, 60 + index * 10);
    });

    const pdfBlob = doc.output('blob');
    const userId = auth.currentUser?.uid;
    const pdfRef = ref(storage, `projects/${userId}/${projectName}.pdf`);
    await uploadBytes(pdfRef, pdfBlob);
  };

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

  const handleGeneratePDFClick = () => {
    if (projectDetails) {
      generateAndSavePDF(
        projectDetails.projectName,
        projectDetails.teammates,
        projectDetails.stories
      );
    }
  };

  return (
    <div className="ideas-page">
      <h1 className="ideas-title">Recommended Fintech Project Ideas</h1>
      <p className="ideas-subtitle">Hover over a project to see potential teammates:</p>

      {renderProjectsForRole()}

      {selectedProject && (
        <div className="project-details fade-in">
          <h2>{projectDetails.projectName}</h2>
          <p>User: {userName}</p>
          <p>Potential Teammates: {projectDetails.teammates}</p>
          <h3>Sample User Stories</h3>
          <ul>
            {projectDetails.stories.map((story, index) => (
              <li key={index}>{story}</li>
            ))}
          </ul>
          <button onClick={handleGeneratePDFClick} className="generate-pdf-btn">
            Generate Project as PDF
          </button>
        </div>
      )}

      <footer className="footer">
        <p>Explore your potential with these tailored projects. Click on any to get started!</p>
      </footer>
    </div>
  );
};

export default Ideas;
