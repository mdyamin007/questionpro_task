import { useQuery } from "@tanstack/react-query";
import fetchPosts from "../api/fetchPosts";
import { useMemo, useState } from "react";
import type { Post } from "../types/data.type";
import { MySelect, type Option } from "../components/ui/MySelect";
import { queryClient } from "../main";
import ListWithFilter from "../components/common/ListWithFilter";
import fetchUsers from "../api/fetchUsers";

function PostsPage() {
  const [userId, setUserId] = useState<number | null>();

  const { data: posts, isPending } = useQuery({
    queryKey: ["posts", userId],
    queryFn: () => fetchPosts(userId),
  });

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const userOptions: Option[] = useMemo(() => {
    return [
      {
        label: "All",
        value: "all",
      },
      ...(users?.map((u) => ({
        label: u.name,
        value: u.id.toString(),
      })) || []),
    ];
  }, [users]);

  const handleUserChange = (value: string) => {
    if (value === "all") {
      setUserId(null);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      return;
    }
    setUserId(Number(value));
  };

  return (
    <>
      <ListWithFilter<Post>
        title="Posts"
        data={posts || []}
        loading={isPending}
        selectDropdown={
          <MySelect
            options={userOptions}
            defaultValue="all"
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
