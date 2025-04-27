import { Link } from "react-router";

export default function TrackerAddButton({ userId, type }) {
  return (
    <Link to={`/account/${userId}/reading-tracker/${type}/add`}>
      <i className="bi bi-plus-circle-fill text-primary"></i>
    </Link>
  );
}
