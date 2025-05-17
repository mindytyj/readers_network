import { useAtomValue } from "jotai";
import { useState } from "react";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";

export default function AddComment({ postId, setCommentUpdate }) {
  const [comment, setComment] = useState({
    comment: "",
  });
  const [disabled, setDisabled] = useState(true);
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
        `/api/feed/${user?.id}/comments/add/${postId}`,
        "POST",
        {
          commentData,
        }
      );

      setComment({ comment: "" });
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
          value={comment.comment}
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
