import { useEffect, useState } from "react";
import requestHandler from "../../handlers/request-handler";
import BookCard from "../../components/BookCard/BookCard";
import BookSearch from "../../components/BookSearch/BookSearch";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState({ bookTitle: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    async function getBooks() {
      try {
        const allBooks = await requestHandler("/api/books", "GET");
        setBooks(allBooks.rows);
      } catch {
        console.error("Failed to retrieve books.");
      }
    }
    getBooks();
  }, []);

  return (
    <div className="container mt-4 mb-3">
      <div className="row mb-3">
        <div className="col">
          <h4>Browse All Books</h4>
        </div>
        <div className="col-md-4">
          <BookSearch setBook={setBook} setError={setError} />
        </div>
      </div>
      {book?.bookTitle === "" ? (
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {books.map((books) => {
            return (
              <div key={books?.id}>
                <BookCard bookResult={books} setError={setError} />
              </div>
            );
          })}
        </div>
      ) : book.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {book.map((book) => {
            return (
              <div key={book?.id}>
                <BookCard bookResult={book} setError={setError} />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <h5 className="text-center">No books found.</h5>
        </div>
      )}
    </div>
  );
}
