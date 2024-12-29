import AddUserReviewForm from "./AddUserReviewForm";

export default function AddUserReview() {
  return (
    <div className="container-fluid mt-3">
      <div className="card border-primary mb-3">
        <div className="card-header text-white bg-dark">
          Add Rating and Review
        </div>
        <div className="card-body">
          <AddUserReviewForm />
        </div>
      </div>
    </div>
  );
}
