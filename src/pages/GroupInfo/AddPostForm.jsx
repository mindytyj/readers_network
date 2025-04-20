import { useAtomValue } from "jotai";
import { useState } from "react";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";
import TopicSelector from "./TopicSelector";

export default function AddPostForm({
  groupId,
  showPostModal,
  postUpdate,
  setPostUpdate,
}) {
  const user = useAtomValue(userAtom);
  const [post, setPost] = useState({
    postTitle: "",
    postTopic: "",
    postContent: "",
  });
  const [error, setError] = useState("");

  function handleChange(evt) {
    setPost({ ...post, [evt.target.name]: evt.target.value });
    setError("");
  }

  async function handleSubmit(evt) {
    evt.preventDefault();

    if (post.postTitle === "" || post.postContent === "") {
      setError("Please fill in the required fields and try again.");
      return;
    }

    try {
      setPostUpdate(false);

      const postData = { ...post };

      await requestHandler(
        `/api/discussions/${groupId}/posts/add/${user?.id}`,
        "POST",
        {
          postData,
        }
      );

      showPostModal();
      setPost({
        postTitle: "",
        postTopic: "",
        postContent: "",
      });
      setPostUpdate(true);
    } catch (err) {
      setError("Unable to create new post. Please try again later.");
    }
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="postTitle" className="form-label">
          Title <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className="form-control"
          id="postTitle"
          name="postTitle"
          onChange={handleChange}
          value={post.postTitle}
          required
        />
      </div>
      <TopicSelector
        groupId={groupId}
        post={post}
        setPost={setPost}
        postUpdate={postUpdate}
        setError={setError}
      />
      <div className="mb-3">
        <label htmlFor="postContent" className="form-label">
          Content <span className="text-danger">*</span>
        </label>
        <textarea
          className="form-control"
          id="postContent"
          name="postContent"
          rows="8"
          onChange={handleChange}
          value={post.postContent}
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
