import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../Config/firebase';
import run from '../Config/gemini'; // Import the Gemini run function
import './Project.css';

const Project = () => {
  // const [userData, setUserData] = useState(null); 
  const [geminiOptions, setGeminiOptions] = useState([]); // State to store Gemini's 3 options
  const [loading, setLoading] = useState(true); // Loading state for fetching Gemini data
  const [error, setError] = useState(null); // Error handling state

  // Fetch user data from Firebase Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = auth.currentUser?.uid;
        if (!userId) return;

        const userRef = doc(db, 'Users', userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          // setUserData(data); // Store user data in state

          // Generate prompt and get response from Gemini
          const geminiResponseOptions = await run(data);
          setGeminiOptions(geminiResponseOptions); // Store the array of 3 options
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data or communicate with Gemini.");
      } finally {
        setLoading(false); // Once request completes, set loading to false
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="project-container">
      <h1>Project Ideas from Gemini</h1>

      {loading && <h2>Loading your project ideas...</h2>}
      {error && <h2>{error}</h2>}

      {!loading && geminiOptions.length > 0 && (
        <div className="gemini-result">
          <h2>Gemini&apos;s Recommendations:</h2>
          <div className="gemini-projects">
            {geminiOptions.map((option, index) => (
              <button key={index} className="project-idea-btn">
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {!loading && geminiOptions.length === 0 && (
        <p>No project ideas found. Try again later!</p>
      )}
    </div>
  );
};

export default Project;
