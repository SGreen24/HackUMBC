import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../Config/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import './Login.css';

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (err) {
      alert(err.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/home");
    } catch (err) {
      alert(err.message);
    }
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login">
      <div className="login-box">
        <h4>Login</h4>
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
        <button onClick={signIn} className="login-btn">Sign In</button>
        <button onClick={signInWithGoogle} className="google-btn">Sign In With Google</button>
        <button onClick={goToRegister} className="register-btn">Register New Account</button>
      </div>
    </div>
  );
};

export default Auth;
