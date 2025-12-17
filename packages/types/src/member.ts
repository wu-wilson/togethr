export type Member = {
  id: number;
  name: string;
  surname: string;
  color: string;
  created_at: string;
  updated_at: string;
};

export type AddMemberPayload = {
  name: string;
  surname: string;
  color: string;
};

export type AddMemberResponse = {
  message: string;
  added: Member;
};
