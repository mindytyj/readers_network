import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";

export default function AddBookButton({ bookResult, setError, type }) {
  const user = useAtomValue(userAtom);
  const [trackerStatus, setTrackerStatus] = useState([]);

  useEffect(() => {
    async function getTrackerStatus() {
      if (!user) {
        return;
      }

      try {
        const location =
          type == "completed" ? "completed-books" : "books-in-progress";

        const status = await requestHandler(
          `/api/books/${user.id}/${location}/status/${bookResult?.id}`,
          "GET"
        );

        setTrackerStatus(status);
      } catch (error) {
        console.error("Unable to get user's book tracking status.");
      }
    }
    getTrackerStatus();
  }, [trackerStatus]);

  async function addBook() {
    try {
      setTrackerStatus(false);

      const location =
        type == "completed" ? "completed-books" : "books-in-progress";

      await requestHandler(
        `/api/books/${user.id}/${location}/add/${bookResult?.id}`,
        "POST"
      );

      setTrackerStatus(true);
    } catch (error) {
      console.error(error.message);
      setError("Failed to add book to reading tracker. Please try again.");
    }
  }

  return trackerStatus > 0 ? (
    <Link to={`/account/${user?.id}`}>
      <i
        className="bi bi-check-circle-fill text-primary"
        id={bookResult?.id}
      ></i>
    </Link>
  ) : (
    <Link>
      <i
        className="bi bi-plus-circle-fill text-primary"
        id={bookResult?.id}
        onClick={addBook}
      ></i>
    </Link>
  );
}
