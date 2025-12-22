import { SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCategories } from "@/hooks/useCategories";
import { updateCategory } from "@/services/categories.service";
import type { Category, UpdateCategoryPayload } from "@together/types";
import FormDialog from "@/components/custom/form-dialog/form-dialog";
import * as z from "zod";

const validator = z.object({
  name: z.string().trim().min(1, "Name is required."),
});

const EditCategoryDialog = ({ category }: { category: Category }) => {
  const { categories, setCategories } = useCategories();

  const onSubmit = async (payload: Record<string, string>) => {
    const { updated } = await updateCategory(
      { id: String(category.id) },
      payload as UpdateCategoryPayload
    );
    setCategories(categories!.map((c) => (c.id === updated.id ? updated : c)));
  };

  return (
    <FormDialog
      trigger={
        <Button variant="ghost" size="icon">
          <SquarePen />
        </Button>
      }
      title="Edit Category"
      description="Update the category's metadata below and save your changes."
      schema={[
        {
          type: "text",
          name: "name",
          placeholder: "Groceries",
          defaultValue: category.name,
        },
        {
          type: "color",
          name: "color",
          placeholder: "#ffffff",
          defaultValue: category.color,
        },
      ]}
      validator={validator}
      onSubmit={onSubmit}
      toastMsgs={{
        error: "updateCategory() endpoint failed.",
        success: "Category updated successfully.",
        loading: "Updating category...",
      }}
    />
  );
};

export default EditCategoryDialog;
