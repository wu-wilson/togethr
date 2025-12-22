import { Button } from "@/components/ui/button";
import { addMember } from "@/services/members.service";
import { CirclePlus } from "lucide-react";
import { useMembers } from "@/hooks/useMembers";
import type { AddMemberPayload } from "@together/types";
import FormDialog from "@/components/custom/form-dialog/form-dialog";
import * as z from "zod";

const validator = z.object({
  name: z.string().trim().min(1, "Name is required."),
});

const AddMemberDialog = () => {
  const { members, setMembers } = useMembers();

  const onSubmit = async (payload: Record<string, string>) => {
    const { added } = await addMember(payload as AddMemberPayload);
    setMembers([...members!, added]);
  };

  return (
    <FormDialog
      trigger={
        <Button className="mt-6 gap-2" variant="outline">
          <CirclePlus /> Person
        </Button>
      }
      title="Add Person"
      description="Add a new person by filling out the details below."
      schema={[
        {
          type: "text",
          name: "name",
          placeholder: "John Smith",
          defaultValue: "",
        },
        {
          type: "color",
          name: "color",
          placeholder: "#ffffff",
          defaultValue: "#ffffff",
        },
      ]}
      validator={validator}
      onSubmit={onSubmit}
      errorMsg="addMember() endpoint failed."
      successMsg="Member added successfully."
      loadingMsg="Adding member..."
    />
  );
};

export default AddMemberDialog;
