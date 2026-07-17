export default function ReviewCard({ review }) {
  return (
    <div className="flex flex-col bg-white p-8 rounded shadow-lg items-center w-[30rem] flex-shrink-0">
      <div className="flex items-center space-x-4 mb-4 self-start">
        <img
          src={`/img/users/${review.user.photo}`}
          alt={review.user.name}
          className="h-11 w-11 rounded-full object-cover"
        />
        <h6 className="text-sm font-bold uppercase text-[#333]">
          {review.user.name}
        </h6>
      </div>
      <p className="text-sm italic text-[#777] mb-4 text-left leading-relaxed">
        {review.review}
      </p>
      <div className="flex space-x-1 mt-auto self-start">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`h-5 w-5 ${star <= review.rating ? "fill-natours-green" : "fill-[#bbb]"}`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    </div>
  );
}
