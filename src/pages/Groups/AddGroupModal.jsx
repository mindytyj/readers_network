import AddGroupForm from "./AddGroupForm";

export default function AddGroupModal({
  groupModal,
  setGroupModal,
  setGroupUpdate,
}) {
  const showGroupModal = () => {
    setGroupModal(!groupModal);
  };

  return (
    <div
      className="modal"
      data-bs-backdrop="static"
      tabIndex="-1"
      style={{ display: groupModal ? "block" : "none" }}
    >
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content border-primary">
          <div className="modal-header text-white bg-dark" data-bs-theme="dark">
            <h5 className="modal-title">New Group</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={showGroupModal}
            ></button>
          </div>
          <div className="modal-body">
            <AddGroupForm
              showGroupModal={showGroupModal}
              setGroupUpdate={setGroupUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
