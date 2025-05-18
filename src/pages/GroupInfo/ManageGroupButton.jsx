import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";

export default function ManageGroupButton({
  groupId,
  manageGroupModal,
  setManageGroupModal,
}) {
  const user = useAtomValue(userAtom);
  const [modStatus, setModStatus] = useState({});

  useEffect(() => {
    async function getModStatus() {
      try {
        const status = await requestHandler(
          `/api/discussions/${groupId}/mod/${user?.id}`,
          "GET"
        );

        setModStatus(status);
      } catch {
        console.error("Failed to retrieve user's mod status.");
      }
    }
    getModStatus();
  }, []);

  const showManageGroupModal = () => {
    setManageGroupModal(!manageGroupModal);
  };

  return modStatus.creator === true ? (
    <button
      onClick={showManageGroupModal}
      aria-expanded={!manageGroupModal ? true : false}
      className="btn btn-primary btn-sm"
    >
      Manage Group
    </button>
  ) : (
    ""
  );
}
