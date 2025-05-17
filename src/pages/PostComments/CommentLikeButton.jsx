import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";
import AddCommentLike from "./AddCommentLike";
import RemoveCommentLike from "./RemoveCommentLike";

export default function CommentLikeButton({ comment, setLikeUpdate }) {
  const user = useAtomValue(userAtom);
  const [like, setLike] = useState([]);

  useEffect(() => {
    async function getCommentLike() {
      try {
        const userLike = await requestHandler(
          `/api/feed/${user?.id}/comments/like/${comment.id}`,
          "GET"
        );
        setLike(userLike);
      } catch (error) {
        console.error("Unable to get user like.");
      }
    }
    getCommentLike();
  }, []);

  return (
    <div className="col">
      {like.length === 0 ? (
        <AddCommentLike
          commentId={comment.id}
          setLike={setLike}
          setLikeUpdate={setLikeUpdate}
        />
      ) : (
        <RemoveCommentLike
          commentId={comment.id}
          like={like}
          setLike={setLike}
          setLikeUpdate={setLikeUpdate}
        />
      )}{" "}
      {comment.likes} likes
    </div>
  );
}
