import type { ReactNode } from "react";
import type { DateRange } from "react-day-picker";

export type DateRangeProviderProps = {
  children: ReactNode;
};

export type DateRangeProviderState = {
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
};
