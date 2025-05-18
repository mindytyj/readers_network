import dayjs from "dayjs";
import { Link } from "react-router";

export default function ReviewCommentListItem({ comment }) {
  function formatDate(date) {
    return dayjs(date).format("DD MMMM YYYY hh:mm A");
  }

  return (
    <div className="card bg-primary bg-opacity-10 mb-3">
      <div className="card-body">
        <div className="d-flex flex-start">
          <div className="w-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Link
                className="text-decoration-none text-dark"
                to={`/profile/${comment.user_id}`}
              >
                <h6 className="text-primary fw-bold mb-0">
                  {comment.first_name} {comment.last_name}
                </h6>
              </Link>
              <small className="mb-0">{formatDate(comment.created_date)}</small>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p className="mb-2">{comment.comment}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
