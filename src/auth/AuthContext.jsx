import { createContext, useContext, useEffect, useState } from "react";

const API = import.meta.env.VITE_API;

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  useEffect(() => {
    if (token) sessionStorage.setItem("token", token);
  }, [token]);

  const register = async (credentials) => {
    const response = await fetch(API + "/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    // JODSON - CHANGED: .json() - Backend returns JSON: res.status(201).json({ token })
    const result = await response.json();
    if (!response.ok) throw Error(result.message || "Registration failed");
    // JODSON - CHANGED: result.token - Extract token from JSON object { token: "..." }
    setToken(result.token);
  };

  const login = async (credentials) => {
    const response = await fetch(API + "/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    // I CHANGED: .json() - Backend returns JSON: res.json({ token })
    const result = await response.json();
    if (!response.ok) throw Error(result.message || "Login failed");
    if (!result.token) throw Error("No token received from server");
    // I CHANGED: result.token - Extract token from JSON object { token}
    setToken(result.token);
  };

  const logout = () => {
    setToken(null);
    sessionStorage.removeItem("token");
  };

  const value = { token, register, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}