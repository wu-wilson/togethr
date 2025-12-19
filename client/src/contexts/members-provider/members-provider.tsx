import { createContext, use, useEffect, useState } from "react";
import { fetchMembers } from "@/services/members.service";
import type { MembersProviderProps, MembersProviderState } from "./types";
import type { Member } from "@together/types";

export const MembersProviderContext =
  createContext<MembersProviderState | null>(null);

export const MembersProvider = ({ children }: MembersProviderProps) => {
  const [members, setMembers] = useState<Member[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getMembers = async () => {
    try {
      const fetchedMembers = await fetchMembers();
      setMembers(fetchedMembers);
    } catch {
      setError("getMembers() endpoint failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      getMembers();
    }
  }, []);

  return (
    <MembersProviderContext.Provider
      value={{ members, setMembers, loading, error }}
    >
      {children}
    </MembersProviderContext.Provider>
  );
};
