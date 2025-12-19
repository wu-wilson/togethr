import { createContext, useEffect, useState } from "react";
import { fetchTransactions } from "@/services/transactions.service";
import { useDateRange } from "@/hooks/useDateRange";
import type {
  TransactionsProviderProps,
  TransactionsProviderState,
} from "./types";
import type { Transaction } from "@together/types";

export const TransactionsProviderContext =
  createContext<TransactionsProviderState | null>(null);

export const TransactionsProvider = ({
  children,
}: TransactionsProviderProps) => {
  const { dateRange } = useDateRange();

  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getTransactions = async () => {
    try {
      const fetchedTransactions = await fetchTransactions({
        from: dateRange.from!.toISOString(),
        to: dateRange.to!.toISOString(),
      });
      setTransactions(fetchedTransactions);
    } catch {
      setError("getTransactions() endpoint failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      getTransactions();
    }
  }, [loading]);

  useEffect(() => {
    setLoading(true);
  }, [dateRange]);

  return (
    <TransactionsProviderContext.Provider
      value={{ transactions, setTransactions, loading, error }}
    >
      {children}
    </TransactionsProviderContext.Provider>
  );
};
