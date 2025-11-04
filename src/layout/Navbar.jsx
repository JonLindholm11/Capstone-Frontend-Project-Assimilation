import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { GoPersonFill } from "react-icons/go";
import { FaHome } from "react-icons/fa";
import "./Navbar.css";
import Brand from "./Brand";
// import { FaHome, FaUser, FaChartBar, FaCog } from "react-icons/fa";

export default function Navbar() {
  const { token, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky-header">
      <Brand />
      <nav>
        {token ? (
          <>
            <NavLink to="/">
              <FaHome />
            </NavLink>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/sales">Sales Page</NavLink>
            <NavLink to="/ServicePage">Customer Service</NavLink>
            {role === 1 && <NavLink to="/sales">Sales</NavLink>}
            <div className="dropdown">
              <button className="dropbtn">
                <GoPersonFill />
              </button>
              <div className="dropdown-content">
                <NavLink to="/profile">Profile</NavLink>
                <button className="logoutBtn" onClick={handleLogout}>
                  Log out
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <NavLink to="/">
              <FaHome />
            </NavLink>

            <NavLink to="/products"> Products </NavLink>

            <NavLink to="/sales"> Sales Page </NavLink>
            <NavLink to="/ServicePage"> Customer Service </NavLink>
            <div className="dropdown">
              <button className="dropbtn">
                <GoPersonFill />
              </button>
              <div className="dropdown-content">
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
                {/* <NavLink to="/admin"> Admin Login </NavLink> */}
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
