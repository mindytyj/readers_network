import { useAtomValue } from "jotai";
import { bookAtom } from "../../handlers/bookAtom";
import { userAtom } from "../../handlers/userAtom";
import requestHandler from "../../handlers/request-handler";

export default function BooksToReadButton() {
  const user = useAtomValue(userAtom);
  const book = useAtomValue(bookAtom);

  async function addBookToRead() {
    if (!user) {
      return;
    }

    try {
      await requestHandler(
        `/api/books/${user?.id}/books-to-read/add/${book?.id}`,
        "POST"
      );
      alert("Book has been added to your books to read list.");
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  }

  return (
    <div>
      <p>
        <i
          className="bi bi-bookmark-plus-fill text-primary"
          onClick={addBookToRead}
        ></i>{" "}
        Add to Books to Read List
      </p>
    </div>
  );
}
