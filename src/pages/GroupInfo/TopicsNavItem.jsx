export default function TopicsNavItem({ topic }) {
  return (
    <a
      className="list-group-item list-group-item-action"
      href={`#topic-${topic.id}`}
    >
      {topic.topic_name}
    </a>
  );
}
