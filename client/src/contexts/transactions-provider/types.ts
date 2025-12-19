import type { ReactNode } from "react";
import type { Transaction } from "@together/types";

export type TransactionsProviderProps = {
  children: ReactNode;
};

export type TransactionsProviderState = {
  transactions: Transaction[] | null;
  setTransactions: (transactions: Transaction[]) => void;
  loading: boolean;
  error: string | null;
};
