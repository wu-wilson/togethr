import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { DateTime } from "luxon";
import type { DatePickerProps } from "./types";

export const DatePicker = ({ value, onSelect, id }: DatePickerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild id={id}>
        <Button
          variant="outline"
          id="date"
          className="w-full justify-between font-normal"
        >
          {value
            ? DateTime.fromJSDate(value).toLocaleString(DateTime.DATE_FULL)
            : "Select date"}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          captionLayout="dropdown"
          onSelect={(date) => {
            if (date) {
              onSelect(date);
              setOpen(false);
            }
          }}
          disabled={{ after: DateTime.now().endOf("day").toJSDate() }}
        />
      </PopoverContent>
    </Popover>
  );
};
