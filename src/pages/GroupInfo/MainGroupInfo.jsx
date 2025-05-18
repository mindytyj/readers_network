import { useAtomValue } from "jotai";
import { useState } from "react";
import { useNavigate } from "react-router";
import { groupAtom } from "../../handlers/groupAtom";
import { userAtom } from "../../handlers/userAtom";
import JoinStatusButton from "./JoinStatusButton";
import ManageGroupModal from "./ManageGroupModal";

export default function MainGroupInfo({
  groupId,
  joinStatusUpdate,
  setJoinStatusUpdate,
  groupUpdate,
  setGroupUpdate,
}) {
  const group = useAtomValue(groupAtom);
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();
  const [manageGroupModal, setManageGroupModal] = useState(false);

  return (
    <div className="d-flex align-items-center">
      <div>
        <div>
          <h5>{group.group_name}</h5>
          <p>{group.members} member(s)</p>
        </div>
        {user ? (
          <JoinStatusButton
            groupId={groupId}
            joinStatusUpdate={joinStatusUpdate}
            setJoinStatusUpdate={setJoinStatusUpdate}
            manageGroupModal={manageGroupModal}
            setManageGroupModal={setManageGroupModal}
          />
        ) : (
          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigate("/login")}
          >
            <i className="bi bi-person-fill-add text-white"></i> Join Group
          </button>
        )}
      </div>
      <ManageGroupModal
        groupId={groupId}
        manageGroupModal={manageGroupModal}
        setManageGroupModal={setManageGroupModal}
        groupUpdate={groupUpdate}
        setGroupUpdate={setGroupUpdate}
      />
    </div>
  );
}
