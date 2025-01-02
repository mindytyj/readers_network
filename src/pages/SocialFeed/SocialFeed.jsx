import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";
import AddPost from "./AddPost";
import SocialFeedListItem from "./SocialFeedListItem";

export default function SocialFeed() {
  const user = useAtomValue(userAtom);
  const [feedPosts, setFeedPosts] = useState([]);
  const [postUpdate, setPostUpdate] = useState(false);
  const [likeUpdate, setLikeUpdate] = useState(false);

  useEffect(() => {
    async function getFeedPosts() {
      try {
        const posts = await requestHandler(`/api/feed/${user?.id}`, "GET");

        setFeedPosts(posts);
      } catch {
        console.error("Failed to retrieve social feed.");
      }
    }
    getFeedPosts();
  }, [postUpdate, likeUpdate]);

  return (
    <div className="container mt-4 mb-4">
      <div className="mb-4">
        <h4>Social Feed</h4>
      </div>
      <div className="mb-4">
        <AddPost setPostUpdate={setPostUpdate} />
      </div>
      <div className="list-group">
        {feedPosts?.length > 0 ? (
          feedPosts.map((post) => {
            return (
              <div key={post?.id}>
                <SocialFeedListItem post={post} setLikeUpdate={setLikeUpdate} />
              </div>
            );
          })
        ) : (
          <div className="d-flex justify-content-center mt-2">
            <h6 className="">No posts available.</h6>
          </div>
        )}
      </div>
    </div>
  );
}
