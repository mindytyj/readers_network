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
      try {
        const userLike = await requestHandler(
          `/api/reviews/${user?.id}/like/${review.id}`,
          "GET"
        );
        setLike(userLike);
      } catch (error) {
        console.error("Unable to get user like.");
      }
    }
    getLike();
  }, []);

  console.log(review.id);

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
      )}{" "}
      {review.likes} likes
    </div>
  );
}
