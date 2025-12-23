import { Button } from "@/components/ui/button";
import { addTransaction } from "@/services/transactions.service";
import { CirclePlus } from "lucide-react";
import { useTransactions } from "@/hooks/useTransactions";
import { useCategories } from "@/hooks/useCategories";
import { useMembers } from "@/hooks/useMembers";
import { useDateRange } from "@/hooks/useDateRange";
import { DateTime } from "luxon";
import type { AddTransactionPayload } from "@together/types";
import FormDialog from "@/components/custom/form-dialog/form-dialog";
import z from "zod";

const validator = z.object({
  person: z.string().trim().min(1, "Person is required."),
  category: z.string().trim().min(1, "Category is required."),
  amount: z.string().trim().min(1, "Amount is required."),
});

const AddTransactionDialog = () => {
  const { dateRange } = useDateRange();
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
    const { added } = await addTransaction(payload as AddTransactionPayload);
    if (dateRange!.from! <= metadata.date && metadata.date <= dateRange!.to!) {
      setTransactions([...transactions!, added]);
    }
  };

  return (
    <FormDialog
      trigger={
        <Button className="mt-6 gap-2" variant="outline">
          <CirclePlus /> Transaction
        </Button>
      }
      title="Add Transaction"
      description="Add a new transaction by filling out the details below."
      schema={[
        {
          type: "dropdown",
          name: "person",
          options: members!.map((m) => m.name),
          defaultValue: members!.length > 0 ? members![0].name : undefined,
          placeholder: "Select person",
        },
        {
          type: "dropdown",
          name: "category",
          options: categories!.map((c) => c.name),
          defaultValue:
            categories!.length > 0 ? categories![0].name : undefined,
          placeholder: "Select category",
        },
        {
          type: "currency",
          name: "amount",
          placeholder: "0.00",
        },
        {
          type: "date",
          name: "date",
          defaultValue: DateTime.utc().toISODate(),
        },
      ]}
      validator={validator}
      onSubmit={onSubmit}
      toastMsgs={{
        error: "addTransaction() endpoint failed.",
        success: "Transaction added successfully.",
        loading: "Adding transaction...",
      }}
    />
  );
};

export default AddTransactionDialog;
