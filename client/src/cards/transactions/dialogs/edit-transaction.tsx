import { SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTransactions } from "@/hooks/useTransactions";
import { useCategories } from "@/hooks/useCategories";
import { useMembers } from "@/hooks/useMembers";
import { updateTransaction } from "@/services/transactions.service";
import type { Transaction, UpdateTransactionPayload } from "@together/types";
import FormDialog from "@/components/custom/form-dialog/form-dialog";
import * as z from "zod";
import { DateTime } from "luxon";

const validator = z.object({
  person: z.string().trim().min(1, "Person is required."),
  category: z.string().trim().min(1, "Category is required."),
  amount: z.string().trim().min(1, "Amount is required."),
});

const EditTransactionDialog = ({
  transaction,
}: {
  transaction: Transaction;
}) => {
  const { transactions, setTransactions } = useTransactions();
  const { categories } = useCategories();
  const { members } = useMembers();

  const onSubmit = async (metadata: Record<string, string>) => {
    const payload = {
      member_id: members!.find((m) => m.name === metadata.person)!.id,
      category_id: categories!.find((c) => c.name === metadata.category)!.id,
      amount: Number(metadata.amount),
      transaction_date: metadata.date,
    };

    const { updated } = await updateTransaction(
      { id: String(transaction.id) },
      payload as UpdateTransactionPayload
    );

    setTransactions(
      transactions!.map((t) => (t.id === updated.id ? updated : t))
    );
  };

  return (
    <FormDialog
      trigger={
        <Button variant="ghost" size="icon">
          <SquarePen />
        </Button>
      }
      title="Edit Transaction"
      description="Update the transaction's metadata below and save your changes."
      schema={[
        {
          type: "dropdown",
          name: "person",
          options: members!.map((m) => m.name),
          defaultValue:
            members!.find((m) => m.id === transaction.member_id)?.name ??
            undefined,
        },
        {
          type: "dropdown",
          name: "category",
          options: categories!.map((c) => c.name),
          defaultValue:
            categories!.find((c) => c.id === transaction.category_id)?.name ??
            undefined,
        },
        {
          type: "currency",
          name: "amount",
          defaultValue: String(transaction.amount),
        },
        {
          type: "date",
          name: "date",
          defaultValue: DateTime.fromISO(transaction.transaction_date, {
            zone: "utc",
          }).toISODate()!,
        },
      ]}
      validator={validator}
      onSubmit={onSubmit}
      toastMsgs={{
        error: "updateTransaction() endpoint failed.",
        success: "Transaction updated successfully.",
        loading: "Updating transaction...",
      }}
    />
  );
};

export default EditTransactionDialog;
