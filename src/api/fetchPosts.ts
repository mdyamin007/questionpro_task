import type { Post } from "../types/data.type";

const fetchPosts = async (userId?: number): Promise<Post[]> => {
  const url = userId
    ? `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    : `https://jsonplaceholder.typicode.com/posts`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Error fetching posts");
  }
  return response.json();
};

export default fetchPosts;
