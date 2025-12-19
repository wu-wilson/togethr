import { TransactionsProviderContext } from "@/contexts/transactions-provider/transactions-provider";
import { use } from "react";

export const useTransactions = () => {
  const context = use(TransactionsProviderContext);

  if (context === undefined) {
    throw new Error(
      "useTransactions must be used within a TransactionsProvider"
    );
  }

  return context!;
};
