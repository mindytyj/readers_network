import { useEffect, useState } from "react";
import requestHandler from "../../handlers/request-handler";

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

  return (
    <div className="list-group-item list-group-item-action">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-2">
          {post.first_name} {post.last_name}
        </h5>
        <small>{post.created_date}</small>
      </div>
      <p className="mb-2">{post.post}</p>
    </div>
  );
}
