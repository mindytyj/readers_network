import { useEffect, useState } from "react";
import { useParams } from "react-router";
import requestHandler from "../../handlers/request-handler";
import ProfileBookCard from "../../components/ProfileBookCard/ProfileBookCard";

export default function ProfileCompletedBooks() {
  const { userId } = useParams();
  const [completedBooks, setCompletedBooks] = useState([]);

  useEffect(() => {
    async function getCompletedBooks() {
      try {
        const books = await requestHandler(
          `/api/books/${userId}/completed-books`,
          "GET"
        );
        setCompletedBooks(books);
      } catch {
        console.error("Failed to retrieve profile completed books.");
      }
    }
    getCompletedBooks();
  });

  return (
    <div className="mb-4">
      <div className="row mb-2">
        <div className="col">
          <h5>Books Completed</h5>
        </div>
      </div>
      <div className="d-flex justify-content-center card-group">
        {completedBooks?.length > 0 ? (
          completedBooks.map((book) => {
            return (
              <div key={book?.id}>
                <ProfileBookCard book={book} type={"completed-books"} />
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
