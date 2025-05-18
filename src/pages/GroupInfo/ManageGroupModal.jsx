import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";
import ManageGroupForm from "./ManageGroupForm";

export default function ManageGroupModal({
  groupId,
  manageGroupModal,
  setManageGroupModal,
  groupUpdate,
  setGroupUpdate,
}) {
  const user = useAtomValue(userAtom);
  const [groupDetails, setGroupDetails] = useState([]);

  useEffect(() => {
    async function getGroupDetails() {
      if (!user) {
        return;
      }

      const groupInfo = await requestHandler(`/api/groups/${groupId}`, "GET");

      setGroupDetails(groupInfo);
    }
    getGroupDetails();
  }, [groupUpdate]);

  const showManageGroupModal = () => {
    setManageGroupModal(!manageGroupModal);
  };

  return (
    <div
      className="modal"
      data-bs-backdrop="static"
      tabIndex="-1"
      style={{ display: manageGroupModal ? "block" : "none" }}
    >
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content border-primary">
          <div className="modal-header text-white bg-dark" data-bs-theme="dark">
            <h5 className="modal-title">Manage Group</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={showManageGroupModal}
            ></button>
          </div>
          <div className="modal-body">
            <ManageGroupForm
              groupDetails={groupDetails}
              setGroupDetails={setGroupDetails}
              showManageGroupModal={showManageGroupModal}
              setGroupUpdate={setGroupUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
