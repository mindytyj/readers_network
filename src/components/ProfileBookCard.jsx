export default function ProfileBookCard({ book, message }) {
  return (
    <div className="card">
      <img src={book?.image_url} className="card-img-top" alt={book?.title} />
      <div className="card-body">
        <h5 className="card-title">{book?.title}</h5>
        <p className="card-text">
          Author: {book?.first_name} {book?.last_name}
        </p>
      </div>
      <div className="card-footer text-white bg-dark">
        <small>${message} on: </small>
      </div>
    </div>
  );
}
