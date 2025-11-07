import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "./AuthContext";
import "./Register.css";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onRegister = async (formData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      await register({ email, password, role_id: 4 });
      navigate("/login");
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
            Email
            <input
              type="email"
              name="email"
              required
              placeholder="Enter email"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              required
              placeholder="Enter password"
            />
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
