import { useEffect, useState } from "react";
import { useParams } from "react-router";
import requestHandler from "../../handlers/request-handler";
import AddReviewComment from "./AddReviewComment";
import ReviewCommentListItem from "./ReviewCommentListItem";
import ReviewListItem from "./ReviewListItem";

export default function ReviewComments() {
  const { reviewId } = useParams();
  const [reviewComments, setReviewComments] = useState([]);
  const [commentUpdate, setCommentUpdate] = useState(false);

  useEffect(() => {
    async function getReviewComments() {
      try {
        const comments = await requestHandler(
          `/api/community/comments/${reviewId}`,
          "GET"
        );

        setReviewComments(comments);
      } catch {
        console.error("Failed to retrieve review comments.");
      }
    }
    getReviewComments();
  }, [commentUpdate]);

  return (
    <div className="container mt-4 mb-3">
      <div className="mt-4 mb-4">
        <h4>Comments</h4>
      </div>
      <div className="list-group">
        {reviewComments?.length > 0 ? (
          reviewComments.map((comment) => {
            return (
              <div key={comment?.id}>
                <ReviewCommentListItem comment={comment} />
              </div>
            );
          })
        ) : (
          <div className="d-flex justify-content-center mt-2">
            <h6 className="">No comments available.</h6>
          </div>
        )}
        <div className="mt-4 mb-4">
          <AddReviewComment
            reviewId={reviewId}
            setCommentUpdate={setCommentUpdate}
          />
        </div>
      </div>
    </div>
  );
}
