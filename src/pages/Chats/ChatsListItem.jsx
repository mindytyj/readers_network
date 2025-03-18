import { Link } from "react-router";

export default function ChatsListItem({ chat, userId }) {
  return (
    <Link
      className="text-decoration-none"
      to={`/account/${userId}/chat/${chat.friend_id}/`}
    >
      <li className="list-group-item d-flex justify-content-between align-items-start">
        <div className="ms-2 me-auto">
          <div className="fw-bold">
            {chat.first_name} {chat.last_name}{" "}
            <i className="bi bi-chat-fill text-primary"></i>
          </div>
          <span className="text-truncate">{chat.message}</span>
        </div>
        <small>{chat.sent_date}</small>
      </li>
    </Link>
  );
}
