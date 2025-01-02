import { useAtomValue } from "jotai";
import { useState } from "react";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";

export default function AddPost({ setPostUpdate }) {
  const [post, setPost] = useState({
    post: "",
  });
  const [disabled, setDisabled] = useState(true);
  const user = useAtomValue(userAtom);

  function handleChange(evt) {
    setPost({ ...post, [evt.target.name]: evt.target.value });

    if (evt.target.value != "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      setPostUpdate(false);

      const postData = { ...post };

      await requestHandler(`/api/feed/add/${user?.id}`, "POST", {
        postData,
      });

      setPostUpdate(true);
    } catch (err) {
      console.error("Unable to add post. Please try again later.");
    }
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="post" className="form-label">
          Share to Feed
        </label>
        <textarea
          className="form-control"
          id="post"
          placeholder="What would you like to share?"
          name="post"
          rows="3"
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="input-group mb-3 justify-content-md-end">
        <button
          id="shareButton"
          type="submit"
          className="btn btn-primary btn-sm"
          disabled={disabled}
        >
          Share
        </button>
      </div>
    </form>
  );
}
