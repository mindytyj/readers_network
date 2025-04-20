import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { bookAtom } from "../../handlers/bookAtom";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";
import ReviewItem from "./ReviewItem";

export default function CommunityReviews() {
  const { bookId } = useParams();
  const user = useAtomValue(userAtom);
  const [reviews, setReviews] = useState([]);
  const [likeUpdate, setLikeUpdate] = useState(false);

  useEffect(() => {
    async function getCommunityReviews() {
      try {
        const communityReviews = await requestHandler(
          `/api/community/${bookId}`,
          "GET"
        );

        setReviews(communityReviews);
      } catch {
        console.error("Failed to retrieve community reviews.");
      }
    }
    getCommunityReviews();
  }, [likeUpdate]);

  return (
    <div className="container mt-4 mb-3">
      <div className="row text-center mt-4 mb-3">
        <div>
          <h5>Community Reviews</h5>
        </div>
      </div>
      <div className="list-group">
        {reviews?.length > 0 ? (
          reviews.map((review) => {
            return (
              <div key={review?.id}>
                <ReviewItem review={review} setLikeUpdate={setLikeUpdate} />
              </div>
            );
          })
        ) : (
          <div className="d-flex justify-content-center mt-2">
            <h6>No reviews available.</h6>
          </div>
        )}
      </div>
    </div>
  );
}
