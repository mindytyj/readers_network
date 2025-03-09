import { useAtomValue } from "jotai";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";

export default function EditUserReviewForm({ userReview, setUserReview }) {
  const { bookId } = useParams();
  const user = useAtomValue(userAtom);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(evt) {
    setUserReview({ ...userReview, [evt.target.name]: evt.target.value });
    setError("");
  }

  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      const reviewData = { ...userReview };

      await requestHandler(`/api/reviews/edit/${bookId}/${user?.id}`, "PUT", {
        reviewData,
      });

      navigate(`/books/${bookId}`);
    } catch (err) {
      setError("Unable to update rating and review. Please try again later.");
    }
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className="mb-3 row">
        <label htmlFor="rating" className="col-sm-2 col-form-label">
          Rating <span className="text-danger">*</span>
        </label>
        <div className="col-sm-7">
          <select
            className="form-select"
            id="rating"
            name="rating"
            value={userReview.rating}
            onChange={handleChange}
          >
            <option value="1">1 star</option>
            <option value="2">2 stars</option>
            <option value="3">3 stars</option>
            <option value="4">4 stars</option>
            <option value="5">5 stars</option>
          </select>
        </div>
      </div>
      <div className="mb-3 row">
        <label htmlFor="review" className="col-sm-2 col-form-label">
          Review <span className="text-danger">*</span>
        </label>
        <div className="col-sm-7">
          <textarea
            className="form-control"
            id="review"
            aria-label="review"
            placeholder="What do you think about the book?"
            value={userReview.review}
            name="review"
            rows="4"
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
