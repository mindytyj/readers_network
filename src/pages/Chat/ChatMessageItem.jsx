export default function ChatMessageItem({ user, message }) {
  return (
    <li
      className={
        "list-group-item d-flex justify-content-between align-items-start w-50 p-3 mt-2 mb-2 mx-3 rounded " +
        (message.sent_recipient == user.id
          ? "bg-primary bg-opacity-25"
          : "bg-secondary bg-opacity-25")
      }
    >
      <div className="ms-2 me-auto">
        <div className="fw-bold">
          {user.first_name} {user.last_name}
        </div>
        <span className="text-break">{message.message}</span>
      </div>
    </li>
  );
}
