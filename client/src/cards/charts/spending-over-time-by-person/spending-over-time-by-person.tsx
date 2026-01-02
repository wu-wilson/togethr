import { useMemo } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { useMembers } from "@/hooks/useMembers";
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
import ChartCard from "@/components/custom/chart-card/chart-card";

const SpendingOverTimeByPerson = () => {
  const { members } = useMembers();
  const { transactions } = useTransactions();

  const chartData = useMemo(() => {
    return getChartData(transactions!, members!);
  }, [members, transactions]);

  const chartConfig = useMemo(() => {
    return getChartConfig(members!);
  }, [members]);

  return (
    <ChartCard
      title="Spending Over Time by Person"
      description="Visualize how each person's spending changes over time."
    >
      <ChartContainer config={chartConfig} className="aspect-auto h-100 w-full">
        <AreaChart data={chartData}>
          <CartesianGrid />
          <YAxis />
          <XAxis
            dataKey="date"
            tickMargin={8}
            minTickGap={30}
            tickFormatter={(value) => {
              return DateTime.fromISO(value).toLocaleString(DateTime.DATE_MED);
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
          {members?.map((m) => (
            <Area
              key={m.id}
              dataKey={m.name}
              type="monotone"
              stroke={m.color}
              fill={`${m.color}33`}
            />
          ))}
          <ChartLegend content={<ChartLegendContent />} className="flex-wrap" />
        </AreaChart>
      </ChartContainer>
    </ChartCard>
  );
};

export default SpendingOverTimeByPerson;
