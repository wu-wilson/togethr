import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMembers } from "@/hooks/useMembers";
import type { Member } from "@together/types";
import * as z from "zod";
import { deleteMember } from "@/services/members.service";
import FormDialog from "@/components/custom/form-dialog/form-dialog";

const validator = z.object({
  confirm: z.literal("DELETE", {
    error: () => ({ message: "Type DELETE to confirm" }),
  }),
});

const DeleteMemberDialog = ({ member }: { member: Member }) => {
  const { members, setMembers } = useMembers();

  const onSubmit = async () => {
    await deleteMember({ id: String(member.id) });
    setMembers(members!.filter((m) => m.id !== member.id));
  };

  return (
    <FormDialog
      trigger={
        <Button variant="ghost" size="icon">
          <Trash2 />
        </Button>
      }
      title="Delete Person"
      description="Are you sure you want to remove this person? This cannot be undone."
      schema={[
        {
          type: "text",
          name: "confirm",
          placeholder: "DELETE",
        },
      ]}
      validator={validator}
      onSubmit={onSubmit}
      toastMsgs={{
        error: "deleteMember() endpoint failed.",
        success: "Member deleted successfully.",
        loading: "Deleting member...",
      }}
    />
  );
};

export default DeleteMemberDialog;
