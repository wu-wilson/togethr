import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import type { ColorPickerProps } from "./types";

const ColorPicker = ({ id, value, onChange }: ColorPickerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild id={id}>
        <Button variant="outline">
          <div className="flex w-full items-center gap-2">
            <div
              className="h-4 w-4 border"
              style={{ backgroundColor: value }}
            />
            {value}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-3"
        style={{ width: "var(--radix-popover-trigger-width)" }}
      >
        <HexColorPicker color={value} onChange={onChange} />
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker;
