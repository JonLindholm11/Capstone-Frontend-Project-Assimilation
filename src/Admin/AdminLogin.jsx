import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
import "./AdminLogin.css";

// Admin-specific login page
// figured out this was better than sharing login with customers
export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onAdminLogin = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    
    setLoading(true);
    setError(null);

    try {
      await login({ username, password });
      
      // decode token to verify this is a staff member
      const token = sessionStorage.getItem('token');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('admin login attempt - role_id:', payload.role_id);
        
        // role_id: 1=admin, 2=salesman, 3=customer service, 4=customer
        if (payload.role_id === 1 || payload.role_id === 2 || payload.role_id === 3) {
          // valid staff member - go to admin dashboard
          navigate('/admin/dashboard');
        } else {
          // not a staff member
          setError('Access denied. This login is for staff members only.');
          sessionStorage.removeItem('token');
        }
      }
    } catch (e) {
      setError(e.message || 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <h1>Staff Login</h1>
          <p>Admin Dashboard Access</p>
        </div>

        <form action={onAdminLogin}>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="text" 
              name="username" 
              placeholder="Enter your staff email"
              required 
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              name="password" 
              placeholder="Enter your password"
              required 
            />
          </div>

          <button type="submit" disabled={loading} className="admin-login-btn">
            {loading ? 'Logging in...' : 'Login to Dashboard'}
          </button>

          {error && <div className="error-message">{error}</div>}
        </form>

        <div className="admin-login-footer">
          <p>Staff members only. For customer login, <a href="/login">click here</a>.</p>
        </div>

        {/* Test credentials - remove in production */}
        <div className="test-credentials">
          <strong>Test Accounts:</strong><br/>
          Admin: admin@projectname.com / admin123<br/>
          Salesman: salesman@projectname.com / sales123<br/>
          Service: customerservice@projectname.com / service123
        </div>
      </div>
    </div>
  );
}