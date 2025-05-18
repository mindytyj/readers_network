import { useAtomValue } from "jotai";
import BookCardCarousel from "../../components/BookCardCarousel/BookCardCarousel";
import { userAtom } from "../../handlers/userAtom";
import CommunityReadsCarousel from "./CommunityReadsCarousel";

export default function Home() {
  const user = useAtomValue(userAtom);

  return (
    <div className="container mt-4 mb-3">
      <div className="container mb-4">
        <h4>Recent Community Reads</h4>
        <CommunityReadsCarousel />
      </div>
      {user ? (
        <div className="container mt-4">
          <h4>Discover Books Based on your Last Read</h4>
          <BookCardCarousel />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
