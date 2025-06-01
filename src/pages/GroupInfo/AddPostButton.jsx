import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";

export default function AddPostButton({
  groupId,
  joinStatusUpdate,
  postModal,
  setPostModal,
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

  const showPostModal = () => {
    setPostModal(!postModal);
  };

  return joinStatus?.user_id === user?.id ? (
    <button
      onClick={showPostModal}
      aria-expanded={!postModal ? true : false}
      className="btn btn-primary btn-sm"
    >
      + New Post
    </button>
  ) : (
    ""
  );
}
