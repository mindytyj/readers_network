import { useAtomValue } from "jotai";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";

export default function JoinGroupButton({
  groupId,
  setJoinStatus,
  setJoinStatusUpdate,
}) {
  const user = useAtomValue(userAtom);

  async function joinGroup() {
    try {
      setJoinStatusUpdate(false);
      await requestHandler(`/api/groups/${groupId}/join/${user?.id}`, "POST");

      setJoinStatus(user?.id);
      setJoinStatusUpdate(true);
    } catch (error) {
      console.error("Failed to join group.");
    }
  }

  return (
    <div onClick={joinGroup}>
      <i className="bi bi-person-fill-add text-white"></i> Join Group
    </div>
  );
}
