import { Link } from "react-router-dom";
import logoWhite from "../../assets/images/logo-white.png";

export default function Header({ user, onLogout }) {
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
        {user ? (
          <>
            <button
              onClick={onLogout}
              className="hover:text-natours-green transition-colors cursor-pointer"
            >
              Log out
            </button>
            <Link to="/me" className="flex items-center space-x-3 normal-case">
              <img
                src={`/img/users/${user.photo}`}
                alt={`Photo of ${user.name}`}
                className="h-9 w-9 rounded-full object-cover"
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
