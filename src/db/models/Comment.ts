import fakeDatabase from "../memoryDb";
import { PostComment } from "../../types";

class CommentModel {
  static findOne(filter: Partial<PostComment>): PostComment | undefined {
    return fakeDatabase.comments.find((comment) => {
      for (const k in filter) {
        const key = k as keyof typeof filter;
        if (filter.hasOwnProperty(key) && comment[key] !== filter[key]) {
          return false;
        }
      }
      return true;
    });
  }

  static findMany(filter: Partial<PostComment>): PostComment[] {
    return fakeDatabase.comments.filter((comment) => {
      for (const k in filter) {
        const key = k as keyof typeof filter;
        if (filter.hasOwnProperty(key) && comment[key] !== filter[key]) {
          return false;
        }
      }
      return true;
    });
  }

  static create(commentInput: Omit<PostComment, "id">): PostComment {
    const newComment: PostComment = {
      ...commentInput,
      id: (fakeDatabase.comments.length + 1).toString(),
    };
    fakeDatabase.comments.push(newComment);
    return newComment;
  }

  static update(
    id: string,
    commentInput: Partial<PostComment>
  ): PostComment | undefined {
    const commentIndex = fakeDatabase.comments.findIndex(
      (comment) => comment.id === id
    );
    if (commentIndex === -1) return undefined;
    fakeDatabase.comments[commentIndex] = {
      ...fakeDatabase.comments[commentIndex],
      ...commentInput,
    };
    return fakeDatabase.comments[commentIndex];
  }

  static delete(id: string): boolean {
    const commentIndex = fakeDatabase.comments.findIndex(
      (comment) => comment.id === id
    );
    if (commentIndex === -1) return false;
    fakeDatabase.comments.splice(commentIndex, 1);
    return true;
  }
}

export default CommentModel;
