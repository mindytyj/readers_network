import { useEffect, useState } from "react";
import requestHandler from "../../handlers/request-handler";

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

  return (
    <div className="list-group-item list-group-item-action">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-2">{post.sub_topic_title}</h5>
        <small>{post.created_date}</small>
      </div>
      <small>
        by {post.first_name} {post.last_name}
      </small>
      <p className="mt-3 mb-2">{post.sub_topic_description}</p>
    </div>
  );
}
