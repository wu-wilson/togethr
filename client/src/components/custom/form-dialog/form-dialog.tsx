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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ColorPicker from "../color-picker/color-picker";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DollarSign } from "lucide-react";
import { DatePicker } from "../date-picker";
import { useForm, type DeepValue, type Updater } from "@tanstack/react-form";
import type { FormDialogProps } from "./types";
import { format } from "date-fns";

const FormDialog = <TFormData,>({
  trigger,
  title,
  description,
  schema,
  validator,
  onSubmit,
  errorMsg,
  loadingMsg,
  successMsg,
}: FormDialogProps<TFormData>) => {
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
                      {schemaField.type === "dropdown" && (
                        <Select
                          value={
                            field.state.value
                              ? (field.state.value as string)
                              : ""
                          }
                          onValueChange={(val) =>
                            field.handleChange(
                              val as Updater<DeepValue<TFormData, string>>
                            )
                          }
                        >
                          <SelectTrigger
                            className="w-full"
                            aria-invalid={isInvalid}
                          >
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel className="capitalize">
                                {field.name}
                              </SelectLabel>
                              {schemaField.options.map((option) => (
                                <SelectItem
                                  key={schemaField.label(option)}
                                  value={schemaField.label(option)}
                                >
                                  {schemaField.label(option)}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                      {schemaField.type === "currency" && (
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            aria-invalid={isInvalid}
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            min="0"
                            className="pl-9"
                            value={(field.state.value as string) ?? ""}
                            onBlur={field.handleBlur}
                            onChange={(e) =>
                              field.handleChange(
                                e.target.value as Updater<
                                  DeepValue<TFormData, string>
                                >
                              )
                            }
                          />
                        </div>
                      )}
                      {schemaField.type === "date" && (
                        <DatePicker
                          value={
                            field.state.value
                              ? new Date(field.state.value as string)
                              : new Date()
                          }
                          onSelect={(date) =>
                            field.handleChange(
                              date as Updater<DeepValue<TFormData, string>>
                            )
                          }
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
