import { useState } from "react";
import * as usersTokenHandlers from "../../handlers/users-token-handlers";
import { useSetAtom } from "jotai";
import { userAtom } from "../../handlers/userAtom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

export default function LoginForm() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const setUser = useSetAtom(userAtom);

  function handleChange(evt) {
    setUserInfo({ ...userInfo, [evt.target.name]: evt.target.value });
    setError("");
  }

  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      const user = await usersTokenHandlers.login(userInfo);
      setUser(user);
    } catch {
      setError("Username or password is incorrect. Please try again.");
    }
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className="input-group mb-3">
        <span className="input-group-text">
          <FontAwesomeIcon icon="fa-solid fa-user" />
        </span>
        <span className="input-group-text">Username</span>
        <input
          type="text"
          className="form-control"
          aria-label="username"
          name="username"
          value={userInfo.username}
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text">
          <FontAwesomeIcon icon="fa-solid fa-lock" />
        </span>
        <span className="input-group-text">Password</span>
        <input
          type="password"
          className="form-control"
          aria-label="password"
          name="password"
          value={userInfo.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-group mb-3 justify-content-md-end">
        <button type="submit" className="btn btn-primary btn-sm">
          Login
        </button>
      </div>
      <div className="input-group mb-3 justify-content-md-center">
        <small className="text-danger text-center">{error}</small>
      </div>
    </form>
  );
}
