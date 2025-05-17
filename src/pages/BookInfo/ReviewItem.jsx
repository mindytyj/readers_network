import { Link } from "react-router";
import ReviewCommentButton from "./ReviewCommentButton";
import ReviewLikeButton from "./ReviewLikeButton";
import dayjs from "dayjs";

export default function ReviewItem({ review, setLikeUpdate }) {
  function formatDate(date) {
    return dayjs(date).format("DD MMMM YYYY hh:mm A");
  }

  return (
    <div className="list-group-item list-group-item-action">
      <div className="d-flex w-100 justify-content-between">
        <Link
          className="text-decoration-none text-dark"
          to={`/profile/${review.id}`}
        >
          <h5 className="mb-2">
            {review.first_name} {review.last_name}
          </h5>
        </Link>
        <small>{formatDate(review.created_date)}</small>
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
