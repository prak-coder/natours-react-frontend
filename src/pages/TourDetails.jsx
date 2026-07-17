import { useEffect, useState } from "react";
import ReviewCard from "../features/reviews/components/ReviewCard";

export default function TourDetails() {
  const [tour, setTour] = useState(null);

  return (
    <div className="flex flex-col -mx-8 -mt-16">
      {/* Hero Header Section */}
      <section className="relative h-[38vw] clip-path-[polygon(0_0,_100%_0,_100%_85%,_0_100%)]">
        <div className="absolute inset-0 bg-gradient-to-br from-natours-green-light to-natours-green-dark opacity-70 z-10 mix-blend-color" />
        <img
          src={`/img/tours/${tour?.imageCover}`}
          className="w-full h-full object-cover"
          alt={tour?.name}
        />
        <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 z-20 text-center">
          <h1 className="text-white font-light text-5xl uppercase tracking-wider bg-gradient-to-br from-natours-green-light/85 to-natours-green-dark/85 px-8 py-4">
            {tour?.name}
          </h1>
        </div>
      </section>

      {/* Description and Quick Facts Container Block */}
      <section className="bg-[#f7f7f7] py-24 grid grid-cols-2 gap-16 px-16">
        <div className="bg-white p-12 rounded shadow-md">
          <h2 className="text-xl font-bold uppercase text-gradient mb-8">
            Quick Facts
          </h2>
          {/* Loop tour.startDates, guides metadata parameters natively here */}
        </div>
        <div>
          <h2 className="text-xl font-bold uppercase text-gradient mb-8">
            About {tour?.name}
          </h2>
          <p className="text-sm leading-relaxed whitespace-pre-line">
            {tour?.description}
          </p>
        </div>
      </section>

      {/* Reviews Slider Section Component */}
      <section className="bg-gradient-to-br from-natours-green-light to-natours-green-dark py-24 overflow-x-auto flex space-x-8 px-12 clip-path-[polygon(0_15%,_100%_0,_100%_85%,_0_100%)]">
        {tour?.reviews.map((rev) => (
          <ReviewCard key={rev.id} review={rev} />
        ))}
      </section>
    </div>
  );
}
