import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ProfileBookCard from "../../components/ProfileBookCard";
import requestHandler from "../../handlers/request-handler";

export default function CompletedBooks() {
  const { userId } = useParams();
  const [completedBooks, setCompletedBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getCompletedBooks() {
      try {
        const books = await requestHandler(
          `/api/books/${userId}/completed-books`,
          "GET"
        );
        setCompletedBooks(books.rows);
      } catch {
        console.error("Failed to retrieve profile completed books.");
      }
    }
    getCompletedBooks();
  }, []);

  return (
    <div className="mb-4">
      <div className="row mb-2">
        <div className="col">
          <h5>Books Completed</h5>
        </div>
        <div className="col d-flex justify-content-md-end">
          <h5>
            <i
              className="bi bi-plus-circle-fill text-primary"
              onClick={() => {
                navigate(`/account/${userId}/completed-books/add`);
              }}
            ></i>
          </h5>
        </div>
      </div>
      <div className="d-flex justify-content-center card-group">
        {completedBooks == "[]" ? (
          completedBooks.map((book) => {
            return (
              <div key={book?.id}>
                <ProfileBookCard book={book} />
              </div>
            );
          })
        ) : (
          <div className="d-flex justify-content-center">
            <h6 className="">No books completed.</h6>
          </div>
        )}
      </div>
    </div>
  );
}
