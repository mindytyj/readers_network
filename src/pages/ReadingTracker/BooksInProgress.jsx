import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProfileBookCard from "../../components/ProfileBookCard/ProfileBookCard";
import TrackerAddButton from "../../components/TrackerAddButton/TrackerAddButton";
import requestHandler from "../../handlers/request-handler";

export default function BooksInProgress() {
  const { userId } = useParams();
  const [booksInProgress, setBooksInProgress] = useState([]);

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
            <TrackerAddButton userId={userId} type={"in-progress"} />
          </h5>
        </div>
      </div>
      <div className="d-flex justify-content-center card-group">
        {booksInProgress?.length > 0 ? (
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
