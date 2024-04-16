export interface User {
  id: string;
  username: string;
  email: string;
  posts: string[];
  comments: string[];
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  comments: string[];
  categories: string[];
}

export interface PostComment {
  id: string;
  content: string;
  author: string;
  post: string;
}

export interface Category {
  id: string;
  name: string;
  posts: string[];
}
