import { Link } from "react-router-dom";

export default function TourCard({ tour }) {
  const {
    _id,
    id,
    name,
    duration,
    maxGroupSize,
    difficulty,
    price,
    summary,
    startDates,
    locations,
    startLocation,
    ratingsAverage,
    imageCover,
  } = tour;
  const tourId = _id || id;
  const dateStr = startDates
    ? new Date(startDates[0]).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "June 2021";

  const difficultyColors = {
    easy: "from-emerald-400 to-green-300",
    medium: "from-emerald-400 to-green-600",
    difficult: "from-green-400 to-emerald-800",
  };

  const currentGradient =
    difficultyColors[difficulty?.toLowerCase()] || difficultyColors.medium;

  return (
    <div className="bg-white rounded-sm shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col font-sans border border-gray-100">
      {/* 1. Angled Header Section */}
      <div className="relative">
        <div className="h-52 bg-gradient-to-br from-emerald-400 to-green-500 relative [clip-path:polygon(0_0,100%_0,100%_85%,0_100%)]">
          <img
            src={`/images/tours/${tour.imageCover || "default.jpg"}`}
            alt={name}
            className="w-full h-full object-cover opacity-50 "
            onError={(e) => {
              e.target.style.display = "none";
            }} // Fallback if image path is missing
          />
        </div>

        {/* Floating Heading Code Fix */}
        <h3 className="text-2xl font-light uppercase text-white text-right absolute bottom-4 right-4 z-10 w-[75%] leading-relaxed tracking-wide">
          <span
            className={`bg-gradient-to-br ${currentGradient} px-4 py-2.5 [box-decoration-break:clone] [-webkit-box-decoration-break:clone]`}
          >
            {name}
          </span>
        </h3>
      </div>

      {/* 2. Tour Specifications Profile */}
      <div className="p-6 pt-8 flex-grow">
        <h4 className="text-xs font-bold uppercase text-gray-500 mb-3 tracking-wider">
          {difficulty} {duration}-day tour
        </h4>

        <p className="text-sm italic text-gray-500 font-light leading-relaxed mb-6">
          {summary ||
            "Exploring the jaw-dropping landscapes and natural wonders on foot."}
        </p>

        {/* Info Grid Layout */}
        <div className="grid grid-cols-2 gap-y-4 text-xs text-gray-600 font-light">
          <div className="flex items-center gap-2">
            <span className="text-emerald-500">📍</span>
            <span>
              {" "}
              {startLocation?.description ||
                locations?.[0]?.description ||
                "Miami, USA"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-500">🗓️</span>
            <span>{dateStr}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-500">🏳️</span>
            <span>{tour.stops?.length || 4} stops</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-500">👤</span>
            <span>{maxGroupSize || 15} people</span>
          </div>
        </div>
      </div>

      {/* 3. Splitted Footer Layout */}
      <div className="bg-gray-50 border-t border-gray-100 px-6 py-5 flex items-center justify-between mt-auto">
        <div className="flex flex-col">
          <span className="text-xl font-light text-emerald-600">
            ${price || 497}{" "}
            <span className="text-2xs text-gray-400 uppercase font-normal block sm:inline ml-1">
              per person
            </span>
          </span>
        </div>

        <Link
          to={`tour/${tourId}`}
          className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs uppercase font-medium px-6 py-3 rounded-full transition-all duration-200 shadow-md hover:-translate-y-0.5 active:translate-y-0"
        >
          Details
        </Link>
      </div>
    </div>
  );
}
