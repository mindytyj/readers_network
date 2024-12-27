import { Link } from "react-router";

export default function BookCard({ bookResult, setError }) {
  return (
    <div className="col">
      <div className="card">
        <Link to={`/books/${bookResult?.id}`}>
          <img
            src={bookResult?.image_url}
            className="card-img-top"
            alt={bookResult?.title}
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title">{bookResult?.title}</h5>
          <p className="card-text">
            Author: {bookResult?.first_name} {bookResult?.last_name}
          </p>
        </div>
        <div className="card-footer">
          <small className="text-muted">Last updated 3 mins ago</small>
        </div>
      </div>
    </div>
  );
}
