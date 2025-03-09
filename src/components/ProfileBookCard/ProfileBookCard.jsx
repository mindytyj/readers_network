export default function ProfileBookCard({ book, type }) {
  return (
    <div className="card mb-3" style={{ maxWidth: 500 }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={book?.image_url}
            className="img-fluid rounded-start"
            alt={book?.title}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{book?.title}</h5>
            <p className="card-text">
              Author: {book?.first_name} {book?.last_name}
            </p>
            <p className="card-text">
              <small className="text-muted">
                {type == "completed" ? "Completed" : "Added"} on:{" "}
                {book?.created_date}
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
