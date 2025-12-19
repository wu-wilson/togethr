import { useCategories } from "@/hooks/useCategories";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ColumnDef } from "@tanstack/react-table";
import type { Category } from "@together/types";
import DataTable from "@/components/custom/data-table/data-table";
import AddCategoryDialog from "./dialogs/add-category";
import DeleteCategoryDialog from "./dialogs/delete-category";
import EditCategoryDialog from "./dialogs/edit-category";

const Categories = () => {
  const { categories } = useCategories();

  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "color",
      header: "Color",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div
            className="h-4 w-4 border"
            style={{ backgroundColor: row.getValue("color") }}
          />
          {row.getValue("color")}
        </div>
      ),
    },
    {
      accessorKey: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex items-center justify-end">
          <DeleteCategoryDialog category={row.original} />
          <EditCategoryDialog category={row.original} />
        </div>
      ),
    },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Categories</CardTitle>
        <CardDescription>Manage your transaction categories.</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={categories} />
        <AddCategoryDialog />
      </CardContent>
    </Card>
  );
};

export default Categories;
