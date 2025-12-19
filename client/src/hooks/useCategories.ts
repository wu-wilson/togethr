import { CategoriesProviderContext } from "@/contexts/categories-provider/categories-provider";
import { use } from "react";

export const useCategories = () => {
  const context = use(CategoriesProviderContext);

  if (context === undefined) {
    throw new Error("useCategories must be used within a CategoriesProvider");
  }

  return context!;
};
