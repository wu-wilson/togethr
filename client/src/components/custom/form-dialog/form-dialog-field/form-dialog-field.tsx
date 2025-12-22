import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { DatePicker } from "../../date-picker/date-picker";
import type { FormDialogFieldProps } from "./types";
import type { JSX } from "react";
import ColorPicker from "../../color-picker/color-picker";
import Dropdown from "../../dropdown/dropdown";
import CurrencyInput from "../../currency-input/currency-input";

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
      <CurrencyInput
        id={field.name}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        placeholder={config.placeholder}
        invalid={isInvalid}
      />
    ),
    color: () => (
      <ColorPicker
        value={field.state.value}
        onChange={(color) => field.handleChange(color)}
      />
    ),
    date: () => (
      <DatePicker
        value={new Date(field.state.value)}
        onSelect={(date) => field.handleChange(date.toISOString())}
      />
    ),
    dropdown: () => (
      <Dropdown
        label={field.name}
        options={
          (
            config as Extract<
              FormDialogFieldProps["config"],
              { type: "dropdown" }
            >
          ).options
        }
        value={field.state.value}
        onValueChange={(o: string) => field.handleChange(o)}
      />
    ),
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
