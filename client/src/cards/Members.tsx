import { Suspense } from "react";
import { useMembers } from "@/hooks/useMembers";
import Loading from "@/components/custom/loading";

const Members = () => {
  const { members, setMembers } = useMembers();

  return <div>{members.length}</div>;
};

export default Members;
