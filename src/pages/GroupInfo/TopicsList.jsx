import { useEffect, useState } from "react";
import { Link } from "react-router";
import requestHandler from "../../handlers/request-handler";
import TopicItem from "./TopicItem";

export default function TopicsList({ groupId, topic, postUpdate }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      try {
        const topicPosts = await requestHandler(
          `/api/discussions/${groupId}/posts/${topic.id}`,
          "GET"
        );

        setPosts(topicPosts);
      } catch {
        console.error("Failed to retrieve group discussion posts.");
      }
    }
    getPosts();
  }, [postUpdate]);

  return (
    <div>
      <div className="list-group mb-3" id={`topic-${topic.id}`}>
        {posts?.length > 0 ? (
          posts.map((post) => {
            return (
              <div key={post?.id}>
                <TopicItem groupId={groupId} topicId={topic.id} post={post} />
              </div>
            );
          })
        ) : (
          <div className="d-flex justify-content-center mt-2 mb-2">
            <h6>No posts available for {topic.topic_name}.</h6>
          </div>
        )}
      </div>
      {posts?.length > 9 ? (
        <Link
          to={`/groups/${groupId}/topics/${topic.id}`}
          className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
        >
          <div className="d-flex flex-row-reverse">
            <p>View more {topic.topic_name} posts</p>
          </div>
        </Link>
      ) : (
        ""
      )}
    </div>
  );
}
