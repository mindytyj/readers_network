import { Link } from "react-router";
import RemoveCartItemButton from "./RemoveCartItemButton";

export default function CartItem({ book, setCartUpdate }) {
  return (
    <li className="list-group-item bg-primary bg-opacity-10 border-white d-flex justify-content-between align-items-start">
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
        <div className="mt-2 ms-2">${book.rental_price}</div>
        <div className="ms-2">
          <p>{book.rental_duration} days rental</p>
        </div>
      </div>
      <span
        data-bs-toggle="tooltip"
        data-bs-placement="left"
        title="Remove from Cart"
      >
        <RemoveCartItemButton bookId={book.id} setCartUpdate={setCartUpdate} />
      </span>
    </li>
  );
}
