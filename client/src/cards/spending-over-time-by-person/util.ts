import type { ChartConfig } from "@/components/ui/chart";
import type { Member, Transaction } from "@together/types";

export const getChartData = (
  transactions: Transaction[],
  members: Member[]
) => {
  const dateMap = new Map<string, Map<number, number>>();

  transactions.forEach((t) => {
    const date = t.transaction_date;

    if (!dateMap.has(date)) {
      dateMap.set(date, new Map<number, number>());
    }

    const spending = dateMap.get(date)!;
    const amount = spending.get(t.member_id) || 0;

    spending.set(t.member_id, amount + t.amount);
  });

  const sortedDates = Array.from(dateMap.keys()).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  const data = sortedDates.map((date) => {
    const dataPoint: Record<string, string | number> = { date };
    const spending = dateMap.get(date)!;

    members.forEach((m) => {
      const amount = spending.get(m.id) || 0;
      dataPoint[m.name] = amount;
    });

    return dataPoint;
  });

  return data;
};

export const getChartConfig = (members: Member[]) => {
  return members.reduce((config, m) => {
    config[m.name] = {
      label: m.name,
      color: m.color,
    };
    return config;
  }, {} as ChartConfig);
};
