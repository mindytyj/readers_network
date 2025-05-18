import { useEffect, useState } from "react";
import { Link } from "react-router";
import requestHandler from "../../handlers/request-handler";
import dayjs from "dayjs";
import AddReviewComment from "./AddReviewComment";
import { Rating } from "react-simple-star-rating";

export default function ReviewListItem({ reviewId, setCommentUpdate }) {
  const [review, setReview] = useState([]);

  useEffect(() => {
    async function getReview() {
      try {
        const commentReview = await requestHandler(
          `/api/community/review/${reviewId}`,
          "GET"
        );
        setReview(commentReview);
      } catch (error) {
        console.error("Unable to get review.");
      }
    }
    getReview();
  }, []);

  function formatDate(date) {
    return dayjs(date).format("DD MMMM YYYY hh:mm A");
  }

  return (
    <section>
      <div className="row d-flex justify-content-center">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-start align-items-center">
                <div className="mb-2">
                  <Link
                    className="text-decoration-none text-dark"
                    to={`/profile/${review.user_id}`}
                  >
                    <h6 className="fw-bold text-primary mb-1">
                      {review.first_name} {review.last_name}
                    </h6>
                  </Link>
                  <span className="small text-muted font-weight-normal mb-0">
                    {formatDate(review.created_date)}
                  </span>
                </div>
              </div>
              <small className="mt-3">
                <Rating initialValue={review.rating} readonly size={"24px"} />
              </small>
              <p className="mt-3 mb-4 pb-2">{review.review}</p>
            </div>
            <div className="card-footer text-white fw-bold bg-primary bg-opacity-50 py-3 border-0">
              <div>
                <AddReviewComment
                  reviewId={reviewId}
                  setCommentUpdate={setCommentUpdate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // return (
  //   <div className="list-group-item list-group-item-action">
  //     <div className="d-flex w-100 justify-content-between">
  //       <h5 className="mb-2">
  //         {review.first_name} {review.last_name}
  //       </h5>
  //       <small>{review.created_date}</small>
  //     </div>
  //     <p className="mb-2">Rated: {review.rating} star(s)</p>
  //     <p className="mb-2">{review.review}</p>
  //   </div>
  // );
}
