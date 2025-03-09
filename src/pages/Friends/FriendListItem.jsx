import RemoveFriendButton from "./RemoveFriendButton";

export default function FriendListItem({
  friend,
  friendList,
  setFriendList,
  setFriendUpdate,
}) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-start">
      <div className="ms-2 me-auto">
        <div className="fw-bold">
          {friend.first_name} {friend.last_name}
        </div>
        <small className="fst-italic">{friend.username}</small>
      </div>
      <RemoveFriendButton
        friendId={friend.friend_id}
        friendList={friendList}
        setFriendList={setFriendList}
        setFriendUpdate={setFriendUpdate}
      />
    </li>
  );
}
