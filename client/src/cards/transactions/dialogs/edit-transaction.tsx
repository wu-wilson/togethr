import { SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTransactions } from "@/hooks/useTransactions";
import { useCategories } from "@/hooks/useCategories";
import { useMembers } from "@/hooks/useMembers";
import type {
  Category,
  Member,
  Transaction,
  UpdateTransactionPayload,
} from "@together/types";
import FormDialog from "@/components/custom/form-dialog/form-dialog";
import * as z from "zod";
import { updateTransaction } from "@/services/transactions.service";

const validator = z.object({
  person: z.string({
    message: "Person is required.",
  }),
  category: z.string({
    message: "Category is required.",
  }),
  amount: z.string({
    message: "Amount is required.",
  }),
});

const EditTransactionDialog = ({
  transaction,
}: {
  transaction: Transaction;
}) => {
  const { transactions, setTransactions } = useTransactions();
  const { categories } = useCategories();
  const { members } = useMembers();

  const onSubmit = async (metadata: Record<string, string | number | Date>) => {
    const payload = {
      member_id: members!.find(
        (m) => `${m.name} ${m.surname}` === metadata.person
      )!.id,
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

  const getMemberLabel = (m: Member) => {
    return `${m.name} ${m.surname}`;
  };

  const getCategoryLabel = (c: Category) => {
    return c.name;
  };

  const getDefaultDate = () => {
    const dateValue = new Date(transaction.transaction_date);

    const date = new Date(
      dateValue.getUTCFullYear(),
      dateValue.getUTCMonth(),
      dateValue.getUTCDate()
    );

    return date;
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
          options: members!,
          label: getMemberLabel,
          defaultValue: getMemberLabel(
            members!.find((m) => m.id === transaction.member_id)!
          ),
        },
        {
          type: "dropdown",
          name: "category",
          options: categories!,
          label: getCategoryLabel,
          defaultValue: getCategoryLabel(
            categories!.find((c) => c.id === transaction.category_id)!
          ),
        },
        {
          type: "currency",
          name: "amount",
          defaultValue: transaction.amount,
        },
        {
          type: "date",
          name: "date",
          defaultValue: getDefaultDate(),
        },
      ]}
      validator={validator}
      onSubmit={onSubmit}
      errorMsg="updateTransaction() endpoint failed."
      successMsg="Transaction updated successfully."
      loadingMsg="Updating transaction..."
    />
  );
};

export default EditTransactionDialog;
