import CommentButton from "./CommentButton";
import LikeButton from "./LikeButton";
import dayjs from "dayjs";
import { Link } from "react-router";

export default function SocialFeedListItem({ post, setLikeUpdate }) {
  function formatDate(date) {
    return dayjs(date).format("DD MMMM YYYY hh:mm A");
  }

  return (
    <div className="d-flex bg-primary bg-opacity-10 border-white p-3 border-bottom">
      <div className="d-flex w-100 ps-3">
        <div>
          <Link
            className="text-decoration-none text-dark"
            to={`/profile/${post.user_id}`}
          >
            <h6 className="text-body">
              {post.first_name} {post.last_name}
              <span className="small text-muted font-weight-normal"> • </span>
              <span className="small text-muted font-weight-normal">
                {formatDate(post.created_date)}
              </span>
            </h6>
          </Link>
          <p>{post.post}</p>
          <div className="d-flex flex-row">
            <LikeButton post={post} setLikeUpdate={setLikeUpdate} />
            <CommentButton post={post} />
          </div>
        </div>
      </div>
    </div>
  );
}
