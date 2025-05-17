import { Link } from "react-router";
import AddBookButton from "./AddBookButton";
import dayjs from "dayjs";

export default function BookResult({ bookResult, setError, type }) {
  function formatDate(date) {
    return dayjs(date).format("DD MMMM YYYY");
  }

  return (
    <li className="list-group-item d-flex justify-content-between align-items-start">
      <div className="flex-shrink-0">
        <Link to={`/books/${bookResult.id}`}>
          <img
            src={bookResult.image_url}
            alt={bookResult.title}
            style={{ maxHeight: 150 }}
          />
        </Link>
      </div>
      <div className="ms-2 me-auto">
        <div className="fw-bold ms-2">
          <Link
            className="text-decoration-none text-dark"
            to={`/books/${bookResult.id}`}
          >
            {bookResult.title}
          </Link>
        </div>
        <div className="ms-2">
          by {bookResult.first_name} {bookResult.last_name}
        </div>
        <div className="mt-2 ms-2">
          <small className="fst-italic">{bookResult.isbn}</small>
        </div>
        <div className="ms-2">
          <small>Published {formatDate(bookResult.publication_date)}</small>
        </div>
      </div>
      <span
        data-bs-toggle="tooltip"
        data-bs-placement="left"
        title="Add to Books Tracker"
      >
        <AddBookButton
          bookResult={bookResult}
          setError={setError}
          type={type}
        />
      </span>
    </li>
  );
}
