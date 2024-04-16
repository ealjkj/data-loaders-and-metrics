import fakeDatabase from "../memoryDb";
import { Category } from "../../types";

class CategoryModel {
  static findOne(filter: Partial<Category>): Category | undefined {
    return fakeDatabase.categories.find((category) => {
      for (const k in filter) {
        const key = k as keyof typeof filter;
        if (filter.hasOwnProperty(key) && category[key] !== filter[key]) {
          return false;
        }
      }
      return true;
    });
  }

  static findMany(filter: Partial<Category>): Category[] {
    return fakeDatabase.categories.filter((category) => {
      for (const k in filter) {
        const key = k as keyof typeof filter;
        if (filter.hasOwnProperty(key) && category[key] !== filter[key]) {
          return false;
        }
      }
      return true;
    });
  }

  static create(categoryInput: Omit<Category, "id">): Category {
    const newCategory: Category = {
      ...categoryInput,
      id: (fakeDatabase.categories.length + 1).toString(),
    };
    fakeDatabase.categories.push(newCategory);
    return newCategory;
  }

  static update(
    id: string,
    categoryInput: Partial<Category>
  ): Category | undefined {
    const categoryIndex = fakeDatabase.categories.findIndex(
      (category) => category.id === id
    );
    if (categoryIndex === -1) return undefined;
    fakeDatabase.categories[categoryIndex] = {
      ...fakeDatabase.categories[categoryIndex],
      ...categoryInput,
    };
    return fakeDatabase.categories[categoryIndex];
  }

  static delete(id: string): boolean {
    const categoryIndex = fakeDatabase.categories.findIndex(
      (category) => category.id === id
    );
    if (categoryIndex === -1) return false;
    fakeDatabase.categories.splice(categoryIndex, 1);
    // Also remove category from associated posts
    fakeDatabase.posts.forEach((post) => {
      post.categories = post.categories.filter((catId) => catId !== id);
    });
    return true;
  }
}

export default CategoryModel;
