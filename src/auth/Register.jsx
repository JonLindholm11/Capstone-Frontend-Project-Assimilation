import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "./AuthContext";
import "./Register.css"; 

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onRegister = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      await register({ username, password });
      navigate("/login"); // redirect to login after successful registration
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h1>Create your account</h1>
        <form action={onRegister}>
          <label>
            Username
            <input type="text" name="username" required placeholder="Enter username" />
          </label>
          <label>
            Password
            <input type="password" name="password" required placeholder="Enter password" />
          </label>
          <button type="submit">Register</button>
          {error && <output>{error}</output>}
        </form>
        <Link to="/login" className="register-link">
          Already have an account? Log in here.
        </Link>
      </div>
    </div>
  );
}
