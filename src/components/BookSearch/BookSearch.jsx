import { useEffect, useState } from "react";
import { searchBook } from "../../handlers/api-requests";

export default function BookSearch({ setBook, setError }) {
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
    <form className="d-flex justify-content-md-end" onSubmit={handleSubmit}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search Title"
        aria-label="Search"
        id="bookTitle"
        name="bookTitle"
      />
      <button className="btn btn-primary btn-sm" type="submit">
        Search
      </button>
    </form>
  );
}
