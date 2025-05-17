import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";
import EditUserReviewForm from "./EditUserReviewForm";

export default function EditUserReviewModal({
  bookId,
  userReviewModal,
  setUserReviewModal,
  reviewUpdate,
  setReviewUpdate,
}) {
  const user = useAtomValue(userAtom);
  const [userReview, setUserReview] = useState([]);

  useEffect(() => {
    async function getUserReview() {
      if (!user) {
        return;
      }

      const review = await requestHandler(
        `/api/reviews/${bookId}/${user?.id}`,
        "GET"
      );
      setUserReview(review[0]);
    }
    getUserReview();
  }, [reviewUpdate]);

  const showUserReviewModal = () => {
    setUserReviewModal(!userReviewModal);
  };

  return (
    <div
      className="modal"
      data-bs-backdrop="static"
      tabIndex="-1"
      style={{ display: userReviewModal ? "block" : "none" }}
    >
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content border-primary">
          <div className="modal-header text-white bg-dark" data-bs-theme="dark">
            <h5 className="modal-title">Edit Book Rating and Review</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={showUserReviewModal}
            ></button>
          </div>
          <div className="modal-body">
            <EditUserReviewForm
              showUserReviewModal={showUserReviewModal}
              setReviewUpdate={setReviewUpdate}
              userReview={userReview}
              setUserReview={setUserReview}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
