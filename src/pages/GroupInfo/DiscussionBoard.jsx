import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";
import AddPostButton from "./AddPostButton";
import AddPostModal from "./AddPostModal";
import AddTopicButton from "./AddTopicButton";
import AddTopicModal from "./AddTopicModal";
import TopicsList from "./TopicsList";
import TopicsNavItem from "./TopicsNavItem";

export default function DiscussionBoard() {
  const { groupId } = useParams();
  const user = useAtomValue(userAtom);
  const [topics, setTopics] = useState([]);
  const [topicModal, setTopicModal] = useState(false);
  const [topicUpdate, setTopicUpdate] = useState(false);
  const [postModal, setPostModal] = useState(false);
  const [postUpdate, setPostUpdate] = useState(false);

  useEffect(() => {
    async function getDiscussionTopics() {
      try {
        const discussionTopics = await requestHandler(
          `/api/discussions/${groupId}`,
          "GET"
        );

        setTopics(discussionTopics);
      } catch {
        console.error("Failed to retrieve group discussion topics.");
      }
    }
    getDiscussionTopics();
  }, [topicUpdate]);

  return (
    <div className="container mt-4 mb-3">
      <div className="row text-center mt-4 mb-3">
        <div>
          <h5>Discussion Board</h5>
        </div>
      </div>
      <div className="row border border-primary rounded overflow-y-auto discussionsContainer">
        <div className="row mt-4 mb-2">
          <div className="col-4">
            {user ? (
              <AddTopicButton
                groupId={groupId}
                topicModal={topicModal}
                setTopicModal={setTopicModal}
              />
            ) : (
              ""
            )}
          </div>
          <div className="col-4">
            {user ? (
              <AddPostButton
                postModal={postModal}
                setPostModal={setPostModal}
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="col-4 mt-2 mb-4">
          <div id="discussion-list" className="list-group">
            {topics?.length > 0 ? (
              topics.map((topic) => {
                return <TopicsNavItem key={topic?.id} topic={topic} />;
              })
            ) : (
              <div className="d-flex justify-content-center mt-4 mb-4">
                <h6>No discussion topics available.</h6>
              </div>
            )}
          </div>
        </div>
        <div className="col-8 mt-2">
          <div
            data-bs-spy="scroll"
            data-bs-target="#discussion-list"
            data-bs-smooth-scroll="true"
            className="scrollspy-example"
            tabIndex="0"
          >
            {topics?.length > 0 ? (
              topics.map((topic) => {
                return (
                  <TopicsList
                    key={topic?.id}
                    groupId={groupId}
                    topic={topic}
                    postUpdate={postUpdate}
                  />
                );
              })
            ) : (
              <div className="d-flex justify-content-center mt-4 mb-4">
                <h6>No posts available.</h6>
              </div>
            )}
          </div>
        </div>
      </div>
      <AddTopicModal
        groupId={groupId}
        topicModal={topicModal}
        setTopicModal={setTopicModal}
        setTopicUpdate={setTopicUpdate}
      />
      <AddPostModal
        groupId={groupId}
        postModal={postModal}
        setPostModal={setPostModal}
        postUpdate={postUpdate}
        setPostUpdate={setPostUpdate}
      />
    </div>
  );
}
