import { useNavigate } from "react-router";

export default function TrackerAddButton({ userId, type }) {
  const navigate = useNavigate();

  return (
    <i
      className="bi bi-plus-circle-fill text-primary"
      onClick={() => {
        navigate(`/account/${userId}/reading-tracker/${type}/add`);
      }}
    ></i>
  );
}
