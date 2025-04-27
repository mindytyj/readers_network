import { useSetAtom } from "jotai";
import { useNavigate } from "react-router";

export default function ReviewCommentButton({ review }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/community/${review.id}`);
  }

  return (
    <div className="col">
      <i
        className="bi bi-chat-dots text-primary pe-2"
        onClick={handleClick}
      ></i>
      Comment
    </div>
  );
}
