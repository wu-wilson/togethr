import { createContext, use, useState } from "react";
import { fetchMembers } from "@/services/members.service";
import type { MembersProviderProps, MembersProviderState } from "./types";
import type { Member } from "@together/types";

const fetchedMembers = fetchMembers();

export const MembersProviderContext =
  createContext<MembersProviderState | null>(null);

export const MembersProvider = ({ children }: MembersProviderProps) => {
  const [members, setMembers] = useState<Member[]>(use(fetchedMembers));

  return (
    <MembersProviderContext.Provider value={{ members, setMembers }}>
      {children}
    </MembersProviderContext.Provider>
  );
};
