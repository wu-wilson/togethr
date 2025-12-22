import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { FormDialogProps } from "./types";
import FormDialogField from "./form-dialog-field/form-dialog-field";

const FormDialog = ({
  trigger,
  title,
  description,
  schema,
  validator,
  onSubmit,
  toastMsgs,
}: FormDialogProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const defaultValues = Object.fromEntries(
    schema.map(({ name, defaultValue }) => [name, defaultValue || ""])
  );

  const form = useForm({
    defaultValues: defaultValues,
    validators: {
      onSubmit: validator,
    },
    onSubmit: async ({ value }) => {
      toast.promise<void>(() => {
        setOpen(false);
        return onSubmit(value);
      }, toastMsgs);
    },
  });

  useEffect(() => {
    if (open) {
      form.reset();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {schema.map((config) => (
              <form.Field
                key={config.name}
                name={config.name}
                children={(field) => (
                  <FormDialogField field={field} config={config} />
                )}
              />
            ))}
            <Field orientation="horizontal" className="justify-end">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Submit</Button>
            </Field>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
