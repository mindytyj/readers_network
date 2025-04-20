export default function AddPostButton({ postModal, setPostModal }) {
  const showPostModal = () => {
    setPostModal(!postModal);
  };

  return (
    <button
      onClick={showPostModal}
      aria-expanded={!postModal ? true : false}
      className="btn btn-primary btn-sm"
    >
      + New Post
    </button>
  );
}
