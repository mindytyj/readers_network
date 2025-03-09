import { useAtomValue } from "jotai";
import BookCardCarousel from "../../components/BookCardCarousel/BookCardCarousel";
import { userAtom } from "../../handlers/userAtom";

export default function Home() {
  const user = useAtomValue(userAtom);

  return (
    <div className="container mt-4 mb-3">
      <div>
        <h4>Recent Community Reads</h4>
        <BookCardCarousel />
      </div>
      {user ? (
        <div>
          <h4>Discover Books Based on your Last Read</h4>
          <BookCardCarousel />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
