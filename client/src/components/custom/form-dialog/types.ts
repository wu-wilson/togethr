import type { FormValidateOrFn } from "@tanstack/react-form";
import type { ReactNode } from "react";

export type FormDialogProps = {
  trigger: ReactNode;
  title: string;
  description: string;
  schema: FormSchema;
  validator?: FormValidateOrFn<Record<string, string>>;
  onSubmit: (values: Record<string, string>) => Promise<void>;
  errorMsg: string;
  loadingMsg: string;
  successMsg: string;
};

export type FormSchema = FormField[];

type FormField = {
  type: "input";
  name: string;
  placeholder: string;
  defaultValue?: string;
};
