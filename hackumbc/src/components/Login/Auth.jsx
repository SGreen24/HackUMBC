import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { auth, googleProvider } from "../Config/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  getAuth
} from "firebase/auth";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook to programmatically navigate to a different route

  // Sign In function
  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home"); // Redirect to the Home page after login
    } catch (err) {
      console.error("Sign In Error:", err.message);
      alert(err.message + email); // Display error message to user
    }
  };
  
  // Sign In with Google function
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/home"); // Redirect to the Home page after Google login
    } catch (err) {
      console.error(err);
    }
  };

  // Redirect to Register New Account
  const goToRegister = () => {
    navigate("/register"); // Redirect to the Register page
  };

  return (
    <div className="auth-container">
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
      <button onClick={signIn}>Sign In</button>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
      <button onClick={goToRegister}>Register New Account</button> {/* Redirects to Register */}
    </div>
  );
};

export default Auth;
