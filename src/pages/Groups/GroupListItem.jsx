import { Link } from "react-router";

export default function GroupListItem({ group }) {
  return (
    <Link
      to={`/groups/${group.id}`}
      className="list-group-item list-group-item-action"
    >
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{group.group_name}</h5>
        <small className="text-body-secondary">
          Created on {group.created_date}
        </small>
      </div>
      <p className="mb-1 text-truncate">{group.group_description}</p>
      <small className="text-body-secondary">{group.members} members</small>
    </Link>
  );
}
