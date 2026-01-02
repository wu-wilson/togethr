import type { ChartConfig } from "@/components/ui/chart";
import type { Category, Transaction } from "@together/types";

export const getChartData = (
  transactions: Transaction[],
  categories: Category[]
) => {
  const dateMap = new Map<string, Map<number, number>>();

  transactions.forEach((t) => {
    const date = t.transaction_date;

    if (!dateMap.has(date)) {
      dateMap.set(date, new Map<number, number>());
    }

    const spending = dateMap.get(date)!;
    const amount = spending.get(t.category_id) || 0;

    spending.set(t.category_id, amount + t.amount);
  });

  const sortedDates = Array.from(dateMap.keys()).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  const data = sortedDates.map((date) => {
    const dataPoint: Record<string, string | number> = { date };
    const spending = dateMap.get(date)!;

    categories.forEach((c) => {
      const amount = spending.get(c.id) || 0;
      dataPoint[c.name] = amount;
    });

    return dataPoint;
  });

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
