import { useState } from "react";
import requestHandler from "../../handlers/request-handler";

export default function ManageGroupForm({
  groupDetails,
  setGroupDetails,
  showManageGroupModal,
  setGroupUpdate,
}) {
  const [error, setError] = useState("");

  function handleChange(evt) {
    setGroupDetails({ ...groupDetails, [evt.target.name]: evt.target.value });
    setError("");
  }

  async function handleSubmit(evt) {
    evt.preventDefault();

    setGroupUpdate(false);

    try {
      const groupData = { ...groupDetails };

      await requestHandler(`/api/groups/edit/${groupDetails?.id}`, "PUT", {
        groupData,
      });

      showManageGroupModal();

      setGroupUpdate(true);
    } catch (err) {
      setError("Unable to update group information. Please try again later.");
    }
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="group_name" className="form-label">
          Group Name <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className="form-control"
          id="group_name"
          name="group_name"
          value={groupDetails?.group_name || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="group_description" className="form-label">
          Group Description <span className="text-danger">*</span>
        </label>
        <textarea
          className="form-control"
          id="group_description"
          name="group_description"
          value={groupDetails?.group_description || ""}
          rows="5"
          onChange={handleChange}
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
