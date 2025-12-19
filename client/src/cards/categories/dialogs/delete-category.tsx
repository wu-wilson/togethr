import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCategories } from "@/hooks/useCategories";
import type { Category } from "@together/types";
import * as z from "zod";
import { deleteCategory } from "@/services/categories.service";
import FormDialog from "@/components/custom/form-dialog/form-dialog";

const validator = z.object({
  confirm: z.literal("DELETE", {
    error: () => ({ message: "Type DELETE to confirm" }),
  }),
});

const DeleteCategoryDialog = ({ category }: { category: Category }) => {
  const { categories, setCategories } = useCategories();

  const onSubmit = async () => {
    await deleteCategory({ id: String(category.id) });
    setCategories(categories.filter((c) => c.id !== category.id));
  };

  return (
    <FormDialog
      trigger={
        <Button variant="ghost" size="icon">
          <Trash2 />
        </Button>
      }
      title="Delete Category"
      description="Are you sure you want to remove this category? This cannot be undone."
      schema={[{ type: "input", name: "confirm", placeholder: "DELETE" }]}
      validator={validator}
      onSubmit={onSubmit}
      errorMsg="deleteCategory() endpoint failed."
      successMsg="Category deleted successfully."
      loadingMsg="Deleting category..."
    />
  );
};

export default DeleteCategoryDialog;
