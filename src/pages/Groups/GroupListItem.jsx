import { Link } from "react-router";
import dayjs from "dayjs";

export default function GroupListItem({ group }) {
  function formatDate(date) {
    return dayjs(date).format("DD MMMM YYYY hh:mm A");
  }

  return (
    <Link
      to={`/groups/${group.id}`}
      className="list-group-item bg-primary-subtle border-white list-group-item-action"
    >
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{group.group_name}</h5>
        <small className="text-body-secondary">
          Created on {formatDate(group.created_date)}
        </small>
      </div>
      <p className="mb-1 text-truncate">{group.group_description}</p>
      <small className="text-body-secondary">{group.members} member(s)</small>
    </Link>
  );
}
