import { createContext, useEffect, useState } from "react";
import { fetchTransactions } from "@/services/transactions.service";
import { useDateRange } from "@/hooks/useDateRange";
import { useMembers } from "@/hooks/useMembers";
import { useCategories } from "@/hooks/useCategories";
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
  const { members } = useMembers();
  const { categories } = useCategories();

  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getTransactions = async () => {
    try {
      const fetchedTransactions = await fetchTransactions({
        from: dateRange.from!,
        to: dateRange.to!,
      });
      const sorted = fetchedTransactions.sort((a, b) =>
        b.transaction_date.localeCompare(a.transaction_date)
      );
      setTransactions(sorted);
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

  useEffect(() => {
    if (!transactions || !members || !categories) {
      return;
    }
    const memberIds = new Set(members.map((m) => m.id));
    const categoryIds = new Set(categories.map((c) => c.id));
    setTransactions(
      transactions.filter(
        (t) => memberIds.has(t.member_id) && categoryIds.has(t.category_id)
      )
    );
  }, [members, categories]);

  return (
    <TransactionsProviderContext.Provider
      value={{ transactions, setTransactions, loading, error }}
    >
      {children}
    </TransactionsProviderContext.Provider>
  );
};
