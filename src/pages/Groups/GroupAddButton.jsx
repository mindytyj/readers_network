export default function GroupAddButton({ groupModal, setGroupModal }) {
  const showGroupModal = () => {
    setGroupModal(!groupModal);
  };

  return (
    <button
      onClick={showGroupModal}
      aria-expanded={!groupModal ? true : false}
      className="btn btn-primary btn-sm"
    >
      + Create New Group
    </button>
  );
}
