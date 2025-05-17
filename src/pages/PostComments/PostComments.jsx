import { useEffect, useState } from "react";
import { useParams } from "react-router";
import requestHandler from "../../handlers/request-handler";
import AddComment from "./AddComment";
import CommentListItem from "./CommentListItem";
import PostListItem from "./PostListItem";

export default function PostComments() {
  const { postId } = useParams();
  const [feedComments, setFeedComments] = useState([]);
  const [commentUpdate, setCommentUpdate] = useState(false);
  const [likeUpdate, setLikeUpdate] = useState(false);

  useEffect(() => {
    async function getFeedComments() {
      try {
        const comments = await requestHandler(
          `/api/feed/comments/${postId}`,
          "GET"
        );

        setFeedComments(comments);
      } catch {
        console.error("Failed to retrieve post comments.");
      }
    }
    getFeedComments();
  }, [commentUpdate, likeUpdate]);

  return (
    <div className="container mt-4 mb-3">
      <PostListItem postId={postId} setCommentUpdate={setCommentUpdate} />
      <div className="mt-4 mb-4">
        <h4>
          Comments{" "}
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
        {feedComments?.length > 0 ? (
          feedComments.map((comment) => {
            return (
              <div key={comment?.id}>
                <CommentListItem
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
      </div>
    </div>
  );
}
