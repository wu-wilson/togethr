import type { ReactNode } from "react";
import type { Category } from "@together/types";

export type CategoriesProviderProps = {
  children: ReactNode;
};

export type CategoriesProviderState = {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
};
