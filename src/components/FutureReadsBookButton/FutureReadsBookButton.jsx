import { useAtomValue } from "jotai";
import { userAtom } from "../../handlers/userAtom";
import requestHandler from "../../handlers/request-handler";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export default function FutureReadsButton({ bookId }) {
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
      <Link
        className="text-decoration-none text-dark"
        to={`/account/${user.id}`}
      >
        <i className="bi bi-bookmark-check-fill text-primary pe-2"></i>
      </Link>
    ) : (
      <Link className="text-decoration-none text-dark" onClick={addBookToRead}>
        <i className="bi bi-bookmark-plus-fill text-primary pe-2"></i>
      </Link>
    )
  ) : (
    <Link className="text-decoration-none text-dark" to={"/login"}>
      <i className="bi bi-bookmark-plus-fill text-primary pe-2"></i>
    </Link>
  );
}
