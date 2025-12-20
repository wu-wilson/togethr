export type Transaction = {
  id: number;
  member_id: number;
  category_id?: number | null;
  amount: number;
  transaction_date: Date;
};

export type GetTransactionsParams = {
  from: string;
  to: string;
};

export type AddTransactionPayload = {
  member_id: number;
  category_id: number;
  amount: number;
  transaction_date: Date;
};

export type AddTransactionResponse = {
  message: string;
  added: Transaction;
};

export type DeleteTransactionParams = {
  id: string;
};

export type DeleteTransactionResponse = {
  message: string;
  deleted: Transaction;
};

export type UpdateTransactionParams = {
  id: string;
};

export type UpdateTransactionPayload = {
  member_id: number;
  category_id: number;
  amount: number;
  transaction_date: Date;
};

export type UpdateTransactionResponse = {
  message: string;
  updated: Transaction;
};
