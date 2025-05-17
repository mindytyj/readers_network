import { useParams } from "react-router";
import AddFriendButton from "./AddFriendButton";
import UserProfile from "./UserProfile";

export default function Profiles() {
  const { profileId } = useParams();

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
            <AddFriendButton friendId={profileId} />
          </button>
        </div>
        <div className="tab-content container" id="v-pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="v-pills-profile"
            role="tabpanel"
            aria-labelledby="v-pills-profile-tab"
          >
            <UserProfile />
          </div>
        </div>
      </div>
    </div>
  );
}
