import { useEffect, useState } from "react";
import requestHandler from "../../handlers/request-handler";
import dayjs from "dayjs";
import { Link } from "react-router";

export default function PostListItem({ postId }) {
  const [post, setPost] = useState([]);

  useEffect(() => {
    async function getPost() {
      try {
        const commentPost = await requestHandler(
          `/api/feed/post/${postId}`,
          "GET"
        );
        setPost(commentPost);
      } catch (error) {
        console.error("Unable to get post.");
      }
    }
    getPost();
  }, []);

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
    </div>
  );
}
