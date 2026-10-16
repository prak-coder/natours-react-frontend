import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { useUpdatePassword } from "../hooks/useUpdatePassword";

export default function MeDashboard() {
  const { user } = useAuth();
  const { mutate: updateUser, isPending } = useUpdateUser();
  const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:3000";

  // Local state managers for form inputs
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [photo, setPhoto] = useState(null);

  //  state for password change fields
  const [passwordCurrent, setPasswordCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // Hook for password update mutation (assumed matching your architecture)
  const { mutate: updatePassword, isPending: isPasswordPending } =
    useUpdatePassword();

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // 🛡️ Client-side matching validation
    if (password !== passwordConfirm) {
      alert("Error: New password and confirm password do not match!");
      return;
    }

    // Fire mutation sequence with text payload
    updatePassword({ passwordCurrent, password, passwordConfirm });

    // Clear inputs after triggering action
    setPasswordCurrent("");
    setPassword("");
    setPasswordConfirm("");
  };
  // Sync inputs with currently logged-in user profile context data

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🛡️ Build FormData payload packet
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (photo) formData.append("photo", photo); // Matches Multer field tracker key 'photo'

    // Fire mutation sequence
    updateUser(formData);
  };

  return (
    <div className="max-w-6xl mx-auto my-16 bg-white min-h-[70vh] shadow-xl rounded-xl flex overflow-hidden font-sans">
      {/* 🟢 LEFT SIDEBAR PANEL (Matches your graphic) */}
      {/* 🟢 NAVIGATION SIDEBAR CONTAINER */}
      <nav className="w-80 bg-gradient-to-b from-[#7ed56f] to-[#28b485] py-16 flex flex-col gap-4 font-sans select-none shrink-0">
        {/* ⚙️ ACTIVE ELEMENT LAYOUT TRACK: Settings */}
        <button className="w-full flex items-center gap-5 text-white py-4 px-10 border-l-[4px] border-white cursor-pointer uppercase tracking-[0.15em] text-[13px] font-normal transition-all duration-200">
          <span className="text-[18px] leading-none shrink-0 opacity-100">
            ⚙️
          </span>
          <span className="opacity-100 font-light">Settings</span>
        </button>

        {/* 🧳 INACTIVE ELEMENT LAYOUT TRACK: My Bookings */}
        <button className="w-full flex items-center gap-5 text-white py-4 px-10 border-l-[4px] border-transparent hover:border-white/40 cursor-pointer uppercase tracking-[0.15em] text-[13px] font-normal transition-all duration-200 group">
          <span className="text-[18px] leading-none shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
            💼
          </span>
          <span className="opacity-70 group-hover:opacity-100 font-light transition-opacity">
            My Bookings
          </span>
        </button>

        {/* ⭐ INACTIVE ELEMENT LAYOUT TRACK: My Reviews */}
        <button className="w-full flex items-center gap-5 text-white py-4 px-10 border-l-[4px] border-transparent hover:border-white/40 cursor-pointer uppercase tracking-[0.15em] text-[13px] font-normal transition-all duration-200 group">
          <span className="text-[18px] leading-none shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
            ⭐
          </span>
          <span className="opacity-70 group-hover:opacity-100 font-light transition-opacity">
            My Reviews
          </span>
        </button>

        {/* 💳 INACTIVE ELEMENT LAYOUT TRACK: Billing */}
        <button className="w-full flex items-center gap-5 text-white py-4 px-10 border-l-[4px] border-transparent hover:border-white/40 cursor-pointer uppercase tracking-[0.15em] text-[13px] font-normal transition-all duration-200 group">
          <span className="text-[18px] leading-none shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
            💳
          </span>
          <span className="opacity-70 group-hover:opacity-100 font-light transition-opacity">
            Billing
          </span>
        </button>
      </nav>

      {/* ⚪ RIGHT DATA PANEL VIEW */}
      <main className="flex-1 p-16">
        <h2 className="text-2xl font-bold uppercase text-gradient tracking-wide mb-8">
          Your Account Settings
        </h2>

        {/* <form onSubmit={handleSubmit} className="max-w-2xl flex flex-col gap-6"> */}
        <form
          key={`${user?._id}-${user?.photo || "default"}`}
          onSubmit={handleSubmit}
          className="max-w-2xl flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wide text-gray-500">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded px-4 py-3 text-sm focus:bg-white focus:border-natours-green outline-none transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wide text-gray-500">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded px-4 py-3 text-sm focus:bg-white focus:border-natours-green outline-none transition-all"
            />
          </div>

          {/* 📸 PROFILE PHOTO PREVIEW ROW */}
          <div className="flex items-center gap-6 my-4">
            <img
              src={`${API_URL}/img/users/${user?.photo || "default.jpg"}`}
              alt="Current user avatar"
              className="h-16 w-16 rounded-full object-cover border border-gray-200 aspect-square shrink-0"
            />
            <label className="cursor-pointer text-natours-green border-b border-natours-green pb-0.5 hover:text-natours-green-dark hover:border-natours-green-dark text-sm font-medium transition-colors">
              Choose new photo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setPhoto(e.target.files[0])} // Pull raw file descriptor
              />
            </label>
            {photo && (
              <span className="text-xs text-gray-400 font-mono italic">
                Selected: {photo.name}
              </span>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="bg-natours-green hover:bg-natours-green-dark text-white text-sm font-medium py-3.5 px-8 rounded-full uppercase tracking-wider shadow-md transition-all active:scale-95 disabled:bg-gray-300"
            >
              {isPending ? "Saving changes..." : "Save Settings"}
            </button>
          </div>
        </form>

        {/* 🛠️ SEPARATOR LINE */}
        <hr className="my-12 border-gray-600" />

        {/* 🔐 PASSWORD CHANGE SECTION */}
        <h2 className="text-2xl font-bold uppercase text-gradient tracking-wide mb-8">
          Password Change
        </h2>

        <form
          onSubmit={handlePasswordSubmit}
          className="max-w-2xl flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wide text-gray-500">
              Current password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={passwordCurrent}
              onChange={(e) => setPasswordCurrent(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded px-4 py-3 text-sm focus:bg-white focus:border-natours-green outline-none transition-all"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wide text-gray-500">
              New password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded px-4 py-3 text-sm focus:bg-white focus:border-natours-green outline-none transition-all"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wide text-gray-500">
              Confirm password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded px-4 py-3 text-sm focus:bg-white focus:border-natours-green outline-none transition-all"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isPasswordPending}
              className="bg-natours-green hover:bg-natours-green-dark text-white text-sm font-medium py-3.5 px-8 rounded-full uppercase tracking-wider shadow-md transition-all active:scale-95 disabled:bg-gray-300"
            >
              {isPasswordPending ? "Updating..." : "Save Password"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
