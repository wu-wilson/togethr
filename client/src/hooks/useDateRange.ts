import { DateRangeProviderContext } from "@/contexts/date-range-provider/date-range-provider";
import { use } from "react";

export const useDateRange = () => {
  const context = use(DateRangeProviderContext);

  if (context === undefined) {
    throw new Error("useDateRange must be used within a DateRangeProvider");
  }

  return context;
};
