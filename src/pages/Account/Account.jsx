import { useAtomValue } from "jotai";
import { userAtom } from "../../handlers/userAtom";
import { useNavigate, useParams } from "react-router";
import AccountSettings from "./AccountSettings";
import ReadingTracker from "../ReadingTracker/ReadingTracker";

export default function Account() {
  const user = useAtomValue(userAtom);
  const { userId } = useParams();
  const navigate = useNavigate();

  if (!user || user.id !== parseInt(userId)) {
    navigate("/");
  }

  return (
    <div className="container-fluid mt-4 mb-3">
      <div className="d-flex align-items-start">
        <div
          className="nav flex-column nav-pills me-3"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <button
            className="nav-link active"
            id="v-pills-profile-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-profile"
            type="button"
            role="tab"
            aria-controls="v-pills-profile"
            aria-selected="true"
          >
            Profile
          </button>
          <button
            className="nav-link"
            id="v-pills-friends-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-friends"
            type="button"
            role="tab"
            aria-controls="v-pills-friends"
            aria-selected="false"
          >
            Friends
          </button>
          <button
            className="nav-link"
            id="v-pills-messages-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-messages"
            type="button"
            role="tab"
            aria-controls="v-pills-messages"
            aria-selected="false"
          >
            Messages
          </button>
          <button
            className="nav-link"
            id="v-pills-settings-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-settings"
            type="button"
            role="tab"
            aria-controls="v-pills-settings"
            aria-selected="false"
          >
            Settings
          </button>
        </div>
        <div className="tab-content container" id="v-pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="v-pills-profile"
            role="tabpanel"
            aria-labelledby="v-pills-profile-tab"
          >
            <ReadingTracker />
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-friends"
            role="tabpanel"
            aria-labelledby="v-pills-friends-tab"
          >
            ...
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-messages"
            role="tabpanel"
            aria-labelledby="v-pills-messages-tab"
          >
            ...
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-settings"
            role="tabpanel"
            aria-labelledby="v-pills-settings-tab"
          >
            <AccountSettings user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
