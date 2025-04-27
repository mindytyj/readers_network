import { useAtomValue } from "jotai";
import { Link } from "react-router";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";

export default function RemoveBookTrackerButton({
  bookId,
  type,
  setRemoveBookUpdate,
}) {
  const user = useAtomValue(userAtom);

  async function removeBook() {
    try {
      if (!user) {
        return;
      }

      setRemoveBookUpdate(false);

      await requestHandler(
        `/api/books/${user.id}/${type}/remove/${bookId}`,
        "DELETE"
      );

      setRemoveBookUpdate(true);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <Link className="text-decoration-none text-dark" onClick={removeBook}>
      <i className="bi bi-dash-circle-fill text-danger pe-2"></i>
      Remove
    </Link>
  );
}
