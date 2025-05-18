import { Link } from "react-router";
import dayjs from "dayjs";

export default function ChatsListItem({ chat, userId }) {
  function formatDate(date) {
    return dayjs(date).format("DD MMMM YYYY hh:mm A");
  }

  return (
    <Link
      className="text-decoration-none"
      to={`/account/${userId}/chat/${chat.friendid}/`}
    >
      <li className="list-group-item bg-primary bg-opacity-10 border-white d-flex justify-content-between align-items-start">
        <div className="ms-2 me-auto">
          <div className="fw-bold">
            {chat.first_name} {chat.last_name}
            <i className="bi bi-chat-fill text-primary ps-2"></i>
          </div>
          <span className="text-truncate">
            {chat.message ? chat.message : "(No messages in chat history)"}
          </span>
        </div>
        <small>
          {chat.sent_date ? formatDate(chat.sent_date) : "Not available"}
        </small>
      </li>
    </Link>
  );
}
