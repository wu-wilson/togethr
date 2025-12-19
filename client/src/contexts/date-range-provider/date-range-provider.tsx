import { useQueryParams } from "@/hooks/use-query-params/useQueryParams";
import { createContext, useEffect, useState } from "react";
import { formatLocalDate, parseLocalDate } from "./util";
import type { DateRangeProviderProps, DateRangeProviderState } from "./types";
import type { DateRange } from "react-day-picker";

export const DateRangeProviderContext =
  createContext<DateRangeProviderState | null>(null);

export const DateRangeProvider = ({ children }: DateRangeProviderProps) => {
  const { getParam, setParam } = useQueryParams();

  const today = new Date();

  const defaultStart = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    today.getDate()
  );
  const defaultEnd = today;

  const getInitialDateRange = (): DateRange => {
    const fromParam = getParam("from");
    const toParam = getParam("to");

    const from = fromParam ? parseLocalDate(fromParam) : defaultStart;
    const to = toParam ? parseLocalDate(toParam) : defaultEnd;

    return {
      from: from,
      to: to,
    };
  };

  const [dateRange, setDateRange] = useState<DateRange>(getInitialDateRange());

  const setDateRangeWrapper = (range: DateRange) => {
    setDateRange(range);

    setParam({
      from: range.from ? formatLocalDate(range.from) : null,
      to: range.to ? formatLocalDate(range.to) : null,
    });
  };

  useEffect(() => {
    const fromParam = getParam("from");
    const toParam = getParam("to");

    if (!fromParam || !toParam) {
      setParam({
        from: dateRange.from ? formatLocalDate(dateRange.from) : null,
        to: dateRange.to ? formatLocalDate(dateRange.to) : null,
      });
    }
  }, []);

  return (
    <DateRangeProviderContext.Provider
      value={{ dateRange: dateRange, setDateRange: setDateRangeWrapper }}
    >
      {children}
    </DateRangeProviderContext.Provider>
  );
};
