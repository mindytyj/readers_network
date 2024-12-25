import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ProfileBookCard from "../../components/ProfileBookCard";
import requestHandler from "../../handlers/request-handler";

export default function BooksToRead() {
  const { userId } = useParams();
  const [booksToRead, setBooksToRead] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getBooksToRead() {
      try {
        const books = await requestHandler(
          `/api/books/${userId}/books-to-read`,
          "GET"
        );
        setBooksToRead(books.rows);
      } catch {
        console.error("Failed to retrieve profile books to read.");
      }
    }
    getBooksToRead();
  }, []);

  return (
    <div className="mb-4">
      <div className="row mb-2">
        <div className="col">
          <h5>Books To Read</h5>
        </div>
        <div className="col d-flex justify-content-md-end">
          <h5>
            <i
              className="bi bi-plus-circle-fill text-primary"
              onClick={() => {
                navigate(`/account/${userId}/books-to-read/add`);
              }}
            ></i>
          </h5>
        </div>
      </div>
      <div className="d-flex justify-content-center card-group">
        {booksToRead == "[]" ? (
          booksToRead.map((book) => {
            return (
              <div key={book?.id}>
                <ProfileBookCard book={book} />
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
