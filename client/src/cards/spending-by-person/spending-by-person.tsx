import { useMemo } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { useMembers } from "@/hooks/useMembers";
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

const SpendingByPerson = () => {
  const { members } = useMembers();
  const { transactions } = useTransactions();

  const chartData = useMemo(() => {
    return getChartData(transactions!, members!);
  }, [members, transactions]);

  const chartConfig = useMemo(() => {
    return getChartConfig(members!);
  }, [members]);

  return (
    <Card className="w-full overflow-x-auto">
      <CardHeader>
        <CardTitle>Spending By Person</CardTitle>
        <CardDescription>
          Visualize spending over time by person.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-80 w-full"
        >
          <AreaChart data={chartData}>
            <CartesianGrid />
            <YAxis />
            <XAxis
              dataKey="date"
              tickMargin={8}
              minTickGap={30}
              tickFormatter={(value) => {
                return DateTime.fromISO(value, {
                  zone: "utc",
                }).toLocaleString(DateTime.DATE_MED);
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return DateTime.fromISO(value, {
                      zone: "utc",
                    }).toLocaleString(DateTime.DATE_FULL);
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
                        {`$${Number(value).toFixed(2)}`}
                      </div>
                    </>
                  )}
                />
              }
            />
            {members?.map((m) => (
              <Area
                dataKey={m.name}
                type="monotone"
                stroke={m.color}
                fill={`${m.color}33`}
              />
            ))}
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default SpendingByPerson;
