import { useNavigate } from "react-router";

export default function AccountSettings({ user }) {
  const navigate = useNavigate();

  return (
    <div className="card border-primary mb-3">
      <div className="card-header text-white bg-dark">Profile Settings</div>
      <div className="card-body">
        <div className="mb-3 row">
          <label htmlFor="firstName" className="col-sm-2 col-form-label">
            First Name:
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              readOnly
              className="form-control-plaintext"
              id="firstName"
              value={user?.first_name}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="lastName" className="col-sm-2 col-form-label">
            Last Name:
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              readOnly
              className="form-control-plaintext"
              id="lastName"
              value={user?.last_name}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="username" className="col-sm-2 col-form-label">
            Username:
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              readOnly
              className="form-control-plaintext"
              id="username"
              value={user?.username}
            />
          </div>
        </div>
        <div className="input-group mb-3 justify-content-md-end">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => {
              navigate(`/account/${user?.id}/update-profile`);
            }}
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}
