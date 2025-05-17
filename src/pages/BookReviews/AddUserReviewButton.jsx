import { useAtomValue } from "jotai";
import { Link } from "react-router";
import { bookAtom } from "../../handlers/bookAtom";
import { userAtom } from "../../handlers/userAtom";

export default function AddUserReviewButton({
  addReviewModal,
  setAddReviewModal,
}) {
  const book = useAtomValue(bookAtom);
  const user = useAtomValue(userAtom);

  const showAddReviewModal = () => {
    setAddReviewModal(!addReviewModal);
  };

  return user ? (
    <div>
      <Link
        className="text-decoration-none text-dark"
        onClick={showAddReviewModal}
        aria-expanded={!addReviewModal ? true : false}
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
