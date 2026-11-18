import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"; // 👈 Adjust path to match your folder structure

export default function TourCta({ tour }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (!tour) return null;

  return (
    <section className="max-w-5xl mx-auto px-6 mt-24">
      <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 border border-gray-100">
        {/* Stacked Tour Images */}
        <div className="relative flex items-center justify-center md:justify-start w-48 h-32 flex-shrink-0">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-lg z-30 -ml-2">
            <img
              src="/images/logo-white.png"
              alt="Natours logo"
              className="w-16 object-contain"
            />
          </div>
          {tour.images?.[1] && (
            <img
              src={`/images/tours/${tour.images[1]}`}
              alt="Tour preview 1"
              className="w-28 h-28 rounded-full object-cover shadow-md z-20 -ml-14"
            />
          )}
          {tour.images?.[2] && (
            <img
              src={`/images/tours/${tour.images[2]}`}
              alt="Tour preview 2"
              className="w-28 h-28 rounded-full object-cover shadow-md z-10 -ml-14"
            />
          )}
        </div>

        {/* Text Content */}
        <div className="text-center md:text-left flex-1">
          <h2 className="text-2xl font-bold uppercase tracking-wide bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
            What are you waiting for?
          </h2>
          <p className="text-gray-500 mt-2 text-sm md:text-base font-light">
            {tour.duration} days. 1 adventure. Infinite memories. Make it yours
            today!
          </p>
        </div>

        {/* Dynamic Auth Button */}
        <div className="flex-shrink-0">
          {isLoading ? (
            <span className="text-sm text-gray-400">Checking session...</span>
          ) : isAuthenticated ? (
            <button
              onClick={() => console.log("Proceed to booking:", tour._id)}
              className="bg-emerald-500 hover:bg-emerald-600 text-white uppercase text-xs md:text-sm font-semibold tracking-wider px-8 py-4 rounded-full shadow-lg transition-all cursor-pointer"
            >
              Book tour now!
            </button>
          ) : (
            <Link
              to="/login"
              className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white uppercase text-xs md:text-sm font-semibold tracking-wider px-8 py-4 rounded-full shadow-lg transition-all"
            >
              Log in to book tour
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
