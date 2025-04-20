import { useAtomValue } from "jotai";
import { useNavigate } from "react-router";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";

export default function DeleteGroupButton({ groupId }) {
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();

  async function deleteGroup() {
    try {
      await requestHandler(`/api/groups/${groupId}/delete`, "DELETE");

      navigate("/groups");
    } catch (error) {
      console.error("Failed to delete group.");
    }
  }

  return (
    <div onClick={deleteGroup}>
      <i className="bi bi-x-circle-fill text-white"></i> Delete Group
    </div>
  );
}
