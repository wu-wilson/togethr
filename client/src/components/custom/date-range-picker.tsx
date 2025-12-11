import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDownIcon, Calendar as CalendarIcon } from "lucide-react";
import { formatDate } from "date-fns";
import { useDateRange } from "@/hooks/useDateRange";

const DateRangePicker = () => {
  const { dateRange, setDateRange } = useDateRange();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-62 flex justify-between">
            <div className="flex items-center gap-3">
              <CalendarIcon />
              {dateRange?.from && dateRange.to
                ? `${formatDate(dateRange.from, "MM/dd/yyyy")} - ${formatDate(
                    dateRange.to,
                    "MM/dd/yyyy"
                  )}`
                : "Select date range"}
            </div>
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={setDateRange}
            required={true}
          />
        </PopoverContent>
      </Popover>
    </>
  );
};

export default DateRangePicker;
