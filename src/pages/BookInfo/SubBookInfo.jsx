import { useAtomValue } from "jotai";
import { bookAtom } from "../../handlers/bookAtom";
import dayjs from "dayjs";

export default function SubBookInfo() {
  const book = useAtomValue(bookAtom);

  function formatDate(date) {
    return dayjs(date).format("DD MMMM YYYY");
  }

  return (
    <div className="d-flex align-items-center mt-4 mb-3">
      <div className="row">
        <div className="col mt-4 mb-3 border-end border-primary">
          <div className="flex-shrink-0">
            <div>
              <h5>Book Description</h5>
            </div>
            <div>
              <p>{book.description}</p>
            </div>
          </div>
        </div>
        <div className="col mt-4 mb-3">
          <div className="flex-grow-1 ms-5">
            <div>
              <h5>Book Details</h5>
            </div>
            <div>
              <p>ISBN: {book.isbn}</p>
              <p>Publisher: {book.publisher_name}</p>
              <p>Published Date: {formatDate(book.publication_date)}</p>
              <p>Pages: {book.pages}</p>
              <p>Genre: {book.genre_name}</p>
              <p>Language: {book.language_name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
