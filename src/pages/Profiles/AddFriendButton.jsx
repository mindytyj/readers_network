import { useAtomValue } from "jotai";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function AddFriendButton({ friendId }) {
  const user = useAtomValue(userAtom);
  const [friendStatus, setFriendStatus] = useState([]);
  const [friendUpdate, setFriendUpdate] = useState([]);

  useEffect(() => {
    async function getFriendStatus() {
      if (!user) {
        return;
      }

      try {
        const status = await requestHandler(
          `/api/users/${user?.id}/friend/status/${friendId}`,
          "GET"
        );

        setFriendStatus(status);
      } catch (error) {
        console.error("Unable to get user's friend status.");
      }
    }
    getFriendStatus();
  }, [user, friendId, friendUpdate]);

  async function addFriend() {
    try {
      setFriendUpdate(false);

      await requestHandler(
        `/api/users/${user?.id}/friends/add/${friendId}`,
        "POST"
      );

      setFriendUpdate(true);
    } catch (error) {
      console.error("Failed to add friend.");
    }
  }

  return user ? (
    friendStatus > 0 ? (
      <div>
        <Link
          className="text-decoration-none text-dark"
          to={`/account/${user.id}`}
        >
          <i className="bi bi-person-fill-check text-primary"></i>
        </Link>
      </div>
    ) : (
      <div>
        <Link className="text-decoration-none text-dark" onClick={addFriend}>
          <i className="bi bi-person-fill-add text-primary"></i>
        </Link>
      </div>
    )
  ) : (
    <div>
      <Link className="text-decoration-none text-dark" to={"/login"}>
        <i className="bi bi-person-fill-add text-primary"></i>
      </Link>
    </div>
  );
}
