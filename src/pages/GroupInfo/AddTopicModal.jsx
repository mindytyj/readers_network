import AddTopicForm from "./AddTopicForm";

export default function AddTopicModal({
  groupId,
  topicModal,
  setTopicModal,
  setTopicUpdate,
}) {
  const showTopicModal = () => {
    setTopicModal(!topicModal);
  };

  return (
    <div
      className="modal"
      data-bs-backdrop="static"
      tabIndex="-1"
      style={{ display: topicModal ? "block" : "none" }}
    >
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content border-primary">
          <div className="modal-header text-white bg-dark" data-bs-theme="dark">
            <h5 className="modal-title">Create New Discussion Topic</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={showTopicModal}
            ></button>
          </div>
          <div className="modal-body">
            <AddTopicForm
              groupId={groupId}
              showTopicModal={showTopicModal}
              setTopicUpdate={setTopicUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
