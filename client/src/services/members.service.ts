import { BASE_URL } from "./constants";
import type { Member } from "@together/types";
import axios from "axios";

const MEMBERS_SERVICE_BASE_URL = BASE_URL + "/members";

export const fetchMembers = async () => {
  const response = await axios.get<Member[]>(MEMBERS_SERVICE_BASE_URL);
  return response.data;
};
