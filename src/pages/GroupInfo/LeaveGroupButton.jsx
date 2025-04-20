import { useAtomValue } from "jotai";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";

export default function LeaveGroupButton({
  groupId,
  setJoinStatus,
  setJoinStatusUpdate,
}) {
  const user = useAtomValue(userAtom);

  async function leaveGroup() {
    try {
      setJoinStatusUpdate(false);
      await requestHandler(
        `/api/groups/${groupId}/leave/${user?.id}`,
        "DELETE"
      );

      setJoinStatus(0);
      setJoinStatusUpdate(true);
    } catch (error) {
      console.error("Failed to leave group.");
    }
  }

  return (
    <div onClick={leaveGroup}>
      <i className="bi bi-person-x-fill text-white"></i> Leave Group
    </div>
  );
}
