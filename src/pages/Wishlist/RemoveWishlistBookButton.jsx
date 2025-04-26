import { useAtomValue } from "jotai";
import { Link } from "react-router";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";

export default function RemoveWishlistBookButton({
  bookId,
  setWishlistUpdate,
}) {
  const user = useAtomValue(userAtom);

  async function removeBook() {
    try {
      setWishlistUpdate(false);

      await requestHandler(
        `/api/wishlists/${user.id}/remove/${bookId}`,
        "DELETE"
      );

      setWishlistUpdate(true);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <Link>
      <i
        className="bi bi-bookmark-dash-fill text-danger"
        onClick={removeBook}
      ></i>
    </Link>
  );
}
