import MyTextInput from "../components/ui/MyTextInput";
import { useUser } from "../contexts/UserContext";

function ProfilePage() {
  const { user, setUser } = useUser();

  return (
    <div className="flex flex-col">
      <h2 className="text-xl my-4">Profile</h2>

      <div className="flex flex-col gap-2">
        <MyTextInput
          label="Username"
          value={user?.username}
          onChange={(e) => setUser({ username: e.target.value })}
        />
        <MyTextInput
          label="Email"
          value={user?.email}
          onChange={(e) => setUser({ email: e.target.value })}
        />
      </div>
    </div>
  );
}

export default ProfilePage;
