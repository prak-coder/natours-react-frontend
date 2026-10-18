import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Helmet } from "react-helmet-async";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const { login, isLoading } = useAuth();
  const navigate = useNavigate(); // 2. INITIALIZE THE NAVIGATOR

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(""); // Reset any prior error banners

    try {
      // ⚡ Invokes your centralized Context login flow
      await login(email, password);
      // Optional: Add routing redirect here (e.g., navigate('/'))
      navigate("/");
    } catch (err) {
      // 🔍 Safely reads your chained error cause messages
      setFormError(err.message);
    }
  };

  return (
    <main className="min-h-[80vh] bg-natours-grey-light-1 flex items-center justify-center px-4 font-sans">
      <Helmet>
        <title>Natours | Login into your account</title>
      </Helmet>
      <div className="bg-white max-w-md w-full py-12 px-10 rounded-lg shadow-xl border border-gray-100">
        <h2 className="text-2xl font-bold uppercase text-gradient tracking-wider text-center mb-8">
          Log into your account
        </h2>

        {formError && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md text-center font-medium">
            ❌ {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wide text-natours-grey-dark-1">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-natours-grey-light-1 border border-transparent rounded px-4 py-3 text-sm focus:bg-white focus:border-natours-green outline-none transition-all duration-200"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wide text-natours-grey-dark-1">
              Password
            </label>
            <input
              type="password"
              required
              minLength={8}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-natours-grey-light-1 border border-transparent rounded px-4 py-3 text-sm focus:bg-white focus:border-natours-green outline-none transition-all duration-200"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 uppercase bg-natours-green hover:bg-natours-green-dark text-white font-medium py-3 rounded-full text-sm tracking-widest shadow-md transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}
