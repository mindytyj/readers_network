import { useEffect, useState } from "react";
import { useParams } from "react-router";
import requestHandler from "../../handlers/request-handler";
import ProfileCompletedBooks from "./ProfileCompletedBooks";
import ProfileBooksInProgress from "./ProfileBooksInProgress";
import ProfileBooksToRead from "./ProfileBooksToRead";

export default function UserProfile() {
  const { profileId } = useParams();
  const [userProfile, setUserProfile] = useState([]);

  useEffect(() => {
    async function getUserProfile() {
      try {
        const profile = await requestHandler(
          `/api/users/profile/${profileId}`,
          "GET"
        );

        setUserProfile(profile);
      } catch {
        console.error("Failed to retrieve user profile.");
      }
    }
    getUserProfile();
  }, [profileId]);

  return (
    <div className="card border-primary mb-3">
      <div className="card-header text-white bg-dark">
        {userProfile.first_name} {userProfile.last_name}'s Profile
      </div>
      <div className="card-body">
        <ProfileBooksInProgress />
        <ProfileCompletedBooks />
        <ProfileBooksToRead />
      </div>
    </div>
  );
}
