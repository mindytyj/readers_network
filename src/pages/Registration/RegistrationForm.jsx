import { useState } from "react";
import { register } from "../../handlers/users-api-requests";
import { useSetAtom } from "jotai";
import { userAtom } from "../../handlers/userAtom";

export default function RegistrationForm() {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPW: "",
  });
  const [error, setError] = useState("");
  const setUser = useSetAtom(userAtom);

  function handleChange(evt) {
    setUserInfo({ ...userInfo, [evt.target.name]: evt.target.value });
    setError("");
  }

  async function handleSubmit(evt) {
    evt.preventDefault();

    if (userInfo.password !== userInfo.confirmPW) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const userData = { ...userInfo };
      delete userData.confirmPW;
      const user = await register(userData);
      setUser(user);
    } catch {
      setError("Username is already taken.");
    }
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className="row mb-3">
        <div className="input-group">
          <label htmlFor="firstLastName" className="col-sm-2 col-form-label">
            First and Last Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            aria-label="first name"
            className="form-control"
            id="firstName"
            name="firstName"
            value={userInfo.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            aria-label="last name"
            className="form-control"
            id="lastName"
            name="lastName"
            value={userInfo.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="username" className="col-sm-2 col-form-label">
          Username <span className="text-danger">*</span>
        </label>
        <div className="col-sm-7">
          <input
            type="text"
            className="form-control"
            id="username"
            aria-label="username"
            name="username"
            value={userInfo.username}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="password" className="col-sm-2 col-form-label">
          Password <span className="text-danger">*</span>
        </label>
        <div className="col-sm-7">
          <input
            type="password"
            className="form-control"
            id="password"
            aria-label="password"
            name="password"
            value={userInfo.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-auto">
          <span className="form-text">Must be 8-20 characters long.</span>
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="confirmPW" className="col-sm-2 col-form-label">
          Confirm Password <span className="text-danger">*</span>
        </label>
        <div className="col-sm-7">
          <input
            type="password"
            className="form-control"
            id="confirmPW"
            aria-label="confirm password"
            name="confirmPW"
            value={userInfo.confirmPW}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="input-group mb-3 justify-content-md-end">
        <button type="submit" className="btn btn-primary btn-sm">
          Register
        </button>
      </div>
      <div className="input-group mb-3 justify-content-md-center">
        <small className="text-danger text-center">{error}</small>
      </div>
    </form>
  );
}
