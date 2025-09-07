import { useQuery } from "@tanstack/react-query";
import ListWithDropDown from "../components/common/ListWithDropDown";
import fetchComments from "../api/fetchComments";
import { useState } from "react";
import type { Comment } from "../types/data.type";

function CommentsPage() {
  const [postId] = useState<number>(1);

  const { data: comments } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
  });

  return (
    <>
      <ListWithDropDown<Comment> title="Comments" data={comments || []} />
    </>
  );
}

export default CommentsPage;
