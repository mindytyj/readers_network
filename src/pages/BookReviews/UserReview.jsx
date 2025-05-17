import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";
import AddUserReviewButton from "./AddUserReviewButton";
import AddReviewModal from "./AddReviewModal";
import EditUserReviewModal from "./EditUserReviewModal";
import EditUserReviewButton from "./EditUserReviewButton";

export default function UserReview({ reviewUpdate, setReviewUpdate }) {
  const { bookId } = useParams();
  const user = useAtomValue(userAtom);
  const [userReview, setUserReview] = useState([]);
  const [userReviewModal, setUserReviewModal] = useState(false);
  const [addReviewModal, setAddReviewModal] = useState(false);

  useEffect(() => {
    async function getUserReview() {
      if (!user) {
        return;
      }

      try {
        const review = await requestHandler(
          `/api/reviews/${bookId}/${user?.id}`,
          "GET"
        );

        setUserReview(review);
      } catch (error) {
        console.error("Unable to get user review.");
      }
    }
    getUserReview();
  }, [reviewUpdate]);

  return (
    <div className="container mt-4 mb-3">
      <div className="row text-center mt-4 mb-3">
        <div>
          <h5>Rating and Review</h5>
        </div>
      </div>
      {user && userReview.length > 0 ? (
        <div className="row mt-2 mb-3">
          <div className="flex-shrink-0">
            <div className="list-group">
              <EditUserReviewButton
                userReview={userReview[0]}
                setReviewUpdate={setReviewUpdate}
                userReviewModal={userReviewModal}
                setUserReviewModal={setUserReviewModal}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="row text-center mt-2 mb-3">
          <div className="flex-shrink-0">
            <AddUserReviewButton
              addReviewModal={addReviewModal}
              setAddReviewModal={setAddReviewModal}
            />
          </div>
        </div>
      )}
      <AddReviewModal
        addReviewModal={addReviewModal}
        setAddReviewModal={setAddReviewModal}
        setReviewUpdate={setReviewUpdate}
      />
      <EditUserReviewModal
        bookId={bookId}
        userReviewModal={userReviewModal}
        setUserReviewModal={setUserReviewModal}
        reviewUpdate={reviewUpdate}
        setReviewUpdate={setReviewUpdate}
      />
    </div>
  );
}
