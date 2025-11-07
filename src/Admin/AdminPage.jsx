import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
import "./Admin.css";
import RoleSelection from "./RoleSelection";
import SpecialPricing from "./SpecialPricing";
import SalesmanSelection from "./SalesmanSelection";

const API = import.meta.env.VITE_API;

function AdminPage() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("register");
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      if (payload.role_id !== 1) {
        alert("Access Denied! Only administrators can access this panel.");
        navigate("/");
        return;
      }

      setCurrentUser(payload);
      setLoading(false);
    } catch (error) {
      console.error("Error decoding token:", error);
      navigate("/login");
    }
  }, [token, navigate]);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const role_id = formData.get("role_id");

    try {
      const response = await fetch(`${API}/users/register/admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: email,
          password: password,
          role_id: parseInt(role_id),
        }),
      });

      const contentType = response.headers.get("content-type");
      let result;

      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        const text = await response.text();
        result = { message: text, error: text };
      }

      if (response.ok) {
        setMessage(result.message || "User registered successfully!");
        e.target.reset();
        setRefreshTrigger((prev) => prev + 1);
      } else {
        setError(result.error || result.message || "Failed to register user");
      }
    } catch (err) {
      setError("Error connecting to server");
      console.error(err);
    }
  };

  const renderSection = () => {
    if (activeSection === "register") {
      return (
        <div className="register-employee-section">
          <h2>Register New Employee</h2>
          <p>Add a new employee to the system</p>

          <form onSubmit={handleRegisterSubmit} className="admin-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="employee@company.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="Enter password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="role_id">Role</label>
              <select id="role_id" name="role_id" required>
                <option value="">Select a role...</option>
                <option value="1">Admin</option>
                <option value="2">Salesman</option>
                <option value="3">Customer Service</option>
              </select>
            </div>

            <button type="submit" className="submit-btn">
              Register Employee
            </button>

            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}
          </form>
        </div>
      );
    } else if (activeSection === "roles") {
      return <RoleSelection token={token} refreshTrigger={refreshTrigger} />;
    } else if (activeSection === "specials") {
      return <SpecialPricing token={token} currentUser={currentUser} />;
    } else if (activeSection === "salesmen") {
      return (
        <SalesmanSelection token={token} refreshTrigger={refreshTrigger} />
      );
    }
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setMessage("");
    setError("");
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <p>Loading admin panel...</p>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage employees, customers, and pricing</p>
        <p className="user-info">
          Logged in as: <strong>Admin</strong>
        </p>
      </div>

      <div className="admin-navigation">
        <button
          className={activeSection === "register" ? "nav-active" : ""}
          onClick={() => handleSectionChange("register")}
        >
          Register Employee
        </button>

        <button
          className={activeSection === "roles" ? "nav-active" : ""}
          onClick={() => handleSectionChange("roles")}
        >
          Role Management
        </button>

        <button
          className={activeSection === "specials" ? "nav-active" : ""}
          onClick={() => handleSectionChange("specials")}
        >
          Special Pricing
        </button>

        <button
          className={activeSection === "salesmen" ? "nav-active" : ""}
          onClick={() => handleSectionChange("salesmen")}
        >
          Salesman Selection
        </button>
      </div>

      <div className="admin-content-area">{renderSection()}</div>
    </div>
  );
}

export default AdminPage;
