import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { useMembers } from "@/hooks/useMembers";
import { addMember } from "@/services/members.service";
import { useForm } from "@tanstack/react-form";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required."),
  surname: z.string().trim().min(1, "Surname is required."),
  color: z.string().trim().length(7, "Hex code must be exactly 7 characters."),
});

const AddMember = () => {
  const { members, setMembers } = useMembers();
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm({
    defaultValues: {
      name: "",
      surname: "",
      color: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const { added } = await addMember(value);
      setMembers([...members, added]);
      setOpen(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-6 gap-2" variant="outline">
          <CirclePlus /> Person
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Person</DialogTitle>
          <DialogDescription>
            Add a new person by filling out the details below.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      id={field.name}
                      placeholder="John"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="surname"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Surname</FieldLabel>
                    <Input
                      id={field.name}
                      placeholder="Smith"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="color"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Color</FieldLabel>
                    <Input
                      id={field.name}
                      placeholder="#ffffff"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
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

export default AddMember;
