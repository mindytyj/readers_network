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
      <div className="card border-primary">
        <div>
          <div className="p-3 rounded-top border-bottom text-white bg-dark">
            <h4 className="d-flex align-items-center mb-0">My Social Feed</h4>
          </div>
          <div>
            <div>
              <div className="card-body text-white fw-bold bg-primary bg-opacity-50 border-bottom pb-2">
                <div className="mb-4">
                  <AddPost setPostUpdate={setPostUpdate} />
                </div>
              </div>
              <div className="list-group overflow-y-auto messagesContainer rounded-0">
                {feedPosts?.length > 0 ? (
                  feedPosts.map((post) => {
                    return (
                      <div key={post?.id}>
                        <SocialFeedListItem
                          post={post}
                          setLikeUpdate={setLikeUpdate}
                        />
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
          </div>
        </div>
      </div>
    </div>
  );
}
