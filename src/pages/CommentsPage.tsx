import { useQuery } from "@tanstack/react-query";
import fetchComments from "../api/fetchComments";
import { useMemo, useState } from "react";
import type { Comment } from "../types/data.type";
import fetchPosts from "../api/fetchPosts";
import { MySelect, type Option } from "../components/ui/MySelect";
import { queryClient } from "../main";
import ListWithFilter from "../components/common/ListWithFilter";

function CommentsPage() {
  const [postId, setPostId] = useState<number | null>();

  const { data: comments, isPending } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
  });

  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
  });

  const postOptions: Option[] = useMemo(() => {
    return [
      {
        label: "All",
        value: "all",
      },
      ...(posts?.map((p) => ({
        label: p.title,
        value: p.id.toString(),
      })) || []),
    ];
  }, [posts]);

  const handlePostChange = (value: string) => {
    if (value === "all") {
      setPostId(null);
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      return;
    }
    setPostId(Number(value));
  };

  return (
    <>
      <ListWithFilter<Comment>
        title="Comments"
        data={comments || []}
        loading={isPending}
        selectDropdown={
          <MySelect
            options={postOptions}
            defaultValue="all"
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
