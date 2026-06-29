import data from "../api/friends.json";
import { ProfileCard } from "./profileCard";

export const ProfileSeries = (props) => {
  const profiles = props.filteredProfiles || data;
  return (
    <div className="profile-series">
      {profiles.length > 0 ? (
        profiles.map((curelm, index) => (
          <ProfileCard key={`${curelm.id}-${index}`} curelm={curelm} onConnect={props.onConnect} />
        ))
      ) : (
        <div className="no-results">
          <p>No profiles found. Try a different search.</p>
        </div>
      )}
    </div>
  );
};
