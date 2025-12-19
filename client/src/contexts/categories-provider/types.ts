import type { ReactNode } from "react";
import type { Category } from "@together/types";

export type CategoriesProviderProps = {
  children: ReactNode;
};

export type CategoriesProviderState = {
  categories: Category[] | null;
  setCategories: (categories: Category[]) => void;
  loading: boolean;
  error: string | null;
};
