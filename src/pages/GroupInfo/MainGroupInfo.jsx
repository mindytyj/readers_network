import { useAtomValue } from "jotai";
import { useNavigate } from "react-router";
import { groupAtom } from "../../handlers/groupAtom";
import { userAtom } from "../../handlers/userAtom";
import JoinStatusButton from "./JoinStatusButton";

export default function MainGroupInfo({ groupId, setJoinStatusUpdate }) {
  const group = useAtomValue(groupAtom);
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();

  return (
    <div className="d-flex align-items-center">
      <div className="flex-shrink-0">
        {/* <img src="..." className="img-thumbnail" alt="..." /> */}
      </div>
      <div className="flex-grow-1 ms-5">
        <div>
          <h5>{group.group_name}</h5>
          <p>{group.members} members</p>
        </div>
        {user ? (
          <JoinStatusButton
            groupId={groupId}
            setJoinStatusUpdate={setJoinStatusUpdate}
          />
        ) : (
          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigate("/login")}
          >
            <i className="bi bi-person-fill-add text-white"></i> Join Group
          </button>
        )}
      </div>
    </div>
  );
}
