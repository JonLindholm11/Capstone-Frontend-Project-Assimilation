import { createContext, useContext, useState, useEffect } from "react";

const API = import.meta.env.VITE_API;

const AuthContext = createContext();

// Helper function to decode JWT and extract role
function decodeToken(token) {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role_id;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [role, setRole] = useState(
    decodeToken(sessionStorage.getItem("token"))
  );

  // Sync role whenever token changes
  useEffect(() => {
    const newRole = decodeToken(token);
    setRole(newRole);
  }, [token]);

  const register = async (credentials) => {
    const response = await fetch(API + "/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const result = await response.json();
    if (!response.ok) throw Error(result);
    sessionStorage.setItem("token", result.token);
    setToken(result.token);
    setRole(decodeToken(result.token));
  };

  const login = async (credentials) => {
    const response = await fetch(API + "/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const result = await response.json();
    sessionStorage.setItem("token", result.token);
    setToken(result.token);
    setRole(decodeToken(result.token));
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    sessionStorage.removeItem("token");
  };

  const value = { token, role, register, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
