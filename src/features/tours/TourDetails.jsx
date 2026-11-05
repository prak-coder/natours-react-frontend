import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function TourDetails() {
  const { slug } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://onrender.com{slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch tour details");
        return res.json();
      })
      .then((resData) => {
        // Correct parsing: API filters return an array inside data.data
        const tourArray = resData.data?.data || resData.data;
        const foundTour = Array.isArray(tourArray) ? tourArray[0] : tourArray;

        if (!foundTour) {
          throw new Error("Tour profile not found");
        }
        setTour(foundTour);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans bg-[#f7f7f7]">
        <div className="text-emerald-600 text-lg font-medium animate-pulse">
          Loading tour specifications...
        </div>
      </div>
    );
  }

  if (error || !tour) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-sans bg-[#f7f7f7] px-4 text-center">
        <p className="text-red-500 font-medium mb-4">
          ⚠️ {error || "Tour profile could not be loaded."}
        </p>
        <Link to="/" className="text-sm text-emerald-600 hover:underline">
          Back to exploring home
        </Link>
      </div>
    );
  }

  const dateStr = tour.startDates?.length
    ? new Date(tour.startDates[0]).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Upcoming Schedule";

  return (
    <main className="min-h-screen bg-[#f7f7f7] font-sans pb-16 -mt-16 -mx-8">
      {/* Hero Banner Section */}
      <section className="relative h-[65vh] bg-gradient-to-br from-emerald-500 to-green-600 [clip-path:polygon(0_0,100%_0,100%_85%,0_100%)] overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <img
          src={`/images/tours/${tour.imageCover || "default.jpg"}`}
          alt={tour.name}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-20">
          <h1 className="text-3xl md:text-5xl font-light uppercase text-white tracking-widest drop-shadow-md max-w-4xl leading-tight">
            <span className="bg-gradient-to-br from-emerald-400/90 to-green-600/90 px-6 py-3 [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
              {tour.name}
            </span>
          </h1>
          <div className="flex gap-6 mt-8 text-white uppercase text-xs font-semibold tracking-wider drop-shadow">
            <div className="flex items-center gap-1.5">
              ⏱️ {tour.duration} Days
            </div>
            <div className="flex items-center gap-1.5">
              📍 {tour.startLocation?.description || "Miami, USA"}
            </div>
          </div>
        </div>
      </section>

      {/* Overview Block */}
      <section className="max-w-6xl mx-auto px-8 grid md:grid-cols-2 gap-16 mt-12">
        {/* Quick Facts Panel */}
        <div className="bg-white rounded-sm shadow-xl p-10 border border-gray-100">
          <h2 className="text-xl font-light uppercase tracking-wide text-emerald-600 mb-8 border-b border-gray-100 pb-4">
            Quick Facts
          </h2>
          <div className="space-y-5 text-sm text-gray-600">
            <div className="flex justify-between border-b border-gray-50 pb-3">
              <span className="font-medium text-gray-400 uppercase text-xs">
                Next Date
              </span>
              <span className="font-light">{dateStr}</span>
            </div>
            <div className="flex justify-between border-b border-gray-50 pb-3">
              <span className="font-medium text-gray-400 uppercase text-xs">
                Difficulty
              </span>
              <span className="font-light capitalize">{tour.difficulty}</span>
            </div>
            <div className="flex justify-between border-b border-gray-50 pb-3">
              <span className="font-medium text-gray-400 uppercase text-xs">
                Max Group Capacity
              </span>
              <span className="font-light">{tour.maxGroupSize} spots</span>
            </div>
            <div className="flex justify-between pb-3">
              <span className="font-medium text-gray-400 uppercase text-xs">
                Investment
              </span>
              <span className="font-semibold text-emerald-600">
                ${tour.price} USD
              </span>
            </div>
          </div>

          {/* Tour Guides Team */}
          {tour.guides?.length > 0 && (
            <div className="mt-10">
              <h3 className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-6">
                Your Expedition Guides
              </h3>
              <div className="space-y-4">
                {tour.guides.map((guide) => (
                  <div
                    key={guide._id}
                    className="flex items-center gap-4 text-sm"
                  >
                    <div className="w-10 h-10 rounded-full bg-emerald-100 overflow-hidden flex-shrink-0">
                      <img
                        src={`/images/users/${guide.photo}`}
                        alt={guide.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">{guide.name}</p>
                      <p className="text-xs text-gray-400 capitalize">
                        {guide.role === "lead-guide"
                          ? "Lead Guide"
                          : "Tour Guide"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Narrative Description Panel */}
        <div className="flex flex-col justify-center">
          <h2 className="text-xl font-light uppercase tracking-wide text-emerald-600 mb-6">
            About {tour.name}
          </h2>
          <p className="text-[#777] font-light leading-relaxed mb-6 whitespace-pre-line text-sm md:text-base">
            {tour.summary}
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center text-sm font-medium text-emerald-500 hover:text-emerald-600 transition-colors gap-1"
            >
              ← Return to Catalog Overview
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
