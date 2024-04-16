// import models from "./db/models";
import asyncModels from "./db/models/ModelWrapper";
import { Post, PostComment, User } from "./types";
const models = asyncModels;

const resolvers = {
  User: {
    async posts(user: User) {
      return models.Post.findMany({ author: user.id });
    },
    async comments(user: User) {
      return models.Comment.findMany({ author: user.id });
    },
  },
  Post: {
    async author(post: Post) {
      return models.User.findOne({ id: post.author });
    },
    async comments(post: Post) {
      return models.Comment.findMany({ post: post.id });
    },
  },
  Comment: {
    async author(comment: PostComment) {
      return models.User.findOne({ id: comment.author });
    },
    async post(comment: PostComment) {
      return models.Post.findOne({ id: comment.post });
    },
  },

  Query: {
    async user() {
      return models.User.findOne({});
    },
  },
};

export default resolvers;
