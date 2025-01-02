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
      <div className="mb-4">
        <h4>Post</h4>
      </div>
      <div className="list-group">
        <PostListItem postId={postId} />
      </div>
      <div className="mt-4 mb-4">
        <h4>Comments</h4>
      </div>
      <div className="list-group">
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
        <div className="mt-4 mb-4">
          <AddComment setCommentUpdate={setCommentUpdate} />
        </div>
      </div>
    </div>
  );
}
