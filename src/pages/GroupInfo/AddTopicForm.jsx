import { useAtomValue } from "jotai";
import { useState } from "react";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";

export default function AddTopicForm({
  groupId,
  showTopicModal,
  setTopicUpdate,
}) {
  const user = useAtomValue(userAtom);
  const [topicName, setTopicName] = useState("");
  const [error, setError] = useState("");

  function handleChange(evt) {
    setTopicName(evt.target.value);
    setError("");
  }

  async function handleSubmit(evt) {
    evt.preventDefault();

    if (topicName === "") {
      setError("Please fill in the required fields and try again.");
      return;
    }

    try {
      setTopicUpdate(false);

      const topicData = topicName;

      await requestHandler(`/api/discussions/${groupId}/add`, "POST", {
        topicData,
      });

      showTopicModal();
      setTopicName("");
      setTopicUpdate(true);
    } catch (err) {
      setError("There is an existing topic with the same name.");
    }
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="topicName" className="form-label">
          Topic Name <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className="form-control"
          id="topicName"
          name="topicName"
          onChange={handleChange}
          value={topicName}
          required
        />
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
