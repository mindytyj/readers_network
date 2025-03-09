import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";
import AddUserReviewButton from "./AddUserReviewButton";
import EditUserReviewButton from "./EditUserReviewButton";

export default function UserReview() {
  const { bookId } = useParams();
  const user = useAtomValue(userAtom);
  const [userReview, setUserReview] = useState([]);
  const [reviewUpdate, setReviewUpdate] = useState(false);

  console.log(reviewUpdate);

  useEffect(() => {
    async function getUserReview() {
      try {
        const review = await requestHandler(
          `/api/reviews/${bookId}/${user?.id}`,
          "GET"
        );
        console.log(review);
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
      <div className="row text-center mt-2 mb-3">
        <div className="flex-shrink-0">
          {user && userReview != "" ? (
            <EditUserReviewButton
              userReview={userReview[0]}
              setReviewUpdate={setReviewUpdate}
            />
          ) : (
            <AddUserReviewButton />
          )}
        </div>
      </div>
      <div className="col mt-4"></div>
    </div>
  );
}
