import { Link } from "react-router";
import RemoveWishlistBookButton from "./RemoveWishlistBookButton";

export default function WishlistItem({ book, setWishlistUpdate }) {
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
          <small className="fst-italic">{book.isbn}</small>
        </div>
        <div className="ms-2">
          <small>Published {book.publication_date}</small>
        </div>
      </div>
      <span
        data-bs-toggle="tooltip"
        data-bs-placement="left"
        title="Remove from Wishlist"
      >
        <RemoveWishlistBookButton
          bookId={book.id}
          setWishlistUpdate={setWishlistUpdate}
        />
      </span>
    </li>
  );
}
