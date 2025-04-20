import { useEffect, useState } from "react";
import requestHandler from "../../handlers/request-handler";

export default function TopicSelector({
  groupId,
  post,
  setPost,
  postUpdate,
  setError,
}) {
  const [options, setOptions] = useState({});

  useEffect(() => {
    async function getTopicOptions() {
      try {
        const topicOptions = await requestHandler(
          `/api/discussions/${groupId}`,
          "GET"
        );

        setOptions(topicOptions);
        setPost({ ...post, ["postTopic"]: topicOptions[0]?.id });
      } catch {
        console.error("Failed to retrieve group discussion topic options.");
      }
    }
    getTopicOptions();
  }, [postUpdate]);

  function handleChange(evt) {
    setPost({ ...post, [evt.target.name]: evt.target.value });
    setError("");
  }

  return (
    <div className="mb-3">
      <label htmlFor="postTopic" className="form-label">
        Discussion Topic <span className="text-danger">*</span>
      </label>
      <select
        className="form-select"
        aria-label="Select post topic"
        id="postTopic"
        name="postTopic"
        onChange={handleChange}
        defaultValue={options[0]?.id}
        value={post.postTopic}
      >
        {options?.length > 0
          ? options.map((option) => {
              return (
                <option key={option?.id} value={option.id}>
                  {option.topic_name}
                </option>
              );
            })
          : ""}
      </select>
    </div>
  );
}
