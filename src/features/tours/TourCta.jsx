// import React from "react";
import { Link } from "react-router-dom";

const TourCta = ({ tour, user, onBookTour, isBooking }) => {
  // Fallback in case tour images array has fewer than 3 items
  const img1 = tour?.images?.[1] || tour?.imageCover;
  const img2 = tour?.images?.[2] || tour?.imageCover;

  return (
    <section className="section-cta">
      <div className="cta">
        <div className="cta__img cta__img--logo">
          <img src="/img/logo-white.png" alt="Natours logo" />
        </div>

        <img
          className="cta__img cta__img--1"
          src={`/img/tours/${img1}`}
          alt={`${tour.name} preview 1`}
        />
        <img
          className="cta__img cta__img--2"
          src={`/img/tours/${img2}`}
          alt={`${tour.name} preview 2`}
        />

        <div className="cta__content">
          <h2 className="heading-secondary">What are you waiting for?</h2>
          <p className="cta__text">
            {`${tour.duration} days. 1 adventure. Infinite memories. Make it yours today!`}
          </p>

          {user ? (
            <button
              className="btn btn--green span-all-rows"
              id="book-tour"
              onClick={() => onBookTour(tour._id || tour.id)}
              disabled={isBooking}
            >
              {isBooking ? "Processing..." : "Book tour now!"}
            </button>
          ) : (
            <Link className="btn btn--green span-all-rows" to="/login">
              Log in to book tour
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default TourCta;
