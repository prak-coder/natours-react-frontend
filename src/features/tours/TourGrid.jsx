import { useTours } from "./useTours";
import TourCard from "./TourCard";
// import Spinner from "../../components/ui/Spinner"; // Assuming this exists in your structure

export default function TourGrid() {
  const { tours, isLoading, error } = useTours();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        {/* Replace with your specific <Spinner /> component */}
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600"></div>
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
    /* Increased spacing to gap-14 and added extreme padding offsets to give cards breathing room */
    <div className="grid grid-cols-1 md:grid-cols-3 gap-14 max-w-[114rem] mx-auto px-16 py-20 bg-[#f7f7f7]">
      {tours.map((tour) => (
        <TourCard key={tour._id || tour.id} tour={tour} />
      ))}
    </div>
  );
}
