import { useMemo } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { useMembers } from "@/hooks/useMembers";
import { useCategories } from "@/hooks/useCategories";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getChartConfig, getChartData } from "./util";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const SpendingByCategory = () => {
  const { members } = useMembers();
  const { transactions } = useTransactions();
  const { categories } = useCategories();

  const chartData = useMemo(() => {
    return getChartData(transactions!, members!, categories!);
  }, [members, categories, transactions]);

  const chartConfig = useMemo(() => {
    return getChartConfig(members!);
  }, [members]);

  console.log(chartData);

  return (
    <Card className="w-full overflow-x-auto">
      <CardHeader>
        <CardTitle>Spending By Category</CardTitle>
        <CardDescription>
          Visualize spending over time by category.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-80 w-full"
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
                      <div className="rounded-[2px] bg-(--color-bg)">
                        {name}
                      </div>
                      <div className="text-foreground ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums">
                        {`$${Number(value).toFixed(2)}`}
                      </div>
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
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default SpendingByCategory;
