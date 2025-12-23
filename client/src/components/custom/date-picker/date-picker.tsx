import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { DatePickerProps } from "./types";
import { DateTime } from "luxon";

export const DatePicker = ({ id, value, onSelect }: DatePickerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild id={id}>
        <Button
          aria-invalid={true}
          variant="outline"
          id="date"
          className="w-full justify-between font-normal"
        >
          {value
            ? DateTime.fromJSDate(value)
                .toUTC()
                .toLocaleString(DateTime.DATE_FULL)
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
        />
      </PopoverContent>
    </Popover>
  );
};
