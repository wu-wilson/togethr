import type { FormValidateOrFn } from "@tanstack/react-form";
import type { ReactNode } from "react";

type BaseField<T> = {
  name: string;
  defaultValue: T;
  placeholder?: T;
};

type TextField = BaseField<string> & {
  type: "text";
};

type CurrencyField = BaseField<number> & {
  type: "currency";
};

type ColorField = BaseField<string> & {
  type: "color";
};

type DateField = BaseField<Date> & {
  type: "date";
};

type DropdownField<T> = BaseField<T> & {
  type: "dropdown";
  options: T[];
  label: (value: T) => string;
};

type FormField<T> =
  | TextField
  | CurrencyField
  | ColorField
  | DateField
  | DropdownField<T>;

export type FormDialogProps<TDropdownEntity, TFormData> = {
  trigger: ReactNode;
  title: string;
  description: string;
  schema: FormField<TDropdownEntity>[];
  validator?: FormValidateOrFn<TFormData>;
  onSubmit: (values: TFormData) => Promise<void>;
  errorMsg: string;
  loadingMsg: string;
  successMsg: string;
};
