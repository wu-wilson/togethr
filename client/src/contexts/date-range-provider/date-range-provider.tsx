import { useQueryParams } from "@/hooks/use-query-params/useQueryParams";
import { createContext, useEffect, useState } from "react";
import { DateTime } from "luxon";
import type {
  DateRange,
  DateRangeProviderProps,
  DateRangeProviderState,
} from "./types";

export const DateRangeProviderContext =
  createContext<DateRangeProviderState | null>(null);

export const DateRangeProvider = ({ children }: DateRangeProviderProps) => {
  const { getParam, setParam } = useQueryParams();

  const today = DateTime.now().startOf("day");

  const defaultStart = today.minus({ months: 1 }).toISODate();
  const defaultEnd = today.toISODate();

  const getInitialDateRange = (): DateRange => {
    const fromParam = getParam("from");
    const toParam = getParam("to");

    const from = fromParam ?? defaultStart;
    const to = toParam ?? defaultEnd;

    return {
      from: from,
      to: to,
    };
  };

  const [dateRange, setDateRange] = useState<DateRange>(getInitialDateRange());

  const setDateRangeWrapper = (range: DateRange) => {
    setDateRange(range);

    setParam({
      from: range.from ?? null,
      to: range.to ?? null,
    });
  };

  useEffect(() => {
    const fromParam = getParam("from");
    const toParam = getParam("to");

    if (!fromParam || !toParam) {
      setParam({
        from: dateRange.from ?? null,
        to: dateRange.to ?? null,
      });
    }
  }, []);

  const isDateInRange = (date: string): boolean => {
    if (!dateRange.from || !dateRange.to) {
      false;
    }
    return dateRange.from! <= date && date <= dateRange.to!;
  };

  return (
    <DateRangeProviderContext.Provider
      value={{
        dateRange: dateRange,
        setDateRange: setDateRangeWrapper,
        isDateInRange,
      }}
    >
      {children}
    </DateRangeProviderContext.Provider>
  );
};
