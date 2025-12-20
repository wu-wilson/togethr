import { Button } from "@/components/ui/button";
import { addTransaction } from "@/services/transactions.service";
import { CirclePlus } from "lucide-react";
import { useTransactions } from "@/hooks/useTransactions";
import { useCategories } from "@/hooks/useCategories";
import { useMembers } from "@/hooks/useMembers";
import type { AddTransactionPayload, Category, Member } from "@together/types";
import FormDialog from "@/components/custom/form-dialog/form-dialog";
import z from "zod";

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

const AddTransactionDialog = () => {
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
    const { added } = await addTransaction(payload as AddTransactionPayload);
    setTransactions([...transactions!, added]);
  };

  const getMemberLabel = (m: Member) => {
    return `${m.name} ${m.surname}`;
  };

  const getCategoryLabel = (c: Category) => {
    return c.name;
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
          options: members!,
          label: getMemberLabel,
        },
        {
          type: "dropdown",
          name: "category",
          options: categories!,
          label: getCategoryLabel,
        },
        {
          type: "currency",
          name: "amount",
        },
        {
          type: "date",
          name: "date",
          defaultValue: new Date(),
        },
      ]}
      validator={validator}
      onSubmit={onSubmit}
      errorMsg="addTransaction() endpoint failed."
      successMsg="Transaction added successfully."
      loadingMsg="Adding transaction..."
    />
  );
};

export default AddTransactionDialog;
