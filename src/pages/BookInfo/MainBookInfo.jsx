import { useAtomValue } from "jotai";
import { bookAtom } from "../../handlers/bookAtom";
import BooksToReadButton from "./BooksToReadButton";

export default function MainBookInfo() {
  const book = useAtomValue(bookAtom);

  return (
    <div className="d-flex align-items-center">
      <div className="flex-shrink-0">
        <img src={book.image_url} alt={book.title} style={{ maxHeight: 350 }} />
      </div>
      <div className="flex-grow-1 ms-5">
        <div>
          <h5>{book.title}</h5>
          <p>
            by {book.first_name} {book.last_name}
          </p>
        </div>
        <BooksToReadButton />
      </div>
    </div>
  );
}
