import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";
import AddLike from "./AddReviewLike";
import RemoveLike from "./RemoveReviewLike";

export default function ReviewLikeButton({ review, setLikeUpdate }) {
  const user = useAtomValue(userAtom);
  const [like, setLike] = useState([]);

  useEffect(() => {
    async function getLike() {
      if (!user) {
        return;
      }

      try {
        const userLike = await requestHandler(
          `/api/community/${user?.id}/likes/${review.id}`,
          "GET"
        );
        setLike(userLike);
      } catch (error) {
        console.error("Unable to get review likes.");
      }
    }
    getLike();
  }, []);

  return (
    <div className="col-md-1">
      {like.length == 0 ? (
        <AddLike
          reviewId={review.id}
          setLike={setLike}
          setLikeUpdate={setLikeUpdate}
        />
      ) : (
        <RemoveLike
          reviewId={review.id}
          like={like}
          setLike={setLike}
          setLikeUpdate={setLikeUpdate}
        />
      )}
      {review.likes} {review.likes > 1 ? "likes" : "like"}
    </div>
  );
}
