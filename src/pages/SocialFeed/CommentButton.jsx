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
    <div className="col-6">
      <i
        className="bi bi-chat-dots text-primary pe-2"
        onClick={handleClick}
      ></i>
      Comment
    </div>
  );
}
