export default function Spinner({ size = "md", color = "indigo" }) {
  // Mapping sizes to Tailwind classes
  const sizeClasses = {
    sm: "h-5 w-5 border-2",
    md: "h-10 w-10 border-4",
    lg: "h-16 w-16 border-4",
  };

  // Mapping theme colors to Tailwind classes
  const colorClasses = {
    indigo: "border-indigo-200 border-t-indigo-600",
    emerald: "border-emerald-200 border-t-emerald-600",
    gray: "border-gray-200 border-t-gray-600",
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div
        className={`animate-spin rounded-full ${sizeClasses[size] || sizeClasses.md} ${colorClasses[color] || colorClasses.indigo}`}
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
