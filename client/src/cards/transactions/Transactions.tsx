import DataTable from "@/components/custom/data-table/data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCategories } from "@/hooks/useCategories";
import { useTransactions } from "@/hooks/useTransactions";
import type { ColumnDef } from "@tanstack/react-table";
import type { Transaction } from "@together/types";
import AddTransactionDialog from "./dialogs/add-transaction";

const Transactions = () => {
  const { transactions } = useTransactions();
  const { categories } = useCategories();

  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: "amount",
      header: "Amount",
    },
    {
      accessorKey: "category_id",
      header: "Category",
      cell: ({ row }) =>
        categories!.find((c) => c.id === row.getValue("category_id"))?.name ||
        "Uncategorized",
    },
    {
      accessorKey: "member_id",
      header: "Made By",
    },
    {
      accessorKey: "transaction_date",
      header: "Date",
    },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
        <CardDescription>
          View and manage your latest financial movements.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={transactions!} />
        <AddTransactionDialog />
      </CardContent>
    </Card>
  );
};

export default Transactions;
