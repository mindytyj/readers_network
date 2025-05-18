import { useAtomValue } from "jotai";
import { Link } from "react-router";
import { bookAtom } from "../../handlers/bookAtom";
import { userAtom } from "../../handlers/userAtom";
import DeleteUserReview from "./DeleteUserReview";
import dayjs from "dayjs";
import { Rating } from "react-simple-star-rating";

export default function EditUserReviewButton({
  userReview,
  setReviewUpdate,
  userReviewModal,
  setUserReviewModal,
}) {
  const book = useAtomValue(bookAtom);
  const user = useAtomValue(userAtom);

  function formatDate(date) {
    return dayjs(date).format("DD MMMM YYYY hh:mm A");
  }

  const showUserReviewModal = () => {
    setUserReviewModal(!userReviewModal);
  };

  return (
    <div className="list-group-item bg-primary bg-opacity-10 list-group-item-action border-primary">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-2">
          {user?.first_name} {user?.last_name}
        </h5>
        <small>{formatDate(userReview?.created_date)}</small>
      </div>
      <p className="mb-2">
        <Rating initialValue={userReview?.rating} readonly size={"24px"} />
      </p>
      <p className="mb-2">{userReview?.review}</p>
      <div className="d-flex flex-row">
        <div className="me-5">
          <Link
            className="text-decoration-none text-dark"
            onClick={showUserReviewModal}
            aria-expanded={!userReviewModal ? true : false}
          >
            <i className="bi bi-pen-fill text-primary pe-2"></i>Edit
          </Link>
        </div>
        <div>
          <DeleteUserReview
            bookId={book.id}
            setReviewUpdate={setReviewUpdate}
          />
        </div>
      </div>
    </div>
  );
}
