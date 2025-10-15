import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "./AuthContext";
import "./Login.css"; 

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onLogin = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      await login({ username, password });
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Log in to your account</h1>
        <form action={onLogin}>
          <label>
            Username
            <input type="text" name="username" required />
          </label>
          <label>
            Password
            <input type="password" name="password" required />
          </label>

          {/* <label>
            Role
            <select name="role" required>
              <option value="">Select role...</option>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </label> */}

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

