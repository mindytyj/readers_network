import CommentButton from "./CommentButton";
import LikeButton from "./LikeButton";
import dayjs from "dayjs";
import { Link } from "react-router";

export default function SocialFeedListItem({ post, setLikeUpdate }) {
  function formatDate(date) {
    return dayjs(date).format("DD MMMM YYYY hh:mm A");
  }

  return (
    <div className="list-group-item list-group-item-action">
      <div className="d-flex w-100 justify-content-between">
        <Link
          className="text-decoration-none text-dark"
          to={`/profile/${post.user_id}`}
        >
          <h5 className="mb-2">
            {post.first_name} {post.last_name}
          </h5>
        </Link>
        <small>{formatDate(post.created_date)}</small>
      </div>
      <p className="mb-2">{post.post}</p>
      <div className="row">
        <LikeButton post={post} setLikeUpdate={setLikeUpdate} />
        <CommentButton post={post} />
      </div>
    </div>
  );
}
