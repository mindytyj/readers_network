import { useSetAtom } from "jotai";
import { useNavigate } from "react-router";
import { postAtom } from "../../handlers/postAtom";

export default function CommentButton({ post }) {
  const setPost = useSetAtom(postAtom);
  const navigate = useNavigate();

  function handleClick() {
    setPost(post);
    navigate(`/social-feed/${post.id}`);
  }

  return (
    <div className="col">
      <i className="bi bi-chat-dots text-primary" onClick={handleClick}></i>{" "}
      Comment
    </div>
  );
}
