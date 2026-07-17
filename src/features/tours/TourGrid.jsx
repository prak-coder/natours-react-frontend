import { useTours } from "./useTours";
import TourCard from "./TourCard";
import Spinner from "../../components/ui/Spinner"; // Assuming this exists in your structure

export default function TourGrid() {
  const { tours, isLoading, error } = useTours();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        {/* Replace with your specific <Spinner /> component */}
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-md rounded-lg bg-red-50 p-4 text-center text-sm font-medium text-red-600 border border-red-200">
        ⚠️ {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {tours.map((tour) => (
        <TourCard key={tour._id || tour.id} tour={tour} />
      ))}
    </div>
  );
}
