import { useAtomValue } from "jotai";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";

export default function RemoveFriendButton({
  friendId,
  friendList,
  setFriendList,
}) {
  const user = useAtomValue(userAtom);

  async function removeFriend() {
    try {
      await requestHandler(
        `/api/users/${user?.id}/friends/remove/${friendId}`,
        "DELETE"
      );
      setFriendList(friendList.filter((friends) => friends?.id !== friendId));
    } catch (error) {
      console.error("Failed to remove friend.");
    }
  }

  return (
    <span>
      <i
        className="bi bi-person-fill-dash text-danger"
        onClick={removeFriend}
      ></i>
    </span>
  );
}
