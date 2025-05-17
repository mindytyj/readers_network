import { useEffect, useState } from "react";
import { useParams } from "react-router";
import requestHandler from "../../handlers/request-handler";
import ReviewItem from "./ReviewItem";

export default function CommunityReviews({ reviewUpdate }) {
  const { bookId } = useParams();
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
  }, [likeUpdate, reviewUpdate]);

  return (
    <div className="container mt-4 mb-3">
      <div className="row text-center mt-4 mb-3">
        <div>
          <h5>Community Ratings and Reviews</h5>
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
