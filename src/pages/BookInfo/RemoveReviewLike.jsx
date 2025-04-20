import { useAtomValue } from "jotai";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";

export default function RemoveReviewLike({
  reviewId,
  like,
  setLike,
  setLikeUpdate,
}) {
  const user = useAtomValue(userAtom);

  async function removeLike() {
    try {
      setLikeUpdate(false);
      await requestHandler(
        `/api/community/${user?.id}/likes/remove/${reviewId}`,
        "DELETE"
      );

      setLike("");
      setLikeUpdate(true);
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
