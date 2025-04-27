import { useAtomValue } from "jotai";
import { Link, useNavigate } from "react-router";
import { bookAtom } from "../../handlers/bookAtom";
import { userAtom } from "../../handlers/userAtom";

export default function AddUserReviewButton() {
  const book = useAtomValue(bookAtom);
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();

  return user ? (
    <div>
      <Link
        to={`/books/${book.id}/review/add`}
        className="text-decoration-none text-dark"
      >
        <p>
          <i className="bi bi-plus-circle-fill text-primary pe-2"></i>Add Rating
          and Review
        </p>
      </Link>
    </div>
  ) : (
    <div>
      <Link to={`/login`} className="text-decoration-none text-dark">
        <p>
          <i className="bi bi-plus-circle-fill text-primary pe-2"></i>Add Rating
          and Review
        </p>
      </Link>
    </div>
  );
}
