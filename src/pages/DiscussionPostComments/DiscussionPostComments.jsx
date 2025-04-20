import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";
import AddTopicPostComment from "./AddTopicPostComment";
import TopicPostCommentItem from "./TopicPostCommentItem";
import TopicPostItem from "./TopicPostItem";

export default function DiscussionPostComments() {
  const { groupId, topicId, postId } = useParams();
  const user = useAtomValue(userAtom);
  const [postComments, setPostComments] = useState([]);
  const [commentUpdate, setCommentUpdate] = useState(false);
  const [likeUpdate, setLikeUpdate] = useState(false);

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
  }, [commentUpdate, likeUpdate]);

  return (
    <div className="container mt-4 mb-3">
      <div className="mb-4">
        <h4>Discussion Post</h4>
      </div>
      <div className="list-group">
        <TopicPostItem postId={postId} />
      </div>
      <div className="mt-4 mb-4">
        <h4>Post Comments</h4>
      </div>
      <div className="list-group">
        {postComments?.length > 0 ? (
          postComments.map((comment) => {
            return (
              <div key={comment?.id}>
                <TopicPostCommentItem
                  comment={comment}
                  setLikeUpdate={setLikeUpdate}
                />
              </div>
            );
          })
        ) : (
          <div className="d-flex justify-content-center mt-2">
            <h6 className="">No comments available.</h6>
          </div>
        )}
        {user ? (
          <div className="mt-4 mb-4">
            <AddTopicPostComment
              postId={postId}
              setCommentUpdate={setCommentUpdate}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
