import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [formError, setFormError] = useState("");

  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    // 🛡️ Client-side password validation check
    if (password !== passwordConfirm) {
      return setFormError("Passwords do not match!");
    }

    try {
      // Execute the registration context flow
      await signup(name, email, password, passwordConfirm);

      // Redirect to the home tours grid page upon success
      navigate("/");
    } catch (err) {
      setFormError(err.message);
    }
  };

  return (
    <main className="min-h-[85vh] bg-natours-grey-light-1 flex items-center justify-center p-8 font-sans">
      <div className="bg-white max-w-xl w-full py-12 px-10 rounded-lg shadow-xl border border-gray-100">
        <h2 className="text-2xl font-bold uppercase text-gradient tracking-wider text-center mb-8">
          Create your account!
        </h2>

        {formError && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md text-center font-medium">
            ❌ {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wide text-natours-grey-dark-1">
              Your name
            </label>
            <input
              type="text"
              required
              placeholder="Your Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-natours-grey-light-1 border border-transparent rounded px-4 py-3 text-sm focus:bg-white focus:border-natours-green outline-none transition-all duration-200"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wide text-natours-grey-dark-1">
              Email address
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

          <div className="flex flex-col gap-1.5">
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

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wide text-natours-grey-dark-1">
              Confirm password
            </label>
            <input
              type="password"
              required
              minLength={8}
              placeholder="••••••••"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="w-full bg-natours-grey-light-1 border border-transparent rounded px-4 py-3 text-sm focus:bg-white focus:border-natours-green outline-none transition-all duration-200"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 uppercase bg-natours-green hover:bg-natours-green-dark text-white font-medium py-3 rounded-full text-sm tracking-widest shadow-md transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing up..." : "Sign up"}
          </button>
        </form>
      </div>
    </main>
  );
}
