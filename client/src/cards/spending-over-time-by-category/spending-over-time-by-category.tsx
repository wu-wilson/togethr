import { useMemo } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { useCategories } from "@/hooks/useCategories";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getChartConfig, getChartData } from "./util";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { DateTime } from "luxon";

const SpendingOverTimeByCategory = () => {
  const { categories } = useCategories();
  const { transactions } = useTransactions();

  const chartData = useMemo(() => {
    return getChartData(transactions!, categories!);
  }, [categories, transactions]);

  const chartConfig = useMemo(() => {
    return getChartConfig(categories!);
  }, [categories]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Spending Over Time by Category</CardTitle>
        <CardDescription>
          Visualize how each much is spent on each category over time.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-80 w-full"
        >
          {transactions!.length > 0 ? (
            <AreaChart data={chartData}>
              <CartesianGrid />
              <YAxis />
              <XAxis
                dataKey="date"
                tickMargin={8}
                minTickGap={30}
                tickFormatter={(value) => {
                  return DateTime.fromISO(value).toLocaleString(
                    DateTime.DATE_MED
                  );
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return DateTime.fromISO(value).toLocaleString(
                        DateTime.DATE_FULL
                      );
                    }}
                    indicator="dot"
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
                        <div className="ml-auto">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(Number(value))}
                        </div>
                      </>
                    )}
                  />
                }
              />
              {categories?.map((c) => (
                <Area
                  dataKey={c.name}
                  type="monotone"
                  stroke={c.color}
                  fill={`${c.color}33`}
                />
              ))}
              <ChartLegend
                content={<ChartLegendContent />}
                className="flex-wrap"
              />
            </AreaChart>
          ) : (
            <div className="h-80 flex justify-center items-center text-sm">
              No results
            </div>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default SpendingOverTimeByCategory;
