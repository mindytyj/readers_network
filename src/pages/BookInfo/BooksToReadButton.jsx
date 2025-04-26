import { useAtomValue } from "jotai";
import { bookAtom } from "../../handlers/bookAtom";
import { userAtom } from "../../handlers/userAtom";
import requestHandler from "../../handlers/request-handler";
import { Link, useNavigate } from "react-router";

export default function BooksToReadButton() {
  const user = useAtomValue(userAtom);
  const book = useAtomValue(bookAtom);
  const navigate = useNavigate();

  async function addBookToRead() {
    if (!user) {
      return;
    }

    try {
      await requestHandler(
        `/api/books/${user?.id}/books-to-read/add/${book?.id}`,
        "POST"
      );

      navigate(`/account/${user?.id}`);
    } catch (error) {
      console.error(error.message);

      navigate(`/account/${user?.id}`);
    }
  }

  return user ? (
    <div>
      <Link className="text-decoration-none text-dark" onClick={addBookToRead}>
        <p>
          <i className="bi bi-bookmark-plus-fill text-primary"></i> Add to
          Future Reads List
        </p>
      </Link>
    </div>
  ) : (
    <div>
      <Link className="text-decoration-none text-dark" to={"/login"}>
        <p>
          <i className="bi bi-bookmark-plus-fill text-primary"></i> Add to
          Future Reads List
        </p>
      </Link>
    </div>
  );
}
