import CommunityCarouselItem from "./CommunityCarouselItem";

export default function CommunityReadsCarousel() {
  return (
    <div
      id="communityReadsCarousel"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <CommunityCarouselItem />
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#communityReadsCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#communityReadsCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
