import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import logoWhite from "../../assets/images/logo-white.png";

export default function Header() {
  // ⚡ Destructured 'logout' safely here
  const { user, isAuthenticated, logout } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:3000";

  return (
    <header className="flex items-center justify-between bg-[#333] px-8 py-5 text-white uppercase tracking-wider text-sm font-light">
      <nav className="flex items-center space-x-6">
        <Link to="/" className="hover:text-natours-green transition-colors">
          All tours
        </Link>
      </nav>

      <div className="h-9 w-auto">
        <img src={logoWhite} alt="Natours logo" className="h-full" />
      </div>

      <nav className="flex items-center space-x-6">
        {/* 🧠 Tip: Using 'isAuthenticated' matches your Context structure seamlessly */}
        {isAuthenticated && user ? (
          <>
            <button
              onClick={logout} // ⚡ FIX 1: Pointing to the correct function name
              className="hover:text-natours-green transition-colors cursor-pointer uppercase tracking-wider"
            >
              Log out
            </button>
            <Link to="/me" className="flex items-center space-x-3 normal-case">
              <img
                /* ⚡ FIX 2: Added API_URL prefix to pull image assets directly from your Node server */
                src={`${API_URL}/img/users/${user.photo || "default.jpg"}`}
                alt={`Photo of ${user.name}`}
                className="h-9 w-9 aspect-square shrink-0 rounded-full object-cover border border-gray-600 overflow-hidden"
                crossOrigin="use-credentials"
              />
              <span>{user.name.split(" ")[0]}</span>
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="hover:text-natours-green transition-colors"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="rounded-full border border-white px-6 py-2 transition-all hover:bg-white hover:text-[#333]"
            >
              Sign up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
