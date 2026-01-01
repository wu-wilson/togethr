import type { ChartConfig } from "@/components/ui/chart";
import type { Category, Transaction } from "@together/types";

export const getChartData = (
  transactions: Transaction[],
  categories: Category[]
) => {
  const categoryTotals: Record<number, number> = {};

  categories.forEach((c) => {
    categoryTotals[c.id] = 0;
  });

  transactions.forEach((t) => {
    categoryTotals[t.category_id] += t.amount;
  });

  const data = categories.map((c) => ({
    category: c.name,
    amount: categoryTotals[c.id],
    fill: c.color,
  }));

  return data;
};

export const getChartConfig = (categories: Category[]) => {
  return categories.reduce((config, c) => {
    config[c.name] = {
      label: c.name,
      color: c.color,
    };
    return config;
  }, {} as ChartConfig);
};
