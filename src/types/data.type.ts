export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export type Comment = {
  id: number;
  name: string;
  email: string;
  body: string;
  postId: number;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type StaticUser = {
  username: string;
  email: string;
};
