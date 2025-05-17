import { useEffect, useState } from "react";
import requestHandler from "../../handlers/request-handler";
import dayjs from "dayjs";
import { Link } from "react-router";

export default function TopicPostItem({ postId }) {
  const [post, setPost] = useState([]);

  useEffect(() => {
    async function getPost() {
      try {
        const commentPost = await requestHandler(
          `/api/discussions/post/${postId}`,
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
        <h5 className="mb-2">{post.sub_topic_title}</h5>
        <small>{formatDate(post.created_date)}</small>
      </div>
      <small>
        by{" "}
        <Link
          className="text-decoration-none text-dark"
          to={`/profile/${post.user_id}`}
        >
          {post.first_name} {post.last_name}
        </Link>
      </small>
      <p className="mt-3 mb-2">{post.sub_topic_description}</p>
    </div>
  );
}
