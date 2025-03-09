import ReviewCommentButton from "./ReviewCommentButton";
import ReviewLikeButton from "./ReviewLikeButton";

export default function ReviewItem({ review, setLikeUpdate }) {
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
      <div className="row">
        <ReviewLikeButton review={review} setLikeUpdate={setLikeUpdate} />
        <ReviewCommentButton review={review} />
      </div>
    </div>
  );
}
