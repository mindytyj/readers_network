import BookCardCarousel from "../../components/BookCardCarousel/BookCardCarousel";
import BookDiscoveryCardGroup from "./BookDiscoveryCardGroup";

export default function Home() {
  return (
    <div className="container mt-4 mb-3">
      <div>
        <h4>Recent Community Reads</h4>
      </div>
      <div>
        <h4>Discover Books Based on your Last Read</h4>
        <BookCardCarousel />
      </div>
    </div>
  );
}
