import { Link } from "react-router";

export default function ChatsFriendListItem({ user, friend }) {
  return (
    <Link
      className="text-decoration-none"
      to={`/account/${user.id}/chat/${friend.friend_id}/`}
    >
      <li className="list-group-item d-flex justify-content-between align-items-start">
        <div className="ms-2 me-auto">
          <div className="fw-bold">
            {friend.first_name} {friend.last_name}
          </div>
          {friend.username}
        </div>
        <span>
          <i className="bi bi-chat-fill text-primary"></i>
        </span>
      </li>
    </Link>
  );
}
