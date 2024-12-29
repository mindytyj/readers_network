import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";
import EditUserReviewForm from "./EditUserReviewForm";

export default function EditUserReview() {
  const { bookId } = useParams();
  const user = useAtomValue(userAtom);
  const [userReview, setUserReview] = useState([]);

  useEffect(() => {
    async function getUserReview() {
      const review = await requestHandler(
        `/api/reviews/${bookId}/${user?.id}`,
        "GET"
      );
      setUserReview(review);
    }
    getUserReview();
  }, []);

  return (
    <div className="container-fluid mt-3">
      <div className="card border-primary mb-3">
        <div className="card-header text-white bg-dark">
          Edit Rating and Review
        </div>
        <div className="card-body">
          <EditUserReviewForm
            userReview={userReview}
            setUserReview={setUserReview}
          />
        </div>
      </div>
    </div>
  );
}
