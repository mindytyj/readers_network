import { useAtomValue } from "jotai";
import { useState } from "react";
import { useParams } from "react-router";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";
import { Rating } from "react-simple-star-rating";

export default function EditUserReviewForm({
  userReview,
  setUserReview,
  showUserReviewModal,
  setReviewUpdate,
}) {
  const { bookId } = useParams();
  const user = useAtomValue(userAtom);

  const [error, setError] = useState("");

  function handleChange(evt) {
    setUserReview({ ...userReview, [evt.target.name]: evt.target.value });
    setError("");
  }

  function handleRating(rating) {
    setUserReview({ ...userReview, ["rating"]: rating });
  }

  async function handleSubmit(evt) {
    evt.preventDefault();

    setReviewUpdate(false);

    try {
      const reviewData = { ...userReview };

      await requestHandler(`/api/reviews/edit/${bookId}/${user?.id}`, "PUT", {
        reviewData,
      });

      showUserReviewModal();
      setReviewUpdate(true);
    } catch (err) {
      setError("Unable to update rating and review. Please try again later.");
    }
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className="mb-3 row">
        <label htmlFor="rating" className="col-sm-3 col-form-label">
          Rating <span className="text-danger">*</span>
        </label>
        <div>
          <Rating
            initialValue={userReview?.rating}
            size={"24px"}
            onClick={handleRating}
          />
        </div>
      </div>
      <div className="mb-3 row">
        <label htmlFor="review" className="col-sm-3 col-form-label">
          Review <span className="text-danger">*</span>
        </label>
        <div>
          <textarea
            className="form-control"
            id="review"
            aria-label="review"
            placeholder="What do you think about the book?"
            value={userReview?.review}
            name="review"
            rows="5"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="input-group mb-3 justify-content-md-end">
        <button type="submit" className="btn btn-primary btn-sm">
          Save
        </button>
      </div>
      <div className="input-group mb-3 justify-content-md-center">
        <small className="text-danger text-center">{error}</small>
      </div>
    </form>
  );
}
