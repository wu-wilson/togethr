import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTransactions } from "@/hooks/useTransactions";
import type { Transaction } from "@together/types";
import * as z from "zod";
import { deleteTransaction } from "@/services/transactions.service";
import FormDialog from "@/components/custom/form-dialog/form-dialog";

const validator = z.object({
  confirm: z.literal("DELETE", {
    error: () => ({ message: "Type DELETE to confirm" }),
  }),
});

const DeleteTransactionDialog = ({
  transaction,
}: {
  transaction: Transaction;
}) => {
  const { transactions, setTransactions } = useTransactions();

  const onSubmit = async () => {
    await deleteTransaction({ id: String(transaction.id) });
    setTransactions(transactions!.filter((t) => t.id !== transaction.id));
  };

  return (
    <FormDialog
      trigger={
        <Button variant="ghost" size="icon">
          <Trash2 />
        </Button>
      }
      title="Delete Transaction"
      description="Are you sure you want to remove this transaction? This cannot be undone."
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
        error: "deleteTransaction() endpoint failed.",
        success: "Transaction deleted successfully.",
        loading: "Deleting transaction...",
      }}
    />
  );
};

export default DeleteTransactionDialog;
