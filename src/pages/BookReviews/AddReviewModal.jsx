import AddUserReviewForm from "./AddUserReviewForm";

export default function AddReviewModal({
  addReviewModal,
  setAddReviewModal,
  setReviewUpdate,
}) {
  const showAddReviewModal = () => {
    setAddReviewModal(!addReviewModal);
  };

  return (
    <div
      className="modal"
      data-bs-backdrop="static"
      tabIndex="-1"
      style={{ display: addReviewModal ? "block" : "none" }}
    >
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content border-primary">
          <div className="modal-header text-white bg-dark" data-bs-theme="dark">
            <h5 className="modal-title">Add Book Rating and Review</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={showAddReviewModal}
            ></button>
          </div>
          <div className="modal-body">
            <AddUserReviewForm
              showAddReviewModal={showAddReviewModal}
              setReviewUpdate={setReviewUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
