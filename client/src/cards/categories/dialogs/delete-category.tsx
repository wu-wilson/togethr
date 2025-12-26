import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCategories } from "@/hooks/useCategories";
import { deleteCategory } from "@/services/categories.service";
import type { Category } from "@together/types";
import FormDialog from "@/components/custom/form-dialog/form-dialog";
import * as z from "zod";

const validator = z.object({
  confirm: z.literal("DELETE", {
    error: () => ({ message: "Type DELETE to confirm" }),
  }),
});

const DeleteCategoryDialog = ({ category }: { category: Category }) => {
  const { categories, setCategories } = useCategories();

  const onSubmit = async () => {
    await deleteCategory({ id: String(category.id) });
    setCategories(categories!.filter((c) => c.id !== category.id));
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
      schema={[
        {
          type: "text",
          name: "confirm",
          placeholder: "DELETE",
        },
      ]}
      validator={validator}
      onSubmit={onSubmit}
      toastMsgs={{
        error: "deleteCategory() endpoint failed.",
        success: "Category deleted successfully.",
        loading: "Deleting category...",
      }}
    />
  );
};

export default DeleteCategoryDialog;
