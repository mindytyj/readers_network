import { useAtomValue } from "jotai";
import { Link } from "react-router";
import { bookAtom } from "../../handlers/bookAtom";
import { userAtom } from "../../handlers/userAtom";
import DeleteUserReview from "./DeleteUserReview";

export default function EditUserReviewButton({ userReview, setReviewUpdate }) {
  const book = useAtomValue(bookAtom);
  const user = useAtomValue(userAtom);

  return userReview ? (
    <div className="list-group-item list-group-item-action border-primary">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-2">
          {user?.first_name} {user?.last_name}
        </h5>
        <small>{userReview.created_date}</small>
      </div>
      <p className="mb-2">Rated: {userReview?.rating} star(s)</p>
      <p className="mb-2">{userReview?.review}</p>
      <div className="row">
        <div className="col-md-1">
          {" "}
          <Link
            to={`/books/${book.id}/review/edit`}
            className="text-decoration-none text-dark"
          >
            <i className="bi bi-pen-fill text-primary"></i> Edit
          </Link>
        </div>
        <div className="col-md-1">
          <DeleteUserReview
            bookId={book.id}
            setReviewUpdate={setReviewUpdate}
          />
        </div>
      </div>
    </div>
  ) : (
    <div>
      <h5>No Review and Rating Available.</h5>
    </div>
  );
}
