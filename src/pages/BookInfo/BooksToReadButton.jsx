import { useAtomValue } from "jotai";
import { userAtom } from "../../handlers/userAtom";
import requestHandler from "../../handlers/request-handler";
import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

export default function BooksToReadButton() {
  const { bookId } = useParams();
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();
  const [futureReadsStatus, setFutureReadsStatus] = useState([]);

  useEffect(() => {
    async function getBookStatus() {
      if (!user) {
        return;
      }

      try {
        const status = await requestHandler(
          `/api/books/${user?.id}/books-to-read/status/${bookId}`,
          "GET"
        );

        setFutureReadsStatus(status);
      } catch (error) {
        console.error("Unable to get user's future reads book status.");
      }
    }
    getBookStatus();
  }, []);

  async function addBookToRead() {
    if (!user) {
      return;
    }

    try {
      await requestHandler(
        `/api/books/${user?.id}/books-to-read/add/${bookId}`,
        "POST"
      );

      navigate(`/account/${user?.id}`);
    } catch (error) {
      console.error(error.message);

      navigate(`/account/${user?.id}`);
    }
  }

  return user ? (
    futureReadsStatus > 0 ? (
      <div>
        <Link
          className="text-decoration-none text-dark"
          to={`/account/${user.id}`}
        >
          <p>
            <i className="bi bi-bookmark-check-fill text-primary pe-2"></i>In
            Future Reads List
          </p>
        </Link>
      </div>
    ) : (
      <div>
        <Link
          className="text-decoration-none text-dark"
          onClick={addBookToRead}
        >
          <p>
            <i className="bi bi-bookmark-plus-fill text-primary pe-2"></i>Add to
            Future Reads List
          </p>
        </Link>
      </div>
    )
  ) : (
    <div>
      <Link className="text-decoration-none text-dark" to={"/login"}>
        <p>
          <i className="bi bi-bookmark-plus-fill text-primary pe-2"></i>Add to
          Future Reads List
        </p>
      </Link>
    </div>
  );
}
