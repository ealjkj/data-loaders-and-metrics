import models from ".";
import { User } from "../../types";

interface Model<T> {
  findOne(filter: Partial<T>): T | undefined;
  findMany(filter: Partial<T>): T[];
  create(postInput: Omit<T, "id">): T;
  update(id: string, postInput: Partial<T>): T | undefined;
  delete(id: string): boolean;
}

interface AsyncModel<T> {
  findOne(filter: Partial<T>): Promise<T | undefined>;
  findMany(filter: Partial<T>): Promise<T[]>;
  create(postInput: Omit<T, "id">): Promise<T>;
  update(id: string, postInput: Partial<T>): Promise<T | undefined>;
  delete(id: string): Promise<boolean>;
}

function modelWrapper<T>(model: Model<T>, ms: number): AsyncModel<T> {
  class Wrapped {
    static async findOne(filter: Partial<T>): Promise<T | undefined> {
      return delayPromise(model.findOne(filter), ms);
    }

    static async findMany(filter: Partial<T>): Promise<T[]> {
      return delayPromise(model.findMany(filter), ms);
    }

    static async create(postInput: Omit<T, "id">): Promise<T> {
      return delayPromise(model.create(postInput), ms);
    }
    static async update(
      id: string,
      postInput: Partial<T>
    ): Promise<T | undefined> {
      return delayPromise(model.update(id, postInput), ms);
    }

    static async delete(id: string): Promise<boolean> {
      return delayPromise(model.delete(id), ms);
    }
  }

  return Wrapped;
}

function delayPromise<T>(value: T, ms: number) {
  return new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      resolve(value);
    }, ms);
  });
}

const asyncModels = {
  User: modelWrapper(models.User, 1000),
  Post: modelWrapper(models.Post, 1000),
  Comment: modelWrapper(models.Comment, 1000),
  Category: modelWrapper(models.Category, 1000),
};

export default asyncModels;
