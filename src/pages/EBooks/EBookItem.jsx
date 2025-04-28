import { Link, useNavigate } from "react-router";

export default function OrderHistoryItem({ eBook }) {
  const navigate = useNavigate();

  return (
    <li className="list-group-item d-flex justify-content-between align-items-start">
      <div className="flex-shrink-0">
        <Link to={`/books/${eBook.id}`}>
          <img
            src={eBook.image_url}
            alt={eBook.title}
            style={{ maxHeight: 150 }}
          />
        </Link>
      </div>
      <div className="ms-2 me-auto">
        <div className="fw-bold ms-2">
          <Link
            className="text-decoration-none text-dark"
            to={`/books/${eBook.id}`}
          >
            {eBook.title}
          </Link>
        </div>
        <div className="ms-2">
          by {eBook.first_name} {eBook.last_name}
        </div>
        <div className="mt-2 ms-2">
          <small>
            eBook access expires in {eBook.rental_duration - eBook.days} days
          </small>
        </div>
        <div className="mt-2 ms-2">
          <small>{eBook.rental_duration} days rental</small>
        </div>
        <div className="ms-2 fst-italic">
          <small>Rented on {eBook.created_date}</small>
        </div>
      </div>
      <span
        data-bs-toggle="tooltip"
        data-bs-placement="left"
        title="Read eBook"
      >
        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigate(`/ebook-read/${eBook?.id}`)}
        >
          Read eBook
        </button>
      </span>
    </li>
  );
}
