import BookSearch from "../../components/BookSearch/BookSearch";

export default function BookSearchNav({ setBook, setError, type }) {
  return (
    <nav className="navbar navbar-light bg-light mb-4">
      <div className="container-fluid">
        <BookSearch setBook={setBook} setError={setError} />
      </div>
    </nav>
  );
}
