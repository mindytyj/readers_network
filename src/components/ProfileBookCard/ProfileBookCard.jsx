export default function ProfileBookCard({ book, type }) {
  return (
    <div class="card mb-3" style={{ maxWidth: 500 }}>
      <div class="row g-0">
        <div class="col-md-4">
          <img
            src={book?.image_url}
            class="img-fluid rounded-start"
            alt={book?.title}
          />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{book?.title}</h5>
            <p class="card-text">
              Author: {book?.first_name} {book?.last_name}
            </p>
            <p class="card-text">
              <small class="text-muted">
                {type == "completed" ? "Completed" : "Added"} on:{" "}
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
