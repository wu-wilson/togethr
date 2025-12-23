import type { ReactNode } from "react";

export type DateRangeProviderProps = {
  children: ReactNode;
};

export type DateRange = {
  from: string | null;
  to: string | null;
};

export type DateRangeProviderState = {
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
};
