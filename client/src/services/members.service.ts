import { BASE_URL } from "./constants";
import type {
  AddMemberPayload,
  AddMemberResponse,
  DeleteMemberParams,
  DeleteMemberResponse,
  Member,
} from "@together/types";
import axios from "axios";

const MEMBERS_SERVICE_BASE_URL = BASE_URL + "/members";

export const fetchMembers = async () => {
  const response = await axios.get<Member[]>(MEMBERS_SERVICE_BASE_URL);
  return response.data;
};

export const addMember = async (payload: AddMemberPayload) => {
  const response = await axios.post<AddMemberResponse>(
    `${MEMBERS_SERVICE_BASE_URL}/add`,
    payload
  );
  return response.data;
};

export const deleteMember = async (params: DeleteMemberParams) => {
  const response = await axios.delete<DeleteMemberResponse>(
    `${MEMBERS_SERVICE_BASE_URL}/delete/${params.id}`
  );

  return response.data;
};
