import { User, Post, PostComment, Category } from "../types";

const fakeDatabase: {
  users: User[];
  posts: Post[];
  comments: PostComment[];
  categories: Category[];
} = {
  users: [
    {
      id: "1",
      username: "user1",
      email: "user1@example.com",
      posts: ["1", "2"],
      comments: ["1", "2", "3"],
    },
    {
      id: "2",
      username: "user2",
      email: "user2@example.com",
      posts: ["3"],
      comments: ["4"],
    },
  ],
  posts: [
    {
      id: "1",
      title: "First Post",
      content: "This is the content of the first post.",
      author: "1",
      comments: ["1", "2"],
      categories: ["1", "2"],
    },
    {
      id: "2",
      title: "Second Post",
      content: "This is the content of the second post.",
      author: "1",
      comments: ["3"],
      categories: ["2"],
    },
    {
      id: "3",
      title: "Third Post",
      content: "This is the content of the third post.",
      author: "2",
      comments: ["4"],
      categories: ["1"],
    },
  ],
  comments: [
    {
      id: "1",
      content: "This is a comment on the first post.",
      author: "1",
      post: "1",
    },
    {
      id: "2",
      content: "Another comment on the first post.",
      author: "1",
      post: "1",
    },
    {
      id: "3",
      content: "A comment on the second post.",
      author: "1",
      post: "2",
    },
    {
      id: "4",
      content: "PostComment on the third post.",
      author: "2",
      post: "3",
    },
  ],
  categories: [
    {
      id: "1",
      name: "Technology",
      posts: ["1", "3"],
    },
    {
      id: "2",
      name: "Science",
      posts: ["1", "2"],
    },
  ],
};

export default fakeDatabase;
