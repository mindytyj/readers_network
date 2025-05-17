import dayjs from "dayjs";

export default function ReviewCommentListItem({ comment }) {
  function formatDate(date) {
    return dayjs(date).format("DD MMMM YYYY hh:mm A");
  }

  return (
    <div className="list-group-item list-group-item-action">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-2">
          {comment.first_name} {comment.last_name}
        </h5>
        <small>{formatDate(comment.created_date)}</small>
      </div>
      <p className="mb-2">{comment.comment}</p>
    </div>
  );
}
