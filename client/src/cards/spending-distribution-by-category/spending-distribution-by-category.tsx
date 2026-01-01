import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMemo } from "react";
import { getChartConfig, getChartData } from "./util";
import { useCategories } from "@/hooks/useCategories";
import { useTransactions } from "@/hooks/useTransactions";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Pie, PieChart } from "recharts";

const SpendingDistributionByCategory = () => {
  const { categories } = useCategories();
  const { transactions } = useTransactions();

  const chartData = useMemo(() => {
    return getChartData(transactions!, categories!);
  }, [categories, transactions]);

  const chartConfig = useMemo(() => {
    return getChartConfig(categories!);
  }, [categories]);

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Spending Distribution By Category</CardTitle>
        <CardDescription>
          Visualize the proportion of spending in each category
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-foreground aspect-auto h-80"
        >
          <PieChart>
            <Pie data={chartData} dataKey="amount" nameKey="category" />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name, item) => (
                    <>
                      <div
                        className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-(--color-bg)"
                        style={
                          {
                            "--color-bg": item.payload.fill,
                          } as React.CSSProperties
                        }
                      />
                      {name}
                      <span className="ml-auto">
                        {`$${Number(value).toFixed(2)}`}
                      </span>
                    </>
                  )}
                />
              }
            />
            <ChartLegend
              content={<ChartLegendContent />}
              className="flex-wrap"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default SpendingDistributionByCategory;
