import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTransactions } from "@/hooks/useTransactions";
import type { ChartCardProps } from "./types";

const ChartCard = ({ title, description, children }: ChartCardProps) => {
  const { transactions } = useTransactions();

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {transactions && transactions.length > 0 ? (
          children
        ) : (
          <div className="h-100 flex justify-center items-center text-sm">
            No results
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChartCard;
