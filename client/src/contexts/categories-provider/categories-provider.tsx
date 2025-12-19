import { createContext, useEffect, useState } from "react";
import { fetchCategories } from "@/services/categories.service";
import type { CategoriesProviderProps, CategoriesProviderState } from "./types";
import type { Category } from "@together/types";

export const CategoriesProviderContext =
  createContext<CategoriesProviderState | null>(null);

export const CategoriesProvider = ({ children }: CategoriesProviderProps) => {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getCategories = async () => {
    try {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    } catch {
      setError("getCategories() endpoint failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      getCategories();
    }
  }, []);

  return (
    <CategoriesProviderContext.Provider
      value={{ categories, setCategories, loading, error }}
    >
      {children}
    </CategoriesProviderContext.Provider>
  );
};
