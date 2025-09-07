import { useQuery } from "@tanstack/react-query";
import ListWithDropDown from "../components/common/ListWithDropDown";
import fetchComments from "../api/fetchComments";
import { useMemo, useState } from "react";
import type { Comment } from "../types/data.type";
import fetchPosts from "../api/fetchPosts";
import { MySelect, type Option } from "../components/ui/MySelect";

function CommentsPage() {
  const [postId, setPostId] = useState<number>(1);

  const { data: comments } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
  });

  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
  });

  const postOptions: Option[] = useMemo(() => {
    return (
      posts?.map((p) => ({
        label: p.title,
        value: p.id.toString(),
      })) || []
    );
  }, [posts]);

  const handlePostChange = (value: string) => {
    setPostId(Number(value));
  };

  return (
    <>
      <ListWithDropDown<Comment>
        title="Comments"
        data={comments || []}
        selectDropdown={
          <MySelect
            options={postOptions}
            onChange={handlePostChange}
            placeholder="Select a post"
            emptyText="No posts found"
          />
        }
      />
    </>
  );
}

export default CommentsPage;
