import AddBookButton from "./AddBookButton";

export default function BookResult({ bookResult, setError, type }) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-start">
      <div className="ms-2 me-auto">
        <div className="fw-bold">{bookResult?.title}</div>
        <div>
          Author: {bookResult?.first_name} {bookResult?.last_name}
        </div>
        <div>ISBN: {bookResult?.isbn}</div>
        <div>Publication Date: {bookResult?.publication_date}</div>
      </div>
      <span
        data-bs-toggle="tooltip"
        data-bs-placement="left"
        title="Add to Reading Tracker"
      >
        <AddBookButton
          bookResult={bookResult}
          setError={setError}
          type={type}
        />
      </span>
    </li>
  );
}
