import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTour } from "../services/apiTours"; // Ensure this matches your API file location
import ReviewCard from "../features/reviews/components/ReviewCard";

export default function TourDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 1. Fetch tour details with TanStack Query using the URL id
  const {
    data: tour,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tour", id],
    queryFn: () => getTour(id),
    enabled: !!id,
  });

  // 2. Handle API States
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen py-20">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600"></div>
      </div>
    );
  }

  if (error || !tour) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-red-600 font-medium">Error loading tour details!</p>
        <button
          onClick={() => navigate("/tours")}
          className="bg-emerald-500 text-white text-xs uppercase px-4 py-2 rounded"
        >
          Back to Overview
        </button>
      </div>
    );
  }

  // 3. Format dynamic dates
  const nextDate = tour.startDates?.length
    ? new Date(tour.startDates[0]).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Coming Soon";

  return (
    <div className="flex flex-col -mx-8 -mt-16 text-gray-600 font-sans">
      {/* Hero Header Section */}
      <section className="relative h-[38vw] [clip-path:polygon(0_0,100%_0,100%_85%,0_100%)]">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-green-600 opacity-70 z-10 mix-blend-color" />
        <img
          src={`/images/tours/${tour.imageCover || "default.jpg"}`}
          className="w-full h-full object-cover"
          alt={tour.name}
        />
        <div className="absolute bottom-[25%] left-1/2 -translate-x-1/2 z-20 text-center w-full max-w-4xl px-4">
          <h1 className="text-white font-light text-4xl md:text-5xl uppercase tracking-wider bg-gradient-to-br from-emerald-500/85 to-green-600/85 px-8 py-4 inline-block [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
            {tour.name}
          </h1>
        </div>
      </section>

      {/* Description and Quick Facts Container Block */}
      <section className="bg-[#f7f7f7] py-24 grid grid-cols-1 md:grid-cols-2 gap-16 px-16 -mt-10">
        {/* Left Side: Facts & Guides */}
        <div className="bg-gray-50 border border-gray-200/50 p-12 rounded-xl shadow-sm">
          <div>
            <h2 className="text-xl font-bold uppercase bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent mb-8">
              Quick Facts
            </h2>
            <div className="space-y-4 text-xs font-bold uppercase tracking-wider text-gray-400">
              <div className="flex justify-between border-b pb-3 border-gray-200">
                <span>Next Date</span>
                <span className="text-gray-600">{nextDate}</span>
              </div>
              <div className="flex justify-between border-b pb-3 border-gray-200">
                <span>Difficulty</span>
                <span className="text-gray-600">{tour.difficulty}</span>
              </div>
              <div className="flex justify-between border-b pb-3 border-gray-200">
                <span>Max Group Size</span>
                <span className="text-gray-600">
                  {tour.maxGroupSize} People
                </span>
              </div>
              <div className="flex justify-between pb-3">
                <span>Rating</span>
                <span className="text-gray-600">
                  ⭐ {tour.ratingsAverage || 4.5} / 5
                </span>
              </div>
            </div>
          </div>

          {/* Dynamic Tour Guides Mapping Block */}
          {tour.guides && tour.guides.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold uppercase bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent mb-8">
                Your Tour Guides
              </h2>
              <div className="space-y-4">
                {tour.guides.map((guide) => (
                  <div
                    key={guide._id || guide.id}
                    className="flex items-center gap-4"
                  >
                    <img
                      src={`/images/users/${guide.photo || "default.jpg"}`}
                      alt={guide.name}
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                    <span className="text-2xs font-bold uppercase tracking-wider text-emerald-600 min-w-[100px]">
                      {guide.role === "lead-guide"
                        ? "Lead guide"
                        : "Tour guide"}
                    </span>
                    <span className="text-sm font-semibold text-gray-700">
                      {guide.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Descriptions */}
        <div className="flex flex-col justify-center">
          <h2 className="text-xl font-bold uppercase bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent mb-8">
            About {tour.name}
          </h2>
          <p className="text-sm leading-relaxed whitespace-pre-line text-gray-500 font-light">
            {tour.description || tour.summary}
          </p>
        </div>
      </section>

      {/* Image Gallery Segment */}
      {tour.images && tour.images.length > 0 && (
        <section className="grid grid-cols-1 md:grid-cols-3 -skew-y-3 overflow-hidden py-12 bg-white">
          {tour.images.map((img, i) => (
            <div key={i} className="h-72 overflow-hidden">
              <img
                src={`/images/tours/${img}`}
                alt={`${tour.name} gallery ${i + 1}`}
                className="w-full h-full object-cover transform skew-y-3 scale-115 hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </section>
      )}

      {/* Reviews Slider Section Component */}
      {tour.reviews && tour.reviews.length > 0 && (
        <section className="bg-gradient-to-br from-emerald-400 to-green-600 py-32 overflow-x-auto flex space-x-8 px-12 [clip-path:polygon(0_10%,100%_0,100%_90%,0_100%)] scrollbar-hide">
          {tour.reviews.map((rev) => (
            <ReviewCard key={rev._id || rev.id} review={rev} />
          ))}
        </section>
      )}

      {/* Bottom CTA Booking Segment */}
      <section className="bg-[#f7f7f7] py-16 px-8 flex justify-center">
        <div className="bg-white rounded-xl p-8 max-w-4xl w-full shadow-lg border flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-lg font-bold uppercase bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
              What are you waiting for?
            </h3>
            <p className="text-xs text-gray-400 font-medium uppercase mt-1">
              {tour.duration} days. 1 infinite adventure. Make it yours today!
            </p>
          </div>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium uppercase tracking-wider text-xs px-8 py-4 rounded-full shadow-md transition-transform active:translate-y-0.5">
            Book tour now!
          </button>
        </div>
      </section>
    </div>
  );
}
