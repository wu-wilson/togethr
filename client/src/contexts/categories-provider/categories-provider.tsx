import { createContext, use, useState } from "react";
import { fetchCategories } from "@/services/categories.service";
import type { CategoriesProviderProps, CategoriesProviderState } from "./types";
import type { Category } from "@together/types";

const fetchedCategories = fetchCategories();

export const CategoriesProviderContext =
  createContext<CategoriesProviderState | null>(null);

export const CategoriesProvider = ({ children }: CategoriesProviderProps) => {
  const [categories, setCategories] = useState<Category[]>(
    use(fetchedCategories)
  );

  return (
    <CategoriesProviderContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoriesProviderContext.Provider>
  );
};
