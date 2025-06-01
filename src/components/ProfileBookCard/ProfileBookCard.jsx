import { Link } from "react-router";
import RemoveBookTrackerButton from "../RemoveBookTrackerButton/RemoveBookTrackerButton";
import dayjs from "dayjs";

export default function ProfileBookCard({
  book,
  type,
  location,
  setRemoveBookUpdate,
}) {
  function formatDate(date) {
    return dayjs(date).format("DD MMMM YYYY");
  }

  return (
    <div className="card mb-3 me-3" style={{ maxWidth: 500 }}>
      <div className="row g-0">
        <div className="col-md-4">
          <Link to={`/books/${book?.book_id}`}>
            <img
              src={book?.image_url}
              className="img-fluid rounded-start"
              alt={book?.title}
            />
          </Link>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <Link
              className="text-decoration-none text-dark"
              to={`/books/${book?.book_id}`}
            >
              <h5 className="card-title">{book?.title}</h5>
            </Link>
            <p className="card-text">
              by {book?.first_name} {book?.last_name}
            </p>
            <p className="card-text">
              <small className="text-muted">
                {type === "completed-books" ? "Completed" : "Added"} on{" "}
                {formatDate(book?.created_date)}
              </small>
            </p>
            {location === "user" ? (
              <div>
                <RemoveBookTrackerButton
                  bookId={book?.book_id}
                  type={type}
                  setRemoveBookUpdate={setRemoveBookUpdate}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
