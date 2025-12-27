import type { ChartConfig } from "@/components/ui/chart";
import type { Category, Member, Transaction } from "@together/types";

export const getChartData = (
  transactions: Transaction[],
  members: Member[],
  categories: Category[]
) => {
  const categoryMemberSpending = new Map<number, Map<number, number>>();

  transactions.forEach((t) => {
    if (!categoryMemberSpending.has(t.category_id)) {
      categoryMemberSpending.set(t.category_id, new Map());
    }

    const spending = categoryMemberSpending.get(t.category_id)!;
    const amount = spending.get(t.member_id) || 0;

    spending.set(t.member_id, amount + t.amount);
  });

  const data = categories.map((c) => {
    const dataPoint: Record<string, string | number> = { category: c.name };
    const spending = categoryMemberSpending.get(c.id);

    members.forEach((m) => {
      const amount = spending?.get(m.id) || 0;
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
