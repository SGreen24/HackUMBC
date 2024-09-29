import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { auth } from "../Config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

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
    <div className="auth-container">
      <h1>Register New Account</h1>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="error">{error}</p>} {/* Display error message */}
      <button onClick={registerNewAccount}>Register</button> {/* Register button */}
      <button onClick={backToLogin}>Back to Login</button>
    </div>
  );
};

export default Register;
