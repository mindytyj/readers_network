import { Link } from "react-router";

export default function TopicItem({ groupId, topicId, post }) {
  return (
    <Link
      to={`/groups/${groupId}/topic/${topicId}/${post.id}`}
      className="text-decoration-none text-dark"
    >
      <div className="list-group-item list-group-item-action">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-2">{post.sub_topic_title}</h5>
          <small>{post.topic_name}</small>
        </div>
        <p className="text-truncate mb-2">{post.sub_topic_description}</p>
        <small className="mb-2">{post.comments} comment(s)</small>
        <div className="row"></div>
      </div>
    </Link>
  );
}
