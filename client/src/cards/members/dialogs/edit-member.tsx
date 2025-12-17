import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Member } from "@together/types";

const EditMember = ({ member }: { member: Member }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <SquarePen />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Person</DialogTitle>
          <DialogDescription>
            Update the person's information below and save your changes.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditMember;
