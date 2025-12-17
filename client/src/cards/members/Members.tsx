import { useMembers } from "@/hooks/useMembers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { COLUMNS } from "./columns";
import DataTable from "@/components/custom/data-table";
import AddMember from "./dialogs/add-member";

const Members = () => {
  const { members } = useMembers();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>People</CardTitle>
        <CardDescription>
          Manage the people you're budgeting for.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={COLUMNS} data={members} />
        <AddMember />
      </CardContent>
    </Card>
  );
};

export default Members;
