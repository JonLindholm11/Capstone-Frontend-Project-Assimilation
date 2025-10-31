import { createContext, useContext, useEffect, useState } from "react";

const API = import.meta.env.VITE_API;

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  // useEffect(() => {
  //   const temp = JSON.parse(token);
  //   console.log(temp?.token);
  //   if (token) sessionStorage.setItem("token", temp?.token);
  // }, [token]);

  const register = async (credentials) => {
    const response = await fetch(API + "/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const result = await response.json(); //  Jodson CHANGED from .json() to .text() to match backend
    if (!response.ok) throw Error(result);
    sessionStorage.setItem("token", result.token);
    setToken(result.token); //  CHANGED from result.token to result to match backend
  };

  const login = async (credentials) => {
    const response = await fetch(API + "/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const result = await response.json(); //  CHANGED from .json() to .text() to match backend
    sessionStorage.setItem("token", result.token);
    setToken(result.token); //  CHANGED from result.token to result to match backend
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
