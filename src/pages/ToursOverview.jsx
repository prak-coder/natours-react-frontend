import { useTours } from "../hooks/useTours";
import TourCard from "../features/tours/TourCard";

export default function ToursOverview() {
  const { tours, isLoading, error } = useTours();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20 col-span-full">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 text-center col-span-full font-medium">
        Error loading tours: {error}
      </div>
    );
  }

  if (tours.length === 0) {
    return (
      <p className="text-gray-500 text-center col-span-full py-20 font-medium">
        No tours found. Check your database connections!
      </p>
    );
  }

  return (
    <section className="bg-gray-50 py-24 px-4 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        {/* <div className="text-center mb-20">
          <h2 className="inline-block text-3xl font-bold tracking-[0.2rem] uppercase bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent hover:skew-y-2 hover:skew-x-12 hover:scale-110 transition-all duration-200 cursor-pointer">
            Exciting tours for adventurous people
          </h2>
        </div> */}

        {/* Cards Layout Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-5xl mx-auto mb-16">
          {tours.map((tour) => (
            <TourCard key={tour._id || tour.id} tour={tour} />
          ))}
        </div>

        {/* Bottom CTA Button Container */}
        <div className="text-center">
          <button className="uppercase bg-emerald-500 text-white font-medium px-10 py-4 rounded-full text-base tracking-wider inline-block hover:-translate-y-1 hover:shadow-[0_1rem_2rem_rgba(0,0,0,0.15)] active:-translate-y-0.5 active:shadow-[0_0.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-200">
            Discover all tours
          </button>
        </div>
      </div>
    </section>
  );
}
