import { useAtomValue } from "jotai";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";

export default function AddLike({ reviewId, setLike, setLikeUpdate }) {
  const user = useAtomValue(userAtom);

  async function addLike() {
    try {
      setLikeUpdate(false);
      await requestHandler(
        `/api/community/${user?.id}/likes/add/${reviewId}`,
        "POST"
      );

      setLike(user?.id);
      setLikeUpdate(true);
    } catch (error) {
      console.error("Failed to add like.");
    }
  }

  return (
    <i className="bi bi-hand-thumbs-up text-primary" onClick={addLike}></i>
  );
}
