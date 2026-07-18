import { BrowserRouter, Routes, Route } from "react-router-dom";
// import {  useState } from "react";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ToursOverview from "./pages/ToursOverview";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  // const [message, setMessage] = useState("Loading...");
  // const [error, setError] = useState(null);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#f7f7f7] flex flex-col font-sans antialiased text-[#777]">
        {/* The Header and Footer stay visible across all pages */}
        <Header />

        <main className="flex-1 py-16 px-8 max-w-7xl mx-auto w-full">
          <Routes>
            {/* Base Route: Lists all tours */}
            <Route path="/" element={<ToursOverview />} />

            {/* Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
