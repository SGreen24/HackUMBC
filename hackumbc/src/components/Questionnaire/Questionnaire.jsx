import './Questionnaire.css'; // Import styles for Questionnaire
import HomeButton from "../HomeButton";

const Questionnaire = () => {
  const handleSubmit = () => {
    // Logic for handling questionnaire form submission goes here
    console.log("Questionnaire Submitted");
  };

  return (
    <div className="questionnaire-container">
      <h1>Questionnaire Page</h1>
      <p>Fill out this questionnaire.</p>

      <form>
        <label htmlFor="question1">Question 1:</label>
        <input type="text" id="question1" name="question1" placeholder="Answer question 1..." />

        <label htmlFor="question2">Question 2:</label>
        <input type="text" id="question2" name="question2" placeholder="Answer question 2..." />

        <button className="submit-btn" type="button" onClick={handleSubmit}>
          Submit Questionnaire
        </button>
      </form>
    </div>
  );
};

export default Questionnaire;
