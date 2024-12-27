import { useAtomValue } from "jotai";
import { bookAtom } from "../../handlers/bookAtom";

export default function SubBookInfo() {
  const book = useAtomValue(bookAtom);

  return (
    <div className="d-flex align-items-center mt-4 mb-3">
      <div className="row">
        <div className="col mt-4 border-end border-primary">
          <div className="flex-shrink-0">
            <div>
              <h5>Book Description</h5>
            </div>
            <div>
              <p>{book.description}</p>
            </div>
          </div>
        </div>
        <div className="col mt-4">
          <div className="flex-grow-1 ms-5">
            <div>
              <h5>Book Details</h5>
            </div>
            <div>
              <p>ISBN: {book.isbn}</p>
              <p>Publisher: {book.publisher_name}</p>
              <p>Published Date: {book.publication_date}</p>
              <p>Pages: {book.pages}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
