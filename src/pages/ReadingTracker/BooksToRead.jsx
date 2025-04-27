import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import ProfileBookCard from "../../components/ProfileBookCard/ProfileBookCard";
import requestHandler from "../../handlers/request-handler";

export default function BooksToRead() {
  const { userId } = useParams();
  const [booksToRead, setBooksToRead] = useState([]);
  const [removeBookUpdate, setRemoveBookUpdate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getBooksToRead() {
      try {
        const books = await requestHandler(
          `/api/books/${userId}/books-to-read`,
          "GET"
        );
        setBooksToRead(books);
      } catch {
        console.error("Failed to retrieve profile books to read.");
      }
    }
    getBooksToRead();
  }, [removeBookUpdate]);

  return (
    <div className="mb-4">
      <div className="row mb-2">
        <div className="col">
          <h5>Future Reads</h5>
        </div>
        <div className="col d-flex justify-content-md-end">
          <Link to={`/books`}>
            <h5>
              <i className="bi bi-plus-circle-fill text-primary"></i>
            </h5>
          </Link>
        </div>
      </div>
      <div className="d-flex justify-content-center card-group">
        {booksToRead?.length > 0 ? (
          booksToRead.map((book) => {
            return (
              <div key={book?.id}>
                <ProfileBookCard
                  book={book}
                  type={"books-to-read"}
                  setRemoveBookUpdate={setRemoveBookUpdate}
                />
              </div>
            );
          })
        ) : (
          <div className="d-flex justify-content-center">
            <h6 className="">No books added for future reading.</h6>
          </div>
        )}
      </div>
    </div>
  );
}
