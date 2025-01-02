import { useAtomValue } from "jotai";
import { useState } from "react";
import { postAtom } from "../../handlers/postAtom";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";

export default function AddComment({ setCommentUpdate }) {
  const [comment, setComment] = useState({
    comment: "",
  });
  const [disabled, setDisabled] = useState(true);
  const post = useAtomValue(postAtom);
  const user = useAtomValue(userAtom);

  function handleChange(evt) {
    setComment({ ...comment, [evt.target.name]: evt.target.value });

    if (evt.target.value != "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      setCommentUpdate(false);

      const commentData = { ...comment };
      await requestHandler(
        `/api/feed/${user?.id}/comments/add/${post?.id}`,
        "POST",
        {
          commentData,
        }
      );

      setCommentUpdate(true);
    } catch (err) {
      console.error("Unable to add comment.");
    }
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="comment" className="form-label"></label>
        <input
          className="form-control"
          type="text"
          id="comment"
          placeholder="Add Comment"
          name="comment"
          onChange={handleChange}
        ></input>
      </div>
      <div className="input-group mb-3 justify-content-md-end">
        <button
          id="commentButton"
          type="submit"
          className="btn btn-primary btn-sm"
          disabled={disabled}
        >
          Comment
        </button>
      </div>
    </form>
  );
}
