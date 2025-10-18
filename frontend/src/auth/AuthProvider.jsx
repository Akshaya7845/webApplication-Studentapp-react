import React, { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const payload = jwtDecode(token);
      return {
        email: payload.sub || payload.email,
        role:
          payload.role ||
          payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
      };
    } catch {
      return null;
    }
  });

  const login = async ({ email, password }) => {
    const res = await axios.post("/api/Auth/login", { email, password });
    const token = res.data.token;
    localStorage.setItem("token", token);
    const payload = jwtDecode(token);
    setUser({
      email: payload.sub || payload.email,
      role:
        payload.role ||
        payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
    });
  };

  const register = async (userData) => {
    await axios.post("/api/Auth/register", userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
