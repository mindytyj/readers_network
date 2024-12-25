import { useEffect, useState } from "react";
import { searchBook } from "../../handlers/api-requests";

export default function BookSearch({ setBook, setError, type }) {
  const [search, setSearch] = useState({ bookTitle: "" });

  useEffect(() => {
    if (search.bookTitle == "") {
      return;
    }

    performSearch();
  }, [search]);

  async function performSearch() {
    try {
      const bookResult = await searchBook(search);
      setBook(bookResult);
    } catch {
      setError("Unable to search for the given book title.");
    }
  }

  async function handleSubmit(evt) {
    evt.preventDefault();

    const searchInput = document.getElementById("bookTitle").value;

    setSearch({ bookTitle: searchInput });
  }

  return (
    <nav className="navbar navbar-light bg-light mb-4">
      <div className="container-fluid">
        <form className="d-flex justify-content-md-end" onSubmit={handleSubmit}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            id="bookTitle"
            name="bookTitle"
          />
          <button className="btn btn-primary btn-sm" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}
