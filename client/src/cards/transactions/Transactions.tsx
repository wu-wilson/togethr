import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCategories } from "@/hooks/useCategories";
import { useTransactions } from "@/hooks/useTransactions";
import { useMembers } from "@/hooks/useMembers";
import { DateTime } from "luxon";
import type { ColumnDef } from "@tanstack/react-table";
import type { Transaction } from "@together/types";
import DataTable from "@/components/custom/data-table/data-table";
import AddTransactionDialog from "./dialogs/add-transaction";
import DeleteTransactionDialog from "./dialogs/delete-transaction";
import EditTransactionDialog from "./dialogs/edit-transaction";

const Transactions = () => {
  const { transactions } = useTransactions();
  const { categories } = useCategories();
  const { members } = useMembers();

  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"));

        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
      },
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
      header: "Person",
      cell: ({ row }) =>
        members!.find((m) => m.id === row.getValue("member_id"))?.name ||
        "Unassigned",
    },
    {
      accessorKey: "transaction_date",
      header: "Date",
      cell: ({ row }) =>
        DateTime.fromISO(row.getValue("transaction_date"), {
          zone: "utc",
        }).toLocaleString(DateTime.DATE_FULL),
    },
    {
      accessorKey: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex items-center justify-end">
          <DeleteTransactionDialog transaction={row.original} />
          <EditTransactionDialog transaction={row.original} />
        </div>
      ),
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
