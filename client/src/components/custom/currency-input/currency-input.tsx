import { Input } from "@/components/ui/input";
import { DollarSign } from "lucide-react";
import type { CurrencyInputProps } from "./types";

const CurrencyInput = ({
  value,
  onChange,
  id,
  placeholder = "0.00",
  invalid = false,
}: CurrencyInputProps) => {
  return (
    <div className="relative">
      <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        id={id}
        className="pl-9"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        aria-invalid={invalid}
        type="number"
        step={0.01}
      />
    </div>
  );
};

export default CurrencyInput;
