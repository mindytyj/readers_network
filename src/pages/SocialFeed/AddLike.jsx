import { useAtomValue } from "jotai";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";

export default function AddLike({ postId, setLike, setLikeUpdate }) {
  const user = useAtomValue(userAtom);

  async function addLike() {
    try {
      setLikeUpdate(false);
      await requestHandler(`/api/feed/${user?.id}/like/add/${postId}`, "POST");

      setLike(user?.id);
      setLikeUpdate(true);
    } catch (error) {
      console.error("Failed to add like.");
    }
  }

  return (
    <i className="bi bi-hand-thumbs-up text-primary pe-2" onClick={addLike}></i>
  );
}
