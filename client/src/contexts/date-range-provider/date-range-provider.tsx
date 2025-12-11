import { createContext, useState } from "react";
import type { DateRangeProviderProps, DateRangeProviderState } from "./types";
import type { DateRange } from "react-day-picker";

const initialState: DateRangeProviderState = {
  dateRange: {
    from: new Date(),
    to: new Date(),
  },
  setDateRange: () => null,
};

export const DateRangeProviderContext =
  createContext<DateRangeProviderState>(initialState);

export const DateRangeProvider = ({ children }: DateRangeProviderProps) => {
  const today = new Date();

  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const [dateRange, setDateRange] = useState<DateRange>({
    from: monthStart,
    to: monthEnd,
  });

  return (
    <DateRangeProviderContext.Provider value={{ dateRange, setDateRange }}>
      {children}
    </DateRangeProviderContext.Provider>
  );
};
