import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  // ⏱️ Show a loading layout spinner while verifying token states
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600"></div>
      </div>
    );
  }

  // 🔒 If not logged in, bounce the visitor to the login form page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 🔓 If logged in, allow them to view the page screen
  return children;
}
