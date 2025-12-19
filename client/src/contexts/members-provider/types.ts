import type { ReactNode } from "react";
import type { Member } from "@together/types";

export type MembersProviderProps = {
  children: ReactNode;
};

export type MembersProviderState = {
  members: Member[] | null;
  setMembers: (member: Member[]) => void;
  loading: boolean;
  error: string | null;
};
