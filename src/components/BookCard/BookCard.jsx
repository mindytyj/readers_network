import { Link } from "react-router";
import CartBookButton from "../CartBookButton/CartBookButton";
import FutureReadsButton from "../FutureReadsBookButton/FutureReadsBookButton";
import WishlistBookButton from "../WishlistBookButton/WishlistBookButton";

export default function BookCard({ bookResult, setError }) {
  return (
    <div className="col">
      <div className="card cardHeight">
        <Link to={`/books/${bookResult?.id}`}>
          <img
            src={bookResult?.image_url}
            className="card-img-top cardImage"
            alt={bookResult?.title}
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title">{bookResult?.title}</h5>
          <p className="card-text">
            by {bookResult?.first_name} {bookResult?.last_name}
          </p>
        </div>
        <div className="card-footer bg-primary-subtle">
          <div>
            <FutureReadsButton bookId={bookResult?.id} />
            <WishlistBookButton bookId={bookResult?.id} />
            <CartBookButton bookId={bookResult?.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
