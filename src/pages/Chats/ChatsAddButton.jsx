export default function ChatsAddButton({ chatModal, setChatModal }) {
  const showChatModal = () => {
    setChatModal(!chatModal);
  };

  return (
    <i
      className="bi bi-plus-circle-fill text-primary"
      onClick={showChatModal}
      aria-expanded={!chatModal ? true : false}
    ></i>
  );
}
