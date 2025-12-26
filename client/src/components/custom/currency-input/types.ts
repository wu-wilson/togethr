import type { ChangeEventHandler } from "react";

export type CurrencyInputProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  id?: string;
  placeholder?: string;
  invalid?: boolean;
};
