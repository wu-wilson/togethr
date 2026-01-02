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
import ChartCard from "@/components/custom/chart-card/chart-card";

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
    <ChartCard
      title="Spending Distribution By Category"
      description="Visualize the proportion of spending in each category"
    >
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
          <ChartLegend content={<ChartLegendContent />} className="flex-wrap" />
        </PieChart>
      </ChartContainer>
    </ChartCard>
  );
};

export default SpendingDistributionByCategory;
