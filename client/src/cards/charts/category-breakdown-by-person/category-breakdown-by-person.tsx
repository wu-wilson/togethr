import { useMemo } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { useMembers } from "@/hooks/useMembers";
import { useCategories } from "@/hooks/useCategories";
import { getChartConfig, getChartData } from "./util";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import ChartCard from "@/components/custom/chart-card/chart-card";

const CategoryBreakdownByPerson = () => {
  const { members } = useMembers();
  const { transactions } = useTransactions();
  const { categories } = useCategories();

  const chartData = useMemo(() => {
    return getChartData(transactions!, members!, categories!);
  }, [members, categories, transactions]);

  const chartConfig = useMemo(() => {
    return getChartConfig(members!);
  }, [members]);

  const labelWidth = Math.max(...categories!.map((c) => c.name.length));
  const xAxisWidth = Math.max(labelWidth * categories!.length * 10);

  return (
    <ChartCard
      title="Category Breakdown by Person"
      description="Visualize how each person distributes spending across categories."
    >
      <div className="overflow-x-auto">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-100 pb-2"
          style={{ minWidth: xAxisWidth }}
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid />
            <YAxis />
            <XAxis dataKey="category" tickMargin={8} minTickGap={30} />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name, item) => (
                    <>
                      <div
                        className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-(--color-bg)"
                        style={
                          {
                            "--color-bg": item.color,
                          } as React.CSSProperties
                        }
                      />
                      {name}
                      <span className="ml-auto">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(Number(value))}
                      </span>
                    </>
                  )}
                />
              }
            />
            {members?.map((m, index) => (
              <Bar
                key={m.id}
                dataKey={m.name}
                fill={m.color}
                stackId="a"
                radius={index === members.length - 1 ? [4, 4, 0, 0] : 0}
              />
            ))}
            <ChartLegend
              content={<ChartLegendContent />}
              className="flex-wrap"
            />
          </BarChart>
        </ChartContainer>
      </div>
    </ChartCard>
  );
};

export default CategoryBreakdownByPerson;
