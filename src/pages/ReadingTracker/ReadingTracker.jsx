import BooksInProgress from "./BooksInProgress";
import BooksToRead from "./BooksToRead";
import CompletedBooks from "./CompletedBooks";

export default function ReadingTracker() {
  return (
    <div className="card border-primary mb-3">
      <div className="card-header text-white bg-dark">My Profile</div>
      <div className="card-body">
        <BooksInProgress />
        <CompletedBooks />
        <BooksToRead />
      </div>
    </div>
  );
}
