import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * @typedef {Object} AuthContextType
 * @property {Object|null} user
 * @property {boolean} isAuthenticated
 * @property {boolean} isLoading
 * @property {function(string, string): Promise<void>} login
 * @property {function(string, string, string, string): Promise<void>} signup
 * @property {function(): void} logout
 */

/**
 * Custom hook to safely consume the application authentication session.
 * @returns {AuthContextType}
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      "useAuth must be executed within an AuthProvider layout wrapper",
    );
  }

  return context;
};
