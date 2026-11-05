import { BrowserRouter, Routes, Route } from "react-router-dom";
// import {  useState } from "react";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ToursOverview from "./pages/ToursOverview";
// 1. Corrected import path according to your folder structure
import TourDetails from "./features/tours/TourDetails";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MeDashboard from "./pages/MeDashboard";
import ProtectedRoute from "./features/authentication/ProtectedRoute";

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

            {/* 2. Added dynamic slug route parameter */}
            <Route path="/tour/:slug" element={<TourDetails />} />

            {/* Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/me"
              element={
                <ProtectedRoute>
                  <MeDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
