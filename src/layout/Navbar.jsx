import { NavLink } from "react-router";
import { useAuth } from "../auth/AuthContext";
import "./Navbar.css";
// import { FaHome, FaUser, FaChartBar, FaCog } from "react-icons/fa";


export default function Navbar() {
  const { token, role, logout } = useAuth();

  return (
    <header className="sticky-header">
      <NavLink to="/">Frontend Template</NavLink>
      <nav>
        {token ? (
          <>
            <button onClick={logout}>Log out</button>
            <NavLink to="/products">Products</NavLink>
            {role === 1 && <NavLink to="/sales">Sales</NavLink>}
          </>
        ) : (
          <>
            <NavLink to="/login">Log in</NavLink>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/products"> Products </NavLink>
            <NavLink to="/admin"> Admin Page </NavLink>
            <NavLink to="/sales"> Sales Page </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
