import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "./AuthContext";
import "./Login.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      await login({ email, password });
      // Jodson - Login and Redirect based on role_id and working
      // Waiting a moment for state to update
      setTimeout(() => {
        const token = sessionStorage.getItem("token");

        if (!token) {
          setError("Login failed - no token received");
          return;
        }

        // This decodes the token to get role_id
        const payload = JSON.parse(atob(token.split(".")[1]));

        // The Routes are based on role_id
        if (payload.role_id === 1) {
          navigate("/admin");
        } else if (payload.role_id === 2) {
          navigate("/sales");
        } else if (payload.role_id === 3) {
          navigate("/ServicePage");
        } else if (payload.role_id === 4) {
          navigate("/products"); // Customers go to products page
        } else {
          navigate("/"); // Default fallback for any other roles
        }
      }, 100); // 100ms delay to let state update
    } catch (err) {
      setError(err.message);
    }
  };
  // JSX for the login form
  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Log in to your account</h1>
        <form onSubmit={onLogin}>
          <label>
            Username
            <input type="email" name="email" required />
          </label>
          <label>
            Password
            <input type="password" name="password" required />
          </label>

          <button type="submit">Login</button>
          {error && <output>{error}</output>}
        </form>

        <Link to="/register" className="register-link">
          Need an account? Register here.
        </Link>
      </div>
    </div>
  );
}
