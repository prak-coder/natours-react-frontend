import { Link } from "react-router-dom";

const TourCta = ({ tour, user, onBookTour, isBooking = false }) => {
  // Guard against missing tour prop so tour.name never throws TypeError
  if (!tour) return null;

  const img1 = tour.images?.[1] || tour.imageCover || "default.jpg";
  const img2 = tour.images?.[2] || tour.imageCover || "default.jpg";

  return (
    <section className="max-w-5xl mx-auto px-6 mt-20">
      <div className="relative overflow-hidden bg-white rounded-2xl shadow-xl py-14 px-8 md:pl-52 md:pr-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-gray-100">
        {/* Overlapping Circular Images (Desktop) */}
        <div className="hidden md:flex items-center justify-center h-36 w-36 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 shadow-lg p-5 absolute -left-10 top-1/2 -translate-y-1/2 z-30">
          <img
            src="/images/logo-white.png"
            alt="Natours logo"
            className="w-full object-contain"
          />
        </div>

        <img
          src={`/images/tours/${img1}`}
          alt={`${tour.name} preview 1`}
          className="hidden md:block h-36 w-36 rounded-full object-cover shadow-md absolute -left-2 top-1/2 -translate-y-1/2 scale-95 z-20"
        />

        <img
          src={`/images/tours/${img2}`}
          alt={`${tour.name} preview 2`}
          className="hidden md:block h-36 w-36 rounded-full object-cover shadow-md absolute left-6 top-1/2 -translate-y-1/2 scale-90 z-10"
        />

        {/* Text Content */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-light uppercase tracking-wide text-emerald-600">
            What are you waiting for?
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            {tour.duration} days. 1 adventure. Infinite memories. Make it yours
            today!
          </p>
        </div>

        {/* Action Button */}
        <div className="shrink-0">
          {user ? (
            <button
              type="button"
              id="book-tour"
              onClick={() => onBookTour?.(tour._id || tour.id)}
              disabled={isBooking}
              className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white uppercase text-xs font-semibold tracking-wider px-8 py-4 rounded-full shadow-md transition cursor-pointer"
            >
              {isBooking ? "Processing..." : "Book tour now!"}
            </button>
          ) : (
            <Link
              to="/login"
              className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white uppercase text-xs font-semibold tracking-wider px-8 py-4 rounded-full shadow-md transition"
            >
              Log in to book tour
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default TourCta;
