import { useAtomValue } from "jotai";
import { useNavigate } from "react-router";
import { groupAtom } from "../../handlers/groupAtom";
import { userAtom } from "../../handlers/userAtom";
import JoinStatusButton from "./JoinStatusButton";

export default function MainGroupInfo({
  groupId,
  joinStatusUpdate,
  setJoinStatusUpdate,
}) {
  const group = useAtomValue(groupAtom);
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();

  return (
    <div className="d-flex align-items-center">
      <div>
        <div>
          <h5>{group.group_name}</h5>
          <p>{group.members} member(s)</p>
        </div>
        {user ? (
          <JoinStatusButton
            groupId={groupId}
            joinStatusUpdate={joinStatusUpdate}
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
