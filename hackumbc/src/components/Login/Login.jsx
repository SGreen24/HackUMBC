// components/Login/Login.jsx
import { Auth } from "./Auth"; // Import Auth component
import "./Login.css"; // Import CSS

const Login = () => {

  
  return (
    <div className="login">
      <Auth /> {/* Render the Auth component */}
    </div>
  );
};

export default Login;
