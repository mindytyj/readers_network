import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProfileBookCard from "../../components/ProfileBookCard/ProfileBookCard";
import TrackerAddButton from "../../components/TrackerAddButton/TrackerAddButton";
import requestHandler from "../../handlers/request-handler";

export default function CompletedBooks() {
  const { userId } = useParams();
  const [completedBooks, setCompletedBooks] = useState([]);
  const [removeBookUpdate, setRemoveBookUpdate] = useState(false);

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
  }, [removeBookUpdate]);

  return (
    <div className="mb-4">
      <div className="row mb-2">
        <div className="col">
          <h5>Books Completed</h5>
        </div>
        <div className="col d-flex justify-content-md-end">
          <h5>
            <TrackerAddButton userId={userId} type={"completed"} />
          </h5>
        </div>
      </div>
      <div className="d-flex justify-content-center card-group">
        {completedBooks?.length > 0 ? (
          completedBooks.map((book) => {
            return (
              <div key={book?.id}>
                <ProfileBookCard
                  book={book}
                  type={"completed-books"}
                  location={"user"}
                  setRemoveBookUpdate={setRemoveBookUpdate}
                />
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
