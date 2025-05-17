import dayjs from "dayjs";

export default function ChatMessageItem({ userId, message }) {
  function formatDate(date) {
    return dayjs(date).format("DD MMMM YYYY hh:mm A");
  }

  return (
    <div
      className={
        "d-flex justify-content-between align-items-start w-25 p-3 mt-3 mb-3 mx-3 rounded " +
        (message.sent_recipient === userId
          ? "bg-primary bg-opacity-25"
          : "bg-secondary bg-opacity-25")
      }
    >
      <div className="ms-2 me-auto">
        <span className="text-break">{message.message}</span>
      </div>
      <small className="">{formatDate(message.sent_date)}</small>
    </div>
  );
}
