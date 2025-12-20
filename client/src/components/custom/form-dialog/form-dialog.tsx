import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useForm, type DeepValue, type Updater } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { FormDialogProps } from "./types";
import ColorPicker from "../color-picker/color-picker";

const FormDialog = <TFormData, TDropdownEntity = string>({
  trigger,
  title,
  description,
  schema,
  validator,
  onSubmit,
  errorMsg,
  loadingMsg,
  successMsg,
}: FormDialogProps<TDropdownEntity, TFormData>) => {
  const [open, setOpen] = useState<boolean>(false);

  const defaultValues = Object.fromEntries(
    schema.map(({ name, defaultValue }) => [name, defaultValue])
  ) as TFormData;

  const form = useForm({
    defaultValues: defaultValues,
    validators: {
      onSubmit: validator,
    },
    onSubmit: async ({ value }) => {
      toast.promise<void>(
        () => {
          setOpen(false);
          return onSubmit(value);
        },
        {
          loading: loadingMsg,
          success: successMsg,
          error: errorMsg,
        }
      );
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
            {schema.map((schemaField) => (
              <form.Field
                key={schemaField.name}
                name={schemaField.name}
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name} className="capitalize">
                        {field.name}
                      </FieldLabel>
                      {schemaField.type === "text" && (
                        <Input
                          id={field.name}
                          placeholder={schemaField.placeholder}
                          value={field.state.value as string}
                          onBlur={field.handleBlur}
                          onChange={(e) =>
                            field.handleChange(
                              e.target.value as Updater<
                                DeepValue<TFormData, string>
                              >
                            )
                          }
                          aria-invalid={isInvalid}
                        />
                      )}
                      {schemaField.type === "color" && (
                        <ColorPicker
                          value={field.state.value as string}
                          onChange={(color) =>
                            field.handleChange(
                              color as Updater<DeepValue<TFormData, string>>
                            )
                          }
                          aria-invalid={isInvalid}
                        />
                      )}
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
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
