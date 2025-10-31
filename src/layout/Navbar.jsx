import { NavLink } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { GoPersonFill } from "react-icons/go";
import { FaHome } from "react-icons/fa";
import "./Navbar.css";
import Brand from "./Brand";
// import { FaHome, FaUser, FaChartBar, FaCog } from "react-icons/fa";

export default function Navbar() {
  const { token, role, logout } = useAuth();

  return (
    <header className="sticky-header">
      <Brand />
      <nav>
        {token ? (
          <>
            <button onClick={logout}>Log out</button>
            <NavLink to="/products">Products</NavLink>
            {role === 1 && <NavLink to="/sales">Sales</NavLink>}
          </>
        ) : (
          <>
            <NavLink to="/">
              <FaHome />
            </NavLink>
            <div className="dropdown">
              <button className="dropbtn">
                <GoPersonFill />
              </button>
              <div className="dropdown-content">
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
                <NavLink to="/admin"> Admin Login </NavLink>
              </div>
            </div>

            <NavLink to="/products"> Products </NavLink>

            <NavLink to="/sales"> Sales Page </NavLink>
            <NavLink to="/ServicePage"> Customer Service </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
