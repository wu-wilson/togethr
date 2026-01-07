import { Button } from "@/components/ui/button";
import { addCategory } from "@/services/categories.service";
import { CirclePlus } from "lucide-react";
import { useCategories } from "@/hooks/useCategories";
import type { AddCategoryPayload } from "@together/types";
import FormDialog from "@/components/custom/form-dialog/form-dialog";
import z from "zod";

const validator = z.object({
  name: z.string().trim().min(1, "Name is required."),
});

const AddCategoryDialog = () => {
  const { categories, setCategories } = useCategories();

  const onSubmit = async (payload: Record<string, string>) => {
    const { added } = await addCategory(payload as AddCategoryPayload);
    setCategories([added, ...categories!]);
  };

  return (
    <FormDialog
      trigger={
        <Button className="mt-6 gap-2" variant="outline">
          <CirclePlus /> Category
        </Button>
      }
      title="Add Category"
      description="Add a new category by filling out the details below."
      schema={[
        {
          type: "text",
          name: "name",
          placeholder: "Groceries",
          defaultValue: "",
        },
        {
          type: "color",
          name: "color",
          placeholder: "#ffffff",
          defaultValue: "#ffffff",
        },
      ]}
      validator={validator}
      onSubmit={onSubmit}
      toastMsgs={{
        error: "addCategory() endpoint failed.",
        success: "Category added successfully.",
        loading: "Adding category...",
      }}
    />
  );
};

export default AddCategoryDialog;
