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
import type { DateRange } from "react-day-picker";

const DateRangePicker = () => {
  const { dateRange, setDateRange } = useDateRange();

  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >(dateRange);

  const [open, setOpen] = useState(false);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleApply = () => {
    if (selectedDateRange?.from && selectedDateRange.to) {
      setDateRange(selectedDateRange);
    }
    setOpen(false);
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen} modal={true}>
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
        <PopoverContent
          className="flex-col w-auto p-0 shadow-sm max-h-[calc(100vh-4rem)] overflow-y-auto"
          align="end"
        >
          <Calendar
            mode="range"
            numberOfMonths={2}
            selected={selectedDateRange}
            defaultMonth={dateRange.from}
            onSelect={setSelectedDateRange}
            disabled={{ after: new Date() }}
          />
          <div className="flex justify-end p-3 gap-2 border-t">
            <Button size="sm" variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              size="sm"
              disabled={!selectedDateRange?.from || !selectedDateRange?.to}
              onClick={handleApply}
            >
              Apply
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default DateRangePicker;
