import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import { useSetAtom } from "jotai";
import { userAtom } from "../../handlers/userAtom";
import * as usersTokenHandlers from "../../handlers/users-token-handlers";

export default function AccountUpdate({ userState }) {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    firstName: userState?.first_name,
    lastName: userState?.last_name,
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

    if (
      userInfo.firstName == userState?.first_name &&
      userInfo.lastName == userState?.last_name &&
      userInfo.password == ""
    ) {
      setError("Profile details have no changes made.");
      return;
    }

    if (userInfo.password !== userInfo.confirmPW) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const userData = { ...userInfo };
      console.log(userData);
      if (userInfo.password == "") {
        delete userData.password;
      }
      delete userData.confirmPW;
      const user = await usersTokenHandlers.updateProfile(userId, userData);
      setUser(user);

      if (user) {
        navigate(`/account/${userId}`);
      }
    } catch (err) {
      console.log(err.message);
      setError("Unable to update profile. Please try again");
    }
  }

  return (
    <div className="container-fluid mt-3">
      <div className="card border-primary mb-3">
        <div className="card-header">Update Profile</div>
        <div className="card-body">
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="mb-3 row">
              <label htmlFor="firstName" className="col-sm-2 col-form-label">
                First Name <span className="text-danger">*</span>
              </label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  aria-label="first name"
                  name="firstName"
                  value={userInfo.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="lasttName" className="col-sm-2 col-form-label">
                Last Name <span className="text-danger">*</span>
              </label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  aria-label="last name"
                  name="lastName"
                  value={userInfo.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="username" className="col-sm-2 col-form-label">
                Username
              </label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  aria-label="username"
                  name="username"
                  value={userState?.username}
                  readOnly
                  disabled
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="password" className="col-sm-2 col-form-label">
                Password
              </label>
              <div className="col-sm-7">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  aria-label="password"
                  name="password"
                  minLength={8}
                  maxLength={20}
                  value={userInfo.password}
                  onChange={handleChange}
                />
              </div>
              <div className="col-auto">
                <span className="form-text">Must be 8-20 characters long.</span>
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="confirmPW" className="col-sm-2 col-form-label">
                Confirm Password
              </label>
              <div className="col-sm-7">
                <input
                  type="password"
                  className="form-control"
                  id="confirmPW"
                  aria-label="confirm password"
                  name="confirmPW"
                  minLength={8}
                  maxLength={20}
                  value={userInfo.confirmPW}
                  onChange={handleChange}
                />
              </div>
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
        </div>
      </div>
    </div>
  );
}
