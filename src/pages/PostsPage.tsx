import { useQuery } from "@tanstack/react-query";
import ListWithDropDown from "../components/common/ListWithDropDown";
import fetchPosts from "../api/fetchPosts";
import { useState } from "react";
import type { Post } from "../types/data.type";

function PostsPage() {
  const [userId] = useState<number>();

  const { data: posts } = useQuery({
    queryKey: ["posts", userId],
    queryFn: () => fetchPosts(userId),
  });

  return (
    <>
      <ListWithDropDown<Post> title="Posts" data={posts || []} />
    </>
  );
}

export default PostsPage;
