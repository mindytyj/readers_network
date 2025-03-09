import { useAtomValue } from "jotai";
import { Link } from "react-router";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";

export default function DeleteUserReview({ bookId, setReviewUpdate }) {
  const user = useAtomValue(userAtom);

  async function removeUserReview() {
    try {
      setReviewUpdate(false);

      await requestHandler(
        `/api/reviews/remove/${bookId}/${user?.id}`,
        "DELETE"
      );

      setReviewUpdate(true);
    } catch (error) {
      console.error("Failed to remove review.");
    }
  }

  return (
    <span>
      <Link
        className="text-decoration-none text-dark"
        onClick={removeUserReview}
      >
        <i className="bi bi-x-circle-fill text-danger"></i> Remove
      </Link>
    </span>
  );
}
