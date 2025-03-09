export default function ReviewCommentListItem({ comment }) {
  return (
    <div className="list-group-item list-group-item-action">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-2">
          {comment.first_name} {comment.last_name}
        </h5>
        <small>{comment.created_date}</small>
      </div>
      <p className="mb-2">{comment.comment}</p>
    </div>
  );
}
