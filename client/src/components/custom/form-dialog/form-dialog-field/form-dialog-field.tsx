import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { DatePicker } from "../../date-picker";
import { DollarSign } from "lucide-react";
import type { FormDialogFieldProps } from "./types";
import type { JSX } from "react";
import ColorPicker from "../../color-picker/color-picker";

const FormDialogField = ({ field, config }: FormDialogFieldProps) => {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const sharedProps = {
    id: field.name,
    "aria-invalid": isInvalid,
  };

  const renderer: Record<string, () => JSX.Element | null> = {
    text: () => (
      <Input
        {...sharedProps}
        value={field.state.value}
        placeholder={config.placeholder}
        onChange={(e) => field.handleChange(e.target.value)}
      />
    ),
    currency: () => (
      <div className="relative">
        <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          {...sharedProps}
          value={field.state.value}
          className="pl-9"
          placeholder={config.placeholder}
          onChange={(e) => field.handleChange(e.target.value)}
        />
      </div>
    ),
    color: () => (
      <ColorPicker
        {...sharedProps}
        value={field.state.value}
        onChange={(color) => field.handleChange(color)}
      />
    ),
    date: () => (
      <DatePicker
        {...sharedProps}
        value={new Date(field.state.value)}
        onSelect={(date) => field.handleChange(date.toISOString())}
      />
    ),
    dropdown: () => {
      if (config.type !== "dropdown") {
        return null;
      }

      return (
        <Select
          {...sharedProps}
          value={field.state.value}
          onValueChange={(option) => field.handleChange(option)}
        >
          <SelectTrigger className="w-full" aria-invalid={isInvalid}>
            <SelectValue placeholder={config.placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="capitalize">{field.name}</SelectLabel>
              {config.options.map((o) => (
                <SelectItem key={o} value={o}>
                  {o}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    },
  };

  return (
    <Field>
      <FieldLabel htmlFor={field.name} className="capitalize">
        {field.name}
      </FieldLabel>
      {renderer[config.type]?.()}
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
};

export default FormDialogField;
