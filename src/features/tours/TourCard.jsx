export default function TourCard({ tour }) {
  const { name, duration, maxGroupSize, difficulty, price, summary } = tour;

  return (
    <div className="overflow-hidden rounded-xl bg-white border border-gray-100 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col">
      {/* Tour Header Context */}
      <div className="p-6 pb-4">
        <h3 className="text-xl font-bold text-gray-800 tracking-tight">
          {name}
        </h3>
        <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-indigo-600">
          {difficulty} • {duration}-day tour
        </p>
      </div>

      {/* Tour Body Context */}
      <div className="px-6 py-2 flex-grow">
        <p className="text-sm italic text-gray-600 line-clamp-3">{summary}</p>
        <div className="mt-4 grid grid-cols-2 gap-y-2 text-xs text-gray-500 font-medium border-t border-gray-100 pt-3">
          <div>👥 Max {maxGroupSize} people</div>
          <div>📍 Multiple stops</div>
        </div>
      </div>

      {/* Tour Footer Context */}
      <div className="mt-auto bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-100">
        <div>
          <span className="text-lg font-extrabold text-gray-900">${price}</span>
          <span className="text-xs text-gray-500 font-normal"> / person</span>
        </div>
        {/* Reusing your base UI Button block if available, or a fallback tailwind link */}
        <button className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-indigo-700 shadow-sm">
          Details
        </button>
      </div>
    </div>
  );
}
