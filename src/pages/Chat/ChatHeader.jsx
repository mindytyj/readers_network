export default function ChatHeader({ recipient }) {
  return (
    <div className="list-group text-white bg-primary bg-opacity-75 mb-3 rounded-0">
      <div className="mt-4 mb-4 mx-3">
        <h4>
          {recipient.first_name} {recipient.last_name}
        </h4>
        <small>{recipient.username}</small>
      </div>
    </div>
  );
}
