import { Link } from "react-router";

export default function ChatsAddButton({ chatModal, setChatModal }) {
  const showChatModal = () => {
    setChatModal(!chatModal);
  };

  return (
    <Link className="text-decoration-none text-dark">
      <i
        className="bi bi-plus-circle-fill text-primary"
        onClick={showChatModal}
        aria-expanded={!chatModal ? true : false}
      ></i>
    </Link>
  );
}
