export default function TourPictures({ tour }) {
  const paddingClasses = ["pt-[15%]", "pb-[15%]", "pb-[27%]"];

  if (!tour?.images?.length) return null;

  return (
    <section className="relative z-20 -mt-[4vw] flex [clip-path:polygon(0_9vw,100%_0,100%_calc(100%-9vw),0_100%)] overflow-hidden">
      {tour.images.map((img, i) => (
        <div key={img} className="flex-1">
          <img
            src={`/images/tours/${img}`}
            alt={`${tour.name} Tour ${i + 1}`}
            className={`block h-[110%] w-full object-cover ${
              paddingClasses[i] || ""
            }`}
          />
        </div>
      ))}
    </section>
  );
}
