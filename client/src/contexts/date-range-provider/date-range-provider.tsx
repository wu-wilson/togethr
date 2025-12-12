import { createContext, useState } from "react";
import type { DateRangeProviderProps, DateRangeProviderState } from "./types";
import type { DateRange } from "react-day-picker";

export const DateRangeProviderContext =
  createContext<DateRangeProviderState | null>(null);

export const DateRangeProvider = ({ children }: DateRangeProviderProps) => {
  const today = new Date();

  const start = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    today.getDate()
  );
  const end = today;

  const [dateRange, setDateRange] = useState<DateRange>({
    from: start,
    to: end,
  });

  return (
    <DateRangeProviderContext.Provider value={{ dateRange, setDateRange }}>
      {children}
    </DateRangeProviderContext.Provider>
  );
};
