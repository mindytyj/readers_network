import { useParams } from "react-router";
import requestHandler from "../../handlers/request-handler";

export default function AddBookButton({ bookResult, setError, type }) {
  const { userId } = useParams();

  async function addBook() {
    try {
      const location =
        type == "completed" ? "completed-books" : "books-in-progress";
      await requestHandler(
        `/api/books/${userId}/${location}/add/${bookResult?.id}`,
        "POST"
      );
    } catch (error) {
      console.error(error.message);
      setError("Failed to add book to reading tracker. Please try again.");
    }
  }

  return (
    <i
      className="bi bi-plus-circle-fill text-primary"
      id={bookResult?.id}
      onClick={addBook}
    ></i>
  );
}
