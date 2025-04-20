import AddPostForm from "./AddPostForm";

export default function AddPostModal({
  groupId,
  postModal,
  setPostModal,
  postUpdate,
  setPostUpdate,
}) {
  const showPostModal = () => {
    setPostModal(!postModal);
  };

  return (
    <div
      className="modal"
      data-bs-backdrop="static"
      tabIndex="-1"
      style={{ display: postModal ? "block" : "none" }}
    >
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content border-primary">
          <div className="modal-header text-white bg-dark" data-bs-theme="dark">
            <h5 className="modal-title">Create New Post</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={showPostModal}
            ></button>
          </div>
          <div className="modal-body">
            <AddPostForm
              groupId={groupId}
              showPostModal={showPostModal}
              postUpdate={postUpdate}
              setPostUpdate={setPostUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
