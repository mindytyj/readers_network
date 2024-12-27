import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { userAtom } from "../../handlers/userAtom";
import BookSearchNav from "./BookSearchNav";
import BookResult from "./BookResult";

export default function AddReadingTracker() {
  const { userId, type } = useParams();
  const user = useAtomValue(userAtom);
  const [book, setBook] = useState({ bookTitle: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="container mt-4 mb-3">
      <div className="card border-primary mb-3">
        <div className="card-header text-white bg-dark">
          Add Book(s) to{" "}
          {type == "completed" ? "Books Completed" : "Books In-Progress"}
        </div>
        <div className="card-body">
          <BookSearchNav setBook={setBook} setError={setError} type={type} />
          <ol className="list-group list-group-numbered mb-4">
            {book?.length > 0 ? (
              book.map((bookResult) => {
                return (
                  <div>
                    <BookResult
                      bookResult={bookResult}
                      setError={setError}
                      type={type}
                    />
                  </div>
                );
              })
            ) : (
              <div className="d-flex justify-content-center">
                <h6 className="">No search results.</h6>
              </div>
            )}
          </ol>
          <div className="input-group mb-3 justify-content-md-end">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                navigate(`/account/${userId}`);
              }}
            >
              Back
            </button>
          </div>
          <div className="input-group mb-3 justify-content-md-center">
            <small className="text-danger text-center">{error}</small>
          </div>
        </div>
      </div>
    </div>
  );
}
