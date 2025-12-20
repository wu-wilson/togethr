import { Button } from "@/components/ui/button";
import { addTransaction } from "@/services/transactions.service";
import { CirclePlus } from "lucide-react";
import { useTransactions } from "@/hooks/useTransactions";
import type { AddTransactionPayload } from "@together/types";
import FormDialog from "@/components/custom/form-dialog/form-dialog";
import z from "zod";

const validator = z.object({
  name: z.string().trim().min(1, "Name is required."),
});

const AddTransactionDialog = () => {
  const { transactions, setTransactions } = useTransactions();

  const onSubmit = async (payload: Record<string, string | number | Date>) => {
    const { added } = await addTransaction(payload as AddTransactionPayload);
    setTransactions([...transactions!, added]);
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
      schema={[]}
      validator={validator}
      onSubmit={onSubmit}
      errorMsg="addTransaction() endpoint failed."
      successMsg="Transaction added successfully."
      loadingMsg="Adding transaction..."
    />
  );
};

export default AddTransactionDialog;
