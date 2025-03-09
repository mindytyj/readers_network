import BookDiscoveryCardGroup from "../../pages/Home/BookDiscoveryCardGroup";

export default function CarouselItem() {
  return (
    <div className="carousel-item active">
      <div className="d-flex">
        <BookDiscoveryCardGroup />
      </div>
    </div>
  );
}
