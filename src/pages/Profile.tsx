import { useParams } from "react-router-dom";

const Profile = () => {
  const { username } = useParams<{ username: string }>();

  return (
    <div className="text-white">
      <h1>Profile Page</h1>
      <p>Username: {username}</p>
    </div>
  );
};

export default Profile;
