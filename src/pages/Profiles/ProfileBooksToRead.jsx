import { useEffect, useState } from "react";
import { useParams } from "react-router";
import requestHandler from "../../handlers/request-handler";
import ProfileBookCard from "../../components/ProfileBookCard/ProfileBookCard";

export default function ProfileBooksToRead() {
  const { userId } = useParams();
  const [booksToRead, setBooksToRead] = useState([]);

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
  });

  return (
    <div className="mb-4">
      <div className="row mb-2">
        <div className="col">
          <h5>Future Reads</h5>
        </div>
      </div>
      <div className="d-flex justify-content-center card-group">
        {booksToRead?.length > 0 ? (
          booksToRead.map((book) => {
            return (
              <div key={book?.id}>
                <ProfileBookCard book={book} type={"books-to-read"} />
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
