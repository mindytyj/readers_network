import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";
import TopicPostCommentItem from "./TopicPostCommentItem";
import TopicPostItem from "./TopicPostItem";

export default function DiscussionPostComments() {
  const { groupId, topicId, postId } = useParams();
  const user = useAtomValue(userAtom);
  const [postComments, setPostComments] = useState([]);
  const [commentUpdate, setCommentUpdate] = useState(false);

  useEffect(() => {
    async function getPostComments() {
      try {
        const comments = await requestHandler(
          `/api/discussions/${groupId}/comments/${topicId}/${postId}`,
          "GET"
        );

        setPostComments(comments);
      } catch {
        console.error("Failed to retrieve post comments.");
      }
    }
    getPostComments();
  }, [commentUpdate]);

  return (
    <div className="container mt-4 mb-3">
      <div className="mb-4">
        <h4>Discussion Post</h4>
      </div>
      <div className="list-group">
        <TopicPostItem postId={postId} setCommentUpdate={setCommentUpdate} />
      </div>
      <div className="mt-4 mb-4">
        <h4>
          Post Comments{" "}
          <small
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title="Scroll down the comment section to view more"
          >
            <i className="bi bi-question-circle-fill text-primary"></i>
          </small>
        </h4>
      </div>
      <div className="overflow-y-auto discussionsContainer">
        {postComments?.length > 0 ? (
          postComments.map((comment) => {
            return (
              <div key={comment?.id}>
                <TopicPostCommentItem comment={comment} />
              </div>
            );
          })
        ) : (
          <div className="d-flex justify-content-center mt-2">
            <h6 className="">No comments available.</h6>
          </div>
        )}
      </div>
    </div>
  );
}
