import fakeDatabase from "../memoryDb";
import { Post } from "../../types";

class PostModel {
  static findOne(filter: Partial<Post>): Post | undefined {
    return fakeDatabase.posts.find((post) => {
      for (const k in filter) {
        const key = k as keyof typeof filter;
        if (filter.hasOwnProperty(key) && post[key] !== filter[key]) {
          return false;
        }
      }
      return true;
    });
  }

  static findMany(filter: Partial<Post>): Post[] {
    return fakeDatabase.posts.filter((post) => {
      for (const k in filter) {
        const key = k as keyof typeof filter;
        if (filter.hasOwnProperty(key) && post[key] !== filter[key]) {
          return false;
        }
      }
      return true;
    });
  }

  static create(postInput: Omit<Post, "id">): Post {
    const newPost: Post = {
      ...postInput,
      id: (fakeDatabase.posts.length + 1).toString(),
    };
    fakeDatabase.posts.push(newPost);
    return newPost;
  }

  static update(id: string, postInput: Partial<Post>): Post | undefined {
    const postIndex = fakeDatabase.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) return undefined;
    fakeDatabase.posts[postIndex] = {
      ...fakeDatabase.posts[postIndex],
      ...postInput,
    };
    return fakeDatabase.posts[postIndex];
  }

  static delete(id: string): boolean {
    const postIndex = fakeDatabase.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) return false;
    fakeDatabase.posts.splice(postIndex, 1);
    // Also delete associated comments
    fakeDatabase.comments = fakeDatabase.comments.filter(
      (comment) => comment.post !== id
    );
    return true;
  }
}

export default PostModel;
