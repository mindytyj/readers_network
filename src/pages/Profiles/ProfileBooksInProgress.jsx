import { useEffect, useState } from "react";
import { useParams } from "react-router";
import requestHandler from "../../handlers/request-handler";
import ProfileBookCard from "../../components/ProfileBookCard/ProfileBookCard";

export default function ProfileBooksInProgress() {
  const { userId } = useParams();
  const [booksInProgress, setBooksInProgress] = useState([]);

  useEffect(() => {
    async function getBooksInProgress() {
      try {
        const books = await requestHandler(
          `/api/books/${userId}/books-in-progress`,
          "GET"
        );
        setBooksInProgress(books);
      } catch {
        console.error("Failed to retrieve profile books in-progress.");
      }
    }
    getBooksInProgress();
  });

  return (
    <div className="mb-4">
      <div className="row mb-2">
        <div className="col">
          <h5>Books In-Progress</h5>
        </div>
      </div>
      <div className="d-flex justify-content-center card-group">
        {booksInProgress?.length > 0 ? (
          booksInProgress.map((book) => {
            return (
              <div key={book?.id}>
                <ProfileBookCard book={book} type={"books-in-progress"} />
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
