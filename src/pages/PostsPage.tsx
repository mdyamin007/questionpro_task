import { useQuery } from "@tanstack/react-query";
import ListWithDropDown from "../components/common/ListWithDropDown";
import fetchPosts from "../api/fetchPosts";
import { useMemo, useState } from "react";
import type { Post } from "../types/data.type";
import { fetchUsers } from "../api/fetchUsers";
import { MySelect, type Option } from "../components/ui/MySelect";

function PostsPage() {
  const [userId, setUserId] = useState<number>();

  const { data: posts } = useQuery({
    queryKey: ["posts", userId],
    queryFn: () => fetchPosts(userId),
  });

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const userOptions: Option[] = useMemo(() => {
    return (
      users?.map((u) => ({
        label: u.name,
        value: u.id.toString(),
      })) || []
    );
  }, [users]);

  const handleUserChange = (value: string) => {
    setUserId(Number(value));
  };

  return (
    <>
      <ListWithDropDown<Post>
        title="Posts"
        data={posts || []}
        selectDropdown={
          <MySelect
            options={userOptions}
            value={userId?.toString()}
            onChange={handleUserChange}
            placeholder="Select a User"
            emptyText="No users available"
          />
        }
      />
    </>
  );
}

export default PostsPage;
