import { useMembers } from "@/hooks/useMembers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ColumnDef } from "@tanstack/react-table";
import type { Member } from "@together/types";
import DataTable from "@/components/custom/data-table/data-table";
import AddMemberDialog from "./dialogs/add-member";
import DeleteMember from "./dialogs/delete-member";
import EditMember from "./dialogs/edit-member";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

const Members = () => {
  const { members } = useMembers();

  const columns: ColumnDef<Member>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "surname",
      header: "Surname",
    },
    {
      accessorKey: "color",
      header: "Color",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div
            className="h-4 w-4 border"
            style={{ backgroundColor: row.getValue("color") }}
          />
          {row.getValue("color")}
        </div>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Added",
      cell: ({ row }) => (
        <span>
          {dateFormatter.format(new Date(row.getValue<string>("created_at")))}
        </span>
      ),
    },
    {
      accessorKey: "updated_at",
      header: "Updated",
      cell: ({ row }) => (
        <span>
          {dateFormatter.format(new Date(row.getValue<string>("updated_at")))}
        </span>
      ),
    },
    {
      accessorKey: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex items-center justify-end">
          <DeleteMember member={row.original} />
          <EditMember member={row.original} />
        </div>
      ),
    },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>People</CardTitle>
        <CardDescription>
          Manage the people you're budgeting for.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={members} />
        <AddMemberDialog />
      </CardContent>
    </Card>
  );
};

export default Members;
