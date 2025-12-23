import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateTime } from "luxon";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDownIcon, Calendar as CalendarIcon } from "lucide-react";
import { useDateRange } from "@/hooks/useDateRange";
import type { DateRange } from "react-day-picker";

const DateRangePicker = () => {
  const { dateRange, setDateRange } = useDateRange();

  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >({
    from: DateTime.fromISO(dateRange.from!).toJSDate(),
    to: DateTime.fromISO(dateRange.to!).toJSDate(),
  });

  const [open, setOpen] = useState(false);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleApply = () => {
    if (selectedDateRange?.from && selectedDateRange.to) {
      setDateRange({
        from: DateTime.fromJSDate(selectedDateRange.from).toISODate(),
        to: DateTime.fromJSDate(selectedDateRange.to).toISODate(),
      });
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-62 flex justify-between">
          <div className="flex items-center gap-3">
            <CalendarIcon />
            {dateRange?.from && dateRange.to
              ? `${DateTime.fromISO(dateRange.from, {
                  zone: "utc",
                }).toLocaleString(DateTime.DATE_SHORT)} - ${DateTime.fromISO(
                  dateRange.to,
                  {
                    zone: "utc",
                  }
                ).toLocaleString(DateTime.DATE_SHORT)}`
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
          defaultMonth={DateTime.fromISO(dateRange.from!, {
            zone: "utc",
          }).toJSDate()}
          onSelect={setSelectedDateRange}
          disabled={{
            after: DateTime.utc().endOf("day").toJSDate(),
          }}
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
  );
};

export default DateRangePicker;
