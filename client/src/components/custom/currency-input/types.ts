import type { ChangeEventHandler } from "react";

export type CurrencyInputProps = {
  id: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  invalid?: boolean;
};
