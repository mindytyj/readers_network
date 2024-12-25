import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ProfileBookCard from "../../components/ProfileBookCard";
import requestHandler from "../../handlers/request-handler";

export default function BooksInProgress() {
  const { userId } = useParams();
  const [booksInProgress, setBooksInProgress] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getBooksInProgress() {
      try {
        const books = await requestHandler(
          `/api/books/${userId}/books-in-progress`,
          "GET"
        );
        setBooksInProgress(books.rows);
      } catch {
        console.error("Failed to retrieve profile books in-progress.");
      }
    }
    getBooksInProgress();
  }, []);

  return (
    <div className="mb-4">
      <div className="row mb-2">
        <div className="col">
          <h5>Books In-Progress</h5>
        </div>
        <div className="col d-flex justify-content-md-end">
          <h5>
            <i
              className="bi bi-plus-circle-fill text-primary"
              onClick={() => {
                navigate(`/account/${userId}/books-in-progress/add`);
              }}
            ></i>
          </h5>
        </div>
      </div>
      <div className="d-flex justify-content-center card-group">
        {booksInProgress == "[]" ? (
          booksInProgress.map((book) => {
            return (
              <div key={book?.id}>
                <ProfileBookCard book={book} />
              </div>
            );
          })
        ) : (
          <div className="d-flex justify-content-center">
            <h6 className="">No books in-progress.</h6>
          </div>
        )}
      </div>
    </div>
  );
}
