import type { FormValidateOrFn } from "@tanstack/react-form";
import type { ReactNode } from "react";
import type { FormField } from "./form-dialog-field/types";

export type FormDialogProps = {
  trigger: ReactNode;
  title: string;
  description: string;
  schema: FormField[];
  validator?: FormValidateOrFn<Record<string, string>>;
  onSubmit: (values: Record<string, string>) => Promise<void>;
  toastMsgs: {
    error: string;
    loading: string;
    success: string;
  };
};
