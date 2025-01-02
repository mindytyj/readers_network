import CommentButton from "./CommentButton";
import LikeButton from "./LikeButton";

export default function SocialFeedListItem({ post, setLikeUpdate }) {
  return (
    <div className="list-group-item list-group-item-action">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-2">
          {post.first_name} {post.last_name}
        </h5>
        <small>{post.created_date}</small>
      </div>
      <p className="mb-2">{post.post}</p>
      <div className="row">
        <LikeButton post={post} setLikeUpdate={setLikeUpdate} />
        <CommentButton post={post} />
      </div>
    </div>
  );
}
