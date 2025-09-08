import type { Comment } from "../types/data.type";

const fetchComments = async (postId?: number | null): Promise<Comment[]> => {
  const url = postId
    ? `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    : `https://jsonplaceholder.typicode.com/comments`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Error fetching posts");
  }
  return response.json();
};

export default fetchComments;
