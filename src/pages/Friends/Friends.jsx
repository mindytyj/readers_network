import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";
import FriendListItem from "./FriendListItem";

export default function Friends() {
  const user = useAtomValue(userAtom);
  const [friendList, setFriendList] = useState([]);

  useEffect(() => {
    async function getFriends() {
      try {
        const friends = await requestHandler(
          `/api/users/${user?.id}/friends`,
          "GET"
        );

        setFriendList(friends);
      } catch {
        console.error("Failed to retrieve friend list.");
      }
    }
    getFriends();
  }, [friendList]);

  return (
    <div className="card border-primary mb-3">
      <div className="card-header text-white bg-dark">My Friends</div>
      <div className="card-body">
        <ul className="list-group list-group-flush">
          {friendList?.length > 0 ? (
            friendList.map((friend) => {
              return (
                <div key={friend?.friend_id}>
                  <FriendListItem
                    friend={friend}
                    friendList={friendList}
                    setFriendList={setFriendList}
                  />
                </div>
              );
            })
          ) : (
            <div className="d-flex justify-content-center mt-2">
              <h6 className="">No friends added.</h6>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}
