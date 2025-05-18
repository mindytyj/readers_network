import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";
import DeleteGroupButton from "./DeleteGroupButton";
import JoinGroupButton from "./JoinGroupButton";
import LeaveGroupButton from "./LeaveGroupButton";
import ManageGroupButton from "./ManageGroupButton";

export default function JoinStatusButton({
  groupId,
  joinStatusUpdate,
  setJoinStatusUpdate,
  manageGroupModal,
  setManageGroupModal,
}) {
  const user = useAtomValue(userAtom);
  const [joinStatus, setJoinStatus] = useState([]);

  useEffect(() => {
    async function getJoinStatus() {
      try {
        const userJoinStatus = await requestHandler(
          `/api/groups/${groupId}/members/${user?.id}`,
          "GET"
        );

        if (userJoinStatus.length > 0) {
          setJoinStatus(userJoinStatus[0]);
        } else {
          setJoinStatus(0);
        }
      } catch (error) {
        console.error("Unable to get user's join status.");
      }
    }
    getJoinStatus();
  }, [joinStatusUpdate]);

  return (
    <div>
      {joinStatus?.user_id !== user?.id ? (
        <button className="btn btn-primary btn-sm">
          <JoinGroupButton
            groupId={groupId}
            setJoinStatus={setJoinStatus}
            setJoinStatusUpdate={setJoinStatusUpdate}
          />
        </button>
      ) : joinStatus?.creator === true ? (
        <div className="d-flex flex-row">
          <div className="me-3">
            <button className="btn btn-danger btn-sm">
              <DeleteGroupButton groupId={groupId} />
            </button>
          </div>
          <div>
            <ManageGroupButton
              groupId={groupId}
              manageGroupModal={manageGroupModal}
              setManageGroupModal={setManageGroupModal}
            />
          </div>
        </div>
      ) : (
        <button className="btn btn-danger btn-sm">
          <LeaveGroupButton
            groupId={groupId}
            joinStatus={joinStatus}
            setJoinStatus={setJoinStatus}
            setJoinStatusUpdate={setJoinStatusUpdate}
          />
        </button>
      )}
    </div>
  );
}
