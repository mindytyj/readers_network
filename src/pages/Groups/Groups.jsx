import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";
import AddGroupModal from "./AddGroupModal";
import GroupAddButton from "./GroupAddButton";
import GroupListItem from "./GroupListItem";
import GroupSearch from "./GroupSearch";

export default function Groups() {
  const user = useAtomValue(userAtom);
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState("");
  const [groupModal, setGroupModal] = useState(false);
  const [groupUpdate, setGroupUpdate] = useState(false);

  useEffect(() => {
    async function getGroups() {
      try {
        const groupList = await requestHandler(`/api/groups`, "GET");

        setGroups(groupList);
      } catch {
        console.error("Failed to retrieve groups.");
      }
    }
    getGroups();
  }, [groupUpdate]);

  return (
    <div className="container mt-4 mb-4">
      <div className="row mb-3">
        <div className="col">
          <h4>Community Created Groups</h4>
        </div>
        <div className="col-md-4">
          <GroupSearch setGroup={setGroups} setError={setError} />
        </div>
      </div>
      <div className="mb-3">
        {user ? (
          <GroupAddButton
            groupModal={groupModal}
            setGroupModal={setGroupModal}
          />
        ) : (
          ""
        )}
      </div>
      <div className="list-group overflow-y-auto groupsContainer rounded-0 border border-primary">
        {groups?.length > 0 ? (
          groups.map((group) => {
            return (
              <div key={group?.id}>
                <GroupListItem group={group} groupCount={groups.length} />
              </div>
            );
          })
        ) : (
          <div className="d-flex justify-content-center mt-4">
            <h6 className="">No groups found.</h6>
          </div>
        )}
      </div>
      <AddGroupModal
        groupModal={groupModal}
        setGroupModal={setGroupModal}
        setGroupUpdate={setGroupUpdate}
      />
    </div>
  );
}
