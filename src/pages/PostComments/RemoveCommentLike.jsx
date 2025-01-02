import { useAtomValue } from "jotai";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";

export default function RemoveCommentLike(
  commentId,
  like,
  setLike,
  setLikeUpdate
) {
  const user = useAtomValue(userAtom);

  async function removeLike() {
    try {
      commentId.setLikeUpdate(false);
      await requestHandler(
        `/api/feed/${user?.id}/comments/remove/like/${commentId.commentId}`,
        "DELETE"
      );

      commentId.setLike("");
      commentId.setLikeUpdate(true);
    } catch (error) {
      console.error("Failed to remove like.");
    }
  }

  return (
    <i
      className="bi bi-hand-thumbs-up-fill text-primary"
      onClick={removeLike}
    ></i>
  );
}
