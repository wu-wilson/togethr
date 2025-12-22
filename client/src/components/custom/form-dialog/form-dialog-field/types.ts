import type { AnyFieldApi } from "@tanstack/react-form";

type BaseField = {
  name: string;
  defaultValue?: string;
  placeholder?: string;
};

export type FormField = BaseField &
  (
    | { type: "text" }
    | { type: "currency" }
    | { type: "color" }
    | { type: "date" }
    | { type: "dropdown"; options: string[] }
  );

export type FormDialogFieldProps = {
  field: AnyFieldApi;
  config: FormField;
};
