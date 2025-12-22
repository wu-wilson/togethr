export type Member = {
  id: number;
  name: string;
  color: string;
};

export type AddMemberPayload = {
  name: string;
  color: string;
};

export type AddMemberResponse = {
  message: string;
  added: Member;
};

export type DeleteMemberParams = {
  id: string;
};

export type DeleteMemberResponse = {
  message: string;
  deleted: Member;
};

export type UpdateMemberParams = {
  id: string;
};

export type UpdateMemberPayload = {
  name: string;
  color: string;
};

export type UpdateMemberResponse = {
  message: string;
  updated: Member;
};
