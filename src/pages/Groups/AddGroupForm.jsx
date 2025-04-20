import { useAtomValue } from "jotai";
import { useState } from "react";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";

export default function AddGroupForm({ showGroupModal, setGroupUpdate }) {
  const user = useAtomValue(userAtom);
  const [groupInfo, setGroupInfo] = useState({
    groupName: "",
    groupDesc: "",
  });
  const [error, setError] = useState("");

  function handleChange(evt) {
    setGroupInfo({ ...groupInfo, [evt.target.name]: evt.target.value });
    setError("");
  }

  async function handleSubmit(evt) {
    evt.preventDefault();

    setGroupUpdate(false);

    if (groupInfo.groupName === "" || groupInfo.groupDesc === "") {
      setError("Please fill in the required fields and try again.");
      return;
    }

    try {
      const groupData = { ...groupInfo };

      await requestHandler(`/api/groups/add/${user.id}`, "POST", {
        groupData,
      });

      showGroupModal();
      setGroupInfo({
        groupName: "",
        groupDesc: "",
      });
      setGroupUpdate(true);
    } catch (err) {
      setError("Unable to add group. Please try again later.");
    }
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="groupName" className="form-label">
          Group Name <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className="form-control"
          id="groupName"
          name="groupName"
          onChange={handleChange}
          value={groupInfo.groupName}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="groupDesc" className="form-label">
          Group Description <span className="text-danger">*</span>
        </label>
        <textarea
          className="form-control"
          id="groupDesc"
          name="groupDesc"
          rows="3"
          onChange={handleChange}
          value={groupInfo.groupDesc}
          required
        ></textarea>
      </div>
      <div className="input-group mb-3 justify-content-md-end">
        <button type="submit" className="btn btn-primary btn-sm">
          Save
        </button>
      </div>
      <div className="input-group mb-3 justify-content-md-center">
        <small className="text-danger text-center">{error}</small>
      </div>
    </form>
  );
}
