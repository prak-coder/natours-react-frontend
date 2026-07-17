import { useTours } from "../hooks/useTours";
import TourCard from "../features/tours/TourCard";

// Ensure "default" is included here
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto px-4 py-8">
      {tours.map((tour) => (
        <TourCard key={tour._id || tour.id} tour={tour} />
      ))}
    </div>
  );
}
