import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Connect your login API call logic here
    console.log("Logging in with:", { email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-140px)] bg-[#f7f7f7] px-4 py-12">
      {/* Form Container Wrapper */}
      <div className="w-full max-w-[34rem] bg-white p-10 md:p-14 rounded-md shadow-[0_2.5rem_8rem_rgba(0,0,0,0.06)]">
        {/* <div className="w-full max-w-[55rem] bg-white p-14 rounded-lg shadow-[0_2.5rem_8rem_rgba(0,0,0,0.06)]"> */}
        <h2 className="text-2xl font-bold uppercase tracking-wider text-gradient mb-9">
          Log into your account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-7">
          {/* Email Form Group */}
          <div className="flex flex-col space-y-2">
            <label
              className="text-sm font-bold text-[#333] tracking-wide"
              htmlFor="email"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#f2f2f2] border-3 border-transparent rounded px-5 py-4 text-base font-sans text-inherit focus:outline-none focus:bg-white focus:border-natours-green transition-all duration-300 placeholder:text-[#bbb]"
            />
          </div>

          {/* Password Form Group */}
          <div className="flex flex-col space-y-2">
            <label
              className="text-sm font-bold text-[#333] tracking-wide"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength="8"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#f2f2f2] border-3 border-transparent rounded px-5 py-4 text-base font-sans text-inherit focus:outline-none focus:bg-white focus:border-natours-green transition-all duration-300 placeholder:text-[#bbb]"
            />
          </div>

          {/* Form Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="bg-natours-green text-white font-normal uppercase text-sm tracking-wider rounded-full px-12 py-4 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 transition-all duration-200 cursor-pointer"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
