import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";
import AddLike from "./AddLike";
import RemoveLike from "./RemoveLike";

export default function LikeButton({ post, setLikeUpdate }) {
  const user = useAtomValue(userAtom);
  const [like, setLike] = useState([]);

  useEffect(() => {
    async function getLike() {
      try {
        const userLike = await requestHandler(
          `/api/feed/${user?.id}/like/${post.id}`,
          "GET"
        );
        setLike(userLike);
      } catch (error) {
        console.error("Unable to get user like.");
      }
    }
    getLike();
  }, []);

  return (
    <div className="col-md-1">
      {like.length == 0 ? (
        <AddLike
          postId={post.id}
          setLike={setLike}
          setLikeUpdate={setLikeUpdate}
        />
      ) : (
        <RemoveLike
          postId={post.id}
          like={like}
          setLike={setLike}
          setLikeUpdate={setLikeUpdate}
        />
      )}{" "}
      {post.likes} {post.likes > 1 ? "likes" : "like"}
    </div>
  );
}
