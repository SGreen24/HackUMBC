import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { auth } from "../Config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./Register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to hold error messages
  const navigate = useNavigate(); // Hook to programmatically navigate to a different route

  // Register New Account function
  const registerNewAccount = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/home"); // Redirect to the Home page after successful registration
    } catch (err) {
      console.error(err);
      setError(err.message); // Set error message if registration fails
    }
  };

  const backToLogin = async () => {
    try {
      navigate("/"); // Redirect to the Home page after successful registration
    } catch (err) {
      console.error(err);
      setError(err.message); // Set error message if registration fails
    }
  };

  return (
    <div className="reg"> {/* Apply the login class for styling */}
      <h4>Register</h4> {/* Styled to match the template */}
      <form>
        <div className="text_area">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="text_input"
          />
        </div>
        <div className="text_area">
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="text_input"
          />
        </div>
        {error && <p className="error">{error}</p>} {/* Display error message */}
        <div className="register-container">
          <input
            type="button"
            value="Register"
            onClick={registerNewAccount}
            className="register-btn"
          />
          <input 
            type="button"
            value="Back To Login"
            className="register-btn" 
            onClick={backToLogin}>
            </input> {/* Redirect to Login */}
        </div>
      </form>
    </div>
  );
};

export default Register;
