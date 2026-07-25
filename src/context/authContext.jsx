import { createContext, useState, useEffect } from "react";
import { loginApi, getMeApi } from "../services/apiauth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if a valid session exists when the app initializes
  useEffect(() => {
    async function checkSession() {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const userData = await getMeApi();
        if (userData) {
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error("Session auto-check failed:", err.message);
        localStorage.removeItem("token"); // Wipe invalid token
      } finally {
        setIsLoading(false);
      }
    }
    checkSession();
  }, []);

  // Handle user authentication login sequence
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const data = await loginApi({ email, password });
      localStorage.setItem("token", data.token);
      setUser(data.data.user);
      setIsAuthenticated(true);
    } catch (err) {
      setIsAuthenticated(false);
      throw new Error(
        err.response?.data?.message || "Invalid email or password",
        { cause: err },
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Close session instantly
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
