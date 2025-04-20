import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";
import DeleteGroupButton from "./DeleteGroupButton";
import JoinGroupButton from "./JoinGroupButton";
import LeaveGroupButton from "./LeaveGroupButton";

export default function JoinStatusButton({ groupId, setJoinStatusUpdate }) {
  const user = useAtomValue(userAtom);
  const [joinStatus, setJoinStatus] = useState([]);

  useEffect(() => {
    async function getJoinStatus() {
      try {
        const userJoinStatus = await requestHandler(
          `/api/groups/${groupId}/members/${user?.id}`,
          "GET"
        );
        setJoinStatus(userJoinStatus);
      } catch (error) {
        console.error("Unable to get user's join status.");
      }
    }
    getJoinStatus();
  }, []);

  return (
    <div>
      {joinStatus.user_id !== user?.id ? (
        <button className="btn btn-primary btn-sm">
          <JoinGroupButton
            groupId={groupId}
            setJoinStatus={setJoinStatus}
            setJoinStatusUpdate={setJoinStatusUpdate}
          />
        </button>
      ) : joinStatus.creator === true ? (
        <button className="btn btn-danger btn-sm">
          <DeleteGroupButton groupId={groupId} />
        </button>
      ) : (
        <button className="btn btn-primary btn-sm">
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
