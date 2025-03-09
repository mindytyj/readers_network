import { useAtomValue } from "jotai";
import { Link } from "react-router";
import { bookAtom } from "../../handlers/bookAtom";
import { userAtom } from "../../handlers/userAtom";
import DeleteUserReview from "./DeleteUserReview";

export default function EditUserReviewButton({ userReview, setReviewUpdate }) {
  const book = useAtomValue(bookAtom);
  const user = useAtomValue(userAtom);

  return userReview ? (
    <div className="list-group border border-primary">
      <div className="d-flex w-100 justify-content-center">
        <h5 className="mt-3 mb-2">{user?.first_name}'s Review and Rating</h5>
      </div>
      <small className="mb-3">Added on: {userReview.created_date}</small>
      <h6 className="mb-2">Rating Given: {userReview?.rating} Star(s)</h6>
      <h6 className="mb-3">Review Given: {userReview?.review}</h6>
      <div className="mb-3">
        <Link
          to={`/books/${book.id}/review/edit`}
          className="text-decoration-none text-dark"
        >
          <i className="bi bi-pen-fill text-primary"></i> Edit
        </Link>
      </div>
      <div className="mb-3">
        <DeleteUserReview bookId={book.id} setReviewUpdate={setReviewUpdate} />
      </div>
    </div>
  ) : (
    <div>
      <h5>No Review and Rating Available.</h5>
    </div>
  );
}
