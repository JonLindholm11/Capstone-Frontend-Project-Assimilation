import { NavLink } from "react-router";

import { useAuth } from "../auth/AuthContext";
import "./Navbar.css"

export default function Navbar() {
  const { token, logout } = useAuth();
  return (
    <header className="sticky-header">
      <NavLink to="/">
        <p>Frontend Template</p>
      </NavLink>
      <nav>
        {token ? (
          <button onClick={logout}>Log out</button>
        ) : (
          <>
            <NavLink to="/login">Log in</NavLink>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/products"> Products </NavLink>
            <NavLink to="/admin"> Admin Page </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
