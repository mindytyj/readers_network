import { useEffect, useState } from "react";
import { useParams } from "react-router";
import requestHandler from "../../handlers/request-handler";
import ProfileCompletedBooks from "./ProfileCompletedBooks";
import ProfileBooksInProgress from "./ProfileBooksInProgress";
import ProfileBooksToRead from "./ProfileBooksToRead";
import AddFriendButton from "./AddFriendButton";

export default function Profiles() {
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState([]);

  useEffect(() => {
    async function getUserProfile() {
      try {
        const profile = await requestHandler(
          `/api/users/profile/${userId}`,
          "GET"
        );

        setUserProfile(profile);
      } catch {
        console.error("Failed to retrieve user profile.");
      }
    }
    getUserProfile();
  });

  return (
    <div className="card border-primary mb-3">
      <div className="card-header text-white bg-dark">
        <div className="row mb-2">
          <div className="col">
            <h5>
              {userProfile.first_name} {userProfile.last_name}'s Profile
            </h5>
          </div>
          <div className="col d-flex justify-content-md-end">
            <h5>
              <AddFriendButton friendId={userProfile.id} />
            </h5>
          </div>
        </div>
      </div>
      <div className="card-body">
        <ProfileBooksInProgress />
        <ProfileCompletedBooks />
        <ProfileBooksToRead />
      </div>
    </div>
  );
}
