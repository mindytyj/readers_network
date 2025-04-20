import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";

export default function AddTopicButton({ groupId, topicModal, setTopicModal }) {
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

  const showTopicModal = () => {
    setTopicModal(!topicModal);
  };

  return modStatus.creator === true ? (
    <button
      onClick={showTopicModal}
      aria-expanded={!topicModal ? true : false}
      className="btn btn-primary btn-sm"
    >
      + New Discussion Topic
    </button>
  ) : (
    ""
  );
}
