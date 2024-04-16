import fakeDatabase from "../memoryDb";
import { User } from "../../types";

class UserModel {
  static findOne(filter: Partial<User>): User | undefined {
    return fakeDatabase.users.find((user) => {
      for (const key of Object.keys(filter)) {
        const k = key as keyof typeof filter;
        if (user[k] !== filter[k]) {
          return false;
        }
      }
      return true;
    });
  }

  static findMany(filter: Partial<User>): User[] {
    return fakeDatabase.users.filter((user) => {
      for (const key in filter) {
        const k = key as keyof typeof filter;
        if (filter.hasOwnProperty(key) && user[k] !== filter[k]) {
          return false;
        }
      }
      return true;
    });
  }

  static create(userInput: Omit<User, "id">): User {
    const newUser: User = {
      ...userInput,
      id: (fakeDatabase.users.length + 1).toString(),
    };
    fakeDatabase.users.push(newUser);
    return newUser;
  }

  static update(id: string, userInput: Partial<User>): User | undefined {
    const userIndex = fakeDatabase.users.findIndex((user) => user.id === id);
    if (userIndex === -1) return undefined;
    fakeDatabase.users[userIndex] = {
      ...fakeDatabase.users[userIndex],
      ...userInput,
    };
    return fakeDatabase.users[userIndex];
  }

  static delete(id: string): boolean {
    const userIndex = fakeDatabase.users.findIndex((user) => user.id === id);
    if (userIndex === -1) return false;
    fakeDatabase.users.splice(userIndex, 1);
    // Also delete associated posts and comments
    fakeDatabase.posts = fakeDatabase.posts.filter(
      (post) => post.author !== id
    );
    fakeDatabase.comments = fakeDatabase.comments.filter(
      (comment) => comment.author !== id
    );
    return true;
  }
}

export default UserModel;
