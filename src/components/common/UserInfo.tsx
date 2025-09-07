import { Link } from "react-router";
import { useUser } from "../../contexts/UserContext";

function UserInfo() {
  const { user } = useUser();

  return (
    <div className="absolute top-1 right-1 flex flex-col gap-2 text-right">
      <Link to="/user">
        <p className="text-blue-600">Hi {user?.username}</p>
      </Link>
      <p className="text-sm text-gray-600">{user?.email}</p>
    </div>
  );
}

export default UserInfo;
