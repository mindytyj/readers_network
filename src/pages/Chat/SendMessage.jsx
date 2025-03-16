import { useState } from "react";

export default function SendMessage(convoID) {
  const [disabled, setDisabled] = useState(true);
  const [sentMessage, setSentMessage] = useState("");

  function handleChange(evt) {
    setSentMessage({ ...sentMessage, [evt.target.name]: evt.target.value });

    if (evt.target.value != "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className="mb-3 mx-3 row d-flex justify-content-center">
        <label htmlFor="comment" className="form-label"></label>
        <div className="col-sm-10">
          <input
            className="form-control"
            type="text"
            id="comment"
            placeholder="Message"
            name="comment"
            onChange={handleChange}
          ></input>
        </div>
        <div className="col-auto">
          <button
            id="commentButton"
            type="submit"
            className="btn btn-primary btn-sm"
            disabled={disabled}
          >
            <i class="bi bi-send-fill"></i>
          </button>
        </div>
      </div>
      <div className="input-group mb-3 me justify-content-md-end"></div>
    </form>
  );
}
