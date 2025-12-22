import { SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMembers } from "@/hooks/useMembers";
import { updateMember } from "@/services/members.service";
import type { Member, UpdateMemberPayload } from "@together/types";
import FormDialog from "@/components/custom/form-dialog/form-dialog";
import * as z from "zod";

const validator = z.object({
  name: z.string().trim().min(1, "Name is required."),
});

const EditMemberDialog = ({ member }: { member: Member }) => {
  const { members, setMembers } = useMembers();

  const onSubmit = async (payload: Record<string, string>) => {
    const { updated } = await updateMember(
      { id: String(member.id) },
      payload as UpdateMemberPayload
    );
    setMembers(members!.map((m) => (m.id === updated.id ? updated : m)));
  };

  return (
    <FormDialog
      trigger={
        <Button variant="ghost" size="icon">
          <SquarePen />
        </Button>
      }
      title="Edit Person"
      description="Update the person's information below and save your changes."
      schema={[
        {
          type: "text",
          name: "name",
          placeholder: "John",
          defaultValue: member.name,
        },
        {
          type: "color",
          name: "color",
          placeholder: "#ffffff",
          defaultValue: member.color,
        },
      ]}
      validator={validator}
      onSubmit={onSubmit}
      errorMsg="updateMember() endpoint failed."
      successMsg="Member updated successfully."
      loadingMsg="Updating member..."
    />
  );
};

export default EditMemberDialog;
