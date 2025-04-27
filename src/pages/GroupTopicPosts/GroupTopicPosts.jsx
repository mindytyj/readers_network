import { useEffect, useState } from "react";
import { useParams } from "react-router";
import requestHandler from "../../handlers/request-handler";
import TopicItem from "../GroupInfo/TopicItem";

export default function GroupTopicPosts() {
  const { groupId, topicId } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getAllPosts() {
      try {
        const topicPosts = await requestHandler(
          `/api/discussions/${groupId}/posts/all/${topicId}`,
          "GET"
        );

        setPosts(topicPosts);
      } catch {
        console.error("Failed to retrieve group discussion posts.");
      }
    }
    getAllPosts();
  }, []);

  return (
    <div className="container mt-4 mb-4">
      <div className="row mb-3">
        <div className="col">
          {posts?.length > 0 ? (
            <h4>All {posts[0]?.topic_name} Posts</h4>
          ) : (
            <h4>All Posts</h4>
          )}
        </div>
      </div>
      <div className="container border border-primary rounded">
        <div className="list-group mt-3 mb-3 overflow-y-auto allDiscussionPostsContainer rounded-0">
          {posts?.length > 0 ? (
            posts.map((post) => {
              return (
                <div key={post?.id}>
                  <TopicItem groupId={groupId} topicId={topicId} post={post} />
                </div>
              );
            })
          ) : (
            <div className="d-flex justify-content-center mt-2 mb-2">
              {posts?.length > 0 ? (
                <h6>No posts available for {posts[0]?.topic_name}.</h6>
              ) : (
                <h6>No posts available.</h6>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
