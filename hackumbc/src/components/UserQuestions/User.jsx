import { useEffect, useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../Config/firebase';
import { generateQuestions, saveAnswers } from '../Config/gemini';
import './User.css';

const User = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [responses, setResponses] = useState({});
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRef = doc(db, 'Users', userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          setUserData(data);
          await fetchAndSetQuestions(data.skills); // Fetch Gemini questions
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  // Fetch questions from the Gemini API based on user's skills
  const fetchAndSetQuestions = async (skills) => {
    try {
      const questions = await generateQuestions(skills);
      setQuestions(questions);
      setLoading(false);
    } catch (error) {
      console.error('Error generating questions:', error);
      setLoading(false);
    }
  };

  // Handle change in user responses
  const handleResponseChange = (index, value) => {
    setResponses((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  // Save responses to Firestore
  const handleSaveAnswers = async () => {
    try {
      await saveAnswers(userId, responses);
      setSubmissionSuccess(true);
      setTimeout(() => setSubmissionSuccess(false), 2000); // Clear success message after 2s
    } catch (error) {
      console.error('Error saving responses:', error);
    }
  };

  return (
    <div className="user-profile-container">
      <h1 className="profile-header">User Profile</h1>

      {loading ? (
        <p>Loading questions...</p>
      ) : (
        <div className="questions-container">
          {questions.length === 0 ? (
            <p>No questions available for this user.</p>
          ) : (
            questions.map((question, index) => (
              <div key={index} className="question-section fade-in">
                <h2>{question.question}</h2>
                <div className="options-container">
                  {question.options.map((option) => (
                    <button
                      key={option}
                      className={`option-button ${
                        responses[index] === option ? 'selected' : ''
                      }`}
                      onClick={() => handleResponseChange(index, option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}

          {submissionSuccess && (
            <p className="success-message">Responses saved successfully!</p>
          )}

          <button className="save-answers-button" onClick={handleSaveAnswers}>
            Save Answers
          </button>
        </div>
      )}
    </div>
  );
};

export default User;
