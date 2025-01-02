import { useAtomValue } from "jotai";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";

export default function AddCommentLike(commentId, setLike, setLikeUpdate) {
  const user = useAtomValue(userAtom);

  async function addLike() {
    try {
      commentId.setLikeUpdate(false);

      await requestHandler(
        `/api/feed/${user?.id}/comments/add/like/${commentId.commentId}`,
        "POST"
      );

      commentId.setLike(user?.id);
      commentId.setLikeUpdate(true);
    } catch (error) {
      console.error("Failed to add like.");
    }
  }

  return (
    <i className="bi bi-hand-thumbs-up text-primary" onClick={addLike}></i>
  );
}
