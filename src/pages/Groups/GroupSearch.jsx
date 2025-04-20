import { useEffect, useState } from "react";
import { searchGroup } from "../../handlers/api-requests";

export default function GroupSearch({ setGroup, setError }) {
  const [search, setSearch] = useState({ groupSearch: "" });

  useEffect(() => {
    if (search.groupSearch === "") {
      return;
    }

    performSearch();
  }, [search]);

  async function performSearch() {
    try {
      const groupResult = await searchGroup(search);
      setGroup(groupResult);
    } catch {
      setError("Unable to search for the given group name or description.");
    }
  }

  async function handleSubmit(evt) {
    evt.preventDefault();

    const searchInput = document.getElementById("groupSearch").value;

    setSearch({ groupSearch: searchInput });
  }

  return (
    <form className="d-flex justify-content-md-end" onSubmit={handleSubmit}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search Group Name or Description"
        aria-label="Search"
        id="groupSearch"
        name="groupSearch"
      />
      <button className="btn btn-primary btn-sm" type="submit">
        Search
      </button>
    </form>
  );
}
