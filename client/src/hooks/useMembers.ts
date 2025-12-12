import { MembersProviderContext } from "@/contexts/members-provider/members-provider";
import { use } from "react";

export const useMembers = () => {
  const context = use(MembersProviderContext);

  if (context === undefined) {
    throw new Error("useMembers must be used within a MembersProvider");
  }

  return context!;
};
