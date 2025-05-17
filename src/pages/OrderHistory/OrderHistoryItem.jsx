import { Link } from "react-router";
import dayjs from "dayjs";

export default function OrderHistoryItem({ book }) {
  function formatDate(date) {
    return dayjs(date).format("DD MMMM YYYY hh:mm A");
  }

  return (
    <li className="list-group-item d-flex justify-content-between align-items-start">
      <div className="flex-shrink-0">
        <Link to={`/books/${book.id}`}>
          <img
            src={book.image_url}
            alt={book.title}
            style={{ maxHeight: 150 }}
          />
        </Link>
      </div>
      <div className="ms-2 me-auto">
        <div className="fw-bold ms-2">
          <Link
            className="text-decoration-none text-dark"
            to={`/books/${book.id}`}
          >
            {book.title}
          </Link>
        </div>
        <div className="ms-2">
          by {book.first_name} {book.last_name}
        </div>
        <div className="mt-2 ms-2">
          <small>${book.rental_price}</small>
        </div>
        <div className="ms-2">
          <small>{book.rental_duration} days rental</small>
        </div>
        <div className="mt-2 ms-2 fst-italic">
          <small>Rented on {formatDate(book.created_date)}</small>
        </div>
      </div>
    </li>
  );
}
