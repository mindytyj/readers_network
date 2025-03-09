import { useEffect, useState } from "react";
import requestHandler from "../../handlers/request-handler";

export default function ReviewListItem({ reviewId }) {
  const [review, setReview] = useState([]);

  useEffect(() => {
    async function getReview() {
      try {
        const commentReview = await requestHandler(
          `/api/community/review/${reviewId}`,
          "GET"
        );
        setReview(commentReview);
      } catch (error) {
        console.error("Unable to get review.");
      }
    }
    getReview();
  }, []);

  return (
    <div className="list-group-item list-group-item-action">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-2">
          {review.first_name} {review.last_name}
        </h5>
        <small>{review.created_date}</small>
      </div>
      <p className="mb-2">Rated: {review.rating} star(s)</p>
      <p className="mb-2">{review.review}</p>
    </div>
  );
}
