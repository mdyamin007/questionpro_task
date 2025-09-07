type PropsType = {
  username: string;
  email: string;
};

function UserInfo({ username, email }: PropsType) {
  return (
    <div className="absolute top-1 right-1 flex flex-col gap-2 text-right">
      <p className="text-blue-600">Hi {username}</p>
      <p className="text-sm text-gray-600">{email}</p>
    </div>
  );
}

export default UserInfo;
